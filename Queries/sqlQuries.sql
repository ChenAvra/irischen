DROP TABLE users;
DROP TABLE recipes;


--users table
CREATE TABLE [dbo].[Users]
(
    user_id [UNIQUEIDENTIFIER] PRIMARY KEY NOT NULL default NEWID(),
    username [NVARCHAR](50) NOT NULL UNIQUE, -- primary key column
    firstname [NVARCHAR](50) NOT NULL,
    lastname [NVARCHAR](50) NOT NULL,
    country [NVARCHAR](50) NOT NULL,
    userPassword [NVARCHAR](3000) NOT NULL,
    email [NVARCHAR](50) NOT NULL,
    photoUser [NVARCHAR](50) NOT NULL,
);


CREATE TABLE [dbo].[UsersAndRecieps]
(
    username [NVARCHAR](50) NOT NULL, -- primary key column
    recipeId [NVARCHAR](50) NOT NULL,
    watched [int] NOT NULL  ,
    saveFavorites [int] NOT NULL,
    PRIMARY KEY (recipeId, username),

   
);
GO



CREATE TABLE [dbo].[UsersHistoryRecieps]
(
    username [NVARCHAR](50) NOT NULL, -- primary key column
    recipeId [NVARCHAR](50) NOT NULL,
    serialNumber int IDENTITY(1,1),  
    PRIMARY KEY (recipeId, username),

   
);
GO

-- -- Insert rows into table 'TableName'
-- DECLARE @HashThis nvarchar(max);  
-- SET @HashThis = lower(CONVERT(varchar(max), HASHBYTES('SHA2_256', 'test'), 2));
-- INSERT INTO Users
--  -- columns to insert data into
--  ([userName],[firstname],[lastname], [password],[email],[photoUrl],[country])
-- VALUES -- first row: values for the columns in the list above
--     (N'test', N'TestF',N'TestL',@HashThis, N'test@test.com',N'testPhotoUrl',N'testCountry')
-- -- add more rows here
-- GO




INSERT INTO UsersAndRecieps(username, recipeId, watched, saveFavorites)
VALUES ('iris', '1', 1, 0);
GO


INSERT INTO UsersAndRecieps(username, recipeId, watched, saveFavorites)
VALUES ('en', '638038', 1, 1);
GO

INSERT INTO personalRecipes (recipeId, username, recipeTitle, recipeImage, recipeTime, recipeVegan, recipeVegiterian, recipeGlutenFree, recipeInstructions, recipeNumOfMeals)
VALUES ('123', 'en', 'a', 'b','b1',7,6,7,'f',5)
GO

INSERT INTO personalRecipes (recipeId, username, recipeTitle, recipeImage, recipeTime,recipeVegan, recipeVegiterian, recipeGlutenFree, recipeInstructions, recipeNumOfMeals)
VALUES ('124', 'en', 'a', 'b','b1',7,6,7,'f',5)
GO

INSERT INTO personalRecipesIngredients (recipeId, username,recipeIngrediant)
VALUES ('123', 'en','batata')
GO

INSERT INTO personalRecipesIngredients (recipeId, username,recipeIngrediant)
VALUES ('123', 'en','potato')
GO

INSERT INTO UsersHistoryRecieps(recipeId,username)
VALUES('638038','en')
GO
INSERT INTO UsersHistoryRecieps(recipeId,username)
VALUES('716272','en')
GO
INSERT INTO UsersHistoryRecieps(recipeId,username)
VALUES('661557','en')
GO


DELETE FROM dbo.UsersHistoryRecieps;

DELETE FROM Users WHERE username='iris';


SELECT * FROM dbo.familylRecipes WHERE username='chen';
SELECT * FROM dbo.familyRecipesIngredients WHERE  recipeId='4'

INSERT INTO Users (username, firstname, lastname, country, userPassword, email, photoUser)
VALUES ('iris', 'chen', 'avra', 'israel', '4006', 'ch@12.com','cscs@.com');
GO


INSERT INTO personalRecipes (recipeId, username, recipeTitle, recipeImage, recipeTime, recipeVegan, recipeVegiterian, recipeGlutenFree, recipeInstructions, recipeNumOfMeals)
VALUES ('1', 'iris', 'Chocolate Cake', 'https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449979/chocolate_cake_euizqq.jpg','2 hrs',0,1,0,'Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x13 inch pan. In a small bowl, dissolve the cocoa in the hot coffee; set aside. Sift together the flour, baking soda, baking powder and salt. Set aside. In a large bowl, combine the sugar, oil, eggs and vanilla. Beat in the flour mixture alternately with the cocoa mixture. Pour batter into prepared pan. Bake in the preheated oven for 40 to 50 minutes, or until a toothpick inserted into the center of the cake comes out clean. Allow to cool.',24)
GO

INSERT INTO personalRecipes (recipeId, username, recipeTitle, recipeImage, recipeTime, recipeVegan, recipeVegiterian, recipeGlutenFree, recipeInstructions, recipeNumOfMeals)
VALUES ('2', 'iris', 'Blueberry Muffin Cake', 'https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449979/blueBerry_cake_fw1ftn.jpg','45 mins',0,1,0,'Preheat the oven to 400 degrees F (200 degrees C). Spray an 8x8-inch baking pan with cooking spray. Toss blueberries and 1/2 cup of flour in a small bowl until blueberries are coated. Set aside. Beat together sugar and oil with an electric mixer in a large bowl. Add milk, egg, and vanilla extract. Mix remaining 1 cup flour, baking powder, and salt in a small bowl. Add flour mixture to sugar mixture; mix until just combined. fold in blueberry mixture. Pour batter into the prepared baking pan. Beat together sugar and oil with an electric mixer in a large bowl. Add milk, egg, and vanilla extract. Mix remaining 1 cup flour, baking powder, and salt in a small bowl. Add flour mixture to sugar mixture; mix until just combined. fold in blueberry mixture. Pour batter into the prepared baking pan. Mix together brown sugar, 1/3 cup flour, and cinnamon in a bowl. Cut in butter until topping mixture is crumbly. Sprinkle on top of the cake batter. Bake in the preheated oven until a toothpick inserted in the center comes out clean, about 30 minutes. Remove from oven and allow to cool before serving.',9)
GO

INSERT INTO personalRecipes (recipeId, username, recipeTitle, recipeImage, recipeTime, recipeVegan, recipeVegiterian, recipeGlutenFree, recipeInstructions, recipeNumOfMeals)
VALUES ('3', 'iris', 'Instant Pot-Roasted Brussels Sprouts', 'https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449980/Roasted_Brussels_Sprouts_jmqtld.jpg','26 mins',1,1,1,'Turn on a multi-functional pressure cooker (such as Instant Pot®) and select Saute function. Heat olive oil and cook onion until translucent, about 2 minutes. Add Brussels sprouts and cook for 1 minute more. Sprinkle with salt and pepper; pour vegetable broth over Brussels sprouts. Close and lock the lid. Select high pressure according to manufacturers instructions; set timer for 3 minutes. Allow 10 to 15 minutes for pressure to build. Release pressure carefully using the quick-release method according to manufacturers instructions, about 5 minutes. Unlock and remove lid.',4)
GO

INSERT INTO personalRecipes (recipeId, username, recipeTitle, recipeImage, recipeTime, recipeVegan, recipeVegiterian, recipeGlutenFree, recipeInstructions, recipeNumOfMeals)
VALUES ('4', 'chen','Soft Hard-Boiled Eggs','https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449980/Soft_Hard-Boiled_Eggs_rz2mec.jpg','12 mins',0,1,1,'Place water into a 3-quart saucepan with a lid. Place over high heat and bring to a low boil. Carefully place the eggs in the water. Cover pan immediately, reduce heat to medium-high, and cook for 9 1/2 minutes. Remove pan from heat and cool eggs down with cold running water, tipping out the water, and continuing to run cold water over the eggs until they are cool.' ,6)
GO

INSERT INTO personalRecipes (recipeId, username, recipeTitle, recipeImage, recipeTime, recipeVegan, recipeVegiterian, recipeGlutenFree, recipeInstructions, recipeNumOfMeals)
VALUES ('5', 'chen','Moms Country Gravy','https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449980/Mom_s_Country_Gravy_sjvq7j.jpg','20 mins',0,1,0,'Heat the oil in a large skillet over medium heat. Whisk in the flour, salt and pepper until smooth. Cook and stir over medium heat until browned, about 10 minutes. Gradually stir in milk so that no lumps form, and continue cooking and stirring until thickened. If the gravy becomes too thick, you may thin it with a little more milk.',6)
GO

INSERT INTO dbo.familylRecipes (username, recipeId, ownerRecipe, recipeTitle,periodRecipe,instructions, recipeImage)
VALUES ('iris','1', 'GrandMother','Classic Borscht Recipe (Beet Soup)','Winter','Peel, grate and/or slice all vegetables, keeping sliced potatoes in cold water until ready to use. Heat a large soup pot (5 1/2 Qt or larger) over medium/high heat and add 2 Tbsp olive oil. Add grated beets and sauté 10 minutes, stirring occasionally until beets are softened. Add 4 cups broth and 6 cups water. Add sliced potatoes and sliced carrots then cook for 10-15 minutes or until easily pierced with a fork. While potatoes are cooking, place a large skillet over medium/high heat and add 2 Tbsp oil. Add chopped onion, celery and bell pepper. Saute stirring occasionally until softened and lightly golden (7-8 minutes). Add 4 Tbsp Ketchup and stir fry 30 seconds then transfer to the soup pot to continue cooking with the potatoes. When potatoes and carrots reach desired softness, add 1 can of beans with their juice, 2 bay leaves, 2-3 Tbsp white vinegar, 1 tsp salt, 1/4 tsp black pepper, 1 pressed garlic clove, and 3 Tbsp chopped dill. Simmer for an additional 2-3 minutes and add more salt and vinegar to taste.','https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449979/borsht_yhgj4h.jpg')
GO

INSERT INTO dbo.familylRecipes (username,recipeId, ownerRecipe, recipeTitle,periodRecipe,instructions, recipeImage)
VALUES ('iris','2', 'Mother','Blinis','Holiday','Whisk milk, 1 cup plus 3 tablespoons flour, eggs, and sugar together in a bowl. Add 1/4 cup melted butter; whisk well. Let batter sit, 15 to 20 minutes. Bring a pot of water to a boil. Add beef; cook until no longer pink, 5 to 7 minutes. Drain. Chop the boiled beef finely until even in texture. Heat 2 tablespoons butter in a skillet over medium-low heat. Add onion and cook, while stirring, until soft and golden, about 10 minutes. Increase heat to medium and add the chopped beef, salt, and pepper. Cook and stir filling until flavors combine, about 10 minutes. Heat oil in a nonstick or cast-iron skillet over medium heat. Pour 3 to 4 tablespoons of batter into the skillet and quickly rotate the skillet to spread batter out in a thin layer. Cook until edges are brown, 1 to 2 minutes. Run a spatula around the edge of the skillet to loosen blini; flip and cook until the other side has turned light brown, about 1 minute more. Repeat with remaining batter. Spread 2 tablespoons beef filling on 1 side of each blini. Fold edges over filling and roll blini up. Repeat with remaining filling and blini.','https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449979/bilinis_lnn73y.jpg')
GO

INSERT INTO dbo.familylRecipes (username,recipeId, ownerRecipe, recipeTitle,periodRecipe,instructions, recipeImage)
VALUES ('iris','3', 'GrandMother','Russian Beet and Potato Salad','Novigod','Bring a large pot of water to a boil, and cook beets until tender, about 30 minutes. Bring a separate pot of water to a boil and cook potatoes and carrots until tender, about 20 minutes. Drain vegetables, cool, and remove skins. Dice and place in a large bowl. Place the diced pickles in the bowl with beets, potatoes, and carrots. Drizzle the olive oil and vinegar over the mixture and toss to coat. Season with salt. Sprinkle with green onions. Chill completely before serving.Place the diced pickles in the bowl with beets, potatoes, and carrots. Drizzle the olive oil and vinegar over the mixture and toss to coat. Season with salt. Sprinkle with green onions. Chill completely before serving.','https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449979/beet_and_potato_zbfjfb.jpg')
GO

INSERT INTO dbo.familylRecipes (username,recipeId, ownerRecipe, recipeTitle,periodRecipe,instructions, recipeImage)
VALUES ('chen','4', 'GrandMother','Cuba beet','Holidays','Prepare the mantle: Soak the semolina in water with salt. Let the water soak for half an hour and then put in hands to make dough (note that it is impossible to accurately measure the amount of water needed, feel the dough. If you think it is dry add a little water).
Prepare the stuffing: Heat a frying pan with oil and steam in the shade for 3 minutes until it becomes transparent. Add the meat and chicken and fry for about 5 minutes, stirring until the meat crumbles and changes color. Add spices and parsley, taste, seasoning and transfer to a bowl for cooling. With wet hands, ping pong balls (40 grams each) are pinched from the dough. Flatten each ball into a kind of pita, place in the center a teaspoon of stuffing, bow the hand and close the ball. Prepare the soup: Onion in a large saucepan with oil for 3 minutes (no gilding needed). Add carrots and celery, beets, spices and mash and mix. Add water and bring to a boil. Cook for 15 minutes, taste and adjust seasoning as needed. Add the lemon.
Add the cube balls into the boiling broth, lower the flame and cook for an hour.','https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449981/kube_selek_gkbcg5.jpg')
GO

INSERT INTO dbo.familylRecipes (username,recipeId, ownerRecipe, recipeTitle,periodRecipe,instructions, recipeImage)
VALUES ('chen','5', 'GrandMother','Iraqi Tbith','Weekend',' Begin the initial cooking of the rice: Heat a little oil in the pot, add the rice and stir. Add the water, bring to a boil and add the rice. Cover the pot with a towel and over it close the lid. Reduce and cook for about 20 minutes.
 In a non-stick pan over medium flame, heat a little oil and pat the onion with a little salt until golden brown.
 Remove the onion to the plate, increase the flame and in the same pot fry the chicken chunks on both sides until golden.
You can fry with a half-open lid to avoid the boiling oil that splashes. Remove the chunks of chicken to the plate and with the aid of absorbent paper remove the skin from the chicken.
 Put into the half-cooked rice bowl, the fried onion, the chopped tomatoes, the smash, the garlic, the silan, the paprika, the black pepper and if you need salt to taste (and heartily whoever wants). Mix everything together. Pour half of the seasoned rice mixture into the same pot where the fried chicken and onion are poured. Place the fried chicken over the rice and pour over the remaining half of the rice mixture. Rectifiers and fasteners.
Add half a cup of water, cover with towel and close with lid. Place the pot on high heat and bring to a boil. Reduce the heat and cook to low heat for about 40 minutes.
You can continue in two ways: continue to cook on low heat for 5-4 hours or turn off the fire, let the pot cool, place in the refrigerator, and continue cooking the next day on hot plate or on low heat for about 5 hours. When the tab comes out of the fire, place a tray or serving plate larger in diameter than the pot diameter, grasp the tray with the pot handles and flip over. Remove the pot from the cake and serve.','https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449981/tbit_nxixgr.jpg')
GO

INSERT INTO dbo.familylRecipes (username,recipeId, ownerRecipe, recipeTitle,periodRecipe,instructions, recipeImage)
VALUES ('chen','6', 'GrandMother','Kahi ','Shavuot','Put flour into bowl and add salt. Make a hole in flour and pour a glass of lukewarm water. Mix the water and flour with your hands and slowly add half the extra glass of water if needed. The dough should be relatively flexible and not liquid. Put it on for another five minutes, cover with towel and leave for 1 hour at room temperature.
Remove the dough from the bowl and divide into 8 balls. Cover with towel and refrigerate for at least two hours (up to 4 hours).
Remove the dough circles from the refrigerator, floss a work surface and open a ball for a thin, large circle.
On 2/3 of the circle, spread soft butter and fold over the smeared side and close with the "dry" dough.
A rectangle spring is formed and 2/3 of it is spread soft butter and closed first with the smeared side and then with the dry side. A kind of envelope is created. Place on a mold, cover with towel and meanwhile prepare all the balls.
Transfer the envelopes to the refrigerator for half an hour.
Remove the envelopes one by one from the refrigerator and open each one to a square of 15 cm by 15 cm.
Meanwhile, heat a pan with butter (preferably refined butter). Fry the kahi on both sides until dark.
Serve with caymer and silane or honey.','https://res.cloudinary.com/dw5rvx9m6/image/upload/v1591449980/khai_nk6wlt.jpg')
GO






INSERT INTO personalRecipesIngredients (recipeId,username,recipeIngrediant)
VALUES ('1','iris','1 cup unsweetened cocoa powder')
GO


INSERT INTO personalRecipesIngredients (recipeId,username,recipeIngrediant)
VALUES ('6','chen','1 (12 ounce) package fresh cranberries')
GO

DELETE FROM personalRecipesIngredients WHERE recipeIngrediant='1/2 cup vegetable oil' and recipeId='4';


INSERT INTO familyRecipesIngredients (recipeId,ownerRecipe,recipeIngrediant)
VALUES ('6','GrandMother ','200 grams of softened butter')
GO



CREATE TABLE [dbo].[personalRecipes](
	recipeId [NVARCHAR] (50) NOT NULL,
	username [NVARCHAR](50) NOT NULL,
	recipeTitle [NVARCHAR](300) NOT NULL,
    recipeImage [NVARCHAR](300) NOT NULL,
    recipeTime [NVARCHAR](300) NOT NULL,
    recipeVegan [int] DEFAULT 0,
    recipeVegiterian [int] DEFAULT 0,
    recipeGlutenFree [int] DEFAULT 0,
    recipeInstructions [text] NOT NULL,
    recipeNumOfMeals [int] NOT NULL,
	PRIMARY KEY (recipeId, username),

);
GO

CREATE TABLE [dbo].[familylRecipes](
    username  [NVARCHAR] (300) NOT NULL,
	recipeId [NVARCHAR] (300) NOT NULL,
	ownerRecipe [NVARCHAR](300) NOT NULL,
	recipeTitle [NVARCHAR](300) NOT NULL,
    periodRecipe [NVARCHAR](300) NOT NULL,
    instructions [text] NOT NULL,
    recipeImage  [NVARCHAR](300) NOT NULL, 
	PRIMARY KEY (recipeId, ownerRecipe,username),

);
GO


CREATE TABLE [dbo].[personalRecipesIngredients](
	recipeId [NVARCHAR](300) NOT NULL,
	username [NVARCHAR](300) NOT NULL,
	recipeIngrediant [NVARCHAR](300) NOT NULL,
	PRIMARY KEY (recipeId, username,recipeIngrediant),

);
GO


CREATE TABLE [dbo].[familyRecipesIngredients](
	recipeId [NVARCHAR] (300) NOT NULL,
	ownerRecipe [NVARCHAR](300) NOT NULL,
	recipeIngrediant [NVARCHAR](300) NOT NULL,
	PRIMARY KEY (recipeId, ownerRecipe,recipeIngrediant),

);
GO

