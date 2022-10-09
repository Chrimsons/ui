import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchLicenceByIdAsync,
  addLogbookEntryAsync,
} from "../../web-services";
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
      <div>
        <Header />
        <Welcome />

        <section>
          <form className="form-loghours">
            <h2>New Log Entry</h2>
            <div className="form-loghours-start-end">
              <div className="start">
                <label>Start:</label>
                <input
                  type="datetime-local"
                  value={start}
                  required={true}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>

              <div className="end">
                <label>End:</label>
                <input
                  type="datetime-local"
                  value={end}
                  required={true}
                  min={start}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>

            <div className="form-loghours-day-night">
              <div className="instructor">
                <label className="mr-20">
                  <input
                    type="checkbox"
                    checked={instructor}
                    onChange={() => setInstructor(!instructor)}
                  />
                  Instructor
                </label>
                <p>
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
                <p>
                  Night Hours: <br />
                  {`Hours: ${licence.totalNightHours.hours} | Minutes: ${licence.totalNightHours.minutes}`}
                </p>
              </div>
            </div>

            <div className="form-loghours-buttons">
              <button
                className="form-loghours-red-btn"
                onClick={addLogBookEntry2}
              >
                Add Entry
              </button>

              <button
                className="form-loghours-blue-btn"
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
      </div>
    );
  };

  return <div>{licenceJSX()}</div>;
};
export default LogForm;
