import React, { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

function Shoes() {
  const [product, setProduct] = useState([]);
  const [filterLow, setFilterLow] = useState(0);
  const [filterHigh, setFilterHigh] = useState(500);

  const rangeSelector = (event, newValue) => {
    setFilterLow(newValue[0]);
    setFilterHigh(newValue[1]);
  };

  const filteredProducts = product.filter((item) => {
    const price = item.price / 100;

    return price > filterLow && price < filterHigh;
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/shoes")
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
      </div>

      {product && (
        <div className="category-container">
          {filteredProducts.map((item, index) => (
            <div className="category-product">
              <a href={`/shoes/${item.id}`}>
                <img
                  src={item.img}
                  style={{ width: 450 }}
                  alt="Shoes Category"
                />
              </a>

              <h4>{item.name}</h4>
              <h4>${item.price / 100}</h4>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Shoes;
