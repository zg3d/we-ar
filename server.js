require('dotenv').config();
const express = require("express");
const handlebars = require("express-handlebars");
const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');
const data = require("./data-service.js");
const bodyParser = require('body-parser');
const validEmail = require('email-validator');
const Users = require('./models/Users');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Autoincrement Plugin
// autoIncrement.initialize(connection);

// Asset status routes
app.use(express.static('assets'));

// View handlebar plugin
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/signup', (req, res) =>{
    res.render('signup',{
        title: "Registration",
        pageheading: "Registration",
    });
});

app.post('/signup', async (req, res, next) => {
    const {
        nickname,
        email,
        psw,
        psw2,
        bodyT,
        style
    } = res.body;
    const errors = {};

    if (/^\\s*$/.test(nickname) !== false) {
        errors.nickname = "Please enter a nickname" ;
    }

    if (validEmail.validate(email) !== true) {
        errors.email = "Please enter a valid email";
    }

    if (/\\s*/.test(psw) !== false) {
        errors.psw = "Please enter a password using non space characters";
    }

    if (psw !== psw2) {
        errors.psw2 = "Passwords do not match";
    }

    if (Object.keys(errors).length) {
        console.log("fail")
        return res.render('signup',{
            title: "Registration",
            pageheading: "Registration",
            errors,
        });
    }
    try {
        const user = new Users({
            Nickname:nickname,
            Email:email,
            Psw:psw,
            BodyT:bodyT,
            Style:style
        });
        const userSaved = await user.save();
        res.redirect('/login');
    } catch ($e) {
        console.error(err);
    }
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: "Login",
        pageheading: "Login",
    });
});

app.get('/', (req, res) => {
    res.render('home', {
        title: "Home",
        pageheading: "Homepage",
    });
});

let user={
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
app.post('/login',(req,res)=>{

    let email = req.body.email;
    let psw = req.body.password;
    const errors = {};

    if(/\\s*/.test(email) !=)





});
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
app.get('/createstyle', (req, res)=> {
    res.render('createstyle',{
        title: "Create Style",
        pageheading: "Create Style",
    });
});

app.listen(PORT, () => console.log("Web server has started"));

data.initialize().then(() => {
    console.log("initializing");
    //app.listen(HTTP_PORT,onHttpStart);
}).catch(err => {
    console.log(err);
});

const findUserByEmail = (email) => {
    if(!email) return false;
    return new Promise((resolve, reject) => {
        Users.findOne({ Email: email })
        .exec((err, doc) => {
            if (err) return reject(err)
            if (doc) return reject(new Error('This email already exists. Please enter another email.'))
            else return resolve(email)
        })
    });
}

// function listen() {
//     if (app.get('env') === 'test') return;
//     app.listen(port);
//     console.log('Express app started on port ' + port);
//   }


// function connect() {
//     mongoose.connection
//       .on('error', console.log)
//       .on('disconnected', connect)
//       .once('open', listen);
//     return mongoose.connect(process.env.URI, {
//       keepAlive: 1,
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//   }