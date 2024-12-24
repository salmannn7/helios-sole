// Import Joi for input validation
const Joi = require('joi');

// Import the products models
const product = require("../models/products.models");

// Function to get all products
const getAllProducts = (req, res) => {
    // Retrieve all products from the database
    product.getAllProducts((err, num_rows, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send products if retrieval is successful
    });
}

// Function to get products by type
const getByType = (req, res) => {
    let type = req.params.type; // Extract product type from request parameters

    // Retrieve products by type from the database
    product.getProductsByType(type, (err, num_rows, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Send products if retrieval is successful
    })
}

// Function to create a new product
const create = (req, res) => {
    // Input validation schema for product creation
    const schema = Joi.object({
        "product_name": Joi.string().max(100).required(), // Product name is required and must be a string with max length of 100
        "product_colourway": Joi.string().max(100).required(), // Product colorway is required and must be a string with max length of 100
        "product_code": Joi.string().max(50).required(), // Product code is required and must be a string with max length of 50
        "product_manufacturer": Joi.string().max(50).required(), // Product manufacturer is required and must be a string with max length of 50
        "colours": Joi.string().max(50).required(), // Colors are required and must be a string with max length of 50
        "type": Joi.string().max(50).required(), // Product type is required and must be a string with max length of 50
        "tags": Joi.string().required(), // Tags are required and must be a string
        "median_price": Joi.number().required(), // Median price is required and must be a number
        "release_date": Joi.date().required(), // Release date is required and must be a date
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let prod = Object.assign({}, req.body); // Create a new product object from request body

    // Add new product to the database
    product.addNewProducts(prod, (err, id) => {
        if (err) return res.sendStatus(500);
        return res.status(201).send({ product_id: id }); // Send product ID if creation is successful
    })
}

// Function to delete a product
const deleteProduct = (req, res) => {
    let product_id = parseInt(req.params.product_id); // Extract product ID from request parameters

    // Delete product from the database
    product.deleteProduct(product_id, (err) => {
        if (err === 500) return res.sendStatus(500);
        if (err === 404) return res.sendStatus(404);
        if (err === 401) return res.sendStatus(401);
        return res.sendStatus(200); // Send 200 OK if deletion is successful
    })
}

// Function to get a single product
const getOne = (req, res) => {
    let product_id = parseInt(req.params.product_id); // Extract product ID from request parameters

    // Retrieve a single product from the database
    product.getSingleProduct(product_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        return res.status(200).send(result); // Send product if retrieval is successful
    })
}

// Function to update a product
const updateProduct = (req, res) => {
    let product_id = parseInt(req.params.product_id); // Extract product ID from request parameters

    // Retrieve the product to be updated from the database
    product.getSingleProduct(product_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);

        // Input validation schema for update fields
        const schema = Joi.object({
            "product_name": Joi.string(),
            "product_colourway": Joi.string(),
            "product_code": Joi.string(),
            "product_manufacturer": Joi.string(),
            "colours": Joi.string(),
            "type": Joi.string(),
            "tags": Joi.string(),
            "median_price": Joi.number(),
            "release_date": Joi.date()
        })

        // Validate request body against schema
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Update product properties if provided in request body
        if (req.body.hasOwnProperty("product_name")) {
            result.product_name = req.body.product_name;
        }
        if (req.body.hasOwnProperty("product_colourway")) {
            result.product_colourway = req.body.product_colourway;
        }
        if (req.body.hasOwnProperty("product_code")) {
            result.product_code = req.body.product_code;
        }
        if (req.body.hasOwnProperty("product_manufacturer")) {
            result.product_manufacturer = req.body.product_manufacturer;
        }
        if (req.body.hasOwnProperty("colours")) {
            result.colours = req.body.colours;
        }
        if (req.body.hasOwnProperty("type")) {
            result.type = req.body.type;
        }
        if (req.body.hasOwnProperty("tags")) {
            result.tags = req.body.tags;
        }
        if (req.body.hasOwnProperty("median_price")) {
            result.median_price = req.body.median_price;
        }
        if (req.body.hasOwnProperty("release_date")) {
            result.release_date = req.body.release_date;
        }

        // Update the product in the database
        product.updateProduct(product_id, result, (err, id) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            return res.sendStatus(200); // Send 200 status if update is successful
        })
    })
}

/*
// Function to get products by tags = DOESN'T WORK
    const getByTags = (req, res) => {
        let tags = req.query.tags.split(',');
        product.getProductsByTags(tags, (err, num_rows, results) => {
            if (err) {
                return res.status(500).send({ error: "Internal Server Error" });
            }
    
            return res.status(200).send(results);
        });
    };

*/

// Export all functions for use in the routes
module.exports = {
    getAllProducts: getAllProducts,
    deleteProduct: deleteProduct,
    create: create,
    getOne: getOne,
    getByType: getByType,
    updateProduct: updateProduct,
    //getByTags: getByTags
}
