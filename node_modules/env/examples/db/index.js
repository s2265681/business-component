var env = require('../..')()

function handleEnv (err) {
  if (!err) return
  process.exit(1)
}

if (env.ok(handleEnv)) {
  var port = env.get('SERVER_PORT')
  server.listen(port)
}
