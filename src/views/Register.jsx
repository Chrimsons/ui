import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerAsync } from "../web-services";
import { TokenContext } from "../App";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { isInRole, jwt } from "../identity";
import Welcome from "./Welcome";
import LearnersTwo from "../img/learnerstwo.jpg";
import Transition from "../img/transition.jpg";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("04");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const [token, setToken] = useContext(TokenContext);

  const navigate = useNavigate();

  function submit() {
    registerAsync(
      firstname,
      lastname,
      mobile,
      email,
      password,
      gender,
      Date.getLongFromDateInput(dob)
    )
      .then((t) => {
        setToken(t);
        navigate("/customer");
      })
      .catch((e) =>
        alert(
          "\nThe Email you selected is already in use. \n\nPlease use a different Email address or if you already have an account please login"
        )
      );
  }

  return (
    <>
      {!token && (
        <div>
          <Header />
          <section>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className=" register ml-72"
            >
              <h2 className="text-center">Sign up</h2>
              <div>
                <label>Email: </label>
                <br />
                <input
                  placeholder="Please enter an E-mail"
                  type="email"
                  value={email}
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>Password: </label>
                <br />
                <input
                  placeholder="Please enter a password"
                  required
                  title="6 characters minimum"
                  pattern=".{6,}"
                  minLength="6"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>First Name: </label>
                <br />
                <input
                  placeholder="Please enter your first name"
                  required={true}
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>Last Name: </label>
                <br />
                <input
                  placeholder="Please enter your last name"
                  required={true}
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>Mobile No:</label>
                <br />
                <input
                  required={true}
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>Date of Birth: </label>
                <br />
                <input
                  className="cursor-text"
                  type="date"
                  required={true}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label>Gender:</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled={true} value="">
                    -- Please Select Gender --
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-loghours-buttons">
                <button className="register-buttons-red">Create Account</button>
                <button
                  className="register-buttons-blue"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                >
                  Back
                </button>
              </div>
              <Link className="register-link" to="/login">
                Already have an account?
              </Link>
            </form>
          </section>
          <Footer />
        </div>
      )}
      {token && isInRole(token, "customer") && (
        <div>
          <Header />
          <Welcome />
          <section className="flex flex-row-reverse">
            <img src={LearnersTwo} className="mr-40 w-7/12 " />
            <p className="mt-32 font-semibold text-2xl">
              Click
              <a
                className="page-link mx-2"
                href="https://www.nsw.gov.au/driving-boating-and-transport/driver-and-rider-licences
          /proof-of-identity/proving-your-identity"
                target="blank"
              >
                here
              </a>
              to find more information about identification requirements.
            </p>
          </section>
          <Footer />
        </div>
      )}
      {token && isInRole(token, "admin") && (
        <div>
          <Header />
          <Welcome />
          <section>
            <img src={Transition} className=" mr-40 w-7/12 float-right" />
            <h3 className="ml-7 mt- font-semibold text-2xl">
              You are logged in as an {jwt(token).roles}
            </h3>
            <div className="ml-7 mt-52 text-xl font-semibold">
              <Link
                className="border-[2px] bg-yellow-400 hover:bg-yellow-300 p-5"
                to={"/admin/licence/issue"}
              >
                Click here to issue a new licence
              </Link>
            </div>
          </section>
          <Footer />
        </div>
      )}
    </>
  );
}
