const express = require('express');
const route = require('./route')
const path = require('path')
const mongoose = require('mongoose');


const session = require('express-session');
const server = express()
const passport = require('passport');

require('../src/db/passport')(passport)

mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('connected,,'))
.catch((err)=> console.log(err));

server.set('view engine', 'ejs')

server.use(express.static('public'))

server.set('views', path.join(__dirname, 'views'))

server.use(express.urlencoded({extended: false}))

server.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
server.use(passport.initialize());
server.use(passport.session());

server.use(route)

server.listen(3000, () => {
    console.log("Servidor LIGADO")
});