// ---- Api methods to call netlify functions ----
const create = (data) => {
  return fetch('/.netlify/functions/create', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}
const readAll = () => {
  return fetch('/.netlify/functions/read-all').then((response) => {
    return response.json()
  })
}
const update = (id, data) => {
  return fetch(`/.netlify/functions/update/${id}`, {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}
const deleteid = (id) => {
  return fetch(`/.netlify/functions/delete/${id}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}
const batchDelete = (ids) => {
  return fetch(`/.netlify/functions/delete-batch`, {
    body: JSON.stringify({
      ids: ids
    }),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

// ---- my functions ----
function addScore(username, score) {
  // create data
  const info = {
    username: username,
    score: score
  }
  // send data
  create(info).then((response) => {
    console.log(response)
  }).catch((e) => {
    console.log('An API error occurred', e)
  })
}

async function getAllScores() {
  try {
    let value = await readAll();
    console.log(value)
    return value
  } catch (error) {
    return error
  }
  
}

console.log(await getAllScores())
let x = getAllScores()
getAllScores().then(console.log)
console.log(getAllScores().then(console.log))