var grph

function setup() {
  createCanvas(500, 500)
  background(60)

  grph = new Graph('xy')
  grph.xLabel('Radius (m)')
  grph.yLabel('Velocity (m/s)')
  grph.title('Radius v Velocity', [0, 20])
  
  grph.addPoints([4, 5, 6], [1, 2, 3])
  grph.addPointUncert([0.1, 0.1, 0.1], [0.2, 0.2, 0.2])

  // grph.addPoints([0.1, 0.2, 0.3, 0.4, 0.5,], [1.25, 2.3, 3.23, 3.57, 4.26], "GREEN")
  // grph.addPointUncert([.005, .005, .005, .005, .005], [0.302, 0.202, 0.361, .230, .198])

  grph.bestfit(true, "ORANGE")

  // grph.addFunc(x => Math.sin(10 * x), color = 'BLUE')
  // grph.addFunc(Math.cos, color = 'GREEN')
  grph.addFunc(x => Math.asin(x))
  // grph.addFunc(x => 0.5 * x, color = 'RED')
  // grph.addFunc(function(x){return pow(2,x)}, color = 'YELLOW')

  grph.xInterv(1)
  grph.yInterv(1)
  // grph.xlimits(0, 0.6)
  // grph.ylimits(0, 5)
  grph.axis(0, 8, 0, 5)

  grph.canvasLocation(69, 69, 420, 420)
  // grph.backgroundCol('GREY')
  // grph.drawGridLines(true)
  grph.show()
}

function draw() {
}

