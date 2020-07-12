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
const search_util = require("./utils/search_recipes");
// const users_util = require("./utils/users_util");
// const axios = require("axios");
const api_url = "https://api.spoonacular.com/recipes";
const api_key = "apiKey=287bb3133c2e425b894d283a5c886608";

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json

// process.on('unhandledRejection', function(err) {
//     console.log(err);
// });
router.get("/search/query/:searchQuery/amount/:num", (req, res) => {//iris
    const{ searchQuery, num } = req.params;
    search_params = {};
    search_params.query = searchQuery;
    search_params.number = num;
    search_params.instructionsRequired = true;
    search_util.extractQureryParams(req.query,search_params);
    search_util
    .searchForRecipes(search_params,num)
    .then((info_array) => res.status(200).send(info_array))
    .catch((error) => {
        res.sendStatus(500);
    });
});

router.get('/check', (req, res) => {//iris
    res.send("everything is ok");
});

router.get("/threeRandomRecipies", async (req, res) => {//iris
    search_params = {};
    search_params.number = 3;
    try{
        let randomArray=[];
        for(let i=0; i<3; i++){
            let search_response = await axios.get(
                        `${api_url}/random?${api_key}&number=1`
                   
                    );
                    while(!search_response.data.recipes[0].instructions){
                        search_response = await axios.get(
                            `${api_url}/random?${api_key}&number=1`
                       
                        );
                    }
                    randomArray.push(search_response.data.recipes[0])


        }
    // while(info_array==false){
    //     let search_response = await axios.get(
    //         `${api_url}/random?${api_key}`,
    //         {
    //             params: search_params,
    //         }
    //     );
        let result=randomArray.map((recipe)=>{const {
            id,
            title,
            readyInMinutes,
            aggregateLikes,
            vegetarian,
            vegan,
            glutenFree,
            image,
        } = recipe;
        return {
            id: id,
            title: title,
            readyInMinutes: readyInMinutes,
            aggregateLikes: aggregateLikes,
            vegetarian: vegetarian,
            vegan: vegan,
            glutenFree: glutenFree,
            image: image,
        };})
    // let info_array= await search_util.searchForRandomRecipes(search_params)
  
        res.send(result);
    }
    
    catch(error){
         res.sendStatus(500);        

    }
    
});

router.get("/getFullRecipe/:recipeID", async(req, res) => {//iris
    const{ recipeID } = req.params;
    search_params = {};
    search_params.id = recipeID;

    //
    recipes_id_list = [];
    recipes_id_list.push(search_params.id);
    //
    //insert watched to DB 

    search_util
    //.searchForRecipesByID(search_params)
    .getRecipesInfo_fullRecipe(recipes_id_list)
    .then((info_array) => res.status(200).send(info_array))
    .catch((error) => {
        res.sendStatus(500);
    });
});

router.get("/getRecipePreview/:recipeID", (req, res) => {//iris
    const{ recipeID } = req.params;
    search_params = {};
    search_params.id = recipeID;

    //
    recipes_id_list = [];
    recipes_id_list.push(search_params.id);
    //

    search_util
    //.searchForRecipesByID(search_params)
    .getRecipesInfo(recipes_id_list,1)
    .then((info_array) => res.status(200).send(info_array))
    .catch((error) => {
        res.sendStatus(500);
    });
});




module.exports = router;