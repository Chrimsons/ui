import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLicencesAsync } from "../../web-services";

const Services = ()=>{

    const [licences,setLicences] = useState([])
    const navigte = useNavigate()

    useEffect(()=>{
        fetchLicencesAsync().then(j=>setLicences(j))
    },[])

    return (
        <div style={{marginTop:10}}>
            {licences.map(l=>
                <div key={l._id} onClick={()=>navigte(`/customer/licence/${l._id}/logbook`)} className="tile pointer">
                    <p>Licence: {l._id}</p>
                    <p>Logged Practice: {`Hours: ${l.total.hours} Minutes: ${l.total.minutes}`}</p>
                </div>
            )}
        </div>
    )
}
export default Services; 