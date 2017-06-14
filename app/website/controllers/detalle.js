var DetalleView = require('../views/ejemploVista'),
    DetalleModel = require('../models/dataAccess2');

var Load_Files = require('../controllers/load_files');

var _PathDocuments = "C:\\ASEv2Documentos\\public\\orden\\"

var Detalle = function (conf) {
    this.conf = conf || {};

    this.view = new DetalleView();
    this.model = new DetalleModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }


    this.middlewares = [
   ]
}

Detalle.prototype.get_cambiarStatusOrden = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT},
            {name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.STRING}
        ];

    this.model.query('UPD_ESTATUS_ORDEN_SERVICIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_facturasPorOrden = function(req, res, next){
    var self = this;
    var params = [
            {name: 'numeroOrden', value: req.query.numeroOrden, type: self.model.types.STRING},
            {name: 'estatus', value: req.query.estatus, type: self.model.types.INT}
        ];
    var respuesta = [];

    self.model.query('SEL_COTIZACIONES_ORDEN_SP', params, function(error, result) {
        var tamanio = result.length;
        result.forEach( function( item, key ){
            var params_factura = [
                {name: 'idOrden', value: item.idOrden, type: self.model.types.INT},
                {name: 'idCotizacion', value: item.consecutivoCotizacion, type: self.model.types.INT}
            ];

            self.model.query('SEL_FACTURAS_SP', params_factura, function(fac_error, fac_result) {
                var facturillas = [];
                fac_result.forEach( function( element, k ){
                    element.tipo = element.rutaDocumento.split('.').pop();;
                    facturillas.push( element );
                });

                respuesta.push({numeroCotizacion: item.numeroCotizacion, facturas:facturillas });

                if( key >= ( tamanio - 1 ) ){
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

Detalle.prototype.get_validaTerminoTrabajo = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT}
        ];

    this.model.query('SEL_VALIDA_TERMINO_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_validaToken = function(req, res, next){
    var self = this;
    var params = [
            {name: 'Token', value: req.query.Token, type: self.model.types.STRING},
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT}
        ];

    this.model.query('SEL_VALIDA_TOKEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_rechazaTrabajo = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT},
            {name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.STRING}
        ];

    this.model.query('UPD_RECHAZA_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//devuelve los trabajos con estatus iniciados
Detalle.prototype.post_subirFactura = function(req, res, next){
    var self = this;

    // Subir Archivos
    var lf = new Load_Files();
    lf.options({ // Type Options: * / img / xml / pdf / docs / xls
                    "file_1": {"Name":"factura1","Path": "xml", "Type": "xml"},
                    "file_2": {"Name":"factura1","Path": "pdf", "Type": "pdf"}
                });

    lf.facturas( "C:/ASE_Temp/", req, res, function( respuesta ){
        // console.log( respuesta );
        respuesta.forEach(function(element) {
            // console.log(element.fieldname);
            if( element.fieldname == "file_1" ){
                // console.log( element.Param );

                var fs = require('fs');

                fs.readFile( element.Path , 'utf-8', (err, data) => {
                    if(err) {
                        console.log( { success:false, data:err } );
                    } else {
                        var parseString = require('xml2js').parseString;
                        var xml = data;
                        parseString(xml, function (err, result) {
                            if( err ){
                                console.log( { success:false, data:err } );
                            }
                            else{
                                var soap = require('soap');
                                var url = 'http://cfdiee.com:8080/Validadorfull/Validador?wsdl';
                                var xml_base64 = new Buffer( data ).toString('base64');
                                var args = {xml: xml_base64};

                                soap.createClient(url, function(err, client) {
                                    if(err){
                                        self.view.expositor(res, {
                                            error: false,
                                            result: {success: false, error: err }
                                        });
                                    }
                                    else{
                                        client.ValidaAll(args, function(err, validacion) {
                                            console.log(validacion.return.codigo);
                                            // var codigo = validacion.return.codigo;
                                            var codigo = 1;
                                            if( codigo == 0 ){
                                                self.view.expositor(res, {
                                                    error: false,
                                                    result: {success: true, res: validacion }
                                                });
                                            }
                                            else{
                                                var xml          = result;
                                                var UUID         = xml['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$['UUID'];
                                                var RFC_Emisor   = xml['cfdi:Comprobante']['cfdi:Emisor'][0].$['rfc']
                                                var RFC_Receptor = xml['cfdi:Comprobante']['cfdi:Receptor'][0].$['rfc'];
                                                var Total        = xml['cfdi:Comprobante'].$['total'];

                                                // 4524.25 - 4524.98
                                                console.log( "cotizacionTotal",element.Param.cotizacionTotal );
                                                // var totalCotizacion = 4525.98;
                                                var totalCotizacion = element.Param.cotizacionTotal;

                                                console.log( Total );
                                                console.log( (totalCotizacion - 1) );
                                                console.log( (totalCotizacion + 1) );
                                                if( Total >= (parseInt(totalCotizacion) - 1) && Total <= (parseInt(totalCotizacion) + 1)){

                                                    var params = [
                                                      {name: 'ruta', value: element.Path, type: self.model.types.STRING },
                                                      {name: 'idOrden', value: element.Param.idOrden, type: self.model.types.INT },
                                                      {name: 'idCotizacion', value: element.Param.cotizacionFactura, type: self.model.types.INT }
                                                    ];
                                                    console.log( "#############################" );
                                                    self.model.query('INS_FACTURA_SP',params, function (error, result) {
                                                        // self.view.expositor(res, {
                                                        //     error: error,
                                                        //     result: result
                                                        // });

                                                        console.log( "==================" );

                                                        self.view.expositor(res, {
                                                          error: false,
                                                          result: {success: true, res: {"return":{
                                                            "codigo":1,
                                                            "mensaje": "Esta dentro del rango",
                                                            "Total cotizacion": totalCotizacion,
                                                            "Total factura": Total
                                                          }} }
                                                      });
                                                    });


                                                }
                                                else{
                                                    self.view.expositor(res, {
                                                        error: false,
                                                        result: {success: true, res: {"return":{
                                                          "codigo":0,
                                                          "mensaje": "El monto de la factura no coincide con el de la cotización",
                                                          "Total cotizacion": totalCotizacion,
                                                          "Total factura": Total
                                                        }} }
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

Detalle.prototype.post_subirFacturaTmp = function(req, res, next){

    // console.log('se quiere subir facturas');
    var self = this;
    var lf = new Load_Files();

    lf.upload( _PathDocuments, req, res, function( respuesta ){
        var Resultado = respuesta;
        var Parametros = respuesta[0].Param;

        // Resultado.forEach( function( item, key ){
        //     var ServerPath = Parametros.docServer + '/orden/' +item.PathDB ;
        //     var params = [
        //         {name: 'ruta', value: ServerPath, type: self.model.types.STRING },
        //         {name: 'idOrden', value: Parametros.idOrden, type: self.model.types.INT },
        //         {name: 'idCotizacion', value: Parametros.cotizacionFactura, type: self.model.types.INT }
        //     ];
        //     self.model.query('INS_FACTURA_SP',params, function (error, result) {
        //         console.log( error );
        //     });

        // });
        console.log( 'se suben los archivos' );
        self.view.expositor(res, {
            error: false,
            result: {Success: true, Msg: 'Factura cargada correctamente', data: Resultado}
      });
    });
}

Detalle.prototype.post_subirEvidencia = function(req, res, next){

    // console.log('se quiere subir facturas');
    var self = this;
    var lf = new Load_Files();

    lf.evidencia( _PathDocuments, req, res, function( respuesta ){
        var Resultado = respuesta;
        // var Parametros = respuesta[0].Param;
        self.view.expositor(res, {
            error: false,
            result: {Success: true, Msg: 'Factura cargada correctamente', data: Resultado}
      });
    });
}

Detalle.prototype.get_guardarDocumento = function(req, res, next){
    var self = this;
    var params = [
        {name: 'ruta', value: req.query.ruta, type: self.model.types.STRING },
        {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT },
        {name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT }
    ];
    self.model.query('INS_FACTURA_SP',params, function (error, result) {
        console.log( error );
    });
};


Detalle.prototype.get_insertaNota = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'nota',
        value: req.query.nota,
        type: self.model.types.STRING
      },{
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
      },{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
      },{
        name: 'idEstatusOrden',
        value: req.query.idEstatusOrden,
        type: self.model.types.INT
      }];

      this.model.query('INS_NOTA',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_obtenerHistoricoOrden = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
      }];

      this.model.query('SEL_HISTORICO_ORDEN',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_obtenerIdCotzPorOrden = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
      }];

      this.model.query('SEL_ID_COTIZACIONES_POR_ORDEN',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_obtenerHistoricoCotizacion = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'idCotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
      }];

      this.model.query('SEL_HISTORICO_COTIZACIONES',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}



//LQMA 07062017
Detalle.prototype.get_reporteConformidad = function(req, res, next){
var self = this;
  var params = [
      {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
      }];
      this.model.queryAllRecordSet('SEL_REPORTE_CONFORMIDAD_SP',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_existComprobanteRecepcion = function(req, res, next){
var self = this;
  var params = [
      {
        name: 'numeroOrden',
        value: req.query.numeroOrden,
        type: self.model.types.STRING
      },
      {
        name: 'idCatalogoDocumento',
        value: req.query.idCatalogoDocumento,
        type: self.model.types.INT
      }];

      this.model.queryAllRecordSet('SEL_VALIDA_DOCUMENTO_SP',params, function (error, result) {
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
    console.log(JSON.stringify(req.query.myJson));
    //result: 'regresa respuesta desde get_guardaReporteConformidad'

    var http = require('http'),
        fs = require('fs');
    var filename = "Recibo_Comprobante";//guid();
    // var filePath = "C:\\89" + "\\pdf\\" + filename + ".pdf";//path.dirname(require.main.filename) + "\\pdf\\" + filename + ".pdf";
    var filePath = _PathDocuments + req.query.idOrden +"\\hojaTrabajo\\"+ filename + ".pdf";
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
    }];


    this.model.query('INS_PLAN_ACCION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Inserta nueva Recordatorio
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
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }];


    this.model.query('INS_RECORDATORIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}
module.exports = Detalle;
