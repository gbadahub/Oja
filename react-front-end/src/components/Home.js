import React from "react";
import ImageSlider from "./Slider/ImageSlider";
import { SlideData } from "./Slider/SliderData";
import axios from "axios";

function Home (){
  axios.get("http://localhost:8080/api/homepage", { })
      .then(response =>{
        console.log(response); 
      })
      .catch(error =>{
        console.log(error);
    });

  return( 
    <>
    <h1>
    <ImageSlider slides={SlideData}/>
    </h1>
   <div className="home-picks">

   </div>
   <div className="home-shop">
     
   </div>
   <div className="home-itemofday">
     
   </div>
    </>
  )

}

export default Home;