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
  RETURNING *`, [user.first_name, user.last_name, user.email, user.password, user.phoneNumber, user.country, user.province, user.city, user.street, user.postal])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}

// DO SESSION STORAGE INSTEAD --> if u have time try to figure out why the cookie storage isn't working 

const addItemForSale = function (products) {
  const {formDetails: {img, title, description, price, catId}, owner_id} = products;

  return db_oja_connection
    .query(`INSERT INTO products (name, price, img, description, is_available, category_id, user_id)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *`, [title, price, img, description, true, catId, owner_id])
    .then(res =>  res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}

const markItemAsRented = function (product_id) {
  return db_oja_connection
    .query(`UPDATE products Set is_available = false
  WHERE id = $1
  RETURNING *`, [product_id])
    .then(res =>  res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}

// Remove item 

const removeItemForSale = function (product_id) {
  return db_oja_connection
    .query(`DELETE FROM products
  WHERE id = $1
  RETURNING *`, [product_id])
    .then(res =>  res.rows[0])
    .catch((err) => {
      console.log(err.message);
  });
}


// update orders table for price => 
 
const UpdateOrdersTableWithTotalPrice = function (total_price_cents, orderId) {
  return db_oja_connection
    .query(`INSERT INTO orders (total_price_cents)
  VALUES ($1*100)
  WHERE id = $2
  RETURNING id;`, [total_price_cents, orderId])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}

// update product_total for order_items table  => 
 
const UpdateOrdersItemsTableWithProductTotal = function (product_total, orderId) {
  return db_oja_connection
    .query(`INSERT INTO order_items (product_total)
  VALUES ($1)
  Where order_id = $2
  RETURNING id;`, [product_total, orderId])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}

// create initial order id 

const createOrdersTableWithUserId = function (user_id) {
  return db_oja_connection
    .query(`INSERT INTO orders (user_id)
  VALUES ($1)
  RETURNING id;`, [user_id])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}

// add an order_item to order_item table 

const appendOrdersItemsTableWithCurrentOrder = function (productId, orderId, productTotal) {
  return db_oja_connection
    .query(`INSERT INTO order_items (product_id, order_id, product_total)
  VALUES ($1, $2, $3)
  RETURNING order_id;`, [productId, orderId, productTotal])
    .then(res => res.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}


// get ALL user order info using UserID 

const getOrdersFromUser = function (userId) {
  return db_oja_connection
  .query(`SELECT * FROM orders
  WHERE user_id = $1;`, [userId])
    .then(orderData => orderData.rows)
    .catch((err) => {
      console.log(err.message);
    });
};


const getMostRecentOrderFromUser = function () {
  return db_oja_connection
  .query(`SELECT * FROM orders 
  Order By id DESC Limit 1;`)
    .then(orderData => orderData.rows)
    .catch((err) => {
      console.log(err.message);
    });
};



// get total for the purchase/cart using orderID
const getCheckoutPage = function (orderId) {
  return db_oja_connection
  .query(`SELECT order_id, (total_price_cents/100) as total,
  products.name as item, products.product_total as PricePerNight, products.img, users.first_name as customer
  FROM order_items
  JOIN orders ON orders.id = order_id
  JOIN products ON products.id = order_items.products_id
  JOIN users ON users.id = user_id
  WHERE order.id = $1;
  `, [orderId])
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
  .query(`SELECT * FROM products WHERE user_id = $1 LIMIT 3;`, [userId])
    .then(res => res.rows)
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

  // figure out how to correctly reference products_name to render search 
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
    .query(`SELECT products.*, users.first_name, users.last_name, users.province
    FROM products 
    Join users ON user_id=users.id
    WHERE category_id = 3
    LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}


const getAllProductsFromClothing = function (limit = 20) {
  return db_oja_connection
    .query(`SELECT products.*, users.first_name, users.last_name, users.province
  FROM products 
  Join users ON user_id=users.id
  WHERE category_id = 2
  LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}

const getProductbyId = function (productId, limit = 1) {
  return db_oja_connection
    .query(`SELECT products.*, users.first_name, users.last_name, users.province
  FROM products 
  Join users ON user_id=users.id
  WHERE products.id = $1
  LIMIT $2`, [productId, limit])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
}

const getProductsFromSpecificSeller= function (sellerId, limit = 5) {
  return db_oja_connection
    .query(`SELECT products.*, users.first_name, users.last_name, users.province
  FROM products 
  Join users ON user_id=users.id
  WHERE user_id = $1
  LIMIT $2`, [sellerId, limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}



const getAllProductsFromBags = function (limit = 20) {
  return db_oja_connection
    .query(`SELECT products.*, users.first_name, users.last_name, users.province
    FROM products 
    Join users ON user_id=users.id
    WHERE category_id = 1
    LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}


const getAllProductsFromAccessories = function (limit = 20) {
  return db_oja_connection
    .query(`SELECT products.*, users.first_name, users.last_name, users.province
    FROM products 
    Join users ON user_id=users.id
    WHERE category_id = 4
    LIMIT $1`, [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}


// get cart items to display on cart 
const getCartInfoForUser = function (order_id) {
  return db_oja_connection
    .query(`Select products.name As name,
    (products.price/100) As price, products.img As productImage, order_items.order_id As order_id,
    orders.created_at As placed_at, order_items.product_total As PricePerNight From products
    Join order_items on order_items.product_id = products.id
    Join orders on orders.id = order_items.order_id
    Where order_items.order_id = $1`, [order_id])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
}


module.exports = {
  getAllProductsForHomepage,
  getAllProductsFromAccessories, 
  getAllProductsFromBags,
  getAllProductsFromClothing, 
  getProductsFromSpecificSeller,
  getAllProductsFromShoes, 
  getAllProductsUsingSearchBar, 
  getCartInfoForUser, 
  getCheckoutPage, 
  getOrdersFromUser,
  getRelatedProductsFromUser, 
  getUserFromUserEmail,
  getUserWithId, 
  getProductbyId,
  addUser, 
  addItemForSale, 
  appendOrdersItemsTableWithCurrentOrder, 
  removeItemForSale, 
  markItemAsRented, 
  createOrdersTableWithUserId, 
  getMostRecentOrderFromUser, 
  UpdateOrdersTableWithTotalPrice, 
  UpdateOrdersItemsTableWithProductTotal
}