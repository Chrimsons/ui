import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLicencesAsync } from "../../web-services";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BlankProfile from "../../img/blank.jpg";
import Error from "../../img/error.jpg";
import Header from "../Header";
import Welcome from "../Welcome";
import Footer from "../Footer";

const Services = () => {
  const [licences, setLicences] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useContext(TokenContext);

  useEffect(() => {
    fetchLicencesAsync().then((j) => setLicences(j));
  }, []);
  if (licences == "") {
    return (
      <div>
        <Header />
        <Welcome />
        <section>
          <div className="customer-services-no-licence ">
            <div>
              <div>
                <img src={Error} alt="Error!" title="Error!" />
              </div>
              <br />
              <p>No Licence Found!</p>
            </div>
            <div className="customer-services-no-licence-div">
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
            <div className="customer-services-no-licence-box">
              <a href="https://www.service.nsw.gov.au/service-centre">
                To find a Service NSW Centre Near you <br /> Click Here
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Welcome />

      <section>
        {licences.map((l) => (
          <div key={l._id} className="customer-service-licence">
            <div className="customer-service-licence-profile">
              <div>
                <h2 className="text-4xl mt-7 text-lime-600">
                  Learner's Driver Licence
                </h2>
                <img src={BlankProfile} />
                <p className="mb-3">
                  {jwt(token).firstname} {jwt(token).lastname}
                </p>
                <div className="mb-10 text-yellow-600">Licence No: {l._id}</div>
              </div>
            </div>

            <div className="total-remaining-hours">
              <h4>Total Hours:</h4>
              <p>{` ${l.total.hours} hours / ${l.total.minutes} minutes`}</p>
              <h4>Remaining Hours:</h4>
              <p className="total-remaining-hours-box">{120 - l.total.hours}</p>
            </div>

            <div className="progress-bar ">
              <div className="progress-bar-day">
                Day hours: <br />
                {` ${l.total.hours - l.totalNightHours.hours} hours | ${
                  l.total.minutes - l.totalNightHours.minutes
                } minutes`}
                <br />
                {
                  <div className="bar">
                    <CircularProgressbar
                      value={l.total.hours - l.totalNightHours.hours}
                      maxValue={100}
                      text={`${l.total.hours - l.totalNightHours.hours}h ${
                        l.total.minutes - l.totalNightHours.minutes
                      }m`}
                    />
                  </div>
                }
              </div>
              <div className="progress-bar-night">
                Total Night Hours: <br />
                {` ${l.totalNightHours.hours} hours | ${l.totalNightHours.minutes} minutes`}
                {
                  <div className="bar">
                    <CircularProgressbar
                      value={l.totalNightHours.hours}
                      maxValue={20}
                      text={`${l.totalNightHours.hours}h ${l.totalNightHours.minutes}m`}
                    />
                  </div>
                }
              </div>
            </div>

            <div className="buttons">
              <button
                className="customer-service-blue-btn"
                onClick={() => navigate(`/customer/licence/${l._id}/logbook`)}
              >
                Display hours
              </button>
              <button
                className="customer-service-yellow-btn"
                onClick={() => navigate(`/customer/licence/${l._id}/logform`)}
              >
                Log new hours
              </button>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
};
export default Services;
