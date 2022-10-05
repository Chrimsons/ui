import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCustomersAsync,
  fetchCustomerLicenceAsync,
  issueLicenceAsync,
  issuePLicenceAsync
} from "../../web-services";


const IssueLicence = () => {
  const [customers, setCustomers] = useState([]);
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState();
  const [licence, setLicence] = useState();
  const[p,setP]= useState(false)
  const[dkt,setDkt] = useState("")
  const[hours,setHours] = useState("")
  const[driving,setDriving] = useState("")

  let navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      fetchCustomerLicenceAsync(customer._id)
        .then((j) => setLicence(j))
        .catch((e) => setLicence(undefined));
    }
  }, [customer]);

  const fetchCustomers = () => {
    fetchCustomersAsync(`email=${email}`).then((j) => setCustomers(j));
  };

  const customerSearchJSX = () => {
    if (!customer) {
      return (
        <div>
                    <div class="text-lg font-semibold mb-3">Customer Search</div>
                    <div style={{marginBottom:15}}>
                        <input value={email} onChange={e=>setEmail(e.target.value)} />
                        <button onClick={fetchCustomers}>Search Customers</button>
                    </div>
                    {customers.length == 0 && 'Showing 0 Customers'}  
                    {customers.length > 0 && customers.map(c=><div className="tile pointer" key={c._id} 
                    onClick={()=>setCustomer(c)}>{c.email}</div>)}          
                </div>
      );
    }
  };

  const submitLicence = () => {
   
    if(dkt=="Yes"){
      
    issueLicenceAsync(customer._id)
      .then((j) => navigate(`/admin/customer/${customer._id}/licence`))
      .catch((e) => alert("error issuing licence"));
  }
  else{
    alert("DKT is pending !!!")
  }
}
const provisional = () =>{
  if(hours=="Yes" && driving=="Yes") {
  setP(true)
  issuePLicenceAsync(customer._id)
  .then((j) => navigate(`/admin/customer/${customer._id}/licence`))
  .catch((e) => alert("error issuing licence"));
  //navigate(`/admin/customer/prov`)
  
  }
  else{
  alert("DT/HPT/Hours is pending !!!")
  }
  
    
}

  const issueLicenceJSX = () => {
    if (customer) {
      return (
        <div >
          <div class="text-lg font-semibold mb-3">Customer: {customer.email}</div>
          {!licence && (
            <div>
              <p>Please only proceed if the customer has passed the DKT  </p>
              <div>
          <label>DKT:</label>
          <select value={dkt} onChange={(e) => setDkt(e.target.value)}>
            <option disabled={true} value="">
              -- Please Select 
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            
          </select>
        </div>
              <br/>

              <button onClick={submitLicence}>Issue</button>
              <button onClick={() => setCustomer(null)}>Cancel</button>
            </div>
          )}
           {p && (
            <div>
              <p>This customer has been issued a provisional license</p>

              </div>
          )}
          
{
          licence && (
            
            <div>
              {
                !p &&(
                  <div>
                    <p>This customer has a Learner's Licence:</p>
              <p>Licence: {licence._id}</p>
              <p>Issued: {new Date(licence.issued).toDateString()}</p>
              <div>
          <label>Total hours complete?:</label>
          <select value={hours} onChange={(e) => setHours(e.target.value)}>
            <option disabled={true} value="">
              -- Please Select 
            </option>
            <option value="Yes">Yes</option>
            
            <option value="No">No</option>
            
          </select>
        </div>
        <div>
          <label>Driving Test:</label>
          <select value={driving} onChange={(e) => setDriving(e.target.value)}>
            <option disabled={true} value="">
              -- Please Select 
            </option>
            <option value="Yes">Pass</option>
            <option value="No">Fail</option>
            
          </select>
        </div>
              <button onClick={provisional}>Issue Provisional</button>
              <button onClick={() => setCustomer(null)}>Cancel</button>
            </div>
          )}
                    </div>
                )
              }
              
              
               
    
    
         
        </div>
      );
    }
  };

  return (
    <div>
      <br />
      {customerSearchJSX()}
      {issueLicenceJSX()}
    </div>
  );
};
export default IssueLicence;
