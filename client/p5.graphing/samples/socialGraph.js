/* xySample.js */
function setup() {
  createCanvas(700, 700)
  background(60)

  let grph = new Graph('socialGraph')

  let data = {
    'personA': {
      hasLiked: ['personC','personI'],
      relationships: ['personB']
    },
    'personI': {},
    'personJ': {},
    'personD': {
      hasLiked: ['personB', 'personD'],
      relationships: ['personB']
    },
    'personF': {},
    'personG': {},
    'personH': {},
    'personK': {},
    'personL': {},
    'personB': {
      hasLiked: ['personD', 'personC'],
      relationships: ['personA', 'personF']
    },
    'personM': {},
    'personN': {},
    'personO': {},
    'personP': {},
    'personQ': {},
    'personR': {},
    'personS': {},
    'personT': {},
    'personC': {
      hasLiked: ['personQ', 'personD'],
      relationships: []
    },
    'personU': {},
    'personV': {},
    'personW': {},
    'personX': {},
    'personY': {},
    'peronP': {},
    'peronQ': {},
    'peronR': {},
    'peronS': {},
    'peronT': {},
    'personE': {
      hasLiked: ['personA', 'personB'],
      relationships: []
    },
    'peronU': {},
    'peronV': {},
    'persnW': {},
    'persnX': {},
    'persnY': {},
  }

  grph.addData(data)

  grph.canvasLocation(10, 10, 690, 690)
  grph.show()
}

function save(){
  saveCanvas('myCanv','png')
}