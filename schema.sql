DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL
  , product_name VARCHAR(50)
  , department_name VARCHAR(50)
  , price INT(100)
  , stock_quantity INT(100)
  , primary key(item_id)
)
;


INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('shower curtain', 'home goods', 10, 75);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('cat litter', 'pet needs', 15, 50);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('chips', 'food', 4, 100);
  
INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('coffee beans', 'food', 6, 60);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('sofa', 'furniture', 300, 5);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('battery', 'electronics', 40, 25);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('GMAT prep', 'books', 30, 100);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('magic bullet', 'home goods', 20, 45);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('necklace', 'jewelry', 60, 15);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('headphones', 'electronics', 25, 80);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ('tickle me Elmo', 'toys', 20, 1);
  
;