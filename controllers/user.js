const User = require('../models/user');

exports.userId = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({error: 'User not found'});
        }
        req.profile = user;
        next();
    });
}


// Sending user profile information 
// Hiding password & salt
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;

    return res.json(req.profile);
};


// Will allow users to update their profile
exports.update = (req, res) => {
    User.findOneAndUpdate({_id: req.profile._id}, 
        {$set: req.body}, {new: true},
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to perform action"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        });
};