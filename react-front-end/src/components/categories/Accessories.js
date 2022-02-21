import React, { useEffect, useState } from "react";
import axios from "axios";

function Accessories() {
  const [product, setProduct] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/accessories")
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
              <img
                src={item.img}
                className="container-img"
                style={{ width: 400 }}
                alt="Accessories Category"
              />

              <h4> {item.name} </h4>
              <h4>${item.price / 100}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Accessories;
