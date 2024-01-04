var express = require('express');
var ArtVotes = require('../models').ArtVotes;
var router = express.Router();

var fields = ["art", "music", "access_right", "game_props", "physical_goods", "standing", "web_2_database"];

// middleware
var checkIDValid = function (req, res, next) {  
    var id = fields.indexOf(req.params.id);
    console.log(id);
    //console.log('Check ID input');
    if(id < 0) {
        //console.log('Invalid ID supplied');
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkROWExist = function (req, res, next) {  
    //console.log('Check ID exist');
    ArtVotes.count({ where: { id: 1 } }).then(count => {
        if (count != 0) {
            next();
        } else {
            console.log('row not found');
            ArtVotes.create({
                art: 0,
                music: 0,
                access_right: 0,
                game_props: 0,
                physical_goods: 0,
                standing: 0,
                web_2_database: 0
            }).then(book => {
                next();
            }).error(err => {
                res.status(405).json('Error has occured');
            });
        }
    });
};

router.get('/', function(req, res){
    ArtVotes.findOne({where: {id:1}}).then(votes => {
        res.status(200).json(votes);
    });
});

router.put('/:id', [checkIDValid, checkROWExist], function(req, res){
    //console.log('Update vote by id');
    ArtVotes.increment(req.params.id, { by: 1, where: { id: 1 }})
    .then(result => {
        ArtVotes.findAll().then(book => {
            res.status(200).json(book);
        });
    });
});

module.exports = router;