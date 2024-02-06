 const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'taskwiz', // Update the database name to 'taskwiz'
});

// Drop the database if it exists
connection.query('DROP DATABASE IF EXISTS `taskwiz`;', (error) => {
  if (error) throw error;
  console.log('Database dropped successfully');
});

// Create the database
connection.query('CREATE DATABASE `taskwiz`;', (error) => {
  if (error) throw error;
  console.log('Database created successfully');
});

// Close the connection
connection.end();
