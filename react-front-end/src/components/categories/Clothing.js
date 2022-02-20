import React, { useEffect, useState } from "react";
import axios from "axios";

function Clothing() {
  const [product, setProduct] = useState("");

   
  useEffect(() => {
    axios.get("http://localhost:3000/api/clothing")
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
            style={{width: 200}}
            />
            
              <h4>  {item.name}</h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Clothing;