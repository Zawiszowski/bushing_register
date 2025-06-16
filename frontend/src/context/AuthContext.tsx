import { createContext, useState, useEffect, useContext } from 'react'
import {jwtDecode} from "jwt-decode";
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import {DRF_ADRESS} from '../data/constants.tsx'
import { notify_error, notify_success } from '../utils/basicToasts.js';
import type { AuthTokens, Config, AuthContextType, AuthProviderType, Credentials } from '../types/index.tsx';


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
  

const AuthContext = createContext<AuthContextType | undefined>(undefined)




export const AuthProvider: React.FC<AuthProviderType> = ({children}) => {

    const [authTokens, setAuthTokens] = useState<AuthTokens>(()=>{ const tokens = localStorage.getItem('authTokensDFM'); return tokens ? JSON.parse(tokens) : defaultAuthTokens})
    const [user, setUser] = useState<string>(()=> {const token = localStorage.getItem('authTokensDFM'); return token ? jwtDecode(JSON.parse(token).access) : ''})
    const [loading, setLoading] = useState<boolean>(true)
    const [config, setConfig] = useState<Config>(()=> {const token = localStorage.getItem('authTokensDFM'); return token ? {headers: {Authorization: `Bearer ${JSON.parse(token).access}`}}: defaultConfig})

    const navigate = useNavigate()


    const loginUser = (credentials: Credentials)=> {
        console.log(credentials)


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
            }
        })

        .catch(err => {
            console.log(err)
            
            notify_error('Bad credentials or no VPN connection')
            })
    }

    let logoutUser = () => {
        setAuthTokens(defaultAuthTokens)
        setUser('')
        setConfig(defaultConfig) 
        localStorage.removeItem('authTokensDFM')

    }

    let updateToken = async ()=> {

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
            logoutUser:logoutUser

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