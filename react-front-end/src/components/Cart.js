import React, { useState, useEffect } from "react";
import axios from "axios";


// 1- send the data from the backend to the cart using get so it can be looped through 
// 2- map through the items and display on the cart page
// 3- upon submit, update total price and append it to the orders table, empty the cart, show popup with ordersummary

function Cart() {
 const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem('user_id');

  const handleSubmitOrder= (userId) => {
    // fix this to update the price total price before hitting submit (Query-> UpdateOrdersTableWithTotalPrice)
    
    console.log(userId);
    axios
      .post('http://localhost:8080/api/cart', {userId: userId})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/cart', { params: {userId: userId}})
      .then((res) => {
        console.log("res", res);
        setCartItems(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);




  // {otherListings.map((otherListing) => {
  //   return (
  //     <div className="review-listing-1" key={otherListing.id}>
  //       <span> {otherListing.name} <img src={otherListing.img} style={{ width: 300 }} />
  //       <button type="button" onClick={() => handleUnlistItem(otherListing.id)}> Remove </button> </span>
  //     </div>
  //   )
  // })}




  // SHOULD DISPLAY PRODUCT IMAGE, PRODUCTTOTAL FOR RENTED NUMBER OF DAYS, PRODUCT NAME, CART TOTAL, TAXES 0.13% 
  return (
    <div className="cart-container">
      Cart
      <div className="cart-img"></div>
      {cartItems.map((item) => {
        return (
      <div className="cartItem">{item.name}</div>
      )})}
      <button type="submit" onClick={() => handleSubmitOrder(userId)}> Submit Order</button>
      <h4> </h4> 
      <h4> </h4>
    </div>
  );
}

export default Cart;
