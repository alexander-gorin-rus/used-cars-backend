const express = require('express');
const auth = require('../middleware/auth');
const { register, getAllUsers, authUser } = require('../controllers/user');

const router = express.Router();

router.post('/register', register);

router.get('/auth', auth, authUser);

router.get('/users-get', getAllUsers);

module.exports = router;