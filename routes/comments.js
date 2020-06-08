const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/').get((request, response) => {
    Comment.find()
        .then(comments => response.json(comments))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/add').post((request, response) => {
    const cardId = request.body.cardId;
    const date = request.body.date;
    const email = request.body.email;
    const message = request.body.message;
    const stars = request.body.stars;
    const title = request.body.title;
    const username = request.body.username;

    const newComment = new Comment({ cardId, date, email, message, stars, title, username });

    newComment.save()
        .then((comment) => response.json(comment))
        .catch((error) => response.status(400).json('Error: ' + error));
});

router.route('/:id').get((request, response) => {
    Comment.findById(request.params.id)
        .then(comment => response.json(comment))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/:id').delete((request, response) => {
    Comment.findByIdAndDelete(request.params.id)
        .then(() => response.json('Comment has been deleted!'))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/findByCardId').post((request, response) => {
    const cardId = request.body.cardId;

    Comment.find({ cardId: cardId }, function(error, comments) {
        if (error) {
            response.send('Error: ' + error);
        }

        response.json(comments);
    });
});

module.exports = router;