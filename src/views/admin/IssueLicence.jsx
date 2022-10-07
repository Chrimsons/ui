import { useEffect, useState } from "react";

import {
  fetchCustomersAsync,
  fetchCustomerLicenceAsync,
  issueLicenceAsync,
  issuePLicenceAsync,
} from "../../web-services";
import CongratsPicture from "../../img/congratulations.jpg";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ProfilePicture from "../../img/snswhomepage.JPG";
import Transition from "../../img/transition.jpg";
import { useContext } from "react";

import { jwt } from "../../identity";
import { TokenContext } from "../../App";

const IssueLicence = () => {
  const [customers, setCustomers] = useState([]);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [customer, setCustomer] = useState();
  const [licence, setLicence] = useState();
  const [p, setP] = useState(false);
  const [dkt, setDkt] = useState("");
  const [hours, setHours] = useState("");
  const [driving, setDriving] = useState("");
  let navigate = useNavigate();
  const [token, setToken] = useContext(TokenContext);

  function Display() {
    return (
      <div>
        <div className="pl-72">
          <div className="home-bar">
            <Link className="home-link" to="/admin">
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
                onClick={() => navigate("/admin")}
                className="w-left cursor-pointer object-contain w-[200px] "
                src={ProfilePicture}
              />
              <Link to={"/admin"} className="h-lnk">
                Home
              </Link>
              <Link to={"/admin/licence/issue"} className="h-lnk">
                Issue Licence
              </Link>
            </div>
            <Link className=" mr-5" to="/">
              <button
                onClick={() => {
                  setToken(undefined);
                  navigate("/");
                }}
                className="link pointer"
                style={{ border: "none" }}
              >
                {" "}
                Log out
              </button>
            </Link>
          </div>

          <h2 className="mt-20 text-4xl mr-7">
            Welcome,{" "}
            <span className="italic font-extrabold">
              {jwt(token).firstname}
            </span>
          </h2>

          <h3 className="ml-7 mt-10 font-semibold text-2xl">
            You are logged in as an {jwt(token).roles}
          </h3>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (customer) {
      fetchCustomerLicenceAsync(customer._id)
        .then((j) => setLicence(j))
        .catch((e) => setLicence(undefined));
    }
  }, [customer]);

  const fetchCustomers = () => {

    return fetchCustomersAsync(`email=${email}`).then((j) => setCustomers(j))
    
  };

  const customerSearchJSX = () => {
    if (!customer) {
      return (
        <>
          <div className="ml-64 mt-10 border-[4px] border-collapse w-fit p-5 ">
            <div className="text-lg font-semibold mb-3 ">Customer Search</div>
            <div style={{ marginBottom: 15 }}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={fetchCustomers}>Search Customers</button>
            </div>
            {customers.length == 0 && "Showing 0 Customers"}
            {customers.length > 0 &&
              customers.map((c) => (
                <div
                  className="tile pointer"
                  key={c._id}
                  onClick={() => setCustomer(c)}
                >
                  <div className="text-left flex justify-center">
                    First Name: {c.firstname}
                    <br />
                    Last Name: {c.lastname}
                    <br />
                    Email: {c.email}
                    <br />
                    Mobile: {c.mobile}
                  </div>
                </div>
              ))}
          </div>
        </>
      );
    }
  };

  const submitLicence = () => {
    if (dkt == "Yes") {
      issueLicenceAsync(customer._id)
        .then((j) => navigate(`/admin/customer/${customer._id}/licence`))
        .catch((e) => alert("Error issuing licence"));
    } else {
      alert("DKT is pending !!!");
    }
  };
  const provisional = () => {
    if (hours == "Yes" && driving == "Yes") {
      setP(true);
      issuePLicenceAsync(licence._id);

      //navigate(`/admin/customer/prov`)
    } else {
      alert("DT/HPT/Hours is pending !!!");
    }
  };

  const issueLicenceJSX = () => {
    if (customer) {
      return (
        <div className="ml-64 mt-10 border-[4px] border-collapse w-fit p-5 ">
          <div className="text-2xl font-semibold mb-3 text-center">
            Customer: {customer.email}
          </div>
          {!licence && (
            <div>
              <p className="text-xl  mb-5 mt-7 ">
                Please only proceed if the customer has passed the DKT{" "}
              </p>
              <div className="border-[2px] w-fit pr-20 mt-10 ml-16">
                <label>DKT:</label>
                <select value={dkt} onChange={(e) => setDkt(e.target.value)}>
                  <option disabled={true} value="">
                    -- Please Select
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <br />
              <button
                className="rounded-full bg-red-700 hover:bg-red-500 mt-10 px-10 py-3 text-2xl font-semibold text-center ml-24"
                onClick={submitLicence}
              >
                Issue
              </button>
              <button
                class="rounded-full hover:bg-blue-500 mt-10 px-10 py-3 text-2xl font-semibold text-center ml-4"
                onClick={() => setCustomer(null)}
              >
                Cancel
              </button>
            </div>
          )}
          {p && (
            <div>
              <img
                onClick={() => navigate("/admin")}
                className="w-left ml-6 cursor-pointer object-contain w-[500px] "
                src={CongratsPicture}
              />
              <p className="font-semibold text-2xl mb-5 mt-7 text-center">
                This customer has been issued a{" "}
                <span className="italic font-bold">provisional</span> license
              </p>
              <button
                class="ml-52 bg-yellow-600 hover:bg-yellow-500 mt-10 px-10 py-3 text-2xl font-semibold text-center"
                onClick={() => navigate("/admin")}
              >
                Home
              </button>
            </div>
          )}

          {licence && (
            <div>
              {!p && (
                <div>
                  <p className="text-xl  mb-5 mt-7 text-center">
                    This customer has a Learner's Licence:
                  </p>
                  <p className="  mb-5 mt-7 text-center">
                    Licence: {licence._id}
                  </p>
                  <p className="font-semibold  mb-5 mt-7 text-center">
                    Issued: {new Date(licence.issued).toDateString()}
                  </p>
                  <div>
                    <label className="mb-5 mt-7 ml-24">
                      Total hours complete?:
                    </label>
                    <select
                      value={hours}
                      onChange={(e) => setHours(e.target.value)}
                    >
                      <option disabled={true} value="">
                        -- Please Select
                      </option>
                      <option value="Yes">Yes</option>

                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-5 mt-7 ml-24">Driving Test:</label>
                    <select
                      value={driving}
                      onChange={(e) => setDriving(e.target.value)}
                    >
                      <option disabled={true} value="">
                        -- Please Select
                      </option>
                      <option value="Yes">Pass</option>
                      <option value="No">Fail</option>
                    </select>
                  </div>
                  <button
                    class="rounded-full bg-red-700 hover:bg-red-500 mt-10 px-10 py-3 text-xl font-semibold text-center ml-2"
                    onClick={provisional}
                  >
                    Issue Provisional
                  </button>
                  <button
                    class="rounded-full hover:bg-blue-500 mt-10 px-20 py-3 text-xl font-semibold text-center ml-4"
                    onClick={() => setCustomer(null)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <br />
      <Display />
      <div className="ml-80 mt-24">
        {customerSearchJSX()}
        {issueLicenceJSX()}
      </div>
    </div>
  );
};
export default IssueLicence;
