var MobileView = require('../views/ejemploVista'),
    MobileModel = require('../models/dataAccess2');
    moment = require('moment');

var Mobile = function(conf){
    this.conf = conf || {};

    this.view = new MobileView();
    this.model = new MobileModel({ parameters : this.conf.parameters});

    this.response = function(){
        this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
    }
}

//Petición a base de datos de la configuración de la aplicación 
Mobile.prototype.get_settings = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [];

    this.model.query('APP_SETTINGS',params, function (error, result) {
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Valida credenciales de usuario
Mobile.prototype.get_login = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{name: 'usuario', value: req.query.usuario, type: self.model.types.STRING},
                 {name: 'contrasena', value: req.query.password, type: self.model.types.STRING}];

    this.model.query('APP_VALIDA_CREDENCIALES',params, function (error, result) {
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Se sabe si el numero de orden espera un token
Mobile.prototype.get_buscarOrden = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [
                    {name: 'numeroOrden', value: req.query.numeroOrden, type: self.model.types.STRING}
                ];

    this.model.query('APP_BUSCAR_ORDEN',params, function (error, result) {
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

// Se guarda el Token generado del Numero de Orden
Mobile.prototype.get_insertToken = function (req, res, next) {
    var self = this;

    var params = [
                    {name: 'token', value: req.query.token, type: self.model.types.STRING},
                    {name: 'Vigencia', value: req.query.Vigencia, type: self.model.types.STRING},
                    {name: 'numeroOrden', value: req.query.numeroOrden, type: self.model.types.STRING},
                    {name: 'ubicacionToken', value: req.query.ubicacionToken, type: self.model.types.STRING},
                    {name: 'datosMovil', value: req.query.datosMovil, type: self.model.types.STRING},
                    {name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.STRING},
                    {name: 'idOrdenServicio', value: req.query.idOrdenServicio, type: self.model.types.STRING},
                    {name: 'origenToken', value: req.query.origenToken, type: self.model.types.STRING},
                    {name: 'idEstatusOrden', value: req.query.idEstatusOrden, type: self.model.types.STRING}
                ]; 

    this.model.post('APP_GUARDAR_TOKEN', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


//Se inserta una calificación
Mobile.prototype.get_insertCalificacion = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [
                    {name: 'idToken', value: req.query.idToken, type: self.model.types.STRING},
                    {name: 'calificacionToken', value: req.query.calificacionToken, type: self.model.types.STRING},
                    {name: 'comentariosToken', value: req.query.comentariosToken, type: self.model.types.STRING},
                    {name: 'kpi1', value: req.query.kpi1, type: self.model.types.STRING},
                    {name: 'kpi2', value: req.query.kpi2, type: self.model.types.STRING},
                    {name: 'kpi3', value: req.query.kpi3, type: self.model.types.STRING},
                    {name: 'kpi4', value: req.query.kpi4, type: self.model.types.STRING},
                    {name: 'kpi5', value: req.query.kpi5, type: self.model.types.STRING}
                ];

    this.model.query('APP_GUARDAR_CALIFICACION',params, function (error, result) {
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

module.exports = Mobile;