import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

function Accessories() {
  const [product, setProduct] = useState([]);
  const [filterLow, setFilterLow] = useState(0);
  const [filterHigh, setFilterHigh] = useState(100);

  // Changing State when volume increases/decreases
  const rangeSelector = (event, newValue) => {
    setFilterLow(newValue[0])
    setFilterHigh(newValue[1])
  };

  const filteredProducts = product.filter((item) => {
    
    const price = item.price / 100;
    
    return (price > filterLow && price < filterHigh);
  })

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
      <div
        style={{
          margin: "auto",
          display: "block",
          width: "fit-content",
        }}
      >
        <Typography id="range-slider" gutterBottom>
          Select Price Range:
        </Typography>
        <Slider
          value={[filterLow, filterHigh]}
          onChange={rangeSelector}
          valueLabelDisplay="auto"
        />
        {/* Your range of Price is between {value[0]} /- and {value[1]} /- */}
      </div>
      
      {product && (
        <div className="category-container">
          {filteredProducts.map((item, index) => (
            <div className="category-product">
              <a href={`/accessories/${item.id}`}>
                {" "}
                <img
                  src={item.img}
                  className="container-img"
                  style={{ width: 400 }}
                  alt="Accessories Category"
                />{" "}
              </a>

              <h4> {item.name} </h4>
              <h4>${item.price / 100}</h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Accessories;
