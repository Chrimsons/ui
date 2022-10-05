import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCustomerByIdAsync,
  fetchCustomerLicenceAsync,
} from "../../web-services";
import CongratsPicture from "../../img/congratulations.jpg";

const Licence = () => {
  const navigate = useNavigate();
  let { customerId } = useParams();
  const [customer, setCustomer] = useState();
  const [licence, setLicence] = useState();

  useEffect(() => {
    fetchCustomerByIdAsync(customerId).then((j) => setCustomer(j));

    fetchCustomerLicenceAsync(customerId).then((j) => setLicence(j));
  }, [customerId]);

  const customerJSX = () => {
    if (!customer) return;

    return (
      <div>
        <div className="text-2xl font-semibold mb-3 ">
          Customer: {customer.email}
        </div>
      </div>
    );
  };

  const licenceJSX = () => {
    if (!licence) return;

    return (
      <div>
        <div>Licence: {licence._id}</div>
      </div>
    );
  };

  return (
    <div className="ml-64 mt-20 border-[4px] border-collapse w-fit p-5 ">
      <img
        onClick={() => navigate("/admin")}
        className="w-left cursor-pointer object-contain w-[500px] "
        src={CongratsPicture}
      />
      <div className="text-4xl font-bold mt-10 mb-6 ml-32 ">{customerJSX()}</div>
      <div className="text-xl font-semibold italic mb-3 ml-24 ">{licenceJSX()}</div>
      <button
        class="ml-44 bg-yellow-600 hover:bg-yellow-500 mt-10 px-10 py-3 text-2xl font-semibold text-center"
        onClick={() => navigate("/admin")}
      >
        Home
      </button>
    </div>
  );
};

export default Licence;
