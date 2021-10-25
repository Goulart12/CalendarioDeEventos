const express = require('express');
const route = express.Router();
const Database = require("../src/db/config")
const bcrypt = require('bcrypt');


route.get('/', (req, res) => {
    res.render('index.ejs')
})

route.get('/login', (req, res) => {
    res.render('login-page.ejs')
})

route.get('/create-account', (req, res) => {
    res.render('create-account-page.ejs')
})

route.get('/events', (req, res) => {
    res.render('events-page.ejs')
})

route.post('/login', (req, res, next) => {
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
    res.render('register', {
        errors : errors,
        name : name,
        lastName : lastName,
        email : email,
        password : password,
        passwordConfirm : passwordConfirm})
    } else {
        //validation passed
            // async create(req, res) {
            //     const db = await Database();
    
            //     await db.run(`INSERT INTO users(
            //         name,
            //         lastName,
            //         email,
            //         password
            //     )VAlUES(
            //         "${name}",
            //         "${lastName}",
            //         "${email}",
            //         "${password}"
            //     )`);
    
            //     res.redirect('/login');
            // };    
    
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(users.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //save pass to hash
                        users.password = hash;
                    //save user
                    users.save()
                    .then((value)=>{
                        console.log(value)
                        req.flash('success_msg','You have now registered!');
                        res.redirect('/login');
                    })
                    .catch(value=> console.log(value));
                        
                }));
        
    }  
    
});


route.post('/logout', (req, res) => {
})

module.exports = route;