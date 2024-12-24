// Import database
const db = require("../../database");

// Function to get a single description by it's ID
const getSingleDescription = (id, done) => {
    // SQL query to retrieve description data based on it's description ID
    const sql = "SELECT * FROM descriptions WHERE description_id=?";

    db.get(sql, [id], (err, row) => {
        if (err) return done(err);
        if (!row) return done(null, null);

        // Return description data if found
        return done(null, {
            description_id: row.description_id,
            description: row.description,
            product_id: row.product_id
        });
    });
};

// Function to get all descriptions associated with a specific product
const getDescriptionsByProduct = (id, done) => {
    // SQL query to retrieve description data based on the product's ID
    const sql = "SELECT * FROM descriptions WHERE product_id=?";
    db.all(sql, [id], (err, rows) => {
        if (err) return done(err);
        // Return descriptions if found
        return done(null, rows);
    });
};

// Function to get all descriptions
const getAllDescriptions = (done) => {
    // SQL query to retrieve all description data
    const sql = "SELECT * FROM descriptions";
    db.all(sql, [], (err, rows) => {
        if (err) return done(err);
        // Return descriptions if found
        return done(null, rows);
    });
};

// Function to add a new description
const addNewDescription = (description, done) => {
    // SQL query to insert description data into the database
    const sql = 'INSERT INTO descriptions (description, product_id) VALUES (?,?)';
    let values = [description.description, description.product_id];

    db.run(sql, values, function (err) {
        if (err) return done(err, null);

        // Return last inserted ID if successful
        return done(null, this.lastID);
    }
    )

}

// Function to update a description
const updateDescription = (id, description, done) => {
    // SQL query to update description data into the database
    const sql = "UPDATE descriptions SET description=? WHERE description_id=?";

    // Execute the SQL query
    db.run(sql, [description.description, id], (err) => {
        return done(err);
    });
};

// Function to delete a description by it's ID
const deleteDescription = (description_id, done) => {
    // SQL query to delete the description from the database
    const sql = 'DELETE FROM descriptions WHERE description_id=?';

    // Execute the SQL query
    db.run(sql, [description_id], (err) => {
        return done(err);
    });
};

// Export all functions for use in the controllers
module.exports = {
    getSingleDescription: getSingleDescription,
    getDescriptionsByProduct: getDescriptionsByProduct,
    getAllDescriptions: getAllDescriptions,
    addNewDescription: addNewDescription,
    updateDescription: updateDescription,
    deleteDescription: deleteDescription,
};
