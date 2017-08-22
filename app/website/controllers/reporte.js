var TrabajoView = require('../views/ejemploVista'),
TrabajoModel = require('../models/dataAccess2'),
moment = require('moment'),
PDFDocument = require('pdfkit'),
fecha = require("fecha");
var fs = require('fs');

fecha.i18n = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
}

var Reporte = function (conf) {
    this.conf = conf || {};

    this.view = new TrabajoView();
    this.model = new TrabajoModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//obtiene el reporte del parque vehicular de la operación
Reporte.prototype.get_ReporteParqueVehicular = function (req, res, next){
    var obj = {};
    var self = this;
    var params = [
    {
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    },
    {
        name: 'idTipoUnidad',
        value: req.query.idTipoUnidad,
        type: self.model.types.INT
    },{
        name: 'idZona',
        value: req.query.idZona,
        type: self.model.types.INT
    }];

    self.model.query('SEL_REPORTE_PARQUE_VEHICULAR_SP', params,function(error, result){
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });
}

Reporte.prototype.get_tipoUnidad = function (req, res, next){
    var obj = {};
    var self = this;
    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    self.model.query('SEL_TIPOS_UNIDAD_SP', params,function(error, result){
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });

}

Reporte.prototype.get_reporteUtilidad = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [
        {
            name: 'idOperacion',
            value: req.query.idOperacion,
            type: self.model.types.INT
        }
        // {
        //     name: 'fechaInicio',
        //     value: req.query.fechaInicio,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'fechaFin',
        //     value: req.query.fechaFin,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'fechaMes',
        //     value: req.query.fechaMes,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'rangoInicial',
        //     value: req.query.rangoInicial,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'rangoFinal',
        //     value: req.query.rangoFinal,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'zona',
        //     value: req.query.zona,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'tar',
        //     value: req.query.tar,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'idTipoCita',
        //     value: req.query.idTipoCita,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'estatus',
        //     value: req.query.estatus,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'numeroTrabajo',
        //     value: req.query.numeroTrabajo,
        //     type: self.model.types.STRING
        // },
        // {
        //     name: 'bandera',
        //     value: req.query.bandera,
        //     type: self.model.types.STRING
        // }
    ];

    self.model.query('SEL_REPORTE_MARGEN_UTILIDAD_SP', params, function (error, result) {

            object.error = error;
            object.result = result;
            self.view.expositor(res, object);

    });
}

module.exports = Reporte;
