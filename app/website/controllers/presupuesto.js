var PresupuestoView = require('../views/ejemploVista'),
    PresupuestoModel = require('../models/dataAccess2');

var Presupuesto = function (conf) {
    this.conf = conf || {};

    this.view = new PresupuestoView();
    this.model = new PresupuestoModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}
// Obtiene los centros de trabajo por operacion
Presupuesto.prototype.get_centroTrabajo = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_CENTROS_DE_TRABAJO_SP', params, function (error, result) {
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}

// Obtiene los datos de los presupuestos por el centro de trabajo
Presupuesto.prototype.get_presupuesto = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idCentroTrabajo',
        value: req.query.idCentroTrabajo,
        type: self.model.types.INT
    },{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_PRESUPUESTO_CDT_SP', params, function (error, result) {
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}

//obtiene las ordenes del centro de trabajo
Presupuesto.prototype.get_ordenesByCT = function (req, res, next){
    var object = {};
    var params = [];
    var self = this;

    var params = [{name: 'idCentroTrabajo', value: req.query.idCentroTrabajo, type: self.model.types.INT},
                  {name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT}];

    self.model.query('SEL_ORDENES_BY_CENTRO_TRABAJO_SP', params, function (error, result){
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}

Presupuesto.prototype.get_ordenesByPresupuestoEspecial = function (req, res, next){
    var object = {};
    var params = [];
    var self = this;

    var params = [{name: 'idPresupuesto', value: req.query.idPresupuesto, type:self.model.types.INT},
                  {name: 'idContratoOperacion', value: req.query.idContratoOperacion, type:self.model.types.INT}];

    self.model.query('SEL_ORDENES_BY_PRESUPUESTO_ESPECIAL_SP', params, function (error, result){
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}

Presupuesto.prototype.get_insOrdenPresupuestoEspecial = function (req, res, next){
    var object = {};
    var params = [];
    var self = this;

    var params = [{name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT},
                  {name: 'idPresupuesto', value: req.query.idPresupuesto, type: self.model.types.INT},
                  {name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT}];

    self.model.query('INS_ORDEN_PRESUPUESTO_ESPECIAL_SP', params, function (error, result){
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}

// Guarda un nuevo presupuesto
Presupuesto.prototype.post_nuevoPresupuesto = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'presupuesto',
        value: req.body.presupuesto,
        type: self.model.types.DECIMAL
    },{
        name: 'folioPresupuesto',
        value: req.body.folioPresupuesto,
        type: self.model.types.STRING
    },{
        name: 'fechaInicioPresupuesto',
        value: req.body.fechaInicioPresupuesto,
        type: self.model.types.STRING
    },{
        name: 'fechaFinalPresupuesto',
        value: req.body.fechaFinalPresupuesto,
        type: self.model.types.STRING
    },{
        name: 'idCentroTrabajo',
        value: req.body.idCentroTrabajo,
        type: self.model.types.INT
    },{
        name: 'idUsuario',
        value: req.body.idUsuario,
        type: self.model.types.INT
    },{
        name: 'solpe',
        value: req.body.solpe,
        type: self.model.types.STRING
    },{
        name: 'isEspecial',
        value: req.body.isEspecial,
        type: self.model.types.INT
    }];

    this.model.post('INS_PRESUPUESTO_SP', params, function (error, result) {
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}
 // Activa el presupuesto para su uso
Presupuesto.prototype.post_estatusPresupuestoCDT = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
            name: 'idPresupuesto',
            value: req.body.idPresupuesto,
            type: self.model.types.INT
        },{
            name: 'idCentroTrabajo',
            value: req.body.idCentroTrabajo,
            type: self.model.types.INT
        }];

    this.model.post('UPD_PRESUPUESTO_CDT_SP', params, function (error, result) {
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}
//Obtiene la totalidad de las hojas de trabajo generadas en la historia
Presupuesto.prototype.get_presupuestoHistoria = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idPresupuesto',
        value: req.query.idPresupuesto,
        type: self.model.types.INT
    }];

    this.model.query('SEL_PRESUPUESTO_DETALLE_SP', params, function (error, result) {
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}
// Detalle de las ordenes que estan en proceso y que esta por autorizar
Presupuesto.prototype.get_presupuestoDetalle = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idCentroTrabajo',
        value: req.query.idCentroTrabajo,
        type: self.model.types.INT
    }];

    this.model.query('SEL_ORDEN_PENDIENTE_HOJA_TRABAJO_SP', params, function (error, result) {
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}

Presupuesto.prototype.get_traspasos = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idPresupuestoDestino',
        value: req.query.idPresupuestoDestino,
        type: self.model.types.INT
    }];

    this.model.query('SEL_TRASPASOS_SP', params, function (error, result) {
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}



Presupuesto.prototype.post_insTraspasoPresupuesto = function (req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
            name: 'idPresupuestoOrigen',
            value: req.body.idPresupuestoOrigen,
            type: self.model.types.INT
        },{
            name: 'idPresupuestoDestino',
            value: req.body.idPresupuestoDestino,
            type: self.model.types.INT
        },{
            name: 'monto',
            value: req.body.monto,
            type: self.model.types.DECIMAL
        }];

    this.model.post('INS_TRASPASO_PRESUPUESTO_SP', params, function (error, result) {
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}






module.exports = Presupuesto;
