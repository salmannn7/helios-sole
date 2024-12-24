// Import necessary modules
const sqlite3 = require('sqlite3').verbose();
const crypto = require("crypto")

// Define the path to the SQLite database file
const DBSOURCE = 'db.sqlite';

// Connect to the SQLite database
const db = new sqlite3.Database(DBSOURCE, (err) => {
  // Check for errors during connection
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');

    // Create the 'users' table
    db.run(`CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    birth_date DATE,
    gender TEXT,
    email TEXT UNIQUE,
    password TEXT,
    salt TEXT,
    session_token TEXT,
    CONSTRAINT email_unique UNIQUE (email)
    )`, (err) => {
      if (err) {
        console.log("Users table already created")
      } else {
        console.log("Users table created")
      }

      // Generate hash and salt for the default admin account password
      const ADMIN_PASSWORD = "Admin123!"
      const getHash = function (password, salt) {
        return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
      };

      const INSERT = 'INSERT INTO users (first_name, last_name, birth_date, gender, email, password, salt) VALUES (?,?,?,?,?,?,?)'
      const salt = crypto.randomBytes(64);
      const hash = getHash(ADMIN_PASSWORD, salt);

      // Insert the default admin account into the 'users' table
      db.run(INSERT, ["admin", "admin", "1970-01-01", "Male", "admin@admin.com", hash, salt.toString('hex')], (err) => {
        if (err) {
          console.log("Admin account already exists")
        }
      })
    })

    // Create the 'products' table
    db.run(`CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    product_colourway TEXT NOT NULL,
    product_code TEXT NOT NULL,
    product_manufacturer TEXT NOT NULL,
    colours TEXT NOT NULL,
    type TEXT NOT NULL,
    tags TEXT NOT NULL,
    median_price DOUBLE,
    release_date DATE
    )`, (err) => {
      if (err) {
        console.log("Products table already created");
      } else {
        console.log("Products table created");
      }
    });

    // Create the 'tobeadded' table
    db.run(`CREATE TABLE tobeadded (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    product_colourway TEXT NOT NULL,
    product_code TEXT NOT NULL,
    product_manufacturer TEXT NOT NULL,
    colours TEXT NOT NULL,
    type TEXT NOT NULL,
    tags TEXT NOT NULL,
    median_price DOUBLE,
    release_date DATE
    )`, (err) => {
      if (err) {
        console.log("TBA Products table already created");
      } else {
        console.log("TBA Products table created");
      }
    });

    // Create the 'favourites' table
    db.run(`CREATE TABLE favourites (
    favourite_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(product_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`, (err) => {
      if (err) {
        console.log("Favourites table already created");
      } else {
        console.log("Favourites table created");
      }
    });

    // Create the 'cart' table
    db.run(`CREATE TABLE cart (
    cart_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    size DOUBLE,
    quantity INTEGER NOT NULL,
    price DOUBLE,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(product_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`, (err) => {
      if (err) {
        console.log("Cart table already created");
      } else {
        console.log("Cart table created");
      }
    });

    // Create the 'orders' table
    db.run(`CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    size DOUBLE,
    quantity INTEGER NOT NULL,
    price DOUBLE,
    delivery INTEGER NOT NULL,
    card_id INTEGER NOT NULL,
    address_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    grouping INTEGER NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(product_id),
    FOREIGN KEY(card_id) REFERENCES cards(card_id),
    FOREIGN KEY(address_id) REFERENCES addresses(address_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`, (err) => {
      if (err) {
        console.log("Orders table already created");
      } else {
        console.log("Orders table created");
      }
    });

    // Create the 'promos' table
    db.run(`CREATE TABLE promos (
    promo_id INTEGER PRIMARY KEY AUTOINCREMENT,
    promo_code TEXT NOT NULL,
    exclusivity_tags TEXT,
    throwaway TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.log("Promos table already created");
      } else {
        console.log("Promos table created");
      }
    });

    // Create the 'cards' table
    db.run(`CREATE TABLE cards (
    card_id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_no TEXT NOT NULL,
    last_four TEXT NOT NULL,
    expiry_date TEXT NOT NULL,
    cvv TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    addressline1 TEXT NOT NULL,
    addressline2 TEXT,
    towncity TEXT NOT NULL,
    postcode TEXT NOT NULL,
    phone_no TEXT NOT NULL,
    country TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT card_unique UNIQUE (card_no)
    )`, (err) => {
      if (err) {
        console.log("Cards table already created");
      } else {
        console.log("Cards table created");
      }
    });

    // Create the 'addresses' table
    db.run(`CREATE TABLE addresses (
    address_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    addressline1 TEXT NOT NULL,
    addressline2 TEXT,
    towncity TEXT NOT NULL,
    postcode TEXT NOT NULL,
    phone_no TEXT NOT NULL,
    country TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`, (err) => {
      if (err) {
        console.log("Addresses table already created");
      } else {
        console.log("Addresses table created");
      }
    });

    // Create the 'views' table
    db.run(`CREATE TABLE views (
    view_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    amount INTEGER,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(product_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`, (err) => {
      if (err) {
        console.log("Views table already created");
      } else {
        console.log("Views table created");
      }
    });

    // Create the 'searches' table
    db.run(`CREATE TABLE searches (
    search_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tags TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`, (err) => {
      if (err) {
        console.log("Searches table already created");
      } else {
        console.log("Searches table created");
      }
    });

    // Create the 'descriptions' table
    db.run(`CREATE TABLE descriptions (
    desc_id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(product_id)
    )`, (err) => {
      if (err) {
        console.log("Descriptions table already created");
      } else {
        console.log("Descriptions table created");
      }
    });
  }
});

// Export the database object
module.exports = db;
