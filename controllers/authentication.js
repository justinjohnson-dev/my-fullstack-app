const User = require('../models/user');
const jwt = require('jsonwebtoken'); // Generating signin token
const expressJwt = require('express-jwt');
const {errorHandler} = require('../helpers/dbError');


exports.signup = (req, res) => {
    // console.log("req.body", req.body);
    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        // hiding user salt and hashed password in header
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        });
    });
};

exports.signin = (req, res) => {
    // find the user in database
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does exist. Please signup'
            });
        } 

        // user is found
        // create authentication in /model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password dont match"
            })
        }

        // generate signed token with userId
        const token = jwt.sign({_id: user._id}, process.env.JWT_SERCRET)
        res.cookie('t', token, {expire: new Date() + 9999})
        const {_id, name, email, role} = user
        return res.json({token, user: {_id, email, name, role}});
    });
};

exports.signout = (req, res) => {
    // Clear the cookie from response
    res.clearCookie('t');
    res.json({message: "Signout successful"});
};

// using the express JWT package
exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SERCRET,
    userProperty: 'auth'
});

// auth user so that they can view their profile
exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        });
    }
    next();
};

// if user role === 1, they are an admin
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Must be a Admin. Access denied"
        });
    }

    next();
};