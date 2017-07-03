var CotizacionView = require('../views/ejemploVista'),
    CotizacionModel = require('../models/dataAccess2');
var mkdirp = require('mkdirp');
multer = require('multer');
var fs = require('fs');

var Cotizacion = function(conf) {
    this.conf = conf || {};

    this.view = new CotizacionView();
    this.model = new CotizacionModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }


    this.middlewares = []
}

Cotizacion.prototype.get_ConsultaOrdenes = function(req, res, next) {
    var self = this;
    var params = [
            {name: 'fechaInicial', value: req.query.fechaInicial, type: self.model.types.STRING },
            {name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING },
            {name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
            {name: 'idZona', value: req.query.idZona, type: self.model.types.INT },
            {name: 'tipoConsulta', value: req.query.tipoConsulta, type: self.model.types.INT },
            {name: 'fechaEspecifico', value: req.query.fecha, type: self.model.types.STRING },
            {name: 'fechaMes', value: req.query.fechaMes, type: self.model.types.STRING },
            {name: 'numeroOrden', value: req.query.numeroTrabajo, type: self.model.types.STRING },
            {name: 'nivelZona', value: req.query.NivelZona, type: self.model.types.INT },
            {name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
        ];

    this.model.query('SEL_TOTAL_ORDENES_SERVICIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


//Obtiene las cotizaciones pendientes por autorizar
Cotizacion.prototype.get_ObtenerOrdenes = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }, {
        name: 'idZona',
        value: req.query.idZona,
        type: self.model.types.INT
    }, {
        name: 'idEjecutivo',
        value: req.query.idEjecutivo,
        type: self.model.types.STRING
    }, {
        name: 'fechaMes',
        value: req.query.fechaMes,
        type: self.model.types.STRING
    }, {
        name: 'fechaInicial',
        value: req.query.fechaInicial,
        type: self.model.types.STRING
    }, {
        name: 'fechaFin',
        value: req.query.fechaFin,
        type: self.model.types.STRING
    }, {
        name: 'fechaEspecifico',
        value: req.query.fechaEspecifico,
        type: self.model.types.STRING
    }, {
        name: 'NumOrden',
        value: req.query.NumOrden,
        type: self.model.types.STRING
    }, {
        name: 'porOrden',
        value: req.query.porOrden,
        type: self.model.types.INT
    }, {
        name: 'tipoConsulta',
        value: req.query.tipoConsulta,
        type: self.model.types.INT
    }];

    this.model.query('SEL_CONSULTA_ORDENES_SP_Pruebas', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Obtiene las zonas por nivel y padre seleccionado
Cotizacion.prototype.get_zonas = function(req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [{
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }, {
        name: 'idNivel',
        value: req.query.idNivel,
        type: self.model.types.INT
    }];

    this.model.query('SEL_ZONAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Obtiene las zonas por nivel y padre seleccionado
Cotizacion.prototype.get_nivelZona = function(req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [{
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_NIVEL_ZONAS_CLIENTE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Obtiene los usuarios ejectivos
Cotizacion.prototype.get_ejecutivos = function(req, res, next) {
    var self = this;

    var params = [{
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_USUARIOS_EJECUTIVOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cotizacion.prototype.post_cancelaCot = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idusuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idcotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
    }];

    this.model.query('UPD_CANCELA_COTIZACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cotizacion.prototype.post_cotizacionNueva = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idTaller',
        value: req.body.idTaller,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.body.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idEstatusCotizacion',
        value: req.body.idEstatusCotizacion,
        type: self.model.types.INT
    }, {
        name: 'idOrden',
        value: req.body.idOrden,
        type: self.model.types.STRING
    }, , {
        name: 'idCatalogoTipoOrdenServicio',
        value: req.body.idCatalogoTipoOrdenServicio,
        type: self.model.types.INT
    }];

    this.model.query('INS_COTIZACION_NUEVA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cotizacion.prototype.post_cotizacionDetalle = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idCotizacion',
        value: req.body.idCotizacion,
        type: self.model.types.INT
    }, {
        name: 'costo',
        value: req.body.costo,
        type: self.model.types.DECIMAL
    }, {
        name: 'cantidad',
        value: req.body.cantidad,
        type: self.model.types.INT
    }, {
        name: 'venta',
        value: req.body.venta,
        type: self.model.types.DECIMAL
    }, {
        name: 'idPartida',
        value: req.body.idPartida,
        type: self.model.types.INT
    }, {
        name: 'idEstatusPartida',
        value: req.body.idEstatusPartida,
        type: self.model.types.INT
    }];

    this.model.query('INS_COTIZACION_DETALLE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


Cotizacion.prototype.get_ObtenerOrdenesTipoConsulta = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'fechaInicial',
        value: req.query.fechaInicial,
        type: self.model.types.STRING
    },  {
        name: 'fechaFin',
        value: req.query.fechaFin,
        type: self.model.types.STRING
    },  {
        name: 'fechaEspecifico',
        value: req.query.fechaEspecifico,
        type: self.model.types.STRING
    },  {
        name: 'fechaMes',
        value: req.query.fechaMes,
        type: self.model.types.STRING
    },  {
        name: 'numeroOrden',
        value: req.query.numeroOrden,
        type: self.model.types.STRING
    },  {
        name: 'idZona',
        value: req.query.idZona,
        type: self.model.types.INT
    },  {
        name: 'idEjecutivo',
        value: req.query.idEjecutivo,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }, {
        name: 'tipoConsulta',
        value: req.query.tipoConsulta,
        type: self.model.types.INT
    }];

    this.model.query('SEL_TOTAL_ORDENES_SERVICIO_SP', params, function(error, result) {
       
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


module.exports = Cotizacion;