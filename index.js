const express = require('express'); // Getting express
const path = require('path'); // Getting path module

const app = express(); // Creating the app instance




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

// Importing routers
app.use('/api/teams', require('./routes/api/teams'));
app.use('/api/player', require('./routes/api/players'));

const PORT = process.env.PORT || 5000; // Setting the PORT number
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // Making the app listen on PORT (and localhost by default)