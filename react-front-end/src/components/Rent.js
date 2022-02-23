import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";
// send request to category to render options



function Rent({ loginAuth, setLoginAuth }) {
  const userId = localStorage.getItem('user_id');
  const [imageSelected, setImageSelected] = useState("");
  const [otherListings, setOtherListings] = useState([]);

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
    console.log('SelectorChange:', e.target.value);
    setFormDetails({ ...formDetails, catId: e.target.value });
  };

  const handleUnlistItem = (productId) => {
    console.log(productId);
    axios
      .post(`http://localhost:8080/api/rent/${productId}`)
      .then((response) => {
        setOtherListings(otherListings.filter(otherListing => otherListing.id !== productId))
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
          axios
            .get("http://localhost:8080/api/rent", {
              headers: {
                'userid': userId
              }
            })
            .then((response) => {
              console.log(response);
              setOtherListings(response.data.products)
            })
            .catch((error) => {
              console.log(error);
            })
          console.log(response)

        })
        .catch((error) => {
          console.log(error);
        });
    }
    setFormDetails({
      img: "",
      title: "",
      description: "",
      price: "",
      catId: 0
    });
    setImageSelected("");
  };


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/rent", {
        headers: {
          'userid': userId
        }
      })
      .then((response) => {
        console.log(response);
        setOtherListings(response.data.products)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);


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
            <option value='1' >Bags</option>
            <option value='2' >Clothing</option>
            <option value='3' >Shoes</option>
            <option value='4' >Accessories</option>
          </select>

          <button type="submit" className="listed-button">
            Post Item
          </button>
        </div>
      </form>
      <h2> Review Other Listings</h2>
      <div className="review-listing">
        {otherListings.map((otherListing) => {
          return (
            <div className="review-listing-1" key={otherListing.id}>
              <span> {otherListing.name} <img src={otherListing.img} style={{ width: 300 }} />
              <button type="button" onClick={() => handleUnlistItem(otherListing.id)}> Remove </button> </span>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default Rent;
