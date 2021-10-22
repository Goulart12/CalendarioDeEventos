const express = require('express');
const server = express();
server.use(express.json());
const teste = [];

server.get('/teste', (req, res) => {
    return res.json(teste);
})

server.get('/teste/:index', checkUserInArray, (req, res) => {
    return res.json(req.user);
})

server.post('/teste', (req, res) => {
    const { name } = req.body;

    teste.push(name);

    return res.json(teste);
})

server.put('/teste/:index', (req, res) => {
    const { index } = req.params; 
    const { name } = req.body;
    
    geeks[index] = name; 
    
    return res.json(teste);
}); 

server.delete('/teste/:index', (req, res) => {
    const { index } = req.params; 
    
    teste.splice(index, 1); 
    
    return res.send();
    }); 

server.post

server.listen(3000);