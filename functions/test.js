exports.handler = function(event, context, callback) {
  console.log('event', event)
  console.log('context', context)

  callback(null, {
  statusCode: 200,
  body: "Hello, World ⊂◉‿◉つ"
  });
}