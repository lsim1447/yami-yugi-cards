const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/').get((request, response) => {
    Order.find()
        .then(orders => response.json(orders))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/add').post((request, response) => {
    const date = request.body.date;
    const products = request.body.products;
    const totalPrice = request.body.totalPrice;
    const userId = request.body.userId;

    const newOrder = new Order({ date, products, totalPrice, userId });

    newOrder.save()
        .then((order) => response.json(order))
        .catch((error) => response.status(400).json('Error: ' + error));
});

router.route('/:id').get((request, response) => {
    Order.findById(request.params.id)
        .then(order => response.json(order))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/:id').delete((request, response) => {
    Order.findByIdAndDelete(request.params.id)
        .then(() => response.json('Order has been deleted!'))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/update/:id').post((request, response) => {
    Order.findById(request.params.id)
        .then((order) => {
            order.date = request.body.date;
            order.products = request.body.products;
            order.totalPrice = request.body.totalPrice;
            order.userId = request.body.userId;

            order.save()
                .then(() => response.json('Order has been updated!'))
                .catch((error) => response.status(400).json('Error: ' + error));
        })
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/findByUserId').post((request, response) => {
    const userId = request.body.userId;

    Order.find({ userId: userId }, function(error, orders) {
        if (error) {
            response.send('Error: ' + error);
        }

        response.json(orders);
    });
});

module.exports = router;