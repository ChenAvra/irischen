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

var search_util = require("./search_recipes")
const bcrypt = require("bcrypt");


async function checkIfUserInDB(id) {
    try{
    const users = await DButils.execQuery("SELECT user_id FROM dbo.Users");
    var exist= users.find((x) => x.user_id === id)
    if(exist){
        var user= await DButils.execQuery(`SELECT * FROM dbo.Users WHERE user_id = '${id}'`) ;
        return user;
    }
    return null;
}catch(e){ console.log(e)}
}


async function getUserInfoOnRecipes(user_name, ids){// access DB `SELECT username FROM dbo.Users WHERE user_id = '${id}'`
    var data={};
    try{
    for(var i=0; i<ids.length; i++){
        var userData = await DButils.execQuery(`SELECT watched,saveFavorites FROM dbo.UsersAndRecieps WHERE username='${user_name}' and recipeId='${ids[i]}'`);
        if(userData.length==0){
            data[ids[i]]=[];
            data[ids[i]].push({watched: 0});
            data[ids[i]].push({saveFavorites: 0});

        }
        else{
                data[ids[i]]=[];
                data[ids[i]].push({watched: userData[0].watched});
                data[ids[i]].push({saveFavorites: userData[0].saveFavorites});
        }
      

  

    }
    return data;

    }catch(error){
            console.log(error)
    }


}

async function checkIfUserInUsersHistoryRecipesTable(userName,id) {
    const users = await DButils.execQuery("SELECT * FROM dbo.UsersHistoryRecieps");
    var isExist= users.filter((x) => x.username === userName)
    if(isExist){
        const recipes= await DButils.execQuery(`SELECT * FROM dbo.UsersHistoryRecieps WHERE username='${userName}'`);
        var isRecipeExist= recipes.filter((x) => x.recipeId == id)
        if(isRecipeExist){//delete
           const deleted= await DButils.execQuery(`DELETE FROM  dbo.UsersHistoryRecieps WHERE username='${userName}' and recipeId='${id}'`);
           let insert =await DButils.execQuery(`INSERT INTO dbo.UsersHistoryRecieps (username, recipeId) VALUES ('${userName}','${id}')`);
           


        }
        else{
            let insert =await DButils.execQuery(`INSERT INTO dbo.UsersHistoryRecieps (username, recipeId) VALUES ('${userName}','${id}')`);

        }

    }
    else{
        let insert =await DButils.execQuery(`INSERT INTO dbo.UsersHistoryRecieps (username, recipeId) VALUES ('${userName}','${id}')`);

    }
}

exports.checkIfUserInUsersHistoryRecipesTable=checkIfUserInUsersHistoryRecipesTable;


async function checkIfUserInUsersAndRecipesTable(userName) {
    const users = await DButils.execQuery("SELECT * FROM dbo.UsersAndRecieps");
    var toReturn= users.find((x) => x.username === userName)
    return toReturn;
}

async function checkIfRecipeInUsersAndRecipesTable(userName,recipeId) {
    const recipesId = await DButils.execQuery(`SELECT * FROM dbo.UsersAndRecieps WHERE username='${userName}'`);
    var toReturn= recipesId.filter((x) => x.recipeId == recipeId)
    return toReturn;
}
async function getLastThreeRecipes(username){
    try{
    var recipeToReturn=[];
    const LastThreeRecipes1= await DButils.execQuery(`SELECT recipeId, username FROM dbo.UsersHistoryRecieps ORDER BY serialNumber DESC`);
    const userLastRecipe=LastThreeRecipes1.filter((x) => x.username === username);
    for(var i=0; i<userLastRecipe.length && i<3; i++){
        recipeToReturn.push(userLastRecipe[i].recipeId);

    }

    return recipeToReturn;
    }catch(error){
        console.log(error)
    }


}
async function getMyFavoriteRecipes(username){
    const myFavorites= await DButils.execQuery(`SELECT recipeId FROM dbo.UsersAndRecieps WHERE username='${username}' and saveFavorites='1'`);
    return myFavorites;

}
function createArrayOfFavoriteRecipes(myFavorites){
    var array=[];
    for(var i=0; i<myFavorites.length; i++){
        array.push(myFavorites[i].recipeId);

    }
    return array;
}

exports.createArrayOfFavoriteRecipes=createArrayOfFavoriteRecipes;
exports.getMyFamilyRecipes=getMyFamilyRecipes;
exports.getMyFamilyRecipesPreview=getMyFamilyRecipesPreview;



async function getMyFamilyRecipesPreview(username){
    var MyFamilyRecipesPreview= await DButils.execQuery(`SELECT recipeId, ownerRecipe, recipeTitle,recipeImage FROM dbo.familylRecipes WHERE username='${username}'`);
    var familylRecipes= extractFamilyDataPreview(MyFamilyRecipesPreview,username);
    return familylRecipes;
}
async function getMyFamilyRecipes(username,id){
    var MyFamilyRecipes= await DButils.execQuery(`SELECT * FROM dbo.familylRecipes WHERE username='${username}' and recipeId='${id}'`);
    var familylRecipes=await extractFamilyData(MyFamilyRecipes,username);
    return familylRecipes;
}
async function getMyRecipes_preview(username){
    const myRecipes= await DButils.execQuery(`SELECT * FROM dbo.personalRecipes WHERE username='${username}'`);
    return extractData_preview(myRecipes);
}

 function extractFamilyDataPreview(recipes_Info,username){
    let recipeId;
    let ownerRecipe;
    let recipeTitle;
    let recipeImage;
    let arrayToReturn = [];
    for(var i=0;i<recipes_Info.length;i++){
            recipeId = recipes_Info[i].recipeId;
            ownerRecipe=recipes_Info[i].ownerRecipe;
            recipeTitle = recipes_Info[i].recipeTitle;
            recipeImage = recipes_Info[i].recipeImage;

            arrayToReturn.push({
                id: recipeId,
                ownerRecipe: ownerRecipe,
                title: recipeTitle,
                image: recipeImage,
            });
    }
    return arrayToReturn;
     
    
}


async function extractFamilyData(recipes_Info,username){
        let recipeId;
        let ownerRecipe
        let recipeTitle;
        let periodRecipe;
        let instructions;
        let recipeImage;
        let arrayToReturn = [];
        for(var i=0;i<recipes_Info.length;i++){
                recipeId = recipes_Info[i].recipeId;
                ownerRecipe=recipes_Info[i].ownerRecipe;
                recipeTitle = recipes_Info[i].recipeTitle;
                periodRecipe = recipes_Info[i].periodRecipe;
                recipeInstructions = recipes_Info[i].instructions;
                recipeImage = recipes_Info[i].recipeImage;
    
                arrayToReturn.push({
                    id: recipeId,
                    ownerRecipe: ownerRecipe,
                    title: recipeTitle,
                    periodRecipe: periodRecipe,
                    instructions: instructions, 
                    image: recipeImage,
                    Ingredients: await getOnlyIngrediantsFamily(username,recipeId),
                    instructions: recipeInstructions, 
                });
        }
        return arrayToReturn;
         
        
}

async function getOnlyIngrediantsFamily(username,recipeId){
    const myRecipesIngrediants= await DButils.execQuery(`SELECT * FROM dbo.familyRecipesIngredients WHERE recipeId='${recipeId}'`);
    let allIngerdiantsArray = [];
    for(var i=0; i<myRecipesIngrediants.length; i++){
        allIngerdiantsArray.push({
            name_and_amount: myRecipesIngrediants[i].recipeIngrediant
        });
    }
 
    return allIngerdiantsArray;
}


function extractData_preview(recipes_Info){
    return recipes_Info.map((recipe_info) => {
        const {
            recipeId,
            recipeTitle,
            recipeTime,
            recipeVegiterian,
            recipeVegan,
            recipeGlutenFree,
            recipeImage,
        } = recipe_info;
        return {
            id: recipeId,
            title: recipeTitle,
            readyInMinutes: recipeTime,
            vegetarian: recipeVegiterian,
            vegan: recipeVegan,
            glutenFree: recipeGlutenFree,
            image: recipeImage,
        };
    });
}


async function getMyRecipes_full(username, recipeID){
    const myRecipes= await DButils.execQuery(`SELECT * FROM dbo.personalRecipes WHERE username='${username}' AND id='${recipeID}'`);
    const jsonWithoutInstructions =extractData_full(myRecipes,username);
    return jsonWithoutInstructions;
}

async function extractData_full(recipes_Info, username){
    // let ingrediants = await getOnlyIngrediants(username);
    let recipeId;
    let recipeTitle;
    let recipeTime;
    let recipeVegiterian;
    let recipeVegan;
    let recipeGlutenFree;
    let recipeImage;
    let recipeInstructions;
    let recipeNumOfMeals;
    let arrayToReturn = [];
    for(var i=0;i<recipes_Info.length;i++){
            recipeId = recipes_Info[i].recipeId;
            recipeTitle = recipes_Info[i].recipeTitle;
            recipeTime = recipes_Info[i].recipeTime;
            recipeVegiterian = recipes_Info[i].recipeVegiterian;
            recipeVegan = recipes_Info[i].recipeVegan;
            recipeGlutenFree = recipes_Info[i].recipeGlutenFree;
            recipeImage = recipes_Info[i].recipeImage;
            recipeInstructions = recipes_Info[i].recipeInstructions;
            recipeNumOfMeals = recipes_Info[i].recipeNumOfMeals;

            arrayToReturn.push({
                id: recipeId,
                title: recipeTitle,
                readyInMinutes: recipeTime,
                vegetarian: recipeVegiterian,
                vegan: recipeVegan,
                glutenFree: recipeGlutenFree,
                image: recipeImage,
                Ingredients: await getOnlyIngrediants(username,recipeId),
                instructions: recipeInstructions, 
                servings: recipeNumOfMeals 
            });
    }
    return arrayToReturn;
     
    }

//     return recipes_Info.map((recipe_info) => {
//         const {
//             recipeId,
//             recipeTitle,
//             recipeTime,
//             recipeVegiterian,
//             recipeVegan,
//             recipeGlutenFree,
//             recipeImage,
//             recipeInstructions, 
//             recipeNumOfMeals
//         } = recipe_info;
//         let ingrediants = await getOnlyIngrediants(username);
//         return {
//             id: recipeId,
//             title: recipeTitle,
//             readyInMinutes: recipeTime,
//             vegetarian: recipeVegiterian,
//             vegan: recipeVegan,
//             glutenFree: recipeGlutenFree,
//             image: recipeImage,
//             Ingredients: ingrediants,
//             instructions: recipeInstructions, 
//             servings: recipeNumOfMeals 
//         };
//     });
// }

async function getOnlyIngrediants(username, recipeId){
    const myRecipesIngrediants= await DButils.execQuery(`SELECT * FROM dbo.personalRecipesIngredients WHERE username='${username}' AND recipeId='${recipeId}'`);
    let allIngerdiantsArray = [];
    for(var i=0; i<myRecipesIngrediants.length; i++){
        allIngerdiantsArray.push({
            name_and_amount: myRecipesIngrediants[i].recipeIngrediant
        });
    }
    return allIngerdiantsArray;
}



exports.checkIfRecipeInUsersAndRecipesTable=checkIfRecipeInUsersAndRecipesTable;

exports.getMyFavoriteRecipes=getMyFavoriteRecipes;
exports.getLastThreeRecipes=getLastThreeRecipes;
exports.getMyRecipes_preview=getMyRecipes_preview;
exports.getMyRecipes_full=getMyRecipes_full;
exports.getUserInfoOnRecipes=getUserInfoOnRecipes;

exports.checkIfUserInDB=checkIfUserInDB;
exports.checkIfUserInUsersAndRecipesTable=checkIfUserInUsersAndRecipesTable;