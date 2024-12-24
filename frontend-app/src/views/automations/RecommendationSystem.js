// Import necessary services for fetching data
import { productsService } from "../../services/products.service";
import { viewsService } from "../../services/views.service";
import { ordersService } from "../../services/orders.service";

// The main recommendation system function
export async function fetchRecommendations(userId) {
    try {
        // Uses the get users count function to check how many users are logged to the website
        let users = await getUsersCount();

        // Checks if there is less than five users in the website
        if (users < 5) {
            console.log("Not Enough Data for Collaborative Filtering")
            // Outputs only the content-based recommendations
            // this is due to collaborative filtering using multiple users's data to get results
            return await getContentBasedByUser(userId);
        }

        // Generate both content-based and collaborative recommendations
        let contentBasedRecommendations = await getContentBasedByUser(userId);
        let collaborativeRecommendations = await getCollaborativeByUser(userId);

        // If both types of recommendations are available, merge them using the merge recommedations function and return the output
        if (contentBasedRecommendations.length > 0 && collaborativeRecommendations.length > 0) {
            let mergedRecommendations = mergeRecommendations(contentBasedRecommendations, collaborativeRecommendations);
            return mergedRecommendations;
        }

        // If only content-based recommendations are available, return them
        return contentBasedRecommendations;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
}

// Function to get the count of unique users based on orders
async function getUsersCount() {
    try {
        // Fetches every order made by all users
        let allOrders = await ordersService.getAll();

        // Creates a Set of unique user IDs by mapping each order to its user ID
        let uniqueUsers = new Set(allOrders.map(order => order.user_id));

        // Returns the size of the Set, which represents the count of unique users
        return uniqueUsers.size;
    } catch (error) {
        console.error('Error getting users count:', error);

        // Returns 0 if an error occurs
        return 0;
    }
}

// Function to merge content-based and collaborative recommendations
async function mergeRecommendations(contentBasedRecommendations, collaborativeRecommendations) {
    let mergedProductsMap = new Map();

    // Adds content-based recommendations to the merged map
    for (let product of contentBasedRecommendations) {
        // Initialises a new entry in the map with product ID as key
        // Sets the value as an object containing the product, score initialised to 0, and count initialised to 1
        mergedProductsMap.set(product.product_id, { product, score: 0, count: 1 });
    }

    // Update scores for products present in collaborative recommendations
    for (let product of collaborativeRecommendations) {
        // If the product is already in the merged map, update its score and count
        if (mergedProductsMap.has(product.product_id)) {
            let existingProduct = mergedProductsMap.get(product.product_id);
            existingProduct.score += existingProduct.count; // Increases the score by the current count
            existingProduct.count++; // Increments the count
        } else {
            // If the product is not in the merged map, add it with an initial score of 1 and count of 1
            mergedProductsMap.set(product.product_id, { product, score: 1, count: 1 });
        }
    }

    // Calculates the average score for each merged product
    for (let mergedProduct of mergedProductsMap.values()) {
        mergedProduct.product.averageScore = mergedProduct.score / mergedProduct.count;
    }

    // Sorts the merged products by average score
    let mergedProducts = Array.from(mergedProductsMap.values()).sort((a, b) => b.product.averageScore - a.product.averageScore);

    // Extracts the products from merged recommendations and return them
    return mergedProducts.map(item => item.product);
}

// Function to generate content-based recommendations for the user
async function getContentBasedByUser(userId) {
    // Fetches necessary data from services
    let products = await productsService.getAll();
    let views = await viewsService.getUser(userId);
    let orders = await ordersService.getUser(userId);

    // Sets counts based on the tags and colours of the products
    let tagCount = {};
    let coloursCount = {};

    // Sorts the views by amount (descending order)
    views.sort((a, b) => b.amount - a.amount);

    // Checks the views and orders to determine common tags and colors
    for (let x = 0; x < views.length; x++) {
        // Gets the product ID from each view
        let productId = views[x].product_id;

        // Fetches the product by using the previously fetched product ID
        let product = await productsService.getOne(productId);

        // Counts tags for each viewed product
        if (product && product.tags) {
            // Splits the tags property into separate tags and count occurrences of each tag
            product.tags.split(', ').forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        }

        // Counts colours for each viewed product
        if (product && product.colours) {
            // Splits the tags property into separate colours and count occurrences of each colour
            product.colours.split('/').forEach(color => {
                coloursCount[color] = (coloursCount[color] || 0) + 1;
            });
        }
    }

    // If user has made more than 5 orders, consider tags from those orders as well
    if (orders.length > 5) {
        // Iterates over each order, counting their tags
        for (let i = 0; i < orders.length; i++) {
            // Fetches the product using the ordered item's product ID
            let orderProducts = await productsService.getOne(orders[i].product_id);

            // Iterate over products in the order products array to count their tags
            for (let j = 0; j < orderProducts.length; j++) {
                let product = orderProducts[j];
                // Count tags for each product
                if (product && product.tags) {
                    // Split tags property into separate words and count occurrences of each tag
                    product.tags.split(', ').forEach(tag => {
                        tagCount[tag] = (tagCount[tag] || 0) + 1;
                    });
                }
            }
        }
    }

    // Gets the top fifteen most common tags and colors picked from the user's data
    let mostCommonTags = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a]).slice(0, 15);
    let mostCommonColours = Object.keys(coloursCount).sort((a, b) => coloursCount[b] - coloursCount[a]).slice(0, 15);

    console.log("Most common tags:", mostCommonTags);
    console.log("Most common colours:", mostCommonColours);

    // Calculates the scores for each product based on common tags and colors
    let productsWithScores = [];
    for (let x = 0; x < products.length; x++) {
        // Gets the product ID and fetches the product details
        let productId = products[x].product_id;

        // Fetches the product based on the previously fetched product ID
        let product = await productsService.getOne(productId);

        // Checks if the product exists and has tags
        if (product && product.tags) {
            // Splits the tags into separate words
            let productTags = product.tags.split(', ');

            // Calculates the tag score by counting common tags
            let tagScore = productTags.filter(tag => mostCommonTags.includes(tag)).length;
            let colorScore = 0;

            // If product has colors, it calculates the color score by counting common colors
            if (product.colours) {
                let productColours = product.colours.split('/');
                colorScore = productColours.filter(colour => mostCommonColours.includes(colour)).length;
            }

            // Calculates overall score as the average of tag and color scores
            let score = (tagScore + colorScore) / 2;

            // Stores the product and its score
            productsWithScores.push({ product, score });
        }
    }

    // Sorts the products by score in descending order
    productsWithScores.sort((a, b) => b.score - a.score);

    // Extracts the sorted products into an array
    let sortedProducts = productsWithScores.map(item => item.product);

    // Returns the sorted products
    return sortedProducts;
}

// Function to generate collaborative recommendations for the user
async function getCollaborativeByUser(userId) {
    try {
        // Fetches all orders
        let allOrders = await ordersService.getAll();

        // Filters the orders of other users
        let otherUsersOrders = allOrders.filter(order => order.user_id !== userId);

        // Creates a Map to count the occurrences of each product
        let productCountMap = new Map();

        // Counts the occurrences of each product in other users's orders
        for (let i = 0; i < otherUsersOrders.length; i++) {
            let productId = otherUsersOrders[i].product_id;

            // Increments the count if product already exists, otherwise set the count to 1
            if (productCountMap.has(productId)) {
                productCountMap.set(productId, productCountMap.get(productId) + 1);
            } else {
                productCountMap.set(productId, 1);
            }
        }

        // Sorts the product IDs by their occurrence count
        let sortedProductIds = Array.from(productCountMap.keys()).sort((a, b) => {
            return productCountMap.get(b) - productCountMap.get(a);
        });

        // Fetches the details of sorted products
        let sortedProducts = [];
        for (let productId of sortedProductIds) {
            // Fetches the product details
            let productDetails = await productsService.getOne(productId);

            // Adds the product details to the list if they exist
            if (productDetails) {
                sortedProducts.push(productDetails);
            }
        }

        // Returns the sorted products
        return sortedProducts;
    } catch (error) {
        console.error('Error getting collaborative recommendations:', error);
        return [];
    }
}

// Function to generate products related to the exported product object
export async function fetchRelatedItemsForProduct(exportedProduct) {
    try {
        // Fetches all products
        let products = await productsService.getAll();

        // Sets counts based on the tags and colours of the products
        let tagCount = {};
        let coloursCount = {};

        console.log(exportedProduct);

        // Gets the product ID from the product object
        let productId = exportedProduct.product_id;

        // Fetches the product by using the previously fetched product ID
        let product = await productsService.getOne(productId);

        console.log(productId + " " + product)

        // Counts tags for the product
        if (product && product.tags) {
            // Splits the tags property into separate tags and count occurrences of each tag
            product.tags.split(', ').forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        }

        // Counts colours for the product
        if (product && product.colours) {
            // Splits the colours property into separate tags and count occurrences of each colour
            product.colours.split('/').forEach(color => {
                coloursCount[color] = (coloursCount[color] || 0) + 1;
            });
        }

        // Gets the top fifteen most common tags and colors picked from the product object - probably not needed
        let mostCommonTags = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a]).slice(0, 15);
        let mostCommonColours = Object.keys(coloursCount).sort((a, b) => coloursCount[b] - coloursCount[a]).slice(0, 15);

        console.log("Most common tags for this Product:", mostCommonTags);
        console.log("Most common colours for this Product:", mostCommonColours);

        // Calculates the scores for each product based on common tags and colors
        let productsWithScores = [];
        for (let x = 0; x < products.length; x++) {
            // Gets the product ID and fetches the product details
            let productId = products[x].product_id;

            // Fetches the product based on the previously fetched product ID
            let product = await productsService.getOne(productId);

            // Checks if the product exists and has tags
            if (product && product.tags) {
                // Splits the tags into separate words
                let productTags = product.tags.split(', ');

                // Calculates the tag score by counting common tags
                let tagScore = productTags.filter(tag => mostCommonTags.includes(tag)).length;
                let colorScore = 0;

                // If product has colors, it calculates the color score by counting common colors
                if (product.colours) {
                    let productColours = product.colours.split('/');
                    colorScore = productColours.filter(colour => mostCommonColours.includes(colour)).length;
                }

                // Calculates overall score as the average of tag and color scores
                let score = (tagScore + colorScore) / 2;

                // Stores the product and its score
                productsWithScores.push({ product, score });
            }
        }

        // Sorts the products by score in descending order
        productsWithScores.sort((a, b) => b.score - a.score);

        // Extracts the sorted products into an array
        let sortedProducts = productsWithScores.map(item => item.product);

        // Returns the sorted products
        return sortedProducts;

    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
}

// Function to generate products related to the exported products array
export async function fetchRelatedItemsForProducts(exportedProducts) {
    try {
        // Fetches all products
        let products = await productsService.getAll();

        // Sets counts based on the tags and colours of the products
        let tagCount = {};
        let coloursCount = {};

        // Iterates over each product from the products array to count the occurrances of their tags and colours
        for (let x = 0; x < exportedProducts.length; x++) {
            // Gets the product ID and fetches the product details
            let productId = exportedProducts[x].product_id;

            // Fetches the product based on the previously fetched product ID
            let product = await productsService.getOne(productId);

            // Checks if the product exists and has tags
            if (product && product.tags) {
                // Splits the tags property into separate tags and count occurrences of each tag
                product.tags.split(', ').forEach(tag => {
                    tagCount[tag] = (tagCount[tag] || 0) + 1;
                });
            }

            // Counts colours for the product
            if (product && product.colours) {
                // Splits the colours property into separate tags and count occurrences of each colour
                product.colours.split('/').forEach(color => {
                    coloursCount[color] = (coloursCount[color] || 0) + 1;
                });
            }
        }

        // Gets the top fifteen most common tags and colors picked from the product object
        let mostCommonTags = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a]).slice(0, 25);
        let mostCommonColours = Object.keys(coloursCount).sort((a, b) => coloursCount[b] - coloursCount[a]).slice(0, 15);

        console.log("Most common tags for these Product(s):", mostCommonTags);
        console.log("Most common colours for these Product(s):", mostCommonColours);

        // Calculates the scores for each product based on common tags and colors
        let productsWithScores = [];
        for (let x = 0; x < products.length; x++) {
            // Gets the product ID and fetches the product details
            let productId = products[x].product_id;

            // Fetches the product based on the previously fetched product ID
            let product = await productsService.getOne(productId);

            // Checks if the product exists and has tags
            if (product && product.tags) {
                // Splits the tags into separate words
                let productTags = product.tags.split(', ');

                // Calculates the tag score by counting common tags
                let tagScore = productTags.filter(tag => mostCommonTags.includes(tag)).length;
                let colorScore = 0;

                // If product has colors, it calculates the color score by counting common colors
                if (product.colours) {
                    let productColours = product.colours.split('/');
                    colorScore = productColours.filter(colour => mostCommonColours.includes(colour)).length;
                }
                // Calculates overall score as the average of tag and color scores
                let score = (tagScore + colorScore) / 2;

                // Stores the product and its score
                productsWithScores.push({ product, score });
            }
        }

        // Sorts the products by score in descending order
        productsWithScores.sort((a, b) => b.score - a.score);

        // Extracts the sorted products into an array
        let sortedProducts = productsWithScores.map(item => item.product);

        // Returns the sorted products
        return sortedProducts;

    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
}