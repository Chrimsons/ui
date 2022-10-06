import { Link, Outlet, useNavigate } from "react-router-dom";
import ProfilePicture from "../../img/snswhomepage.JPG";
import { useContext } from "react";
import LearnersTwo from "../../img/learnerstwo.jpg"
import { jwt } from "../../identity";
import { TokenContext } from "../../App";

const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(TokenContext);

  return (
    <div className="pl-72">
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
          <Link to={"/customer/services"} className="h-lnk">
            Display license
          </Link>
          <a href="https://www.service.nsw.gov.au/transaction/apply-learner-driver-licence#eligibility" className="h-lnk" target="blank">
            Check eligibility
          </a>
          <div className="h-lnk"
             title="Mon-Fri 7am - 7pm"> Contact us @ 13 77 88</div>
          
        </div>
        <Link className="home-link mr-5" to="/">
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
      <div>
      <img src={LearnersTwo} className="object-contain mt-20 mr-40 w-7/12 float-right" />

        <h2 className="mt-20 text-4xl mr-7">
          Welcome{" "}
          <span className="italic font-extrabold">{jwt(token).firstname}</span>
        </h2>

        <p className="ml-7 mt-32 font-semibold text-2xl">
          Click{" "}
          <a
            className="page-link mr-1"
            href="https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences
            /proof-of-identity/proving-your-identity"
            target="blank"
          >
            here
          </a>
          to find more information about identification requirements.
        </p>
      </div>

      <Outlet />
      
    </div>
  );
};
export default Home;
