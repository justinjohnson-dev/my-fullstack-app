const mongoose = require('mongoose');

// inventory schema for items that will be in the shop
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    }
}, { timestamps: true }
);


module.exports = mongoose.model("Category", categorySchema);