var CotizacionView = require('../views/ejemploVista'),
    CotizacionModel = require('../models/dataAccess2');
var mkdirp = require('mkdirp');
multer = require('multer');
var fs = require('fs');
// var idTipoArchivo;
// var nameFile;
// var totalFiles = 0;
// var dirname = 'C:/Produccion/Talleres/talleres-v2-pemex/app/static/uploads/files/';
// var direclamacion = 'C:/Produccion/Talleres/talleres-v2-pemex/app/static/uploads/reclamacion/';
// var dirCopades = 'C:/Produccion/Talleres/talleres-v2-pemex/app/static/uploads/copades/';
// var nameFile = '';
// var idTrabajo = 0;
// var idNombreEspecial = 0;
// var consecutivoArchivo = 0;
// var carpetaCotizacion = 0;
// var nombreFacturaCotizacion = '';

var Cotizacion = function (conf) {
    this.conf = conf || {};

    this.view = new CotizacionView();
    this.model = new CotizacionModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }


    this.middlewares = [
   ]
}

Cotizacion.prototype.get_ConsultaOrdenes = function (req, res, next){
  var self = this;
  var params = [
  //   {
  //     name: 'fechaInicial',
  //     value: req.query.Inicio,
  //     type: self.model.types.STRING
  // },{
  //     name: 'fechaFin',
  //     value: req.query.Fin,
  //     type: self.model.types.STRING
  // },{
  //     name: 'idContratoOperacion',
  //     value: 2,
  //     type: self.model.types.INT
  // },{
  //     name: 'idZona',
  //     value: 1,
  //     type: self.model.types.INT
  // },{
  //     name: 'fechaEspecifico',
  //     value: req.query.Fecha,
  //     type: self.model.types.STRING
  // },{
  //     name: 'mes',
  //     value: req.query.Mes,
  //     type: self.model.types.STRING
  // },
  {
     name: 'tipoConsulta',
     value: req.query.tipoConsulta,
     type: self.model.types.INT
  }];

  this.model.query('SEL_TOTAL_ORDENES_SERVICIO_SP',params, function (error, result) {
      self.view.expositor(res, {
          error: error,
          result: result
      });
  });

}

//Obtiene las cotizaciones pendientes por autorizar
Cotizacion.prototype.get_see = function (req, res, next) {
    var self = this;
    var params = [{
        name: 'idusuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
       },{
          name: 'idzona',
          value: req.query.idZona,
          type: self.model.types.STRING
        },{
          name: 'idejecutivo',
          value: req.query.idEjecutivo,
          type: self.model.types.STRING
        },{
          name: 'fechaMes',
          value: req.query.Mes,
          type: self.model.types.STRING
        },{
          name: 'rangoInicial',
          value: req.query.Inicio,
          type: self.model.types.STRING
        },{
          name: 'rangoFinal',
          value: req.query.Fin,
          type: self.model.types.STRING
        },{
          name: 'fecha',
          value: req.query.Fecha,
          type: self.model.types.STRING
        },{
          name: 'numorden',
          value: req.query.NumOrden,
          type: self.model.types.STRING
        },{
          name: 'porOrden',
          value: req.query.EsPorOrden,
          type: self.model.types.INT
        },{
          name: 'presupuesto',
          value: req.query.ConPresupuesto,
          type: self.model.types.INT
        }];

    this.model.query('SEL_CONSULTA_ORDENES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Obtiene las zonas por nivel y padre seleccionado
Cotizacion.prototype.get_zonas = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
       },{
            name: 'idPadre',
            value: req.query.idPadre,
            type: self.model.types.INT
       },{
            name: 'orden',
            value: req.query.orden,
            type: self.model.types.INT
       }
   ];

    this.model.query('SEL_ZONAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Obtiene las zonas por nivel y padre seleccionado
Cotizacion.prototype.get_nivelZona = function (req, res, next) {
    //Referencia a la clase para callback
    var self = this;
    //Obtención de valores de los parámetros del request
    var params = [
        {
            name: 'idusuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
       }
   ];

    this.model.query('SEL_NIVEL_ZONAS_CLIENTE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Obtiene los usuarios ejectivos
Cotizacion.prototype.get_ejecutivos = function(req, res, next){
  var self = this;

  var params = [
      {
          name: 'idUsuario',
          value: req.query.idUsuario,
          type: self.model.types.INT
     }
 ];

  this.model.query('SEL_USUARIOS_EJECUTIVOS_SP',params, function (error, result) {
      self.view.expositor(res, {
          error: error,
          result: result
      });
  });
}

Cotizacion.prototype.post_cancelaCot = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'idusuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
      },{
        name: 'idcotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
      }];

      this.model.query('UPD_CANCELA_COTIZACION_SP',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Cotizacion.prototype.post_cotizacionNueva = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'idTaller',
        value: req.body.idTaller,
        type: self.model.types.INT
      },{
        name: 'idUsuario',
        value: req.body.idUsuario,
        type: self.model.types.INT
      },{
        name: 'idEstatusCotizacion',
        value: req.body.idEstatusCotizacion,
        type: self.model.types.INT
      },{
        name: 'idOrden',
        value: req.body.idOrden,
        type: self.model.types.STRING
      }];

      this.model.query('INS_COTIZACION_NUEVA_SP',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Cotizacion.prototype.post_cotizacionDetalle = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'idCotizacion',
        value: req.body.idCotizacion,
        type: self.model.types.INT
      },{
        name: 'costo',
        value: req.body.costo,
        type: self.model.types.DECIMAL
      },{
        name: 'cantidad',
        value: req.body.cantidad,
        type: self.model.types.INT
      },{
        name: 'venta',
        value: req.body.venta,
        type: self.model.types.DECIMAL
      },{
        name: 'idPartida',
        value: req.body.idPartida,
        type: self.model.types.INT
      },{
        name: 'idEstatusPartida',
        value: req.body.idEstatusPartida,
        type: self.model.types.INT
      }];

      this.model.query('INS_COTIZACION_DETALLE_SP',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}



module.exports = Cotizacion;
