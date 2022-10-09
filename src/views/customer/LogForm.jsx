import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchLicenceByIdAsync,
  addLogbookEntryAsync,
} from "../../web-services";
import { TokenContext } from "../../App";
import Header from "../Header";
import Welcome from "../Welcome";
import Footer from "../Footer";

const LogForm = () => {
  const { licenceId } = useParams();
  const [licence, setLicence] = useState();
  const [start, setStart] = useState(new Date().toDatetimeLocal());
  const [end, setEnd] = useState(new Date().addHours(1).toDatetimeLocal());
  const [instructor, setInstructor] = useState(false);
  const [nightTime, setNightTime] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLicenceByIdAsync(licenceId)
      .then((j) => setLicence(j))
      .catch((e) => {});
  }, [licenceId]);

  const addLogBookEntry2 = () => {
    let entry = {
      start: Date.getLongFromDateTimeInput(start),
      end: Date.getLongFromDateTimeInput(end),
      instructor: instructor,
      nightTime: nightTime,
    };
    addLogbookEntryAsync(licenceId, entry).then((j) => setLicence(j));
    alert("Hours updated");
    navigate(`/customer/services`);
  };

  const licenceJSX = () => {
    if (!licence) return;

    return (
      <body>
        <Header />
        <Welcome />

        <section>
          <form className="form-loghours ml-72 bg-gray-100">
            <h2 className="text-center border-[1px] mr-6 py-6 border-black bg-gray-200">
              New Log Entry
            </h2>

            <div className="start-end">
              <div className="start">
                <label className="text-center">Start:</label>
                <input
                  type="datetime-local"
                  value={start}
                  required={true}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>

              <div className="end">
                <label className="text-center">End:</label>
                <input
                  type="datetime-local"
                  value={end}
                  required={true}
                  min={start}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>

            <div className="instAndNight flex flex-column justify-left mt-5 w-fit ml-[90px] mb-10">
              <div className="instructor">
                <label className="mr-20">
                  <input
                    type="checkbox"
                    checked={instructor}
                    onChange={() => setInstructor(!instructor)}
                  />
                  Instructor
                </label>
                <p className="mt-5 font-semibold text-lg text-center mr-5">
                  Total Hours: <br />
                  {`Hours: ${licence.total.hours} | Minutes: ${licence.total.minutes}`}
                </p>
              </div>

              <div className="night">
                <label>
                  <input
                    type="checkbox"
                    checked={nightTime}
                    onChange={() => setNightTime(!nightTime)}
                  />
                  Night Time
                </label>
                <p className="mt-5  font-semibold text-lg text-center ml-2">
                  Night Hours: <br />
                  {`Hours: ${licence.totalNightHours.hours} | Minutes: ${licence.totalNightHours.minutes}`}
                </p>
              </div>
            </div>

            <div className="buttons">
              <button
                className="rounded-full mt-5 ml-24 px-14 py-3 text-center hover:bg-red-500 bg-red-600"
                onClick={addLogBookEntry2}
              >
                Add Entry
              </button>

              <button
                className="rounded-full px-20 py-3 ml-6 text-center hover:bg-blue-500 bg-blue-600"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Back
              </button>
            </div>
          </form>
        </section>

        <Footer />
      </body>
    );
  };

  return <div>{licenceJSX()}</div>;
};
export default LogForm;
