var ViewPrinter = require('../views/ejemploVista'),
    DataAccess2 = require('../models/dataAccess2'),
    fs = require('fs');


var CommonFunctions = function(conf) {
    this.conf = conf || {};
    this.view = new ViewPrinter();
    this.model = new DataAccess2({
        parameters: this.conf.parameters
    });
    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//LQMA 09062017
CommonFunctions.prototype.post_sendMail = function(req, res, next) {
    var self = this;

    
    var ruta = req.body.archivoRuta;
    var object = {};   //Objeto que envía los parámetros

    //console.log('entro a post_sendMail: ' + req.body)

    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');
/*    var transporter = nodemailer.createTransport(smtpTransport({
        host: '192.168.20.1',
        port: 25,
        secure: false,
        auth: {
            user: 'sistemas',
            pass: 's1st3m4s'
        },
        tls: { rejectUnauthorized: false }
    }));*/
    var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'sisgpoa@gmail.com',
            pass: 'Gp04ndr4d3'
          }
    });
    var mailOptions = {
        from: req.body.correoDe, 
        to: req.body.correoPara, 
        subject: req.body.asunto, 
        text: req.body.texto, 
        html: req.body.bodyhtml 
    };

    if (ruta.length > 0)
        mailOptions.attachments = [{ // file on disk as an attachment
            filename: req.body.nombreArchivo,
            path: ruta // stream this file
        }]


    setTimeout(function() {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                res.send(500);
                //console.log('error envio correo 500: ');
                //console.log(error);
            } else {
                res.send(200);
                fs.stat(ruta, function(err, stats) {
                    if (err) {
                        //console.log('error envio correo 200: ');
                        return console.error(err);
                    }
                });

            }
        });
    }, 4000)

    transporter.close;
    object.error = null;            
    object.result = 1; 
   
    req.body = [];    
     
};

//tipo de unidad
CommonFunctions.prototype.get_dataMail = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    },
    {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }];

    this.model.query('SEL_CORREO_RECORDATORIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

CommonFunctions.prototype.get_dataMailUtilidad = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    },
    {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    },
    {
        name: 'idCotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
    }];

    this.model.query('SEL_CORREO_UTILIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = CommonFunctions;
