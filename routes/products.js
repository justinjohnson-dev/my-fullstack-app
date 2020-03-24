const express = require('express');
const router = express.Router();

const { create, productById, read, remove, update } = require("../controllers/products");
const {requireSignIn, isAuth, isAdmin} = require("../controllers/authentication");
const {userId} = require("../controllers/user");

// Using CRUD operations for interations with database
router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update);

router.param('userId', userId);
router.param('productId', productById);

module.exports = router;