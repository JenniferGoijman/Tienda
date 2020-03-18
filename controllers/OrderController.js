const {
    Order
} = require('../models/index.js');
const OrderController = {
    getAll(req, res) {
        Order.findAll({
            include:[Category]})
        .then(orders => res.send(orders))
    },
    insert(req, res) {
        Order.create({...req.body})
        .then(order=>res.send(order))
    }
}

module.exports = OrderController;