var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");

var app = express();

// Specify the port.
var port = 3306;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.log("error connecting: " + err.stack)
    return;
  }
  console.log("connected at: " + connection.threadId);
  bamazonSearch();
});

function bamazonSearch() {

  connection.query('SELECT * FROM products', function(error, results) {
      if (error) throw error;
      // for (var i = 0; i < results.length; i++) {
      //   console.log("Item ID: " + results[i].item_id + "\nName: " + results[i].product_name + "\nPrice: " + results[i].price);
      //   console.log("-------------------");
        placeOrder();
      });
  };

  function placeOrder() {

  inquirer.prompt = ([
    {
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
    connection.query('SELECT * FROM products WHERE ?', {item_id: productID}, function(error, results) {
      var stock = res[0].stock_quantity;
      let newQuantity = stock - quantity;
      let price = res[0].price;

      if (error) throw error;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(answers.productID)) {
            choice = results[i];
          };
        };
      console.log("There are " + choice.stock_quantity + choice + "left.");
      if (answers.quantity > choice.stock_quantity) {
        console.log("Sorry, we are currently out of stock.");
        bamazonSearch();
      } else {
        connection.query('UPDATE product SET ? WHERE ?', function(error, results, fields) {
              if (error) throw error;
              console.log("Order successful.");
              var bamazonTotal = choice.price * parseInt(answers.quantity);
              console.log("Your total is $" + bamazonTotal)
          });
        };
      });
    });
  };
