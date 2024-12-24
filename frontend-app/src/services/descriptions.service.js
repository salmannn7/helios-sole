
// Function to get all descriptions of the products
const getAll = () => {
    return fetch("http://localhost:3000/descriptions")
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

// Function to get a product's description based on the product's ID
const getProduct = (id) => {
    return fetch("http://localhost:3000/descriptions/products/" + id)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

// Function to get a product's description based on it's description ID
const getOne = (id) => {
    return fetch("http://localhost:3000/descriptions/" + id)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

// Function to create a new description
const create = (description, product_id) => {
    return fetch("http://localhost:3000/descriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "description": description,
            "product_id": product_id
        })
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw "bad request"
            } else if (response.status === 401) {
                throw "unauthorised"
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

// Function to delete a description
const deleteDescription = (id) => {
    return fetch("http://localhost:3000/descriptions/" + id, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.status === 200) {
                return "Description Removed"
            } else if (response.status === 401) {
                throw "unauthorised"
            } else if (response.status === 404) {
                throw "not found"
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

// Exported description service functions
export const descriptionsService = {
    getAll,
    getOne,
    create,
    getProduct,
    deleteDescription,
}
