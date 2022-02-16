import React, { useState } from "react";

function Resgister() {
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
    console.log("form", formDetails)
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
      // do you form submission logic here....
      // at this point, your form values are already set in your state and you can call the values from your state using "formDetails" and the "dot" notation....
      //axios.post{"/register", {formDetails}}
      //.then(response => {
          
      //} )  
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          autoComplete="off"
          value={formDetails.firstname}
          onChange={handleChange}
        />
        <input
          type="lastname"
          name="lastname"
          placeholder="Last Name"
          autoComplete="off"
          value={formDetails.lastname}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={formDetails.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={formDetails.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Resgister;
