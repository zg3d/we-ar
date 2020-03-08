const express = require('express');
const bodyParser = require('body-parser');
const validEmail = require('email-validator');
const Users = require('../models/Users')
const router = express.Router();
 

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
router.use(bodyParser.json());

router.get('/signup', (req, res) =>{
    res.render('signup',{
        title: "Registration",
        pageheading: "Registration",
    });
});


router.post('/signup', async (req,res )=>{
    let nickname = req.body.nickname;
    let email = req.body.email;
    let psw = req.body.psw;
    let psw2= req.body.psw2;
    let bodyT = req.body.bodyT;
    let style = req.body.style;
    const errors = {};

    if(/^\\s*$/.test(nickname) !== false)
    {
        errors.nickname = "Please enter a nickname" ;
    }

    if(validEmail.validate(email) !== true)
    {
        errors.email = "Please enter a valid email";
    }

    if(/\\s*/.test(psw) !== false)
    {
        errors.psw = "Please enter a password using non space characters";
    }

    if(psw !== psw2)
    {
        errors.psw2 = "Passwords do not match";
    }

    if(Object.keys(errors) >0)
    {
        res.render('signup',{
            title: "Registration",
            pageheading: "Registration",
            errors,
        });
    }
    else{
        const user = new Users({
            Nickname:nickname,
            Email:email,
            Psw:psw,
            BodyT:bodyT,
            Style:style

        });
        try{
        const userSaved = await user.save();
        res.json(userSaved);
        }
        catch (err){
            res.json({message:err});
        }
        
        res.redirect('/dashboard');

    }




});


module.exports = router;