var Model = require('../../models/dataAccess2'),
  Query = require('./query')


  var dirname = 'E:/ASEv2Documentos/public/orden/';
  var dirCopades = 'E:/ASEv2Documentos/public/copade/';

var Cobrar = function (conf) {
  this.conf = conf || {}
  this.model = new Model({
    parameters: this.conf.parameters
  })
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
  ]
  this.query.execute('SEL_OPE_ORDEN_POR_COBRAR_SP', params, res)
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
   // { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COPADES_SP', params, res)
}

Cobrar.prototype.get_MejorCoincidencia = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'folio', value: req.query.ordenSurtimiento, type: self.model.types.STRING }
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

  var params = [{
          name: 'idOrden',
          value: req.body.idTrabajo,
          type: self.model.types.STRING
      },
      {
          name: 'idDatosCopade',
          value: req.body.idDatosCopade,
          type: self.model.types.INT
      }];

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

  var params = [{
          name: 'ordenGlobal',
          value: req.body.ordenGlobal,
          type: self.model.types.STRING
      }];

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
        { name: 'idDatosCopade', value: req.query.idDatosCopade, type: self.model.types.INT }
      ];

      this.query.execute('SEL_FACTURAS_PAGADAS_SP', params, res)
  }

 
    
Cobrar.prototype.get_obtenerprefactura = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_PREFACTURA_GENERADA_SP', params, res)
}

Cobrar.prototype.get_obtenerabonadas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_FACTURAS_ABONADAS_SELECT_SP', params, res)
}

Cobrar.prototype.get_obtenerabonos = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
  ]
  // Llamada a SP
  this.query.execute('SEL_COTIZACION_ABONADOS_SELECT_SP', params, res)
}

Cobrar.prototype.get_obtenerenviadas = function (req, res, next) {
  // Referencia a la clase para callback
  var self = this
  // Obtención de valores de los parámetros del request
  var params = [
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
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
    { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
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

module.exports = Cobrar
