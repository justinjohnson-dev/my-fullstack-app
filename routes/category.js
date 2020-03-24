const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, deleteCategory, list } = require("../controllers/category");
const {requireSignIn, isAuth, isAdmin} = require("../controllers/authentication");
const {userId} = require("../controllers/user");

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, deleteCategory);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userId);

module.exports = router;