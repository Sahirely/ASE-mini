var QuejasView = require('../views/ejemploVista'),
    QuejasModel = require('../models/dataAccess2'),
    moment = require('moment'),
    fs = require('fs')

//configuración para el objeto quejas
var Quejas = function(conf) {
    this.conf = conf || {};

    this.view = new QuejasView();
    this.model = new QuejasModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

var dirname = 'E:/ASEv2Documentos/public/';
//var dirname = 'C:/Desarrollo de Software/Grupo Andrade/Software/ASEv2Documentos/public/'
//var dirname = 'E:/AlanRosales/Nueva carpeta/Images'

Quejas.prototype.post_alta = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'idCatalogoTipoQueja', value: req.query.idCatalogoTipoQueja, type: self.model.types.INT },
        { name: 'asunto', value: req.query.asunto, type: self.model.types.STRING },
        { name: 'mensaje', value: req.query.mensaje, type: self.model.types.STRING },
        { name: 'contieneEvidencias', value: req.query.contieneEvidencias, type: self.model.types.INT },
        { name: 'jsonEvidencias', value: req.query.jsonEvidencias, type: self.model.types.STRING }

    ];

    let evidencias = req.query.jsonEvidencias;

    this.model.query('INS_QUEJA_SP', params, function(error, result) {

        if (result != undefined) {
            //MOVEMOS A LA NUEVA CARPETA DONDE SE ALOJAN LOS ARCHIVOS DEL SERVIDOR
            if (!fs.existsSync(dirname + '/queja/' + result[0].idQueja))
                fs.mkdirSync(dirname + '/queja/' + result[0].idQueja);
            JSON.parse(evidencias).forEach(function(element) {
                console.log(element);
                fs.writeFileSync(dirname + '/queja/' + result[0].idQueja + '/' + element.evidencia, fs.readFileSync(dirname + '/temp/' + element.evidencia));
                //fs.createReadStream($scope.rutaTemp + element.evidencia).pipe(fs.createWriteStream(dirname + '/memorandum/' + result[0].idMemorandum + '/' + element.evidencia));
            }, this);
        }


        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Quejas.prototype.get_consulta = function(req, res, next) {
    var self = this;
    var params = [];

    this.model.query('SEL_QUEJA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Quejas.prototype.get_consultaPorUsuario = function(req, res, next)
{
    var self = this;
    var params = [
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_QUEJA_BY_USUARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Quejas.prototype.get_conultaTipoQuejaUsuario = function(req, res, next) {
    var self = this;
    var params = [
        { name: 'idTipoUsuario', value: req.query.idTipoUsuario, type: self.model.types.INT },
    ];

    this.model.query('SEL_QUEJAS_TIPOUSUARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Quejas.prototype.post_uploadQueja = function(req, res, next) {
    var randomName = ""
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            nameFile = dirname + 'temp';
            cb(null, nameFile);
            res.end(randomName);
        },
        filename: function(req, file, cb) {
            if (file.mimetype == "image/png")
                randomName = new Date().getTime().toString() + ".jpg"
            if (file.mimetype == "image/jpeg")
                randomName = new Date().getTime().toString() + ".jpg"
            if (file.mimetype == "application/pdf")
                randomName = new Date().getTime().toString() + ".pdf"
            path = nameFile + randomName
            cb(null, randomName);
        }
    });
    var upload = multer({
        storage: storage
    }).any();

    upload(req, res, function(err) {
        if (err) {
            //console.log(err);
            return res.end("Error al subir el archivo.");
        } else {
            req.files.forEach(function(f) {
                //console.log(f.originalname);
                // and move file to final destination...
            });
            res.end("Archivo subido");
        }
    });
}

Quejas.prototype.get_consultaPorTipoUsuario = function(req, res, next)
{
    var self = this;
    var params = [
        { name: 'idTipoUsuario', value: req.query.idTipoUsuario, type: self.model.types.INT }
    ];

    this.model.query('SEL_QUEJA_BY_TIPOUSUARIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error, 
            result: result
        });
    });
}

Quejas.prototype.get_consultaLogQueja = function(req, res, next){
    var self = this;
    var params = [
        {name: 'idQueja', value: req.query.idQueja, type: self.model.types.INT }
    ];

    this.model.query('SEL_LOG_QUEJA_BYID_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Quejas.prototype.get_consultaQuejaEvidencia = function(req, res, next){
    var self = this;
    var params = [
        { name: 'idQueja', value: req.query.idQueja, type: self.model.types.INT }
    ];

    this.model.query('SEL_QUEJAEVIDENCIA_BYID_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}
Quejas.prototype.put_cerrarTicket = function(req, res, body){
    var self = this;
    var params = [
        { name: 'idQueja', value: req.query.idQueja, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'Observaciones', value: req.query.Observaciones, type: self.model.types.STRING },
        { name: 'estatus', value:req.query.estatus, type: self.model.types.STRING }
    ];

    this.model.query('UPD_QUEJA_CERRAR_SP', params, function(error, result){
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Quejas.prototype.post_saveLogQueja = function(req, res, next){
    var self = this;
    var params = [
        { name: 'idQueja', value: req.query.idQueja, type: self.model.types.INT },
        { name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT },
        { name: 'Observaciones', value: req.query.Observaciones, type: self.model.types.STRING },
        { name: 'jsonEvidencias', value: req.query.jsonEvidencias, type: self.model.types.STRING },
        { name: 'contieneEvidencias', value: req.query.contieneEvidencias, type: self.model.types.INT },
        { name: 'estatus', value: req.query.estatus, type: self.model.types.STRING }
    ];

    let evidencias = req.query.jsonEvidencias;
    
    this.model.query('INS_LOG_QUEJA_SP', params, function(error, result){
        if (result != undefined) {
            //MOVEMOS A LA NUEVA CARPETA DONDE SE ALOJAN LOS ARCHIVOS DEL SERVIDOR
            if (!fs.existsSync(dirname + '/queja/' + result[0].idQueja))
                fs.mkdirSync(dirname + '/queja/' + result[0].idQueja);
            JSON.parse(evidencias).forEach(function(element) {
                console.log(element);
                fs.writeFileSync(dirname + '/queja/' + result[0].idQueja + '/' + element.evidencia, fs.readFileSync(dirname + '/temp/' + element.evidencia));
                //fs.createReadStream($scope.rutaTemp + element.evidencia).pipe(fs.createWriteStream(dirname + '/memorandum/' + result[0].idMemorandum + '/' + element.evidencia));
            }, this);
        }
        
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Quejas;