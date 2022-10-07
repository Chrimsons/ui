import { Link, Outlet, useNavigate } from "react-router-dom";
import ProfilePicture from "../../img/snswhomepage.JPG";
import Transition from "../../img/transition.jpg"
import { useContext } from "react";

import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import Footer from "../../Footer";

const Home = () => {
  const navigate = useNavigate();

  const [token, setToken] = useContext(TokenContext);

  return (
    <div className="pl-72">
      <div className="home-bar">
        <Link className="home-link" to="/admin">
          MyServiceNSW Account
        </Link>
        <Footer/>
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
        <Link className=" mr-5" to="/admin">
          <button
            onClick={() => {
              setToken(undefined);
              navigate("/");
            }}
            className="link pointer"
            style={{ border: "none" }}
          >
            {" "}
            Log out
          </button>
        </Link>
      </div>
      <img src={Transition} className="object-contain mt-20 mr-40 w-7/12 float-right" />

      <h2 className="mt-20 text-4xl mr-7">
        Welcome,{" "}
        <span className="italic font-extrabold">{jwt(token).firstname}</span>
      </h2>
      
      <h3 className="ml-7 mt-40 font-semibold text-2xl">
        You are logged in as an {jwt(token).roles}
      </h3>
      <p className="ml-7 mt-10 text-xl font-semibold">click <Link className="page-link" to={"/admin/licence/issue"}>here</Link> to issue a new licence</p>
      <Outlet />
      {/* <h2 className="mt-24">Welcome to the Admin page</h2>
      <p className="text-3xl ml-7">
      Click <Link className="page-link" to="/admin/licence/issue">Here</Link> 
      to search and issue a new License</p> */}
    
    </div>
  );
};
export default Home;
