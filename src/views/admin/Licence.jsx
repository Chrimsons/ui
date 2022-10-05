import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomerByIdAsync, fetchCustomerLicenceAsync } from "../../web-services";

const Licence = () => {
    
    let { customerId } = useParams();
    const [customer,setCustomer] = useState()
    const [licence,setLicence] = useState()

    useEffect(()=>{
        fetchCustomerByIdAsync(customerId)
            .then(j=>setCustomer(j))
      
        fetchCustomerLicenceAsync(customerId)
            .then(j=>setLicence(j))
      
    },[customerId])

    const customerJSX = () => {
        if(!customer) return; 

        return (
            <div>
                <div>Customer: {customer.email}</div>
            </div>
        ); 
    }

    const licenceJSX = () => {
        if(!licence) return; 

        return (
            <div>
                <div>Licence: {licence._id}</div>
            </div>
        ); 
    }

    return (
        <div>
            {customerJSX()}
            {licenceJSX()}
        </div>
    )
}

export default Licence; 