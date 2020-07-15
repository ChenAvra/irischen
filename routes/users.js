var express = require("express");
var router = express.Router();
//#region global imports
require("dotenv").config();
const axios = require("axios");
//#region express configures
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var DButils = require("./utils/DButils")
const users_util = require("./utils/users_util");
const search_util = require("./utils/search_recipes");
let recordSerialNumber = 0;
var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json

router.use(async (req, res, next) => {
    try {
        if (req.session && req.session.id) {
            // console.log(req);
            const id = req.session.id;

            const user = await users_util.checkIfUserInDB(id);
            if (user) {
                req.user = user;
                next();
            } else { return res.sendStatus(401).send("im here") };
        }
        else { return res.sendStatus(401).send("im here") };
    }
    catch (e) { console.log(e) }
});


router.get('/myFavorites', async (req, res, next) => {//chen
    try {
        var myFavorites = await users_util.getMyFavoriteRecipes(req.user[0].username);
        var myFavoritesToReturn = users_util.createArrayOfFavoriteRecipes(myFavorites);
        var toSend = await search_util.getRecipesInfo(myFavoritesToReturn, myFavoritesToReturn.length);
        return res.status(200).send(toSend);
    }
    catch (error) {
        next(error);
    }



});

router.get("/recipeInfo/:ids", async (req, res, next) => {//chen
    try {
        console.log(req.params)
        const ids = JSON.parse(req.params.ids);
        const user_name = req.user[0].username;
        const userRecipesData = await users_util.getUserInfoOnRecipes(user_name, ids);//returns if the user watch or save on the recipe id
        return res.status(200).send(userRecipesData);
    } catch (error) {
        next(error);
    }

});



//


router.get('/threeLastRecipes', async (req, res, next) => {//chen
    try {
        var arrayLastThreeRecipes = await users_util.getLastThreeRecipes(req.user[0].username);
        var toSend = await search_util.getRecipesInfo(arrayLastThreeRecipes, arrayLastThreeRecipes.length);
        return res.status(200).send(toSend);
    } catch (error) {
        next(error);
    }

    //check
});





router.get('/myFamilyRecepies/getPreview', async (req, res, next) => {//chen
    try {
        var myFamilyRecipes = await users_util.getMyFamilyRecipesPreview(req.user[0].username);
        return res.status(200).send(myFamilyRecipes);
    } catch (error) {
        next(error);
    }


});

router.get('/myFamilyRecepies/getFullRecipe/:recipeID', async (req, res, next) => {//chen
    try {


        const { recipeID } = req.params;
        var myFamilyRecipes = await users_util.getMyFamilyRecipes(req.user[0].username, recipeID);
        return res.status(200).send(myFamilyRecipes);
    } catch (error) {
        next(error);
    }


});



router.get('/myRecepies/getPreview', async (req, res, next) => {//chen
    try {
        var myRecipes = await users_util.getMyRecipes_preview(req.user[0].username);
        return res.status(200).send(myRecipes);
    } catch (error) {
        next(error);
    }

});

router.get('/myRecepies/getFullRecipe/:recipeID', async (req, res, next) => {//chen
    try {
        const{ recipeID } = req.params;
        var myRecipes = await users_util.getMyRecipes_full(req.user[0].username,recipeID);
        return res.status(200).send(myRecipes);
    } catch (error) {
        next(error);
    }

});

router.post('/addNewRecipeToFavorites', async (req, res, next) => {//chen
    try {
        let answer = await users_util.checkIfUserInUsersAndRecipesTable(req.user[0].username);

        // let users2 = await DButils.execQuery(`INSERT INTO dboUsersHistoryRecieps (username, recipeId) VALUES ('${req.user[0].username}','${req.body.id}')`);
        if (answer) {
            isRecipeExist = await users_util.checkIfRecipeInUsersAndRecipesTable(req.user[0].username, req.body.id);

            if (isRecipeExist.length != 0) {
                let users = await DButils.execQuery(`UPDATE dbo.UsersAndRecieps SET saveFavorites=1 WHERE username='${req.user[0].username}' and recipeId='${req.body.id}'`);
                return res.status(200).send("successfuly saved in favorites");
            }
            else {

                let inserted = await DButils.execQuery(`INSERT INTO dbo.UsersAndRecieps (username, recipeId, watched, saveFavorites) VALUES ('${req.user[0].username}','${req.body.id}','0','1')`);
                return res.status(200).send("successfuly saved in favorites");

            }

        }
        else {
            // recordSerialNumber=recordSerialNumber+1;
            let users = await DButils.execQuery(`INSERT INTO dbo.UsersAndRecieps (username, recipeId, watched, saveFavorites) VALUES ('${req.user[0].username}','${req.body.id}','0','1')`);
            return res.status(200).send("successfuly saved in favorites")
        }

    } catch (error) {
        next(error);
    }


});





router.post('/addReciepeToHistory', async (req, res, next) => {//chen
    try {
        console.log("im in history");

        let insert = await users_util.checkIfUserInUsersHistoryRecipesTable(req.user[0].username, req.body.id)
        return res.status(200).send("updated succesfully");
    } catch (error) {
        next(error);
    }

});

router.post('/addNewRecipeToWatched', async (req, res, next) => {//chen
    try {
        let answer = await users_util.checkIfUserInUsersAndRecipesTable(req.user[0].username)


        if (answer) {
            isRecipeExist = await users_util.checkIfRecipeInUsersAndRecipesTable(req.user[0].username, req.body.id);

            if (isRecipeExist.length != 0) {
                let users = await DButils.execQuery(`UPDATE dbo.UsersAndRecieps SET watched=1 WHERE username='${req.user[0].username}' and recipeId='${req.body.id}'`);
                return res.status(200).send("successfuly saved in watched");
            }
            else {
                let inserted = await DButils.execQuery(`INSERT INTO dbo.UsersAndRecieps (username, recipeId, watched, saveFavorites) VALUES ('${req.user[0].username}','${req.body.id}','1','0')`);
                return res.status(200).send("successfuly saved in watched");
            }
        }
        else {
            recordSerialNumber = recordSerialNumber + 1;
            let users = await DButils.execQuery(`INSERT INTO dbo.UsersAndRecieps (username, recipeId, watched, saveFavorites) VALUES ('${req.user[0].username}','${req.body.id}','1','0')`);
            return res.status(200).send("successfuly saved in watched")
        }
    } catch (error) {
        next(error);
    }


});

app.use(function (err, req, res, next) {
    return res.status(err.status || 500).send({ message: err.message || "bad", success: false });
});


module.exports = router;