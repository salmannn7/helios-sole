// Import database
const db = require("../../database");

// Function to get a single order by it's ID
const getSingleOrder = (id, done) => {
    // SQL query to retrieve order data based on it's order ID
    const sql = "SELECT * FROM orders WHERE order_id=?";

    db.get(sql, [id], (err, row) => {
        if (err) return done(err);
        if (!row) return done(null, null);

        // Return order data if found
        return done(null, {
            order_id: row.order_id,
            product_id: row.product_id,
            size: row.size,
            quantity: row.quantity,
            price: row.price,
            delivery: row.delivery,
            card_id: row.card_id,
            address_id: row.address_id,
            user_id: row.user_id,
            grouping: row.grouping
        });
    });
};

// Function to get all ordered products associated with a group of ordered items (order number)
const getOrdersByGrouping = (group, done) => {
    // SQL query to retrieve order data based on the grouping (order number)
    const sql = "SELECT * FROM orders WHERE grouping=?";
    db.all(sql, [group], (err, rows) => {
        if (err) return done(err);
        // Return orders if found
        return done(null, rows);
    });
};

// Function to get all ordered products associated with a specific user
const getOrdersByUser = (user, done) => {
    // SQL query to retrieve order data based on the user's ID
    const sql = "SELECT * FROM orders WHERE user_id=?";
    db.all(sql, [user], (err, rows) => {
        if (err) return done(err);
        // Return orders if found
        return done(null, rows);
    });
};

// Function to get all orders
const getAllOrders = (done) => {
    // SQL query to retrieve all order data
    const sql = "SELECT * FROM orders";
    db.all(sql, [], (err, rows) => {
        if (err) return done(err);
        // Return orders if found
        return done(null, rows);
    });
};

// Function to add a new order
const addNewOrder = (order, done) => {
    // SQL query to insert order data into the database
    const sql = 'INSERT INTO orders (product_id, size, quantity, price, delivery, card_id, address_id, user_id, grouping) VALUES (?,?,?,?,?,?,?,?,?)';
    let values = [order.product_id, order.size, order.quantity, order.price, order.delivery, order.card_id, order.address_id, order.user_id, order.grouping];

    db.run(sql, values, function (err) {
        if (err) return done(err, null);

        // Return last inserted ID if successful
        return done(null, this.lastID);
    }
    )
}

// Function to update an order's details
const updateOrder = (id, order, done) => {
    // SQL query to update order data into the database
    const sql = "UPDATE orders SET product_id=?, size=?, quantity=?, price=? WHERE order_id=?";

    // Execute the SQL query
    db.run(sql, [order.product_id, order.size, order.quantity, order.price, id], (err) => {
        return done(err);
    });
};

// Function to delete an order by it's ID
const deleteOrder = (order_id, done) => {
    // SQL query to delete the order from the database
    const sql = 'DELETE FROM orders WHERE order_id=?';

    // Execute the SQL query
    db.run(sql, [order_id], (err) => {
        return done(err);
    });
};

// Export all functions for use in the controllers
module.exports = {
    getSingleOrder: getSingleOrder,
    getOrdersByGrouping: getOrdersByGrouping,
    getOrdersByUser: getOrdersByUser,
    getAllOrders: getAllOrders,
    addNewOrder: addNewOrder,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder,
};
