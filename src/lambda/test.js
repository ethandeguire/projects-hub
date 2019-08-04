'use strict';
const faunadb = require('faunadb');
const q = faunadb.query;
const client = new faunadb.Client({
  secret: "fnADU6udygACDT_EIqE1xy887pb_LSYTv-VE53_P"
});

module.exports = (event, callback) => {
  return client.query(q.Paginate(q.Match(q.Ref(Indexes("BlockBreakerDB")[0]))))
  .then((response) => {
    callback(false, response);
  }).catch((error) => {
    callback(error)
  })
};