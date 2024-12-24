// Import necessary modules
const crypto = require("crypto");
const db = require("../../database");

// Function to generate hash using PBKDF2 with provided password and salt
const getHash = function (password, salt) {
    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
}

// Function to add a new user to the database
const addNewUser = (user, done) => {
    // Generate a random salt for the user
    const salt = crypto.randomBytes(64);

    // Generate hash using user's password and the salt
    const hash = getHash(user.password, salt);

    // SQL query to insert user data into the database
    const sql = 'INSERT INTO users(first_name, last_name, birth_date, gender, email, password, salt) VALUES (?,?,?,?,?,?,?)'
    let VALUES = [user.first_name, user.last_name, user.birth_date, user.gender, user.email, hash, salt.toString('hex')];

    // Execute the SQL query
    db.run(sql, VALUES, function (err) {
        if (err) return done(err)
        return done(null, this.lastID);
    })
}

// Function to update an existing user's information
const updateUser = (id, user, done) => {
    // Initially declaring salt and hash as null
    let salt = null;
    let hash = null;

    // Check if user is updating password
    if (user.password) {
        // Generate a new random salt
        salt = crypto.randomBytes(64);

        // Generate hash using new password and the new salt
        hash = getHash(user.password, salt);

        // SQL query to update user information including the new password and salt
        const sql = "UPDATE users SET first_name=?, last_name=?, password=?, salt=? WHERE user_id=?";
        db.run(sql, [user.first_name, user.last_name, hash, salt, id], (err) => {
            return done(err);
        });
    }
    else { // If no password change
        // SQL query to update user information excluding the password and salt
        const sql = "UPDATE users SET first_name=?, last_name=? WHERE user_id=?";
        db.run(sql, [user.first_name, user.last_name, id], (err) => {
            return done(err);
        });
    }
};

// Function to authenticate a user based on email and password
const authenticateUser = (email, password, done) => {
    // SQL query to fetch user data (including salt) based on email
    const sql = 'SELECT user_id, password, salt FROM users WHERE email=?'
    db.get(sql, [email], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404)// wrong email

        // If salt is null, set it to an empty string
        if (row.salt === null) row.salt = ''

        // Convert salt from hex to buffer
        let salt = Buffer.from(row.salt, 'hex')

        // Compare stored password hash with computed hash using provided password and salt
        if (row.password === getHash(password, salt)) {
            return done(false, row.user_id) // Return user id if authentication succeeds
        }
        else {
            console.log(row.password, getHash(password, salt))
            return done(404)// wrong password
        }
    })
}

// Function to retrieve session token based on user ID
const getToken = (user_id, done) => {
    // SQL query to fetch session token based on user ID
    const sql = 'SELECT session_token FROM users WHERE user_id=?'
    db.get(sql, [user_id], (err, row) => {
        if (err) return done(err);
        if (!row) return done(404);
        // Return session token if found
        return done(null, row.session_token)
    })
}

// Function to generate and set session token for a user
const setToken = (id, done) => {
    // Generate a random session token
    let token = crypto.randomBytes(16).toString('hex');
    // SQL query to update session token for a user
    const sql = 'UPDATE users SET session_token=? WHERE user_id=?'
    db.run(sql, [token, id], (err) => {
        // Return error if query fails, otherwise return generated token
        return done(err, token)
    })
}

// Function to check the validity of a session token
const checkToken = (token, done) => {
    // SQL query to check if provided session token exists
    const sql = 'SELECT session_token FROM users WHERE session_token=?'
    db.get(sql, [token], (err, row) => {
        if (err) return done({ status: 500, message: "Server Error" });
        if (!row) return done({ status: 401, message: "Unauthorized: User not logged in" });
        // Return null if token is valid
        return done(null);
    });
}

// Function to remove session token for a user (logout)
const removeToken = (token, done) => {
    // SQL query to remove session token for a user
    const sql = 'UPDATE users SET session_token = null WHERE session_token=?'
    db.run(sql, [token], (err) => {
        if (err) return done({ status: 500, message: "Server Error" });
        // Check if token removal was successful
        checkToken(token, (err) => {
            if (err) return done(err);
            // Return true if token removal is successful
            return done(null, true);
        });
    });
}

// Function to retrieve information of all users
const getAllusers = (done) => {
    const results = [];

    // Execute SQL query to retrieve all users
    db.each("SELECT * FROM users", [], (err, row) => {
        if (err) console.log("Something went wrong: " + err);

        // Push user data to results array
        results.push({
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            birth_date: row.birth_date,
            gender: row.gender,
            email: row.email,
        });
    },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}

// Function to retrieve details of a single user based on user ID
const getSingleUser = (id, done) => {
    // SQL query to retrieve user data based on user ID
    const sql = "SELECT * FROM users WHERE user_id=?";

    db.get(sql, [id], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404)

        // Return user data if found
        return done(null, {
            user_id: row.user_id,
            first_name: row.first_name,
            last_name: row.last_name,
            birth_date: row.birth_date,
            gender: row.gender,
            email: row.email,
        })
    })
}

// Function to retrieve the user ID based on session token
const getIDFromToken = (token, done) => {
    // SQL query to retrieve user ID based on session token
    const sql = 'SELECT user_id FROM users WHERE session_token=?'
    db.get(sql, [token], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404)
        // Return user ID if found
        return done(null, row)
    })
}

// Export all functions for use in the controllers
module.exports = {
    addNewUser: addNewUser,
    updateUser: updateUser,
    authenticateUser: authenticateUser,
    getToken: getToken,
    setToken: setToken,
    removeToken: removeToken,
    getAllusers: getAllusers,
    getIDFromToken: getIDFromToken,
    checkToken: checkToken,
    getSingleUser: getSingleUser
}