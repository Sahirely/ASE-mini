var nuevoUsuarioView = require('../views/ejemploVista'),
    nuevoUsuarioModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto meeting
var nuevoUsuario = function (conf) {
    this.conf = conf || {};

    this.view = new nuevoUsuarioView();
    this.model = new nuevoUsuarioModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

nuevoUsuario.prototype.get_Usuarios = function(req, res, next) {
    var self = this;
    var params = [
            {name: 'username', value: req.query.username, type: self.model.types.STRING }
        ];

    this.model.query('EXT_SEL_USUARIOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

nuevoUsuario.prototype.get_CatalogoRolesUsuario = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('EXT_SEL_CAT_ROL_USUARIOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = nuevoUsuario;
