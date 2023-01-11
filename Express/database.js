const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database-name'
});

function createTables() {
  const usersTable = `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  );`;

  const tweetsTable = `CREATE TABLE tweets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`;

  const messagesTable = `CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    sender_id INT,
    receiver_id INT,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
  );`;

  connection.query(usersTable, function(err, result) {
    if (err) throw err;
    console.log("Users table created");
  });

  connection.query(tweetsTable, function(err, result) {
    if (err) throw err;
    console.log("Tweets table created");
  });

  connection.query(messagesTable, function(err, result) {
    if (err) throw err;
    console.log("Messages table created");
  });
}
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
  createTables();
});

module.exports = connection;
