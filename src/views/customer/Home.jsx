import { Link, Outlet, useNavigate } from "react-router-dom";
import ProfilePicture from "../../img/snswhomepage.JPG";
import UserInfo from "../UserInfo";
import { useEffect,useState,useContext } from "react";
import { fetchLicencesAsync } from "../../web-services";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";

const Home = () => {
  const navigate = useNavigate();
  const [licences,setLicences] = useState([])
  const [token,setToken] = useContext(TokenContext)


  useEffect(()=>{
      fetchLicencesAsync().then(j=>setLicences(j))
  },[])

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
            My Log Entries
          </Link>
        </div>
        
        
      </div>
      
      
      
      

      
      <Outlet />
    </div>
  );
};
export default Home;
