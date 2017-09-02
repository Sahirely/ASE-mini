var memorandumView = require('../views/ejemploVista'),
    memorandumModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto memorandum
var memorandum = function (conf) {
    this.conf = conf || {};

    this.view = new memorandumView();
    this.model = new memorandumModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//Obtiene los núemeros economicos de la operación
memorandum.prototype.post_alta = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT}
    ];

    this.model.query('INS_MEMORANDUM_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};