const express = require('express');
const bodyParser = require('body-parser');

const app = express();
var fs = require('fs');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/hub/index.html'));
});
app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/stats/index.html'));
});
app.get('/webart', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/WebArt/index.html'));
});
app.get('/minmax', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/minmax/index.html'));
});
app.get('/efield', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/efield/index.html'));
});
app.get('/warsim', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/warSim/index.html'));
});

app.listen(3000, () => console.log('server started'));
