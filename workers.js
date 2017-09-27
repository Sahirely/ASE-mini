var conf = require('./conf'),
  expressServer = require('./app/expressServer')

var Workers = function (config) {
  config = config || {}

  console.log('Inicia conexión')
  this.app = new expressServer({parameters: conf })
}

Workers.prototype.run = function () {
  this.app.run(conf.port)
}

if (module.parent) {
  module.exports = Workers
} else {
  var workers = new Workers()
  workers.run()
  console.log('Modo debug')
}
