const faunadb = require('faunadb'), q = faunadb.query;
const client = new faunadb.Client({ secret: 'fnADU6udygACDT_EIqE1xy887pb_LSYTv-VE53_P' });


exports.handler = function(event, context, callback) {
  let res
  
  var createP = client.query(q.Create(q.Collection('scores'), { data: { testField: 'testValue' } }));
  createP.then(function(response) {
    console.log(response.ref); // Would log the ref to console.
    res = response.ref
  });

  callback(null, {
    statusCode: 200,
    body: "Hello, World ⊂◉‿◉つ - updated: " + res + " " + createP
  });
}