
--- all order information per user -- 
SELECT * FROM orders
JOIN order_items ON orders.id = order_id
JOIN products ON product.id = orders.user_id
WHERE user_id = 3;


--- items per user -- 
 SELECT * FROM orders 
where user_id = 3;

-- add order items table with current order -- 
INSERT INTO order_items (
  product_id,
  order_id)
  VALUES (6, 1)
RETURNING order_id;


-- get items -- 
SELECT *
FROM products;

-- get id and the order status 
SELECT id, created_at, user_id
FROM orders
WHERE id = 6;

-- add to orders table with user_id
INSERT INTO orders (user_id)
  VALUES (6)
RETURNING id;

 -- items per order --
 SELECT products.name AS name, order_items.order_id AS order_id from order_items
  JOIN products ON order_items.product_id = products.id
  GROUP BY order_items.order_id, products.name
  ORDER BY order_items.order_id;

-- add total price in orders UNSURE ABOUT TOTAL PRICE --- 
UPDATE orders 
  SET total_price = (
    SELECT sum(menu_items.item_price_cents * order_items.quantity) as total 
    FROM order_items
    JOIN menu_items ON menu_items.id = order_items.menu_item_id
    WHERE order_items.id = 6)
WHERE  id = 6;

-- checkout page *** UNSURE WITH THE QUERY WITHOUT PRICE 
SELECT order_id, total_price as total,
menu_items.item_name as item, menu_items.item_price as unit_price, menu_items.image, users.name as customer
FROM order_items
JOIN orders ON orders.id = order_id
JOIN menu_items ON menu_items.id = order_items.menu_item_id
JOIN users ON users.id = 3;


-- query to add to products table -- 

-- query to add user -- 

-- query to add order items and orders -- 

-- query to retrieve items based on user(id) -- 
