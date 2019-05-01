class Graph {
  
  /**
   * @param  {String} type_='xy'
   */
  constructor(type_ = 'xy') {
    this.data = {}
    this.data.type = type_

    this.colorList = { 'ORANGE': [255, 122, 0], 'BLACK': [10, 10, 10], 'GREY': [180, 180, 180], 'GRAY': [180, 180, 180], 'RED': [255, 0, 0], 'BLUE': [0, 0, 255], 'GREEN': [0, 255, 0], 'YELLOW': [230, 255, 0], 'WHITE': [250, 250, 250], 'PINK': [244, 66, 226] }
    this.backgroundCol('WHITE')

    this.data.fontSizes = { 'title': 24, 'xLabel': 16, 'yLabel': 16, 'legend': 16 }

    if (type_ === 'xy') {
      this.data.functs = []
      this.data.points = { color: [255, 0, 0] }
      this.data.drawGridLines = true

      this.data.graphStartEnd.sgx = 1 / 9  //location to start drawing graph:
      this.data.graphStartEnd.sgy = 8 / 9
      this.data.graphStartEnd.egx = 8 / 9 //location to end drawing graph:
      this.data.graphStartEnd.egy = 1 / 9
    }
    else if (type_ === 'pie') {
      this.data.slices = {}
      this.data.boolDrawLegend = true
      this.data.slices.sliceColors = ["RED", "BLUE", "GREEN", "YELLOW", "BLACK", "GRAY", "PINK"]
    }
    else if (type === 'histogram') {
      this.data.raw = []
      this.data.mode = 'stddev'
    }
  }

  noLegend() {
    this.data.boolDrawLegend = false
  }

  /**
   * @param  {'String'} xLabel_
   * @param  {[Number, Number]} coords_
   */
  xLabel(xLabel_, coords_ = [0, 0]) {
    this.data.xLabel = {}
    this.data.xLabel.value = xLabel_
    this.data.xLabel.coordsOffset = [coords_[0], coords_[1] * -1]
  }
  
  /**
   * @param  {'String'} tLabel_
   * @param  {[Number, Number]} coords_
   */
  yLabel(yLabel_, coords_ = [0, 0]) {
    this.data.yLabel = {}
    this.data.yLabel.value = yLabel_
    this.data.yLabel.coordsOffset = [coords_[0], coords_[1] * -1]
  }

  /**
   * @param  {'String'} title_
   * @param  {[Number, Number]} coords_
   */
  title(title_, coords_ = [0, 0]) {
    this.data.title = {}
    this.data.title.value = title_
    this.data.title.coordsOffset = [coords_[0], coords_[1] * -1]
  }

  
  /**
   * @param  {Number} btm
   * @param  {Number} top
   */
  xlimits(btm, top) {
    if (!btm.isNaN && !top.isNaN) {
      this.data.xMin = btm
      this.data.xMax = top
    } else {
      throw new Error('proper form is xlimits(xMin, xMax), and both must be numbers')
    }
  }

  /**
   * @param  {Number} btm
   * @param  {Number} top
   */
  ylimits(btm, top) {
    this.data.yMin = btm
    this.data.yMax = top
  }

  
  /**
   * @param  {Number} xbtm
   * @param  {Number} xtop
   * @param  {Number} ybtm
   * @param  {Number} ytop
   */
  axis(xbtm, xtop, ybtm, ytop) {
    this.xlimits(xbtm, xtop)
    this.ylimits(ybtm, ytop)
  }

  
  /**
   * @param  {Number} int
   */
  xInterv(int) {
    this.data.xInterv = int
  }

  /**
   * @param  {Number} int
   */
  yInterv(int) {
    this.data.yInterv = int
  }

  /**
   * @param  {String || Object} col_
   */
  backgroundCol(col_) {
    this.data.backgroundCol = this.getColor(col_)
  }

  
  /**
   * @param  {Boolean} bool
   */
  drawGridLines(bool) {
    if (bool === true || bool === false) this.data.drawGridLines = bool
    else throw new Error('drawGridLines must be passed a boolean')
  }

  /**
   * @param  {String || Object} col_
   * @returns {Object}
   */
  getColor(col_) {
    if (typeof col_ !== 'string') {
      if (Array.isArray(col_) && col_.every(x => x >= 0 && x <= 255)) {
        return col_
      } else {
        console.log("BROKEN:", col_)
        console.log('color format unable to be parsed. use an array:[r,g,b]. or a graphing Color')
        return this.colorList["RED"]
      }
    } else {
      try {
        return this.colorList[col_]
      } catch (err) {
        console.log('color unable to be parsed, using default color red')
        return this.colorList["RED"]
      }
    }
  }

  /**
   * @param  {Object} data
   * @param  {String} type
   * @param  {String || Object} color
   */
  addPoints(data, type, color) {
    let x_ = []
    let y_ = []

    if (type === 'lists') {
      //format data locally
      x_ = data[0]
      y_ = data[1]
    }

    else if (type === 'points') {
      //convert array to my data type
      for (let i = 0; i < data.length; i++) {
        x_[i] = data[i][0]
        y_[i] = data[i][1]
      }
    }

    else {
      throw new Error('type is not passed: the second parameter to addPoints should be either "lists" or "points"')
    }

    //  if no color is defined, make color red
    if (!color) {
      color = "RED"
    }

    //  check that arrays are both the same length
    if (this.arraysInvalid(x_, y_)) throw new Error('point arrays are of different lengths')

    //  if points uncertanties already exists:
    if (this.data.points.uncertainties) {
      if (this.data.points.uncertainties.length !== x_.length) throw new Error('different length of points and points uncertainties')
    }

    // this.data.points = [x_, y_]    //this way is nicer, but my code uses the below
    let arr = []
    for (let i = 0; i < x_.length; i++) {
      arr.push([x_[i], y_[i]])
    }
    this.data.points.values = arr

    this.data.points.color = this.getColor(color)

    //  create default values for xmin,ymin,xmax,ymax,xinterv,yinterv
    if (!this.data.xMin) {
      this.data.xMin = x_.sort()[0] - (x_.sort()[x_.length - 1] - x_.sort()[0]) / 10
    }
    if (!this.data.xMax) {
      this.data.xMax = x_.sort()[x_.length - 1] + (x_.sort()[x_.length - 1] - x_.sort()[0]) / 10
    }
    if (!this.data.xInterv) {
      this.data.xInterv = (this.data.xMax - this.data.xMin) / 8
    }
    if (!this.data.yMin) {
      this.data.yMin = y_.sort()[0] - (y_.sort()[y_.length - 1] - y_.sort()[0]) / 10
    }
    if (!this.data.yMax) {
      this.data.yMax = y_.sort()[y_.length - 1] + (y_.sort()[y_.length - 1] - y_.sort()[0]) / 10
    }
    if (!this.data.yInterv) {
      this.data.yInterv = (this.data.yMax - this.data.yMin) / 8
    }
  }

  /**
   * @param  {Object} data
   * @param  {String} type
   */
  addPointUncert(data, type) {
    let x_ = []
    let y_ = []

    if (type === 'lists') {
      //format data locally
      x_ = data[0]
      y_ = data[1]
    }

    else if (type === 'points') {
      //convert array to my data type
      for (let i = 0; i < data.length; i++) {
        x_[i] = data[i][0]
        y_[i] = data[i][1]
      }
    }

    else {
      throw new Error('type is not passed: the second parameter to addPointUncert should be either "lists" or "points"')
    }

    //  check that arrays are both the same length
    if (this.arraysInvalid(x_, y_)) throw new Error('point uncertainty arrays are of different lengths')

    //  if points already exists:
    if (this.data.points.values) {
      if (this.data.points.values.length !== x_.length) throw new Error('different length of points and points uncertainties')
    }

    // this.data.points = [x_, y_]    //this way is nicer, but my code uses the below
    let arr = []
    for (let i = 0; i < x_.length; i++) {
      arr.push([x_[i], y_[i]])
    }
    this.data.points.uncertainties = arr
  }

  
  /**
   * @param  {Function} func_
   * @param  {String || Object} color
   */
  addFunc(func_, color = 'BLACK') {
    this.data.functs.push({ 'func': func_, 'color': color })
  }

  
  /**
   * @param  {Number} xi_
   * @param  {Number} yi_
   * @param  {Number} xf_
   * @param  {Number} yf_
   */
  canvasLocation(xi_, yi_, xf_, yf_) {
    //  Corners mode: top left corner, bottom right corner
    this.data.bounds = {}
    this.data.bounds.xi = xi_
    this.data.bounds.yi = yi_
    this.data.bounds.xf = xf_
    this.data.bounds.yf = yf_
    this.data.bounds.xwidth = xf_ - xi_
    this.data.bounds.yheight = yf_ - yi_
  }

  /**
   */
  drawAxesAndLabels() {
    //  call old variables as the new variables / localize data vars
    let sgx = this.data.graphStartEnd.sgx // 1/8
    let sgy = this.data.graphStartEnd.sgy // 7/8
    let egx = this.data.graphStartEnd.egx // 7/8
    let egy = this.data.graphStartEnd.egy // 1/8
    let wid = this.data.bounds.xwidth
    let hei = this.data.bounds.yheight
    let obj = this.data

    //  draw axes in:
    line(wid * sgx, hei * egy, wid * sgx, hei * sgy)
    line(wid * sgx, hei * sgy, wid * egx, hei * sgy)

    textFont('Helvetica')
    //  draw x axis labels:
    textAlign(CENTER, TOP)
    let xNum = (obj.xMax - obj.xMin) / obj.xInterv
    for (let i = 0; i <= xNum; i++) {
      let x = (wid * sgx) + i * (wid * (egx - sgx) / xNum)
      if (x <= egx * wid) {
        fill(0)
        noStroke()
        text(this.roundTo(obj.xMin + obj.xInterv * i, 5), x, hei * sgy + 3)
        if (this.data.drawGridLines) {
          strokeWeight(0.2)
          stroke(80)
          line(x, hei * egy, x, hei * sgy)
        }
      }
    }

    //  draw y axis labels:
    textAlign(RIGHT, CENTER)
    let yNum = (obj.yMax - obj.yMin) / obj.yInterv
    for (let i = 0; i <= yNum; i++) {
      let y = hei * sgy - i * (hei * (sgy - egy) / yNum)
      if (y >= egy * hei) {
        fill(0)
        noStroke()
        text(this.roundTo(obj.yMin + obj.yInterv * i, 5), wid * sgx - 3, y)
        if (this.data.drawGridLines) {
          strokeWeight(0.3)
          stroke(80)
          line(wid * sgx, y, wid * egx, y)
        }
      }
    }
  }

  /**
   */
  drawFunctionsOnCanvas() {
    //  call old variables as the new variables / localize data vars
    let sgx = this.data.graphStartEnd.sgx // 1/8
    let sgy = this.data.graphStartEnd.sgy // 7/8
    let egx = this.data.graphStartEnd.egx // 7/8
    let egy = this.data.graphStartEnd.egy // 1/8
    let wid = this.data.bounds.xwidth
    let hei = this.data.bounds.yheight
    let obj = this.data

    //  to store most most recent pixels for each function:
    let lastOne = []
    for (let i = 0; i < obj.functs.length; i++) {
      lastOne[i] = []
    }
    //  for all pixels in graph range:
    for (let xPixel = wid * sgx; xPixel <= wid * egx; xPixel++) {
      //  xPixel -> xNum
      let xRel = xPixel - (wid * sgx)
      let xPixToNumScl = (obj.xMax - obj.xMin) / (wid * (egx - sgx))
      let xNum = xRel * xPixToNumScl + obj.xMin

      //  use func to find yNum from xNum
      for (let i = 0; i < obj.functs.length; i++) {
        let yNum = obj.functs[i].func(xNum)

        //  skipiteration if out of range
        if (yNum >= obj.yMax || yNum <= obj.yMin) {
          lastOne[i] = []
          continue
        }

        //  use yNum to find yPixel
        let yRel = yNum - obj.yMin
        let yNumToPixScl = (hei * (sgy - egy)) / (obj.yMax - obj.yMin)
        let yPixel = (hei * sgy) - (yRel * yNumToPixScl)

        //  create function:
        stroke(this.getColor(obj.functs[i].color))
        strokeWeight(2)
        if (lastOne[i].length !== 0) { //  checks that LastOne[i] != []
          line(xPixel, yPixel, lastOne[i][0], lastOne[i][1]) // lines between pixels
          //  ellipse(xPixel,yPixel,1) // no lines between pixels
        }

        lastOne[i] = [xPixel, yPixel]
      }
    }
  }

  /**
   * @param  {Number} x1
   * @param  {Number} y1
   * @param  {Number} x2
   * @param  {Number} y2
   */
  numLine(x1, y1, x2, y2) {
    line(this.numToPixelX(x1), this.numToPixelY(y1), this.numToPixelX(x2), this.numToPixelY(y2))
  }

  

  /**
   * @param  {Number} point -- takes in number
   * @returns {Number} -- spits out pixel
   */
  numToPixelX(point) {
    //  call old variables as the new variables / localize data vars
    let sgx = this.data.graphStartEnd.sgx // 1/8
    let egx = this.data.graphStartEnd.egx // 7/8
    let wid = this.data.bounds.xwidth
    let obj = this.data

    let xPixToNumScl = (wid * (egx - sgx)) / (obj.xMax - obj.xMin)
    let x = (wid * sgx) + ((point - obj.xMin) * xPixToNumScl)
    return x
  }

  /**
   * @param  {Number} point -- takes in number
   * @returns {Number} -- spits out pixel
   */
  numToPixelY(point) {
    //  call old variables as the new variables / localize data vars
    let sgy = this.data.graphStartEnd.sgy // 7/8
    let egy = this.data.graphStartEnd.egy // 1/8
    let hei = this.data.bounds.yheight
    let obj = this.data

    let yPixToNumScl = (hei * (sgy - egy)) / (obj.yMax - obj.yMin)
    let y = (hei * sgy) - ((point - obj.yMin) * yPixToNumScl)
    return y
  }
  
  /**
   */
  drawPointsOnCanvas() {
    let obj = this.data

    //  Uncertainties:
    if (obj.points.uncertainties && obj.points.values) {
      for (let i = 0; i < obj.points.values.length; i++) {
        //  draw uncerts:
        let [x, y] = obj.points.values[i]
        let [v, w] = obj.points.uncertainties[i] //  v = x uncertainty   w = y uncertainty

        stroke(0)
        strokeWeight(.8)
        //  two big boi lines:
        this.numLine(x, (y - w), x, y + w)
        this.numLine(x - v, (y), x + v, y)
        //  perpindicular bois
        this.numLine(x - (w / 12), y - w, x + (w / 12), y - w)
        this.numLine(x - (w / 12), y + w, x + (w / 12), y + w)
        this.numLine(x - v, y - (w / 12), x - v, y + (w / 12))
        this.numLine(x + v, y - (w / 12), x + v, y + (w / 12))
      }
    }
    //  Points:
    if (obj.points.values) {
      for (let i = 0; i < obj.points.values.length; i++) {
        //  draw pixel:
        fill(this.getColor(obj.points.color))
        stroke(0)
        strokeWeight(0.5)
        let px = this.numToPixelX(obj.points.values[i][0])
        let py = this.numToPixelY(obj.points.values[i][1])
        ellipse(px, py, 3)
      }
    }
  }

  /**
   */
  addAxesLabels() {
    let wid = this.data.bounds.xwidth
    let hei = this.data.bounds.yheight

    noStroke()
    fill(0)
    textAlign(CENTER)

    //y label:
    if (this.data.yLabel) {
      textSize(this.data.fontSizes.yLabel)
      push()
      let xY = (wid / 16) + this.data.yLabel.coordsOffset[0]
      let yY = (hei / 2) + this.data.yLabel.coordsOffset[1]
      translate(xY, yY)
      rotate(-1 * Math.PI / 2)
      text(this.data.yLabel.value, 0, 0)
      pop()
    }

    //x label:
    if (this.data.xLabel) {
      textSize(this.data.fontSizes.xLabel)
      let xX = (wid / 2) + this.data.xLabel.coordsOffset[0]
      let yX = (hei / 16 * 15) + this.data.xLabel.coordsOffset[1]
      text(this.data.xLabel.value, xX, yX)
    }

    //title:
    if (this.data.title) {
      textSize(this.data.fontSizes.title)
      let xT = (wid / 2) + this.data.title.coordsOffset[0]
      let yT = (hei / 9) + this.data.title.coordsOffset[1]
      text(this.data.title.value, xT, yT)
    }


  }

  /**
   * @param  {Boolean} label=true
   * @param  {String || Object} color="RED"
   * @returns {null || undefined}
   */
  bestfit(label = true, color = "RED") {
    if (!this.data.points.values) {
      console.log('NO DATA POINTS: input data points with addpoints([x],[y]) to use bestfit() function')
      return
    }
    let [m, b] = this.regression(this.data.points.values)
    this.addFunc(x => (x * m) + b, color)
  }
  
  /**
   */
  show() {
    // assume use of whole canvas
    if (!this.data.bounds) this.canvasLocation(0, 0, width, height)
    if (!this.data.backgroundCol) this.backgroundCol([255, 255, 255])

    console.log(this.data)

    //  translate to allocated area to draw the xy data
    push()
    translate(this.data.bounds.xi, this.data.bounds.yi)
    fill(this.data.backgroundCol[0], this.data.backgroundCol[1], this.data.backgroundCol[2])
    rectMode(CORNERS)
    rect(0, 0, this.data.bounds.xwidth, this.data.bounds.yheight)

    if (this.data.type === 'xy') {
      this.drawAxesAndLabels()
      this.drawFunctionsOnCanvas()
      this.drawPointsOnCanvas()
      this.addAxesLabels()
    }
    else if (this.data.type === 'pie') {
      this.addAxesLabels()
      this.drawPieChart()
      if (this.data.boolDrawLegend) this.drawLegend()
    }
    else if (this.data.type === 'histogram') {
      this.drawHisto()
    }
    pop()
  }

  /**
   */
  drawHisto() {
  }
  
  /**
   */
  drawLegend() {
    let len = Object.keys(this.data.slices.obj).length

    let startY = 1 / 5 * this.data.bounds.yheight
    let endY = 4 / 5 * this.data.bounds.yheight
    let x = 2 / 3 * this.data.bounds.xwidth

    let keys = Object.keys(this.data.slices.obj)
    let vals = Object.values(this.data.slices.obj)
    for (let i = 0; i < len; i++) {
      fill(this.getColor(this.data.slices.sliceColors[i]))
      rect(x, startY + (((endY - startY) / len) * i), x + 15, startY + 10 + (((endY - startY) / len) * i))
      fill(0)
      textAlign(LEFT, CENTER)
      stroke(0)
      strokeWeight(.3)
      textSize(this.data.fontSizes.legend)
      let str = keys[i] + ' - ' + vals[i]
      if (this.data.slices.measureType == 'percent') str += '%'
      text(str, x + 25, startY + (((endY - startY) / len) * i) + 5)
    }

  }
  
  /**
   */
  drawPieChart() {
    let obj = this.data.slices.obj
    let bounds = this.data.bounds

    let total = 0
    for (let element in obj) {
      total += obj[element]
    }

    if (this.data.slices.measureType === 'percent' && total !== 100) {
      throw new Error('when using percent mode for slices(), your values must total 100%')
    }

    let angles = {}
    for (let element in obj) {
      angles[element] = (obj[element] / total) * (2 * PI)
    }

    let currentAng = 0
    let i = 0
    for (let element in obj) {
      let min = 0
      fill(this.getColor(this.data.slices.sliceColors[i]))
      stroke(0)
      strokeWeight(.3)
      push()
      translate(bounds.xwidth / 3, bounds.yheight / 2)
      arc(0, 0, bounds.xwidth / 2, bounds.xwidth / 2, currentAng, currentAng + angles[element], PIE)
      pop()
      currentAng += angles[element]
      i++
    }

    console.log(angles)
  }

  /**
   * Checks that arrays are the same length and all are numbers
   * @param  {Object} x 
   * @param  {Object} y
   * @returns {Boolean}
   */
  arraysInvalid(x, y) {  //  checks that length of sets are same, and all are numbers
    return x.length !== y.length || x.some(isNaN) || y.some(isNaN)
  }

  /**
   * @param  {Number} value
   * @param  {Number} decimals
   * @returns  {Number} {returnNumber(Math.round(value+'e'+decimals
   */
  roundTo(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
  }

  
  /**
   * @param  {Object} data in point form
   * @returns {Object} - [m,b] where {y = mx + b}
   */
  regression(data) {
    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumXX = 0
    let count = 0
    let m
    let b

    if (data.length === 0) {
      throw new Error('Empty data')
    }

    // calculate sums
    for (let i = 0, leng = data.length; i < leng; i++) {
      let point = data[i]
      sumX += point[0]
      sumY += point[1]
      sumXX += point[0] * point[0]
      sumXY += point[0] * point[1]
      count++
    }

    // calculate slope (m) and y-intercept (b) for f(x) = m * x + b
    m = (count * sumXY - sumX * sumY) / (count * sumXX - sumX * sumX)
    b = (sumY / count) - (m * sumX) / count

    return [m, b]
  }
  
  /**
   * @param  {} slicesObj_
   * @param  {} measure_
   */
  slices(slicesObj_, measure_) {
    if (typeof slicesObj_ !== 'object') throw new Error('an object must be passed into slices()')
    this.data.slices.obj = slicesObj_
    this.data.slices.measureType = measure_
  }
}