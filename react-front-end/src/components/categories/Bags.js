import React from "react";

function Bags() {
  return (
    <>
      <div className="category-container">
        <div className="category-product">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <h4 >Name and Price 1</h4>
        </div>
        
        <div className="category-product">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <h4 >Name and Price 2</h4>
        </div>
        
        <div className="category-product">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <h4 >Name and Price 3</h4>
        </div>
       
      </div>
    </>
  );
}

export default Bags;





{/* <div class="items">
<% for(let product of products) { %>
  <div class="container-1">
    <div class="p1">

      <% if(product.sold ) {%>
        Sold
        <% } else {%>
       Availabile
       <% }%>

        <header>
        <a href="products/<%=product.id %>" target="_blank">   <img src="<%= product.url %>" />  </a>

        </header>
        <footer>

          <div class="name-price">
            <%= product.name %> $<%= product.price %>
          </div>
          <form >
            <a href="/products/checkout/<%= product.id %>"><i class="fas fa-cart-plus"></i></a>
          </form>
          <form method="POST" action="/products/wishlist/add_product/<%-product.id %>" >
            <button><i class="fas fa-heart"  style="color: blue" ></i></button>
          </form>
        </footer>
    </div>
  </div>

  <% } %>
</div> */}