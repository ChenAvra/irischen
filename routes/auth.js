var express = require("express");
var router = express.Router();
//#region global imports
require("dotenv").config();
const axios = require("axios");
//#region express configures
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bcrypt = require("bcrypt");
var DButils = require("./utils/DButils")
const auth_util = require("./utils/auth_util");
// const users_util = require("./utils/users_util");




var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json
var saltRounds = 10;


router.post('/register', async (req, res, next) => {//chen
    try {
        const users = await auth_util.getUsersFromDb();
        const userExist=await auth_util.userExist(users,req);
        const validPassword= auth_util.passwordConfirmation(req);
        if(validPassword!=null){
            const add= await auth_util.insertNewUserToDB(req,validPassword);
            res.status(201).send({ message: "user created", success: true });        }
        else{
            res.status(400).send({ message: "Confirmation Password does not match the Password" });

        }

     

    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {//chen
    try {
   
        userLogin=req.body;

        const users = await  auth_util.getUsersFromDb();
        const user = await  auth_util.getUserLogin(users,userLogin);
        // Set cookie
        req.session.id = user.user_id;
        res.status(200).send({ message: "successfuly logged in", success: true });

    
    } catch (error) {
        next(error);
    }
});

router.post('/logout', async (req, res, next) => {// chen
    req.session.reset();
    res.redirect("/");
});

module.exports = router;

