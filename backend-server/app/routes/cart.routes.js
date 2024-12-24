// Import authorization middleware
const authorization = require("../Middleware/Middlware");

// Import the cart controller
const cart = require('../controllers/cart.controllers');

// Export a function to configure routes
module.exports = function (app) {
    // Routes for handling carted items
    app.route("/cart")
        .get(cart.getAllItems) // GET request to fetch all items in the cart
        .post(cart.create); // POST request to add a new item to the cart

    // Routes for handling individual carted items via cart ID
    app.route("/cart/:cart_id")
        .delete(cart.deleteItem) // DELETE request to remove an item from the cart
        .patch(cart.updateItem) // PATCH request to update an item in the cart
        .get(cart.getOne); // GET request to fetch details of a single item in the cart

    // Route for fetching cart items via user ID
    app.route("/cart/users/:user_id")
        .get(cart.getByUser); // GET request to fetch cart items by user
};
