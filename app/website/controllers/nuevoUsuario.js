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


module.exports = nuevoUsuario;