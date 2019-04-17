let dataGraph = function (p) {
  //  labels = {xaxis,yaxis,title}
  p.labels = {}
  p.obj = []

  p.setup = function () {
    //  sample data:
    //  dataObj = {xMin, xMax, xInterv, yMin, yMax, yInterv, functs[{name,func}...], points[[x,y]...]
    p.obj = {
      xMin: 0,
      xMax: 10,
      xInterv: 1,
      yMin: 0,
      yMax: 10,
      yInterv: 1,
      functs: [
        {
          name: 'function 1',
          func: function (x) {
            return -3 * (x - 3) * (x - 6)
          },
          color: [255, 0, 0]
        },
        {
          name: 'function 2',
          func: function (x) {
            return 5 * (x - 3.9) * (x - 4.1)
          },
          color: [0, 255, 0]
        },
        {
          name: 'function 3',
          func: function (x) {
            return Math.round(x)
          },
          color: [0, 0, 255]
        }
      ],
      points: {
        values: [[2.1, 2.2], [3, 4], [4, 6], [5, 8], [6, 4.5]],
        uncertainties: [[0.5, 0.8], [0.3, 0.15], [0.2, 0.3], [0.8, 0.8], [0.8, 0.9], [1, 1]],
        color: [255, 200, 0]
      }
    }

    p.makeGraph(p.obj)

    p.labels = {
      title: {
        coords: [p.width / 2, p.height / 8],
        value: 'temp'
      },
      xaxis: {
        coords: [p.width / 2, p.height * 13 / 14],
        value: 'temp'
      },
      yaxis: {
        coords: [p.width / 14, p.height / 2],
        value: 'temp'
      }
    }

    p.canvas.parent('sketchHolder2')
  }

  p.makeGraph = function (obj) {
    makeSizes(p)
    p.canvas = p.createCanvas(p.width, p.height)
    p.background(240)
    p.drawAxesAndLabels()
    p.drawFunctionsOnCanvas()
    p.drawPointsOnCanvas()
  }

  p.drawFunctionsOnCanvas = function () {
    //  to store most most recent pixels for each function:
    let lastOne = []
    for (let i = 0; i < p.obj.functs.length; i++) {
      lastOne[i] = []
    }
    //  for all pixels in graph range:
    for (let xPixel = p.width / 8; xPixel <= p.width * 7 / 8; xPixel++) {
      //  xPixel -> xNum
      let xRel = xPixel - (p.width * (1 / 8))
      let xPixToNumScl = (p.obj.xMax - p.obj.xMin) / (p.width * (6 / 8))
      let xNum = xRel * xPixToNumScl + p.obj.xMin

      //  use func to find yNum from xNum
      for (let i = 0; i < p.obj.functs.length; i++) {
        let yNum = p.obj.functs[i].func(xNum)

        //  skipiteration if out of range
        if (yNum >= p.obj.yMax || yNum <= p.obj.yMin) {
          lastOne[i] = []
          continue
        }

        //  use yNum to find yPixel
        let yRel = yNum - p.obj.yMin
        let yNumToPixScl = (p.height * (6 / 8)) / (p.obj.yMax - p.obj.yMin)
        let yPixel = (p.height * 7 / 8) - (yRel * yNumToPixScl)

        //  create function:
        p.stroke(p.getColor(p.obj.functs[i].color))
        if (lastOne[i].length !== 0) { //  checks that LastOne[i] != []
          p.line(xPixel, yPixel, lastOne[i][0], lastOne[i][1]) // lines between pixels
          //  p.ellipse(xPixel,yPixel,1) // no lines between pixels
        }

        lastOne[i] = [xPixel, yPixel]
      }
    }
  }

  p.drawPointsOnCanvas = function () {
    for (let i = 0; i < p.obj.points.values.length; i++) {
      //  draw uncerts:
      let [x, y] = p.obj.points.values[i]
      let [v, w] = p.obj.points.uncertainties[i] //  v = x uncertainty   w = y uncertainty

      p.stroke(0)
      //  two big boi lines:
      p.numLine(x, (y - w), x, y + w)
      p.numLine(x - v, (y), x + v, y)
      //  perpindicular bois
      p.numLine(x - (w / 8), y - w, x + (w / 8), y - w)
      p.numLine(x - (w / 8), y + w, x + (w / 8), y + w)
      p.numLine(x - v, y - (w / 8), x - v, y + (w / 8))
      p.numLine(x + v, y - (w / 8), x + v, y + (w / 8))

      //  draw pixel:
      p.fill(p.getColor(p.obj.points.color))
      p.stroke(0)
      p.strokeWeight(0.5)
      let px = p.numToPixelX(p.obj.points.values[i][0])
      let py = p.numToPixelY(p.obj.points.values[i][1])
      p.ellipse(px, py, 3)
    }
  }

  p.numLine = function (x1, y1, x2, y2) {
    p.line(p.numToPixelX(x1), p.numToPixelY(y1), p.numToPixelX(x2), p.numToPixelY(y2))

  }

  p.numToPixelX = function (point) {
    let xPixToNumScl = (p.width * 6 / 8) / (p.obj.xMax - p.obj.xMin)
    let x = (p.width * 1 / 8) + ((point - p.obj.xMin) * xPixToNumScl)
    return x
  }

  p.numToPixelY = function (point) {
    let yPixToNumScl = (p.height * 6 / 8) / (p.obj.yMax - p.obj.yMin)
    let y = (p.height * 7 / 8) - ((point - p.obj.yMin) * yPixToNumScl)
    return y
  }

  p.getColor = function (col) {
    let r = col[0]
    let g = col[1]
    let b = col[2]
    return p.color(r, g, b)
  }

  p.drawAxesAndLabels = function () {
    //  draw axes in:
    p.fill(0)
    p.line(p.width / 8, p.height / 8, p.width / 8, p.height * 7 / 8)
    p.line(p.width / 8, p.height * 7 / 8, p.width * 7 / 8, p.height * 7 / 8)

    p.textFont('Helvetica')
    //  draw x axis labels:
    p.textAlign(p.CENTER, p.TOP)
    let num = (p.obj.xMax - p.obj.xMin) / p.obj.xInterv
    for (let i = 0; i <= num; i++) {
      let x = p.width / 8 + i * (p.width * 3 / 4 / num)
      p.text(p.obj.xMin + p.obj.xInterv * i, x, p.height * 7 / 8 + 3)
    }

    //  draw y axis labels:
    p.textAlign(p.RIGHT, p.CENTER)
    num = (p.obj.yMax - p.obj.yMin) / p.obj.yInterv
    for (let i = 0; i <= num; i++) {
      let yNum = p.height * 7 / 8 - i * (p.height * 3 / 4 / num)
      p.text(p.obj.yMin + p.obj.yInterv * i, p.width * 1 / 8 - 3, yNum)
    }
  }

  p.addAxesLabels = function () {
    let selected = document.getElementsByName('selected')
    for (let i = 0; i < selected.length; i++) {
      let label = selected[i].value
      if (label !== 'none') {
        if (selected[i].checked) {
          //  save value of mouse coords to local js data - given that one of the radio buttons is checked
          p.labels[label].coords = [p.mouseX, p.mouseY]
        }

        //  update html labels
        let text = document.getElementById(label).value
        p.labels[label].value = text

        //  draw all labels onto graph
        p.textAlign(p.CENTER)
        p.stroke(20)
        p.fill(20)
        if (label === 'yaxis') {
          p.push()
          p.translate(p.labels[label].coords[0], p.labels[label].coords[1])
          p.rotate(-1 * Math.PI / 2)
          p.text(p.labels[label].value, 0, 0)
          p.pop()
        } else {
          p.text(p.labels[label].value, p.labels[label].coords[0], p.labels[label].coords[1])
        }
      }
    }
  }

  p.draw = function () {
    p.background(248)
    p.drawAxesAndLabels()
    p.drawFunctionsOnCanvas()
    p.drawPointsOnCanvas()
    p.addAxesLabels()
    p.ellipse(p.mouseX, p.mouseY, 5)
  }

  p.mouseClicked = function () {
    if (p.mouseX <= p.width && p.mouseX >= 0 && p.mouseY <= p.height && p.mouseY >= 0)
      document.getElementById('none').checked = true
  }
}

let myp5 = new p5(dataGraph)

function makeSizes(canv) {
  canv.width = canv.windowWidth / 2 * 1.1
  canv.height = canv.windowHeight / 2 * 1.1
}