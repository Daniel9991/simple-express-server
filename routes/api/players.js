const express = require('express');
const router = express.Router();

const db = require('./db');

router.get('/:playerName', (req, res) => {
	let found = false;
	let playerTeam = undefined;

	for(let team of db){
		if(team.players.map(player => player.name).includes(req.params.playerName)){
			found = true;
			playerTeam = team;
		}
	}
	if(found){
		let player = playerTeam.players.filter(player => player.name === req.params.playerName)[0];
		res.json(player);
	}
	else{
		res.status(400).json({msg: `${req.params.playerName} is not a player we have registered`});
	}
});

module.exports = router;