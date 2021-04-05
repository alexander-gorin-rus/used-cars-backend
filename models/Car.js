const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const carSchema = new mongoose.Schema({
    mark: {
        type: String,
        required: true
    },
    model: {
        type: String,
        requered: true
    },
    yearOfProduction: {
        type: Number,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    engineVolume: {
        type: Number,
        required: true
    },
    color: {
        type: String
    },
    numberOfSeats: {
        type: Number
    },
    wheelsDrive: {
        type: String
    },
    stearingWheelPosition: {
        type: String,
        default: "left",
        enum: [
            "left",
            "right"
        ]
    },
    state: {
        type: String
    },
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('car', carSchema)