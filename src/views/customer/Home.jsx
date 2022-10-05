import { Link, Outlet, useNavigate } from "react-router-dom";
import ProfilePicture from "../../img/snswhomepage.JPG";
import { useContext } from "react";

import { jwt } from "../../identity";
import { TokenContext } from "../../App";



const Home = () => {
  const navigate = useNavigate();
  const [token,setToken] = useContext(TokenContext)
  

  return (
    <div className="pl-72">
      <div className="home-bar">
        <Link className="home-link" to="/">
          MyServiceNSW Account
        </Link>
      </div>
      <br />
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="mt-10"
      >
        <div className="login-input">
          <img
            onClick={() => navigate("/")}
            className="w-left cursor-pointer object-contain w-[200px] "
            src={ProfilePicture}
          />
          <Link to={"/customer"} className="h-lnk">
            Home
          </Link>
          <Link to={"/customer/services"} className="h-lnk">
            Display license
          </Link>
        </div>
        
        
      </div>
      <div >
                <p className="mt-3 mr-7" >Welcome {jwt(token).firstname}</p>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                <button onClick={()=>{setToken(undefined); navigate("/"); }} className="link pointer" style={{border:'none'}}>Log out</button>
            </div>
      
      
      
      

      
      <Outlet />
    </div>
  );
};
export default Home;
