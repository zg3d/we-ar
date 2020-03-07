require('dotenv').config();
const express = require("express");
const handlebars = require("express-handlebars");
<<<<<<< HEAD
const { check, validationResult } = require('express-validator');

=======
const data = require("./data-service.js");
>>>>>>> c4f8958019f399ab5a9e1f8489d645288a88ebd2

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.static('assets'));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.get('/login', function (req, res) {
    res.render('login',{
        title: "Login",
        pageheading: "Login",
    });
});

app.get('/signup',function (req, res) {
    res.render('signup',{
        title: "Registration",
        pageheading: "Registration",
    });
});

app.get('/', function (req, res) {
    res.render('home',{
        title: "Home",
        pageheading: "Homepage",
    });
});



app.listen(PORT,()=>console.log("Web server has started"));

data.initialize().then(()=>{
    console.log("initializing");
    //app.listen(HTTP_PORT,onHttpStart);
}).catch(err=>{
   console.log(err);
});