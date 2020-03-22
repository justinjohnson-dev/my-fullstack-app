const express = require('express');
const router = express.Router();

const {requireSignIn} = require("../controllers/authentication");
const {userId} = require("../controllers/user");


router.get('/secret/:userId', requireSignIn, (req, res) => {
    res.json({
        user: req.profile
    });
});


router.param('userId', userId)

module.exports = router;