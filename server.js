require('dotenv').config();
const express = require("express");
const handlebars = require("express-handlebars");
const data = require("./data-service.js");

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

app.get('/dashboard', function (req, res) {
    res.render('dashboard',{
        title: "Dashboard",
        pageheading: "Dashboard",
    });
});

app.listen(PORT,()=>console.log("Web server has started"));

data.initialize().then(()=>{
    console.log("initializing");
    //app.listen(HTTP_PORT,onHttpStart);
}).catch(err=>{
   console.log(err);
});