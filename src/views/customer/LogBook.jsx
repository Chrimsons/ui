import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchLicenceByIdAsync } from "../../web-services";
import { addLogbookEntryAsync } from "../../web-services";
import LogEntry from "./LogEntry";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import ProfilePicture from "../../img/snswhomepage.JPG";
import { useContext } from "react";
import Footer from "../../Footer";

const LogBook = () => {
  const { licenceId } = useParams();
  const [licence, setLicence] = useState();
  const [start, setStart] = useState(new Date().toDatetimeLocal());
  const [end, setEnd] = useState(new Date().addHours(1).toDatetimeLocal());
  const [instructor, setInstructor] = useState(false);
  const [nightTime, setNightTime] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useContext(TokenContext);
  useEffect(() => {
    fetchLicenceByIdAsync(licenceId)
      .then((j) => setLicence(j))
      .catch((e) => {});
  }, [licenceId]);

  const addLogBookEntry = () => {
    let entry = {
      start: Date.getLongFromDateTimeInput(start),
      end: Date.getLongFromDateTimeInput(end),
      instructor: instructor,
      nightTime: nightTime,
    };
    addLogbookEntryAsync(licenceId, entry).then((j) => setLicence(j));
  };

  const licenceJSX = () => {
    if (!licence) return;

    return (
      <div>
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
            <Link className="mr-5" to="/">
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
            <h2 className="mt-10 text-4xl mr-7">
              Welcome{" "}
              <span className="italic font-extrabold">
                {jwt(token).firstname}
              </span>
            </h2>

          </div>
          <div className="form-logbook mx-64 pl-14">
            <h2 className="ml-52">Total Hours</h2>
            {licence.logEntries.map((e) => (
              <div className="mt-7" key={e.start}>
                <LogEntry entry={e} />
              </div>
            ))}
            <br />
            <button
              className="rounded-full mt-10 px-10 py-3 text-2xl font-semibold text-center ml-56"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>

          <br />
        </div>
      </div>
    );
  };

  return <div>{licenceJSX()}</div>;
};
export default LogBook;
