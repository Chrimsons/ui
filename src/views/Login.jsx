import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAsync } from "../web-services";
import { TokenContext } from "../App";
import { isInRole } from "../identity";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Login() {
  const [token, setToken] = useContext(TokenContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("password");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (isInRole(token, "customer")) {
        navigate("/");
      } else if (isInRole(token, "admin")) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  }, [token]);

  function login() {
    loginAsync(email, password)
      .then((t) => setToken(t))
      .catch((e) => alert(e.message));
  }

  return (
      <body>
      <Header />
        <section>
          <div className="form ml-72">
            <h2 className="text-center">Sign In</h2>
            <div>
              <label>Email: </label>
              <br />
              <input
                placeholder="Please enter your e-mail"
                type="text"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label>Password: </label>
              <input
                placeholder="Please enter your password"
                type="password"
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <button className="form-btn-red" onClick={login}>
              Sign in
            </button>
            <button
              className="form-btn-blue"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Back
            </button>
            <br />
            <Link className="form-link" to="/register">
              Create an account instead
            </Link>
          </div>
        </section>
        <Footer />
      </body>
  );
}
