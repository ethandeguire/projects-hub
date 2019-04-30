const express = require('express')
const bodyParser = require('body-parser')
const shell = require('shelljs');

const app = express()
var path = require('path')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('client'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/hub/index.html'))
})


//this is here to test restart
app.get('/restart', (req, res) => {
  const shell = require('shelljs');
  shell.exec('restartethanserver')
})

app.listen(3000, () => console.log('server started'))


// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');


// Import other required libraries
const fs = require('fs');
const util = require('util');
async function main() {
  // Creates a client
  const client = new textToSpeech.TextToSpeechClient();

  // The text to synthesize
  const text = 'Paging customer number 1 2 3 4 5';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML Voice Gender (optional)
    voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
    // Select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('output.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
main()
