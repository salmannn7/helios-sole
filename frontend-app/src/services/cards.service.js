
// Function to get all cards from every user
const getAll = () => {
    return fetch("http://localhost:3000/cards")
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

// Function to get a user's cards based on the user's ID
const getUser = (id) => {
    return fetch("http://localhost:3000/cards/users/" + id)
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

// Function to get a card based on it's card ID
const getOne = (id) => {
    return fetch("http://localhost:3000/cards/" + id)
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

// Function to create a card for payment
const create = (card_no, last_four, expiry_date, cvv, first_name, last_name, addressline1, addressline2, towncity, postcode, phone_no, country, user_id) => {
    return fetch("http://localhost:3000/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "card_no": card_no,
            "last_four": last_four,
            "expiry_date": expiry_date,
            "cvv": cvv,
            "first_name": first_name,
            "last_name": last_name,
            "addressline1": addressline1,
            "addressline2": addressline2,
            "towncity": towncity,
            "postcode": postcode,
            "phone_no": phone_no,
            "country": country,
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

// Function to edit the card details
const edit = (card_no, last_four, expiry_date, cvv, first_name, last_name, addressline1, addressline2, towncity, postcode, phone_no, country, user_id) => {
    return fetch("http://localhost:3000/cards/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "card_no": card_no,
            "last_four": last_four,
            "expiry_date": expiry_date,
            "cvv": cvv,
            "first_name": first_name,
            "last_name": last_name,
            "addressline1": addressline1,
            "addressline2": addressline2,
            "towncity": towncity,
            "postcode": postcode,
            "phone_no": phone_no,
            "country": country,
            "user_id": user_id
        })
    })
        .then((response) => {
            if (response.status === 200) {
                return "Card edited"
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

// Function to remove the card from the user
const deleteCard = (id) => {
    return fetch("http://localhost:3000/cards/" + id, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.status === 200) {
                return "Card Removed"
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

// Exported card service functions
export const cardsService = {
    getAll,
    getOne,
    create,
    getUser,
    deleteCard,
    edit,
}
