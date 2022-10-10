import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../App";
import { isInRole, jwt } from "../identity";
import ProfilePicture from "../img/snswhomepage.JPG";

export default function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useContext(TokenContext);

  if (!token) {
    <header>
      <div className="home-bar ">
        <Link className="home-link " to="/">
          MyServiceNSW Account
        </Link>
      </div>
      <br />
      <div className="mt-10 flex justify-between ">
        <div className="login-input justify-start ">
          <img
            onClick={() => navigate("/")}
            className="w-left cursor-pointer object-contain w-[200px] "
            src={ProfilePicture}
          />
          <Link to={"/"} className="h-lnk">
            Home
          </Link>
          <a
            href="https://www.service.nsw.gov.au/transaction/apply-learner-driver-licence#eligibility"
            className="h-lnk"
            target="blank"
          >
            Check eligibility
          </a>
          <a
            href="https://www.service.nsw.gov.au/service-centre"
            className="h-lnk"
          >
            Find Location
          </a>
        </div>
        <div>
          <a
            href="tel:137788"
            className="h-lnk italic"
            title="Mon-Fri 7am - 7pm"
          >
            Contact us @ 13 77 88
          </a>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="register pointer bg-blue-500 hover:bg-blue-400 mr-10 ml-5 rounded-lg"
            style={{ border: "none" }}
          >
            Home
          </button>
        </div>
      </div>
    </header>;
  }

  return (
    <>
      {token && isInRole(token, "customer") && (
        <header>
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
              <Link to={"/"} className="h-lnk">
                Home
              </Link>
              <Link to={"/customer/services"} className="h-lnk">
                Display license
              </Link>
              <a
                href="https://www.service.nsw.gov.au/transaction/apply-learner-driver-licence#eligibility"
                className="h-lnk"
                target="blank"
              >
                Check eligibility
              </a>
              <a
                href="https://www.service.nsw.gov.au/service-centre"
                className="h-lnk"
                target="blank"
              >
                Find Locations
              </a>
              <a
                href="tel:137788"
                className="h-lnk italic"
                title="Mon-Fri 7am - 7pm"
              >
                Contact us @ 13 77 88
              </a>
            </div>
            <div>
              <Link
                to="/"
                className="side-link italic"
                title="Mon-Fri 7am - 7pm"
              >
                Logged in as {jwt(token).firstname}
              </Link>
              <button
                onClick={() => {
                  setToken(undefined);
                  navigate("/");
                }}
                className="link pointer mr-10 ml-5 rounded-lg hover:bg-red-500"
                style={{ border: "none" }}
              >
                Log out
              </button>
            </div>
          </div>
        </header>
      )}
      {token && isInRole(token, "admin") && (
        <header className="">
          <div className="home-bar">
            <Link className="home-link" to="/">
              MyServiceNSW Account
            </Link>
          </div>
          <br />
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            className="mt-10 "
          >
            <div className="login-input">
              <img
                onClick={() => navigate("/")}
                className="w-left cursor-pointer object-contain w-[200px] "
                src={ProfilePicture}
              />
              <Link to={"/"} className="h-lnk">
                Home
              </Link>
              <Link to={"/admin/licence/issue"} className="h-lnk">
                Issue Licence
              </Link>
              <a
                href="https://www.service.nsw.gov.au/transaction/apply-learner-driver-licence#eligibility"
                className="h-lnk"
                target="blank"
              >
                Check eligibility
              </a>
              <a
                href="https://www.service.nsw.gov.au/service-centre"
                className="h-lnk"
                target="blank"
              >
                Find Locations
              </a>
              <a
                href="tel:137788"
                className="h-lnk italic"
                title="Mon-Fri 7am - 7pm"
              >
                Contact us @ 13 77 88
              </a>
            </div>
            <div>
              <Link
                to="/"
                className="side-link italic"
                title="Mon-Fri 7am - 7pm"
              >
                Logged in as {jwt(token).firstname} {jwt(token).roles}
              </Link>
              <button
                onClick={() => {
                  setToken(undefined);
                  navigate("/");
                }}
                className="link pointer hover:bg-red-500 mr-10 ml-5 rounded-lg"
                style={{ border: "none" }}
              >
                Log out
              </button>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
