var MemorandumView = require('../views/ejemploVista'),
    MemorandumModel = require('../models/dataAccess2'),
    moment = require('moment'),
    fs = require('fs'),

    dirname = 'C:/Desarrollo de Software/Grupo Andrade/Software/ASEv2Documentos/public/',
    rutaTemp = "C:/Desarrollo de Software/Grupo Andrade/Software/ASEv2/app/static/image/Memorandums/"


//configuración para el objeto memorandum
var Memorandum = function (conf) {
    this.conf = conf || {};

    this.view = new MemorandumView();
    this.model = new MemorandumModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

//ALTA DE MEMORANDUM
Memorandum.prototype.post_alta = function (req, res, next) {


    var self = this;
    var params = [
        { name: 'titulo', value: req.query.titulo, type: self.model.types.STRING },
        { name: 'descripcion', value: req.query.descripcion, type: self.model.types.STRING },
        { name: 'notificaZona', value: req.query.notificaZona, type: self.model.types.INT },
        { name: 'notificaPerfil', value: req.query.notificaPerfil, type: self.model.types.INT },
        { name: 'notificaUsuario', value: req.query.notificaUsuario, type: self.model.types.INT },
        { name: 'contieneEvidencias', value: req.query.contieneEvidencias, type: self.model.types.INT },
        { name: 'jsonZonas', value: req.query.jsonZonas, type: self.model.types.STRING },
        { name: 'jsonPerfiles', value: req.query.jsonPerfiles, type: self.model.types.STRING },
        { name: 'jsonUsuarios', value: req.query.jsonUsuarios, type: self.model.types.STRING },
        { name: 'jsonEvidencias', value: req.query.jsonEvidencias, type: self.model.types.STRING }

    ];

    let evidencias = req.query.jsonEvidencias;

    this.model.query('INS_MEMORANDUM_SP', params, function (error, result) {
        if (result != undefined) {
            //MOVEMOS A LA NUEVA CARPETA DONDE SE ALOJAN LOS ARCHIVOS DEL SERVIDOR
            if (!fs.existsSync(dirname + '/memorandum/' + result[0].idMemorandum))
                fs.mkdirSync(dirname + '/memorandum/' + result[0].idMemorandum);
            JSON.parse(evidencias).forEach(function (element) {
                console.log(element);
                fs.copyFile(rutaTemp + element.evidencia, dirname + 'Memorandum/' + result[0].idMemorandum + '/' + element.evidencia, {
                    done: function (err) {
                        console.log('done');
                    }
                });
            }, this);
        }
        self.view.expositor(res, {
            error: error,
            result: result
        })

    });
}

Memorandum.prototype.get_consulta = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.STRING }
    ];

    this.model.query('SEL_MEMORANDUM_BY_USUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Memorandum;