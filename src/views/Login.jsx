import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../web-services";
import { TokenContext } from "../App";
import { isInRole } from "../identity";
import { useEffect } from "react";

export default function Login(){

    const [token,setToken] = useContext(TokenContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('password')
    const navigate = useNavigate(); 
    
    useEffect(()=>{
        if(token){
            if(isInRole(token,'customer')){ navigate("/customer") }
            else if(isInRole(token,'admin')){ navigate('/admin') }
            else { navigate("/login") }
        }
    },[token])

    function login(){
        loginAsync(email,password)
            .then(t => setToken(t))
            .catch(e => alert(e.message))
    }

    return(
        <div class="form-container">
            <h2>Sign In</h2>
            <div>
                <label>Email: </label>
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
            </div>
            <div style={{marginBottom:10}}>
                <label>Password: </label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            <button onClick={login} style={{width:'100%'}}>Sign in</button>
        </div>
    ); 
}