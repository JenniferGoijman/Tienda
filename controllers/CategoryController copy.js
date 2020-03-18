const {
    Category
} = require('../models/index.js');
const CategoryController = {
    getAll(req, res) {
        Category.findAll()
            .then(categories => res.send(categories))
    },
    insert(req, res) {
        Category.create({...req.body})
        .then(category=>res.send(category))
    }
}

module.exports = CategoryController;