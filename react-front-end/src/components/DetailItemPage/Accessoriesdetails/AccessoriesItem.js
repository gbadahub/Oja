import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import "./Accessories.css";

function Accessories() {
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  let { productId } = useParams();
  useEffect(() => {
    let productParams = productId
    Axios.get(`/api/accessories/${productParams}`)
      .then((res) => {
        setProduct(res.data.product);
        setOtherProducts(res.data.otherProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // setFormDetails({ ...formDetails, [name]: value });
  };

  if (!product) {
    return null;
  }

  const descriptionArr = product.description.split("-");
  descriptionArr.shift();

  return (
    <>
      {product && (
        <div className="item-container">
          <div className="item-product">
            <section className="itemImage">
              <img
                src={product.img}
                className="itemImage"
                // className="container-img"
                alt="Accessory"
              />
            </section>

            <section className="main">
              <section className="nameLocation">
                <h4>
                  {" "}
                  {product.first_name} {product.last_name}
                </h4>
                <h4> {product.province} </h4>
              </section>

              <section className="itemInfo">
                <h4 className="itemName"> {product.name} </h4>
                <h4 className="itemPrice">${product.price / 100}</h4>

                <div className="itemDescription">
                  <ul>
                    {descriptionArr.map((description) => (
                      <li key={description} className="upperCase">
                        {description}
                      </li>
                    ))}
                  </ul>
                </div>
                <section className="DropDown">
                  <h4>
                    {" "}
                    <label>Choose Days:</label>{" "}
                  </h4>
                  <select onChange={handleChange} className="list-item-input">
                    <option value="oneDay">1 Day</option>
                    <option value="twoDays">2 Days</option>
                    <option value="threeDays">3 Days</option>
                    <option value="fourDays">4 Days</option>
                    <option value="fiveDays">5 Days</option>
                    <option value="sixDays">6 Days</option>
                    <option value="sevenDays">7 Days</option>
                    <option value="eightDays">8 Days</option>
                    <option value="nineDays">9 Days</option>
                    <option value="tenDays">10 Days</option>
                  </select>
                </section>
                <button className="addtoCart"> Add to cart </button>
              </section>
            </section>
          </div>
          <h3 className="More"> More From User </h3>
          <div className="moreFromUser">
            {otherProducts.map((otherProduct) => (
              <img
                src={otherProduct.img}
                className="otherProduct-img"
                alt="Accessory"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Accessories;
