const express = require('express');

const route = express.Router();

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

module.exports = route;