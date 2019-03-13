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
    
    
    if ( x >=0) { response.send(ingredients[x]);}
    else { response.status(500).send({error: "Not a valid ingredient"}); }
   
    });


// Create new ingredient
app.post('/ingredients', function (request, response) {
  var ingredient = request.body; 
     // Check for message body raise error   
    if ( !ingredient || ingredient.text === "" ) {
        response.status(500).send({error: "No body, you must send a new ingredient"})
    } else {
        ingredients.push(ingredient);
        response.status(200).send(ingredients);
    }
});


// update existing ingredieint
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

// Delete ingredient
app.delete('/ingredients/:ingredientId', function (request, response) {     
    var x = getIngredient(request.params.ingredientId);
    
    if (x >= 0) {
    //console.log(x);
    ingredients.splice(x, 1);
    response.status(200).send(ingredients);}
    else {
        response.status(500).send({error: "Not a valid ingredient"});
    }
})


app.listen(3000, function(){
    console.log("First API running on Port 3000!");
});