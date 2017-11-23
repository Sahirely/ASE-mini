var ConfiguradorView = require('../views/ejemploVista'),
    ConfiguradorModel = require('../models/dataAccess2');
var XLSX = require('xlsx');
var path = require('path');
var Load_Files = require('../controllers/load_files');
//var dirname = 'E:/ASE_Temp/';

var dirname = 'E:/ASEv2Documentos/public/archivos/';
var dirCop = 'E:/ASEv2Documentos/public/copade/';
var dirnameTemp = 'E:/ASEv2Documentos/public/temp/';
//var dirname = 'E:/ASEv2Documentos/public/archivos/';
//var dirnameTemp = 'C:/Desarrollo de Software/Grupo Andrade/Software/ASEv2Documentos/public/Temp/';
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
    }, {
        name: 'verificacion',
        value: req.body.verificacion,
        type: self.model.types.INT
    }, {
        name: 'comentarioCotizacion',
        value: req.body.comentarioCotizacion,
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
    }, {
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

Configurador.prototype.get_getDatosFacturacion = function(req, res, next) {
    var self = this;
    var params = [{ name: 'idOperacion', value: req.query.idOperacion, type: self.model.types.INT }];

    self.model.query('SEL_DATOS_FACTURACION_OPERACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Configurador.prototype.get_insContratoFacturacion = function(req, res, next) {
    var self = this;
    var params = [{ name: 'idOperacion', value: req.query.idOperacion, type: self.model.types.INT },
        { name: 'rfc', value: req.query.rfc, type: self.model.types.STRING },
        { name: 'razonSocial', value: req.query.razonSocial, type: self.model.types.STRING }
    ];

    self.model.query('INS_CONTRATO_OPERACION_FACTURACION_SP', params, function(error, result) {
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
    }, {
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
    }, {
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
    }, {
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

Configurador.prototype.post_moduloAdicional = function(req, res, next) {
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

Configurador.prototype.post_numeroUnidades = function(req, res, next) {
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
        if (row != 1) {
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
                    }, {
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
Configurador.prototype.get_tipoUnidades_ = function(req, res, next) {

    var self = this;
    var params = [{
        name: 'idOperacion',
        value: req.query.idCita,
        type: self.model.types.INT
    }];

    this.model.query('SEL_TIPO_DE_UNIDAD_SP', params, function(error, result) {
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
Configurador.prototype.get_datosOperacionTiempoEspera = function(req, res, next) {

    var self = this;
    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_OPERACION_TIEMPO_EN_ESPERA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


//devuelve los trabajos con estatus iniciados
Configurador.prototype.post_subirArchivo = function(req, res, next) {
    var self = this;
    var Subir = new Load_Files();
    Subir.options({ // Type Options: * / img / xml / pdf / docs / xls
        "myFile2": { "Name": "Unidad", "Path": "E:/ASE_Temp", "Type": "*" }
    });

    Subir.upload(function(respuesta) {
        self.view.expositor(res, {
            error: false,
            result: { success: true, respuesta: respuesta }
        });
    }, "E:/ASE_Temp", req, res);
    // setTimeout( function(){},3000 );
}

Configurador.prototype.post_uploadMemo = function(req, res, next) {
    var randomName = ""
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            nameFile = dirnameTemp;
            cb(null, nameFile);
            res.end(randomName);
        },
        filename: function(req, file, cb) {
            if (file.mimetype == "image/png")
                randomName = new Date().getTime().toString() + ".jpg"
            if (file.mimetype == "image/jpeg")
                randomName = new Date().getTime().toString() + ".jpg"
            if (file.mimetype == "application/pdf")
                randomName = new Date().getTime().toString() + ".pdf"
            path = nameFile + randomName
            cb(null, randomName);
        }
    });
    var upload = multer({
        storage: storage
    }).any();

    upload(req, res, function(err) {
        if (err) {
            //console.log(err);
            return res.end("Error al subir el archivo.");
        } else {
            req.files.forEach(function(f) {
                //console.log(f.originalname);
                // and move file to final destination...
            });
            res.end("Archivo subido");
        }
    });
}


////Método para insertar evidencia
Configurador.prototype.post_uploadfiles = function(req, res, next) {
    //res.end("File is uploaded");
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            idTrabajo = (req.body.idTrabajo).constructor !== Array ? req.body.idTrabajo : req.body.idTrabajo[0];
            var idCotizacion = req.body.idCotizacion.constructor !== Array ? req.body.idCotizacion : req.body.idCotizacion[0];
            var idCategoria = (req.body.idCategoria).constructor != Array ? req.body.idCategoria : req.body.idCategoria[0];
            idNombreEspecial = (req.body.idNombreEspecial).constructor != Array ? req.body.idNombreEspecial : req.body.idNombreEspecial[0];

            if (idCategoria == 2) {
                nameFile = '';
                cb(null, dirCop);
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
        filename: function(req, file, cb) {
            if (nameFile !== '') {
                if (nameFile === 'Evidencia') {
                    nameFile = nameFile + obtieneConsecutivo(dirname);
                }
                cb(null, nameFile + obtenerExtArchivo(file.originalname));
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

    upload(req, res, function(err) {
        if (err) {
            //console.log(err);
            return res.end("Error al subir el archivo.");
        } else {
            req.files.forEach(function(f) {
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
var obtenerExtArchivo = function(file) {
    return '.' + file.split('.').pop();
}

var obtieneConsecutivo = function(ruta) {
    var consecutivo = fs.readdirSync(ruta);
    return consecutivo.length + 1;
}

//Tipos de Niveles
Configurador.prototype.get_tiposAprobacion = function(req, res, next) {

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
Configurador.prototype.get_partidasUnidad = function(req, res, next) {

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
        }
    ];

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
    }, {
        name: 'montoDe',
        value: req.body.montoDe,
        type: self.model.types.DECIMAL
    }, {
        name: 'montoA',
        value: req.body.montoA,
        type: self.model.types.DECIMAL
    }, {
        name: 'montoMax',
        value: req.body.montoMax,
        type: self.model.types.DECIMAL
    }, {
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

Configurador.prototype.post_EliminaNivelMonto = function(req, res, next) {
    var self = this;
    var object = {};
    var params = [{ name: 'idOperacionContrato', value: req.body.idOperacionContrato, type: self.model.types.INT }];

    self.model.post('DEL_NIVEL_MONTO_SP', params, function(error, result) {
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
    }, {
        name: 'idPartida',
        value: req.body.idPartida,
        type: self.model.types.STRING
    }, {
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
    }, {
        name: 'montoDe',
        value: req.body.montoDe,
        type: self.model.types.DECIMAL
    }, {
        name: 'montoA',
        value: req.body.montoA,
        type: self.model.types.DECIMAL
    }, {
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
    }, {
        name: 'idPartida',
        value: req.body.idPartida,
        type: self.model.types.STRING
    }, {
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

Configurador.prototype.get_infoNivelMonto = function(req, res, next) {

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
Configurador.prototype.get_infoNivelPartida = function(req, res, next) {

    var self = this;
    var params = [{
            name: 'idContratoOperacion',
            value: req.query.idContratoOperacion,
            type: self.model.types.INT
        } //,
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

Configurador.prototype.get_catalogoTipoUsuarios = function(req, res, next) {
    var self = this;
    var params = []

    this.model.query('SEL_CATALOGO_TIPO_USUARIOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Configurador.prototype.get_usuarios = function(req, res, next) {
    var self = this;
    var params = []

    this.model.query('SEL_USUARIOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

// Configurador.prototype.get_zonas = function(req, res, next) {
//     var self = this;
//     var params = [
//         { name: 'idOperacion', value: req.query.idOperacion, type: self.model.types.INT }
//     ]
//
//     this.model.query('SEL_ZONA_SP', params, function(error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }


module.exports = Configurador;
