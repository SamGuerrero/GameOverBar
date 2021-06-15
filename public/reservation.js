const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    date: { type: String, required: true},
    people: { type: Number, required: true}
});

module.exports = mongoose.model('Reservation', ReservationSchema);