
// Function to get all ordered items from every user
const getAll = () => {
    return fetch("http://localhost:3000/orders")
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

// Function to get a user's ordered items based on the user's ID
const getUser = (id) => {
    return fetch("http://localhost:3000/orders/users/" + id)
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

// Function to get a group of ordered items based on it's grouping (order number)
const getGroup = (grouping) => {
    return fetch("http://localhost:3000/orders/groups/" + grouping)
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

// Function to get an ordered item based on it's order ID
const getOne = (id) => {
    return fetch("http://localhost:3000/orders/" + id)
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

// Function to order an item
const create = (product_id, size, quantity, price, delivery, card_id, address_id, user_id, grouping) => {
    return fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "product_id": product_id,
            "size": size,
            "quantity": quantity,
            "price": price,
            "delivery": delivery,
            "card_id": card_id,
            "address_id": address_id,
            "user_id": user_id,
            "grouping": grouping
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

// Function to edit the ordered item's details
const edit = (id, product_id, size, quantity, price) => {
    return fetch("http://localhost:3000/orders/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "product_id": product_id,
            "size": size,
            "quantity": quantity,
            "price": price
        })
    })
        .then((response) => {
            if (response.status === 200) {
                return "Order edited"
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

// Function to delete the ordered item
const deleteOrder = (id) => {
    return fetch("http://localhost:3000/orders/" + id, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.status === 200) {
                return "Order Removed"
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

// Exported order service functions
export const ordersService = {
    getAll,
    getOne,
    create,
    getUser,
    getGroup,
    deleteOrder,
    edit,
}
