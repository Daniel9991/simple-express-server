const express = require('express'); // Getting express
const path = require('path'); // Getting path module

const app = express(); // Creating the app instance


db = [
	{
		name: 'Real Madrid',
		created: 1902,
		players: [
			{name: 'Thibaut Courtois', country: 'Belgium'},
			{name: 'Sergio Ramos', country: 'Spain'},
			{name: 'Toni Kroos', country: 'Germany'},
			{name: 'Karim Benzema', country: 'France'},
		]
	},
	{
		name: 'FC Barcelona',
		created: 1899,
		players: [
			{name: 'Marc Andre Ter-Stegen', country: 'Germany'},
			{name: 'Gerard Pique', country: 'Spain'},
			{name: 'Frenkie De Jong', country: 'Netherlands'},
			{name: 'Lionel Messi', country: 'Argentina'},
		]
	},
	{
		name: 'Atletico de Madrid',
		created: 1903,
		players: [
			{name: 'Jan Oblak', country: 'Slovenia'},
			{name: 'Jose Maria Gimenez', country: 'Uruguay'},
			{name: 'Koke Resurreccion', country: 'Spain'},
			{name: 'Luis Suarez', country: 'Uruguay'},
		]
	}
]

/* Allow for cross-origin requests
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	if(req.method === 'OPTIONS'){
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
		return res.status(200).json({});
	}
	return next();
});
*/

// Set the 'public' directory to function as a 'static' directory to serve files
app.use(express.static(path.join(__dirname, 'public')));


// Set an endpoint to receive GET requests for team names
app.get('/api/teams', (req, res) => {
	res.json(db.map(team => team.name));
});


app.get('/api/team/:teamName', (req, res) => {
	if(db.some(team => team.name === req.params.teamName)){
		let team = db.filter(team => team.name === req.params.teamName)[0];
		res.json({name: team.name, created: team.created, players: team.players.map(player => player.name)});
	}
	else{
		res.status(400).json({msg: `${req.params.teamName} is not a team we have registered`});
	}
});


app.get('/api/player/:playerName', (req, res) => {
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


app.get('/bad', (req, res) => {
	res.status(400).json({msg: 'Fucked up'});
});


const PORT = process.env.PORT || 5000; // Setting the PORT number
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Making the app listen on PORT (and localhost by default)