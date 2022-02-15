const getIdFromUsersQuery = `SELECT id FROM users WHERE name = $1;`;

const getNameFromUsersQuery = `SELECT name FROM users WHERE id = $1;`;

const getOrdersPerUserQuery =
  `SELECT * FROM orders
JOIN order_items ON orders.id = order_id
JOIN menu_items ON menu_items.id = order_items.menu_item_id
WHERE user_id = $1;`;

const getItemsPerUserQuery =
  ` SELECT * FROM orders
where user_id = $1;`;

const apendOrdersTableWithUserIdQuery = `
  INSERT INTO orders (user_id, checkout)
  VALUES ($1, $2)
  RETURNING id;
`;

const apendOrderItemsTableWithCurrentOrderQuery =
  ` INSERT INTO order_items (
  menu_item_id,
  order_id,
  quantity )
  VALUES ($1, $2, $3)
  RETURNING order_id;`;

const updateOrderStatusInOrdersTableQuery =
  `UPDATE orders
SET status= 'order confirmed' WHERE id = $1;
`;
const updateOrdersTableWithExpectedPickupQuery =

  `INSERT INTO orders (expected_pickup)
VALUES ($1)
WHERE id = $2;
`;

const updateOrdersTableWithTotalPriceQuery =
  `UPDATE orders
SET checkout = $1, total_price = (
  SELECT sum(menu_items.item_price * order_items.quantity) as total
  FROM order_items
  JOIN menu_items ON menu_items.id = order_items.menu_item_id
  WHERE order_items.id = $2)
WHERE  id = $3;
`;

const getCheckoutPageQuery =
  `SELECT order_id, quantity, total_price as total,
menu_items.item_name as item, menu_items.item_price as unit_price, menu_items.image, users.name as customer
FROM order_items
JOIN orders ON orders.id = order_id AND orders.checkout = true
JOIN menu_items ON menu_items.id = order_items.menu_item_id
JOIN users ON users.id = $1;
`;

const getIdandOrderStatusQuery = `
  SELECT id, status, user_id
  FROM orders
  WHERE id = $1
`;

const getMenuItemsQuery =
  `
SELECT *
FROM menu_items;
`;

function apendOrdersTableWithCurrentOrderReturningOrderId(db, foodData) {
  return db.query(apendOrderItemsTableWithCurrentOrderQuery, foodData);
};

function apendOrdersTableWithUserId(db, userId) {
  return db.query(apendOrdersTableWithUserIdQuery, [userId, true])
    .then((data) => {
      return data.rows[0].id;
    });
};

function updateOrderStatusInOrdersTable(db, orderId) {
  return db.query(updateOrderStatusInOrdersTableQuery, [orderId]);
};

function updateOrdersTableWithExpectedPickup(db, time, orderId) {
  return db.query(updateOrdersTableWithExpectedPickupQuery, [orderId]);
};

function updateOrdersTableWithTotalPrice(db, orderItemId, orderId) {
  console.log(orderItemId, orderId);
  return db.query(updateOrdersTableWithTotalPriceQuery, [false, orderItemId, orderId]);
};

function getUserIdFromName(db, userName) {
  return db.query(getIdFromUsersQuery, [userName])
    .then((data) => {
      return data.rows[0].id;
    });
};

function getNameFromUserId(db, userData) {
  return db.query(getNameFromUsersQuery, [userData])
    .then(user => {
      return user.rows[0].name;
    })
};

function getOrdersPerUser(db, userId) {
  return db.query(getOrdersPerUserQuery, [userId])
    .then(orderData => {
      return orderData.rows;
    });
};

function getCheckoutPage(db, userId) {
  return db.query(getCheckoutPageQuery, [userId])
    .then(orderData => {
      return orderData.rows;
    });
};

function getIdandOrderStatus(db, orderId) {
  return db.query(getIdandOrderStatusQuery, [orderId]).then(data => {
    return data.rows[0];
  })
};

function getItemsPerUser(db, userId) {
  return db.query(getItemsPerUserQuery, [userId])
    .then(orderStatusData => {
      return orderStatusData.rows
    })
};

function getMenuItems(db) {
  return db.query(getMenuItemsQuery)
    .then(menuItemsData => {
      return menuItemsData.rows
    })
};

module.exports = {
  apendOrdersTableWithUserId,
  apendOrdersTableWithCurrentOrderReturningOrderId,
  updateOrdersTableWithTotalPrice,
  updateOrdersTableWithExpectedPickup,
  updateOrderStatusInOrdersTable,
  getUserIdFromName,
  getNameFromUserId,
  getOrdersPerUser,
  getItemsPerUser,
  getIdandOrderStatus,
  getMenuItems,
  getCheckoutPage
}