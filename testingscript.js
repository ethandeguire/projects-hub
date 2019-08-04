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
  await readAll().then((scores) => {
    if (scores.message === 'unauthorized') {
      if (isLocalHost()) {
        alert('FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info')
      } else {
        alert('FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct')
      }
      return false
    }
    return scores
  })
}

let x = getAllScores()
console.log(getAllScores().then(console.log))