import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../App";
import ProfilePicture from "../img/snswhomepage.JPG";

export default function RegisterHeader() {
  const navigate = useNavigate();
  const [token, setToken] = useContext(TokenContext);

  return (
    <div>
      <div className="home-bar">
        <Link className="home-link" to="/customer">
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
            onClick={() => navigate("/customer")}
            className="w-left cursor-pointer object-contain w-[200px] "
            src={ProfilePicture}
          />
          <Link to={"/customer"} className="h-lnk">
            Home
          </Link>
          <a
            href="https://www.service.nsw.gov.au/transaction/apply-learner-driver-licence#eligibility"
            className="h-lnk"
            target="blank"
          >
            Check eligibility
          </a>
          <a href="https://www.service.nsw.gov.au/service-centre" className="h-lnk">
            Find Location
          </a>
        </div>
        <div>
          <Link
            to="/customer"
            className="h-lnk italic"
            title="Mon-Fri 7am - 7pm"
          >
            Contact us @ 13 77 88
          </Link>
          <button
            onClick={() => {
              setToken(undefined);
              navigate("/");
            }}
            className="link pointer mr-10 ml-5 rounded-lg"
            style={{ border: "none" }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
