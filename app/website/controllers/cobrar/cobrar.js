
var CobrarView = require('../../views/ejemploVista'),
    CobrarModel = require('../../models/dataAccess2'),
  fs = require('fs'),
  Query = require('./query'),
   xml2js = require('xml2js')

  var Load_Files = require('../load_files');
  var dirname = 'E:/ASEv2Documentos/public/orden/';
  var dirCopades = 'E:/ASEv2Documentos/public/copade/';

var Cobrar = function (conf) {
  this.conf = conf || {}

    this.view = new CobrarView();
    this.model = new CobrarModel({
        parameters: this.conf.parameters
    });

  this.query = new Query(this.conf)
  this.response = function () {
    this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next)
  }
}

Cobrar.prototype.get_obtenerporcobrar = function (req, res, next) {
  var self = this
  var params = [
    { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'numeroOrden', value: "", type: self.model.types.STRING },
    { name: 'idEjecutivo', value: 0, type: self.model.types.INT }
    //{ name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
  ]
  this.query.execute('SEL_OPE_ORDEN_POR_COBRAR_SP', params, res)
}

Cobrar.prototype.get_obtenerOrdenesPorCopade = function (req, res, next) {
    var self = this
    var params = [
      { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
      { name: 'idCopade', value: req.query.idCopade, type: self.model.types.INT }
    ]
    this.query.execute('SEL_ORDEN_X_COPADE_SP', params, res)
  }

Cobrar.prototype.get_obtenerordenpago = function (req, res, next) {
  var self = this
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  this.query.execute('SEL_ORDEN_PAGO_SP', params, res)
}

Cobrar.prototype.get_obtenerordenespago = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ORDENESPAGO_SP', params, res)
}

Cobrar.prototype.get_obtenercoincidencia = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PORCOBRAR_COINCIDENCIA_SP', params, res)
}

Cobrar.prototype.get_obtenercobranza = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
      { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
      { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
      { name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COPADES_SP', params, res)
}

Cobrar.prototype.get_MejorCoincidencia = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'folio', value: req.query.folio, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('SEL_MEJOR_COINCIDENCIA_SP', params, res)
}

Cobrar.prototype.get_getOrden = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'orden', value: req.query.numeroOrden, type: self.model.types.STRING }
  ]
  // Llamada a SP
  this.query.execute('SEL_ORDEN_SERVICIO_SP', params, res)
}

Cobrar.prototype.post_trabajocobrado = function (req, res, next) {
  //Objeto que almacena la respuesta
  var object = {};
  //Objeto que envía los parámetros
  var params = {};
  //Referencia a la clase para callback
  var self = this;

  var params = [
    {
      name: 'idOrden',
      value: req.body.idTrabajo,
      type: self.model.types.STRING
    },
    {
      name: 'idDatosCopade',
      value: req.body.idDatosCopade,
      type: self.model.types.INT
    },
    {
      name: 'idContratoOperacion',
      value: req.body.idContratoOperacion,
      type: self.model.types.INT
    },
    {
      name: 'isProduction',
      value: req.body.isProduction,
      type: self.model.types.INT
    }
  ];

      this.query.execute('INS_TRABAJO_CONCLUIDO_SP', params, res)
}

//Actualiza el estatus de una órden - cobrada
Cobrar.prototype.post_facturaAbonada = function (req, res, next) {
  //Objeto que almacena la respuesta
  var object = {};
  //Objeto que envía los parámetros
  var params = {};
  //Referencia a la clase para callback
  var self = this;

  var params = [
    {
      name: 'string',
      value: req.body.ordenGlobal,
      type: self.model.types.STRING
    }
  ];

    this.query.execute('INS_ENVIO_ABONADOS', params, res)
  }
  //Quita la copade de la carpeta 'copades' y la pone en su respectiva orden de servicio 'idTrabajo/documentos/adendaCopade'
  Cobrar.prototype.post_mueveCopade = function (req, res, next) {
    //Objeto que almacena la respuesta
      var object = {};
      //Objeto que envía los parámetros
      var params = {};
      //Referencia a la clase para callback
      var self = this;

      var idTrabajo = req.body.idTrabajo;
      var idTrabajos = req.body.idTrabajo;
      var idCopade = req.body.idDatosCopade;

      var trabajos = idTrabajos.split(',');

      var nombreXmlMinusculas = 'COPADE_' + idCopade + '.xml';
      var nombreXmlMayusculas = 'COPADE_' + idCopade + '.XML';
      var nombrePdfMinusculas = 'COPADE_' + idCopade + '.pdf';
      var nombrePdfMayusculas = 'COPADE_' + idCopade + '.PDF';


      trabajos.forEach(function (idTrabajo) {
          if (idTrabajo != '' && idTrabajo != null && idTrabajo != undefined) {
              var rutaDestino = dirname + idTrabajo + '/copade';

              if (!fs.existsSync(rutaDestino)) {
                  fs.mkdirSync(rutaDestino);
              }

              if (fs.existsSync(dirCopades + nombreXmlMinusculas)) {
                  fs.createReadStream(dirCopades + nombreXmlMinusculas).pipe(fs.createWriteStream(rutaDestino + '/' + nombreXmlMinusculas));
                  //fs.renameSync(dirCopades + nombreXmlMinusculas, rutaDestino + '/' + nombreXmlMinusculas);
              }
              if (fs.existsSync(dirCopades + nombreXmlMayusculas)) {
                  fs.createReadStream(dirCopades + nombreXmlMayusculas).pipe(fs.createWriteStream(rutaDestino + '/' + nombreXmlMayusculas));
                  //fs.renameSync(dirCopades + nombreXmlMayusculas, rutaDestino + '/' + nombreXmlMayusculas);
              }
              if (fs.existsSync(dirCopades + nombrePdfMinusculas)) {
                  fs.createReadStream(dirCopades + nombrePdfMinusculas).pipe(fs.createWriteStream(rutaDestino + '/' + nombrePdfMinusculas));
                  //fs.renameSync(dirCopades + nombrePdfMinusculas, rutaDestino + '/' + nombrePdfMinusculas);
              }
              if (fs.existsSync(dirCopades + nombrePdfMayusculas)) {
                  fs.createReadStream(dirCopades + nombrePdfMayusculas).pipe(fs.createWriteStream(rutaDestino + '/' + nombrePdfMayusculas));
                  //fs.renameSync(dirCopades + nombrePdfMayusculas, rutaDestino + '/' + nombrePdfMayusculas);
              }
          }
      });

      //Elimina la COPADE original
      /*if (fs.existsSync(dirCopades + nombreXmlMinusculas)) {
          fs.unlinkSync(dirCopades + nombreXmlMinusculas);
      }

      if (fs.existsSync(dirCopades + nombreXmlMayusculas)) {
          fs.unlinkSync(dirCopades + nombreXmlMayusculas);
      }

      if (fs.existsSync(dirCopades + nombrePdfMinusculas)) {
          fs.unlinkSync(dirCopades + nombrePdfMinusculas);
      }

      if (fs.existsSync(dirCopades + nombrePdfMayusculas)) {
          fs.unlinkSync(dirCopades + nombrePdfMayusculas);
      } */


      //Callback
      object.error = null;
      object.result = 1;

      self.view.expositor(res, object);
    }

    Cobrar.prototype.get_trbajoCobrado = function (req, res, next) {
      //Objeto que almacena la respuesta
      var object = {};
      //Referencia a la clase para callback
      var self = this;
      //Objeto que envía los parámetros
      var params = [
        { name: 'idZona', value: req.query.idZona, type: self.model.types.INT },
        { name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING },
        { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING },
        { name: 'fechaEspecifica', value: req.query.fechaEspecifica, type: self.model.types.STRING },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idDatosCopade', value: req.query.idDatosCopade, type: self.model.types.INT },
        { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
        { name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
      ];

      this.query.execute('SEL_FACTURAS_PAGADAS_SP', params, res)
  }



Cobrar.prototype.get_obtenerprefactura = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
    { name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PREFACTURA_GENERADA_SP', params, res)
}

Cobrar.prototype.get_obtenerabonadas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
    { name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_FACTURAS_ABONADAS_SELECT_SP', params, res)
}

Cobrar.prototype.get_obtenerabonos = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
    { name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_ABONADOS_SELECT_SP', params, res)
}

Cobrar.prototype.get_obtenerabonada = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
    { name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_FACTURAS_ABONADAS_SELECT_SP', params, res)
}


Cobrar.prototype.get_obtenerPagada = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
    { name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_FACTURAS_PAGADAS_SELECT_SP', params, res)
}


Cobrar.prototype.get_obtenerenviadas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
    { name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_ENVIADAS_SP', params, res)
}

Cobrar.prototype.get_obtenerpagadas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idZona', value: req.query.idZona, type: self.model.types.INT },
    { name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING },
    { name: 'fechaFin', value: req.query.fechaFin, type: self.model.types.STRING },
    { name: 'fechaEspecifica', value: req.query.fechaEspecifica, type: self.model.types.STRING },
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
    { name: 'idContratoOperacion', value: req.query.idContratoOperacion, type: self.model.types.INT },
    { name: 'isProduction', value: req.query.isProduction, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_FACTURAS_PAGADAS_SP', params, res)
}

Cobrar.prototype.post_agregarordenpago = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.body.idUsuario, type: self.model.types.INT },
    { name: 'folio', value: req.body.folio, type: self.model.types.STRING },
    { name: 'fecha', value: req.body.fecha, type: self.model.types.STRING },
    { name: 'monto', value: req.body.monto, type: self.model.types.DECIMAL }
  ]
  // Llamada a SP
  this.query.execute('INS_ORDEN_PAGO_SP', params, res)
}

Cobrar.prototype.post_subirCopade = function(req, res, next) {

      // console.log('se quiere subir facturas');
      var self = this;
      var lf = new Load_Files();

      lf.copade(dirCopades, req, res, function(respuesta) {
          var Resultado = respuesta;
          // var Parametros = respuesta[0].Param;
          /*self.view.expositor(res, {
              error: false,
              result: { Success: true, Msg: 'Archivos cargados correctamente', data: Resultado }
          });*/
      });
  }

Cobrar.prototype.post_dcUpload = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var file = req.body.archivoCopade;
  var nombre = req.body.nombre;
  if (!fs.existsSync(dirCopades)) {
    fs.mkdirSync(dirCopades);
  }

  if (!fs.existsSync(dirCopades + nombre)) {
    fs.writeFileSync(dirCopades +"10111.sql", file,
    {
      encoding :'base64',
    }
  );
    let writeStream = fs.createWriteStream(dirCopades + nombre);

    // write some data with a base64 encoding
    writeStream.write(file, 'base64');

    // the finish event is emitted when all data has been flushed from the stream
    writeStream.on('finish', () => {
        console.log('wrote all data to file');
    });

    writeStream.end();
    /*
    fs.writeFile(dirCopades + "archivo.txt", file, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  }); */
    //fs.createReadStream(dirCopades + file.nombre).pipe(fs.createWriteStream(file));
      //fs.renameSync(dirCopades + nombreXmlMinusculas, rutaDestino + '/' + nombreXmlMinusculas);
  }
}


Cobrar.prototype.post_generaDatosCopade = function (req, res, next) {  //Objeto que almacena la respuesta
      
    var object = {};   //Objeto que envía los parámetros
      
    var params = [];   //Referencia a la clase para callback
      
    var self = this;

      
    var nombreArchivos = [];
    nombreArchivos = req.body.archivos;  
    var fechaRecepcionCopade = req.body.fechaRecepcionCopade; 
    var idContratoOperacion = req.body.idContratoOperacion; 
    var subTotal, total, moneda, cantidad, descripcion, importeConcepto, unidad, valorUnitario, totalImpuestosRetenidos, totalImpuestosTrasladados, impuesto, importeTraslado, tasa;
    var contrato, ordenSurtimiento, numeroEstimacion, numeroAcreedor, gestor, finiquito, posicionap, numeroCopade, ejercicio, xmlCopade, i;
    var objCopade = [];
    var paramValuesCopade = [];

      
    nombreArchivos.forEach(function (file, i) {    
        var extension = obtenerExtArchivo(file);    
        if (extension == '.xml' || extension == '.XML') {      
            var parser = new xml2js.Parser();      
            fs.readFile(dirCopades + file, 'utf8', function (err, data) {        
                parser.parseString(data, function (err, lector) {          
                    subTotal = lector['PreFactura']['Comprobante'][0].$['subtotal'];    
                    total = lector['PreFactura']['Comprobante'][0].$['total']; 
                    moneda = lector['PreFactura']['Comprobante'][0].$['moneda']; 
                    cantidad = lector['PreFactura']['Comprobante'][0]['Conceptos'][0]['Concepto'][0].$['cantidad']; 
                    descripcion = lector['PreFactura']['Comprobante'][0]['Conceptos'][0]['Concepto'][0].$['descripcion']; 
                    importeConcepto = lector['PreFactura']['Comprobante'][0]['Conceptos'][0]['Concepto'][0].$['importe']; 
                    unidad = lector['PreFactura']['Comprobante'][0]['Conceptos'][0]['Concepto'][0].$['unidad']; 
                    valorUnitario = lector['PreFactura']['Comprobante'][0]['Conceptos'][0]['Concepto'][0].$['valorUnitario']; 
                    totalImpuestosRetenidos = lector['PreFactura']['Comprobante'][0]['Impuestos'][0].$['totalImpuestosRetenidos']
                    totalImpuestosTrasladados = lector['PreFactura']['Comprobante'][0]['Impuestos'][0].$['totalImpuestosTrasladados']
                    impuesto = lector['PreFactura']['Comprobante'][0]['Impuestos'][0]['Traslados'][0]['Traslado'][0].$['impuesto']; 
                    importeTraslado = lector['PreFactura']['Comprobante'][0]['Impuestos'][0]['Traslados'][0]['Traslado'][0].$['importe']; 
                    tasa = lector['PreFactura']['Comprobante'][0]['Impuestos'][0]['Traslados'][0]['Traslado'][0].$['tasa']; 

                    contrato = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:CONTRATO'][0];          
                    ordenSurtimiento = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:O_SURTIMIENTO'][0]; 

                    try {
                        numeroEstimacion = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:N_ESTIMACION'][0]; 
                    } catch (error) {
                        console.log('No hay número de estimación');
                        console.log(error)
                        numeroEstimacion = '';
                    }

                    numeroAcreedor = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:N_ACREEDOR'][0];          
                    gestor = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:C_GESTOR'][0]; 
                    finiquito = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:FINIQUITO'][0]; 
                    posicionap = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:POSICIONAP'][0];          
                    numeroCopade = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:ENTRADA'][0]; 
                    ejercicio = lector['PreFactura']['cfdi:Addenda'][0]['pm:Addenda_Pemex'][0]['pm:EJERCICIO'][0]; 
                    xmlCopade = data;                
                    objCopade = {            
                        subTotal: subTotal,
                        total: total,
                        moneda: moneda,
                        cantidad: cantidad,
                        descripcion: descripcion,
                        importeConcepto: importeConcepto,
                        unidad: unidad,
                        valorUnitario: valorUnitario,
                        totalImpuestosRetenidos: totalImpuestosRetenidos,
                        totalImpuestosTrasladados: totalImpuestosTrasladados,
                        impuesto: impuesto,
                        importeTraslado: importeTraslado,
                        tasa: tasa,
                        contrato: contrato,
                        ordenSurtimiento: ordenSurtimiento,
                        numeroEstimacion: numeroEstimacion,
                        numeroAcreedor: numeroAcreedor,
                        gestor: gestor,
                        finiquito: finiquito,
                        posicionap: posicionap,
                        numeroCopade: numeroCopade,
                        ejercicio: ejercicio,
                        fechaRecepcionCopade: fechaRecepcionCopade,
                        xmlCopade: xmlCopade,
                        idContratoOperacion: idContratoOperacion         
                    };                    

                    paramValuesCopade.push(objCopade);       
                    // if ((nombreArchivos.length - i) == 1) {            
                    object.error = err;            
                    object.result = paramValuesCopade;            
                    self.view.expositor(res, object);
                    nombreArchivos = [];
                    paramValuesCopade = [];          
                    //} 
                });      
            });    
        }  
    });
}

var obtenerExtArchivo = function (file) {
    return '.' + file.split('.').pop();
}

//valida si existe al menos un archivo xml
function checkExistsXML(file) {
    return file.split('.').pop() === 'xml' || file.split('.').pop() === 'XML';
}

Cobrar.prototype.post_insertaDatosCopade = function (req, res, next) { 
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [
        {
            name: 'subTotal',
            value: req.body[0].subTotal,
            type: self.model.types.DECIMAL
        },
        {
            name: 'total',
            value: req.body[0].total,
            type: self.model.types.DECIMAL
        },
        {
            name: 'moneda',
            value: req.body[0].moneda,
            type: self.model.types.STRING
        },
        {
            name: 'cantidad',
            value: req.body[0].cantidad,
            type: self.model.types.DECIMAL
        },
        {
            name: 'descripcion',
            value: req.body[0].descripcion,
            type: self.model.types.STRING
        },
        {
            name: 'importeConcepto',
            value: req.body[0].importeConcepto,
            type: self.model.types.DECIMAL
        },
        {
            name: 'unidad',
            value: req.body[0].unidad,
            type: self.model.types.STRING
        },
        {
            name: 'valorUnitario',
            value: req.body[0].valorUnitario,
            type: self.model.types.DECIMAL
        },
        {
            name: 'totalImpuestosRetenidos',
            value: req.body[0].totalImpuestosRetenidos,
            type: self.model.types.DECIMAL
        },
        {
            name: 'totalImpuestosTrasladados',
            value: req.body[0].totalImpuestosTrasladados,
            type: self.model.types.DECIMAL
        },
        {
            name: 'impuesto',
            value: req.body[0].impuesto,
            type: self.model.types.STRING
        },
        {
            name: 'importeTraslado',
            value: req.body[0].importeTraslado,
            type: self.model.types.DECIMAL
        },
        {
            name: 'tasa',
            value: req.body[0].tasa,
            type: self.model.types.DECIMAL
        },
        {
            name: 'contrato',
            value: req.body[0].contrato,
            type: self.model.types.STRING
        },
        {
            name: 'ordenSurtimiento',
            value: req.body[0].ordenSurtimiento,
            type: self.model.types.STRING
        },
        {
            name: 'numeroEstimacion',
            value: req.body[0].numeroEstimacion,
            type: self.model.types.STRING
        },
        {
            name: 'numeroAcreedor',
            value: req.body[0].numeroAcreedor,
            type: self.model.types.STRING
        },
        {
            name: 'gestor',
            value: req.body[0].gestor,
            type: self.model.types.STRING
        },
        {
            name: 'finiquito',
            value: req.body[0].finiquito,
            type: self.model.types.STRING
        },
        {
            name: 'posicionap',
            value: req.body[0].posicionap,
            type: self.model.types.STRING
        },
        {
            name: 'numeroCopade',
            value: req.body[0].numeroCopade,
            type: self.model.types.STRING
        },
        {
            name: 'ejercicio',
            value: req.body[0].ejercicio,
            type: self.model.types.STRING
        },
        {
            name: 'fechaRecepcionCopade',
            value: req.body[0].fechaRecepcionCopade,
            type: self.model.types.STRING
        },
        {
            name: 'xmlCopade',
            value: req.body[0].xmlCopade,
            type: self.model.types.STRING
        },
        {
            name: 'idContratoOperacion',
            value: req.body[0].idContratoOperacion,
            type: self.model.types.INT
        }
    ]; 

    this.model.post('INS_DATOS_COPADE_SP', params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

Cobrar.prototype.post_cambiaNombreCopade = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var nombreArchivos = req.body.nombreCopade;
    var identificador = req.body.idCopade[0].id;

    nombreArchivos.forEach(function (nombre) {
        var extension = obtenerExtArchivo(nombre);
        if (extension == '.pdf' || extension == '.PDF') {
            var modificacion = fs.renameSync(dirCopades + nombre, dirCopades + 'COPADE_' + identificador + extension);
        }
        if (extension == '.xml' || extension == '.XML') {
            var modificacion = fs.renameSync(dirCopades + nombre, dirCopades + 'COPADE_' + identificador + extension);
        }
    });

    object.error = null;            
    object.result = 1;            
    self.view.expositor(res, object);

}

module.exports = Cobrar
