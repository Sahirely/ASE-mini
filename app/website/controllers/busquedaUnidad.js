var busquedaUnidadView = require('../views/ejemploVista'),
    busquedaUnidadModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto busquedaUnidad
var busquedaUnidad = function(conf) {
    this.conf = conf || {};

    this.view = new busquedaUnidadView();
    this.model = new busquedaUnidadModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//Obtiene el detalle de la unidad
busquedaUnidad.prototype.get_detalleUnidad = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'economico',
        value: req.query.economico,
        type: self.model.types.STRING
    }];

    self.model.query('SEL_DETALLE_UNIDAD_SP', params, function(error, result) {

        if (result.length > 0){
          var idUnidad = result[0].idUnidad;

          var params2 = [{
              name: 'idUnidad',
              value: idUnidad,
              type: self.model.types.INT
          }];

          result[0].zonasUnidad = [];

          self.model.query('SEL_ZONAS_UNIDAD_SP', params2, function(e, r){
              if (r.length > 0){
                result[0].zonasUnidad = r;
              }

              self.view.expositor(res, {
                  error: error,
                  result: result
              });

          });
        }else {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        }
    });
};
//Obtiene la existencia de la unidad y si el usuario cumple con los permisos necesarios
busquedaUnidad.prototype.get_existeUnidad = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'economico',
        value: req.query.economico,
        type: self.model.types.STRING
    },{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_EXISTE_UNIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

//Obtiene los núemeros economicos de la operación
busquedaUnidad.prototype.get_numerosEconomicos = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_NUM_ECONOMICO_OPERACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


//Obtiene la o las Ordenes de Servicio Actual
busquedaUnidad.prototype.get_ordenActual = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'economico',
        value: req.query.economico,
        type: self.model.types.STRING
    }, {
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.STRING
     }];

    this.model.query('SEL_ORDENES_ACTUAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
//Obtiene el historico de la o las Ordenes de Servicio
busquedaUnidad.prototype.get_historicoOrdenes = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'economico',
        value: req.query.economico,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_ORDENES_HISTORIAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
//Obtiene el detalle de la orden de servicio para editarlo
busquedaUnidad.prototype.get_detalleOrden = function(req, res, next) {
    var self = this;
    var params = [ {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }];

    this.model.query('SEL_DETALLE_ORDEN_X_UNIDAD_SP', params, function(error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
    });
};

//Obtiene el detalle de la orden de servicio para editarlo
busquedaUnidad.prototype.get_detalleOrdenEspecialidad = function(req, res, next) {
    var self = this;
    var params = [ {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }];

    this.model.query('SEL_ESPECIALIDAD_ORDEN_SP', params, function(error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
    });
};

module.exports = busquedaUnidad;
