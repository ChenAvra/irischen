
var saltRounds = 10;
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("client-sessions");

//#region global imports
const axios = require("axios");
const CryptoJS = require("crypto-js");
require("dotenv").config();

var DButils = require("./DButils")
const bcrypt = require("bcrypt");


async function getUsersFromDb(){
    let users = await DButils.execQuery("SELECT username, userPassword FROM dbo.Users");
    return users;

  
}

async function userExist(users,req){
    if (users.find((x) => x.username === req.body.userName)) {
        throw { status: 409, message: "Username taken" };
    }
    return;
   

}


function passwordConfirmation(req){
    if (req.body.password === req.body.confirmationPassword) {
        let hash_password = bcrypt.hashSync(
            req.body.password,
            saltRounds
        );
        return hash_password;
    }
    else{
        return null;
    }


}

async function insertNewUserToDB(req,hash_password){
    await DButils.execQuery(`INSERT INTO dbo.Users (username, firstname, lastname, country, userPassword, email, photoUser) VALUES ('${req.body.userName}', '${req.body.firstname}','${req.body.lastname}','${req.body.country}', '${hash_password}', '${req.body.email}','${req.body.linkimage}')`);

}







async function getUserLogin(users,userLogin){

    if (!users.find((x) => x.username === userLogin.userName))
    throw { status: 401, message: "Username or Password incorrect" };

    const user = (
        await DButils.execQuery(
          `SELECT * FROM dbo.Users WHERE username = '${userLogin.userName}'`
        )
      )[0];




    if (!bcrypt.compareSync(userLogin.password, user.userPassword)) {
        throw { status: 401, message: "Username or Password incorrect" };
    }

    return user;

  
}






exports.getUserLogin = getUserLogin;

exports.getUsersFromDb = getUsersFromDb;

exports.userExist=userExist;
exports.insertNewUserToDB=insertNewUserToDB;

exports.passwordConfirmation=passwordConfirmation;

