const mongoose = require('mongoose');

// inventory schema for items that will be in the shop
// TODO: still needs to be created 
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, { timestamps: true }
);


module.exports = mongoose.model("Category", categorySchema);