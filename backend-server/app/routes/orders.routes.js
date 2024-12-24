// Import the orders controller
const order = require('../controllers/orders.controllers');

// Export a function to configure routes
module.exports = function (app) {
    // Routes for handling orders
    app.route("/orders")
        .get(order.getAllOrders) // GET request to fetch all orders
        .post(order.create); // POST request to create a new order

    // Routes for handling individual orders via order ID
    app.route("/orders/:order_id")
        .delete(order.deleteOrder) // DELETE request to delete an order
        .patch(order.updateOrder) // PATCH request to update an order
        .get(order.getOne); // GET request to fetch details of a single order

    // Route for fetching orders via grouping (order number)
    app.route("/orders/groups/:grouping")
        .get(order.getByGroup); // GET request to fetch orders by grouping

    // Route for fetching orders via user ID
    app.route("/orders/users/:user_id")
        .get(order.getByUser); // GET request to fetch orders by user
};
