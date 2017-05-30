var Model = require('../models/dataAccess'),
  Query = require('./query')

var Cobrar = function (conf) {
  this.conf = conf || {}
  // Inicializo el objeto
  this.model = new Model(this.conf.connection)
  this.query = new Query(this.conf)

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Cobrar.prototype.get_obtenertodas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idCliente', value: req.query.idCliente, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_Cobrar_SP', params, res)
}

module.exports = Cobrar
