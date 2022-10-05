import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerAsync, parseDate } from "../web-services";
import { TokenContext } from "../App";
import { Link } from "react-router-dom";

import Header from "../Header";

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
    debugger;
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
      .catch((e) => alert(e.message));
  }

  return (
    <>
    <form onSubmit={(e) => {
      e.preventDefault();
      submit();
    }}
    className="form m-auto"
  >
    <Header />
    <h2>Sign up</h2>
    
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
              required title="6 characters minimum"
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
          </div>{" "}
          <br />
          <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option disabled={true} value="">
              -- Please Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          </div>
         <br />
          
          
      
      
      
         <button className="form-btn-red">Create Account</button>
            <button
              className="form-btn-blue"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
          Back
        </button>
        <Link className="form-link" to="/login">
          Already have an account?{" "}
        </Link>
      </form>
      </>
  );
}
