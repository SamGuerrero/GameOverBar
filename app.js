const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./public/user');

app.use(express.urlencoded({extended: false}));
app.use(express.json()) 

app.use(express.static(path.join(__dirname, 'public')));

const mongo_uri = 'mongodb://127.0.0.1:27017/gameoverdb';

mongoose.connect(mongo_uri, function(err) {
    if (err) {
        throw err;
    } else {
        console.log('successfully connected to ' + mongo_uri);
    }
});

app.post('/register', (req, res) =>{
    const {username, email, password} = req.body;

    const user = new User({username, email, password});

    user.save(err => {
        if (err){
            res.status(500).send("Error al registrar el usuario: " + err);
        
        }else{
            res.status(200).send("Usuario registrado");
        }
    })
});

app.post('/authenticate', (req, res) =>{
    const {email, contrasena} = req.body;

    User.findOne({username}, (err, user) => {
        if (err){
            res.status(500).send("Error al autenticar el usuario");
        
        }else if (!user){
            res.status(500).send("El usuario no existe");
        
        }else{
            User.isCorrectPassword(contrasena, (err, res) => {
                if (err) {
                    res.status(500).send("Error al autenticar la contraseñ");
                
                }else if(res){
                    res.status(200).send("Usuario autenticado correctamente");
                
                }else{
                    res.status(500).send("Usuario y/o contraseña incorrectos");
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('server started');
});
module.exports = app;