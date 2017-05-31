var QueryView = require('../../views/ejemploVista'),
  QueryModel = require('../../models/dataAccess2')

var Query = function (conf) {
  this.conf = conf || {}

  this.view = new QueryView()
  this.model = new QueryModel({
        parameters: this.conf.parameters
    })

  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Query.prototype.execute = function (storedprocedure, params, res) {
  // Referencia a la clase para callback
  var self = this
  // Llamada a SP
  this.model.query(storedprocedure, params, function (error, result) {
    self.view.speakJSON(res, {
      error: error,
      result: result
    })
  })
}

module.exports = Query
