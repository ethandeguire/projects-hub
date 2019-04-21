/* script.js */
function setup() {
  createCanvas(500, 500)
  background(60)

  let grph = new Graph('xy')
  grph.xLabel('Radius (m)')
  grph.yLabel('Velocity (m/s)')
  grph.title('Radius v Velocity', [0, 20])
  
  grph.addPoints([4, 5, 6], [1, 2, 3])
  grph.addPointUncert([0.1, 0.1, 0.1], [0.2, 0.2, 0.2])

  grph.bestfit(true, "ORANGE")

  grph.addFunc(x => Math.sin(5 * x)+3, color = 'BLUE')
  grph.addFunc(Math.cos, color = 'GREEN')
  grph.addFunc(x => Math.sin(x) + 2)

  grph.xInterv(1)
  grph.yInterv(1)
  grph.axis(0, 8, 0, 5)

  grph.canvasLocation(70,70, 450, 450)
  grph.show()
}