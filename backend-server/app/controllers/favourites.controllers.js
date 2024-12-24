// Import Joi for input validation
const Joi = require('joi');

// Import the favourites models
const favourite = require("../models/favourites.models");

// Controller function to get all favourites
const getAllFavourites = (req, res) => {
    // Retrieve all favourites from the database
    favourite.getAllFavourites((err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send favourites if retrieval is successful
    });
};

// Controller function to get favourites by user
const getByUser = (req, res) => {
    let user = req.params.user_id; // Extract user ID from request parameters

    // Retrieve favourites by user from the database
    favourite.getFavouritesByUser(user, (err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send favourites if retrieval is successful
    });
};

// Controller function to create a new favourite
const create = (req, res) => {
    // Input validation schema for favourite creation
    const schema = Joi.object({
        "product_id": Joi.number().required(), // Product ID is required and must be a number
        "user_id": Joi.number().required() // User ID is required and must be a number
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let fav = Object.assign({}, req.body); // Create a new favourite object from request body

    // Add new favourite to the database
    favourite.addNewFavourite(fav, (err, id) => {
        if (err) return res.sendStatus(500);
        return res.status(201).send({ favourite_id: id }); // Send favourite ID if creation is successful
    });
};

// Controller function to delete a favourite
const deleteFavourite = (req, res) => {
    let favourite_id = parseInt(req.params.favourite_id); // Extract favourite ID from request parameters

    // Delete favourite from the database
    favourite.deleteFavourite(favourite_id, (err) => {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200); // Send 200 status if deletion is successful
    });
};

// Controller function to get a single favourite
const getOne = (req, res) => {
    let favourite_id = parseInt(req.params.favourite_id); // Extract favourite ID from request parameters

    // Retrieve a single favourite from the database
    favourite.getSingleFavourite(favourite_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        return res.status(200).send(result); // Send favourite if retrieval is successful
    });
};

// Controller function to update a favourite
const updateFavourite = (req, res) => {
    let favourite_id = parseInt(req.params.favourite_id); // Extract favourite ID from request parameters

    // Input validation schema for update fields
    const schema = Joi.object({
        "product_id": Joi.number().optional() // Product ID is optional and must be a number
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update favourite properties if provided in request body
    if (req.body.hasOwnProperty("product_id")) {
        result.product_id = req.body.product_id;
    }

    // Update the favourite in the database
    favourite.updateFavourite(favourite_id, req.body, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200); // Send 200 status if update is successful
    });
};

// Export all functions for use in the routes
module.exports = {
    getAllFavourites: getAllFavourites,
    getByUser: getByUser,
    create: create,
    deleteFavourite: deleteFavourite,
    getOne: getOne,
    updateFavourite: updateFavourite,
};
