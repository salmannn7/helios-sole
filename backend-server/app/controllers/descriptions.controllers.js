// Import Joi for input validation
const Joi = require('joi');

// Import the descriptions models
const description = require("../models/descriptions.models");

// Function to get all descriptions
const getAllDescriptions = (req, res) => {
    // Retrieve all descriptions from the database
    description.getAllDescriptions((err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send descriptions if retrieval is successful
    });
};

// Function to get descriptions by product
const getByProduct = (req, res) => {
    let product_id = req.params.product_id; // Extract product ID from request parameters

    // Retrieve descriptions by product from the database
    description.getDescriptionsByProduct(product_id, (err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send descriptions if retrieval is successful
    });
};

// Function to create a new description
const create = (req, res) => {
    // Input validation schema for description creation
    const schema = Joi.object({
        "description": Joi.string().required(), // Description is required and must be a string
        "product_id": Joi.number().required() // Product ID is required and must be a number
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // Send 400 Bad Request if validation fails

    let desc = Object.assign({}, req.body); // Create a new description object from request body

    // Add new description to the database
    description.addNewDescription(desc, (err, id) => {
        if (err) return res.sendStatus(500);
        return res.status(201).send({ description_id: id }); // Send description ID if creation is successful
    });
};

// Function to delete a description
const deleteDescription = (req, res) => {
    let description_id = parseInt(req.params.description_id); // Extract description ID from request parameters

    // Delete description from the database
    description.deleteDescription(description_id, (err) => {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200); // Send 200 status if deletion is successful
    });
};

// Function to get a single description
const getOne = (req, res) => {
    let description_id = parseInt(req.params.description_id); // Extract description ID from request parameters

    // Retrieve a single description from the database
    description.getSingleDescription(description_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        return res.status(200).send(result); // Send description if retrieval is successful
    });
};

// Function to update a description
const updateDescription = (req, res) => {
    let description_id = parseInt(req.params.description_id); // Extract description ID from request parameters

    // Input validation schema for update fields
    const schema = Joi.object({
        "description": Joi.string().optional() // Description is optional and must be a string
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update description properties if provided in request body
    if (req.body.hasOwnProperty("description")) {
        result.description = req.body.description;
    }

    // Update the description in the database
    description.updateDescription(description_id, req.body, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200); // Send 200 status if update is successful
    });
};

// Export all functions for use in the routes
module.exports = {
    getAllDescriptions: getAllDescriptions,
    getByProduct: getByProduct,
    create: create,
    deleteDescription: deleteDescription,
    getOne: getOne,
    updateDescription: updateDescription,
};
