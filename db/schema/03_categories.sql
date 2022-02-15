DROP TABLE IF EXISTS categories CASCADE;
 
CREATE TABLE categories (
 id SERIAL PRIMARY KEY NOT NULL,
 name VARCHAR(50),
 bags BOOLEAN,
 clothing BOOLEAN,
 shoes BOOLEAN,
 accessories BOOLEAN
);
