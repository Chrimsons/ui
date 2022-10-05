import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwt } from "../identity";
import { TokenContext } from "../App";
import ProfilePicture from "../img/snswhomepage.JPG";

const UserInfo = () => {
  const [token, setToken] = useContext(TokenContext);

  const navigate = useNavigate();

  const getUserInfo = () => {
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
      <div>
        <p className="mt-3 mr-7">Welcome {jwt(token).firstname}</p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <button
          onClick={() => {
            setToken(undefined);
            navigate("/");
          }}
          className="link pointer"
          style={{ border: "none" }}
        >
          Log out
        </button>
      </div>
    );
  };

  return getUserInfo();
};

export default UserInfo;
