const express = require('express');
const router = express.Router();

const db = require('./db');


// Set an endpoint to receive GET requests for team names
router.get('/', (req, res) => {
	res.json(db.map(team => team.name));
});


router.get('/:teamName', (req, res) => {
	if(db.some(team => team.name === req.params.teamName)){
		let team = db.filter(team => team.name === req.params.teamName)[0];
		res.json({name: team.name, created: team.created, players: team.players.map(player => player.name)});
	}
	else{
		res.status(400).json({msg: `${req.params.teamName} is not a team we have registered`});
	}
});

module.exports = router;