var express = require('express')
var cors = require('cors')

const fetch = require('node-fetch') 
const Bluebird = require('bluebird') 
fetch.Promise = Bluebird

const path = require('path');

const app = express();

app.use(cors())

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=61efe3fe4e5f04e2b85597505f27fcff')
    .then(res => res.json())
    .then(item=>{console.log(item); return(res.json(item))})
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);