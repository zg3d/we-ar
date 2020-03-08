require('dotenv').config();
const express = require("express");
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Users = require('./models/users');
const data = require("./data-service.js");
const bodyParser = require('body-parser');
const handlebars = require("express-handlebars");
const validEmail = require('email-validator');

const app = express();
const PORT = process.env.PORT || 3000;
let user = {};
mongoose.connect(process.env.URI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Autoincrement Plugin
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
    } = req.body;
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

    if (Object.keys(errors).length >0) {
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
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        msg = {
            to: `${email}`,
            from: 'noreply@we-ar.com',
            subject: 'You Have Successfully Signed Up ',
            text: `Hello ${nickname}`,
            html: `<strong>Welecome to the best experince in your life. Your Login info is ${email} and ${psw}</strong>`,
           
          };
          sgMail.send(msg).then(()=>{
        res.redirect("/login"
    );}).catch(err=>(console.log(err)));
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

app.get('/addPic', (req, res) => {
    res.render('addPic', {
        title: "Add Picture",
        pageheading: "Add Picture",
    });
});

// let user={
//     "gender": "male",
//     "bodytype":"small",
//     "style": "casual",
//     "colorful": true,
//     "hat": false,
//     "weather": "summer"
// }


app.get("/findStyle",(req,res)=>{
    data.findstyle().then((data)=>{

    })
})
app.post('/login', async (req,res)=>{

    let email = req.body.email;
    let psw = req.body.password;
    const errors = {};

    if(/\\s*/.test(email) != false)
    {
        errors.email = "Enter Email";
    }

    if(/\\s*/.test(psw) != false)
    {
        errors.psw = "Enter valid Password";
    }

    if(Object.keys(errors).length > 0){
        res.render('login',{
                title: "Login",
            pageheading: "Login",
            errors,
        })
    }
    else {
    try{
         user = await Users.findOne({ Email:email }, function (err, user) {});
            if(user.Psw !== psw)
            {
                errors.psw = "Password is incorrect";
                res.render('login',{
                    title: "Login",
                pageheading: "Login",
                errors,
            })
            }
            else{
                console.log(user);

                res.redirect('/dashboard');
            }
        }
        catch (err){
            console.log(err);
        }
    }
});
app.get("/dailystyle", (req, res) => {
        res.render('michael', {
            title: "Michael",
            images:data,
    })
})
app.get('/dashboard', function (req, res) {
    res.render('dashboard', {
        title: "Dashboard",
        pageheading: "Dashboard",
        name:user.Nickname,
    });
});
app.get('/createstyle', (req, res)=> {
    res.render('createstyle',{
        title: "Create Style",
        pageheading: "Create Style",
    });
});

app.post("/dailystyle", (req, res) => {
    data.getMatchStyle(req.body).then((data) => {
        res.render('michael', {
            title: "Michael",
            images:data,
        });
    }).catch((err)=>{
        res.render('michael',{message:"No Result"});
        console.log(err);
    })
})

app.listen(PORT, () => console.log("Web server has started"));


data.initialize().then(() => {
    console.log("initializing");
}).catch(err => {
    console.log(err);
});



let apiKey = process.env.WEATHER;
let getTemp = async (city) =>{ 
   try{
        const res = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        try{
            const temp = await res.json();
            return temp.main.feels_like -273.15;
            }catch(err2){
            console.log(err2);
            }
   }catch(err){
       console.log(err);
   }
}
user.temp = getTemp('toronto') ;
