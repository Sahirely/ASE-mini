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

Detalle.prototype.post_insertaNota = function(req, res, next){
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

module.exports = Detalle;
