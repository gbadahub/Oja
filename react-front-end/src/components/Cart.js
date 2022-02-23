import React, { useState, useEffect } from "react";

import axios from "axios";

function Cart() {
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cart", {
        headers: {
          userid: userId,
        },
      })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const userId = localStorage.getItem('user_id');

  return (
    <div className="cart-container">
      Cart
      <div className="cart-img"></div>
      <h4> </h4> <h4> </h4>
    </div>
  );
}

export default Cart;
