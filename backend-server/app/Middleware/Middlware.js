// Import the users models
const users = require("../models/users.models");

// Middleware function to check if a user is authenticated
const isAuthenticated = function (req, res, next) {
    // Extract the session token from the request headers
    let token = req.get('x-authorization');

    // Call the getIDFromToken function from the users models to verify the token
    users.getIDFromToken(token, (err, id) => {
        // Check for errors or if the user ID is null (indicating invalid token)
        if (err || id == null) {
            console.log(err)
            return res.sendStatus(401);
        }
        next(); // Proceed to the route if authentication succeeds
    })
}

// Export all functions for use in the routes
module.exports = {
    isAuthenticated: isAuthenticated
}
