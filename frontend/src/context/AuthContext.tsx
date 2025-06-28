import { createContext, useState, useEffect, useContext } from 'react'
import {jwtDecode} from "jwt-decode";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import {DRF_ADRESS} from '../data/constants.tsx'
import { notify_error, notify_success } from '../utils/basicToasts.js';
import type { AuthTokens, Config, AuthContextType, AuthProviderType, Credentials, RegisterForm, AuthError, UserType } from '../types/index.tsx';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const defaultAuthTokens: AuthTokens = {
    access: '',
    refresh: '',
  };


  

const defaultConfig: Config = {
    headers: {
        Authorization: '',
    },
}

const defaultUser: UserType = {

    token_type: '',
    exp: -1,
    iat: -1,
    jti: '',
    user_id: -1,
    email: '',
    groups: [],
    permissions: [],

}
  

const AuthContext = createContext<AuthContextType | undefined>(undefined)




export const AuthProvider: React.FC<AuthProviderType> = ({children}) => {

    const [authTokens, setAuthTokens] = useState<AuthTokens>(()=>{ const tokens = localStorage.getItem('authTokensDFM'); return tokens ? JSON.parse(tokens) : defaultAuthTokens})
    const [user, setUser] = useState<UserType>(()=> {const token = localStorage.getItem('authTokensDFM'); return token ? jwtDecode(JSON.parse(token).access) : defaultUser})
    const [loading, setLoading] = useState<boolean>(true)
    const [authError, setAuthError] = useState<AuthError>({error: '', detail: []})
    const [created, setCreated] = useState<boolean>(false)
    const [config, setConfig] = useState<Config>(()=> {const token = localStorage.getItem('authTokensDFM'); return token ? {headers: {Authorization: `Bearer ${JSON.parse(token).access}`}}: defaultConfig})

    const navigate = useNavigate()

    console.log(user)
    const loginUser = (credentials: Credentials)=> {


        axios
        .post(DRF_ADRESS + '/user_api/token/',
            credentials
        )
        .then(res =>{
            if (res.status === 200){

                setAuthTokens(res.data)
                setUser(jwtDecode(res.data.access))
                
                setConfig({
                    headers: {Authorization: `Bearer ${res.data.access}`}
                    })
                localStorage.setItem('authTokensDFM', JSON.stringify(res.data))
                navigate('/')
                notify_success('Logged in')
                console.log(jwtDecode(res.data.access))
            }
        })

        .catch(err => {
            
            console.log(err)
            setAuthError({error:err, detail: err.response.data})
            notify_error('Bad credentials or no VPN connection')
            })
    }

    const logoutUser = () => {
        setAuthTokens(defaultAuthTokens)
        setUser(defaultUser)
        setConfig(defaultConfig) 
        localStorage.removeItem('authTokensDFM')

    }

    const registerUser = (registerForm: RegisterForm) => {
        
        axios
        .post(DRF_ADRESS + '/user_api/register/',
            registerForm
        )
        .then(res =>{
            if (res.status === 201){

                console.log('created')
                notify_success('created')
                setCreated(!created)
 
            }
        })

        .catch(err => {
            
            console.log(err)
            setAuthError({error:err, detail: err.response.data})
            notify_error('Bad credentials or no VPN connection')
            })


    }

    const updateToken = async ()=> {

        axios.post(DRF_ADRESS + '/user_api/token/refresh/',
                {
                    'refresh': authTokens?.refresh, config
                }
        ).then(res => {
            if (res.status === 200){
                setAuthTokens({...authTokens, access: res.data.access})
                setUser(jwtDecode(res.data.access))
                setConfig({
                    headers: {Authorization: `Bearer ${res.data.access}`}
                    })
                localStorage.setItem('authTokensDFM', JSON.stringify({...authTokens, access: res.data.access}))
                
            
            }else{
                logoutUser()
            }
        })
        .catch(() => {
            logoutUser()})
    }


    

    useEffect(()=> {

        let interval: number
        let thirteen: number = 1000 * 60 * 6
        if(loading){
            setLoading(false)
            updateToken()
            setAuthError({error:'', detail: []})

        }else{
   
        
            interval =  setInterval(()=> {
                if(authTokens){
                    updateToken()
                }
            }, thirteen)


        }

        return ()=> clearInterval(interval)


    }, [authTokens, loading])


    return(
        <AuthContext.Provider value={{
            config:config,
            user:user,
            authTokens:authTokens,
            loginUser:loginUser,
            logoutUser:logoutUser,
            registerUser: registerUser,
            setAuthError: setAuthError,
            authError: authError,
            created: created,

        }} >
            {loading ? null : children}
            
         
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider')
    }
    return context
}