/* pieSample.js */
function setup() {
  createCanvas(500, 500)
  background(60)

  let grph = new Graph('pie')
  grph.title('My Favorite Foods')

  // These two make the same pie chart:
  grph.slices({ 'Pineapple': 5, 'Cherry': 30, 'oo': 5, 'pp': 10, 'll': 10, 'kk': 5, 'mm': 35 }, 'percent')
  // grph.slices({'pineapple': 50, 'cherry': 50}, 'percent')

  // grph.noLegend();

  grph.canvasLocation(50, 50, 450, 450)
  grph.show()
}