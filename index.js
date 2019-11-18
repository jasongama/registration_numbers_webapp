const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const regNumber = require("./regLogic");
const flash = require('express-flash');
const session = require('express-session');
const RegApp = express();

const pg = require('pg')

const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/greetings';
const pool = new Pool({
    connectionString
})

var regNumbers = regNumber(pool)
const add = require("./regroute");
const tag = add(regNumbers);
RegApp.use(session({
    secret: 'regNum',
    resave: false,
    saveUninitialized: true
}));
RegApp.use(flash());

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

RegApp.get("/", tag.index);

RegApp.post("/reg_numbers", async function (req, res) {

    if (req.body.town === "") {
        req.flash('error', 'Please enter a registration number')
       
    }
    if (req.body.greet === undefined) {
        req.flash('error', 'Please Select the locations')
       
    } 
    // if ( regNumbers.getDatabase() === 0){
    //     req.flash('error', 'The registration number already exist')
      
    // }
    
    
    await regNumbers.addRegNumbers(req.body.town)
    await regNumbers.filter(req.body.regNumber)
    // console.log(await regNumbers.finalList());
    
     res.redirect("/")
})
let PORT = process.env.PORT || 2000;


RegApp.listen(PORT, function () {
    console.log("registrationapp", PORT)
});