import { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import { TokenContext } from "../App";
import { isInRole } from "../identity";
import ProfilePicture from "../img/snswhomepage.JPG";

const Main = () => {
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();

  if(!token) {
    return(
        <div style={{ margin: "auto"}} className="pl-72">
      <div className="home-bar">
        <Link className="home-link" to="/">
          MyServiceNSW Account
        </Link>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }} className="mt-10">
        <img
          onClick={() => navigate("/")}
          className="w-left cursor-pointer object-contain w-[200px]"
          src={ProfilePicture}
        />
        <br />
      </div>
      <h2 className="user-h">MyServiceNSW Driver License</h2>
          <br />
          <div>
            <p className="user-p">Welcome to Service NSW Driver License page</p>
            <p className="user-p">
              Please{" "}
              <Link className="form-link" to="/login">
                sign in
              </Link>{" "}
              or
              <Link className="form-link" to="/register">
                {" "}
                register{" "}
              </Link>
              to access content.
            </p>
          </div>
          <br />
          <div>
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
    )
  }

  return (
    <div style={{ margin: "auto"}} className="pl-72">
      <div className="home-bar">
        <Link className="home-link" to="/">
          MyServiceNSW Account
        </Link>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }} className="mt-10">
        <img
          onClick={() => navigate("/")}
          className="w-left cursor-pointer object-contain w-[200px]"
          src={ProfilePicture}
        />
        <br />
        {token && isInRole(token, "customer") && (
          <Link to={"/customer"} className="link">
            Home
          </Link>
        )}
        {token && isInRole(token, "admin") && (
          <Link to={"/admin"} className="link">
            Home
          </Link>
        )}
        <UserInfo />
      </div>
      <h2 className="user-h">MyServiceNSW Driver License</h2>
          <br />
          <div>
            <p className="user-p">Welcome to Service NSW Driver License page</p>
            <p className="user-p">
              Please{" "}
              <Link className="form-link" to="/login">
                sign in
              </Link>{" "}
              or
              <Link className="form-link" to="/register">
                {" "}
                register{" "}
              </Link>
              to access content.
            </p>
          </div>
          <br />
          <div>
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
      

      <Outlet />
    </div>
  );
};

export default Main;
