var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");

var app = express();

// Specify the port.
var port = 3306;

var connection = mysql.createConnection({
  post: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("connected at: " + connection.threadId);
  bamazonSearch();
});

function bamazonSearch() {
  console.log("Selecting all products...\n");
  connection.query('SELECT * FROM products', function(error, results) {
      if (error) throw error;
      for (var i = 0; i < results.length; i++) {
        console.log("Item ID: " + results[i].item_id +
          "\nName: " +
          results[i].product_name +
          "\nPrice: " +
          results[i].price);
        console.log("-------------------");
        placeOrder();
      };
  });

  placeOrder();

  };
})

function placeOrder() {

  inquirer.prompt = ([{
      type: "input",
      name: "productID",
      message: "What is the ID of the product you'd like to order?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
      {
        type: "input",
        name: "quantity",
        message: "How many units would you like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ]).then(function(answers) {
      var choice;
      let productID = answers.productID;
      let quantity = answers.quantity;
      connection.query('SELECT stock_quantity FROM products WHERE ?', {
        item_id: productID
      }, function(error, results) {
        var stock = res[0].stock_quantity;
        let newQuantity = stock - quantity;
        let price = res[0].price;

        if (stock >= quantity) {
          connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: totalLeft
            }, {
              item_id: id
            }],
            function(err, res) {
              var total = price * quantity;
              console.log("Your total is $" + total);
              inquirer.prompt([{
                type: 'confirm',
                message: 'Would you like to make another purchase?',
                name: 'purchase'
              }]).then(function(answer) {
                if (answer.purchase === true) {
                  placeOrder();
                } else {
                  return;
                }
              });
            }
          );
        } else {
          console.log("Sorry, we are currently out of stock.");
          placeOrder();
        }
      });
    });
  };
