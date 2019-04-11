var leng

var x = [0, 1, 2, 3, 4, 5]
var y = [0, .5, 1, 1.5, 2, 2.5]
var xUncerts = [.3, .2, .12, .2, .1, .1]
var yUncerts = [.12, .3, .2, .12, .1, .2]

var method1min
var method1max
var method2min
var method2max
var method3min
var method3max
var methods = [[method1min,method1max],[method2min,method2max],[method3min,method3max]]

var latexMethod1min
var latexMethod1max
var latexMethod2min
var latexMethod2max
var latexMethod3min
var latexMethod3max
var latexMethods = [[latexMethod1min,latexMethod1max],[latexMethod2min,latexMethod2max],[latexMethod3min,latexMethod3max]]


var calculator

function createCalc() {
  elt = document.getElementById('calculator');
  options = {
    expressionsCollapsed: true,
    settingsMenu: false
    }
  calculator = Desmos.GraphingCalculator(elt, options);
}

function processData() {
  //checks that all inputted data is same length
  if (x.length != y.length || xUncerts.length != yUncerts.length || x.length != xUncerts.length) {
    //data bad, do something
    alert('data bad')
    console.log('data bad')
  } else {
    leng = x.length
  }


  method1min = regression(dataMethod1(x, y, 'min'))
  method1max = regression(dataMethod1(x, y, 'max'))
  method2min = regression(dataMethod2(x, y, 'min'))
  method2max = regression(dataMethod2(x, y, 'max'))
  method3min = regression(dataMethod3(x, y, 'min'))
  method3max = regression(dataMethod3(x, y, 'max'))
  methods = [[method1min,method1max],[method2min,method2max],[method3min,method3max]]

  latexMethod1min = 'y=x*' + method1min[0] + '+' + method1min[1]
  latexMethod1max = 'y=x*' + method1max[0] + '+' + method1max[1]
  latexMethod2min = 'y=x*' + method2min[0] + '+' + method2min[1]
  latexMethod2max = 'y=x*' + method2max[0] + '+' + method2max[1]
  latexMethod3min = 'y=x*' + method3min[0] + '+' + method3min[1]
  latexMethod3max = 'y=x*' + method3max[0] + '+' + method3max[1]
  latexMethods = [[latexMethod1min,latexMethod1max],[latexMethod2min,latexMethod2max],[latexMethod3min,latexMethod3max]]

  //create tab;e
  calculator.setExpression({
    type: 'table',
    id: 'table',
    columns: [
      {
        latex: 'x_{1}',
        values: x.map(String)
      }, {
        latex: 'x_{uncert}',
        values: xUncerts.map(String),
        hidden: true
      }, {
        latex: 'y_{1}',
        values: y.map(String),
        dragMode: Desmos.DragModes.XY
      }, {
        latex: 'y_{uncert}',
        values: yUncerts.map(String),
        hidden: true
      }
    ]
  });

  //create x and y restrictions to create error bars
  //as well as caps on the end of them
  calculator.setExpression({
    id: "xRestrictions",
    color: Desmos.Colors.BLACK,
    latex: 'x = x_{1} \\left\\{y_{1} - y_{uncert} < y < y_{1} + y_{uncert}\\right\\}'
  });
  calculator.setExpression({
    id: "yRestrictions",
    color: Desmos.Colors.BLACK,
    latex: 'y = y_{1} \\left\\{x_{1} - x_{uncert} < x < x_{1} + x_{uncert}\\right\\}'
  });
  calculator.setExpression({
    id: "xRightVertical",
    color: Desmos.Colors.BLACK,
    latex: 'x=x_1+x_{uncert}\\left\\{y_1-\\frac{x_{uncert}}{8}<y<y_1+\\frac{x_{uncert}}{8}\\right\\}'
  });
  calculator.setExpression({
    id: "xLeftVertical",
    color: Desmos.Colors.BLACK,
    latex: 'x=x_1-x_{uncert}\\left\\{y_1-\\frac{x_{uncert}}{8}<y<y_1+\\frac{x_{uncert}}{8}\\right\\}'
  });
  calculator.setExpression({
    id: "yTopHorizontal",
    color: Desmos.Colors.BLACK,
    latex: 'y=y_1+y_{uncert}\\left\\{x_1-\\frac{y_{uncert}}{8}<x<x_1+\\frac{y_{uncert}}{8}\\right\\}'
  });
  calculator.setExpression({
    id: "yBottomHorizontal",
    color: Desmos.Colors.BLACK,
    latex: 'y=y_1-y_{uncert}\\left\\{x_1-\\frac{y_{uncert}}{8}<x<x_1+\\frac{y_{uncert}}{8}\\right\\}'
  });
}

//uses first and last value - far corners of each
function dataMethod1(x, y, minmax) {
  mult = -1
  if (minmax == 'max') mult = 1
  return [
    [x[0] + (xUncerts[0] * mult), y[0] - (yUncerts[0] * mult)],
    [x[leng - 1] - (xUncerts[leng - 1] * mult), y[leng - 1] + (yUncerts[leng - 1] * mult)]
  ]
}

// uses a weighted average of all vals
function dataMethod2(x, y, minmax) {
  data = []
  mult = -1
  if (minmax == 'max') mult = 1
  for (let i = 0; i < leng; i++) {
    range = x[leng - 1] - x[0]
    distFromMin = x[i] - x[0]
    scaler = mult * Math.cos(distFromMin / range * Math.PI)

    xVal = x[i] + (xUncerts[i] * scaler)
    yVal = y[i] - (yUncerts[i] * scaler)
    data[i] = [xVal, yVal]

  }
  return data
}

//uses first and last value - far sides of each
function dataMethod3(x, y, minmax) {
  mult = -1
  if (minmax == 'max') mult = 1
  return [
    [x[0], y[0] - (yUncerts[0] * mult)],
    [x[leng - 1], y[leng - 1] + (yUncerts[leng - 1] * mult)]
  ]
}

function clearAll() {
  clearLines()
  clearCommonExpressions()

  document.getElementsByClassName("dataInputCSV")[0].value = ""
  document.getElementsByClassName("dataInputCSV")[1].value = ""
  document.getElementsByClassName("dataInputCSV")[2].value = ""
  document.getElementsByClassName("dataInputCSV")[3].value = ""

  document.querySelector('#showEquations').innerHTML = "Equation will show up here."
}

function clearLines() {
  calculator.removeExpression({ id: 'latexMethod1min' })
  calculator.removeExpression({ id: 'latexMethod1max' })
  calculator.removeExpression({ id: 'latexMethod2min' })
  calculator.removeExpression({ id: 'latexMethod2max' })
  calculator.removeExpression({ id: 'latexMethod3min' })
  calculator.removeExpression({ id: 'latexMethod3max' })
}

function clearCommonExpressions() {
  calculator.removeExpression({ id: 'table' })
  calculator.removeExpression({ id: 'xRestrictions' })
  calculator.removeExpression({ id: 'yRestrictions' })
  calculator.removeExpression({ id: 'xRightVertical' })
  calculator.removeExpression({ id: 'xLeftVertical' })
  calculator.removeExpression({ id: 'yTopHorizontal' })
  calculator.removeExpression({ id: 'yBottomHorizontal' })
}

function prettyEquations(min, max) {
  mMin = round(min[0],4)
  bMin = round(min[1],4)
  mMax = round(max[0],4)
  bMax = round(max[1],4)

  mAvg = round((min[0] + max[0])/2,4)
  bAvg = round((min[1] + max[1])/2,4)

  mUnc = round(max[0] - (min[0] + max[0])/2,4)
  bUnc = round(max[1] - (min[1] + max[1])/2,4)


  return "Minimum Slope: y = " + mMin + "x + " + bMin + "<br> Maximum Slope: y = " + mMax + "x + " + bMax + "<br> Average: y = " + mAvg + "x ±" + mUnc + " + " + bAvg + " ±" + bUnc
}

//input should be integer
function addLines(type){
  clearLines()

  calculator.setExpression({
    id: 'latexMethod'+type+'min',
    latex: latexMethods[type-1][0]
  });
  calculator.setExpression({
    id: 'latexMethod'+type+'max',
    latex: latexMethods[type-1][1]
  });

  document.querySelector('#showEquations').innerHTML = prettyEquations(methods[type-1][0], methods[type-1][1])
}

function updateCSVData() {
  if (document.getElementById('comma').checked == true) {
    delim = ','
  } else if (document.getElementById('space').checked == true) {
    delim = ' '
  }

  x = document.getElementsByClassName("dataInputCSV")[0].value.split(delim).map(Number);
  xUncerts = document.getElementsByClassName("dataInputCSV")[1].value.split(delim).map(Number);
  y = document.getElementsByClassName("dataInputCSV")[2].value.split(delim).map(Number);
  yUncerts = document.getElementsByClassName("dataInputCSV")[3].value.split(delim).map(Number);

  arr = [x, xUncerts, y, yUncerts]
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i].length - 1; j >= 0; j--) {
      if (arr[i][j] == ' ' || arr[i][j] == ',' || arr[i][j] == '\t') {
        arr[i].splice(j, 1)
      }
    }
  }

  clearLines();
  clearCommonExpressions();

  processData();
}
