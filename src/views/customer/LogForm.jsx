import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchLicenceByIdAsync,
  addLogbookEntryAsync,
} from "../../web-services";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import Header from "./CustomerHeader";

const LogForm = () => {
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
      <div className="ml-72">
        <div>
          <Header />
        </div>
        <div>
          <div>
            <h2 className="mt-10 text-4xl mr-7">
              Welcome
              <span className="italic font-extrabold">
                {jwt(token).firstname}
              </span>
            </h2>
          </div>
          <div className="form-loghours ml-72 bg-gray-100">
            <form>
              <div>
                <h2 className="text-center border-[1px] mr-6 py-6 border-black bg-gray-200">
                  New Log Entry
                </h2>
              </div>
              <div>
                <div>
                  <label className="text-center">Start:</label>
                </div>
                <div>
                  <input
                    type="datetime-local"
                    value={start}
                    required={true}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="text-center">End:</label>
                </div>
                <div>
                  <input
                    type="datetime-local"
                    value={end}
                    required={true}
                    min={start}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </div>
                <div className="flex flex-column justify-left mt-5 w-fit ml-[90px] mb-10">
                  <div>
                    <div>
                      <label className="mr-20">
                        <input
                          type="checkbox"
                          checked={instructor}
                          onChange={() => setInstructor(!instructor)}
                        />
                        Instructor
                      </label>
                    </div>
                    <div className="text-center mr-5">
                      <p className="mt-5 font-semibold text-lg">
                        Total Hours: <br />
                        {`Hours: ${licence.total.hours} | Minutes: ${licence.total.minutes}`}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label className="">
                        <input
                          type="checkbox"
                          checked={nightTime}
                          onChange={() => setNightTime(!nightTime)}
                        />
                        Night Time
                      </label>
                    </div>
                    <div className="text-center ml-2">
                      <p className="mt-5  font-semibold text-lg">
                        Night Hours: <br />
                        {`Hours: ${licence.totalNightHours.hours} | Minutes: ${licence.totalNightHours.minutes}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 ml-24">
                  <button
                    className="rounded-full px-14 py-3 text-center hover:bg-red-500 bg-red-600"
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
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return <div>{licenceJSX()}</div>;
};
export default LogForm;
