/* xySample.js */
let grph

function setup() {
  createCanvas(300, 300)
  // createCanvas(900, 900)
  pixelDensity(2)
  background(60)

  grph = new Graph('socialGraph')

  let options = {
    types: {
      crushes: {
        color: 'PINK',
        directional: true
      },
      relationships: {
        color: 'BLUE',
        directional: false
      },
      hates: {
        color: 'RED',
        directional: true
      },
      friends: {
        color: 'GREEN',
        directional: false
      }
    }
  }

  let data = {
    'tom': {
      crushes: ['john', 'jill'],
      relationships: ['jack'],
      hates: ['phil']
    },
    'john': {
      crushes: ['tom'],
      relationships: ['jack'],
      hates: ['phil']
    },
    'jack': {
      crushes: [],
      relationships: ['john', 'tom'],
      friends: ['phil']
    },
    'jill': {
      crushes: ['tom'],
      relationships: ['jack'],
      friends: ['phil', 'john']
    },
    'phil': {
      crushes: ['tom'],
      relationships: []
    }
  }

  console.log(options, data)

  grph.addData(data, options)

  // grph.canvasLocation(10, 10, 890, 890)
  grph.canvasLocation(10, 10, 290, 290)
  grph.show()
}

function save() {

}


function handleFiles(file) {
  let data, options
  let reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = function (evt) {
    let result = JSON.parse(evt.target.result)
    console.log(result)
    options = result.options
    data = result.data

    grph.addData(data, options)
    grph.show()
  }



}

function mousePressed() {
  if (mouseX < 10 && mouseY < 10 && mouseX >= 0 && mouseY >= 0) save()
}