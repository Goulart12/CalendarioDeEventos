const express = require('express');
const route = express.Router();
const documentStore = require('./db/config');
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
            const session = documentStore.openSession();
            const newUser = new User();
            newUser.name = name;
            newUser.lastName = lastName;
            newUser.email = email;
            newUser.password = password;

            
            session.documentStore(newUser);

            session.saveChanges();

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