import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLicenceByIdAsync } from "../../web-services";
import { addLogbookEntryAsync } from "../../web-services";
import LogEntry from "./LogEntry";


const LogBook = ()=>{
    const {licenceId} = useParams()
    const [licence,setLicence] = useState()
    const [start,setStart] = useState(new Date().toDatetimeLocal())
    const [end,setEnd] = useState(new Date().addHours(1).toDatetimeLocal())
    const [instructor,setInstructor] = useState(false)

    useEffect(()=>{
        fetchLicenceByIdAsync(licenceId)
            .then(j=>setLicence(j))
            .catch(e =>{}); 
    },[licenceId])

    const addLogBookEntry = () => {
       
        let entry = {
            start:Date.getLongFromDateTimeInput(start),
            end:Date.getLongFromDateTimeInput(end),
            instructor:instructor
        }; 
        addLogbookEntryAsync(licenceId,entry)
            .then(j=>setLicence(j))
    }

    const licenceJSX = () => {
        if(!licence) return; 

        return (
            <div>
                <h2>Log Book - Total: {`Hours: ${licence.total.hours} Minutes: ${licence.total.minutes}`}</h2>
                <div>Licence: {licence._id}</div>

                <div className="tile">
                    <span>
                        <label> Start: </label>
                        <input type="datetime-local" value={start} onChange={e=>setStart(e.target.value)}/>
                    </span>
                    <span>
                        <label> End: </label>
                        <input type="datetime-local" value={end} onChange={e=>setEnd(e.target.value)}/>
                    </span>
                    <label style={{marginLeft:25}}>
                        <input type="checkbox" checked={instructor} onChange={()=>setInstructor(!instructor)}/> Instructor 
                    </label> 
                    <button style={{marginLeft:25}} onClick={addLogBookEntry}>Add</button>
                </div>

                <div>
                    {licence.logEntries.map(e=> <LogEntry key={e.start} entry={e}/>)}
                </div>
            </div>
        ); 
    }

    return (
        <div>
          
            {licenceJSX()}
        </div>
    )
}
export default LogBook; 