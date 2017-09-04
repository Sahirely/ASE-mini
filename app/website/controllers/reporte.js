var TrabajoView = require('../views/ejemploVista'),
    TrabajoModel = require('../models/dataAccess2'),
    moment = require('moment'),
    PDFDocument = require('pdfkit'),
    fecha = require("fecha");
var fs = require('fs');

fecha.i18n = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
}

var Reporte = function(conf) {
    this.conf = conf || {};

    this.view = new TrabajoView();
    this.model = new TrabajoModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}


Reporte.prototype.get_estatusOrdenes = function(req, res, next) {
    var obj = {};
    var self = this;
    var params = [];
    // var params = [{
    //     name: 'idOperacion',
    //     value: req.query.idOperacion,
    //     type: self.model.types.INT
    // }];

    self.model.query('SEL_ESTATUS_ORDENES_SP', params, function(error, result) {
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });
}


Reporte.prototype.get_reporteCertificadoConformidad = function(req, res, next) {
    var obj = {};
    var self = this;
    
    var params = [
    {name: 'idOperacion',value: req.query.idOperacion,type: self.model.types.INT},
    {name: 'fechaInicial',value: req.query.fechaInicial,type: self.model.types.STRING},
    {name: 'fechaFinal',value: req.query.fechaFinal,type: self.model.types.STRING},
    {name: 'idZona',value: req.query.idZona,type: self.model.types.INT},
    {name: 'numeroOrden',value: req.query.numeroOrden,type: self.model.types.STRING},

    ];


    self.model.query('SEL_REPORTE_CERTIFICADO_CONFORMIDAD_SP', params, function(error, result) {
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });
}



Reporte.prototype.get_reporteAntiguedadSaldo = function(req, res, next) {
    var obj = {};
    var self = this;
    
    var params = [
    {name: 'idOperacion',value: req.query.idOperacion,type: self.model.types.INT},
    {name: 'fechaInicial',value: req.query.fechaInicial,type: self.model.types.STRING},
    {name: 'fechaFinal',value: req.query.fechaFinal,type: self.model.types.STRING},
    {name: 'taller',value: req.query.taller,type: self.model.types.STRING},
    {name: 'idCallcenter',value: req.query.idCallcenter,type: self.model.types.INT},
    {name: 'idEstatus',value: req.query.idEstatus,type: self.model.types.INT},
    {name: 'idZona',value: req.query.idZona,type: self.model.types.INT},
    {name: 'numeroOrden',value: req.query.numeroOrden,type: self.model.types.STRING},

    ];


    self.model.query('SEL_REPORTE_ANTIGUEDAD_SALDO_SP', params, function(error, result) {
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });
}

Reporte.prototype.get_tipoOrden = function(req, res, next) {
    var obj = {};
    var self = this;
    var params = [];

    self.model.query('SEL_TIPO_ORDEN_SERVICIO_SP', params, function(error, result) {
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });
}

//obtiene el reporte del parque vehicular de la operación
Reporte.prototype.get_ReporteParqueVehicular = function(req, res, next) {
    var obj = {};
    var self = this;
    var params = [{
            name: 'idOperacion',
            value: req.query.idOperacion,
            type: self.model.types.INT
        },
        {
            name: 'idTipoUnidad',
            value: req.query.idTipoUnidad,
            type: self.model.types.INT
        }, {
            name: 'idZona',
            value: req.query.idZona,
            type: self.model.types.INT
        }
    ];

    self.model.query('SEL_REPORTE_PARQUE_VEHICULAR_SP', params, function(error, result) {
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });
}

Reporte.prototype.get_tipoUnidad = function(req, res, next) {
    var obj = {};
    var self = this;
    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    self.model.query('SEL_TIPOS_UNIDAD_SP', params, function(error, result) {
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });

}

Reporte.prototype.get_reporteUtilidad = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [{
            name: 'tipoConsulta',
            value: req.query.tipoConsulta,
            type: self.model.types.INT
        },
        {
            name: 'idOperacion',
            value: req.query.idOperacion,
            type: self.model.types.INT
        },
        {
            name: 'numOrden',
            value: req.query.numOrden,
            type: self.model.types.STRING
        },
        {
            name: 'fechaInicial',
            value: req.query.fechaInicial,
            type: self.model.types.STRING
        },
        {
            name: 'fechaFinal',
            value: req.query.fechaFinal,
            type: self.model.types.STRING
        },
        {
            name: 'fechaMes',
            value: req.query.fechaMes,
            type: self.model.types.STRING
        },
        {
            name: 'idZona',
            value: req.query.idZona,
            type: self.model.types.INT
        },
        {
            name: 'rangoInicial',
            value: req.query.rangoInicial,
            type: self.model.types.DECIMAL
        },
        {
            name: 'rangoFinal',
            value: req.query.rangoFinal,
            type: self.model.types.DECIMAL
        },
        {
            name: 'idTipoOrden',
            value: req.query.idTipoOrden,
            type: self.model.types.INT
        },
        {
            name: 'idEstatus',
            value: req.query.idEstatus,
            type: self.model.types.INT
        }
    ];

    self.model.query('SEL_REPORTE_MARGEN_UTILIDAD_SP', params, function(error, result) {

        object.error = error;
        object.result = result;
        self.view.expositor(res, object);

    });
}

//Obtiene todas las citas no canceladas generadas para cierta unidad
Reporte.prototype.get_historialUnidad = function(req, res, next) {

    var self = this;

    var params = [{
        name: 'numeroEconomico',
        value: req.query.numeroEconomico,
        type: self.model.types.STRING
    }, {
        name: 'tipoConsulta',
        value: req.query.tipoConsulta,
        type: self.model.types.INT
    }, {
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_HISTORIAL_UNIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Reporte;