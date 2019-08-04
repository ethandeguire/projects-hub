// 'use strict';
// const faunadb = require('faunadb');
// const generator = require('generate-password');

// /* configure faunaDB Client with our secret */
// const q = faunadb.query;
// const client = new faunadb.Client({
//   secret: process.env.FAUNADB_SERVER_SECRET
// });

// /* create a score in FaunaDB */
// function addScore(data) {
//   return client.query(
//     q.Create(q.Collection('scores'), {
//       data: {
//         score: data.score,
//         datetime: data.datetime,
//         name: data.name,
//         password: data.password
//       }
//     })
//   );
// }

// function obtainToken(user, password) {
//   return client.query(q.Login(q.Select('ref', user), { password }));
// }

// export function handler(event, context, callback) {
//   console.log('event', event)
//   console.log('context', context)

//   return callback(null, {
//     statusCode: 200,
//     body: JSON.stringify({
//       data: '⊂◉‿◉つ'
//     })
//   })

//   // var payload = JSON.parse(event.body);
//   // var userData = payload.user;

//   // const password = generator.generate({
//   //   length: 10,
//   //   numbers: true
//   // });

//   // createUser(userData, password)
//   //   .then(user => obtainToken(user, password))
//   //   .then(key =>
//   //     callback(null, {
//   //       statusCode: 200,
//   //       body: JSON.stringify({
//   //         app_metadata: {
//   //           faunadb_token: key.secret
//   //           // we discard the credential, and can create a new one if we ever need a new token
//   //           // faunadb_credential : password
//   //         }
//   //       })
//   //     })
//   //   )
//   //   .catch(e => {
//   //     console.error(e);
//   //     callback(null, {
//   //       statusCode: 500,
//   //       body: JSON.stringify({
//   //         error: e
//   //       })
//   //     });
//   //   });
// }