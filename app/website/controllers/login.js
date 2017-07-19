var LoginView = require('../views/ejemploVista'),
    LoginModel = require('../models/dataAccess2');
moment = require('moment');

var Login = function(conf) {
    this.conf = conf || {};

    this.view = new LoginView();
    this.model = new LoginModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Login.prototype.post_ingresaHistorial = function(req, res, next){

  var obj = {};

  var self = this;

  var params = [{
    name: 'idUsuario',
    value: req.query.idUsuario,
    type: self.model.types.INT
  }]

  self.model.query('INS_HISTORICO_LOGIN', params,function(error, result){
    obj.error = error;
    obj.result = result;
    self.view.expositor(res, obj);
  });

}

Login.prototype.get_tiempoInactividad = function(req, res, next){
  var obj = {};

  var self = this;

  var params = [];

  self.model.query('[SEL_TIEMPO_INACTIVIDAD_SP]', params, function (error, result){
    obj.error = error;
    obj.result = result[0].minutos;
    self.view.expositor(res, obj);
  });
}

Login.prototype.post_cierraHistorial = function(req, res, next){
    var obj = {};

    var self = this;

    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }]

    self.model.query('UPD_HISTORICO_LOGIN', params,function(error, result){
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });
}

Login.prototype.get_validaSesionActiva = function(req, res, next){
    var obj = {};

    var self = this;

    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    },{
        name: 'idSesion',
        value: req.query.idSesion,
        type: self.model.types.INT
    }
  ]

    self.model.query('SEL_VALIDA_SESION_ACTIVA_SP', params,function(error, result){
        obj.error = error;
        obj.result = result;
        self.view.expositor(res, obj);
    });
}

//Valida credenciales de usuario
Login.prototype.get_validaCredenciales = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [{
        name: 'login',
        value: req.query.usuario,
        type: self.model.types.STRING
    }, {
        name: 'pass',
        value: req.query.password,
        type: self.model.types.STRING
    }];

    self.model.query('SEL_VALIDA_LOGIN_SP', params, function(error, result) {
        if (result.length > 0){
        var Usuarios = result;

        if (Usuarios[0].HasSession == 'False'){
            var idUser = Usuarios[0].idUsuario;

            var paramOp = [{
                    name: 'idUsuario',
                    value: idUser,
                    type: self.model.types.INT
            }];

            self.model.query('SEL_OPERACIONES_USUARIO_LOGIN_SP', paramOp, function(errores, resultado) {
              Usuarios[0].Operaciones = resultado;
              var totalOp = Usuarios[0].Operaciones.length;

              if (totalOp > 0) {
                          Usuarios[0].Operaciones.forEach(function(item, key) {
                          var idOp = item.idOperacion;

                          var params2 = [{
                              name: 'idOperacion',
                              value: idOp,
                              type: self.model.types.INT
                          }];

                          self.model.query('SEL_MODULOS_OPERACION', params2, function(err, respuesta) {
                              item.modulos = respuesta;
                              totalModulos = item.modulos.length;

                              if(totalModulos > 0){
                                  item.modulos.forEach(function(elemento, llave) {
                                    var params3 = [{
                                        name: 'idModulo',
                                        value: elemento.idModulo,
                                        type: self.model.types.INT
                                    }, {
                                        name: 'idOperacion',
                                        value: idOp,
                                        type: self.model.types.INT
                                    }];

                                    self.model.query('SEL_DETALLE_MODULO_OPERACION', params3, function(e, r) {
                                        elemento.detalle = r;

                                        if ((key >= (totalOp - 1)) && (llave >= (totalModulos - 1))) {
                                            self.view.expositor(res, {
                                                error: error,
                                                result: {
                                                    success: true,
                                                    data: Usuarios
                                                }
                                            });
                                        }
                                    });
                                });
                              }else{
                                self.view.expositor(res, {
                                    error: error,
                                    result: {
                                        success: true,
                                        data: Usuarios,
                                        msg: 'La operación no cuenta con módulos configurados.'
                                    }
                                });
                              }
                          });
                      });
                  }else{
                      object.result = {
                          success: true,
                          data: result,
                          msg: 'El usuario no cuenta con operaciones configuradas.'
                      };
                      self.view.expositor(res, object);
                  }
            });


        } else {
            object.result = {
                success: true,
                data: Usuarios,
                msg: 'Existe el usuario, pero no puede iniciar sesión por que ya tiene una sesión activa.'
            };
            self.view.expositor(res, object);
        }
      }else{
          object.result = {
              success: false,
              data: result,
              msg: 'No se encontraron resultados.'
          };
          self.view.expositor(res, object);
      }
    });
}

module.exports = Login;
