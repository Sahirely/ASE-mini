var DetalleView = require('../views/ejemploVista'),
    DetalleModel = require('../models/dataAccess2');

var Load_Files = require('../controllers/load_files');

var _PathDocuments = "E:\\ASEv2Documentos\\public\\orden\\"

var Detalle = function(conf) {
    this.conf = conf || {};

    this.view = new DetalleView();
    this.model = new DetalleModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }


    this.middlewares = []
}

Detalle.prototype.get_validaFactura = function(req, res, next) {
    var self = this;
    var soap = require('soap');

    var fs = require('fs');
    var pathname = _PathDocuments + req.query.path;
    fs.readFile(pathname, 'utf-8', (err, data) => {
        if (err) {
            console.log('Error: ReadFile');
            console.log(err);
            self.view.expositor(res, {
                error: true,
                result: err
            });
        } else {
            var parseString = require('xml2js').parseString;
            var xml = data;
            parseString(xml, function(err, result) {
                if (err) {
                    console.log('Error: parseString');
                    console.log(err);
                    self.view.expositor(res, {
                        error: true,
                        result: err
                    });
                } else {
                    // var xml    = '<?xml version="1.0" encoding="UTF-8" ?><ejemplo></ejemplo>';
                    var xml_b64 = new Buffer(xml).toString('base64');

                    var url = 'http://cfdiee.com:8080/Validadorfull/Validador?wsdl';
                    var args = { xml: xml_b64 };

                    soap.createClient(url, function(err, client) {
                        if (err) {
                            console.log("soap.createClient");
                            console.log(err);

                            var fs = require("fs");
                            fs.unlink(pathname, function(err) {
                                var uri = pathname.split('.');
                                uri[1] = 'pdf';
                                var suri = uri.join('.');
                                fs.unlink(suri, function(err) {});

                                if (err) {
                                    console.error(err);
                                }
                            });

                            self.view.expositor(res, {
                                error: false,
                                result: { return: { codigo: 2, Incidencia: err.code, Mensaje: "No se ha podido validar la factura, intente más tarde." } }
                            });
                        } else {
                            client.ValidaAll(args, function(err, validacion) {
                                if (err) {
                                    console.log("client.ValidaAll");
                                    console.log(err);
                                    self.view.expositor(res, {
                                        error: false,
                                        result: { return: { codigo: 0, Mensaje: err.code } }
                                    });
                                } else {
                                    var codigo = validacion.return.codigo; // 0 => Inválido; 1 => Válido
                                    if (codigo == 0) {
                                        var fs = require("fs");
                                        fs.unlink(pathname, function(err) {
                                            var uri = pathname.split('.');
                                            uri[1] = 'pdf';
                                            var suri = uri.join('.');
                                            fs.unlink(suri, function(err) {});

                                            if (err) {
                                                console.error(err);
                                            }
                                        });
                                    } else {
                                        validacion.xml = data;
                                        validacion.xml_objet = result;
                                        console.log("Mas validaciones");
                                    }

                                    self.view.expositor(res, {
                                        error: false,
                                        result: validacion
                                    });
                                }
                            });
                        }
                    });
                    // console.log('----------------------------------------------------');
                    // console.log( data );
                    // console.log('----------------------------------------------------');
                    // console.log( result );
                    // console.log('----------------------------------------------------');
                    // miCallback( { success:true, xml: data, data:result } );
                }
            });
        }
    });
}

Detalle.prototype.get_eliminaFactura = function(req, res, next) {
    var self = this;
    var pathname = _PathDocuments + req.query.path;
    var fs = require("fs");
    fs.unlink(pathname, function(err) {
        var uri = pathname.split('.');
        uri[1] = 'pdf';
        var suri = uri.join('.');
        fs.unlink(suri, function(err) {});

        if (err) {
            console.error(err);
        } else {
            console.error("Factura eliminada");
        }
    });
    var params = [
        { name: 'numeroCotizacion', value: req.query.numeroCotizacion, type: self.model.types.STRING }
    ];

    this.model.query('SEL_VALIDA_RFC_FACTURA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_getRFCFactura = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'numeroCotizacion', value: req.query.numeroCotizacion, type: self.model.types.STRING }
    ];

    this.model.query('SEL_VALIDA_RFC_FACTURA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_ordenDescontada = function(req, res, next){

    var self = this;
    var params = [{name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT}];

    self.model.query('SEL_ORDEN_DESCONTADA_OSUR_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_getUsuarioHojaTrabajo = function(req, res, next){
    var self = this;
    var params = [{name: 'numOrden', value: req.query.numOrden, type: self.model.types.STRING},
                  {name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT}];

    this.model.query('SEL_USUARIO_HOJA_TRABAJO_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_insertarFactura = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT },
        { name: 'numFactura', value: req.query.numFactura, type: self.model.types.STRING },
        { name: 'uuid', value: req.query.uuid, type: self.model.types.STRING },
        { name: 'fechaFactura', value: req.query.fechaFactura, type: self.model.types.STRING },
        { name: 'subTotal', value: req.query.subTotal, type: self.model.types.DECIMAL },
        { name: 'iva', value: req.query.iva, type: self.model.types.DECIMAL },
        { name: 'total', value: req.query.total, type: self.model.types.DECIMAL },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'xml', value: req.query.xml, type: self.model.types.STRING },
        { name: 'rfcEmisor', value: req.query.rfcEmisor, type: self.model.types.STRING },
        { name: 'rfcReceptor', value: req.query.rfcReceptor, type: self.model.types.STRING }
    ];

    this.model.query('INS_FACTURA_COTIZACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_fechaRealTrabajo = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT },
        { name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING }
    ];

    this.model.query('UPD_FECHA_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_tiempoTranscurrido = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
    }];

    self.model.query('SEL_TIEMPO_TRANCURRIDO_ORDEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_cambiarStatusOrden = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.STRING }
    ];

    this.model.query('UPD_ESTATUS_ORDEN_SERVICIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_facturasPorOrden = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'numeroOrden', value: req.query.numeroOrden, type: self.model.types.STRING },
        { name: 'estatus', value: req.query.estatus, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT }
    ];
    var respuesta = [];

    self.model.query('SEL_COTIZACIONES_ORDEN_SP', params, function(error, result) {
        var tamanio = result.length;
        result.forEach(function(item, key) {
            var params_factura = [
                { name: 'idOrden', value: item.idOrden, type: self.model.types.INT },
                { name: 'idCotizacion', value: item.consecutivoCotizacion, type: self.model.types.INT },
                { name: 'path', value: _PathDocuments, type: self.model.types.STRING },
                { name: 'pathSend', value: req.query.pathSend, type: self.model.types.STRING }
            ];

            self.model.query('SEL_FACTURAS_SP', params_factura, function(fac_error, fac_result) {
                var facturillas = [];
                fac_result.forEach(function(element, k) {
                    element.tipo = element.rutaDocumento.split('.').pop().toLowerCase();
                    facturillas.push(element);
                });

                respuesta.push({ numeroCotizacion: item.numeroCotizacion, facturas: facturillas });

                if (key >= (tamanio - 1)) {
                    self.view.expositor(res, {
                        error: error,
                        result: {
                            success: true,
                            msg: 'Se encontraron ' + respuesta.length + ' registros.',
                            data: respuesta
                        }
                    });
                }
            });
        });
    });
}

Detalle.prototype.get_validaTerminoTrabajo = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT }
    ];

    this.model.query('SEL_VALIDA_TERMINO_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_validaTokenAprobacion = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'Token', value: req.query.Token, type: self.model.types.STRING },
        { name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT },
        { name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT }
    ];

    this.model.query('SEL_VALIDA_TOKEN_APROBACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_validaToken = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'Token', value: req.query.Token, type: self.model.types.STRING },
        { name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT }
    ];

    this.model.query('SEL_VALIDA_TOKEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_rechazaTrabajo = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.STRING },
        { name: 'motivo', value: req.query.motivo, type: self.model.types.STRING }
    ];

    this.model.query('UPD_RECHAZA_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//devuelve los trabajos con estatus iniciados
Detalle.prototype.post_subirFactura = function(req, res, next) {
    var self = this;

    // Subir Archivos
    var lf = new Load_Files();
    lf.options({ // Type Options: * / img / xml / pdf / docs / xls
        "file_1": { "Name": "factura1", "Path": "xml", "Type": "xml" },
        "file_2": { "Name": "factura1", "Path": "pdf", "Type": "pdf" }
    });

    lf.facturas("E:/ASE_Temp/", req, res, function(respuesta) {
        // console.log( respuesta );
        respuesta.forEach(function(element) {
            // console.log(element.fieldname);
            if (element.fieldname == "file_1") {
                // console.log( element.Param );

                var fs = require('fs');

                fs.readFile(element.Path, 'utf-8', (err, data) => {
                    if (err) {
                        // console.log( { success:false, data:err } );
                    } else {
                        var parseString = require('xml2js').parseString;
                        var xml = data;
                        parseString(xml, function(err, result) {
                            if (err) {
                                // console.log( { success:false, data:err } );
                            } else {
                                var soap = require('soap');
                                var url = 'http://cfdiee.com:8080/Validadorfull/Validador?wsdl';
                                var xml_base64 = new Buffer(data).toString('base64');
                                var args = { xml: xml_base64 };

                                soap.createClient(url, function(err, client) {
                                    if (err) {
                                        self.view.expositor(res, {
                                            error: false,
                                            result: { success: false, error: err }
                                        });
                                    } else {
                                        client.ValidaAll(args, function(err, validacion) {

                                            // var codigo = validacion.return.codigo;
                                            var codigo = 1;
                                            if (codigo == 0) {
                                                self.view.expositor(res, {
                                                    error: false,
                                                    result: { success: true, res: validacion }
                                                });
                                            } else {
                                                var xml = result;
                                                var UUID = xml['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$['UUID'];
                                                var RFC_Emisor = xml['cfdi:Comprobante']['cfdi:Emisor'][0].$['rfc']
                                                var RFC_Receptor = xml['cfdi:Comprobante']['cfdi:Receptor'][0].$['rfc'];
                                                var Total = xml['cfdi:Comprobante'].$['total'];

                                                // 4524.25 - 4524.98

                                                // var totalCotizacion = 4525.98;
                                                var totalCotizacion = element.Param.cotizacionTotal;

                                                //console.log( Total );
                                                // console.log( (totalCotizacion - 1) );
                                                // console.log( (totalCotizacion + 1) );
                                                if (Total >= (parseInt(totalCotizacion) - 1) && Total <= (parseInt(totalCotizacion) + 1)) {

                                                    var params = [
                                                        { name: 'ruta', value: element.Path, type: self.model.types.STRING },
                                                        { name: 'idOrden', value: element.Param.idOrden, type: self.model.types.INT },
                                                        { name: 'idCotizacion', value: element.Param.cotizacionFactura, type: self.model.types.INT }
                                                    ];

                                                    self.model.query('INS_FACTURA_SP', params, function(error, result) {
                                                        // self.view.expositor(res, {
                                                        //     error: error,
                                                        //     result: result
                                                        // });



                                                        self.view.expositor(res, {
                                                            error: false,
                                                            result: {
                                                                success: true,
                                                                res: {
                                                                    "return": {
                                                                        "codigo": 1,
                                                                        "mensaje": "Esta dentro del rango",
                                                                        "Total cotizacion": totalCotizacion,
                                                                        "Total factura": Total
                                                                    }
                                                                }
                                                            }
                                                        });
                                                    });


                                                } else {
                                                    self.view.expositor(res, {
                                                        error: false,
                                                        result: {
                                                            success: true,
                                                            res: {
                                                                "return": {
                                                                    "codigo": 0,
                                                                    "mensaje": "El monto de la factura no coincide con el de la cotización",
                                                                    "Total cotizacion": totalCotizacion,
                                                                    "Total factura": Total
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}

Detalle.prototype.post_subirFacturaTmp = function(req, res, next) {

    // console.log('se quiere subir facturas');
    var self = this;
    var lf = new Load_Files();

    lf.upload(_PathDocuments, req, res, function(respuesta) {
        var Resultado = respuesta;

        self.view.expositor(res, {
            error: false,
            result: { Success: true, Msg: 'Factura cargada correctamente', data: Resultado }
        });
    });
}

Detalle.prototype.post_subirEvidencia = function(req, res, next) {

    // console.log('se quiere subir facturas');
    var self = this;
    var lf = new Load_Files();

    lf.evidencia(_PathDocuments, req, res, function(respuesta) {
        var Resultado = respuesta;
        // var Parametros = respuesta[0].Param;
        self.view.expositor(res, {
            error: false,
            result: { Success: true, Msg: 'Factura cargada correctamente', data: Resultado }
        });
    });
}

Detalle.prototype.get_guardarDocumento = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'ruta', value: req.query.ruta, type: self.model.types.STRING },
        { name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT },
        { name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT }
    ];
    self.model.query('INS_FACTURA_SP', params, function(error, result) {
        console.log(error);
    });
};


Detalle.prototype.get_insertaNota = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'nota',
        value: req.query.nota,
        type: self.model.types.STRING
    }, {
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idEstatusOrden',
        value: req.query.idEstatusOrden,
        type: self.model.types.INT
    }];

    this.model.query('INS_NOTA', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_insertaComentario = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'notaComenta',
        value: req.query.notaComenta,
        type: self.model.types.STRING
    }, {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idEstatusOrden',
        value: req.query.idEstatusOrden,
        type: self.model.types.INT
    }, {
        name: 'idCotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
    }];

    this.model.query('INS_COMENTARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_obtenerHistoricoOrden = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_HISTORICO_ORDEN', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_obtenerIdCotzPorOrden = function(req, res, next) {
    var self = this;
    var params = [{
            name: 'numOrden',
            value: req.query.numOrden,
            type: self.model.types.STRING
        },
        {
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        },
        {
            name: 'idContratoOperacion',
            value: req.query.idContratoOperacion,
            type: self.model.types.INT
        }
    ];

    this.model.query('SEL_ID_COTIZACIONES_POR_ORDEN', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_obtenerHistoricoCotizacion = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idCotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_HISTORICO_COTIZACIONES', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}



//LQMA 07062017
Detalle.prototype.get_reporteConformidad = function(req, res, next) {
    var self = this;
    var params = [{
            name: 'idOrden',
            value: req.query.idOrden,
            type: self.model.types.INT
        },
        {
            name: 'idContratoOperacion',
            value: req.query.idContratoOperacion,
            type: self.model.types.INT
        },
        {
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        }
    ];
    this.model.queryAllRecordSet('SEL_REPORTE_CONFORMIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_existComprobanteRecepcion = function(req, res, next) {
    var self = this;
    var params = [{
            name: 'numeroOrden',
            value: req.query.numeroOrden,
            type: self.model.types.STRING
        },
        {
            name: 'idCatalogoDocumento',
            value: req.query.idCatalogoDocumento,
            type: self.model.types.INT
        }
    ];

    this.model.queryAllRecordSet('SEL_VALIDA_DOCUMENTO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//LQMA 07062017
Detalle.prototype.get_guardaReporteConformidad = function(req, res, next) {
    console.log('desde get_guardaReporteConformidad: ')
        //console.log(req.query.myJson)
        //result: 'regresa respuesta desde get_guardaReporteConformidad'

    var http = require('http'),
        fs = require('fs');
    var filename = "Recibo_Comprobante"; //guid();
    var filePath = _PathDocuments + req.query.idOrden + "\\hojaTrabajo\\" + filename + ".pdf";
    var options = {
        "method": "POST",
        "hostname": "189.204.141.193",
        "port": "5488",
        "path": "/api/report",
        "headers": {
            "content-type": "application/json"
        }
    };
    var request = http.request(options, function(response) {
        var chunks = [];
        response.on("data", function(chunk) {
            chunks.push(chunk);
        });
        response.on("end", function() {
            var body = Buffer.concat(chunks);
            fs.writeFile(filePath, body, function(err) {
                if (err) return console.log(err);
                console.log('Archivo creado');
            });
        });
    });
    request.write(req.query.myJson);
    request.end();
    var self = this;
    self.view.expositor(res, {
        error: null,
        result: filename
    });

}

//Inserta nueva Accion
Detalle.prototype.post_accion = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'texto',
        value: req.query.texto,
        type: self.model.types.STRING
    }, {
        name: 'fecha',
        value: req.query.fecha,
        type: self.model.types.STRING
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'estatusOrden',
        value: req.query.idEstatusOrden,
        type: self.model.types.INT
    }];


    this.model.query('INS_PLAN_ACCION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Inserta y actualiza Recordatorio
Detalle.prototype.post_recordatorio = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'texto',
        value: req.query.texto,
        type: self.model.types.STRING
    }, {
        name: 'fecha',
        value: req.query.fecha,
        type: self.model.types.STRING
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }, {
        name: 'idRecordatorio',
        value: req.query.idRecordatorio,
        type: self.model.types.INT
    }];


    this.model.query('INS_RECORDATORIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Finaliza un Recordatorio
Detalle.prototype.post_estatusRecordatorio = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idRecordatorio',
        value: req.query.idRecordatorio,
        type: self.model.types.INT
    }];


    this.model.query('UPD_ESTATUS_RECORDATORIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_tokenEstatus = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT }
    ];

    this.model.query('UPD_ESTATUS_UTILIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_presupuestoOrden = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idPresupuesto',
        value: req.query.idPresupuesto,
        type: self.model.types.INT
    }, {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];


    this.model.query('INS_PRESUPUESTO_ORDEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_cancelaOrden = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idusuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }];

    this.model.query('UPD_CANCELA_ORDEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_preCancelaOrden = function(req, res, next) {
    var self = this;
    var params = [{
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        },
        {
            name: 'idOrden',
            value: req.query.idOrden,
            type: self.model.types.INT
        },
        {
            name: 'comentario',
            value: req.query.comentario,
            type: self.model.types.STRING
        }
    ];
    this.model.query('UPD_PRE_CANCELA_ORDEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });


}

Detalle.prototype.get_facturaCotizacion = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }, {
        name: 'isProduction',
        value: req.query.isProduction,
        type: self.model.types.INT
    }];

    this.model.query('SEL_VALIDA_FACTURA_COTIZACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_insertBPRO = function(req, res, next) {

    var self = this;
    var params = [{
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }, {
        name: 'isProduction',
        value: req.query.isProduction,
        type: self.model.types.INT
    }];

    this.model.query('INS_ORDEN_PAGO_PROVISION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_aproviosionamiento = function(req, res, next) {

    var self = this;
    var params = [{
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }, {
        name: 'isProduction',
        value: req.query.isProduction,
        type: self.model.types.INT
    }];

    this.model.query('UPD_PROVISION_BPRO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_updateDetalleCotizacion = function(req, res, next)
{
    var self = this;
    var params = [{
        name:'idCotizacionDetalle',
        value: req.query.idCotizacionDetalle,
        type:self.model.types.INT
    },
    {
        name:'costo',
        value:req.query.costo,
        type:self.model.types.DECIMAL
    },
    {
        name:'venta',
        value:req.query.venta,
        type:self.model.types.DECIMAL
    },
    {
        name:'idUsuarioUpdate',
        value:req.query.idUsuario,
        type:self.model.types.INT
    }
]

this.model.query('UPD_DETALLE_COTIZACION_SP', params, function(error, result) {
    self.view.expositor(res, {
        error: error,
        result: result
    });
});
    console.log(params);
}

Detalle.prototype.post_correoSaldoPresupuesto = function(req, res, next){
    var self = this;
    var params = [{
        name:'idOrden',
        value: req.query.idOrden,
        type:self.model.types.INT
    },
    {
        name:'idUsuario',
        value:req.query.idUsuario,
        type:self.model.types.INT
    },
    {
        name:'idCotizacion',
        value:req.query.idCotizacion,
        type:self.model.types.INT
    },
    {
        name:'saldo',
        value:req.query.saldo,
        type:self.model.types.DECIMAL
    },
    {
        name:'idPresupuesto',
        value:req.query.idPresupuesto,
        type:self.model.types.INT
    }
]

this.model.query('SEL_CORREO_SALDO_PRESUPUESTO_SP', params, function(error, result) {
    self.view.expositor(res, {
        error: error,
        result: result
    });
});
    console.log(params);
}

Detalle.prototype.get_realizaSoporte = function(req, res, next) {
    var self = this;
    var params = [{
            name: 'idOrden',
            value: req.query.idOrden,
            type: self.model.types.INT
        },
        {
            name: 'idCotizacion',
            value: req.query.idCotizacion,
            type: self.model.types.INT
        },
        {
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        },
        {
            name: 'idContratoOperacion',
            value: req.query.idContratoOperacion,
            type: self.model.types.INT
        },
        {
            name: 'isProduction',
            value: req.query.isProduction,
            type: self.model.types.INT
        },
        {
            name: 'idSoporte',
            value: req.query.idSoporte,
            type: self.model.types.INT
        },
        {
            name: 'idPresupuesto',
            value: req.query.idPresupuesto,
            type: self.model.types.INT
        }
    ];

    this.model.query('EXT_SOPORTE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_cotizacionbyOrden = function(req, res, next) {
    var self = this;
    var params = [{
            name: 'idOrden',
            value: req.query.idOrden,
            type: self.model.types.INT
        }];

    this.model.query('SEL_COTIZACIONES_BY_ORDEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_presupuestobyOrden = function(req, res, next) {
    var self = this;
    var params = [{
            name: 'idOrden',
            value: req.query.idOrden,
            type: self.model.types.INT
        },{
            name: 'consulta',
            value: req.query.consulta,
            type: self.model.types.INT
        }];

    this.model.query('SEL_PRESUPUESTO_BY_ORDEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Devuelve los trabajos cobrados y listos para facturar
Detalle.prototype.get_infoUser = function (req, res, next) {
        //Objeto que almacena la respuesta
        var object = {};
        //Referencia a la clase para callback
        var self = this;
        //Objeto que envía los parámetros
        var params = [{
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        },{
            name: 'numeroOrden',
            value: req.query.numeroOrden,
            type: self.model.types.STRING
        }];

    this.model.query('SEL_VALIDA_USUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_updComentario = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idComentarioCotizacion',
        value: req.query.idComentarioCotizacion,
        type: self.model.types.INT
    }, {
        name: 'comentario',
        value: req.query.texto,
        type: self.model.types.STRING
    }, {
        name: 'estatus',
        value: req.query.estatus,
        type: self.model.types.INT
    }];

    this.model.query('UPD_COMETARIO_COTIZACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Detalle;
