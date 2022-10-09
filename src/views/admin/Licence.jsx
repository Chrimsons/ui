import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCustomerByIdAsync,
  fetchCustomerLicenceAsync,
} from "../../web-services";
import CongratsPicture from "../../img/congratulations.jpg";
import BlankProfile from "../../img/blank.jpg";
import Welcome from "../Welcome";
import Footer from "../Footer";
import Header from "../Header";

const Licence = () => {
  const navigate = useNavigate();
  let { customerId } = useParams();
  const [customer, setCustomer] = useState();
  const [licence, setLicence] = useState();

  useEffect(() => {
    fetchCustomerByIdAsync(customerId).then((j) => setCustomer(j));

    fetchCustomerLicenceAsync(customerId).then((j) => setLicence(j));
  }, [customerId]);

  return (
    <div>
      <Header />
      <Welcome />
      <div>
        <section>
          <div className="ml-72 mt-20 border-[4px] w-fit p-5 ">
            <img className="m-auto w-[400px]" src={BlankProfile} />
            <p className="text-4xl font-bold mt-10 mb-6 text-center">
              {customer.firstname} {customer.lastname}
            </p>
            <p className="text-xl font-semibold italic mb-3 text-center">
              Licence: {licence._id}
            </p>
            <p className="font-semibold text-2xl mb-5 mt-7 text-center">
              This customer has been issued a
              <span className="italic font-bold"> Learners</span> licence
            </p>
            <img
                onClick={() => navigate("/")}
                className="m-auto cursor-pointer w-[300px] "
                src={CongratsPicture}
              />
            <button
              class="ml-44 bg-yellow-600 hover:bg-yellow-500 mt-10 px-10 py-3 text-2xl font-semibold text-center text-white"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Licence;
