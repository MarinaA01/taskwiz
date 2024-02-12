const express = require("express");

// load environment variables in development mode
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const usePassport = require("./config/passport");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const flash = require("connect-flash");
const path = require("path");

// set up Handlebars as the template engine
app.engine(
  "handlebars",
  exphbs({ defaultLayout: "main", extname: ".handlebars" })
);
app.set("view engine", "handlebars");

// configure session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// parse incoming request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// enable method override for PUT & DELETE requests
app.use(methodOverride("_method"));

// initialize Passport for authentication
usePassport(app);

// flash messages middleware
app.use(flash());

// set local variables for views
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// include routes
app.use(routes);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});