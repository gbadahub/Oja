import React, {useState , useEffect} from "react";
import ImageSlider from "./Slider/ImageSlider";
import { SlideData } from "./Slider/SliderData";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Home (){
const [feature, setFeature] = useState('')
const [newAdded, setNewAdded] = useState('')
const [popular, setPopular] = useState('')

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

    useEffect(() => {
      axios.get("http://localhost:3000/api/accessories")
        .then((res) => {
          console.log("res", res);
          setFeature(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    useEffect(() => {
      axios.get("http://localhost:3000/api/shoes")
        .then((res) => {
          setNewAdded(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    useEffect(() => {
      axios.get("http://localhost:3000/api/clothing")
        .then((res) => {
          console.log("res", res);
          setPopular(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    
  return( 
    <>
    <h1>
    <ImageSlider slides={SlideData}/>
    </h1>
    { feature && (
   <div className="home-picks">
     
         <div> Editor's Pick <img src={feature[1].img} 
         style={{width: 400}}
         />
          </div>
   </div>
     )}

    { newAdded && (
   <div className="home-newlyadded">
     <div> <img src={newAdded[2].img} 
         style={{width: 400}}
         />
          </div>
   </div>
    
    )}
{ popular && (
   <div className="home-popular">
   <div> <img src={popular[2].img} 
         style={{width: 400}}
         />
          </div>
   </div>
)}
    </>
  )

}

export default Home;