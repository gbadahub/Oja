import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import Axios from "axios";
import "./BagItems.css"

function BagItems(){
  const [product, setProduct] = useState("");
  const {itemId} = useParams()
  
  useEffect(() => {
    Axios
    .get(`/api/bags/products_by_id?itemId=${itemId}&type=single`)
    .then((res) => {
      setProduct(res.data.product);
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

  return (
    <>
      {product && (
        <div className="item-container">
          {product.map((item, index) => {
            const descriptionArr = item.description.split('-')
            descriptionArr.shift()
            console.log(descriptionArr);
            return (
            <div className="item-product">
              <section className="itemImage">
                <img src={item.img} className="container-img" alt="Accessory" />
              </section>

              <section className="main">
                <section className="nameLocation">
                  <h4>
                    {" "}
                    {item.first_name} {item.last_name}
                  </h4>
                  <h4> {item.province} </h4>
                </section>

                <section className="itemInfo">
                  <h4 className="itemName"> {item.name} </h4>
                  <h4 className="itemPrice">${item.price / 100}</h4>
                  <p className="itemDescription">
                    <ul>{descriptionArr.map((item) => <li className="upperCase">{item}</li> )}</ul>
                  </p>
                  <section className="DropDown">
                 <h4> <label>Choose Days:</label> </h4>
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
          )})}
        </div>
      )}
    </>
  );
}

export default BagItems