import { useEffect } from "react";
import { useState } from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import { fetchLicenceByIdAsync } from "../../web-services";
import { addLogbookEntryAsync } from "../../web-services";
import LogEntry from "./LogEntry";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import ProfilePicture from "../../img/snswhomepage.JPG";
import { useContext } from "react";

const LogBook = () => {
  const { licenceId } = useParams();
  const [licence, setLicence] = useState();
  const [start, setStart] = useState(new Date().toDatetimeLocal());
  const [end, setEnd] = useState(new Date().addHours(1).toDatetimeLocal());
  const [instructor, setInstructor] = useState(false);
  const navigate = useNavigate();
  const [token,setToken] = useContext(TokenContext)
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
            <div className="form-loghours mx-64">
          {licence.logEntries.map((e) => <div>
          <LogEntry  key={e.start}  entry={e} 
          />
          <br/>
          </div>
            
            
            
            
          )}
        </div>
        
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
export default LogBook;
