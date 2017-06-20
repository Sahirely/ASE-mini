var CitaView = require('../views/ejemploVista'),
    CitaModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto cita
var Cita = function(conf) {
    this.conf = conf || {};

    this.view = new CitaView();
    this.model = new CitaModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Cita.prototype.get_tiposOrdenesServicio = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_TIPOS_ORDENES_SERVICIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cita.prototype.get_tipoEstadoUnidad = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_TIPOS_ESTADOS_UNIDAD', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cita.prototype.put_agendarCita = function(req, res, next) {
    var self = this;
    console.log(req.query.fechaCita)
    var params = [{
        name: 'idUnidad',
        value: req.query.idUnidad,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idTipoOrdenServicio',
        value: req.query.idTipoOrdenServicio,
        type: self.model.types.INT
    }, {
        name: 'idEstadoUnidad',
        value: req.query.idEstadoUnidad,
        type: self.model.types.INT
    }, {
        name: 'grua',
        value: req.query.grua,
        type: self.model.types.INT
    }, {
        name: 'fechaCita',
        value: req.query.fechaCita,
        type: self.model.types.STRING
    }, {
        name: 'comentario',
        value: req.query.comentario,
        type: self.model.types.STRING
    }, {
        name: 'idZona',
        value: req.query.idZona,
        type: self.model.types.INT
    }, {
        name: 'taller',
        value: req.query.taller,
        type: self.model.types.INT
    }, {
        name: 'especialidades',
        value: req.query.especialidades,
        type: self.model.types.STRING
    }];

    this.model.query('INS_ORDEN_SERVICIO_SP', params, function(error, result) {
        console.log(result)
        console.log(error)
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cita.prototype.get_servicios = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'numeroEconomico',
        value: req.query.economico,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_SERVICIOS_TALLERES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cita.prototype.get_ZonasCita = function(req, res, next){
    var self = this;

    var params = [{
        name: 'idZona',
        value: req.query.idZona,
        type: self.model.types.INT
    }];

    this.model.query('SEL_ZONAS_CITA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cita.prototype.put_actualizarCita = function(req, res, next) {
    var self = this;
    console.log(req.query.fechaCita)
    var params = [{
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'idUnidad',
        value: req.query.idUnidad,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idTipoOrdenServicio',
        value: req.query.idTipoOrdenServicio,
        type: self.model.types.INT
    }, {
        name: 'idEstadoUnidad',
        value: req.query.idEstadoUnidad,
        type: self.model.types.INT
    }, {
        name: 'grua',
        value: req.query.grua,
        type: self.model.types.INT
    }, {
        name: 'fechaCita',
        value: req.query.fechaCita,
        type: self.model.types.STRING
    }, {
        name: 'comentario',
        value: req.query.comentario,
        type: self.model.types.STRING
    }, {
        name: 'idZona',
        value: req.query.idZona,
        type: self.model.types.INT
    }, {
        name: 'taller',
        value: req.query.taller,
        type: self.model.types.INT
    }];

    this.model.query('UPD_ORDEN_DERVICIO_SP', params, function(error, result) {
        console.log(result)
        console.log(error)
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cita.prototype.put_especialidadOrden = function(req, res, next) {
    var self = this;
    console.log(req.query.fechaCita)
    var params = [{
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'especialidades',
        value: req.query.especialidades,
        type: self.model.types.STRING
    }, {
        name: 'estatus',
        value: req.query.estatus,
        type: self.model.types.STRING
    }];

    this.model.query('UPD_ESPECIALIDAD_ORDEN_SP', params, function(error, result) {
        console.log(result)
        console.log(error)
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Cita;
