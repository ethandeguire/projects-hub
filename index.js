const express = require('express')
const bodyParser = require('body-parser')

const app = express()
var path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('client'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/hub/projects.html'))
})


//this is here to test restart
app.get('/restart', (req, res) => {
  const shell = require('shelljs');
  shell.exec('restartethanserver')
})

app.listen(3000, () => console.log('server started'))