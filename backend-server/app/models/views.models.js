// Import database
const db = require("../../database");

// Function to get a single view by it's ID
const getSingleView = (id, done) => {
    // SQL query to retrieve view data based on it's view ID
    const sql = "SELECT * FROM views WHERE view_id=?";

    db.get(sql, [id], (err, row) => {
        if (err) return done(err);
        if (!row) return done(null, null);

        // Return view data if found
        return done(null, {
            view_id: row.view_id,
            product_id: row.product_id,
            amount: row.amount,
            user_id: row.user_id
        });
    });
};

// Function to get all views associated with a specific user
const getViewsByUser = (id, done) => {
    // SQL query to retrieve view data based on the user's ID
    const sql = "SELECT * FROM views WHERE user_id=?";
    db.all(sql, [id], (err, rows) => {
        if (err) return done(err);
        // Return views if found
        return done(null, rows);
    });
};

// Function to get all views associated with a specific product
const getViewsByProduct = (id, done) => {
    // SQL query to retrieve view data based on the product's ID
    const sql = "SELECT * FROM views WHERE product_id=?";
    db.all(sql, [id], (err, rows) => {
        if (err) return done(err);
        // Return views if found
        return done(null, rows);
    });
};

// Function to get all views
const getAllViews = (done) => {
    // SQL query to retrieve all view data
    const sql = "SELECT * FROM views";
    db.all(sql, [], (err, rows) => {
        if (err) return done(err);
        // Return views if found
        return done(null, rows);
    });
};

// Function to add a new view
const addNewView = (view, done) => {
    // SQL query to insert view data into the database
    const sql = 'INSERT INTO views (product_id, amount, user_id) VALUES (?,?,?)';
    let values = [view.product_id, view.amount, view.user_id];

    db.run(sql, values, function (err) {
        if (err) return done(err, null);

        // Return last inserted ID if successful
        return done(null, this.lastID);
    }
    )
}

// Function to update a view's amount
const updateView = (id, product, done) => {
    // SQL query to update view data into the database
    const sql = "UPDATE views SET amount=? WHERE view_id=?";

    // Execute the SQL query
    db.run(sql, [product.amount, id], (err) => {
        return done(err);
    });
};

// Function to delete a view by it's ID
const deleteView = (view_id, done) => {
    // SQL query to delete the view from the database
    const sql = 'DELETE FROM views WHERE view_id=?';

    // Execute the SQL query
    db.run(sql, [view_id], (err) => {
        return done(err);
    });
};

// Export all functions for use in the controllers
module.exports = {
    getSingleView: getSingleView,
    getViewsByUser: getViewsByUser,
    getAllViews: getAllViews,
    addNewView: addNewView,
    updateView: updateView,
    deleteView: deleteView,
    getViewsByProduct: getViewsByProduct,
};
