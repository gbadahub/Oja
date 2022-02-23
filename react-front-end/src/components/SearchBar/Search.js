import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Container,
  SearchInput,
  IconRightArrow,
  IconMagnifyingGlass,
} from "./Styles";
import axios from "axios";

function Search() {
  const targetRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const showSearchInput = isHovered || isFocused;

  //  Search state values
  const [searchInputValue, setSearchInputValue] = useState("");
  const [product, setProducts] = useState([]);
  const [showSearchProducts, setShowSearchProducts] = useState(false);

  useEffect(() => {
    targetRef.current.value = "";
  }, [showSearchInput]);

  const handleSearch = (e) => {
  
    let searchValue = e.target.value;
    // searchValue = searchValue.toLowerCase()
    setSearchInputValue(searchValue);
    if (searchInputValue.length === 0){
      setProducts([])
      return;
    }
    

    axios
      .post("http://localhost:8080/api/abc", { search: searchValue })
      .then((res) => {
        
        setProducts(res.data);
        setShowSearchProducts(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hover={showSearchInput}
    >
      <SearchInput
        ref={targetRef}
        showSearchInput={showSearchInput}
        value={searchInputValue}
        onChange={handleSearch}
        // placeholder="What are you looking for?"
      />
      {showSearchInput ? <IconRightArrow /> : <IconMagnifyingGlass />}
      <div className="search-dataresults">
        <div className="infinite">
          {showSearchProducts &&
            product.map((item, index) => (
              <>
                <div className="search-products-container">
                  <a href={`/accessories/${item.id}`}>
                    <div className="single-product-container">
                      <div className="single-product-img">
                        <img
                          src={item.img}
                          className="search-product-img"
                        />
                      </div>
                      <div className="search-product-name">
                        <p>{item.name}</p>
                        <p>${item.price/100}</p>
                      </div>
                    </div>
                  </a>
                </div>
              </>
            ))}
        </div>
        {/* product.map((item, index) => {
            return (
              <div className="category-container">
                <div className="category-product">
                  
                    <img
                      src={item.img}
                      className="container-img"
                      style={{ width: 400 }}
                      alt="Accessories Category"
                    />
                  </a>

                  <h4> {item.name} </h4>
                  <h4>${item.price / 100}</h4>
                </div>
              </div>
            );
          }) */}
      </div>
    </Container>
  );
}

export default Search;
