// Import database
const db = require("../../database");

// Function to get a single product by it's ID
const getSingleProduct = (id, done) => {
    // SQL query to retrieve product data based on product ID
    const sql = "SELECT * FROM products WHERE product_id=?";

    db.get(sql, [id], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404)

        // Return product data if found
        return done(null, {
            product_id: row.product_id,
            product_name: row.product_name,
            product_colourway: row.product_colourway,
            product_code: row.product_code,
            product_manufacturer: row.product_manufacturer,
            colours: row.colours,
            type: row.type,
            tags: row.tags,
            median_price: row.median_price,
            release_date: row.release_date,
        })
    })
}

// Function to get all products associated with a specific type
const getProductsByType = (pos, done) => {
    const results = [];

    // Execute SQL query to retrieve all products based on the type property
    db.each("SELECT * FROM products WHERE type=?", [pos], [], (err, row) => {
        if (err) console.log("Something went wrong: " + err);

        // Push product data to results array
        results.push({
            product_id: row.product_id,
            product_name: row.product_name,
            product_colourway: row.product_colourway,
            product_code: row.product_code,
            product_manufacturer: row.product_manufacturer,
            colours: row.colours,
            type: row.type,
            tags: row.tags,
            median_price: row.median_price,
            release_date: row.release_date,
        });
    },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}

// Function to get all products
const getAllProducts = (done) => {
    const results = [];

    // Execute SQL query to retrieve all products based on the type property
    db.each("SELECT * FROM products", [], (err, row) => {
        if (err) console.log("Something went wrong: " + err);

        // Push product data to results array
        results.push({
            product_id: row.product_id,
            product_name: row.product_name,
            product_colourway: row.product_colourway,
            product_code: row.product_code,
            product_manufacturer: row.product_manufacturer,
            colours: row.colours,
            type: row.type,
            tags: row.tags,
            median_price: row.median_price,
            release_date: row.release_date,
        });
    },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}

// Function to add a new product
const addNewProducts = (product, done) => {
    // SQL query to insert product data into the database
    const sql = 'INSERT INTO products (product_name, product_colourway, product_code, product_manufacturer, colours, type, tags, median_price, release_date) VALUES (?,?,?,?,?,?,?,?,?)';
    let values = [product.product_name, product.product_colourway, product.product_code, product.product_manufacturer, product.colours, product.type, product.tags, product.median_price, product.release_date];

    db.run(sql, values, function (err) {
        if (err) return done(err, null);

        // Return last inserted ID if successful
        return done(null, this.lastID);
    }
    )
}

// Function to update a product's details
const updateProduct = (id, product, done) => {
    // SQL query to update product data into the database
    const sql = "UPDATE products SET product_name=?, product_colourway=?, product_code=?, product_manufacture=?, colours=?, type=?, tags=?, median_price=?, release_date=? WHERE product_id=?"
    let values = [product.product_name, product.product_colourway, product.product_code, product.product_manufacturer, product.colours, product.type, product.tags, product.median_price, product.release_date, id];

    // Execute the SQL query
    db.run(sql, values, (err) => {
        return done(err)
    })
}

// Function to delete a product by it's ID
const deleteProduct = (product_id, done) => {
    // Calls the get single product function to select the specific product
    getSingleProduct(product_id, (err, results) => {
        if (err === 404) {
            return done(err)
        } else {
            // SQL query to delete the product from the database
            const sql = 'DELETE FROM products WHERE product_id=?'

            // Execute the SQL query
            db.run(sql, [product_id], (err) => {
                if (err) return done(err)

                // Return null if product deletion is successful
                return done(null);
            })
        }
    })
}

// Function to retrieve products by it's tags - DOESN'T WORK
/*
const getProductsByTags = (tags, done) => {
    const results = [];
    const tagPlaceholders = tags.map(() => '?').join(',');
    const sql = "SELECT * FROM products WHERE tags LIKE " + tagPlaceholders;
    // Assuming 'db' is your database connection
    
    db.each(
        sql,
        tags,
        (err, row) => {
            if (err) {
                console.log("Something went wrong: " + err);
                return done(err, 0, null); // Return early if there's an error
            }
 
            results.push({
                product_id: row.product_id,
                product_name: row.product_name,
                product_colourway: row.product_colourway,
                product_code: row.product_code,
                product_manufacturer: row.product_manufacturer,
                colours: row.colours,
                type: row.type,
                tags: row.tags,
                median_price: row.median_price,
                release_date: row.release_date,
            });
        },
        (err, num_rows) => {
            if (err) {
                console.log("Error during execution: " + err);
                return done(err, 0, null);
            }
            
            return done(null, num_rows, results);
        }
    );
};
*/

// Export all functions for use in the controllers
module.exports = {
    getAllProducts: getAllProducts,
    deleteProduct: deleteProduct,
    addNewProducts: addNewProducts,
    getSingleProduct: getSingleProduct,
    getProductsByType: getProductsByType,
    updateProduct: updateProduct
    //getProductsByTags: getProductsByTags
}
