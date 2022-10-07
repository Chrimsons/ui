import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLicencesAsync } from "../../web-services";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BlankProfile from "../../img/blank.jpg";
import Header from "./CustomerHeader";

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
        <Header />
        <div>
          <div>
            <div>
              <h2 className="mt-10 text-4xl mr-7">
                Welcome {jwt(token).firstname}
              </h2>
            </div>
            <div className="border-[3px] border-red-500 w-fit ml-72 p-10 mt-20">
              <div>
                <div>
                  <img
                    src="data:image/jpeg;base64,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"
                    alt="Error!"
                    className="w-[100px] ml-44"
                  />
                </div>
                <br />
                <div>
                  <p className="text-center font-semibold text-red-500 mb-3">
                    No Licence Found!
                  </p>
                </div>
              </div>
              <div className="text-center text-xl">
                <div>
                  For more information on how to apply for a license. <br />
                  <a
                    href="https://www.service.nsw.gov.au/transaction/apply-learner-driver-licence"
                    target="_blank"
                    className="px-1 page-link"
                  >
                    Click Here
                  </a>
                  <br />
                </div>
              </div>
              <div className="mt-7 text-center text-2xl font-semibold border-[2px] pt-2 py-3 hover:bg-slate-100 bg-slate-200">
                <a href="https://www.service.nsw.gov.au/service-centre">
                  Click Here <br /> To find a Service NSW Centre Near you
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pl-72">
        <Header />
        <div style={{ display: "flex", justifyContent: "space-between" }}></div>

        <h2 className="mt-10 text-4xl mr-7">
          Welcome
          <span className="italic font-extrabold">{jwt(token).firstname}</span>
        </h2>
        <div className="mt-20 ml-72 text-2xl font-semibold">
          {licences.map((l) => (
            <div key={l._id} className="tile">
              <div className="my-10">
                <div className="border-[3px] border-yellow-300 border-dotted mx-5">
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
                            }h ${l.total.minutes - l.totalNightHours.minutes}m`}
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
              </div>
              <div></div>
              <br />
              <button
                className="rounded-full px-10 py-3 text-center hover:bg-blue-500"
                onClick={() => navigate(`/customer/licence/${l._id}/logbook`)}
              >
                Display hours
              </button>
              <button
                className="rounded-full px-10 py-3 ml-5 text-center bg-yellow-600 hover:bg-yellow-400"
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
