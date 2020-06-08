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
    const votes = request.body.votes;

    const newComment = new Comment({ cardId, date, email, message, stars, title, username, votes });

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

router.route('/update/:id').post((request, response) => {
    Comment.findById(request.params.id)
        .then((comment) => {
            comment.cardId = request.body.cardId;
            comment.date = request.body.date;
            comment.email = request.body.email;
            comment.message = request.body.message;
            comment.stars = request.body.stars;
            comment.title = request.body.title;
            comment.username = request.body.username;
            comment.votes = request.body.votes;

            comment.save()
                .then(() => response.json('Comment has been updated!'))
                .catch((error) => response.status(400).json('Error: ' + error));
        })
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