// Import database
const db = require("../../database");

// Function to get a single card by it's ID
const getSingleCard = (id, done) => {
    // SQL query to retrieve card data based on it's order ID
    const sql = "SELECT * FROM cards WHERE card_id=?";

    db.get(sql, [id], (err, row) => {
        if (err) return done(err);
        if (!row) return done(null, null);

        // Return card data if found
        return done(null, row);
    });
};

// Function to get all cards associated with a specific user
const getCardsByUser = (user_id, done) => {
    // SQL query to retrieve card data based on the user's ID
    const sql = "SELECT * FROM cards WHERE user_id=?";
    db.all(sql, [user_id], (err, rows) => {
        if (err) return done(err);
        // Return cards if found
        return done(null, rows);
    });
};

// Function to get all cards associated with a specific user
const getAllCards = (done) => {
    // SQL query to retrieve all card data
    const sql = "SELECT * FROM cards";
    db.all(sql, [], (err, rows) => {
        if (err) return done(err);
        // Return cards if found
        return done(null, rows);
    });
};

// Function to add a new card
const addNewCard = (card, done) => {
    // SQL query to insert card data into the database
    const sql = 'INSERT INTO cards (card_no, last_four, expiry_date, cvv, first_name, last_name, addressline1, addressline2, towncity, postcode, phone_no, country, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const values = [card.card_no, card.last_four, card.expiry_date, card.cvv, card.first_name, card.last_name, card.addressline1, card.addressline2, card.towncity, card.postcode, card.phone_no, card.country, card.user_id];

    db.run(sql, values, function (err) {
        if (err) return done(err, null);

        // Return last inserted ID if successful
        return done(null, this.lastID);
    });
}

// Function to update an card's details
const updateCard = (id, card, done) => {
    // SQL query to update card data into the database
    const sql = "UPDATE cards SET card_no=?, last_four=?, expiry_date=?, cvv=?, first_name=?, last_name=?, addressline1=?, addressline2=?, towncity=?, postcode=?, phone_no=?, country=?, user_id=? WHERE card_id=?";
    const values = [card.card_no, card.last_four, card.expiry_date, card.cvv, card.first_name, card.last_name, card.addressline1, card.addressline2, card.towncity, card.postcode, card.phone_no, card.country, card.user_id, id];

    // Execute the SQL query
    db.run(sql, values, (err) => {
        return done(err);
    });
};

// Function to delete a card by it's ID
const deleteCard = (card_id, done) => {
    // SQL query to delete the card from the database
    const sql = 'DELETE FROM cards WHERE card_id=?';

    // Execute the SQL query
    db.run(sql, [card_id], (err) => {
        return done(err);
    });
};

// Export all functions for use in the controllers
module.exports = {
    getSingleCard: getSingleCard,
    getCardsByUser: getCardsByUser,
    getAllCards: getAllCards,
    addNewCard: addNewCard,
    updateCard: updateCard,
    deleteCard: deleteCard,
};
