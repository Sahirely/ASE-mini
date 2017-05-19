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

//Verifica si existe la orden de servicio
OrdenServicio.prototype.get_getOrdenExistente = function (req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'numeroOrden',
        value: req.query.numeroOrden,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_EXISTE_ORDEN_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

// Obtiene las acciones existentes por Orden
OrdenServicio.prototype.get_getOrdenAcciones = function (req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'numeroOrden',
        value: req.query.numeroOrden,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_DETALLE_ORDEN_ACCIONES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

// Obtiene los detalles de cliente por Orden
OrdenServicio.prototype.get_getOrdenCliente= function (req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'numeroOrden',
        value: req.query.numeroOrden,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_DETALLE_ORDEN_CLIENTE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

// Obtiene los documentos por orden
OrdenServicio.prototype.get_getOrdenDocumentos = function (req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'numeroOrden',
        value: req.query.numeroOrden,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_DETALLE_ORDEN_DOCUMENTACION_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

// Obtiene las evidencias por Orden
OrdenServicio.prototype.get_getOrdenEvidencias = function (req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'numeroOrden',
        value: req.query.numeroOrden,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_DETALLE_ORDEN_EVIDENCIA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

// Obtien los detalles de una orden
OrdenServicio.prototype.get_getOrdenDetalle = function (req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'numeroOrden',
        value: req.query.numeroOrden,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_DETALLE_ORDEN_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

OrdenServicio.prototype.get_getTalleres = function (req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_TALLER_PRUEBA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


module.exports = OrdenServicio;

