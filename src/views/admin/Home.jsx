import { Link, Outlet, useNavigate } from "react-router-dom";
import ProfilePicture from "../../img/snswhomepage.JPG";
import UserInfo from "../UserInfo";
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
          <button onClick={()=>{setToken(undefined); navigate("/"); }} 
          className="link pointer" style={{border:'none'}}> Log out</button>
         
        </Link>
        <Link className="home-link" to="/admin">
           <pre> MyServiceNSW Account   </pre>
        </Link>
      </div>
      <br />
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="mt-10"
      >
        <div className="login-input">
          <img
            onClick={() => navigate("/admin")}
            className="w-left cursor-pointer object-contain w-[200px] "
            src={ProfilePicture}
          />
          <Link to={"/admin"} className="h-lnk">
            Home
          </Link>
          <Link to={"/admin/licence/issue"} className="h-lnk">
            Issue Licence
          </Link>
        </div>
        
      </div>
      
      
      <p className="mt-3 mr-7" >Welcome, {jwt(token).firstname}</p>
      <h3>You are logged in as an administrator</h3>
      
      
      <Outlet />
      {/* <h2 className="mt-24">Welcome to the Admin page</h2>
      <p className="text-3xl ml-7">
      Click <Link className="page-link" to="/admin/licence/issue">Here</Link> 
      to search and issue a new License</p> */}
    </div>
  );
};
export default Home;
