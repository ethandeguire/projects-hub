const express = require('express')
const bodyParser = require('body-parser')

const app = express()
var path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('client'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/hub/index.html'))
})

app.listen(3000, () => console.log('server started'))
