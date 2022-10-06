import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchLicencesAsync } from "../../web-services";
import ProfilePicture from "../../img/snswhomepage.JPG";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import { useContext } from "react";
import Locations from "../../img/Location.png";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Services = () => {
  const [licences, setLicences] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useContext(TokenContext);

  useEffect(() => {
    fetchLicencesAsync().then((j) => setLicences(j));
  }, []);
  if (licences == "") {
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
          </div>
        </div>

        <div>
          <p className="mt-3 mr-7">Welcome {jwt(token).firstname}</p>
          <br />
          <h1>No license has been issued</h1>
          <br />
          <h1>
            Please{" "}
            <a
              href="https://www.service.nsw.gov.au/transaction/apply-learner-driver-licence"
              target="_blank"
            >
              click here
            </a>{" "}
            to find more infofrmation on how to apply for a license
          </h1>
          <p>
            <a
              href="https://www.service.nsw.gov.au/service-centre"
              target="_blank"
            >
              {" "}
              <img src={Locations} width="400" height="600" />{" "}
            </a>{" "}
          </p>

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
      </div>
    );
  }

  return (
    <>
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
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          
        ></div>

        <p className="mt-3 ml-7 mr-7">Welcome {jwt(token).firstname}</p>

        <div className="mt-20 ml-72 text-2xl font-semibold">
          {licences.map((l) => (
            <div key={l._id} className="tile">
              <p className="mt-10">Licence: {l._id}</p>
              <p className="my-10">
                Total: {`Hours: ${l.total.hours} Minutes: ${l.total.minutes}`}
                {
                  <span className="bar">
                    <br />
                    <br />
                    <CircularProgressbar
                      value={l.total.hours}
                      maxValue={120}
                      text={`${l.total.hours} hours`}
                    />
                  </span>
                }
              </p>
              <button
                className="rounded-full px-10 py-3 text-center"
                onClick={() => navigate(`/customer/licence/${l._id}/logbook`)}
              >
                Display hours
              </button>
              <button
                className="rounded-full px-10 py-3 text-center "
                onClick={() => navigate(`/customer/licence/${l._id}/logform`)}
              >
                Log new hours
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Services;
