// Import Joi for input validation
const Joi = require('joi');

// Import the cart models
const cart = require("../models/cart.models");

// Function to get all items in the cart
const getAllItems = (req, res) => {
    // Retrieve all items in the cart from the database
    cart.getAllItems((err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send items if retrieval is successful
    });
};

// Function to get items in the cart by user
const getByUser = (req, res) => {
    let user = req.params.user_id; // Extract user ID from request parameters

    // Retrieve items in the cart by user from the database
    cart.getItemsByUser(user, (err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send items if retrieval is successful
    });
};

// Function to create a new item in the cart
const create = (req, res) => {
    // Input validation schema for item creation
    const schema = Joi.object({
        "product_id": Joi.number().required(), // Product ID is required and must be a number
        "size": Joi.number().required(), // Size is required and must be a number
        "quantity": Joi.number().max(99).required(), // Quantity is required and must be a number, with a maximum value of 99
        "price": Joi.number().required(), // Price is required and must be a number
        "user_id": Joi.number().required() // User ID is required and must be a number
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let item = Object.assign({}, req.body); // Create a new item object from request body

    // Add new item to the cart in the database
    cart.addNewItem(item, (err, id) => {
        if (err) return res.sendStatus(500);
        return res.status(201).send({ cart_id: id }); // Send cart ID if creation is successful
    });
};

// Function to delete an item from the cart
const deleteItem = (req, res) => {
    let cart_id = parseInt(req.params.cart_id); // Extract cart ID from request parameters

    // Delete item from the cart in the database
    cart.deleteItem(cart_id, (err) => {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200); // Send 200 status if deletion is successful
    });
};

// Function to get a single item from the cart
const getOne = (req, res) => {
    let cart_id = parseInt(req.params.cart_id); // Extract cart ID from request parameters

    // Retrieve a single item from the cart from the database
    cart.getSingleItem(cart_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        return res.status(200).send(result); // Send item if retrieval is successful
    });
};

// Function to update an item in the cart
const updateItem = (req, res) => {
    let cart_id = parseInt(req.params.cart_id); // Extract cart ID from request parameters

    // Retrieve the item from the cart from the database
    cart.getSingleItem(cart_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);

        // Input validation schema for update fields
        const schema = Joi.object({
            "product_id": Joi.number().optional(), // Product ID is optional and must be a number
            "size": Joi.number().optional(), // Size is optional and must be a number
            "quantity": Joi.number().max(99).optional(), // Quantity is optional and must be a number, with a maximum value of 99
            "price": Joi.number().optional() // Price is optional and must be a number
        });

        // Validate request body against schema
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Update item properties if provided in request body
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

        // Update the item in the cart in the database
        cart.updateItem(cart_id, req.body, (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            return res.sendStatus(200); // Send 200 status if update is successful
        });
    });
};

// Export all functions for use in the routes
module.exports = {
    getAllItems: getAllItems,
    getByUser: getByUser,
    create: create,
    deleteItem: deleteItem,
    getOne: getOne,
    updateItem: updateItem,
};
