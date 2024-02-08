 // dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
// const logger = require('morgan');
const exphbs = require('express-handlebars');
// setting up Sequelize and MySQL database
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});
// testing the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('unable to connect to the database:', error);
  });
// setting up morgan middleware
// app.use(logger('dev'));
// setting up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// setting up handlebars middleware
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// setting up static path for serving static files
app.use(express.static(path.join(__dirname, 'public')));
// bringing in the routes
const index = require('./routes/index');
const api = require('./routes/api');
app.use('/', index);
app.use('/api', api);
// server starts listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log('server listening on port', PORT);
});