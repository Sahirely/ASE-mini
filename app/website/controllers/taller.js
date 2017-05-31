var TallerView = require('../views/ejemploVista'),
    TallerModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto Taller
var Taller = function(conf) {
    this.conf = conf || {};

    this.view = new TallerView();
    this.model = new TallerModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//obtiene los talleres
Taller.prototype.get_talleres = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }, {
        name: 'idZona',
        value: req.query.idzona,
        type: self.model.types.INT
    }, {
        name: 'nombreTaller',
        value: req.query.nombretaller,
        type: self.model.types.STRING
    }, {
        name: 'servicios',
        value: req.query.servicios,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_TALLERES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Taller;
