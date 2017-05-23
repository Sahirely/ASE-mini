var ConfiguradorView = require('../views/ejemploVista'),
    ConfiguradorModel = require('../models/dataAccess2');

var Configurador = function(conf) {
    this.conf = conf || {};

    this.view = new ConfiguradorView();
    this.model = new ConfiguradorModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//Configuraciones existentes
Configurador.prototype.get_operaciones = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_CONFIGURACIONES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Tipo Operaciones
Configurador.prototype.get_tipoOperaciones = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_FORMA_TIPO_DE_OPERACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Formas de Pago
Configurador.prototype.get_formaPago = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_FORMA_DE_PAGO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Inserta nueva Operación
Configurador.prototype.post_nuevaOperacion = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'nombreOperacion',
        value: req.body.nombreOperacion,
        type: self.model.types.STRING
    }, {
        name: 'nombreContacto',
        value: req.body.nombreContacto,
        type: self.model.types.STRING
    }, {
        name: 'correoContacto',
        value: req.body.correoContacto,
        type: self.model.types.STRING
    }, {
        name: 'telefonoContacto',
        value: req.body.telefonoContacto,
        type: self.model.types.STRING
    }, {
        name: 'fechaInicio',
        value: req.body.fechaInicio,
        type: self.model.types.STRING
    }, {
        name: 'fechaFin',
        value: req.body.fechaFin,
        type: self.model.types.STRING
    }, {
        name: 'idCatalogoTipoOperacion',
        value: req.body.idCatalogoTipoOperacion,
        type: self.model.types.INT
    }, {
        name: 'manejoUtilidad',
        value: req.body.manejoUtilidad,
        type: self.model.types.INT
    }, {
        name: 'porcentajeUtilidad',
        value: req.body.porcentajeUtilidad,
        type: self.model.types.DECIMAL
    }, {
        name: 'geolocalizacion',
        value: req.body.geolocalizacion,
        type: self.model.types.INT
    }, {
        name: 'estatusOperacion',
        value: req.body.estatusOperacion,
        type: self.model.types.INT
    }, {
        name: 'idCatalogoFormaPago',
        value: req.body.idCatalogoFormaPago,
        type: self.model.types.INT
    }, {
        name: 'presupuesto',
        value: req.body.presupuesto,
        type: self.model.types.INT
    }, {
        name: 'centros',
        value: req.body.centros,
        type: self.model.types.STRING
    }];


    this.model.post('INS_OPERACIONES_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Licitaciones
Configurador.prototype.get_licitaciones = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_CONTRATOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Inserta nueva Operación
Configurador.prototype.post_contratoOperacion = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idOperacion',
        value: req.body.idOperacion,
        type: self.model.types.INT
    }, {
        name: 'idContrato',
        value: req.body.idContrato,
        type: self.model.types.INT
    }];


    this.model.post('[INS_CONTRATO_OPERACION_SP]', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

module.exports = Configurador;
