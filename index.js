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

const PORT = process.env.PORT || 5000; // Setting the PORT number
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Making the app listen on PORT (and localhost by default)