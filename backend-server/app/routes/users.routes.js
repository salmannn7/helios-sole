// Import middleware for authorization
const authorization = require("../Middleware/Middlware");

// Import users controller
const users = require("../controllers/users.controllers");

// Export a function to configure routes
module.exports = function (app) {
    // Route for user login
    app.route("/login")
        .post(users.login); // POST request to log in user

    // Route for user logout
    app.route("/logout")
        .post(authorization.isAuthenticated, users.logout); // POST request to log out user, with authorization middleware

    // Routes for user creation and fetching all users
    app.route("/users")
        .post(users.createUser) // POST request to create a new user
        .get(users.getAllUsers); // GET request to fetch all users

    // Routes for fetching a single user and updating user details via user ID
    app.route("/users/:user_id")
        .get(users.getSingleUser) // GET request to fetch details of a single user
        .patch(users.updateUser); // PATCH request to update user details

    // Route for sending a verification email - DOESN'T WORK
    // app.route("/send-verification-email")
    //     .post(users.sendVerificationEmail); // POST request to send verification email
};
