var OrdenServicioView = require('../views/ejemploVista'),
    OrdenServicioModel = require('../models/dataAccess2');



var OrdenServicio = function (conf) {
    this.conf = conf || {};

    this.view = new OrdenServicioView();
    this.model = new OrdenServicioModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//Obtiene las ordenes pendientes por cobrar
OrdenServicio.prototype.get_getTotalOrdenes = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_ORDENES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


module.exports = OrdenServicio;