import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [formDetails, setFormDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    country: "",
    province: "",
    city: "",
    street: "",
    postal: ""
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
      formDetails.first_name &&
      formDetails.last_name &&
      formDetails.email &&
      formDetails.password
    ) {
      
      axios.post("http://localhost:8080/users/register", {formDetails
      })
      .then(response =>{
        console.log(response)
      })
      .catch(error =>{
        console.log(error)
      })
    }
  };

  return (
    <>
      <h1 className="register-title"> Sign up!</h1>
      <form onSubmit={handleSubmit} className="register-page">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          autoComplete="off"
          value={formDetails.first_name}
          onChange={handleChange}
          className="input"
        />
        <input
          type="last_name"
          name="last_name"
          placeholder="Last Name"
          autoComplete="off"
          value={formDetails.last_name}
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
        <input
          type="number"
          name="phone_number"
          placeholder="Phone number"
          autoComplete="off"
          value={formDetails.phone_number}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          autoComplete="off"
          value={formDetails.country}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="province"
          placeholder="Province"
          autoComplete="off"
          value={formDetails.province}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          autoComplete="off"
          value={formDetails.city}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="street"
          placeholder="Street Name"
          autoComplete="off"
          value={formDetails.street}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="postal"
          placeholder="Postal Code"
          autoComplete="off"
          value={formDetails.postal}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="register-button" >Submit</button>
      </form>
    </>
  );
}

export default Register;
