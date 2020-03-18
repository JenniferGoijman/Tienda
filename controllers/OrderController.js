const {
    Order,
    Product,
    OrderProduct
} = require('../models/index.js');
const OrderController = {
    getAll(req, res) {
        Order.findAll({
                include: [Category]
            })
            .then(orders => res.send(orders))
    },
    insert(req, res) {
        Order.create({
            status: "pending",
            deliveryDate: req.body.deliveryDate
            })
            .then(order => {
                const products = req.body.products.map(product => ({
                    ...product,
                    OrderId: order.id
                }));
                OrderProduct.bulkCreate(products);
                res.send(order);
            })
    }
}

module.exports = OrderController;