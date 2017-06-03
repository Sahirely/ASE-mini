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

        var OperacionesUsuarios = result;
        var totalOp = OperacionesUsuarios.length;

        if (totalOp > 0) {
            OperacionesUsuarios.forEach(function(item, key) {
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
	                                        data: OperacionesUsuarios
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
															data: OperacionesUsuarios
													}
											});
										}
                });
            });

        } else {
            object.result = {
                success: false,
                data: result,
                msg: 'No se encontraron resultados'
            };
            self.view.expositor(res, object);
        }
        //Callback
        //object.error = error;
        //object.result = result;
        //self.view.expositor(res, object);
    });
}

Login.prototype.get_ObtieneModulosOperacion = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [{
        name: 'idOperacion',
        value: req.query.idOperacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_MODULOS_OPERACION', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

Login.prototype.get_ObtieneDetalleModuloOperacion = function(req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
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

    this.model.query('SEL_DETALLE_MODULO_OPERACION', params, function(error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

module.exports = Login;
