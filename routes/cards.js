const router = require('express').Router();
let Card = require('../models/card.model');

router.route('/').get((request, response) => {
    Card.find({}, null, { limit: 200 })
        .then(cards => response.json(cards))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/add').post((request, response) => {
    const archetype = request.body.archetype;
    const atk = request.body.atk;
    const attribute = request.body.attribute;
    const card_images = request.body.card_images;
    const card_prices = request.body.card_prices;
    const card_sets = request.body.card_sets;
    const def = request.body.def;
    const desc = request.body.desc;
    const id = request.body.id;
    const level = request.body.level;
    const name = request.body.name;
    const race = request.body.race;
    const type = request.body.type;
    
    const newCard = new Card({
        archetype,
        atk,
        attribute,
        card_images,
        card_prices,
        card_sets,
        def,
        desc,
        id,
        level,
        name,
        race,
        type
    });
    
    newCard.save()
        .then(() => response.json('Card has been created successfully!'))
        .catch((error) => response.status(400).json('Error: ' + error));
});

router.route('/:id').get((request, response) => {
    Card.findById(request.params.id)
        .then(card => response.json(card))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/findAllByIds').post((request, response) => {
    const ids = request.body.ids;
    
    Card.find()
        .where('_id')
        .in(ids)
        .exec((error, cards) => {
            if (error) {
                response.send('Error: ' + error);
            }    
            
            response.json(cards);
        });
});

router.route('/:id').delete((request, response) => {
    Card.findByIdAndDelete(request.params.id)
        .then(() => response.json('Card has been deleted!'))
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/update/:id').post((request, response) => {
    Card.findById(request.params.id)
        .then((card) => {
            card.archetype = request.body.archetype;
            card.atk = request.body.atk;
            card.attribute = request.body.attribute;
            card.card_images = request.body.card_images;
            card.card_prices = request.body.card_prices;
            card.card_sets = request.body.card_sets;
            card.def = request.body.def;
            card.desc = request.body.desc;
            card.id = request.body.id;
            card.level = request.body.level;
            card.name = request.body.name;
            card.race = request.body.race;
            card.type = request.body.type;

            card.save()
                .then(() => response.json('Card has been updated!'))
                .catch((error) => response.status(400).json('Error: ' + error));
        })
        .catch(error => response.status(400).json('Error: ' + error));
});

router.route('/findByType').post((request, response) => {
    const cardType = request.body.type;
    const limit = request.body.limit;
    
    Card.find({type: cardType}, function(error, cards) {
        if (error) {
            response.send('Error: ' + error);
        }    
        
        response.json(cards);
    }, { limit: limit });
});

router.route('/findByRace').post((request, response) => {
    const cardRace = request.body.type;
    const limit = request.body.limit;
    
    Card.find({race: cardRace}, function(error, cards) {
        if (error) {
            response.send('Error: ' + error);
        }    
        
        response.json(cards);
    }, { limit: limit });
});

router.route('/findByTypeAndRace').post((request, response) => {
    const cardType = request.body.type;
    const cardRace = request.body.race;
    const limit = request.body.limit;
    
    Card.find({type: cardType, race: cardRace}, function(error, cards) {
        if (error) {
            response.send('Error: ' + error);
        }    
        
        response.json(cards);
    }, { limit: limit });
});

module.exports = router;