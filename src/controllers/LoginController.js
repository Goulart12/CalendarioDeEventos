const bcrypt = require('bcrypt');
const User = require('../src/db/config')

module.exports = {
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
            errors.push({msg: 'Email já registrado'});
            res.render('create-account-page',{errors,name,lastName,email,password,passwordConfirm})  
            console.log('Usuário já existe');
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
}    


    
