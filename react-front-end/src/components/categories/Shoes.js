import React, { useEffect, useState } from "react";
import axios from "axios";

function Shoes() {
  const [product, setProduct] = useState("");

  
  useEffect(() => {
    axios.get("http://localhost:3000/api/shoes")
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
        <div className="category-img">
          {product.map((item, index) => (
            <div className="category-product">
              <img src={item.img}
              style={{width: 400}}
              alt="Shoes Category"
              />
              <h4>  {item.name} ${item.price / 100}</h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Shoes;