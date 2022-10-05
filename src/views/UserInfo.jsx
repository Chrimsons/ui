
import { useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { jwt } from "../identity";
import { TokenContext } from "../App";

const UserInfo = () => {

    const [token,setToken] = useContext(TokenContext)

    const navigate = useNavigate(); 

    const getUserInfo = ()=>{
        if(!token){
            return (
                <div className="user-info">
                    <Link to="/login" className="link" style={{marginRight:5}}>Login</Link>  
                    <Link to="/register" className="link"> Register</Link>
                </div>
            ); 
        }
        return (
            <div className="user-info menu">
                <p style={{margin:'0px 15px'}}>Logged in as {jwt(token).email}</p>
                <button onClick={()=>{setToken(undefined); navigate("/login"); }} className="link pointer" style={{border:'none'}}>Log out</button>
            </div>
        );

    }

    return(getUserInfo()); 
   
}

export default UserInfo; 