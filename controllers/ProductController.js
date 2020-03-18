const {
    Product
} = require('../models/index.js');
const ProductController = {
    getAll(req, res) {
        Product.findAll()
            .then(products => res.send(products))
    },
    insert(req, res) {
        Product.create({...req.body})
        .then(product=>res.send(product))
    }
}

module.exports = ProductController;