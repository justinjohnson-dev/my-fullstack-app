const express = require('express');
const router = express.Router();

const {signup, signin, signout, requireSignIn} = require("../controllers/authentication");
const {UserSignUpValidator} = require('../helpers/validateUser');

router.post('/signup', UserSignUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);


module.exports = router;