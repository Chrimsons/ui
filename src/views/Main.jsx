import { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import { TokenContext } from "../App";
import { isInRole } from "../identity";
import ProfilePicture from "../img/snswhomepage.JPG";

const Main = () => {
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();

  if (!token) {
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
          <img
            onClick={() => navigate("/")}
            className="w-left cursor-pointer object-contain w-[200px]"
            src={ProfilePicture}
          />
          <br />
        </div>
        <h2 className="user-h">MyServiceNSW Driver License</h2>
        <br />
        <div className="ml-7">
          <p className="user-p">Welcome to Service NSW Driver License page</p>
          <p className="user-p">
            Please{" "}
            <Link className="page-link ml-1 mr-1" to="/login">
              sign in
            </Link>{" "}
            or
            <Link className="page-link ml-1 mr-1" to="/register">
              {" "}
              register{" "}
            </Link>
            to access content.
          </p>
          <br />
          <button
            className="userinfo-btn-red"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>{" "}
          <span className="px-0.5" />
          <button
            className="userinfo-btn-blue"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>

      </div>
    );
  }

  return (
    <div style={{ margin: "auto"}} className="pl-72">
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
        {" "}
        {token && isInRole(token, "customer") && (
          <div className="login-input">
            <img
              onClick={() => navigate("/customer")}
              className="w-left cursor-pointer object-contain w-[200px]"
              src={ProfilePicture}
            />
            <Link to={"/customer"} className="h-lnk">
              Home
            </Link>
            <Link to={"/customer/services"} className="h-lnk">
              Services
            </Link>
            <Link to={"/customer/services"} className="h-lnk">
              New Log
            </Link>
            
          </div>
          
        )}
        {token && isInRole(token, "admin") && (
          <div className="login-input">
            <img
              onClick={() => navigate("/admin")}
              className="w-left cursor-pointer object-contain w-[200px]"
              src={ProfilePicture}
            />
            <Link to={"/admin"} className="h-lnk">
              Home
            </Link>
            <Link to={"/admin/licence/issue"} className="h-lnk">
              Issue Licence
            </Link>
          </div>
        )}
      </div>
      <UserInfo />
      <Outlet />
    </div>
  );
};

export default Main;
