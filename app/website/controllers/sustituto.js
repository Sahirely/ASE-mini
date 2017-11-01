var SutitutoView = require('../views/ejemploVista'),
    SutitutoModel = require('../models/dataAccess2');

var Sustituto = function (conf) {
    this.conf = conf || {};

    this.view = new SutitutoView();
    this.model = new SutitutoModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}
// Obtiene los datos de los presupuestos por el centro de trabajo
    Sustituto.prototype.get_motivo = function (req, res, next) {

        var params = [];

        var self = this;

        this.model.query('[Sustituto].[SEL_MOTIVO_SUSTITUTO_SP]', params, function (error, result) {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    }

    Sustituto.prototype.get_sustituto = function (req, res, next) {
        //Objeto que almacena la respuesta
        var object = {};
        //Referencia a la clase para callback
        var self = this;
        //Asigno a params el valor de mis variables    
        var params = [
            {
                name: 'numEconomico',
                value: req.query.numEconomico,
                type: self.model.types.STRING
                            
            },
            {
                name: 'tipo',
                value: req.query.tipo,
                type: self.model.types.INT
                            
            },
            {
                name: 'idContratoOperacion',
                value: req.query.idContratoOperacion,
                type: self.model.types.INT
                            
            }
        ];

        this.model.query('[Sustituto].[SEL_UNIDAD_SUSTITUTO_SP]', params, function (error, result) {
            //Callback
            object.error = error;
            object.result = result;

            self.view.expositor(res, object);
        });
    }


    //valida la orden para sustituto
    Sustituto.prototype.get_validaorden = function (req, res, next) {
        var object = {};
        //Referencia a la clase para callback
        var self = this;
        //Asigno a params el valor de mis variables    
        var params = [
            {
                name: 'numeroOrden',
                value: req.query.numeroOrden,
                type: self.model.types.STRING
                            
            },
            {
                name: 'idContratoOperacion',
                value: req.query.idContratoOperacion,
                type: self.model.types.INT
                            
            }
        ];

        this.model.query('[Sustituto].[SEL_VALIDA_ORDEN_SP]', params, function (error, result) {
            //Callback
            object.error = error;
            object.result = result;

            self.view.expositor(res, object);
        });
    }

    Sustituto.prototype.get_notificacionesUnidad = function (req, res, next) {
        //Objeto que almacena la respuesta
        var object = {};
        //Referencia a la clase para callback
        var self = this;
        //Asigno a params el valor de mis variables    
        var params = [{
                name: 'idTipo',
                value: req.query.idTipo,
                type: self.model.types.STRING
                            
            },
            {
                name: 'numEconomico',
                value: req.query.numEconomico,
                type: self.model.types.STRING
                            
            },
            {
                name: 'fechaInicio',
                value: req.query.fechaInicio,
                type: self.model.types.STRING
                            
            },
            {
                name: 'fechaFin',
                value: req.query.fechaFin,
                type: self.model.types.STRING
                            
            }];

        this.model.query('[Sustituto].[SEL_UNIDAD_NOTIFICACION_SP]', params, function (error, result) {
            //Callback
            object.error = error;
            object.result = result;

            self.view.expositor(res, object);
        });
    }

    Sustituto.prototype.post_addunidadsustituto = function (req, res, next) {
        //Referencia a la clase para callback
        var self = this;
        //Asigno a params el valor de mis variables
        var params = [{
                name: 'idUnidad',
                value: req.body.idUnidad,
                type: self.model.types.INT
            },
            {
                name: 'idSustituto',
                value: req.body.idSustituto,
                type: self.model.types.INT
            },
            {
                name: 'idMotivo',
                value: req.body.idMotivo,
                type: self.model.types.INT
            },
            {
                name: 'idUsuario',
                value: req.body.idUsuario,
                type: self.model.types.INT 
            },
            {
                name: 'numeroOrden',
                value: req.body.numeroOrden,
                type: self.model.types.STRING 
            },
            {
                name: 'idContratoOperacion',
                value: req.body.idContratoOperacion,
                type: self.model.types.INT
                            
            }];

        this.model.post('[Sustituto].[INS_UNIDAD_SUSTITUTO_SP]', params, function (error, result) {
            //Callback
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    }

    Sustituto.prototype.get_reportesustituto = function (req, res, next) {
        //Obtención de valores de los parámetros del request
        var params = [];
        //Objeto que almacena la respuesta
        var object = {};
        //Referencia a la clase para callback
        var self = this;

        var params = [
            {
                name: 'idMotivo',
                value: req.query.idMotivo,
                type: self.model.types.INT
                            
            },{
                name: 'idContratoOperacion',
                value: req.query.idContratoOperacion,
                type: self.model.types.INT
                            
            }];

        this.model.query('[Sustituto].[SEL_REPORTE_SUSTITUTO_SP]', params, function (error, result) {
            self.view.expositor(res, {
                error: error,
                result: result
            });
        });
    }

    Sustituto.prototype.put_unidadDesvinculada = function(req,res,next){
        //Objeto que almacena la respuesta
        var object = {};
        //Objeto que envía los parámetros
        var params = {};
        //Referencia a la clase para callback
        var self = this;

        var params= [
        {
            name: 'idUnidadSustituto',
            value: req.body.idUnidadSustituto,
            type: self.model.types.INT
        }];

        this.model.post('[Sustituto].[UPD_ESTATUS_UNIDAD_SUSTITUTO_SP]',params, function (error,result){
            self.view.expositor(res,{
                error:error,
                result:result
            });
        });

    }

module.exports = Sustituto;
