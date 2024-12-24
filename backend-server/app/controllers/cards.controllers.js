// Import Joi for input validation
const Joi = require('joi');

// Import the cards models
const card = require("../models/cards.models");

// Function to get all cards
const getAllCards = (req, res) => {
    // Retrieve all cards from the database
    card.getAllCards((err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send cards if retrieval is successful
    });
};

// Function to get cards by user
const getByUser = (req, res) => {
    let user_id = req.params.user_id; // Extract user ID from request parameters

    // Retrieve cards by user from the database
    card.getCardsByUser(user_id, (err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send cards if retrieval is successful
    });
};

// Function to create a new card
const create = (req, res) => {
    // Input validation schema for card creation
    const schema = Joi.object({
        "card_no": Joi.string().required(), // Card number is required and must be a string
        "last_four": Joi.string().required(), // Last four digits are required and must be a string
        "expiry_date": Joi.string().required(), // Expiry date is required and must be a string
        "cvv": Joi.string().required(), // CVV is required and must be a string
        "first_name": Joi.string().required(), // First name is required and must be a string
        "last_name": Joi.string().required(), // Last name is required and must be a string
        "addressline1": Joi.string().required(), // Address line 1 is required and must be a string
        "addressline2": Joi.string().allow(''), // Address line 2 is optional and must be a string
        "towncity": Joi.string().required(), // Town/city is required and must be a string
        "postcode": Joi.string().required(), // Postcode is required and must be a string
        "phone_no": Joi.string().required(), // Phone number is required and must be a string
        "country": Joi.string().required(), // Country is required and must be a string
        "user_id": Joi.number().required() // User ID is required and must be a number
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let cardData = req.body; // Assign request body to card data

    // Add new card to the database
    card.addNewCard(cardData, (err, id) => {
        if (err) return res.sendStatus(500);

        return res.status(201).send({ card_id: id }); // Send card ID if creation is successful
    });
};

// Function to delete a card
const deleteCard = (req, res) => {
    let card_id = parseInt(req.params.card_id); // Extract card ID from request parameters

    // Delete card from the database
    card.deleteCard(card_id, (err) => {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200); // Send 200 status if deletion is successful
    });
};

// Function to get a single card
const getOne = (req, res) => {
    let card_id = parseInt(req.params.card_id); // Extract card ID from request parameters

    // Retrieve a single card from the database
    card.getSingleCard(card_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        return res.status(200).send(result); // Send card if retrieval is successful
    });
};

// Function to update a card
const updateCard = (req, res) => {
    let card_id = parseInt(req.params.card_id); // Extract card ID from request parameters

    // Input validation schema for update fields
    const schema = Joi.object({
        "card_no": Joi.string().optional(), // Card number is optional and must be a string
        "last_four": Joi.string().optional(), // Last four digits are optional and must be a string
        "expiry_date": Joi.string().optional(), // Expiry date is optional and must be a string
        "cvv": Joi.string().optional(), // CVV is optional and must be a string
        "first_name": Joi.string().optional(), // First name is optional and must be a string
        "last_name": Joi.string().optional(), // Last name is optional and must be a string
        "addressline1": Joi.string().optional(), // Address line 1 is optional and must be a string
        "addressline2": Joi.string().allow('').optional(), // Address line 2 is optional and must be a string
        "towncity": Joi.string().optional(), // Town/city is optional and must be a string
        "postcode": Joi.string().optional(), // Postcode is optional and must be a string
        "phone_no": Joi.string().optional(), // Phone number is optional and must be a string
        "country": Joi.string().optional(), // Country is optional and must be a string
        "user_id": Joi.number().optional() // User ID is optional and must be a number
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Update card in the database
    card.updateCard(card_id, req.body, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200); // Send 200 status if update is successful
    });
};

// Export all functions for use in the routes
module.exports = {
    getAllCards: getAllCards,
    getByUser: getByUser,
    create: create,
    deleteCard: deleteCard,
    getOne: getOne,
    updateCard: updateCard,
};
