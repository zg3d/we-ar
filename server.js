require('dotenv').config();
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require('mongoose')
const data = require("./data-service.js");



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('assets'));

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

const signupRouter = require("./routers/signup");
console.log(signupRouter)
app.use('/signup', signupRouter);


app.get('/login', function (req, res) {
    res.render('login', {
        title: "Login",
        pageheading: "Login",
    });
});



app.get('/', function (req, res) {
    res.render('home', {
        title: "Home",
        pageheading: "Homepage",
    });
});


var user={
    "gender": "male",
    "bodytype":"small",
    "style": "casual",
    "colorful": true,
    "hat": false,
    "weather": "summer"
}

app.get("/findStyle",(req,res)=>{
    data.findstyle().then((data)=>{

    })
})

app.get("/images",(req,res)=>{
    data.getMatchStyle(user).then((data)=>{
        res.render('michael',{
            title: "Michael",
            images:data,
        });
    }).catch((err)=>{
        res.render('michael',{message:"No Result"});
        console.log(err);
    })
})
app.get('/dashboard', function (req, res) {
    res.render('dashboard', {
        title: "Dashboard",
        pageheading: "Dashboard",
    });
});

mongoose.connect(process.env.URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, () => { console.log("DB Connect") });



app.listen(PORT, () => console.log("Web server has started"));

data.initialize().then(() => {
    console.log("initializing");
    //app.listen(HTTP_PORT,onHttpStart);
}).catch(err => {
    console.log(err);
});

