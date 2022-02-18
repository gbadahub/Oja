import React from "react";
import ImageSlider from "./Slider/ImageSlider"
import { SlideData } from "./Slider/SliderData";

function Home (){

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