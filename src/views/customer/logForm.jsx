import { useEffect } from "react";
import { useState } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import { fetchLicenceByIdAsync } from "../../web-services";
import { addLogbookEntryAsync } from "../../web-services";

import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import ProfilePicture from "../../img/snswhomepage.JPG";
import { useContext } from "react";

const LogForm = () => {
  const { licenceId } = useParams();
  const [licence, setLicence] = useState();
  const [start, setStart] = useState(new Date().toDatetimeLocal());
  const [end, setEnd] = useState(new Date().addHours(1).toDatetimeLocal());
  const [instructor, setInstructor] = useState(false);
  const navigate = useNavigate();
  const [token,setToken] = useContext(TokenContext)
  

  

  const addLogBookEntry2 = () => {
    let entry = {
      start: Date.getLongFromDateTimeInput(start),
      end: Date.getLongFromDateTimeInput(end),
      instructor: instructor,
    };
    addLogbookEntryAsync(licenceId, entry)
    .then((j) => setLicence(j));
  };

  const licenceJSX = () => {
    if (!licence) return;

    return (
      <div>
        <div className="pl-72">
      <div className="home-bar">
        <Link className="home-link" to="/">
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
            onClick={() => navigate("/")}
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
      <div >
                <p className="mt-3 mr-7" >Welcome {jwt(token).firstname}</p>
                <br/>
                
            </div>
            <div className="ml-72 text-center">
         
        </div>
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
              onClick={addLogBookEntry2}
            >
              Add
            </button>
          </div>
        </form>
        <br />
       
      </div>
      <button onClick={()=>{setToken(undefined); navigate("/"); }} 
                className="link pointer" style={{border:'none'}}>Log out</button>
      </div>
    );
          
  };

  return (
  <div>
    {licenceJSX()}
    </div>
  )
};
export default LogForm;