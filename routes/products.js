const express = require('express');
const router = express.Router();

const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo } = require("../controllers/products");
const {requireSignIn, isAuth, isAdmin} = require("../controllers/authentication");
const {userId} = require("../controllers/user");

// Using CRUD operations for interations with database
router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignIn, isAuth, isAdmin, update);

router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/products/photo/:productId', photo)

router.param('userId', userId);
router.param('productId', productById);

module.exports = router;