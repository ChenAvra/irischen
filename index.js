const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("client-sessions");
const cors = require("cors");

// app.use(cors());




//#region global imports
const axios = require("axios");
const CryptoJS = require("crypto-js");
require("dotenv").config();

//#endregion
//#region express configures

const asyncHandler = require("express-async-handler");
// require("express-async-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
const cookies_options = {
  maxAge: 1000 * 60 * 15, // would expire after 15 minutes
  httpOnly: true, // The cookie only accessible by the web server
  signed: true // Indicates if the cookie should be signed

};
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(cookieParser(process.env.COOKIE_SECRET, cookies_options)); //Parse the cookies into the req.cookies
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files

const corsConfig = {
  origin: true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

const users = require("./routes/users");
const recipes = require("./routes/recipes");
const auth = require("./routes/auth");
// const users_util = require("./utils/users_util");


const port = process.env.PORT || "3000";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan(":method :url :status :response-time ms"));
app.use(
  session({
    cookieName: "session",
    secret: "irischen",
    duration: 1000 * 60 * 2,
    activeDuration: 0,
    id: null,
    cookie: {
      httpOnly: false
    }
  })
);

app.use(auth);
app.use("/users", users);
app.use("/recipes", recipes);


app.get("/alive", (req, res) => {
  return res.send("I'm alive");
});

// app.use((req,res) => res.sendStatus(404));

app.listen(port, () => {
  console.log('Example app listening on port 3000');
});

app.use(function (err, req, res, next) {
  return res.status(err.status || 500).send({ message: err.message || "bad", success: false });
});
