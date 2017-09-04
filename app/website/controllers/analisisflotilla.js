var AnalisisFlotillaView = require('../views/ejemploVista'),
  AnalisisFlotillaModel = require('../models/dataAccess2'),
  moment = require('moment')

// configuración para el objeto cita
var AnalisisFlotilla = function (conf) {
  this.conf = conf || {}

  this.view = new AnalisisFlotillaView()
  this.model = new AnalisisFlotillaModel({
    parameters: this.conf.parameters
  })

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

AnalisisFlotilla.prototype.get_gastounidad = function (req, res, next) {
  // Objeto que almacena la respuesta
  var object = {}
  var params = {}
  var self = this

  // Asigno a params el valor de mis variables
  var params = []

  this.model.query('SEL_REPORTE_AF_PARQUE_SP', params, function (error, result) {
    self.view.expositor(res, {
      error: error,
      result: result
    })
  })
}

AnalisisFlotilla.prototype.get_documentosunidad = function (req, res, next) {
  // Objeto que almacena la respuesta
  var object = {}
  var params = {}
  var self = this

  // Asigno a params el valor de mis variables
  var params = []

  this.model.query('SEL_REPORTE_AF_DOCUMENTO_SP', params, function (error, result) {
    self.view.expositor(res, {
      error: error,
      result: result
    })
  })
}

AnalisisFlotilla.prototype.get_ingresoantiguedad = function (req, res, next) {
  // Objeto que almacena la respuesta
  var object = {}
  var params = {}
  var self = this

  // Asigno a params el valor de mis variables
  var params = []

  this.model.query('SEL_REPORTE_AF_ANTIGUEDAD_INGRESO_SP', params, function (error, result) {
    self.view.expositor(res, {
      error: error,
      result: result
    })
  })
}

AnalisisFlotilla.prototype.get_ingresoantiguedadgrafica = function (req, res, next) {
  // Objeto que almacena la respuesta
  var object = {}
  var params = {}
  var self = this

  // Asigno a params el valor de mis variables
  var params = []

  this.model.query('SEL_GRAFICA_AF_ANTIGUEDAD_INGRESO_SP', params, function (error, result) {
    self.view.expositor(res, {
      error: error,
      result: result
    })
  })
}

AnalisisFlotilla.prototype.get_inversion = function (req, res, next) {
  // Objeto que almacena la respuesta
  var object = {}
  var params = {}
  var self = this

  // Asigno a params el valor de mis variables
  var params = []

  this.model.query('SEL_REPORTE_AF_INVERSION_SP', params, function (error, result) {
    self.view.expositor(res, {
      error: error,
      result: result
    })
  })
}

module.exports = AnalisisFlotilla
