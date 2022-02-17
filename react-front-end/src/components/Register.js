import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Default form submission prevented");

    if (
      formDetails.firstname &&
      formDetails.lastname &&
      formDetails.email &&
      formDetails.password
    ) {
      axios
        .post("http://localhost:8080/api/v1/users/register", { formDetails })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h1 className="register-title"> Sign up!</h1>
      <form onSubmit={handleSubmit} className="register-page">
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          autoComplete="off"
          value={formDetails.firstname}
          onChange={handleChange}
          className="input"
        />
        <input
          type="lastname"
          name="lastname"
          placeholder="Last Name"
          autoComplete="off"
          value={formDetails.lastname}
          onChange={handleChange}
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={formDetails.email}
          onChange={handleChange}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={formDetails.password}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="register-button">
          Submit
        </button>
      </form>
    </>
  );
}

export default Register;
