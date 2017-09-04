var MemorandumView = require('../views/ejemploVista'),
    MemorandumModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto memorandum
var Memorandum = function (conf) {
    this.conf = conf || {};

    this.view = new MemorandumView();
    this.model = new MemorandumModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//Obtiene los núemeros economicos de la operación
Memorandum.prototype.post_alta = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'titulo', value: req.query.titulo, type: self.model.types.STRING},
        { name: 'descripcion', value: req.query.descripcion, type: self.model.types.STRING},
        { name: 'notificaZona', value: req.query.notificaZona, type: self.model.types.INT},
        { name: 'notificaPerfil', value: req.query.notificaPerfil, type: self.model.types.INT},
        { name: 'notificaUsuario', value: req.query.notificaUsuario, type: self.model.types.INT},
        { name: 'jsonZonas', value: req.query.jsonZonas, type: self.model.types.STRING},
        { name: 'jsonPerfiles', value: req.query.jsonPerfiles, type: self.model.types.STRING},
        { name: 'jsonUsuarios', value: req.query.jsonUsuarios, type: self.model.types.STRING}
    ];

    this.model.query('INS_MEMORANDUM_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Memorandum;