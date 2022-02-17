const getIdFromUsers = `SELECT id FROM users WHERE name = $1;`;

const getFirstNameFromUsers = `SELECT first_name FROM users WHERE id = $1;`;

const getLastNameFromUsers = `SELECT last_name FROM users WHERE id = $1;`;


const getUsersByEmail = `SELECT * FROM users WHERE email = $1 LIMIT 1;`;


const getOrdersFromUser =
`SELECT * FROM orders
JOIN order_items ON orders.id = order_id
JOIN products ON product_id.id = order_items.product_id
WHERE user_id = $1;`;

const apendOrdersTableWithUserId = `
  INSERT INTO orders (user_id, created_at, total_price_cents)
  VALUES ($1, $2, $3)
  RETURNING id;
`;

const apendOrderItemsTableWithCurrentOrder =
 `INSERT INTO order_items (
  product_id,
  order_id,
  product_total)
  VALUES ($1, $2, $3)
  RETURNING order_id;`;

// const updateOrderStatusInOrdersTableQuery =
//   `UPDATE orders
// SET status= 'order confirmed' WHERE id = $1;
// `; (MAYBE)

const getCheckoutPage =
`SELECT total_price_cents as total FROM orders = $1;
`;

// const getIdandOrderStatusQuery = `
//   SELECT id, status, user_id
//   FROM orders
//   WHERE id = $1
// `;

const getProductsItems =
`SELECT * FROM products where user_id = $1;`;

function apendOrdersTableWithCurrentOrderReturningOrderId(db, products) {
  return db.query(apendOrderItemsTableWithCurrentOrder, products);
};

// function updateOrderStatusInOrdersTable(db, orderId) {
//   return db.query(updateOrderStatusInOrdersTableQuery, [orderId]);
// };

function getUserIdFromName(db, userName) {
  return db.query(getIdFromUsers, [userName])
    .then((data) => {
      return data.rows[0].id;
    });
};

function getUserFromUserEmail(db, email) {
  return db.query(getUserFromEmail, [email])
    .then((data) => {
      return data.rows[0].id;
    });
};

function getFirstNameFromUserId(db, users) {
  return db.query(getFirstNameFromUsers, [users])
    .then(user => {
      return user.rows[0].name;
    })
};

function getLastNameFromUserId(db, users) {
  return db.query(getLastNameFromUsers, [users])
    .then(user => {
      return user.rows[0].name;
    })
};

function getOrdersFromUser(db, userId) {
  return db.query(getOrdersFromUser, [userId])
    .then(orderData => {
      return orderData.rows;
    });
};

function getCheckoutPage(db, userId) {
  return db.query(getCheckoutPage, [userId])
    .then(orders => {
      return orders.rows;
    });
};

// function getIdandOrderStatus(db, orderId) {
//   return db.query(getIdandOrderStatusQuery, [orderId]).then(data => {
//     return data.rows[0];
//   })
// };

function getProductsItems(db) {
  return db.query(getProductsItems)
    .then(products => {
      return products.rows
    })
};

module.exports = {
  apendOrdersTableWithCurrentOrderReturningOrderId,
  getUserIdFromName,
  getFirstNameFromUserId,
  getLastNameFromUserId,
  getOrdersFromUser,
  getProductsItems,
  getCheckoutPage,
  getUserFromUserEmail
}