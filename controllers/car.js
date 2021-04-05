const Car = require('../models/Car');

exports.carCreate = async (req, res) => {
    try {
        const newCar = await new Car(req.body).save();

        res.status(200).json(newCar)
    } catch (error) {
        console.log(error)
    }
}

exports.getCars = async (req, res) => {
    try {
        let cars = await Car.find({})
        .exec()
        if(!cars){
            return res.status(400).json({
                msg: "Imposible to fetch cars from database"
            })
        }
        res.json(cars)
    } catch (error) {
        console.log(error)
    }
}