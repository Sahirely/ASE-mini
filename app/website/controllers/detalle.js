var DetalleView = require('../views/ejemploVista'),
    DetalleModel = require('../models/dataAccess2');

var Detalle = function (conf) {
    this.conf = conf || {};

    this.view = new DetalleView();
    this.model = new DetalleModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }


    this.middlewares = [
   ]
}

Detalle.prototype.get_insertaNota = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'nota',
        value: req.query.nota,
        type: self.model.types.STRING
      },{
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
      },{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
      }];

      this.model.query('INS_NOTA',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_obtenerHistoricoOrden = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
      }];

      this.model.query('SEL_HISTORICO_ORDEN',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_obtenerIdCotzPorOrden = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
      }];

      this.model.query('SEL_ID_COTIZACIONES_POR_ORDEN',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_obtenerHistoricoCotizacion = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'idCotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
      }];

      this.model.query('SEL_HISTORICO_COTIZACIONES',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

module.exports = Detalle;
