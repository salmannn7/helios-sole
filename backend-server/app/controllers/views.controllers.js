// Import Joi for input validation
const Joi = require('joi');

// Import the views models
const view = require("../models/views.models");

// Function to get all views
const getAllViews = (req, res) => {
    // Retrieve all views from the database
    view.getAllViews((err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send views if retrieval is successful
    });
};

// Function to get views by user
const getByUser = (req, res) => {
    let user = req.params.user_id; // Extract user ID from request parameters

    // Retrieve views by user ID from the database
    view.getViewsByUser(user, (err, results) => {
        if (err) return res.sendStatus(500); // Send 500 Internal Server Error if there's an error
        return res.status(200).send(results); // Send views if retrieval is successful
    });
};

// Function to get views by product
const getByProduct = (req, res) => {
    let product = req.params.product_id; // Extract product ID from request parameters

    // Retrieve views by product ID from the database
    view.getViewsByProduct(product, (err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send views if retrieval is successful
    });
};

// Function to create a new view
const create = (req, res) => {
    // Input validation schema
    const schema = Joi.object({
        "product_id": Joi.number().required(), // Product ID is required and must be a number
        "amount": Joi.number().required(), // Amount is required and must be a number
        "user_id": Joi.number().required() // User ID is required and must be a number
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let newView = Object.assign({}, req.body); // Create a new view object from request body

    // Add new view to the database
    view.addNewView(newView, (err, id) => {
        if (err) return res.sendStatus(500);
        return res.status(201).send({ view_id: id }); // Send view ID if creation is successful
    });
};

// Function to delete a view
const deleteView = (req, res) => {
    let view_id = parseInt(req.params.view_id); // Extract view ID from request parameters

    // Delete view from the database
    view.deleteView(view_id, (err) => {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200); // Send 200 status if deletion is successful
    });
};

// Function to get a single view
const getOne = (req, res) => {
    let view_id = parseInt(req.params.view_id); // Extract view ID from request parameters

    // Retrieve a single view from the database
    view.getSingleView(view_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        return res.status(200).send(result); // Send view if retrieval is successful
    });
};

// Function to update a view
const updateView = (req, res) => {
    let view_id = parseInt(req.params.view_id); // Extract view ID from request parameters

    // Retrieve the view to be updated from the database
    view.getSingleView(view_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);

        // Input validation schema for update fields
        const schema = Joi.object({
            "amount": Joi.number().required() // Amount is required and must be a number
        });

        // Validate request body against schema
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        if (req.body.hasOwnProperty("amount")) {
            result.amount = req.body.amount; // Update amount if provided in request body
        }

        // Update the view in the database
        view.updateView(view_id, req.body, (err) => {
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
    getAllViews: getAllViews,
    getByUser: getByUser,
    create: create,
    deleteView: deleteView,
    getOne: getOne,
    updateView: updateView,
    getByProduct: getByProduct
};
