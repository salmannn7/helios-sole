// Import database
const db = require("../../database");

// Function to get a single favourited product by it's ID
const getSingleFavourite = (id, done) => {
    // SQL query to retrieve favourited product data based on it's order ID
    const sql = "SELECT * FROM favourites WHERE favourite_id=?";

    db.get(sql, [id], (err, row) => {
        if (err) return done(err);
        if (!row) return done(null, null);

        // Return favourited product data if found
        return done(null, {
            favourite_id: row.favourite_id,
            product_id: row.product_id,
            user_id: row.user_id
        });
    });
};

// Function to get all favourited products associated with a specific user
const getFavouritesByUser = (pos, done) => {
    // SQL query to retrieve favourited product data based on the user's ID
    const sql = "SELECT * FROM favourites WHERE user_id=?";
    db.all(sql, [pos], (err, rows) => {
        if (err) return done(err);
        // Return favourited products if found
        return done(null, rows);
    });
};

// Function to get all favourited products associated with a specific user
const getAllFavourites = (done) => {
    // SQL query to retrieve all favourite data
    const sql = "SELECT * FROM favourites";
    db.all(sql, [], (err, rows) => {
        if (err) return done(err);
        // Return favourites if found
        return done(null, rows);
    });
};

// Function to add a new favourite
const addNewFavourite = (favourite, done) => {
    // SQL query to insert favourite data into the database
    const sql = 'INSERT INTO favourites (product_id, user_id) VALUES (?,?)';
    let values = [favourite.product_id, favourite.user_id];

    db.run(sql, values, function (err) {
        if (err) return done(err, null);

        // Return last inserted ID if successful
        return done(null, this.lastID);
    }
    )
}

// Function to update an favourite's details
const updateFavourite = (id, product, done) => {
    // SQL query to update favourite data into the database
    const sql = "UPDATE favourites SET product_id=? WHERE favourite_id=?";

    // Execute the SQL query
    db.run(sql, [product.product_id, id], (err) => {
        return done(err);
    });
};

// Function to delete a favourite by it's ID
const deleteFavourite = (favourite_id, done) => {
    // SQL query to delete the favourite from the database
    const sql = 'DELETE FROM favourites WHERE favourite_id=?';

    // Execute the SQL query
    db.run(sql, [favourite_id], (err) => {
        return done(err);
    });
};

// Export all functions for use in the controllers
module.exports = {
    getSingleFavourite: getSingleFavourite,
    getFavouritesByUser: getFavouritesByUser,
    getAllFavourites: getAllFavourites,
    addNewFavourite: addNewFavourite,
    updateFavourite: updateFavourite,
    deleteFavourite: deleteFavourite,
};
