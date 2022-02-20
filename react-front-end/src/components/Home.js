import React from "react";
import ImageSlider from "./Slider/ImageSlider";
import { SlideData } from "./Slider/SliderData";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Home (){
  let navigate = useNavigate();
  axios.get("http://localhost:8080/api/homepage", { })
      .then(response =>{
        // navigate('/api/homepage');
        // useNavigate()('/homepage');
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