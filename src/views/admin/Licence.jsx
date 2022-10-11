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
  const [customer, setCustomer] = useState([]);
  const [licence, setLicence] = useState([]);

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
          <div className="learners-licence">
            <div>
              <span className="border-[3px] border-yellow-400 border-dotted p-10">
              <h3 className="text-4xl mb-10 text-lime-600">
                  Learner's Driver Licence
                </h3>
                <img className="w-[400px]" src={BlankProfile} />
                <p className="learners-text-one">
                  {customer.firstname} {customer.lastname}
                </p>
                <p className="learners-text-two">Licence: {licence._id}</p>
              </span>
              <img
                onClick={() => navigate("/")}
                className="mt-5 cursor-pointer w-[300px] "
                src={CongratsPicture}
              />
              <p className="learners-text-three">
                This customer has been issued a<span> Learners</span> licence!
              </p>

              <button className="licence-button" onClick={() => navigate("/")}>
                Home
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Licence;
