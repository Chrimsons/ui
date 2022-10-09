import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchLicenceByIdAsync,
  addLogbookEntryAsync,
} from "../../web-services";
import LogEntry from "./LogEntry";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import Header from "../Header";
import Footer from "../Footer";
import Welcome from "../Welcome";

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
        <Header />
        <Welcome />
        <section>
          <div className="form-logbook mx-64 pl-14">
            <h2 className="ml-52">Total Hours</h2>
            {licence.logEntries.map((e) => (
              <div className="mt-7" key={e.start}>
                <LogEntry entry={e} />
              </div>
            ))}
            <br />
            <button
              className="total-hours-btn"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  };

  return <div>{licenceJSX()}</div>;
};
export default LogBook;
