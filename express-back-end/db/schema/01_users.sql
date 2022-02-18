DROP TABLE IF EXISTS users CASCADE;
 
CREATE TABLE users (
 id SERIAL PRIMARY KEY NOT NULL,
 first_name VARCHAR(100),
 last_name VARCHAR(100),
 email VARCHAR(100),
 password VARCHAR(100),
 phone_number VARCHAR(100),
 country VARCHAR(50),
 province VARCHAR(50),
 city VARCHAR(100),
 street VARCHAR(255),
 postal VARCHAR(50)
);
