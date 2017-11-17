var ProveedorView = require('../views/ejemploVista'),
ProveedorModel = require('../models/dataAccess2'),
moment = require('moment'),
fs = require('fs')

var Proveedor = function(conf) {
    this.conf = conf || {};

    this.view = new ProveedorView();
    this.model = new ProveedorModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Proveedor.prototype.get_consultaEstadoCuenta = function(req, res, body){
    var self = this;
    var params = [
        { name: 'idOperacion', value: req.query.idOperacion, type: self.model.types.INT },
    ];

    this.model.query('SEL_REPORTE_PROVEEDOR_EC_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Proveedor.prototype.get_consultaEstadoCuentaPorProveedor = function(req, res, body){
    var self = this;
    var params = [
        { name: 'idOperacion', value: req.query.idOperacion, type: self.model.types.INT },
        { name: 'idProveedor', value: req.query.idProveedor, type: self.model.types.INT },
        { name: 'tipoDetalle', value: req.query.tipo, type: self.model.types.STRING },
    ];

    this.model.query('SEL_REPORTE_PROVEEDOR_EC_DETALLE_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Proveedor.prototype.get_consultaUtilidad = function(req, res, body){
    var self = this;
    var params = [
        
    ];

    this.model.query('SEL_REPORTE_PROVEEDOR_UTILIDAD_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Proveedor.prototype.get_consultaUtilidad = function(req, res, body){
    var self = this;
    var params = [
        { name: 'fechaInicial', value: req.query.fechaInicial, type: self.model.types.STRING },
        { name: 'fechaFinal', value: req.query.fechaFinal, type: self.model.types.STRING }
    ];

    this.model.query('SEL_REPORTE_PROVEEDOR_UTILIDAD_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Proveedor.prototype.get_consultaDispersion = function(req, res, body){
    var self = this;
    var params = [
        { name: 'fechaInicial', value: req.query.fechaInicial, type: self.model.types.STRING },
        { name: 'fechaFinal', value: req.query.fechaFinal, type: self.model.types.STRING }
    ];

    this.model.query('SEL_REPORTE_PROVEEDOR_DISPERSION_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Proveedor;