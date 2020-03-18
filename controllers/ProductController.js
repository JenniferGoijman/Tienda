const {
    Product,
    Category
} = require('../models/index.js');

const ProductController = {
    getAll(req, res) {
        Product.findAll({
                include: [Category]
            })
            .then(products => res.send(products))
    },
    getByPK(req, res) {
        Product.findAll({
                include: [Category],
                where: {
                    id: req.params.productId
                }
            })
            .then(products => res.send(products))
    },
    getByCategory(req, res) {
        Product.findAll({
                include: [Category],
                where: {
                    categoryId: req.params.categoryId
                }
            })
            .then(products => res.send(products))
    },
    insert(req, res) {
        Product.create({
                ...req.body
            })
            .then(product => res.send(product))
    },
    modify(req, res) {
        Product.update({
            ...req.body
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(product => res.send(product))
    },
    delete(req, res) {
        Product.destroy({
            where: {
              id: req.params.id
            }
          })
          .then(()=>res.send('El producto se ha eliminado correctamente'))
      } 
}

module.exports = ProductController;