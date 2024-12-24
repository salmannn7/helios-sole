// Import database
const db = require("../../database");

// Function to get a single carted product by it's ID
const getSingleItem = (id, done) => {
    // SQL query to retrieve carted product data based on it's order ID
    const sql = "SELECT * FROM cart WHERE cart_id=?";

    db.get(sql, [id], (err, row) => {
        if (err) return done(err);
        if (!row) return done(null, null);

        // Return carted product data if found
        return done(null, {
            cart_id: row.cart_id,
            product_id: row.product_id,
            size: row.size,
            quantity: row.quantity,
            price: row.price,
            user_id: row.user_id
        });
    });
};

// Function to get all carted products associated with a specific user
const getItemsByUser = (pos, done) => {
    // SQL query to retrieve carted product data based on the user's ID
    const sql = "SELECT * FROM cart WHERE user_id=?";
    db.all(sql, [pos], (err, rows) => {
        if (err) return done(err);
        // Return carted products if found
        return done(null, rows);
    });
};

// Function to get all carted products associated with a specific user
const getAllItems = (done) => {
    // SQL query to retrieve all carted product data
    const sql = "SELECT * FROM cart";
    db.all(sql, [], (err, rows) => {
        if (err) return done(err);
        // Return carted products if found
        return done(null, rows);
    });
};

// Function to add a new carted product
const addNewItem = (cart, done) => {
    // SQL query to insert carted product data into the database
    const sql = 'INSERT INTO cart (product_id, size, quantity, price, user_id) VALUES (?,?,?,?,?)';
    let values = [cart.product_id, cart.size, cart.quantity, cart.price, cart.user_id];

    db.run(sql, values, function (err) {
        if (err) return done(err, null);

        // Return last inserted ID if successful
        return done(null, this.lastID);
    }
    )
}

// Function to update an carted product's details
const updateItem = (id, cart, done) => {
    // SQL query to update carted product data into the database
    const sql = "UPDATE cart SET product_id=?, size=?, quantity=?, price=? WHERE cart_id=?";

    // Execute the SQL query
    db.run(sql, [cart.product_id, cart.size, cart.quantity, cart.price, id], (err) => {
        return done(err);
    });
};

// Function to delete a carted product by it's ID
const deleteItem = (cart_id, done) => {
    // SQL query to delete the carted product from the database
    const sql = 'DELETE FROM cart WHERE cart_id=?';

    // Execute the SQL query
    db.run(sql, [cart_id], (err) => {
        return done(err);
    });
};

// Export all functions for use in the controllers
module.exports = {
    getSingleItem: getSingleItem,
    getItemsByUser: getItemsByUser,
    getAllItems: getAllItems,
    addNewItem: addNewItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
};
