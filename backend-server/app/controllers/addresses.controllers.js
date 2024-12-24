// Import Joi for input validation
const Joi = require('joi');

// Import the addresses models
const address = require("../models/addresses.models");

// Function to get all addresses
const getAllAddresses = (req, res) => {
    // Retrieve all addresses from the database
    address.getAllAddresses((err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send addresses if retrieval is successful
    });
};

// Function to get addresses by user
const getByUser = (req, res) => {
    let user_id = req.params.user_id; // Extract user ID from request parameters

    // Retrieve addresses by user from the database
    address.getAddressesByUser(user_id, (err, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send addresses if retrieval is successful
    });
};

// Function to create a new address
const create = (req, res) => {
    // Input validation schema for address creation
    const schema = Joi.object({
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

    let addressData = req.body; // Assign request body to address data

    // Add new address to the database
    address.addNewAddress(addressData, (err, id) => {
        if (err) return res.sendStatus(500);

        return res.status(201).send({ address_id: id }); // Send address ID if creation is successful
    });
};

// Function to delete an address
const deleteAddress = (req, res) => {
    let address_id = parseInt(req.params.address_id); // Extract address ID from request parameters

    // Delete address from the database
    address.deleteAddress(address_id, (err) => {
        if (err) return res.sendStatus(500);
        return res.sendStatus(200); // Send 200 status if deletion is successful
    });
};

// Function to get a single address
const getOne = (req, res) => {
    let address_id = parseInt(req.params.address_id); // Extract address ID from request parameters

    // Retrieve a single address from the database
    address.getSingleAddress(address_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        return res.status(200).send(result); // Send address if retrieval is successful
    });
};

// Function to update an address
const updateAddress = (req, res) => {
    let address_id = parseInt(req.params.address_id); // Extract address ID from request parameters

    // Input validation schema for update fields
    const schema = Joi.object({
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

    // Update address in the database
    address.updateAddress(address_id, req.body, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200); // Send 200 status if update is successful
    });
};

// Export all functions for use in the routes
module.exports = {
    getAllAddresses: getAllAddresses,
    getByUser: getByUser,
    create: create,
    deleteAddress: deleteAddress,
    getOne: getOne,
    updateAddress: updateAddress,
};
