var ConfiguradorView = require('../views/ejemploVista'),
    ConfiguradorModel = require('../models/dataAccess2');
var XLSX = require('xlsx');
var path = require('path');

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
        name: 'tiempoAsignado',
        value: req.body.tiempoAsignado,
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
    }, {
        name: 'idOperacion',
        value: req.body.idOperacion,
        type: self.model.types.INT


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
    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

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

//Inserta nueva Unidad
Configurador.prototype.post_nuevaUnidad = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'numeroEconomico',
        value: req.body.numeroEconomico,
        type: self.model.types.STRING
    }, {
        name: 'vin',
        value: req.body.vin,
        type: self.model.types.STRING
    },{
        name: 'gps',
        value: req.body.gps,
        type: self.model.types.INT
    }, {
        name: 'idTipoUnidad',
        value: req.body.idTipoUnidad,
        type: self.model.types.INT
    }, {
        name: 'sustituto',
        value: req.body.sustituto,
        type: self.model.types.INT
    }, {
        name: 'idOperacion',
        value: req.body.idOperacion,
        type: self.model.types.INT
    }, {
        name: 'idCentroTrabajo',
        value: req.body.idCentroTrabajo,
        type: self.model.types.INT
    }, {
        name: 'placas',
        value: req.body.placas,
        type: self.model.types.STRING
    }];


    this.model.post('INS_UNIDAD_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Centros De Trabajo
Configurador.prototype.get_centrosDeTrabajo = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_CENTROS_DE_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//tipo de unidad
Configurador.prototype.get_tipoUnidades = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_TIPO_DE_UNIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Modulos
Configurador.prototype.get_catalogoModulos = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    },{
        name: 'tipo',
        value: req.query.tipo,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_CATALOGO_MODULOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Detalle Modulos
Configurador.prototype.get_detalleModulo = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idModulo',
        value: req.query.idModulo,
        type: self.model.types.INT
    }];

    this.model.query('SEL_CATALOGO_DETALLE_MODULO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Configurador.prototype.post_moduloPorDertalle = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idModulo',
        value: req.body.idModulo,
        type: self.model.types.INT
    }, {
        name: 'detalle',
        value: req.body.detalle,
        type: self.model.types.STRING
    }];


    this.model.post('INS_DETALLE_MODULO_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

Configurador.prototype.post_moduloAdicional= function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idOperacion',
        value: req.body.idOperacion,
        type: self.model.types.INT
    }, {
        name: 'modulos',
        value: req.body.modulos,
        type: self.model.types.STRING
    }];


    this.model.post('INS_MODULO_ADICIONAL_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Datos de la Operación
Configurador.prototype.get_datosOperacion = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_DATOS_OPERACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Configurador.prototype.post_numeroUnidades= function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idOperacion',
        value: req.body.idOperacion,
        type: self.model.types.INT
    }, {
        name: 'unidades',
        value: req.body.unidades,
        type: self.model.types.STRING
    }, {
        name: 'numUnidades',
        value: req.body.numUnidades,
        type: self.model.types.STRING
    }];


    this.model.post('INS_UNIDAD_OPERACION_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//muestra el numero de unidades por operacion 
Configurador.prototype.get_unidadOperacion = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_UNIDAD_OPERACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}
//Carga de informacion de unidades en EXCEL
Configurador.prototype.post_cargararMaxUnidades = function(req, res, next) {

    var self = this;
    var workbook = XLSX.readFile(path.resolve(__dirname, '../../static/AngularJS/Configurador') + '/' + req.body.archivo);
    var first_sheet_name = workbook.SheetNames[0];
        //Método para carga
        var row = 0;
        var column = 'A';
        var address_of_cell = '';
        var hasRows = true;
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        //Recorro el contenido
        while (hasRows) {
            row++;
            address_of_cell = column + row.toString();
            if(row != 1){
                if (worksheet[address_of_cell] != null) {
                    if (worksheet[address_of_cell].v != '') {

                        //console.log(row);
                        var params = [{
                            name: 'numeroEconomico',
                            value: worksheet['A' + row].v,
                            type: self.model.types.STRING
                        }, {
                            name: 'vin',
                            value: worksheet['B' + row].v,
                            type: self.model.types.STRING
                        },{
                            name: 'gps',
                            value: worksheet['C' + row].v,
                            type: self.model.types.INT
                        }, {
                            name: 'idTipoUnidad',
                            value: worksheet['D' + row].v,
                            type: self.model.types.INT
                        }, {
                            name: 'sustituto',
                            value: worksheet['E' + row].v,
                            type: self.model.types.INT
                        }, {
                            name: 'idOperacion',
                            value: req.body.idOperacion,
                            type: self.model.types.INT
                        }, {
                            name: 'idCentroTrabajo',
                            value: worksheet['F' + row].v,
                            type: self.model.types.INT
                        }, {
                            name: 'placas',
                            value: worksheet['G' + row].v,
                            type: self.model.types.STRING
                        }];
                      

                        self.model.queryConnect('INS_UNIDAD_SP', params, null);

                    } else {
                        hasRows = false;
                    }
                } else {
                    hasRows = false;
                }
            }
        }
        //Devuelvo la salida
        self.view.expositor(res, {
            error: null,
            result: 'finish'
        });
    /*});*/
};

//Tipo de unidades por Operación
 Configurador.prototype.get_tipoUnidades_ = function (req, res, next) {

    var self = this;
    var params = [{
         name: 'idOperacion',
         value: req.query.idCita,
         type: self.model.types.INT
     }];

     this.model.query('SEL_TIPO_DE_UNIDAD_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
     });
}

Configurador.prototype.post_moduloporFechas = function(req, res, next) {

    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idOperacion',
        value: req.body.idOperacion,
        type: self.model.types.INT
    }, {
        name: 'idEstatusOrden',
        value: req.body.idEstatusOrden,
        type: self.model.types.INT
    }, {
        name: 'tiempoEnEspera',
        value: req.body.tiempoEnEspera,
        type: self.model.types.STRING
    }];


    this.model.post('INS_OPERACION_TIEMPO_EN_ESPERA_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

//Tipo de unidades por Operación
 Configurador.prototype.get_datosOperacionTiempoEspera = function (req, res, next) {

    var self = this;
    var params = [{
         name: 'idOperacion',
         value: req.query.idOperacion,
         type: self.model.types.INT
     }];

     this.model.query('SEL_OPERACION_TIEMPO_EN_ESPERA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
     });
}

module.exports = Configurador;
