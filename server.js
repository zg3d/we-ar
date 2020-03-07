require('dotenv').config();
const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.static('public'));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.get('/login', function (req, res) {
    res.render('login',{
        title: "Login",
        pageheading: "Login",
      
        
    });
});

app.get('/signup', function (req, res) {
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