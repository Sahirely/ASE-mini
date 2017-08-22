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