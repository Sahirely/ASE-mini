var AprobacionView = require('../views/ejemploVista'),
    AprobacionModel = require('../models/dataAccess2');

var Aprobacion = function(conf) {
    this.conf = conf || {};

    this.view = new AprobacionView();
    this.model = new AprobacionModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

Aprobacion.prototype.get_approvalTest = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('APP_SETTINGS', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Aprobacion.prototype.get_updateStatusPartida = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT },
        { name: 'idPartida', value: req.query.idPartida, type: self.model.types.INT },
        { name: 'idEstatusPartida', value: req.query.idEstatusPartida, type: self.model.types.INT }
    ];

    this.model.query('[UPD_ESTATUS_APROBACION_PARTIDAS]', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Aprobacion.prototype.get_UpdateStatusCotizacion = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('[UPD_ESTATUS_APROBACION_COTIZACION]', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Aprobacion.prototype.get_presupuesto = function(req, res, next) {
    var self = this;

    var params = [{ name: 'numeroOrden', value: req.query.numeroOrden, type: self.model.types.STRING }];    

    this.model.query('[SEL_PRESUPUESTO_SP]', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


module.exports = Aprobacion;
