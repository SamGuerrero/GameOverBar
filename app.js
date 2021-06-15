const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const User = require('./public/user');

app.use(cookieParser());
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
    let data = req.body;

    const user = new User({username: data.nombre, email: data.email, password: data.contrasena});

    user.save(err => {
        if (err){
            res.redirect('/error.html'); //Error al registrar el usuario
        
        }else{
            res.redirect('/index.html'); //Usuario registrado
        }
    })
});

app.post('/authenticate', (req, res) =>{
    let data = req.body;
    
    User.findOne({email: data.email}, (err, user) => {
        if (err){
            res.status(500).send("Error al autenticar el usuario");
        
        }else if (!user){
            res.status(500).send("El usuario no existe");
        
        }else{
            user.isCorrectPassword(data.contrasena, (err, result) =>{
                if(err){
                    res.redirect('/error.html');

                }else if(result){
                    res.cookie('usuario', user.username);
                    res.cookie('email', user.email);
                    res.redirect('/index.html');

                }else{
                    res.cookie('errorAutenticacion', true);
                    res.redirect('/entrar.html');
                }
            });
        }
    });
});

app.post('/sendEmail', (req, res) =>{
    console.log("body: %j", req.body);
    let data = req.body;
    //TODO: Diferenciar español de inglés
    let textoEmail = "Ha reservado en el bar para " + data.personas + " personas, el día: ";
    //data.fecha + " a las: " + data.hora;

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: "darby.ankunding@ethereal.email",
            pass: "6c9NfhnYGzMr3d1H1P"
        }
    });

    //TODO: Diferenciar español de inglés
    var mailOptions = {
        from: "Game Over Bar",
        to: data.email,
        subject: "Reserva en Game Over Bar",
        text: textoEmail
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if (err){
            res.redirect('/error.html');
        
        }else{
            res.cookie('reservaAutorizada', true);
            res.redirect('/reservas.html');
        }
    })
});

app.listen(3000, () => {
    console.log('server started');
});
module.exports = app;