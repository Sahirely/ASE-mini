var ConfiguradorView = require('../views/ejemploVista'),
    ConfiguradorModel = require('../models/dataAccess2');
var XLSX = require('xlsx');
var path = require('path');
var Load_Files = require('../controllers/load_files');
//var dirname = 'E:/ASE_Temp/';
var dirname = 'E:/ASEv2Documentos/public/archivos/';
var fs = require('fs');

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

//Obtiene los tipos de unidad del sistema de Proveedores
Configurador.prototype.get_tipoUnidadesProveedores = function(req, res, next) {
    var self = this;
    var params = [{
                      name: 'idOperacion',
                      value: req.query.idOperacion,
                      type: self.model.types.INT
                  }];
    this.model.query('SEL_TIPOS_UNIDAD_SIS_PROVEEDORES_SP', params, function(error, result) {
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
        name: 'formaPago',
        value: req.body.formaPago,
        type: self.model.types.STRING
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
    }, {
        name: 'idcentros',
        value: req.body.idcentros,
        type: self.model.types.STRING
    },{
        name: 'verificacion',
        value: req.body.verificacion,
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


    this.model.post('INS_CONTRATO_OPERACION_SP', params, function(error, result) {
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
    }, {
        name: 'idZona',
        value: req.body.idZona,
        type: self.model.types.INT
    }, {
        name: 'modelo',
        value: req.body.modelo,
        type: self.model.types.STRING
    }, {
        name: 'combustible',
        value: req.body.combustible,
        type: self.model.types.STRING
    }, {
        name: 'verificada',
        value: req.body.verificada,
        type: self.model.types.INT
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

//unidades
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

Configurador.prototype.get_getDatosFacturacion = function(req, res, next){
    var self = this;
    var params = [{name: 'idOperacion', value: req.query.idOperacion, type: self.model.types.INT}];

    self.model.query('SEL_DATOS_FACTURACION_OPERACION_SP', params, function (error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Configurador.prototype.get_insContratoFacturacion = function(req, res, next){
    var self = this;
    var params = [{name: 'idOperacion', value: req.query.idOperacion, type: self.model.types.INT},
                  {name: 'rfc', value: req.query.rfc, type: self.model.types.STRING},
                  {name: 'razonSocial', value: req.query.razonSocial, type: self.model.types.STRING}];

    self.model.query('INS_CONTRATO_OPERACION_FACTURACION_SP', params, function (error, result){
        self.view.expositor(res,{
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
    },{
        name: 'idOperacion',
        value: req.query.idOperacion,
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
    },{
        name: 'idOperacion',
        value: req.body.idOperacion,
        type: self.model.types.INT
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

//zonas
Configurador.prototype.get_zonas = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_ZONAS_OPERACIONES_SP', params, function(error, result) {
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
        name: 'idTipoUnidad',
        value: req.body.idTipoUnidad,
        type: self.model.types.INT
    }, {
        name: 'cantidad',
        value: req.body.cantidad,
        type: self.model.types.INT
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
    var workbook = XLSX.readFile(dirname + req.body.archivo);
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
                        }, {
                            name: 'idZona',
                            value: worksheet['H' + row].v,
                            type: self.model.types.INT
                        }, {
                            name: 'modelo',
                            value: worksheet['I' + row].v,
                            type: self.model.types.STRING
                        }, {
                            name: 'combustible',
                            value: worksheet['J' + row].v,
                            type: self.model.types.STRING
                        }, {
                            name: 'verificada',
                            value: worksheet['K' + row].v,
                            type: self.model.types.INT
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
        //Callback;
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


//devuelve los trabajos con estatus iniciados
Configurador.prototype.post_subirArchivo = function(req, res, next){
    var self = this;
    var Subir = new Load_Files();
     Subir.options({ // Type Options: * / img / xml / pdf / docs / xls
                     "myFile2": {"Name":"Unidad","Path": "E:/ASE_Temp", "Type": "*"}
                 });

    Subir.upload( function( respuesta ){
        self.view.expositor(res, {
            error: false,
            result: {success: true, respuesta: respuesta }
        });
    },"E:/ASE_Temp", req, res );
    // setTimeout( function(){},3000 );
}

////Método para insertar evidencia
Configurador.prototype.post_uploadfiles = function (req, res, next) {
    //res.end("File is uploaded");
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            idTrabajo = (req.body.idTrabajo).constructor !== Array ? req.body.idTrabajo : req.body.idTrabajo[0];
            var idCotizacion = req.body.idCotizacion.constructor !== Array ? req.body.idCotizacion : req.body.idCotizacion[0];
            var idCategoria = (req.body.idCategoria).constructor != Array ? req.body.idCategoria : req.body.idCategoria[0];
            idNombreEspecial = (req.body.idNombreEspecial).constructor != Array ? req.body.idNombreEspecial : req.body.idNombreEspecial[0];

            //LQMA  add 15092016 --idEstatus , define si crea el archivo de forma temporal
            //if (idNombreEspecial == 3)
            //  var idEstatus = (req.body.idEstatus).constructor != Array ? req.body.idEstatus : req.body.idEstatus[0];

            var idCotizacionArr = idCotizacion.split('|');
            carpetaCotizacion = idCotizacionArr[0];
            nombreFacturaCotizacion = idCotizacionArr[1];

            //LQMA add 15092016 -- cuando sea estatus 12, se guarda el archivo como temporal, y despues de pasar la validacion se
            //remplaza el original
            if (idNombreEspecial == 3)
                nombreFacturaCotizacion = nombreFacturaCotizacion + 'temp';

            if (idCategoria == 2) {
                if (idCotizacion == 0) {
                    if (!fs.existsSync(dirname + idTrabajo))
                        fs.mkdirSync(dirname + idTrabajo);
                    if (!fs.existsSync(dirname + idTrabajo + '/multimedia'))
                        fs.mkdirSync(dirname + idTrabajo + '/multimedia');
                    if (!fs.existsSync(dirname + idTrabajo + '/documentos'))
                        fs.mkdirSync(dirname + idTrabajo + '/documentos');
                    if (!fs.existsSync(dirname + idTrabajo + '/evidenciaTrabajo'))
                        fs.mkdirSync(dirname + idTrabajo + '/evidenciaTrabajo');
                    if (!fs.existsSync(dirname + idTrabajo + '/documentos/comprobanteRecepcion'))
                        fs.mkdirSync(dirname + idTrabajo + '/documentos/comprobanteRecepcion')
                    if (!fs.existsSync(dirname + idTrabajo + '/documentos/transferenciaCustodia'))
                        fs.mkdirSync(dirname + idTrabajo + '/documentos/transferenciaCustodia')
                    if (!fs.existsSync(dirname + idTrabajo + '/documentos/certificadoConformidad'))
                        fs.mkdirSync(dirname + idTrabajo + '/documentos/certificadoConformidad');
                    if (!fs.existsSync(dirname + idTrabajo + '/documentos/factura'))
                        fs.mkdirSync(dirname + idTrabajo + '/documentos/factura');
                    if (!fs.existsSync(dirname + idTrabajo + '/documentos/adendaCopade'))
                        fs.mkdirSync(dirname + idTrabajo + '/documentos/adendaCopade');
                    if (!fs.existsSync(dirname + idTrabajo + '/documentos/preFactura'))
                        fs.mkdirSync(dirname + idTrabajo + '/documentos/preFactura');
                } else {
                    if (idNombreEspecial == 3 || idNombreEspecial == 7) {
                        if (!fs.existsSync(dirname + idTrabajo)) {
                            fs.mkdirSync(dirname + idTrabajo);
                        }
                        if (!fs.existsSync(dirname + idTrabajo + '/' + carpetaCotizacion)) {
                            fs.mkdirSync(dirname + idTrabajo + '/' + carpetaCotizacion)
                        }
                        if (!fs.existsSync(dirname + idTrabajo + '/' + carpetaCotizacion + '/multimedia')) {
                            fs.mkdirSync(dirname + idTrabajo + '/' + carpetaCotizacion + '/multimedia')
                            fs.mkdirSync(dirname + idTrabajo + '/' + carpetaCotizacion + '/documentos')
                        }
                        if (!fs.existsSync(dirname + idTrabajo + '/' + carpetaCotizacion + '/documentos/factura')) {
                            fs.mkdirSync(dirname + idTrabajo + '/' + carpetaCotizacion + '/documentos/factura')
                        }
                        if (!fs.existsSync(dirname + idTrabajo + '/' + carpetaCotizacion + '/documentos/preFactura')) {
                            fs.mkdirSync(dirname + idTrabajo + '/' + carpetaCotizacion + '/documentos/preFactura')
                        }
                    }
                }

                if (idNombreEspecial == 1) {
                    nameFile = 'ComprobanteRecepcion';
                    cb(null, dirname + idTrabajo + '/documentos/comprobanteRecepcion');
                } else if (idNombreEspecial == 2) {
                    nameFile = 'TransferenciaCustodia';
                    cb(null, dirname + idTrabajo + '/documentos/transferenciaCustodia');
                } else if (idNombreEspecial == 3) {
                    nameFile = 'Factura_' + nombreFacturaCotizacion;
                    cb(null, dirname + idTrabajo + '/' + carpetaCotizacion + '/documentos/factura');
                } else if (idNombreEspecial == 4) {
                    var extFile = obtenerExtArchivo(file.originalname);
                    if (extFile === '.xml' || extFile === '.XML') {
                        nameFile = 'COPADE';
                    } else {
                        nameFile = 'Adenda';
                    }
                    cb(null, dirname + idTrabajo + '/documentos/adendaCopade');
                } else if (idNombreEspecial == 5) {
                    nameFile = 'CertificadoConformidad';
                    cb(null, dirname + idTrabajo + '/documentos/certificadoConformidad');
                } else if (idNombreEspecial == 6) {
                    nameFile = 'CertificadoConformidad';
                    cb(null, dirname + idTrabajo + '/documentos/certificadoConformidad');
                } else if (idNombreEspecial == 7) {
                    nameFile = 'preFactura_' + nombreFacturaCotizacion;
                    cb(null, dirname + idTrabajo + '/' + carpetaCotizacion + '/documentos/preFactura');
                } else {
                    nameFile = 'Evidencia';
                    cb(null, dirname + idTrabajo + '/evidenciaTrabajo');
                }
            } else if (idCategoria == 1) {
                if (!fs.existsSync(dirname + idTrabajo)) {
                    fs.mkdirSync(dirname + idTrabajo);
                }
                if (!fs.existsSync(dirname + idTrabajo + '/' + idCotizacion)) {
                    fs.mkdirSync(dirname + idTrabajo + '/' + idCotizacion);
                    fs.mkdirSync(dirname + idTrabajo + '/' + idCotizacion + '/multimedia');
                    fs.mkdirSync(dirname + idTrabajo + '/' + idCotizacion + '/documentos');
                }

                if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif' || file.mimetype == 'image/jpg' || file.mimetype == 'image/bmp' || file.mimetype == 'video/mp4') {
                    consecutivoArchivo = obtieneConsecutivo(dirname + idTrabajo + '/' + idCotizacion + '/multimedia');
                    cb(null, dirname + idTrabajo + '/' + idCotizacion + '/multimedia')
                } else {
                    consecutivoArchivo = obtieneConsecutivo(dirname + idTrabajo + '/' + idCotizacion + '/documentos');
                    cb(null, dirname + idTrabajo + '/' + idCotizacion + '/documentos')
                }
            } else if (idCategoria == 4) {
                var filename = guid();
                if (!fs.existsSync(dirname)) {
                    fs.mkdirSync(dirname);
                }
                if (idNombreEspecial == 0) {
                    nameFile = 'Unidades';
                    cb(null, dirname);
                }
            } else {
                nameFile = '';
                cb(null, dirCopades);
            }
        },
        filename: function (req, file, cb) {
            if (nameFile !== '') {
                if (nameFile === 'Evidencia') {
                    nameFile = nameFile + obtieneConsecutivo(dirname);
                }
                cb(null, nameFile + obtenerExtArchivo(file.originalname));
            } else if (consecutivoArchivo > 0) {
                cb(null, 'Evidencia' + consecutivoArchivo + obtenerExtArchivo(file.originalname));
            } else {
                cb(null, file.originalname);
            }
            nameFile = '';
            consecutivoArchivo = 0;
        }
    });
    var upload = multer({
        storage: storage
    }).any();

    upload(req, res, function (err) {
        if (err) {
            //console.log(err);
            return res.end("Error al subir el archivo.");
        } else {
            req.files.forEach(function (f) {
                //console.log(f.originalname);
                // and move file to final destination...
            });
            res.end("Archivo subido");
        }
    });
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4();
};

//Se obtiene la extensión del archivo
var obtenerExtArchivo = function (file) {
    return '.' + file.split('.').pop();
}

var obtieneConsecutivo = function (ruta) {
    var consecutivo = fs.readdirSync(ruta);
    return consecutivo.length + 1;
}

//Tipos de Niveles
 Configurador.prototype.get_tiposAprobacion = function (req, res, next) {

    var self = this;
    var params = [];

    this.model.query('SEL_TIPO_APROBACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Partidas Unidad
 Configurador.prototype.get_partidasUnidad = function (req, res, next) {

    var self = this;
    var params = [{
         name: 'idContratoOperacion',
         value: req.query.idContratoOperacion,
         type: self.model.types.INT
     },
     {
         name: 'idTipoUnidad',
         value: req.query.idTipoUnidad,
         type: self.model.types.INT
     }];

    this.model.query('SEL_PARTIDAS_UNIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Configurador.prototype.post_eliminaDetalleModulo = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idDetalleModulo',
        value: req.body.idDetalleModulo,
        type: self.model.types.INT
    }];


    this.model.post('DEL_DETALLE_MODULO_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

Configurador.prototype.post_eliminaModulo = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idModulo',
        value: req.query.idModulo,
        type: self.model.types.INT
    }];


    this.model.post('DEL_MODULO_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

Configurador.prototype.post_nivelMonto = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idOperacionContrato',
        value: req.body.idOperacionContrato,
        type: self.model.types.INT
    },{
        name: 'montoDe',
        value: req.body.montoDe,
        type: self.model.types.DECIMAL
    },{
        name: 'montoA',
        value: req.body.montoA,
        type: self.model.types.DECIMAL
    },{
        name: 'montoMax',
        value: req.body.montoMax,
        type: self.model.types.DECIMAL
    },{
        name: 'nivel',
        value: req.body.nivel,
        type: self.model.types.DECIMAL
    }];


    this.model.post('INS_DETALLE_APROBACION_MONTO_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

Configurador.prototype.post_EliminaNivelMonto = function(req, res, next){
  var self = this;
  var object = {};
  var params = [{name: 'idOperacionContrato', value: req.body.idOperacionContrato, type: self.model.types.INT}];

  self.model.post('DEL_NIVEL_MONTO_SP', params, function(error, result){
      object.error = error;
      object.result = result;

      self.view.expositor(res, object);
  });

}

Configurador.prototype.post_nivelPartida = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idOperacionContrato',
        value: req.body.idOperacionContrato,
        type: self.model.types.INT
    },{
        name: 'idPartida',
        value: req.body.idPartida,
        type: self.model.types.STRING
    },{
        name: 'nivel',
        value: req.body.nivel,
        type: self.model.types.DECIMAL
    }];


    this.model.post('INS_DETALLE_APROBACION_PARTIDA_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

Configurador.prototype.post_modificacionNivelMonto = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idOperacionContrato',
        value: req.body.idOperacionContrato,
        type: self.model.types.INT
    },{
        name: 'montoDe',
        value: req.body.montoDe,
        type: self.model.types.DECIMAL
    },{
        name: 'montoA',
        value: req.body.montoA,
        type: self.model.types.DECIMAL
    },{
        name: 'nivel',
        value: req.body.nivel,
        type: self.model.types.DECIMAL
    }];


    this.model.post('UPD_DETALLE_APROBACION_MONTO_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

Configurador.prototype.post_modificacionNivelPartida = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idOperacionContrato',
        value: req.body.idOperacionContrato,
        type: self.model.types.INT
    },{
        name: 'idPartida',
        value: req.body.idPartida,
        type: self.model.types.STRING
    },{
        name: 'nivel',
        value: req.body.nivel,
        type: self.model.types.DECIMAL
    }];


    this.model.post('UPD_DETALLE_APROBACION_PARTIDA_SP', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

Configurador.prototype.get_infoNivelMonto = function (req, res, next) {

     var self = this;
    var params = [{
        name: 'idOperacionContrato',
        value: req.query.idOperacionContrato,
        type: self.model.types.INT
    }];

    this.model.query('SEL_DETALLE_APROBACION_MONTO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Partidas Unidad
 Configurador.prototype.get_infoNivelPartida = function (req, res, next) {

    var self = this;
    var params = [{
         name: 'idContratoOperacion',
         value: req.query.idContratoOperacion,
         type: self.model.types.INT
     }//,
    //  {
    //      name: 'idTipoUnidad',
    //      value: req.query.idTipoUnidad,
    //      type: self.model.types.INT
    //  }
   ];

    this.model.query('SEL_DETALLE_APROBACION_PARTIDA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Configurador.prototype.get_catalogoTipoUsuarios =  function (req, res, next){
    var self = this;
    var params = []

    this.model.query('SEL_CATALOGO_TIPO_USUARIOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


module.exports = Configurador;
