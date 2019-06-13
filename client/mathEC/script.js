function calculate(type) {
  let elts = document.getElementsByName(type)
  nums = {}
  for (let elt of elts) {
    console.log("HERE", elt.valueAsNumber, NaN)
    if (Number.isNaN(elt.valueAsNumber)) {
      alert(elt.value + "is not a number, make sure to input a number")
      return 'null'
    } else {

      nums[elt.id] = elt.valueAsNumber
    }
  }

  let output = []
  let triangleCount
  if (type === 'SSAINPUT') {
    let a = nums['a']
    let b = nums['b']
    let A = nums['A']
    let bsinA = round(b * Math.sin(A * Math.PI / 180), 3)
    output.push("This is an SSA triangle, meaing we could have an ambiguous case of the law of sines or cosines.")
    output.push("Let's use our rules to figure out if we have 0, 1, or 2 triangles, here are the rules")
    output.push("    a < bsin(A): 0 triangles")
    output.push("    a = bsin(A): 1 triangle")
    output.push("    bsinA < a < b: 2 triangles")
    output.push("    a >= b: 1 triangle")
    output.push("According to your input, a=" + a + " and bsinA=" + nums['b'] + "sin(" + nums['A'] + ")=" + round(bsinA, 4))

    if (a < bsinA) {
      output.push("Because " + a + " is less than " + bsinA + ", there are 0 possible triangles, and we are done here.")
      triangleCount = 0
    } if (a == bsinA) {
      output.push("Because " + a + " is equal to " + bsinA + ", there is 1 possible triangle")
      triangleCount = 1
    } if (bsinA < a && a < b) {
      output.push("Because " + bsinA + " is less than " + a + " and " + a + " is less than" + b + ", there are 2 possible triangles")
      triangleCount = 2
    } if (a >= b) {
      output.push("Because " + a + " is greater than or equal to " + bsinA + ", there is 1 possible triangle")
      triangleCount = 1
    }

    if (triangleCount === 1) {
      output.push("At this point, we can solve for the rest of the triangle using the law of sines, or the law of cosines")
      output.push("We will start by using the law of sines:")
      let B = round(180 * Math.asin(bsinA / a) / Math.PI, 3)
      output.push("sinA / a = sinB / b   =>   B = arcsin(bsinA/a) = arcsin(" + b + "sin(" + A + ")" + "/" + a + ") = " + B + "°")
      output.push("Then we have 2 of 3 angles, and sum of angles of a triangle must be 180")
      let C = round(180 - A - B, 3)
      output.push("Finding last angle, C = 180° - A - B = 180° - " + A + " - " + B + " = " + C)
      output.push("The last side can be found using law of sines:")
      let c = round(a * Math.sin(C * Math.PI / 180) / Math.sin(A * Math.PI / 180), 3)
      output.push("c / sinC = a / sinA   =>   c = asinC / sinA = " + a + "sin(" + C + ") /" + "sin(" + A + ") = " + c)
      output.push("We have now solved this triangle, keep in mind there are other ways to do it!")
    }
    if (triangleCount === 2) {
      output.push("We know that we are solving for two possible triangles, so lets solve for the first one")

      // T1
      output.push("We will start by using the law of sines:")
      let B1 = round(180 * Math.asin(bsinA / a) / Math.PI, 3)
      output.push("sinA / a = sinB1 / b   =>   B1 = arcsin(bsinA/a) = arcsin(" + b + "sin(" + A + ")" + "/" + a + ") = " + B1 + "°")
      output.push("Then we have 2 of 3 angles, and sum of angles of a triangle must be 180°")
      let C1 = round(180 - A - B1, 3)
      output.push("Finding last angle, C1 = 180° - A - B1 = 180° - " + A + " - " + B1 + " = " + C1)
      output.push("The last side can be found using law of sines:")
      let c1 = round(a * Math.sin(C1 * Math.PI / 180) / Math.sin(A * Math.PI / 180), 3)
      output.push("c1 / sinC1 = a / sinA   =>   c1 = asinC1 / sinA = " + a + "sin(" + C1 + ") /" + "sin(" + A + ") = " + c1)
      output.push("-")
      output.push("We have now solved this for the first triangle, now we can solve for the other one.")

      // T2
      output.push("-")
      output.push("We will start by using the law of sines, and subtracting our answer from 180°:")
      let B2 = round(180 - (180 * Math.asin(bsinA / a) / Math.PI), 3)
      output.push("sinA / a = sinB2 / b   =>   B2 = 180 - arcsin(bsinA/a) = 180 -arcsin(" + b + "sin(" + A + ")" + "/" + a + ") = " + B2 + "°")
      output.push("Then we have 2 of 3 angles, and sum of angles of a triangle must be 180")
      let C2 = round(180 - A - B2, 3)
      output.push("Finding last angle, C2 = 180° - A - B2 = 180° - " + A + " - " + B2 + " = " + C2)
      output.push("The last side can be found using law of sines:")
      let c2 = round(a * Math.sin(C2 * Math.PI / 180) / Math.sin(A * Math.PI / 180), 3)
      output.push("c2 / sinC2 = a / sinA   =>   c2 = asinC2 / sinA = " + a + "sin(" + C2 + ") /" + "sin(" + A + ") = " + c2)
      output.push("-")
      output.push("<b>Triangle 1:</b>")
      output.push("<div class='tab'>A=" + A + "°")
      output.push("<div class='tab'>a=" + a)
      output.push("<div class='tab'>B=" + B1 + "°")
      output.push("<div class='tab'>b=" + b)
      output.push("<div class='tab'>C=" + C1 + "°")
      output.push("<div class='tab'>c=" + c1)
      output.push("<b>Triangle 2:</b>")
      output.push("<div class='tab'>A=" + A + "°")
      output.push("<div class='tab'>a=" + a)
      output.push("<div class='tab'>B=" + B2 + "°")
      output.push("<div class='tab'>b=" + b)
      output.push("<div class='tab'>C=" + C2 + "°")
      output.push("<div class='tab'>c=" + c2)
    }
  }

  if (type === 'SSSINPUT') {
    let a = nums['a']
    let b = nums['b']
    let c = nums['c']

    output.push("This is a SSS triangle, meaning there is one possible triangle, which we will find the angles for now")
    output.push("To minimize chances of an arithmetic error, we will use the law of cosines 3 times")
    output.push("c<sup>2</sup> = a<sup>2</sup> + b<sup>2</sup> - 2ab*cos(C)")
    output.push("cosC = (c<sup>2</sup> - a<sup>2</sup> - b<sup>2</sup>) / -2ab")
    output.push("C = arccos((" + c + "<sup>2</sup> -" + a + "<sup>2</sup> - " + b + "<sup>2</sup>)/(-2*" + a + "*" + b + ")) = " + cosinesAngle(a, b, c) + "°")
    output.push("B = arccos((" + b + "<sup>2</sup> -" + a + "<sup>2</sup> - " + c + "<sup>2</sup>)/(-2*" + a + "*" + c + ")) = " + cosinesAngle(a, c, b) + "°")
    output.push("A = arccos((" + a + "<sup>2</sup> -" + b + "<sup>2</sup> - " + c + "<sup>2</sup>)/(-2*" + b + "*" + c + ")) = " + cosinesAngle(b, c, a) + "°")
    output.push("")
  }

  if (type === 'ASAINPUT') {
    let A = nums['A']
    let c = nums['c']
    let B = nums['B']


    output.push("When we have Angle-Angle-Side, we can find the 3rd angle because we know the sum of angles in a triangle is 180 degrees")
    let C = round(180 - A - B, 3)
    output.push("C = 180° - A - B = 180° -" + A + "° - " + B + "° =" + C + "°")
    output.push("We will use the law of sines to find the other two sides:")

    output.push('---')

    output.push("a / sinA = c / sinC   =>   a = csinA / sinC")
    let a = round(c * Math.sin(rads(A)) / Math.sin(rads(C)), 3)
    output.push("a = " + c + "sin(" + A + ")/ sin(" + c + ") = " + a)

    output.push('---')

    output.push("b / sinB = c / sinC   =>   b = csinB / sinC")
    let b = round(c * Math.sin(rads(B)) / Math.sin(rads(C)), 3)
    output.push("b = " + c + "sin(" + b + ")/ sin(" + c + ") = " + b)

  }

  if (type === 'AASINPUT') {
    let A = nums['A']
    let B = nums['B']
    let a = nums['a']

    output.push("When we have Angle-Angle-Side, we can find the 3rd angle because we know the sum of angles in a triangle is 180 degrees")
    let C = round(180 - A - B, 3)
    output.push("C = 180° - A - B = 180° -" + A + "° - " + B + "° =" + C + "°")
    output.push("We will use the law of sines to find the other two sides:")

    output.push('---')

    output.push("b / sinB = a / sinA   =>   b = asinB / sinA")
    let b = round(a * Math.sin(rads(B)) / Math.sin(rads(A)), 3)
    output.push("a = " + a + "sin(" + B + ")/ sin(" + A + ") = " + a)

    output.push('---')

    output.push("c / sinC = a / sinA   =>   c = asinC / sinA")
    let c = round(a * Math.sin(rads(C)) / Math.sin(rads(A)), 3)
    output.push("b = " + a + "sin(" + C + ")/ sin(" + A + ") = " + b)
  }

  if (type === 'AAAINPUT') {
    let A = nums['A']
    let B = nums['B']
    let C = nums['C']

    if (round(A + B + C, 3) != 180) {
      output.push("This triangle is invalid, the sum of the angles is " + (A + B + C) + "°, it should be 180°")
    } else {
      output.push("When we have Angle-Angle-Angle, we can't find any of the sides, because we only know the angles between the triangles")
      output.push("Think about it like this - this is a shape that we could scale up or down to be any size, so we can't solve for anything")
      output.push("A = " + A + "°")
      output.push("B = " + B + "°")
      output.push("C = " + C + "°")
    }
  }

  console.log(output)


  //remove old div if it exists
  let old = document.getElementById(type.substring(0, 3) + 'contain')
  if (old) old.parentNode.removeChild(old)

  //create new contain div
  let containdiv = document.createElement("div")
  containdiv.id = type.substring(0, 3) + 'contain'

  // add output to container div
  for (let i of output) {
    let para = document.createElement("p")
    para.appendChild(document.createTextNode(''));
    para.innerHTML = i
    para.name = type.substring(0, 3) + 'answer'

    containdiv.appendChild(para)
  }
  document.getElementById(type.substring(0, 3)).appendChild(containdiv)
}


function cosinesAngle(a, b, c) {
  return round(Math.acos((Math.pow(c, 2) - (Math.pow(a, 2) + Math.pow(b, 2))) / (-2 * a * b)) * 180 / Math.PI, 3)
}

function rads(degrees) {
  return degrees * Math.PI / 180
}

function degs(rads) {
  return rads * 180 / Math.PI
}

function showHide(divID) {
  var x = document.getElementById(divID);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}