import React, { useEffect, useState } from "react";
import axios from "axios";

function Bags() {
  const [product, setProduct] = useState("");

  
  useEffect(() => {
    axios.get("http://localhost:3000/api/bags")
      .then((res) => {
        console.log("res", res);
        setProduct(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {product && (
        <div className="category-container">
          {product.map((item, index) => (
            <div className="category-product">
              <img src="https://images.unsplash.com/photo-1645259969594-9176d984713a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              style={{width: 200}}/>
            
              <h4>  {item.name}</h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Bags;
