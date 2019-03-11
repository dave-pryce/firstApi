var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/// Ingredients Object
var ingredients = [
    
    {
        "id" : "1234",
        "text" : "eggs"
    },
    {
        "id" : "1235",
        "text" : "milk"
    },
    {
        "id" : "1236",
        "text" : "butter"
    },
    {
        "id" : "1237",
        "text" : "bacon"
    }
        
];


// function to get a single ingredient
var getIngredient = function (ingredientId) {
   return ingredients.findIndex(i => i.id === ingredientId)
}



// Get all ingredients
app.get('/ingredients', function (request,response) {
     response.send(ingredients);   
});


// Get single ingrediant - using getIngredient function
app.get('/ingredients/:ingredientId', function (request, response) { 
    var x = getIngredient(request.params.ingredientId);
    response.send(ingredients[x]);
});


app.post('/ingredients', function (request, response) {
   var ingredient = request.body; 
    //console.log(request.body);
    if (!ingredient || ingredient.text === "") {
        response.status(500).send({error: "Your ingredient must have text"});
    } else {
        ingredients.push(ingredient);
        response.status(200).send(ingredients);
    }
});


app.put('/ingredients/:ingredientId', function (request, response) {   
 if (request.body.text === "") {
        response.status(500).send({error: "Your ingredient must have text"});
    } else {     
   var newText = request.body.text;
   var x = getIngredient(request.params.ingredientId);
   ingredients[x].text = newText; 
   response.status(200).send(ingredients);
}
});



app.listen(3000, function(){
    console.log("First API running on Port 3000!");
});