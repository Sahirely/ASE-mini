var CitaView = require('../views/ejemploVista'),
    CitaModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto cita
var Cita = function(conf) {
    this.conf = conf || {};

    this.view = new CitaView();
    this.model = new CitaModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Cita.prototype.get_tiposOrdenesServicio = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_TIPOS_ORDENES_SERVICIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cita.prototype.get_tipoEstadoUnidad = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_TIPOS_ESTADOS_UNIDAD', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cita.prototype.put_agendarCita = function(req, res, next) {
    var self = this;
    console.log(req.query.fechaCita)
    var params = [{
        name: 'idUnidad',
        value: req.query.idUnidad,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idTipoOrdenServicio',
        value: req.query.idTipoOrdenServicio,
        type: self.model.types.INT
    }, {
        name: 'idEstadoUnidad',
        value: req.query.idEstadoUnidad,
        type: self.model.types.INT
    }, {
        name: 'grua',
        value: req.query.grua,
        type: self.model.types.INT
    }, {
        name: 'fechaCita',
        value: req.query.fechaCita,
        type: self.model.types.STRING
    }, {
        name: 'comentario',
        value: req.query.comentario,
        type: self.model.types.STRING
    }, {
        name: 'idZona',
        value: req.query.idZona,
        type: self.model.types.INT
    }, {
        name: 'taller',
        value: req.query.taller,
        type: self.model.types.INT
    }];

    this.model.query('INS_ORDEN_SERVICIO_SP', params, function(error, result) {
        console.log(result)
        console.log(error)
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Cita.prototype.get_servicios = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'numeroEconomico',
        value: req.query.economico,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_SERVICIOS_TALLERES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

// //obtiene el trabajo de la cita
// Cita.prototype.get_unidad = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [
//         {
//             name: 'datoUnidad',
//             value: req.query.datoUnidad,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'idUsuario',
//             value: req.query.idUsuario,
//             type: self.model.types.INT
//         }];

//     this.model.query('SEL_UNIDAD_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //obtiene el trabajo de la cita
// Cita.prototype.get_cliente = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //var params = [];
//     //Referencia a la clase para callback
//     var self = this;

//     //asignación de valores mediante parámetros del request
//     var params = [{
//         name: 'idUsuario',
//         value: req.query.idUsuario,
//         type: self.model.types.INT
//     }];

//     this.model.query('SEL_CLIENTE_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //obtiene las citas de la unidad
// Cita.prototype.get_cita = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{
//             name: 'idUnidad',
//             value: req.query.idUnidad,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idUsuario',
//             value: req.query.idUsuario,
//             type: self.model.types.INT
//         }];

//     this.model.query('SEL_UNIDAD_CITA_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //obtiene los talleres
// Cita.prototype.get_taller = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [
//         {
//             name: 'datoTaller',
//             value: req.query.datoTaller,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'idUsuario',
//             value: req.query.idUsuario,
//             type: self.model.types.INT
//         }
//     ];

//     this.model.query('SEL_TALLER_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //devuelve los paquetes/piezas del taller seleccionado
// Cita.prototype.get_paquete = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{
//         name: 'idTrabajo',
//         value: req.query.idTrabajo,
//         type: self.model.types.INT
//     }];

//     this.model.query('SEL_PAQUETE_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //obtiene el trabajo de la cita
// Cita.prototype.get_trabajo = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //var params = [];
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{
//         name: 'idCita',
//         value: req.query.idCita,
//         type: self.model.types.INT
//     }];

//     this.model.query('SEL_UNIDAD_TRABAJO', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// Cita.prototype.get_buscaCita = function (req, res, next) {
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Referencia a la clase para callback
//     var self = this;
//     //Asigno a params el valor de mis variables    
//     var params = [{
//             name: 'fecha',
//             value: req.query.fecha,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'idCita',
//             value: req.query.idCita,
//             type: self.model.types.DECIMAL
//         },
//         {
//             name: 'idUsuario',
//             value: req.query.idUsuario,
//             type: self.model.types.DECIMAL
//         }];

//     this.model.query('SEL_CITA_TALLER_SP', params, function (error, result) {
//         //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }



// //insertar nueva cita para una unidad
// Cita.prototype.post_addcita = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Asigno a params el valor de mis variables
//     var params = [{
//             name: 'idUnidad',
//             value: req.body.idUnidad,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idTaller',
//             value: req.body.idTaller,
//             type: self.model.types.INT
//         },
//         {
//             name: 'fecha',
//             value: req.body.fecha,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'trabajo',
//             value: req.body.trabajo,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'observacion',
//             value: req.body.observacion,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'idUsuario',
//             value: req.body.idUsuario,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idTipoCita',
//             value: req.body.idTipoCita,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idEstadoAutotanque',
//             value: req.body.idEstadoAutotanque,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idTrasladoUnidad',
//             value: req.body.idTrasladoUnidad,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idCliente',
//             value: req.body.idCliente,
//             type: self.model.types.INT
//         },
//         {
//             name: 'altace',
//             value: req.body.altace,
//             type: self.model.types.INT
//         }];

//     this.model.post('INS_CITA_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }



// //insertar cita servicio detalle
// Cita.prototype.post_addcitaserviciodetalle = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Asigno a params el valor de mis variables
//     var params = [{
//             name: 'idCita',
//             value: req.body.idCita,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idTipoElemento',
//             value: req.body.idTipoElemento,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idElemento',
//             value: req.body.idElemento,
//             type: self.model.types.INT
//         },
//         {
//             name: 'cantidad',
//             value: req.body.cantidad,
//             type: self.model.types.INT
//         }];

//     this.model.post('INS_CITA_SERVICIO_DETALLE_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //realiza el envío de email para la confimación de la cita
// Cita.prototype.get_enviaremailcita = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     var storeName = 'SEL_NOTIFICACION_CITA_SP';
//     //Obtención de valores de los parámetros del request
//     var params = [{
//         name: 'idCita',
//         value: req.query.idCita,
//         type: self.model.types.INT
//     }];

//     req.query.tipoCorreo == 4 ? storeName = 'SEL_NOTIFICACION_CITA_SIN_TALLER_SP' : storeName = 'SEL_NOTIFICACION_CITA_SP';

//     this.model.query(storeName, params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //valida si la cita ya está confirmada o de lo contrario lo confirma
// Cita.prototype.get_validaconfirmacioncita = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Asigno a params el valor de mis variables
//     var params = [{
//         name: 'idCita',
//         value: req.query.idCita,
//         type: self.model.types.INT
//     }];

//     this.model.query('SEL_VALIDA_CONIFIRMACION_CITA_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //obtiene los tipos de citas
// Cita.prototype.get_tipocita = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [];

//     this.model.query('SEL_TIPO_CITA_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// Cita.prototype.post_updateCita = function (req, res, next) {
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Objeto que envía los parámetros
//     var params = {};
//     //Referencia a la clase para callback
//     var self = this;

//     //Asigno a params el valor de mis variables
//     var params = [{
//             name: 'idCita',
//             value: req.body.idCita,
//             type: self.model.types.DECIMAL
//                         },
//         {
//             name: 'idUnidad',
//             value: req.body.idUnidad,
//             type: self.model.types.DECIMAL
//                         },
//         {
//             name: 'idTaller',
//             value: req.body.idTaller,
//             type: self.model.types.DECIMAL
//                         },
//         {
//             name: 'fecha',
//             value: req.body.fecha,
//             type: self.model.types.STRING
//                         },
//         {
//             name: 'trabajo',
//             value: req.body.trabajo,
//             type: self.model.types.STRING
//                         },
//         {
//             name: 'observacion',
//             value: req.body.observacion,
//             type: self.model.types.STRING
//                         },
//         {
//             name: 'idUsuario',
//             value: req.body.idUsuario,
//             type: self.model.types.DECIMAL
//         },
//         {
//             name: 'idTipoCita',
//             value: req.body.idTipoCita,
//             type: self.model.types.DECIMAL
//         },
//         {
//             name: 'idEstadoAutotanque',
//             value: req.body.idEstadoAutotanque,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idTrasladoUnidad',
//             value: req.body.idTrasladoUnidad,
//             type: self.model.types.INT
//         }];

//     this.model.post('UPD_CITA_SP', params, function (error, result) {
//         //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }

// Cita.prototype.get_citamodificar = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{
//         name: 'idCita',
//         value: req.query.idCita,
//         type: self.model.types.DECIMAL
//     }];

//     this.model.query('SEL_IDCITA_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }


// Cita.prototype.post_BorraCita = function (req, res, next) {
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Objeto que envía los parámetros
//     var params = {};
//     //Referencia a la clase para callback
//     var self = this;

//     //Asigno a params el valor de mis variables
//     var params = [{
//         name: 'idCita',
//         value: req.body.idCita,
//         type: self.model.types.DECIMAL
//                         }];

//     this.model.post('UPD_CITA_ESTATUS_SP', params, function (error, result) {
//         //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }

// Cita.prototype.post_agregacitaServiciodetalle = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Asigno a params el valor de mis variables
//     var params = [{
//             name: 'idCita',
//             value: req.body.idCita,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idTipoElemento',
//             value: req.body.idTipoElemento,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idElemento',
//             value: req.body.idElemento,
//             type: self.model.types.INT
//         },
//         {
//             name: 'cantidad',
//             value: req.body.cantidad,
//             type: self.model.types.INT
//         },
//         {
//             name: 'accion',
//             value: req.body.accion,
//             type: self.model.types.INT
//         }];

//     this.model.post('INS_CITA_SERVICIO_DETALLE_UPD_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //Obtiene los estados del autotanque
// Cita.prototype.get_estadoAutotanque = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [];

//     this.model.query('SEL_ESTADO_AUTOTANQUE_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// Cita.prototype.get_trasladoUnidad = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [];

//     this.model.query('SEL_TRASLADO_UNIDAD_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //Obtiene la preOrden de Servicio (pre-Cotizacion)
// Cita.prototype.get_preOrden = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{
//         name: 'idCita',
//         value: req.query.idCita,
//         type: self.model.types.DECIMAL
//     }];

//     this.model.query('SEL_PRECOTIZACIONES_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //Elimina una Pre-Cotización
// Cita.prototype.post_eliminaPreCotizacion = function (req, res, next) {
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Objeto que envía los parámetros
//     var params = {};
//     //Referencia a la clase para callback
//     var self = this;

//     //Asigno a params el valor de mis variables
//     var params = [
//         {
//             name: 'idCita',
//             value: req.body.idCita,
//             type: self.model.types.DECIMAL
//         },
//         {
//             name: 'idCotizacion',
//             value: req.body.idCotizacion,
//             type: self.model.types.DECIMAL
//         }
//     ];

//     this.model.post('DEL_PRECOTIZACIONES_SP', params, function (error, result) {
//         //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }

// //Actualiza el estatus de las cotizaciones para aprobación
// Cita.prototype.post_enviaAprobacion = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Asigno a params el valor de mis variables
//     var params = [
//         {
//             name: 'idCita',
//             value: req.body.idCita,
//             type: self.model.types.INT
//         }
//     ];

//     this.model.post('UPD_ENVIA_APROBACION_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //Devuelve la inforción de una cita
// Cita.prototype.get_datosCita = function (req, res, next) {
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Referencia a la clase para callback
//     var self = this;
//     //Asigno a params el valor de mis variables    
//     var params = [
//         {
//             name: 'idCita',
//             value: req.query.idCita,
//             type: self.model.types.INT
//         }
//     ];

//     this.model.query('SEL_DATOS_CITA_SP', params, function (error, result) {
//         //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }

// //insertar registro para comprobante de recepción 
// Cita.prototype.post_addcomprobanterecepcion = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Asigno a params el valor de mis variables
//     var params = [{
//             name: 'ext_Claxon',
//             value: req.body.ext_Claxon,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ext_TaponGasolina',
//             value: req.body.ext_TaponGasolina,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ext_TaponLlantas',
//             value: req.body.ext_TaponLlantas,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ext_FarosDelanteros',
//             value: req.body.ext_FarosDelanteros,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ext_Antena',
//             value: req.body.ext_Antena,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ext_Emblemas',
//             value: req.body.ext_Emblemas,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ext_Cristales',
//             value: req.body.ext_Cristales,
//             type: self.model.types.INT
//         },
//         {
//             name: 'int_EspejoRetrovisor',
//             value: req.body.int_EspejoRetrovisor,
//             type: self.model.types.INT
//         },
//         {
//             name: 'int_Radio',
//             value: req.body.int_Radio,
//             type: self.model.types.INT
//         },
//         {
//             name: 'int_CinturonSeguridad',
//             value: req.body.int_CinturonSeguridad,
//             type: self.model.types.INT
//         },
//         {
//             name: 'int_ManijasSeguros',
//             value: req.body.int_ManijasSeguros,
//             type: self.model.types.INT
//         },
//         {
//             name: 'int_Tapetes',
//             value: req.body.int_Tapetes,
//             type: self.model.types.INT
//         },
//         {
//             name: 'int_Ac',
//             value: req.body.int_Ac,
//             type: self.model.types.INT
//         },
//         {
//             name: 'int_BolsaAireDelantera',
//             value: req.body.int_BolsaAireDelantera,
//             type: self.model.types.INT
//         },
//         {
//             name: 'int_BolsaAireLateral',
//             value: req.body.int_BolsaAireLateral,
//             type: self.model.types.INT
//         },
//         {
//             name: 'int_LlavesUnidad',
//             value: req.body.int_LlavesUnidad,
//             type: self.model.types.INT
//         },
//         {
//             name: 'acs_Reflejantes',
//             value: req.body.acs_Reflejantes,
//             type: self.model.types.INT
//         },
//         {
//             name: 'acs_Extintor',
//             value: req.body.acs_Extintor,
//             type: self.model.types.INT
//         },
//         {
//             name: 'acs_LlantaRefaccion',
//             value: req.body.acs_LlantaRefaccion,
//             type: self.model.types.INT
//         },
//         {
//             name: 'acs_CableCorriente',
//             value: req.body.acs_CableCorriente,
//             type: self.model.types.INT
//         },
//         {
//             name: 'acs_PeliculaAntiasalto',
//             value: req.body.acs_PeliculaAntiasalto,
//             type: self.model.types.INT
//         },
//         {
//             name: 'com_TaponAceite',
//             value: req.body.com_TaponAceite,
//             type: self.model.types.INT
//         },
//         {
//             name: 'com_TaponRadiador',
//             value: req.body.com_TaponRadiador,
//             type: self.model.types.INT
//         },
//         {
//             name: 'com_VarillaAceite',
//             value: req.body.com_VarillaAceite,
//             type: self.model.types.INT
//         },
//         {
//             name: 'com_Bateria',
//             value: req.body.com_Bateria,
//             type: self.model.types.INT
//         },
//         {
//             name: 'com_TaponMotor',
//             value: req.body.com_TaponMotor,
//             type: self.model.types.INT
//         },
//         {
//             name: 'doc_PolizaSeguro',
//             value: req.body.doc_PolizaSeguro,
//             type: self.model.types.INT
//         },
//         {
//             name: 'doc_TarjetaCirculacion',
//             value: req.body.doc_TarjetaCirculacion,
//             type: self.model.types.INT
//         },
//         {
//             name: 'tab_Descripcion',
//             value: req.body.tab_Descripcion,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'tab_Odometro',
//             value: req.body.tab_Odometro,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ubi_Delantera',
//             value: req.body.ubi_Delantera,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ubi_DelanteraDesc',
//             value: req.body.ubi_DelanteraDesc,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'ubi_Trasera',
//             value: req.body.ubi_Trasera,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ubi_TraseraDesc',
//             value: req.body.ubi_TraseraDesc,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'ubi_ParteDerecha',
//             value: req.body.ubi_ParteDerecha,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ubi_ParteDerechaDesc',
//             value: req.body.ubi_ParteDerechaDesc,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'ubi_ParteIzquierda',
//             value: req.body.ubi_ParteIzquierda,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ubi_ParteIzquierdaDesc',
//             value: req.body.ubi_ParteIzquierdaDesc,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'ubi_Techo',
//             value: req.body.ubi_Techo,
//             type: self.model.types.INT
//         },
//         {
//             name: 'ubi_TechoDesc',
//             value: req.body.ubi_TechoDesc,
//             type: self.model.types.STRING
//         },
//         {
//             name: 'aprobacion',
//             value: req.body.aprobacion,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idCita',
//             value: req.body.idCita,
//             type: self.model.types.INT
//         },
//         {
//             name: 'idUsuario',
//             value: req.body.idUsuario,
//             type: self.model.types.INT
//         }];

//     this.model.post('INS_DATOS_UNIDAD_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //Devuelve la inforción para PDF Comprobante de Recepción
// Cita.prototype.get_generapdf = function (req, res, next) {
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Referencia a la clase para callback
//     var self = this;
//     //Asigno a params el valor de mis variables    
//     var params = [
//         {
//             name: 'idCita',
//             value: req.query.idCita,
//             type: self.model.types.INT
//         }
//     ];

//     this.model.query('SEL_COMPROBANTE_RECEPCION_SP', params, function (error, result) {
//         //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }


module.exports = Cita;
