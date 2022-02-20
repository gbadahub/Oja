import React from "react";

function Search() {
  // how to add get request so search extension changes to :"searchitem"
  axios.get("http://localhost:8080/api/search", { })
  .then(response =>{
    console.log(response); 
  })
  .catch(error =>{
    console.log(error);
});
  return (
    <div>
      <input type="text" placeholder="Search..." />
    </div>
  );
}
export default Search;