var Model = require('../../models/dataAccess2'),
  Query = require('./query')

var Cobrar = function (conf) {
  this.conf = conf || {}
  this.model = new Model({
        parameters: this.conf.parameters
    })
  this.query = new Query(this.conf)
  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Cobrar.prototype.get_obtenerporcobrar = function (req, res, next) {
  var self = this
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  this.query.execute('SEL_PORCOBRAR_SP', params, res)
}

Cobrar.prototype.get_obtenerporcobrar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ORDENESPAGO_SP', params, res)
}

Cobrar.prototype.get_obtenerporcobrar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PORCOBRAR_COINCIDENCIA_SP', params, res)
}

Cobrar.prototype.get_obtenerporcobrar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PREFACTURA_GENERADA_SP', params, res)
}

Cobrar.prototype.get_obtenerporcobrar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ABONADAS_SP', params, res)
}

Cobrar.prototype.get_obtenerporcobrar = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PAGADAS_SP', params, res)
}

module.exports = Cobrar
