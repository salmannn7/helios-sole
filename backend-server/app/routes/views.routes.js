// Import the views controller
const views = require('../controllers/views.controllers');

// Export a function to configure routes
module.exports = function (app) {
    // Routes for handling views
    app.route("/views")
        .get(views.getAllViews) // GET request to fetch all views
        .post(views.create); // POST request to create a new view

    // Routes for handling individual views
    app.route("/views/:view_id")
        .delete(views.deleteView) // DELETE request to delete a view
        .patch(views.updateView) // PATCH request to update a view
        .get(views.getOne); // GET request to fetch details of a single view

    // Route for fetching views via user ID
    app.route("/views/users/:user_id")
        .get(views.getByUser); // GET request to fetch views by user ID

    // Route for fetching views via product ID
    app.route("/views/products/:product_id")
        .get(views.getByProduct); // GET request to fetch views by product ID
};

