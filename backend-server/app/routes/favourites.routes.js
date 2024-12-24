// Import the favourites controller
const favourites = require('../controllers/favourites.controllers');

// Export a function to configure routes
module.exports = function (app) {
    // Routes for handling favourites
    app.route("/favourites")
        .get(favourites.getAllFavourites) // GET request to fetch all favourites
        .post(favourites.create); // POST request to create a new favourite

    // Routes for handling individual favourites via favourite ID
    app.route("/favourites/:favourite_id")
        .delete(favourites.deleteFavourite) // DELETE request to delete a favourite
        .patch(favourites.updateFavourite) // PATCH request to update a favourite
        .get(favourites.getOne); // GET request to fetch details of a single favourite

    // Route for fetching favourites via user ID
    app.route("/favourites/users/:user_id")
        .get(favourites.getByUser); // GET request to fetch favourites by user
};
