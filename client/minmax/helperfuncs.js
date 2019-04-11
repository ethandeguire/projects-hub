function fixHeight() {
  var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  document.getElementById("calculator").style.height = h * 44 / 100 + "px";
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

//stolen least squares algo
function regression(data) {
  var sum_x = 0, sum_y = 0
    , sum_xy = 0, sum_xx = 0
    , count = 0
    , m, b;

  if (data.length === 0) {
    throw new Error('Empty data');
  }

  // calculate sums
  for (var i = 0, leng = data.length; i < leng; i++) {
    var point = data[i];
    sum_x += point[0];
    sum_y += point[1];
    sum_xx += point[0] * point[0];
    sum_xy += point[0] * point[1];
    count++;
  }

  // calculate slope (m) and y-intercept (b) for f(x) = m * x + b
  m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x);
  b = (sum_y / count) - (m * sum_x) / count;

  return [m, b]
}
