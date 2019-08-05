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
async function addScore(username, score) {
  // create data
  const info = {
    username: username,
    score: score
  }

  return await create(info)
}

// add score
addScore.then((response) => {
  if (create({username: "peepeepoopoowoman", score: 69})) { console.log("Added score") }
  else console.log(response)
})

// read scores
readAll().then((scores) =>
  console.log(scores)
)