var express = require('express');
var router = express.Router();
var node_db = require("node-json-db");
var db = new node_db.JsonDB(new node_db.Config("database", true, false, "/", true));

// get https://api.avav.meme/art_votes
router.get('/', async function(req, res){
   var t = await db.getData("/");
   res.status(200).send(t);
});

router.put('/:id', async function(req, res){
    try {
        var req_id = req.params.id;
        var t_vote = await db.getData("/vote_" + req_id);
        t_vote = t_vote + 1;
    
        db.push("/vote_"+req_id, t_vote);
        
        var t = await db.getData("/");
        res.status(200).send(t);
    }
    catch {
        res.status(400).send({"message": "error"});
    }
    
});

module.exports = router;