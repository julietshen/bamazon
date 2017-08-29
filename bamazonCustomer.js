var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: null,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err);
  }
  placeOrder();
});

function placeOrder() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    askCustomer(res);
  });
}

function askCustomer(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the ID of the item you would you like to purchase? [Quit with Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        howMany(product);
      }
      else {
        console.log("\nPlease enter a valid product.");
        placeOrder();
      }
    });
}

function howMany(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many of this itemwould you like?",
        validate: function(val) {
          return val > 0;
        }
      }
    ])
    .then(function(val) {
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nSorry, we don't have enough of this item in stock.");
        placeOrder();
      }
      else {
        makePurchase(product, quantity);
      }
    });
}

function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "!");
      placeOrder();
    }
  );
}

function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }
  return null;
}
