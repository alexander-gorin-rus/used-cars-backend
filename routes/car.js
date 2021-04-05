const express = require('express');
const { carCreate, getCars } = require('../controllers/car');

const router = express.Router();

router.post('/create', carCreate);

router.get('/get-cars', getCars);

module.exports = router;