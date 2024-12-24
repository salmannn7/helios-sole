// Import the addresses controller
const address = require('../controllers/addresses.controllers');

// Export a function to configure routes
module.exports = function (app) {
    // Routes for handling addresses
    app.route("/addresses")
        .get(address.getAllAddresses) // GET request to fetch all addresses
        .post(address.create); // POST request to create a new address

    // Routes for handling individual addresses
    app.route("/addresses/:address_id")
        .delete(address.deleteAddress) // DELETE request to delete an address
        .patch(address.updateAddress) // PATCH request to update an address
        .get(address.getOne); // GET request to fetch details of a single address

    // Route for fetching addresses via user ID
    app.route("/addresses/users/:user_id")
        .get(address.getByUser); // GET request to fetch addresses by user
};
