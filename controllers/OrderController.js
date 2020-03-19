const {
    Order,
    Product,
    OrderProduct
} = require('../models/index.js');

const OrderController = {
    getAll(req, res) {
        Order.findAll({
                include: [Product]
            })
            .then(orders => res.send(orders))
    },
    getByPK(req, res) {
        Order.findAll({
                where: {
                    id: req.params.orderId
                }
            })
            .then(orders => res.send(orders))
    },
    insert(req, res) {
        Order.create({
                status: "pending",
                deliveryDate: req.body.deliveryDate
            })
            .then(order => {
                req.body.products.forEach(product => {
                    order.addProduct(product[0], { //product id
                        through: {
                            units: product[1] //unidades
                        }
                    })
                });
                res.send(ordOrderer);
            });
    },
    modify(req, res) {
        Order.update({
            ...req.body
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(orders => res.send(orders))
        .catch(err => res.send('problema para modificar'))
    },
    delete(req, res) {
        Order.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(order => {
                OrderProduct.destroy({
                    where: {
                        OrderId: req.params.id
                    }
                })
                res.send('La orden se ha eliminado correctamente')
            })
            .catch(err => res.send('Ha habido un problema para eliminar la orden'))
    }
}

module.exports = OrderController;