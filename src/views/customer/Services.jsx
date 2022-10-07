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
import BlankProfile from "../../img/blank.jpg";

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
          <Link className=" mr-5" to="/">
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
        <div style={{ display: "flex", justifyContent: "space-between" }}></div>

        <h2 className="mt-10 text-4xl mr-7">
          Welcome{" "}
          <span className="italic font-extrabold">{jwt(token).firstname}</span>
        </h2>
        <div className="mt-20 ml-72 text-2xl font-semibold">
          {licences.map((l) => (
            <div key={l._id} className="tile">
              <p className="my-10">
                <div className="border-[3px] mx-5">
                  <p className="text-4xl mt-7 ml-1 font-bold text-lime-600">
                    Learner's Driver Licence
                  </p>
                  <img
                    className="ml-[90px] mt-10 mb-3 w-[300px] "
                    src={BlankProfile}
                  />
                  <p className="text-center text-xl font-semibold mb-3">
                    {jwt(token).firstname} {jwt(token).lastname}
                  </p>
                  <div className="text-2xl text-center mb-10 font-semibold text-yellow-600">
                    Licence No: {l._id}
                  </div>
                </div>
                <div className="mt-10">
                  <div>
                    <div>
                      Total Hours: <br />
                    </div>
                    <div>{` ${l.total.hours} hours / ${l.total.minutes} minutes`}</div>
                  </div>
                  <br />
                  <div>
                    Remaining Hours: <br />
                    <div className="border-[3px] mt-3 mx-52 border-dotted border-black ">
                      {120 - l.total.hours}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center mt-10">
                  <div className="text-yellow-500">
                    Day hours: <br />
                    {` ${l.total.hours - l.totalNightHours.hours} hours | ${
                      l.total.minutes - l.totalNightHours.minutes
                    } minutes`}
                    <br />
                    {
                      <span className="bar">
                        <br />
                        <div className="bar">
                          <CircularProgressbar
                            value={l.total.hours - l.totalNightHours.hours}
                            maxValue={100}
                            text={`${
                              l.total.hours - l.totalNightHours.hours
                            }h ${
                              l.total.minutes - l.totalNightHours.minutes
                            }m`}
                          />
                        </div>
                      </span>
                    }
                  </div>
                  <div className="ml-5 text-blue-500">
                    Total Night Hours: <br />
                    {` ${l.totalNightHours.hours} hours | ${l.totalNightHours.minutes} minutes`}
                    {
                      <span className="bar">
                        <br />
                        <br />
                        <div className="bar">
                          <CircularProgressbar
                            value={l.totalNightHours.hours}
                            maxValue={20}
                            text={`${l.totalNightHours.hours}h ${l.totalNightHours.minutes}m`}
                          />
                        </div>
                      </span>
                    }
                  </div>
                </div>
              </p>
              <div>
              </div>
              <br />
              <button
                className="rounded-full px-10 py-3 text-center hover:bg-blue-500"
                onClick={() => navigate(`/customer/licence/${l._id}/logbook`)}
              >
                Display hours
              </button>
              <button
                className="rounded-full px-10 py-3 text-center bg-yellow-600 hover:bg-yellow-400"
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
