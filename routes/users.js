const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((request, response) => {
    User.find()
        .then(users => response.json(users))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/add').post((request, response) => {
    const accountBalance = request.body.accountBalance;
    const username = request.body.username;
    const password = request.body.password;
    const deck = request.body.deck;
    const newUser = new User({accountBalance, username, password, deck});
    
    newUser.save()
        .then(() => response.json('User has been created successfully!'))
        .catch((error) => response.status(400).json('Error: ' + error));
});

router.route('/:id').get((request, response) => {
    User.findById(request.params.id)
        .then(user => response.json(user))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/:id').delete((request, response) => {
    User.findByIdAndDelete(request.params.id)
        .then(() => response.json('User has been deleted!'))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/update/:id').post((request, response) => {
    User.findById(request.params.id)
        .then((user) => {
            user.accountBalance = user.accountBalance - request.body.accountBalance,
            user.username = request.body.username;
            user.password = request.body.password;
            user.deck = request.body.deck;
            
            user.save()
                .then(() => response.json('User has been updated!'))
                .catch((error) => response.status(400).json('Error: ' + error));
        })
        .catch(error => response.status(400).json('Error: ' + error));
});

module.exports = router;