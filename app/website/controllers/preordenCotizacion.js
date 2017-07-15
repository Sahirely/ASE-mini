var PreordenCotizacionView = require('../views/ejemploVista'),
    PreordenCotizacionModel = require('../models/dataAccess2');
var mkdirp = require('mkdirp');
multer = require('multer');
var fs = require('fs');

var PreordenCotizacion = function(conf) {
    this.conf = conf || {};

    this.view = new PreordenCotizacionView();
    this.model = new PreordenCotizacionModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }


    this.middlewares = []
}

PreordenCotizacion.prototype.get_Preorden = function(req, res, next) {
    var self = this;
    var params = [

            {name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT },
            {name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT }
        ];

    this.model.query('SEL_DETALLE_COTIZACION_SINTALLER_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


PreordenCotizacion.prototype.get_Talleres = function(req, res, next) {
    var self = this;
    var params = [
            {name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
            {name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT }
        ];

    this.model.query('SEL_TALLERES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


PreordenCotizacion.prototype.get_guardarCotizacion = function(req, res, next){
    var self = this;
    var params = [
        {name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT },
        {name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        {name: 'idTaller', value: req.query.idTaller, type: self.model.types.INT },
        {name: 'idCotizacionesDetalle', value: req.query.idCotizacionesDetalle,type: self.model.types.STRING },
        {name: 'idZona', value: req.query.idZona, type: self.model.types.INT }
    ];

    this.model.query('INS_COTIZACION_PREORDEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });

};





module.exports = PreordenCotizacion;