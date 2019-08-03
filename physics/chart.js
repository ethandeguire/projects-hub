//   = [[x],[xuncerts],[y],[yuncerts]]
let nonNormalizedData = [[], [], [], []]

//   = [[x],[xuncerts],[y],[yuncerts]]
let normalizedData = [[], [], [], []]

function clearAll() {
  document.getElementById('xVals').value = ''
  document.getElementById('xUncerts').value = ''
  document.getElementById('yVals').value = ''
  document.getElementById('yUncerts').value = ''
}

function linearizeData() {
  //  find the selected deliminator from the radio buttons
  let delim = null
  let delimBtns = document.getElementsByName('delim')
  for (let i = 0; i < delimBtns.length; i++) {
    if (delimBtns[i].checked) {
      delim = delimBtns[i].value
    }
  }

  //  take in raw data from HTML boxes
  let rawData = document.getElementsByClassName('dataInputCSV')
  for (let i = 0; i < rawData.length; i++) {
    nonNormalizedData[i] = rawData[i].value.split(delim).map(Number)
  }

  //  check validity of data
  for (let i = 1; i < nonNormalizedData.length; i++) {
    if (nonNormalizedData[i].length !== nonNormalizedData[0].length || nonNormalizedData[i].length === 0) {
      console.log('data bad')
      alert('Data Bad - make sure all your datas are the same length')
      return
    }
  }

  //  find the selected relationship type from radio buttons
  let type = null
  let btns = document.getElementsByName('relationship')
  for (let i = 0; i < btns.length; i++) {
    if (btns[i].checked) {
      type = btns[i].id
    }
  }

  switch (type) {
    case 'linear':
      console.log('linear data processed')
      break
    case 'quadratic':
      normalizedData[0] = nonNormalizedData[0]
      normalizedData[1] = nonNormalizedData[1]
      normalizedData[2] = nonNormalizedData[2].map(Math.sqrt)
      normalizedData[3] = sqrtUnc(nonNormalizedData[2], nonNormalizedData[3])
      console.log('quadratic data processed')
      break
    case 'invSquare':
      console.log('invSquare data processed')
      break
  }

  console.log(nonNormalizedData)
  console.log(normalizedData)

}

function sqrtUnc(allA, allB) {
  // console.log("A,B:",allA,allB)
  let newArr = []
  for (let i = 0; i < allA.length; i++) {
    if (allA[i] === 0) {
      newArr[i] = allB[i]
    } else {
      newArr[i] = (allB[i] * Math.sqrt(Math.abs(allA[i]))) / (2 * allA[i])
    }
  }
  return newArr
}

