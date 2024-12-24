// Import necessary modules and models
const { app } = require("express"); // The Express application instance
const Joi = require("joi"); // For input validation
const users = require("../models/users.models"); // Import users models
const emailValidator = require("email-validator"); // For email validation
const nodemailer = require("nodemailer"); // For sending emails

/*
// Function to send email - DOESN'T WORK
const sendEmail = (to, subject, text, callback) => {
    // Configuration for nodemailer to send email using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'heliossolecompany@gmail.com', // Gmail username
            pass: 'Jordan4sOrJordan1s.' // Gmail password
        }
    });

    // Email options
    const mailOptions = {
        from: 'heliossolecompany@gmail.com', // Sender email
        to: to, // Recipient email
        subject: subject, // Email subject
        text: text // Email body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error); // Log error if sending email fails
            callback(error); // Callback with error
        } else {
            console.log('Email sent: ' + info.response); // Log success message
            callback(null, info.response); // Callback with success response
        }
    });
};
*/

// Function to handle user login
const login = (req, res) => {
    // Input validation schema
    const schema = Joi.object({
        "email": Joi.string().required(), // Email field is required
        "password": Joi.string().required(), // Password field is required
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Authenticate user using provided email and password
    users.authenticateUser(req.body.email, req.body.password, (err, id) => {
        if (err) return res.status(400).send("Invalid email/password supplied");
        if (!id) return res.status(400).send("Invalid email/password supplied");

        // Get or set session token for authenticated user
        users.getToken(id, (err, token) => {
            if (err) return res.status(500).send("An error occurred while retrieving/setting the token");
            if (token) {
                return res.status(200).send({ user_id: id, session_token: token }); // Return user ID and session token if already set
            } else {
                // Set session token for user
                users.setToken(id, (err, token) => {
                    if (err) return res.status(500).send("An error occurred while setting the token");
                    return res.status(200).send({ user_id: id, session_token: token }); // Return user ID and session token if setting is successful
                });
            }
        });
    });
};

// Function to create a new user
const createUser = (req, res) => {
    // Input validation schema
    const schema = Joi.object({
        "first_name": Joi.string().required(), // First name field is required
        "last_name": Joi.string().required(), // Last name field is required
        "birth_date": Joi.date().required(), // Birth date field is required
        "gender": Joi.string().required(), // Gender field is required
        "email": Joi.string().required().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/), // Email field is required and must match regex pattern
        "password": Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+!=])[A-Za-z\d@#$%^&+!=]{8,}$/), // Password field is required and must match regex pattern
    });

    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create new user using provided data
    let newUser = Object.assign({}, req.body);
    users.addNewUser(newUser, (err, id) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.status(201).send({ user_id: id }); // Return user ID if creation is successful
    });
};

// Function to update an existing user
const updateUser = (req, res) => {
    let user_id = parseInt(req.params.user_id); // Extract user ID from request parameters

    // Retrieve user data from database
    users.getSingleUser(user_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);

        // Input validation schema for update fields
        const schema = Joi.object({
            "first_name": Joi.string().optional(), // First name field is optional
            "last_name": Joi.string().optional(), // Last name field is optional
            "password": Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+!=])[A-Za-z\d@#$%^&+!=]{8,}$/).optional(), // Password field is optional and must match regex pattern
        });

        // Validate request body against schema
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Update user data based on request body
        if (req.body.hasOwnProperty("first_name")) {
            result.first_name = req.body.first_name; // Update first name if provided
        }
        if (req.body.hasOwnProperty("last_name")) {
            result.last_name = req.body.last_name; // Update last name if provided
        }
        if (req.body.hasOwnProperty("password")) {
            result.password = req.body.password; // Update password if provided
        }

        // Update user in database
        users.updateUser(user_id, req.body, (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            return res.sendStatus(200); // Return 200 status if update is successful
        });
    });
};

// Function to retrieve all users
const getAllUsers = (req, res) => {
    // Retrieve all users from database
    users.getAllusers((err, num_rows, results) => {
        if (err) return res.sendStatus(500);
        return res.status(200).send(results); // Return users if retrieval is successful
    });
};

// Function to handle user logout
const logout = (req, res) => {
    let token = req.get('X-Authorization'); // Extract session token from request headers
    if (token != null) {
        // Check and remove session token from database
        users.checkToken(token, (err) => {
            if (err) return done(err);
            users.removeToken(token, (row) => {
                if (err) return res.sendStatus(500);
                return res.sendStatus(200); // Return 200 status if logout is successful
            });
        });
    } else {
        return res.sendStatus(401);
    }
};

// Function to retrieve a single user by ID
const getSingleUser = (req, res) => {
    let user_id = parseInt(req.params.user_id); // Extract user ID from request parameters

    // Retrieve user data from database
    users.getSingleUser(user_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);

        return res.status(200).send(result); // Return user data if retrieval is successful
    });
};

/*
// Function to send verification email - DOESN'T WORK
const sendVerificationEmail = (req, res) => {
    const { email, subject, message } = req.body; // Extract email details from request body

    // Validate email address
    if (!emailValidator.validate(email)) {
        return res.status(400).send("Invalid email address"); // Return 400 Bad Request if email address is invalid
    }

    // Send verification email
    sendEmail(email, subject, message, (error, response) => {
        if (error) {
            return res.status(500).send("Error sending email"); // Return 500 Internal Server Error if sending email fails
        } else {
            return res.status(200).send("Email sent successfully"); // Return success message if email is sent successfully
        }
    });
};
*/

// Export all controller functions for use in the routes
module.exports = {
    logout: logout,
    login: login,
    createUser: createUser,
    updateUser: updateUser,
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    //sendVerificationEmail: sendVerificationEmail
};
