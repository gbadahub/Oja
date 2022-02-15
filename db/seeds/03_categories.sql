INSERT INTO categories (
 id SERIAL PRIMARY KEY NOT NULL,
 name VARCHAR(50),
 bags BOOLEAN,
 dresses BOOLEAN,
 shoes BOOLEAN, 
 accessories BOOLEAN, 
) 
VALUES (1,"Bags", True, False, False, False, False, False),
(2, "Dresses", False, True, False, False, False, False),
(3, "Shoes", False, False, True, False, False, False),
(4, "Accessories", False, False, False, True, False, False);