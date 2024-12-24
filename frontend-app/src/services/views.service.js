
// Function to get all views from every product
const getAll = () => {
    return fetch("http://localhost:3000/views")
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

// Function to get a user's viewed products based on the user's ID
const getUser = (id) => {
    return fetch("http://localhost:3000/views/users/" + id)
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

// Function to get a product's views based on it's product ID
const getProduct = (id) => {
    return fetch("http://localhost:3000/views/products/" + id)
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

// Function to get a product view based on it's view ID
const getOne = (id) => {
    return fetch("http://localhost:3000/views/" + id)
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

// Function to add a view to the product
const create = (product_id, amount, user_id) => {
    return fetch("http://localhost:3000/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "product_id": product_id,
            "amount": amount,
            "user_id": user_id
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

// Function to change the amount of views the product has by a user
const edit = (id, amount) => {
    return fetch("http://localhost:3000/views/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "amount": amount
        })
    })
        .then((response) => {
            if (response.status === 200) {
                return "view edited"
            } else if (response.status === 400) {
                throw "bad request"
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

// Function to delete the user's views on a product
const deleteView = (id) => {
    return fetch("http://localhost:3000/views/" + id, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.status === 200) {
                return "View Removed"
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

// Exported view service functions
export const viewsService = {
    getAll,
    getOne,
    create,
    getUser,
    getProduct,
    deleteView,
    edit,
}
