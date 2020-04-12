const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const Product = require('../models/products');
const { errorHandler } = require('../helpers/dbError');


exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product) {
            return res.status(400).json({
                error: "Product not found"
            });
        }

        req.product = product
        next();
    });
};


exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
};


exports.create = (req, res) => {
    // using the formidable package to handle
    // Images coming from form
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            }); 
        }

        // Check to make sure all fields are filled out
        const { name, description, price, category, quantity, shipping } = fields
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let product = new Product(fields)

        // Need to pass in what you name image
        if (files.photo) {
            // 1mb = 1000000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }

            // using file system to read data
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        // Save the new product
        product.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(success);
        });
    });
};


exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            "message":"Product has been deleted!"
        })
    });
}


exports.update = (req, res) => {
    // using the formidable package to handle
    // Images coming from form
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            }); 
        }

        // Check to make sure all fields are filled out
        const { name, description, price, category, quantity, shipping } = fields
        if(!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        // Update our product
        let product = req.product
        // using lodash library
        product = _.extend(product, fields);

        // Need to pass in what you name image
        if (files.photo) {
            // 1mb = 1000000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }

            // using file system to read data
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        // Save the new product
        product.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(success);
        });
    });
};


// How we will update quantity when item is sold
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    // need to parse limit to an integer for query
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    Product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: "Product is not found"
                });
            }
            res.json(success);
        });
    }; 
    
    
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit): 6;
    
    // Finding related products, everything except current product ($ne)
    // finding all products within same category
    Product.find({_id: {$ne: req.product}, category: req.product.category})
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Product is not found"
                });
            }
            res.json(data);
        });
};


exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Product is not found"
            });
        }
        res.json(category);
    });
};

 
// in the front end we will have a product search
// the listBySearch will allow us to click boxes and filter 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // price will be in [] format
                // will be check box of price range [$0-$100]
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    // Product search
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


// Viewing any products photo, using the content-type we created in schema
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }

    next();
};

exports.listSearch = (req, res) => {
    // create query object, holding search value and category value
    const query = {}

    // assign source value to query.name
    if (req.query.search) {
        query.name = {$regex: req.query.search, $options: 'i'}
        // assgin category value to query.category
        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category
        }

        // find product based on query object with 2 props
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            } else {
                res.json(products)
            }
        }).select('-photo')
    }
}