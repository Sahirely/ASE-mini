var QuejasView = require('../views/ejemploVista'),
    QuejasModel = require('../models/dataAccess2'),
    moment = require('moment')

//configuración para el objeto quejas
var Quejas = function (conf) {
    this.conf = conf || {};

    this.view = new QuejasView();
    this.model = new QuejasModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Quejas.prototype.post_alta = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idCatalogoTipoQueja', value: req.query.idCatalogoTipoQueja, type: self.model.types.INT },
        { name: 'asunto', value: req.query.asunto, type: self.model.types.STRING },
        { name: 'mensaje', value: req.query.mensaje, type: self.model.types.STRING },

    ];

    this.model.query('INS_QUEJA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Quejas.prototype.get_consulta = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_QUEJA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Quejas.prototype.get_conultaTipoQuejaUsuario = function(req, res, next)
{
    var self = this;
    var params = [
        { name: 'idTipoUsuario', value: req.query.idTipoUsuario, type: self.model.types.INT },
    ];

    this.model.query('SEL_QUEJAS_TIPOUSUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Quejas;