import { useState,useContext } from "react"
import { useNavigate } from "react-router-dom"
import { registerAsync,parseDate } from "../web-services"
import { TokenContext } from "../App"

export default function Register(){

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [dob,setDob] = useState('');
    const [address,setAddress] = useState('') 

    const [token,setToken] = useContext(TokenContext)

    const navigate = useNavigate(); 

    function submit(){
        debugger; 
        registerAsync(email,password,Date.getLongFromDateInput(dob),address)
            .then(t=> {
                setToken(t)
                navigate("/customer")
            })
            .catch(e => alert(e.message)); 
    }

    return (
        <div class="form-container">
            <h2>Register Today</h2>
            <div>
                <label>Email</label>
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <div>
                <label>Date Of Birth</label>
                <input type="date" value={dob} onChange={e=>setDob(e.target.value)} />
            </div>
            <div style={{marginBottom:10}}>
                <label>Address</label>
                <input type="text" value={address} onChange={e=>setAddress(e.target.value)} />
            </div>
            <button onClick={submit} style={{width:'100%'}}>Register</button>
        </div>
    )
}