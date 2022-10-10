import { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../App";
import { isInRole, jwt } from "../identity";
import Learners from "../img/learnersOne.jpg";
import LearnersTwo from "../img/learnerstwo.jpg";
import Transition from "../img/transition.jpg";
import ProfilePicture from "../img/snswhomepage.JPG";
import Footer from "./Footer";
import Header from "./Header";
import Welcome from "./Welcome";

const Main = () => {
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();

  return (
    <>
      {!token && (
        <div>
          <header>
            <div className="home-bar">
              <Link className="home-link" to="/">
                MyServiceNSW Account
              </Link>
            </div>
            <br />
            <div className=" main-none-link">
              <img onClick={() => navigate("/")} src={ProfilePicture} />
              <Link to={"/"} className="main-links">
                Home
              </Link>
              <a
                href="https://www.service.nsw.gov.au/transaction/apply-learner-driver-licence#eligibility"
                className="main-links"
                target="blank"
              >
                Check eligibility
              </a>
              <a
                href="https://www.service.nsw.gov.au/service-centre"
                className="main-links"
              >
                Find Location
              </a>
              <a
                href="tel:137788"
                className="main-links italic"
                title="Mon-Fri 7am - 7pm"
              >
                Contact us @ 13 77 88
              </a>
              <div className="main-links-btn">
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="bg-red-600 hover:bg-red-400"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className=" bg-blue-600 hover:bg-blue-400 ml-1"
                >
                  Register
                </button>
              </div>
            </div>
          </header>

          <section>
            <h2 className="user-h">MyServiceNSW Driver License</h2>
            <br />
            <img
              src={Learners}
              className="object-contain w-7/12 mr-24 float-right"
            />
            <div className="ml-7">
              <p className="user-p">
                Welcome to Service NSW Driver License page
              </p>
              <p className="user-p">
                Please
                <Link className="page-link ml-1 mr-1" to="/login">
                  sign in
                </Link>
                or
                <Link className="page-link ml-1 mr-1" to="/register">
                  register
                </Link>
                to access content.
              </p>
              <br />
              <button
                className="userinfo-btn-red"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <span className="px-0.5" />
              <button
                className="userinfo-btn-blue"
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
            </div>
          </section>
          <Footer />
        </div>
      )}
      {token && isInRole(token, "customer") && (
        <div className="main-customer">
          <Header />
          <Welcome />
          <section className="main-customer-section">
            <img src={LearnersTwo} />
            <p>
              Click
              <a
                href="https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences/proof-of-identity/proving-your-identity"
                target="blank"
              >
                here
              </a>
              to find more information about identification requirements.
            </p>
          </section>
          <Footer />
        </div>
      )}
      {token && isInRole(token, "admin") && (
        <div className="main-admin">
          <Header />
          <Welcome />
          <section>
            <div className="main-admin-section">
              <img src={Transition} />
              <div className="main-admin-section-word">
                <Link
                  className="main-admin-section-link"
                  to={"/admin/licence/issue"}
                >
                  Click here to issue a new licence
                </Link>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Main;
