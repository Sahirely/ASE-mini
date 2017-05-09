var MobileView = require('../views/ejemploVista'),
    MobileModel = require('../models/dataAccess2');
    moment = require('moment');

var Mobile = function(conf){
    this.conf = conf || {};

    this.view = new MobileView();
    this.model = new MobileModel({ parameters : this.conf.parameters});

    this.response = function(){
        this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
    }
}

//Valida credenciales de usuario
Mobile.prototype.get_mobileLogin = function (req, res, next) {
    //Objeto que almacena la respuesta
    var object = {};
    //Objeto que envía los parámetros
    var params = {};
    //Referencia a la clase para callback
    var self = this;

    var params = [{name: 'usuario', value: req.query.usuario, 
                  type: self.model.types.STRING},
                 {name: 'contrasena', value: req.query.password, 
                  type: self.model.types.STRING}];

    // console.log( params );

    this.model.query('SEL_VALIDA_CREDENCIALES_SP',params, function (error, result) {
        //Callback
        object.error = error;
        object.result = result;

        self.view.expositor(res, object);
    });
}

module.exports = Mobile;