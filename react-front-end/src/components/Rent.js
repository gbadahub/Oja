import React, { useState, useEffect } from "react";
import axios from "axios";

function Rent() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const [formDetails, setFormDetails] = useState({
    img: "",
    title: "",
    description: "",
    price: "",
    categories: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Default form submission prevented");

    if (
      formDetails.img &&
      formDetails.title &&
      formDetails.description &&
      formDetails.price &&
      formDetails.categories
    ) {
      axios
        .post("http://localhost:8080/api/rent", { formDetails })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (images.length < 1) {
      return;
    }
    const uploadedImage = [];
    images.forEach((img) => uploadedImage.push(URL.createObjectURL(img)));
    setImageURLs(uploadedImage);
  }, [images]);

  function imageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <>
      <h1> List your item</h1>
      <form onSubmit={handleSubmit}>
        <div className="rent-image">
          <div className="listed-item">
            <input type="file" multiple accept="image" onChange={imageChange} />
            {imageURLs.map((imageSrc) => (
              <img src={imageSrc} />
            ))}
          </div>
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
            name="description"
            placeholder="Description"
            autoComplete="off"
            value={formDetails.description}
            onChange={handleChange}
            className="list-item-input"
          />

          <button type="submit" className="listed-button">
            Post Item
          </button>
        </div>
      </form>
    </>
  );
}

export default Rent;
