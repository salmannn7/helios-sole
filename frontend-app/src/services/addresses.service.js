
// Function to get all addresses from every user
const getAll = () => {
    return fetch("http://localhost:3000/addresses")
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

// Function to get a user's addresses based on the user's ID
const getUser = (id) => {
    return fetch("http://localhost:3000/addresses/users/" + id)
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

// Function to get an address based on it's address ID
const getOne = (id) => {
    return fetch("http://localhost:3000/addresses/" + id)
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

// Function to create an address for delivery
const create = (first_name, last_name, addressline1, addressline2, towncity, postcode, phone_no, country, user_id) => {
    return fetch("http://localhost:3000/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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

// Function to edit the address details
const edit = (first_name, last_name, addressline1, addressline2, towncity, postcode, phone_no, country, user_id) => {
    return fetch("http://localhost:3000/addresses/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
                return "Address edited"
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

// Function to remove the address from the user
const deleteAddress = (id) => {
    return fetch("http://localhost:3000/addresses/" + id, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.status === 200) {
                return "Address Removed"
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

// Exported address service functions
export const addressesService = {
    getAll,
    getOne,
    create,
    getUser,
    deleteAddress,
    edit,
}
