import React, { useState} from 'react';


import {
    // Logo,
    LoginButton,
}
from './login.styles.js'



import axios from "axios"
import { Container, Card, Row, Col, Title, SectionTitle} from '../../styles/Generic.styles.js';

import { useAuthContext } from '../../context/AuthContext.js';



axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;




const Login = () =>{
    const {loginUser, user, logoutUser} = useAuthContext();

    let [credentials, setCredentials] = useState({
        email:'',
        password:'',

    })
const changeHandler = (e : React.ChangeEvent<HTMLInputElement>) =>{

    const prevCredentials = {... credentials, [e.target.type]: e.target.value}
    setCredentials(prevCredentials)
}
 // TODO change to render body functior is more elegant way
    let body

    if (user){
        body = 
            <Card>
                <div style={{fontSize: '20px'}}>You are successfully logged in as: </div><br/>
                {/* <div style={{fontSize: '25px', marginBottom: '3rem'}}>{user.email.split('@')[0].split('.')[0].toUpperCase()} {user.email.split('@')[0].split('.')[1].toUpperCase()}</div> */}
                <LoginButton  onClick={logoutUser} style={{marginTop: '0.5rem'}}>Logout</LoginButton>
            </Card>
    }else{
        body =
        <div>
            <div style={{marginTop: '1rem', marginBottom: '2rem', textAlign: 'center'}}>
            <b >Login</b> 
            <br/>
            <a>credentials</a>

            </div>
            <div>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
              <Row >
            <label>
                email                
            </label>
            </Row>
            <Row>
            <input className='mb-4' id='form1' name='tat' type='email' 
                value={credentials.email} onChange={changeHandler} />
            </Row>
            </Col>
            <Col style={{display: 'flex', justifyContent: 'center'}}>
            <Row >
            <label>

            password

                </label>
            </Row>
            <Row>
                <input className='mb-4'  id='form2' type='password' 
                value={credentials.password} onChange={changeHandler} />
            </Row>
            </Col>

            </div>
            <hr></hr>

            <div className="d-flex mx-4 mb-4">
                <input type='checkbox' name='flexCheck' value='' id='flexCheckDefault' />
                <a href="">Remember me</a>
            </div>
            <hr style={{marginBottom: '2rem'}}></hr>
            <LoginButton onClick={_ => loginUser(credentials)}>Login</LoginButton>
           
        </div>
    }

    return(
        
        <div>
            <Container style={{ marginBlock: '10rem'}} >
            <Card >

                <div className='row g-0 d-flex align-items-center'>

                <div className='col'>
                    {/* <Logo ></Logo> */}
                    
                </div>

                <div className='col'>

                    {body}

                </div>

                </div>

            </Card>
            </Container>
       
        </div>

    )

}

export default Login;