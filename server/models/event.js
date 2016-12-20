var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var eventSchema = new mongoose.Schema({

title: { type: String, required: true},
detail: { type: String, required: true},
date: { type: Date, required: true},
coordinates: { type: {long: Number, lat: Number}, required: true },
address: { type: {street: String, city: String, zip: String}, required: true },
category: { type: String },
});

mongoose.model('Event', eventSchema);
