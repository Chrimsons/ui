import { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";
import { TokenContext } from "../App";
import { isInRole } from "../identity";
import ProfilePicture from "../img/snswhomepage.JPG";
import Learners from "../img/learnersOne.jpg";
import Footer from "../Footer";
import Header from "./customer/CustomerHeader";
import Welcome from "../Welcome";

const Main = () => {
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="pl-64">
        <div className="home-bar">
          <Link className="home-link" to="/">
            MyServiceNSW Account
          </Link>
          <Footer />
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
        <img
          src={Learners}
          className="object-contain w-7/12 mr-24 float-right"
        />
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
    <div className="pl-72">
      <div>
        {token && isInRole(token, "customer") && (
          <div>
            <Header />
            <Welcome/>
          </div>
        )}
        {token && isInRole(token, "admin") && (
          <div>
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
      <Footer />
      <Outlet />
    </div>
  );
};

export default Main;
