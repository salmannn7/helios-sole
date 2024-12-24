
// Function to log in a user
const login = (email, password) => {
    return fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw "bad request"
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            // Sets items in the local storage to store the user ID and session token when the user logs in
            localStorage.setItem("user_id", resJson.user_id);
            localStorage.setItem("session_token", resJson.session_token)
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

// Function to log out a user
const logout = () => {
    return fetch("http://localhost:3000/logout",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            }
        })
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem("user_id");
                localStorage.removeItem("session_token")
            } else if (response.status === 401) {
                throw "not logged in"
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

// Function to get a user by user ID
const getOne = (id) => {
    return fetch("http://localhost:3000/users/" + id)
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

// Function to get all users
const getAll = () => {
    return fetch("http://localhost:3000/users")
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

// Function to register a new user
const create = (firstname, lastname, birthdate, gender, email, password) => {
    return fetch("http://localhost:3000/users",

        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "first_name": firstname,
                "last_name": lastname,
                "birth_date": birthdate,
                "gender": gender,
                "email": email,
                "password": password
            })
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                throw "bad request"
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

// Function to edit user details
const edit = (id, first_name, last_name, password) => {
    let requestBody = {
        first_name: first_name,
        last_name: last_name
    };

    // Only include password if it's provided and not empty
    if (password && password.trim() !== "") {
        requestBody.password = password;
    }

    return fetch("http://localhost:3000/users/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    })
        .then((response) => {
            if (response.status === 200) {
                return "User edited"
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

// Function to send verification email - DOESN'T WORK
/*
const sendVerificationEmail = (email, subject, message) => {
    return fetch("http://localhost:3000/send-verification-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "subject": subject,
            "message": message
        })
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 400) {
                throw "bad request"
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.log("Err", error);
            return Promise.reject(error);
        });
}
*/

// Exported user service functions
export const usersService = {
    login,
    logout,
    getOne,
    getAll,
    create,
    edit,
    //sendVerificationEmail,
}
