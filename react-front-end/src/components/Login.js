import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login({setLoginAuth, setIsLoggedIn}) {
   let navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
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
      formDetails.email &&
      formDetails.password
    ) {
      
      axios.post("http://localhost:8080/users/login", {formDetails
      })
      .then(response =>{
        console.log('response:', response);
        setLoginAuth(response.data.user.name);
        setIsLoggedIn(true);
        localStorage.setItem('user_id', response.data.user.id);
        localStorage.setItem('user_name', response.data.user.name);
        navigate("/homepage");
      })
      .catch(error =>{ 
        console.log(error)
      })
    }
  };

  return (
    <>
      <h1 className="register-title"> Log Into Your Account!</h1>
      <form onSubmit={handleSubmit} className="register-page">
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
       
        <button type="submit" className="register-button" > Log In</button>
      </form>
    </>
  );
}

export default Login;