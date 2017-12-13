var NuevoUsuarioView = require('../views/ejemploVista'),
NuevoUsuarioModel = require('../models/dataAccess2');

var NuevoUsuario = function (conf) {
    this.conf = conf || {};

    this.view = new NuevoUsuarioView();
    this.model = new NuevoUsuarioModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}
}