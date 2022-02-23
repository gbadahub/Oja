import React from "react";
import { useEffect, useRef, useState } from "react";
import { Container, SearchInput, IconRightArrow, IconMagnifyingGlass } from "./Styles";

function Search() {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput]);

//   const SearchBar = () => (
//     <form action="/" method="get">
//         <label htmlFor="header-search">
//             <span className="visually-hidden">Search blog posts</span>
//         </label>
//         <input
//             type="text"
//             id="header-search"
//             placeholder="Search blog posts"
//             name="s" 
//         />
//         <button type="submit">Search</button>
//     </form>
// );

// export default SearchBar;

  // What do I want it to do? 
  // Allow search by user first name, product name, and price 
  // render items on the page based on those results: do I need a seperate page for it?


  // axios
  //   .get("http://localhost:8080/api/search", {
  //     headers: {
  //       'userid': userId
  //     }
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     setOtherListings(response.data.products)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })


  // 

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hover={showSearchInput}
    >
      <SearchInput ref={targetRef} showSearchInput={showSearchInput} /> 
      {showSearchInput ? <IconRightArrow /> : <IconMagnifyingGlass />}
    </Container>
  );
}

export default Search;