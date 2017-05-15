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

    this.model.query('SEL_DETALLE_UNIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
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
    }];

    this.model.query('SEL_EXISTE_UNIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = busquedaUnidad;
