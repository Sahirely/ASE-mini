var OsurView = require('../views/ejemploVista'),
    OsurModel = require('../models/dataAccess2');

var Osur = function (conf) {
    this.conf = conf || {};

    this.view = new OsurView();
    this.model = new OsurModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}
// Obtiene los centros de trabajo por operacion
Osur.prototype.get_centroTrabajo = function (req, res, next) {
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
Osur.prototype.get_presupuesto = function (req, res, next) {
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

// Guarda un nuevo presupuesto
Osur.prototype.post_nuevoPresupuesto = function (req, res, next) {
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
    }];

    this.model.post('INS_PRESUPUESTO_SP', params, function (error, result) {
        object.error = error;
        object.result = result;
        self.view.expositor(res, object);
    });
}
 // Activa el presupuesto para su uso
Osur.prototype.post_estatusPresupuestoCDT = function (req, res, next) {
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
module.exports = Osur;