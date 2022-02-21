import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
// send request to category to render options



function Rent({loginAuth, setLoginAuth}) {
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "geenpfex");

    axios
      .post("https://api.cloudinary.com/v1_1/dtqblycjk/upload", formData)
      .then((res) => {
        console.log(res);
        setFormDetails({ ...formDetails, img: res.data.public_id });
        
      })
      .catch((err) => console.log(err));
  };

  const [formDetails, setFormDetails] = useState({
    img: "",
    title: "",
    description: "",
    price: "",
    catId: 0
  });
  const handleSelectorChange = (e) => {
    console.log('Selectorchange:', e.target.value);
    setFormDetails({ ...formDetails, catId: e.target.value });
  };
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Default form submission prevented", formDetails);
    const userId = localStorage.getItem('user_id');

    if (
      formDetails.img &&
      formDetails.title &&
      formDetails.description &&
      formDetails.price ||
      formDetails.bags ||
      formDetails.shoes ||
      formDetails.accessories ||
      formDetails.clothing 
    ) {
      axios
        .post("http://localhost:8080/api/rent", { formDetails }, { 
          headers: {  
            'userid': userId
          }
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h1> List your item</h1>
      <form onSubmit={handleSubmit} className="rent-page">
        <div className="rent-image">
          <input
            type="file"
            onChange={(e) => {
              setImageSelected(e.target.files[0]);
            }}
          />
          <button onClick={uploadImage}> Upload Image</button>
          {/* add pulic/id */}
          {formDetails.img && (
            <Image
              style={{ width: 200 }}
              cloudName="dtqblycjk"
              publicId={formDetails.img}
            />
          )}
        </div>

        <div className="listed-item">
          <input
            type="text"
            name="title"
            placeholder="Title"
            autoComplete="off"
            value={formDetails.title}
            onChange={handleChange}
            className="list-item-input"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            autoComplete="off"
            value={formDetails.description}
            onChange={handleChange}
            className="list-item-input"
          />

          <input
            type="text"
            name="price"
            placeholder="price"
            autoComplete="off"
            value={formDetails.price}
            onChange={handleChange}
            className="list-item-input"
          />

          <label>Choose a Category:</label>
          <select onChange={handleSelectorChange} className="list-item-input">
            <option value ='1' >Bags</option>
            <option value ='2' >Clothing</option>
            <option value ='3' >Shoes</option>
            <option value ='4' >Accessories</option>
          </select>

          <button type="submit" className="listed-button">
            Post Item
          </button>
        </div>
      </form>
      <h2> Review Other Listings</h2>
      <div className="review-listing">
            {/* how to use this retrieval function without having a get route? Do i need to create a get route for this?*/}
            {/* create endpoint that takes in user_id, append at the end of the array
            get call to db using user_id to get items bring back []
            form details get populated and u post 
            append to the list the form details that u made and display 
            */}
            <div>
              
            </div>
            <div>

            </div>
      </div>
    </>
  );
}

export default Rent;
