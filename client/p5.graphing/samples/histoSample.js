/* histoSample.js */
function setup() {
  createCanvas(700, 400)
  background(60)

  let grph = new Graph('histogram')
  
  // grph.mode('points')
  // grph.mode('stdDev')
  grph.mode('points')

  grph.colorMode({'fade':['BLACK','WHITE'], 'background':'PURPLE'})

  grph.addData([1,2,2,2,3,3,3,3,3,4,4,4,5])
  
  grph.showStats(true)

  grph.canvasLocation(20,10, 690, 390)
  grph.show()
}