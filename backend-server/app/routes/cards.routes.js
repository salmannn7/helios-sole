// Import the cards controller
const card = require('../controllers/cards.controllers');

// Export a function to configure routes
module.exports = function (app) {
    // Routes for handling cards
    app.route("/cards")
        .get(card.getAllCards) // GET request to fetch all cards
        .post(card.create); // POST request to create a new card

    // Routes for handling individual cards via card ID
    app.route("/cards/:card_id")
        .delete(card.deleteCard) // DELETE request to delete a card
        .patch(card.updateCard) // PATCH request to update a card
        .get(card.getOne); // GET request to fetch details of a single card

    // Route for fetching cards via user ID
    app.route("/cards/users/:user_id")
        .get(card.getByUser); // GET request to fetch cards by user
};
