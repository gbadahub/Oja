const {createConnection} = require('./db/index');
const db_oja_connection = createConnection();

//get all the user info using their email 

const getUserFromUserEmail = function(email) {
  return db_oja_connection
    .query(`SELECT *
    FROM users
    WHERE email = $1
    LIMIT 1;`, [email])
    .then((result) => result.rows[0])
    .catch((err) =>  {
      console.log(err.message);
  });
}


// get all user info using their id 

const getUserWithId = function (id) {
  return db_oja_connection
    .query(`SELECT * 
  FROM users
  WHERE id = $1
  LIMIT 1`, [id])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}


// add a user to the db

const addUser = function (user) {
  return db_oja_connection
    .query(`INSERT INTO users (first_name, last_name, email, password, phone_number, country, province, city, street, postal)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *`, [user.first_name, user.last_name, user.email, user.password, user.phone_number, user.country, user.province, user.city, user.street, user.postal])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}


// add an item to products table to sell

const addItemForSale = function (products) { 
  return db_oja_connection
    .query(`INSERT INTO products (name, price, img, description, is_available, category_id, user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *`, [products.name, products.price, products.img, products.description, products.is_available, products.category_id, products.user_id])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}


// add order to orders table 

const appendOrdersTableWithUserId = function (orders) {
  return db_oja_connection
    .query(`INSERT INTO orders (user_id, created_at, total_price_cents)
  VALUES ($1, $2, $3)
  RETURNING id;`, [orders.user_id, orders.created_at, orders.total_price_cents])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}


// add an order_item to order_item table 

const appendOrdersItemsTableWithCurrentOrder = function (order_items) {
  return db_oja_connection
    .query(`INSERT INTO order_items (product_id, order_id, product_total)
  VALUES ($1, $2, $3)
  RETURNING order_id;`, [order_items.product_id, order_items.order_id, order_items.product_total])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}


// get ALL user order info using UserID 

const getOrdersFromUser = function (userId) {
  return db_oja_connection
  .query(`SELECT * FROM orders
  JOIN order_items ON orders.id = order_id
  JOIN products ON product.id = order_items.product_id
  WHERE user_id = $1;`, [userId])
    .then(orderData => orderData.rows)
    .catch((err) => {
      console.log(err.message);
    });
};



// get total for the purchase/cart using userID

const getCheckoutPage = function (userId) {
  return db_oja_connection
  .query(`SELECT order_id, total_price_cents as total,
  products.name as item, products.product_total as unit_price, products.img, users.first_name as customer
  FROM order_items
  JOIN orders ON orders.id = order_id
  JOIN products ON products.id = order_items.products_id
  JOIN users ON users.id = user_id
  WHERE users.id = $1;
  `, [userId])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};


// get related products from DB for a specific user up to 10 items
// how do I not show the current product => *** 
// NESTED Q ..  ???? COME BACK TO THISS 

const getRelatedProductsFromUser = function (userId) {
  return db_oja_connection
  .query(`SELECT * FROM products WHERE user_id = $1 LIMIT 10;`, [userId])
  .query( `SELECT * FROM products WHERE user_id = 4;`)
  .then(res => console.log(res) )
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};




// get all products on sale for homepage display 

const getAllProductsUsingSearchBar = function (options, limit = 20)  {
    // 1
  const queryParams = [];
  // 2 get all the products and user info
  let queryString = `SELECT * FROM products JOIN users ON users.id = user_id;`;

   //3b user name
  console.log("users.first_name", options)
  if (options.user_first_name) {
    queryParams.push(`%${options.user_first_name}%`);
    queryString += `AND users.first_name LIKE $${queryParams}`;
  }

  // 3b get products using product name

  // figure out howo ot correectly reference products_name to render search 
  console.log("product_name", options)
  if (options.product_name) {
    queryParams.push(`%${options.product_name}%`);
    queryString += ` AND name LIKE $${queryParams}`;

  }

   //3c get products using minimum price 
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += ` AND price >= $${queryParams}`;
  }

   //3d get products using max price
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += ` AND price <= $${queryParams}`;
  }

  queryParams.push(limit);
  queryString += `  
    ORDER BY price
    LIMIT $${queryParams};
  `;

  console.log(queryString, queryParams);

  return db_oja_connection
   .query(queryString, queryParams).then((res) => res.rows)
    .catch((err) => {
      console.log(err.message);
    });
};



// get all products for the homepage

const getAllProductsForHomepage = function () {
  return db_oja_connection
    .query(`SELECT *
  FROM products`)
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}


const getAllProductsFromShoes = function (limit = 20) {
  return db_oja_connection
    .query(`SELECT *
  FROM products WHERE category_id = 3
  LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}


const getAllProductsFromClothing = function (limit = 20) {
  return db_oja_connection
    .query(`SELECT *
  FROM products WHERE category_id = 2
  LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}


const getAllProductsFromBags = function (limit = 20) {
  return db_oja_connection
    .query(`SELECT *
  FROM products WHERE category_id = 1
  LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}


const getAllProductsFromAccessories = function (limit = 20) {
  return db_oja_connection
    .query(`SELECT *
  FROM products WHERE category_id = 4
  LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}


// get cart items
const getCartInfoForUser = function (user_id, order_id) {
  return db_oja_connection
    .query(`Select products.name As name,
    (products.price/100) As price, products.user_id As user_id, order_items.order_id As order_id,
    (orders.total_price_cents/100) As cartTotal,
    orders.created_at As placed_at From products
    Join order_items on order_items.product_id = products.id
    Join orders on orders.id = order_items.order_id
    Where products.user_id = $1 And order_items.order_id = $2
    Order By order_items.order_id;`, [user_id, order_id])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}

// FIX THIS getCartInforForUSER QUERY 
// need to create function to update total price in orders table 


//simpler to have sql written in database.js functions

// all the info needed to connect to db 
// and a function that starts a connection to db

//export function 


// split the functions based on relevant information. 


module.exports = {
  getAllProductsForHomepage,
  getAllProductsFromAccessories, 
  getAllProductsFromBags,
  getAllProductsFromClothing, 
  getAllProductsFromShoes, 
  getAllProductsUsingSearchBar, 
  getCartInfoForUser, 
  getCheckoutPage, 
  getOrdersFromUser,
  getRelatedProductsFromUser, 
  getUserFromUserEmail,
  getUserWithId, 
  addUser, 
  addItemForSale, 
  appendOrdersTableWithUserId,
  appendOrdersItemsTableWithCurrentOrder 
}