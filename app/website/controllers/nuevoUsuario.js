var nuevoUsuarioView = require('../views/ejemploVista'),
    nuevoUsuarioModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto meeting
var nuevoUsuario = function (conf) {
    this.conf = conf || {};

    this.view = new nuevoUsuarioView();
    this.model = new nuevoUsuarioModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

nuevoUsuario.prototype.get_Usuarios = function(req, res, next) {
    var self = this;
    var params = [
            {name: 'username', value: req.query.username, type: self.model.types.STRING }
        ];

    this.model.query('EXT_SEL_USUARIOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

nuevoUsuario.prototype.get_CatalogoRolesUsuario = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('EXT_SEL_CAT_ROL_USUARIOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

nuevoUsuario.prototype.post_UpdInsUsuario = function(req, res, next){
    var self = this;
    var params = [{
                      name: 'idUsuario',
                      value: req.query.idUsuario,
                      type: self.model.types.INT
                  },{
                      name: 'nombreUsuario',
                      value: req.query.nombreUsuario,
                      type: self.model.types.STRING
                  },{
                      name: 'contrasenia',
                      value: req.query.contrasenia,
                      type: self.model.types.STRING
                  },{
                      name: 'idCatalogoTipoUsuario',
                      value: req.query.idCatalogoTipoUsuario,
                      type: self.model.types.INT
                  },{
                      name: 'nombreCompleto',
                      value: req.query.nombreCompleto,
                      type: self.model.types.STRING
                  },{
                      name: 'correoElectronico',
                      value: req.query.correoElectronico,
                      type: self.model.types.STRING
                  },{
                      name: 'telefonoUsuario',
                      value: req.query.telefonoUsuario,
                      type: self.model.types.STRING
                  },{
                      name: 'extensionUsuario',
                      value: req.query.extensionUsuario,
                      type: self.model.types.STRING
                  },{
                      name: 'empresa',
                      value: req.query.empresa,
                      type: self.model.types.STRING
                  }
                ];

    this.model.query('EXT_UPD_INS_USUARIOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

nuevoUsuario.prototype.get_OperacionesUsuario = function(req, res, next){
    var self = this;
    var params = [];

    this.model.query('EXT_SEL_OPERACIONES_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

nuevoUsuario.prototype.post_InsContratoOperacionUsuario = function(req, res, next){
    var self = this;
    var params = [{
                      name: 'idContratoOperacion',
                      value: req.query.idContratoOperacion,
                      type: self.model.types.INT
                  },{
                      name: 'idUsuario',
                      value: req.query.idUsuario,
                      type: self.model.types.INT
                  }];

    this.model.query('EXT_INS_CONTRATO_OPERACION_USUARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

nuevoUsuario.prototype.get_permisos = function(req, res, next){
  var self = this;
  var params = [{
                    name: 'idContratoOperacionUsuario',
                    value: req.query.idContratoOperacionUsuario,
                    type: self.model.types.INT
                },{
                    name: 'idTipoConsulta',
                    value: req.query.idTipoConsulta,
                    type: self.model.types.INT
                }];

  this.model.query('EXT_SEL_CONF_CONTRATO_OPERACION_SP', params, function(error, result) {
      self.view.expositor(res, {
          error: error,
          result: result
      });
  });
}

nuevoUsuario.prototype.get_delPermisos = function(req, res, next){
  var self = this;
  var params = [{
                    name: 'idContratoOperacionUsuario',
                    value: req.query.idContratoOperacionUsuario,
                    type: self.model.types.INT
                },{
                    name: 'tipoDelete',
                    value: req.query.tipoDelete,
                    type: self.model.types.INT
                }];

  this.model.query('EXT_DEL_ALL_CONTRATO_OPERACION_USUARIO_SP', params, function(error, result) {
      self.view.expositor(res, {
          error: error,
          result: result
      });
  });
}

nuevoUsuario.prototype.post_InsContratoOperacionUsuarioZona = function(req, res, next){
    var self = this;
    var params = [{
                      name: 'idContratoOperacionUsuario',
                      value: req.query.idContratoOperacionUsuario,
                      type: self.model.types.INT
                  },{
                      name: 'idZona',
                      value: req.query.idZona,
                      type: self.model.types.INT
                  }];

    this.model.query('EXT_INS_CONTRATO_OPERACION_USUARIO_ZONA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

nuevoUsuario.prototype.post_InsContratoOperacionUsuarioProveedor = function(req, res, next){
    var self = this;
    var params = [{
                      name: 'idContratoOperacionUsuario',
                      value: req.query.idContratoOperacionUsuario,
                      type: self.model.types.INT
                  },{
                      name: 'idProveedor',
                      value: req.query.idProveedor,
                      type: self.model.types.INT
                  }];

    this.model.query('EXT_INS_CONTRATO_OPERACION_USUARIO_PROVEEDOR_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

nuevoUsuario.prototype.post_InsContratoOperacionUsuarioNivel = function(req, res, next){
    var self = this;
    var params = [{
                      name: 'idContratoOperacionUsuario',
                      value: req.query.idContratoOperacionUsuario,
                      type: self.model.types.INT
                  },{
                      name: 'nivel',
                      value: req.query.nivel,
                      type: self.model.types.INT
                  }];

    this.model.query('EXT_INS_CONTRATO_OPERACION_USUARIO_NIVEL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

nuevoUsuario.prototype.post_InsContratoOperacionUsuarioVersion = function(req, res, next){
    var self = this;
    var params = [{
                      name: 'idContratoOperacionUsuario',
                      value: req.query.idContratoOperacionUsuario,
                      type: self.model.types.INT
                  },{
                      name: 'idVersion',
                      value: req.query.idVersion,
                      type: self.model.types.INT
                  }];

    this.model.query('EXT_INS_CONTRATO_OPERACION_USUARIO_VERSION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}


module.exports = nuevoUsuario;
