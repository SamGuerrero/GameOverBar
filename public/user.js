const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    points: {type: Number, requires: false},
    reservations: {type: Array, required: false}
});

//Función que se ejecuta antes de que se guarde el usuario para encriptar la contraseña
UserSchema.pre('save', function(next){
    if (this.isNew || this.isModified('password')) {
        const document = this;

        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    
    }else{
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same){
        if (err)
            callback(err);
        else
            callback(err, same);
    });
}

module.exports = mongoose.model('User', UserSchema);