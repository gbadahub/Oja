import React, { useState, useEffect } from "react";
import ImageSlider from "./Slider/ImageSlider";
import { SlideData } from "./Slider/SliderData";
import axios from "axios";

function Home() {
  const [feature, setFeature] = useState("");
  const [newAdded, setNewAdded] = useState("");
  const [popular, setPopular] = useState("");

  axios.get("http://localhost:8080/api/homepage", { })
      .then(response =>{
        console.log(response); 
      })
      .catch(error =>{
        console.log(error);
    });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/accessories")
      .then((res) => {
        console.log("res", res);
        setFeature(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/shoes")
      .then((res) => {
        setNewAdded(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/bags")
      .then((res) => {
        console.log("res", res);
        setPopular(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h1>
        <ImageSlider slides={SlideData} />
      </h1>
      <div className="home-container">
      
      {feature && (
        
        <div className="home-picks">
          Editor's Pick
          <div>
            {" "}
             <img src={feature[1].img} style={{ width: 400 }} />
          </div>

        </div>
        
      )}

      {newAdded && (
        
        <div className="home-picks">
          Newly Added
          <div>
            <img src={newAdded[4].img} style={{ width: 400 }} />
          </div>
        </div>
        
      )}
      {popular && (
        
        <div className="home-picks">
          Popular Now!
          <div>
            {" "}
            <img src={popular[1].img} style={{ width: 400 }} />
          </div>
          
        </div>
        
      )}
      </div>
      
    </>
    
  );
}

export default Home;
