function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

//  stolen least squares algo
function regression(data) {
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
  for (var i = 0, leng = data.length; i < leng; i++) {
    var point = data[i]
    sumX += point[0]
    sumY += point[1]
    sumXX += point[0] * point[0]
    sumXY += point[0] * point[1]
    count++
  }

  // calculate slope (m) and y-intercept (b) for f(x) = m * x + b
  m = (count * sumXY - sumX * sumY) / (count * sumXX - sumX * sum_x)
  b = (sumY / count) - (m * sumX) / count

  return [m, b]
}

// /**
//  * 
//  * @param {Function} predict 
//  * @param {Array} data 
//  * @returns {Object} 
//  */
// function getRSquared(predict, data) {
//     var yAxis = data;
//     var rPrediction = [];

//     var meanValue = 0; // MEAN VALUE
//     var SStot = 0; // THE TOTAL SUM OF THE SQUARES
//     var SSres = 0; // RESIDUAL SUM OF SQUARES
//     var rSquared = 0;

//     // SUM ALL VALUES
//     for (var n in yAxis) { meanValue += yAxis[n]; }

//     // GET MEAN VALUE
//     meanValue = (meanValue / yAxis.length);

//     for (var n in yAxis) { 
//         // CALCULATE THE SSTOTAL    
//         SStot += Math.pow(yAxis[n] - meanValue, 2); 
//         // REGRESSION PREDICTION
//         rPrediction.push(predict(n));
//         // CALCULATE THE SSRES
//         SSres += Math.pow(rPrediction[n] - yAxis[n], 2);
//     }

//     // R SQUARED
//     rSquared = 1 - (SSres / SStot);

//     return {
//         meanValue: meanValue,
//         SStot: SStot,
//         SSres: SSres,
//         rSquared: rSquared
//     };
// }

// var result = getRSquared((x) => { return (6 * x) - 5 }, [0, 1, 4, 9, 16, 25, 36]);