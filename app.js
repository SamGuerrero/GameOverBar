const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const User = require('./public/user');
const Reservation = require('./public/reservation');

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
            res.redirect('/error.html');
        
        }else if (!user){
            res.cookie('errorAutenticacion', true);
            res.redirect('/entrar.html');
        
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
    let textoEmail = "Ha reservado en el bar para " + data.personas + " personas, el día: " + data.fecha;

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: "darby.ankunding@ethereal.email",
            pass: "6c9NfhnYGzMr3d1H1P"
        }
    });

    var mailOptions = {
        from: "Game Over Bar",
        to: data.email,
        subject: "Reserva en Game Over Bar",
        text: textoEmail
    }

    Reservation.findOne({date: data.fecha}, (err, reservation) => {
        if (err){
            res.redirect('/error.html');
        
        }else if (!reservation){
            let reser = new Reservation({date: data.fecha, people: data.personas});

            reser.save(err => {
                if (err){
                    res.redirect('/error.html');
                
                }else{
                    User.findOne({email: data.email}, (err, user) => {
                        if (err){
                            res.redirect('/error.html');
                        
                        }else if (user){
                            user.reservations.push({date: data.fecha, people: data.personas})
                            user.save(err => {
                                if (err){
                                    res.redirect('/error.html');
                                
                                }else{
                                    transporter.sendMail(mailOptions, (err, result) => {
                                        if (err){
                                            res.redirect('/error.html');
                                        
                                        }else{
                                            res.cookie('reservaAutorizada', true);
                                            res.redirect('/reservas.html');
                                        }
                                    });
                                }
                            });

                        }else{
                            transporter.sendMail(mailOptions, (err, result) => {
                                if (err){
                                    res.redirect('/error.html');
                                
                                }else{
                                    res.cookie('reservaAutorizada', true);
                                    res.redirect('/reservas.html');
                                }
                            });
                        }
                    });
                }
            });
            
        }else{
           //Añadir gente a la reserva
            let tempPeople = parseInt(reservation.people) + parseInt(data.personas);
            console.log("gente actual: " + tempPeople);

            if (tempPeople <= 10){
                reservation.people = tempPeople;
                reservation.save(err => {
                    if (err){
                        res.redirect('/error.html');
                    
                    }else{
                        User.findOne({email: data.email}, (err, user) => {
                            if (err){
                                res.redirect('/error.html');
                            
                            }else if (user){
                                user.reservations.push({date: data.fecha, people: data.personas})
                                user.save(err => {
                                    if (err){
                                        res.redirect('/error.html');
                                    
                                    }else{
                                        transporter.sendMail(mailOptions, (err, result) => {
                                            if (err){
                                                res.redirect('/error.html');
                                            
                                            }else{
                                                res.cookie('reservaAutorizada', true);
                                                res.redirect('/reservas.html');
                                            }
                                        });
                                    }
                                });

                            }else{
                                transporter.sendMail(mailOptions, (err, result) => {
                                    if (err){
                                        res.redirect('/error.html');
                                    
                                    }else{
                                        res.cookie('reservaAutorizada', true);
                                        res.redirect('/reservas.html');
                                    }
                                });
                            }
                        });
                    }
                });
            
            }else{
                res.cookie('reservaDenegada', true);
                res.redirect('/reservas.html');
            }
        }
    });

    
});

app.listen(3000, () => {
    console.log('server started');
});
module.exports = app;