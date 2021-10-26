const express = require('express');
const route = express.Router();
const User = require('../src/db/config')
const Event = require('../src/db/eventoDB');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {ensureAuthenticated} = require("../src/db/auth");


route.get('/', (req, res) => {
    res.render('index.ejs')
})

route.get('/login', (req, res) => {
    res.render('login-page.ejs')
})

route.get('/create-account', (req, res) => {
    res.render('create-account-page.ejs')
})

route.post('/events', (req,res) => {
    const {startDate, startTime, endDate, endTime, title, description} = req.body;
    let errors = [];
    console.log(' startDate ' + startDate+ ' startTime ' + startTime+ ' endDate :' + endDate+ ' endTime:' + endTime+ ' title :' + title+ ' description:' + description);
    if(!startDate || !startTime || !endDate || !endTime || !title || !description) {
        errors.push({msg : "Por favor preencha todos os campos"})
    }
    //check if match
    if(startTime === endTime) {
        errors.push({msg : "Não pode começar e acabar no mesmo horário"});
    }

    if(errors.length > 0 ) {
        res.render('create-account-page', {
            errors : errors,
            startDate : startDate,
            startTime : startTime,
            endDate : endDate,
            endTime : endTime,
            title : title,
            description : description
        })
    } else {
        Event.findOne({title : title}).exec((err,event)=>{
            console.log(event);   
            if(event) {
                errors.push({msg: 'Evento já existe'});
                res.render('events-page',{errors,startDate, startTime, endDate, endTime, title, description})  
                console.log('Evento já existe');
               } else {
                const newEvent = new Event({
                    startDate : startDate,
                    startTime : startTime,
                    endDate : endDate,
                    endTime : endTime,
                    title : title,
                    description : description
                });
               }
               newEvent.save()
               .then((value)=>{
                   console.log(value)
                   //req.flash('success_msg','You have now registered!');
                   res.redirect('/events');
               })
               .catch(value=> console.log(value)); 
               
               
               if(newEvent.value = 1) {
                let thereIsEvents;
                return thereIsEvents = true;
                }
        })
    }
});

route.get('/events',ensureAuthenticated,(req,res)=>{
    res.render('events-page',{
        user: req.user,
        event : req.event
    });
})


route.post('/create-account', (req, res) => {
    const {name, lastName, email, password, passwordConfirm} = req.body;
    let errors = [];
    console.log(' Name ' + name+ ' LastName ' + lastName+ ' email :' + email+ ' pass:' + password);
    if(!name || !lastName || !email || !password || !passwordConfirm) {
        errors.push({msg : "Por favor preencha todos os campos"})
    }
    //check if match
    if(password !== passwordConfirm) {
        errors.push({msg : "As senhas não são iguais"});
    }
    
    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'A senha deve ter pelo menos 6 caracteres'})
    }
    if(errors.length > 0 ) {
    res.render('create-account-page', {
        errors : errors,
        name : name,
        lastName : lastName,
        email : email,
        password : password,
        passwordConfirm : passwordConfirm})
    } else {
        //validation passed
       User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'email already registered'});
            res.render('create-account-page',{errors,name,lastName,email,password,passwordConfirm})  
            console.log('User already exist');
           } else {
            const newUser = new User({
                name : name,
                lastName : lastName,
                email : email,
                password : password
            });
    
            //hash password
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        newUser.password = hash;
                    //save user
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                        //req.flash('success_msg','You have now registered!');
                        res.redirect('/login');
                    })
                    .catch(value=> console.log(value));
                      
                }));
             }
       })
    }
})

route.post('/login', (req, res, next) => {
    passport.authenticate('local',{
        successRedirect : '/events',
        failureRedirect: '/login',
    })(req,res,next)
})

route.get('/logout', (req, res) => {
    req.logout();
    //req.flash('success_msg','Now logged out');
    res.redirect('/login');
});



module.exports = route;