import React, { useState, useEffect } from "react";
import axios from "axios";

function Rent() {
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const [formDetails, setFormDetails] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    bags: "",
    clothing: "",
    shoes: "",
    accessories: "",
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
      formDetails.image &&
      formDetails.title &&
      formDetails.description &&
      formDetails.price &&
      formDetails.categories
    ) {
      axios
        .post("/rent", { formDetails })
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
    images.forEach((image) => uploadedImage.push(URL.createObjectURL(image)));
    setImageURLs(uploadedImage);
  }, [images]);

  function imageChange(e) {
    setImages([...e.target.files]);
  }

  return (
    <>
      <h1> List your item</h1>
      <form onSubmit={handleSubmit} className="rent-page">
        <div className="rent-image">
          <input
            type="file"
            multiple
            accept="image"
            onChange={imageChange}
            className="img-upoloaded"
          />
          {imageURLs.map((imageSrc) => (
            <img src={imageSrc} />
          ))}
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
          <select onChange={handleChange} className="list-item-input">
            <option value={formDetails.bags}>Bags</option>
            <option value={formDetails.clothing}>Clothing</option>
            <option value={formDetails.shoes}>Shoes</option>
            <option value={formDetails.accessories}>Accessories</option>
          </select>

          <button type="submit" className="listed-button">
            Post Item
          </button>
        </div>
      </form>
      <h2> Review Other Listings</h2>
      <div className="review-listing">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Where does it come from? Contrary to popular belief,
        Lorem Ipsum is not simply random text. It has roots in a piece of
        classical Latin literature from 45 BC, making it over 2000 years old.
        Richard McClintock, a Latin professor at Hampden-Sydney College in
        Virginia, looked up one of the more obscure Latin words, consectetur,
        from a Lorem Ipsum passage, and going through the cites of the word in
        classical literature, discovered the undoubtable source. Lorem Ipsum
        comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
        Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
        This book is a treatise on the theory of ethics, very popular during the
        Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
        amet..", comes from a line in section 1.10.32. The standard chunk of
        Lorem Ipsum used since the 1500s is reproduced below for those
        interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
        Malorum" by Cicero are also reproduced in their exact original form,
        accompanied by English versions from the 1914 translation by H. Rackham.
      </div>
    </>
  );
}

export default Rent;
