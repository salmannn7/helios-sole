// Import the descriptions controller
const descriptions = require('../controllers/descriptions.controllers');

// Export a function to configure routes
module.exports = function (app) {
    // Routes for handling descriptions
    app.route("/descriptions")
        .get(descriptions.getAllDescriptions) // GET request to fetch all descriptions
        .post(descriptions.create); // POST request to create a new description

    // Routes for handling individual descriptions via description ID 
    app.route("/descriptions/:description_id")
        .delete(descriptions.deleteDescription) // DELETE request to delete a description
        .patch(descriptions.updateDescription) // PATCH request to update a description
        .get(descriptions.getOne); // GET request to fetch details of a single description

    // Route for fetching descriptions via product ID
    app.route("/descriptions/products/:product_id")
        .get(descriptions.getByProduct); // GET request to fetch descriptions by product
};
