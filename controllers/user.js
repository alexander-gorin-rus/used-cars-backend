const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


exports.register = async (req, res) => {
    check('name', 'name is required')
        .not()
        .isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').isLength({ min: 6 })
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
    const { name, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if(user){
            return res
                .status(400)
                .json({
                errors: [{msg: 'User alredy exists'}]
            })
        }

        user = new User({
            name,
            email,
            password
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        //return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.AUTH_TOKEN,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        )
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
}

exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    if(!users){
        return res.status(404).json({
            error: 'Users do not exists in this application'
        })
    }
    res.status(200).json(users)
}

exports.authUser = async (req, res) => {
   try {
    const user = User.findById(req.user.id);
    res.json(user)
   } catch (err) {
       console.log(err);
       res.status(500).send('Server error');
   }
}