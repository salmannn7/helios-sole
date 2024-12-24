// Import Joi for input validation
const Joi = require('joi');

// Import the orders models
const order = require("../models/orders.models");

// Function to get all orders
const getAllOrders = (req, res) => {
    // Retrieve all orders from the database
    order.getAllOrders((err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send orders if retrieval is successful
    });
};

// Function to get orders by user
const getByUser = (req, res) => {
    let user = req.params.user_id; // Extract user ID from request parameters

    // Retrieve orders by user from the database
    order.getOrdersByUser(user, (err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send orders if retrieval is successful
    });
};

// Function to get orders by grouping
const getByGroup = (req, res) => {
    let group = req.params.grouping; // Extract grouping parameter from request

    // Retrieve orders by grouping from the database
    order.getOrdersByGrouping(group, (err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send orders if retrieval is successful
    });
};

// Function to create a new order
const create = (req, res) => {
    // Input validation schema for order creation
    const schema = Joi.object({
        "product_id": Joi.number().required(), // Product ID is required and must be a number
        "size": Joi.number().required(), // Size is required and must be a number
        "quantity": Joi.number().max(99).required(), // Quantity is required and must be a number less than or equal to 99
        "price": Joi.number().required(), // Price is required and must be a number
        "delivery": Joi.number().required(), // Delivery is required and must be a number
        "card_id": Joi.number().required(), // Card ID is required and must be a number
        "address_id": Joi.number().required(), // Address ID is required and must be a number
        "user_id": Joi.number().required(), // User ID is required and must be a number
        "grouping": Joi.number().required(), // Grouping is required and must be a number
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let orders = Object.assign({}, req.body); // Create a new order object from request body

    // Add new order to the database
    order.addNewOrder(orders, (err, id) => {
        if (err) return res.sendStatus(500);
        return res.status(201).send({ order_id: id }); // Send order ID if creation is successful
    })
}

// Function to delete an order
const deleteOrder = (req, res) => {
    let order_id = parseInt(req.params.order_id); // Extract order ID from request parameters

    // Delete order from the database
    order.deleteOrder(order_id, (err) => {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200); // Send 200 status if deletion is successful
    });
};

// Function to get a single order
const getOne = (req, res) => {
    let order_id = parseInt(req.params.order_id); // Extract order ID from request parameters

    // Retrieve a single order from the database
    order.getSingleOrder(order_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        return res.status(200).send(result); // Send order if retrieval is successful
    });
};

// Function to update an order
const updateOrder = (req, res) => {
    let order_id = parseInt(req.params.order_id); // Extract order ID from request parameters

    // Input validation schema for update fields
    const schema = Joi.object({
        "product_id": Joi.number().optional(), // Product ID is optional and must be a number
        "size": Joi.number().optional(), // Size is optional and must be a number
        "quantity": Joi.number().max(99).optional(), // Quantity is optional and must be a number less than or equal to 99
        "price": Joi.number().optional() // Price is optional and must be a number
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update order properties if provided in request body
    if (req.body.hasOwnProperty("product_id")) {
        result.product_id = req.body.product_id;
    }
    if (req.body.hasOwnProperty("size")) {
        result.size = req.body.size;
    }
    if (req.body.hasOwnProperty("quantity")) {
        result.quantity = req.body.quantity;
    }
    if (req.body.hasOwnProperty("price")) {
        result.price = req.body.price;
    }

    // Update the order in the database
    order.updateOrder(order_id, req.body, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200); // Send 200 status if update is successful
    });
};

// Export all functions for use in the routes
module.exports = {
    getAllOrders: getAllOrders,
    getByGroup: getByGroup,
    getByUser: getByUser,
    create: create,
    deleteOrder: deleteOrder,
    getOne: getOne,
    updateOrder: updateOrder,
};
