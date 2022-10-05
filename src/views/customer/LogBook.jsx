import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLicenceByIdAsync } from "../../web-services";
import { addLogbookEntryAsync } from "../../web-services";
import LogEntry from "./LogEntry";

const LogBook = () => {
  const { licenceId } = useParams();
  const [licence, setLicence] = useState();
  const [start, setStart] = useState(new Date().toDatetimeLocal());
  const [end, setEnd] = useState(new Date().addHours(1).toDatetimeLocal());
  const [instructor, setInstructor] = useState(false);

  useEffect(() => {
    fetchLicenceByIdAsync(licenceId)
      .then((j) => setLicence(j))
      .catch((e) => {});
  }, [licence]);

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
    };
    addLogbookEntryAsync(licenceId, entry).then((j) => setLicence(j));
  };

  const licenceJSX = () => {
    if (!licence) return;

    return (
      <div>
        <form className="form-loghours mx-64">
          <h2 className="">New Log Entry:</h2>
          <div className="text-2xl ml-20 mb-10 font-semibold">
            Licence No: {licence._id}
          </div>
          <div>
            <span>
              <label> Start: </label>
              <input
                type="datetime-local"
                value={start}
                required={true}
                onChange={(e) => setStart(e.target.value)}
              />
            </span>
            <span>
              <label> End: </label>
              <input
                type="datetime-local"
                value={end}
                required={true}
                min={start}
                onChange={(e) => setEnd(e.target.value)}
              />
            </span>
            <span>
              <label className="ml-52">
                <input
                  type="checkbox"
                  checked={instructor}
                  onChange={() => setInstructor(!instructor)}
                />{" "}
                Instructor
              </label>
              <p className="mt-5 ml-52 font-semibold text-lg">{`Hours: ${licence.total.hours} | Minutes: ${licence.total.minutes}`}</p>
            </span>
            <br />
            <button
              className="log-btn-red mt-5 ml-48"
              onClick={addLogBookEntry}
            >
              Add
            </button>
          </div>
        </form>
        <br />
        <div className="ml-72 text-center">
          {licence.logEntries.map((e) => (
            <span key={e.start}>
            <LogEntry  entry={e} />
            <br />
            </span>
          ))}
        </div>
      </div>
    );
  };

  return <div>{licenceJSX()}</div>;
};
export default LogBook;
