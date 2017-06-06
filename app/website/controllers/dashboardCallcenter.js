var DashBoardCallCenterView = require('../views/ejemploVista'),
    DashBoardCallCenterModel = require('../models/dataAccess2');

var DashBoardCallCenter = function (conf) {
    this.conf = conf || {};

    this.view = new DashBoardCallCenterView();
    this.model = new DashBoardCallCenterModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}


//Obtiene la sumatoria de las citas
DashBoardCallCenter.prototype.get_ordenesAtraso = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_ORDENES_ATRASO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
},

DashBoardCallCenter.prototype.get_ordenesParaHoy = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_ORDENES_PARA_HOY_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
},

DashBoardCallCenter.prototype.get_ordenesSinObjetivo = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_ORDENES_SIN_OBJETIVO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

DashBoardCallCenter.prototype.get_recordatorios = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_RECORDATORIOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = DashBoardCallCenter;
