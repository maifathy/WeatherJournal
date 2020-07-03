// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
/* end of Dependencies*/

// Setup Server
const port = 3000;
const listening = () => {console.log('Server is running'); console.log(`localhost:${port}`);}
const server = app.listen(port, listening);

// GET route
app.get('/all', getWeather);
// GET callback
function getWeather(req, res)
{
    res.send(projectData);
}
// POST route
app.post('/setWeather', setWeather);
// POST callback
function setWeather(req, res)
{
    const newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData = newEntry;
    res.send(projectData);
}
