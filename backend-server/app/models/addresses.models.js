// Import database
const db = require("../../database");

// Function to get a single address by it's ID
const getSingleAddress = (id, done) => {
    // SQL query to retrieve address data based on it's order ID
    const sql = "SELECT * FROM addresses WHERE address_id=?";

    db.get(sql, [id], (err, row) => {
        if (err) return done(err);
        if (!row) return done(null, null);

        // Return address data if found
        return done(null, row);
    });
};

// Function to get all addresses associated with a specific user
const getAddressesByUser = (user_id, done) => {
    // SQL query to retrieve address data based on the user's ID
    const sql = "SELECT * FROM addresses WHERE user_id=?";
    db.all(sql, [user_id], (err, rows) => {
        if (err) return done(err);
        // Return addresses if found
        return done(null, rows);
    });
};

// Function to get all addresses associated with a specific user
const getAllAddresses = (done) => {
    // SQL query to retrieve all address data
    const sql = "SELECT * FROM addresses";
    db.all(sql, [], (err, rows) => {
        if (err) return done(err);
        // Return addresses if found
        return done(null, rows);
    });
};

// Function to add a new address
const addNewAddress = (address, done) => {
    // SQL query to insert address data into the database
    const sql = 'INSERT INTO addresses (first_name, last_name, addressline1, addressline2, towncity, postcode, phone_no, country, user_id) VALUES (?,?,?,?,?,?,?,?,?)';
    const values = [address.first_name, address.last_name, address.addressline1, address.addressline2, address.towncity, address.postcode, address.phone_no, address.country, address.user_id];

    db.run(sql, values, function (err) {
        if (err) return done(err, null);

        // Return last inserted ID if successful
        return done(null, this.lastID);
    });
}

// Function to update an address's details
const updateAddress = (id, address, done) => {
    // SQL query to update address data into the database
    const sql = "UPDATE addresses SET first_name=?, last_name=?, addressline1=?, addressline2=?, towncity=?, postcode=?, phone_no=?, country=?, user_id=? WHERE address_id=?";
    const values = [address.first_name, address.last_name, address.addressline1, address.addressline2, address.towncity, address.postcode, address.phone_no, address.country, address.user_id, id];

    // Execute the SQL query
    db.run(sql, values, (err) => {
        return done(err);
    });
};

// Function to delete a address by it's ID
const deleteAddress = (address_id, done) => {
    // SQL query to delete the address from the database
    const sql = 'DELETE FROM addresses WHERE address_id=?';

    // Execute the SQL query
    db.run(sql, [address_id], (err) => {
        return done(err);
    });
};

// Export all functions for use in the controllers
module.exports = {
    getSingleAddress: getSingleAddress,
    getAddressesByUser: getAddressesByUser,
    getAllAddresses: getAllAddresses,
    addNewAddress: addNewAddress,
    updateAddress: updateAddress,
    deleteAddress: deleteAddress,
};
