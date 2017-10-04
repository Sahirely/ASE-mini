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
    { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'numeroOrden', value: "", type: self.model.types.STRING },
    { name: 'idEjecutivo', value: 0, type: self.model.types.INT }
  ]
  this.query.execute('SEL_OPE_ORDEN_POR_COBRAR_SP', params, res)
}

Cobrar.prototype.get_obtenerordenpago = function (req, res, next) {
  var self = this
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  this.query.execute('SEL_ORDEN_PAGO_SP', params, res)
}

Cobrar.prototype.get_obtenerordenespago = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ORDENESPAGO_SP', params, res)
}

Cobrar.prototype.get_obtenercoincidencia = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PORCOBRAR_COINCIDENCIA_SP', params, res)
}

Cobrar.prototype.get_obtenerprefactura = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PREFACTURA_GENERADA_SP', params, res)
}

Cobrar.prototype.get_obtenerabonadas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ABONADAS_SP', params, res)
}

Cobrar.prototype.get_obtenerenviadas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ENVIADAS_SP', params, res)
}

Cobrar.prototype.get_obtenerpagadas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PAGADAS_SP', params, res)
}

Cobrar.prototype.post_agregarordenpago = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'folio', value: req.body.folio, type: self.model.types.STRING },
    { name: 'fecha', value: req.body.fecha, type: self.model.types.STRING },
    { name: 'monto', value: req.body.monto, type: self.model.types.DECIMAL }
  ]
  // Llamada a SP
  this.query.execute('INS_ORDEN_PAGO_SP', params, res)
}

module.exports = Cobrar
