/* histoSample.js */
function setup() {
  createCanvas(700, 400)
  background(60)

  let grph = new Graph('histogram')
  
  // grph.mode('points')
  // grph.mode('stdDev')
  grph.mode('custom', 1.51)

  grph.addData([1,2,3,4,5,6,7,8,9,10,10])
  
  grph.showStats(true)

  grph.canvasLocation(20,10, 690, 390)
  grph.show()
}