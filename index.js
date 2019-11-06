const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const regNumber = require("./regLogic");
const flash = require('express-flash');
const session = require('express-session');
const RegApp= express();




// const regNumbers = regNumber();
const handlebarsSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: "./views",
    layoutsDir: "./views/layouts"
});
RegApp.engine('handlebars', handlebarsSetup);
RegApp.set("view engine", "Handlebars")
RegApp.use(bodyParser.urlencoded({
    extended: false
}));

RegApp.use(bodyParser.json())

RegApp.use(express.static("public"))

RegApp.set('view engine', 'handlebars');


RegApp.get("/reg_numbers", function (req, res) {
    
})



let PORT = process.env.PORT || 3000;


RegApp.listen(PORT, function () {
    console.log("Greetingapp", PORT)
});