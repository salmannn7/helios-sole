// Import the products controller
const products = require('../controllers/products.controllers');

// Export a function to configure routes
module.exports = function (app) {
    // Routes for handling products
    app.route("/products")
        .get(products.getAllProducts) // GET request to fetch all products
        .post(products.create); // POST request to create a new product

    // Routes for handling individual products via product ID
    app.route("/products/:product_id")
        .delete(products.deleteProduct) // DELETE request to delete a product
        .patch(products.updateProduct) // PATCH request to update a product
        .get(products.getOne); // GET request to fetch details of a single product

    // Route for fetching products by type
    app.route("/products/:type")
        .get(products.getByType); // GET request to fetch products via type

    // Route for fetching products by tags (for search functionality)
    // app.route("/products/search")
    //     .get(products.getByTags);
};
