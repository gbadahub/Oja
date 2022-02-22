import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Search from "../SearchBar/Search"

function Navbar({loginAuth, setLoginAuth, isLoggedIn, setIsLoggedIn}) {
  let navigate = useNavigate();

  const logoutHandler = () => {
    console.log('');
    // make request to endpoint to logout using axios
    // axios.post("http://localhost:8080/users/logout", {})
    //   .then(response =>{
    //     setLoginAuth(null);
    //     console.log('response:', response)
    //     navigate("/homepage");
    //   })
    //   .catch(error =>{ 
    //     console.log(error)
    //   })
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    setLoginAuth('');
    setIsLoggedIn(false);
    navigate("/homepage");
  };

  // const homepageHandler = () => {
  //   axios.get("http://localhost:8080/api/homepage", { })
  //     .then(response =>{
  //       console.log(response); 
  //     })
  //     .catch(error =>{
  //       console.log(error);
  //   });
  // };

  return (
    <nav className="NavbarItems" >
      <div className="nav-div-top">
        <h1 className="navbar-logo">   
        <Link to="/homepage" className="nav-top-list"> OJA </Link>
        </h1>

        <ul className="nav-top">
          
          <li className="search"
          
           ><Search /></li>
          <li className="nav-top-list">
            <Link to="/homepage" className="nav-top-list"> Home </Link>
          </li>
            {isLoggedIn ? 
            <h4> Logged In As: {loginAuth}

            <button type="logout" onClick={() => logoutHandler()}>  Logout </button>
            </h4> :
          <li>
            <Link to="/login" className="nav-top-list"> Login </Link>
          </li>
          }                      
            <li>
            <Link to="/register" className="nav-top-list">Register</Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>

      <ul className="nav-bottom">
        <li>
        <Link to="/bags" className="nav-top-list">Bags</Link>
        </li>
        <li><Link to="/clothing" className="nav-top-list">Clothing</Link></li>
        <li><Link to="/shoes" className="nav-top-list">Shoes</Link></li>
        <li><Link to="/accessories" className="nav-top-list">Accessories</Link></li>
        <li>
        <Link to="/rent" className="nav-top-list"> Rent </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
