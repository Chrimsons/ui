import { useEffect, useState, useContext } from "react";
import {
  fetchCustomersAsync,
  fetchCustomerLicenceAsync,
  issueLicenceAsync,
  issuePLicenceAsync,
} from "../../web-services";
import CongratsPicture from "../../img/congratulations.jpg";
import { useNavigate } from "react-router-dom";
import BlankProfile from "../../img/blank.jpg";
import { jwt } from "../../identity";
import { TokenContext } from "../../App";
import AdminHeader from "./AdminHeader";
import Welcome from "../../Welcome";

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
      <div className="pl-72">
        <div>
          <AdminHeader />
        </div>
        <div>
          <Welcome />
        </div>
        <div>
          <h3 className="ml-7 mt-5 font-semibold text-2xl">
            You are logged in as an {jwt(token).roles}
          </h3>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (customer) {
      fetchCustomerLicenceAsync(customer._id)
        .then((j) => {
          setLicence(j);
        })
        .catch((e) => setLicence(undefined));
    }
  }, [customer]);

  const fetchCustomers = () => {
    return fetchCustomersAsync(`email=${email}`).then((j) => setCustomers(j));
  };

  const customerSearchJSX = () => {
    if (!customer) {
      return (
        <>
          <div className="ml-72 mt-5 border-[4px] border-collapse w-fit p-5 ">
            <div className="my-5 py-5 border-[2px] border-slate-400 bg-slate-100">
              <label
                className="text-lg text-left font-semibold ml-7"
                htmlFor="customerSearch"
              >
                Customer Search:
              </label>
              <div className="float-right">
                <input
                  className="border-black active:border-blue-400 active:bg-blue-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="mr-5" onClick={fetchCustomers}>
                  Search Customers
                </button>
              </div>
            </div>
            <div className="text-center text-xl font-semibold text-red-600">
              {customers.length == 0 && "Showing 0 Customers"}
            </div>
            {customers.length > 0 &&
              customers.map((c) => (
                <div
                  className="tile pointer hover:bg-yellow-100 bg-slate-100 text-lg font-semibold"
                  key={c._id}
                  onClick={() => setCustomer(c)}
                >
                  <div className="text-left flex justify-center ">
                    First Name: {c.firstname}
                    <br />
                    Last Name: {c.lastname}
                    <br />
                    Email: {c.email}
                    <br />
                    Mobile: {c.mobile}
                    <br />
                    DOB:
                    {new Date(c.dob).toDateString()}
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
        <div className="ml-72 border-[4px]  w-fit p-5 ">
          <div className="text-4xl font-bold mb-7 mt-2 text-center">
            Customer Information
          </div>
          {!licence && (
            <div>
              <div className="text-3xl font-bold mb-7 mt-2 text-center">
                {customer.firstname} {customer.lastname}
              </div>
              <div className="border-[2px] border-black mt-10 pt-4 py-14">
                <div>
                  <label className="float-left ml-24">DKT Completed ?</label>
                </div>
                <div>
                  <select
                    className="border-[1px] border-black float-right mr-24 mt-[5px] active:bg-slate-200 text-center"
                    value={dkt}
                    onChange={(e) => setDkt(e.target.value)}
                  >
                    <option disabled={true} value="">
                      -- Please Select --
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="text-xl mt-7 text-red-500 font-semibold">
                  Please only proceed if the customer has passed the DKT
                </p>
              </div>
              <div className="mb-4">
                <button
                  className="rounded-full bg-red-700 hover:bg-red-500 px-10 py-3 text-2xl font-semibold text-center ml-24"
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
                This customer has been issued a
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
                  <div className="border-[3px] border-yellow-300 border-dotted pb-4">
                    <div>
                      <p className="text-4xl  mb-5 mt-7 text-center font-bold text-lime-600">
                        Learner's Driver Licence
                      </p>
                      <img className="ml-9 w-[400px]" src={BlankProfile} />
                      <p className="ml-9 text-xl font-semibold mt-3">
                        Name: {customer.firstname} {customer.lastname}
                      </p>
                      <p className="mb-5 text-2xl font-semibold mt-3 text-center underline text-yellow-600">
                        Licence: {licence._id}
                      </p>
                      <div className="flex flex-row font-semibold pb-5 mt-7 text-center justify-evenly ">
                        <p>Issued: {new Date(licence.issued).toDateString()}</p>
                        <p>
                          Expiry:
                          {new Date(
                            licence.issued + 157784630000
                          ).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="font-semibold mb-5 mt-2 text-2xl text-center border-[3px] border-blue-300">
                    <p className="mb-5 mt-3">
                      Total hours done: <br />
                    </p>
                    <p className="italic mb-5 border-dotted border-[3px] border-blue-400 mx-40">
                      {licence.total.hours}
                    </p>
                  </div>
                  <div className="flex flex-row ml-10">
                    <div className="float-left mr-10 text-right">
                      <div>
                        <label className="ml-2">Total hours completed ?</label>
                      </div>
                      <div>
                        <label className=" ">HPT Completed ?</label>
                      </div>
                    </div>
                    <div className="float-right text-center">
                      <div>
                        <select
                          className="border-[1px] border-black  mt-[5px] active:bg-slate-200 text-center"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                        >
                          <option disabled={true} value="">
                            -- Please Select --
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <select
                          className="border-[1px] border-black mt-[5px] active:bg-slate-200 text-center"
                          value={driving}
                          onChange={(e) => setDriving(e.target.value)}
                        >
                          <option disabled={true} value="">
                            -- Please Select --
                          </option>
                          <option value="Yes">Pass</option>
                          <option value="No">Fail</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-red-500 font-semibold mt-5 text-lg">
                    <p>120 hours and Hazard Perception Test</p>
                    <p>Has to be completed before continuing!</p>
                  </div>
                  <div>
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
