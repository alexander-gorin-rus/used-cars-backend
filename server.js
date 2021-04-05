const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./mongoDB/db')
const multer = require('multer');


//Mongo Database Connection
connectDB()

//Initialize app
const app = express();

//File upload with multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

//REST API routes
app.use('/api/v1', require('./routes/user'));
app.use('/api/v1', require('./routes/car'));

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})

