import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCustomersAsync,
  fetchCustomerLicenceAsync,
  issueLicenceAsync,
} from "../../web-services";

const IssueLicence = () => {
  const [customers, setCustomers] = useState([]);
  const [email, setEmail] = useState("");
  const [customer, setCustomer] = useState();
  const [licence, setLicence] = useState();
  const[dkt,setDkt] = useState(false)

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
    if(dkt==="yes"){
    issueLicenceAsync(customer._id)
      .then((j) => navigate(`/admin/customer/${customer._id}/licence`))
      .catch((e) => alert("error issuing licence"));
  }
  else{
    alert("DKT is pending !!!")
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
              -- Please Select Gender
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
          {licence && (
            <div>
              
              <p>This customer already has a Learner's Licence:</p>
              <p>Licence: {licence._id}</p>
              <p>Issued: {new Date(licence.issued).toDateString()}</p>
              <button onClick={() => setCustomer(null)}>Cancel</button>
            </div>
          )}
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
