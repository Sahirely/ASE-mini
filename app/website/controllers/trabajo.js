var TrabajoView = require('../views/ejemploVista'),
	TrabajoModel = require('../models/dataAccess2'),
	moment = require('moment');

var Load_Files = require('../controllers/load_files');

var fs = require('fs'),
    xml2js = require('xml2js');


var Trabajo = function(conf){
    this.conf = conf || {};

    this.view = new TrabajoView();
    this.model = new TrabajoModel({ parameters : this.conf.parameters});

    this.response = function(){
        this[this.conf.funcionalidad](this.conf.req,this.conf.res,this.conf.next);
    }
}

//devuelve los trabajos con estatus iniciados
// Trabajo.prototype.post_subirFactura = function(req, res, next){
//     var self = this;

//     // console.log( "USERNAME", req.body.username );
//     // console.log( self );

//     // Subir Archivos    
//     var lf = new Load_Files();
//     lf.options({ // Type Options: * / img / xml / pdf / docs / xls
//                     "file_1": {"Name":"factura001","Path": "E:/ASE_Temp/factura/xml", "Type": "xml"},
//                     "file_2": {"Name":"facturapdf001","Path": "E:/ASE_Temp/factura/pdf", "Type": "pdf"}
//                 });

//     lf.upload( "E:/ASE_Temp", req, res, function( respuesta ){
//         console.log( respuesta );
//         respuesta.forEach(function(element) {
//             // console.log(element.fieldname);
//             if( element.fieldname == "file_1" ){
//                 console.log( element.Path );

//                 var fs = require('fs');

//                 fs.readFile( element.Path , 'utf-8', (err, data) => {
//                     if(err) {
//                         console.log( { success:false, data:err } );
//                     } else {
//                         var parseString = require('xml2js').parseString;
//                         var xml = data;
//                         parseString(xml, function (err, result) {
//                             if( err ){
//                                 console.log( { success:false, data:err } );
//                             }
//                             else{
//                                 // console.log( { success:true, xml: data, data:result } ); 

//                                 var soap = require('soap');
//                                 var url = 'http://cfdiee.com:8080/Validadorfull/Validador?wsdl';
//                                 var xml_base64 = new Buffer( data ).toString('base64');
//                                 var args = {xml: xml_base64};

//                                 soap.createClient(url, function(err, client) {
//                                     if(err){
//                                         self.view.expositor(res, {
//                                             error: false,
//                                             result: {success: false, error: err }
//                                         });
//                                     }
//                                     else{
//                                         client.ValidaAll(args, function(err, validacion) {
//                                             // console.log(validacion.return.codigo);
//                                             // var codigo = validacion.return.codigo;
//                                             var codigo = 1;
//                                             if( codigo == 0 ){
//                                                 self.view.expositor(res, {
//                                                     error: false,
//                                                     result: {success: true, res: validacion }
//                                                 });
//                                             }
//                                             else{
//                                                 console.log( '==================');
//                                                 console.log( result );
//                                                 console.log( '==================');
//                                                 var xml          = result;
//                                                 var UUID         = xml['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$['UUID'];
//                                                 var RFC_Emisor   = xml['cfdi:Comprobante']['cfdi:Emisor'][0].$['rfc']
//                                                 var RFC_Receptor = xml['cfdi:Comprobante']['cfdi:Receptor'][0].$['rfc'];
//                                                 var Total        = xml['cfdi:Comprobante'].$['total'];

//                                                 console.log( "=============================================" );
//                                                 console.log( UUID );
//                                                 console.log( RFC_Emisor );
//                                                 console.log( RFC_Receptor );
//                                                 console.log( Total );

//                                                 // 4524.25 - 4524.98
//                                                 var totalCotizacion = 4525.98;


//                                                 if( Total >= (totalCotizacion - 1) && Total <= (totalCotizacion + 1)){
//                                                     console.log( 'Esta dentro del rango' );
//                                                     self.view.expositor(res, {
//                                                         error: false,
//                                                         result: {success: true, res: {"return":{"codigo":1, "mensaje": "Esta dentro del rango"}} }
//                                                     });
//                                                 }
//                                                 else{
//                                                     console.log( 'No esta dentro del rango' );
//                                                     self.view.expositor(res, {
//                                                         error: false,
//                                                         result: {success: true, res: {"return":{"codigo":0, "mensaje": "El monto de la factura no coincide con el de la cotización"}} }
//                                                     });
//                                                 }
//                                             }
//                                         });                        
//                                     }
//                                 });
//                             }
//                         });
//                     }
//                 }); 
//             }
//         });
//         // self.view.expositor(res, {
//         //     error: false,
//         //     result: {success: true, res: respuesta }
//         // });
//     });




    // Subir imagenes
    // var lf = new Load_Files();
    // lf.img('E:/ASE_Temp', req, res, function( respuesta ){
    //     self.view.expositor(res, {
    //         error: false,
    //         result: {success: true, res: respuesta }
    //     });
    // });

    // Subir imagenes
    // var lf = new Load_Files();
    // lf.read_xml(req, res, function( resp ){
    //     // console.log( resp.data );
    //     console.log( "TOTAL DE REGISTROS ::", resp.data.length );

    //     if( !resp.success ){
    //         self.view.expositor(res, {
    //             error: false,
    //             result: resp.data[0]
    //         });
    //     }
    //     else{
    //         console.log( "====================[ Esperando respuesta de SOAP ]====================" );
    //             var soap = require('soap');
    //             var url = 'http://cfdiee.com:8080/Validadorfull/Validador?wsdl';
    //             var xml_base64 = new Buffer( resp.xml ).toString('base64');
    //             var args = {xml: xml_base64};

    //             soap.createClient(url, function(err, client) {
    //                 if(err){
    //                     self.view.expositor(res, {
    //                         error: false,
    //                         result: {success: false, error: err }
    //                     });
    //                 }
    //                 else{
    //                     client.ValidaAll(args, function(err, validacion) {
    //                         // console.log(validacion.return.codigo);
    //                         // var codigo = validacion.return.codigo;
    //                         var codigo = 1;
    //                         if( codigo == 0 ){
    //                             self.view.expositor(res, {
    //                                 error: false,
    //                                 result: {success: true, res: validacion }
    //                             });
    //                         }
    //                         else{
    //                             var xml          = resp.data;
    //                             var UUID         = xml['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$['UUID'];
    //                             var RFC_Emisor   = xml['cfdi:Comprobante']['cfdi:Emisor'][0].$['rfc']
    //                             var RFC_Receptor = xml['cfdi:Comprobante']['cfdi:Receptor'][0].$['rfc'];
    //                             var Total        = xml['cfdi:Comprobante'].$['total'];

    //                             console.log( "=============================================" );
    //                             console.log( UUID );
    //                             console.log( RFC_Emisor );
    //                             console.log( RFC_Receptor );
    //                             console.log( Total );

    //                             // 4524.25 - 4524.98
    //                             var totalCotizacion = 4525.98;

    //                             if( Total >= (totalCotizacion - 1) && Total <= (totalCotizacion + 1)){
    //                                 console.log( 'Esta dentro del rango' );
    //                                 self.view.expositor(res, {
    //                                     error: false,
    //                                     result: {success: true, res: {"return":{"codigo":1, "mensaje": "Esta dentro del rango"}} }
    //                                 });
    //                             }
    //                             else{
    //                                 console.log( 'No esta dentro del rango' );
    //                                 self.view.expositor(res, {
    //                                     error: false,
    //                                     result: {success: true, res: {"return":{"codigo":0, "mensaje": "El monto de la factura no coincide con el de la cotización"}} }
    //                                 });
    //                             }
    //                         }
    //                     });                        
    //                 }
    //             });            
    //     }

    //     // self.view.expositor(res, {
    //     //     error: false,
    //     //     result: {success: true, res: 'error' }
    //     // });
    // });
// }

Trabajo.prototype.get_fechaRealTrabajo = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT},
            {name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING}
        ];
    
    this.model.query('UPD_FECHA_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Trabajo.prototype.post_subirArchivoImg = function(req, res, next){
    var self = this;
    //Subir imagenes
    var lf = new Load_Files();
    lf.img('app/static/image/Evidencia', req, res, function( respuesta ){
        self.view.expositor(res, {
            error: false,
            result: {success: true, res: respuesta }
        });
    });

}

// //devuelve los trabajos con estatus iniciados
// Trabajo.prototype.get_trabajo = function(req, res, next){
// 	//Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT}];
	
//     this.model.query('SEL_TRABAJO_SP', params, function(error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //obtiene los trabajos con estatus de terminado
// Trabajo.prototype.get_trabajoterminado = function(req, res, next){
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Objeto que envía los parámetros
//     var params = {};
//     //Referencia a la clase para callback
//     var self = this;

//     //Obtención de valores de los parámetros del request
//     var params = [
//     {
//         name: 'idUsuario',
//         value: req.query.idUsuario, 
//         type: self.model.types.INT
//     }
//     ];
	
//     this.model.query('SEL_TRABAJO_TERMINADO_SP', params, function(error, result) {
//                 //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }

// //obtiene estatus de la cotizacón
// Trabajo.prototype.get_estusCotizacion = function(req, res, next){
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Objeto que envía los parámetros
//     var params = {};
//     //Referencia a la clase para callback
//     var self = this;

//     //Obtención de valores de los parámetros del request
//     var params = [
//     {
//         name: 'idTrabajo',
//         value: req.query.idTrabajo, 
//         type: self.model.types.INT
//     }];
    
//     this.model.query('SEL_ESTATUS_COTIZACION_SP', params, function(error, result) {
//                 //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }


// //obtiene el saldo de un TAR
// Trabajo.prototype.get_saldotar = function (req, res, next) {
//     var self = this;
//      var params = [{
//         name: 'idTAR',
//         value: req.query.idTAR,
//         type: self.model.types.INT
//         },
//         {
//         name: 'idCita',
//         value: req.query.idCita,
//         type: self.model.types.INT
//         }
//         ];

//     this.model.query('SEL_SALDO_TAR_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //obtiene el saldo de un TAR
// Trabajo.prototype.get_consecutivozona = function (req, res, next) {
//     var self = this;
//      var params = [{
//         name: 'idTrabajo',
//         value: req.query.idTrabajo,
//         type: self.model.types.INT
//         }];

//     this.model.query('SEL_CONSECUTIVO_ZONA_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //Actualiza estatus del osur
// Trabajo.prototype.post_estatusosur = function (req, res, next) {
//     var self = this;
//      var params = [{
//         name: 'idTAR',
//         value: req.body.idTAR,
//         type: self.model.types.INT
//         },
//         {
//         name: 'idCita',
//         value: req.body.idCita,
//         type: self.model.types.INT
//         }];

//     this.model.post('UPD_ESTATUS_OSUR_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //realiza el envío de email para nuevo Osur
// Trabajo.prototype.get_enviaremailosur = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     var storeName = 'SEL_CORREO_OSUR_SP';
//     //Obtención de valores de los parámetros del request
//     var params = [{
//         name: 'idTAR',
//         value: req.query.idTAR,
//         type: self.model.types.INT
//     },
//     {
//         name: 'idCita',
//         value: req.query.idCita,
//         type: self.model.types.INT
//     }];

//    // req.query.tipoCorreo == 4 ? storeName = 'SEL_NOTIFICACION_CITA_SIN_TALLER_SP' : storeName = 'SEL_NOTIFICACION_CITA_SP';

//     this.model.query(storeName, params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //realiza la actualización del trabajo a estatus certificado conformidad cargada call center
// Trabajo.prototype.post_updtrabajocertificadocallcenter = function(req, res, next){
// 	//Referencia a la clase para callback
// 	var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idEstatus', value: req.body.idEstatus, type: self.model.types.INT},
//                   {name: 'idTrabajo', value: req.body.idTrabajo, type: self.model.types.INT}];
	
// 	this.model.post('UPD_ESTATUS_TRABAJO_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //realiza la actualización del trabajo a estatus certificado conformidad cargada cliente
// Trabajo.prototype.post_updtrabajocertificadocliente = function(req, res, next){
// 	//Referencia a la clase para callback
// 	var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idEstatus', value: req.body.idEstatus, type: self.model.types.INT},
//                   {name: 'idTrabajo', value: req.body.idTrabajo, type: self.model.types.INT}];
	
// 	this.model.post('UPD_ESTATUS_TRABAJO_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //obtiene los trabajos con estatus de terminado
// Trabajo.prototype.get_trabajoaprobado = function(req, res, next){
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.INT}];
	
//     this.model.query('SEL_TRABAJO_APROBADO_SP', params, function(error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }
// //realiza la actualización del trabajo a terminado
// Trabajo.prototype.post_updtrabajoterminado = function(req, res, next){
// 	//Referencia a la clase para callback
// 	var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idEstatus', value: req.body.idEstatus, type: self.model.types.INT},
//                   {name: 'idTrabajo', value: req.body.idTrabajo, type: self.model.types.INT},
//                   {name: 'observacion', value: req.body.observacion, type: self.model.types.STRING}];
	
// 	this.model.post('UPD_ESTATUS_TRABAJO_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //realiza la actualización del trabajo a CertificadoGenerado
// Trabajo.prototype.post_updtrabajocertificadogenerado = function(req, res, next){
// 	//Referencia a la clase para callback
// 	var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idEstatus', value: req.body.idEstatus, type: self.model.types.INT},
//                   {name: 'idTrabajo', value: req.body.idTrabajo, type: self.model.types.INT}];
	
// 	this.model.post('UPD_ESTATUS_TRABAJO_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
    
//     /*this.model.post('SEL_GENERA_CERTIFICADO_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });*/
// }

// //realiza la actualización del trabajo a tranferencia de responsabilidad
// Trabajo.prototype.post_updtrabajotransfreponsabilidad = function(req, res, next){
// 	//Referencia a la clase para callback
// 	var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idEstatus', value: req.body.idEstatus, type: self.model.types.INT},
//                   {name: 'idTrabajo', value: req.body.idTrabajo, type: self.model.types.INT}];
	
// 	this.model.post('UPD_ESTATUS_TRABAJO_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //realiza la actualización del trabajo a estatus certificado conformidad descargada cliente
// Trabajo.prototype.post_updtrabajocertificadodescargado = function(req, res, next){
// 	//Referencia a la clase para callback
// 	var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idEstatus', value: req.body.idEstatus, type: self.model.types.INT},
//                   {name: 'idTrabajo', value: req.body.idTrabajo, type: self.model.types.INT}];
	
// 	this.model.post('UPD_ESTATUS_TRABAJO_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //realiza la actualización del trabajo a facturado
// Trabajo.prototype.post_updtrabajofacturado = function(req, res, next){
// 	//Referencia a la clase para callback
// 	var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idEstatus', value: req.body.idEstatus, type: self.model.types.INT},
//                   {name: 'idTrabajo', value: req.body.idTrabajo, type: self.model.types.INT}];
	
// 	this.model.post('UPD_ESTATUS_TRABAJO_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //TimeLine
// Trabajo.prototype.get_timeLine = function(req, res, next){
// 	//Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //var params = [];
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idCita', value: req.query.idCita, type: self.model.types.INT}];

//     this.model.query('SEL_TIMELINE_SP', params, function(error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //inserta el trabajo de la cita
// Trabajo.prototype.post_insertTrabajo = function(req, res, next){
//     //Objeto que almacena la respuesta
// 	var object = {};
// 	//Referencia a la clase para callback
// 	var self = this;
//     //Objeto que envía los parámetros
//     var params = {};
    
//     //Asigno a params el valor de mis variables
//     var params = [{name: 'idCita', value: req.body.idCita, 
//                   type: self.model.types.DECIMAL},
//                  {name: 'idUsuario', value: req.body.idUsuario, 
//                   type: self.model.types.DECIMAL},
//                  {name: 'idUnidad', value: req.body.idUnidad, 
//                   type: self.model.types.DECIMAL}];
	
// 	this.model.post('INS_TRABAJO_SP',params, function (error, result) {
//     //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }  
// //Actualiza el trabajo a orden de servicio en garantia
// Trabajo.prototype.post_updtrabajoordengarantia = function(req, res, next){
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idTrabajo', 
//                   value: req.body.idTrabajo,
//                    type: self.model.types.INT},
//                   {
//                     name: 'idEstatus', 
//                   value: req.body.idEstatus, 
//                    type: self.model.types.INT
//                   },
//                   {
//                     name: 'observacion', 
//                   value: req.body.observacion, 
//                   type: self.model.types.STRING
//                  }];
    
//     this.model.post('UPD_TRABAJO_GARANTIA_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }  
// //Se envia correo para informar que se ha rechazado el trabajo
// Trabajo.prototype.get_trabajorechazado = function(req, res, next){

//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{
//                    name: 'idTrabajo', 
//                    value: req.query.idTrabajo, 
//                    type: self.model.types.INT
//                  }];
    
//     this.model.query('SEL_NOTIFICACION_TRABAJORECHAZADO_SP', params, function(error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }
// Trabajo.prototype.post_putFechaServicioReal = function (req, res, next) {
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Objeto que envía los parámetros
//     var params = {};
//     //Referencia a la clase para callback
//     var self = this;

//     var params = [
//             {
//             name: 'idTrabajo',
//             value: req.body.idTrabajo,
//             type: self.model.types.INT
//             },
//             {
//             name: 'fechaServicio',
//             value: req.body.fechaServicio,
//             type: self.model.types.STRING
//             }];

//     this.model.post('INS_FECHA_INICIO_REAL_TRABAJO_SP', params, function (error, result) {
//         //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }

// Trabajo.prototype.get_searchFechaTrabajoReal = function (req, res, next) {
//     var self = this;
//     var params = [{
//         name: 'idTrabajo',
//         value: req.query.idTrabajo,
//         type: self.model.types.INT
//         }];

//     this.model.query('SEL_FECHA_INICIO_REAL_TRABAJO_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //obtiene todas las órdenes de servicio que no están canceladas, pero están auntorizadas
// Trabajo.prototype.get_getadmonordenes = function (req, res, next) {
//     var self = this;
//     var params = {};

//     this.model.query('SEL_ORDENES_POR_VERIFICAR_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //realiza la actualización del trabajo a estatus certificado conformidad cargada cliente
// Trabajo.prototype.post_updatestatusVerificado = function(req, res, next){
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idEstatus', value: req.body.idEstatus, type: self.model.types.INT},
//                   {name: 'idTrabajo', value: req.body.idTrabajo, type: self.model.types.INT}];
    
//     this.model.post('UPD_ORDEN_VERIFICADA_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //inserta el trabajo de la cita
// Trabajo.prototype.post_insertaFactura = function(req, res, next){
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Referencia a la clase para callback
//     var self = this;
//     //Objeto que envía los parámetros
//     var params = {};
    
//     //Asigno a params el valor de mis variables
//     var params = [{
//                 name: 'idCotizacion',
//                 value: req.query.idCotizacion,
//                 type: self.model.types.INT
//                 },
//                 {
//                 name: 'numFactura',
//                 value: req.query.numFactura,
//                 type: self.model.types.STRING
//                 },
//                 {
//                 name: 'UUID',
//                 value: req.query.UUID,
//                 type: self.model.types.STRING
//                 },
//                 {
//                 name: 'fechaFactura',
//                 value: req.query.fechaFactura,
//                 type: self.model.types.STRING
//                 },
//                 {
//                 name: 'total',
//                 value: req.query.total,
//                 type: self.model.types.DECIMAL
//                 },
//                 {
//                 name: 'subtotal',
//                 value: req.query.subtotal,
//                 type: self.model.types.DECIMAL
//                 },
//                 {
//                 name: 'idUsuario',
//                 value: req.query.idUsuario,
//                 type: self.model.types.INT
//                 },
//                 {
//                 name: 'xmlFactura',
//                 value: req.query.xmlFactura,
//                 type: self.model.types.STRING
//                  },
//                 {
//                 name: 'rfc',
//                 value: req.query.rfc,
//                 type: self.model.types.STRING
//                  }];
    
//     this.model.post('INS_COTIZACION_FACTURA_SP',params, function (error, result) {
//     //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }

// //LQMA 13092016
// //obtiene las cotizaciones de la orden que esta en  Pesaña Aprobados
// Trabajo.prototype.get_cotizacionesordenAprobados = function (req, res, next) {
//     //Con req.query se obtienen los parametros de la url
//     //Ejemplo: ?p1=a&p2=b
//     //Retorna {p1:'a',p2:'b'}
//     //Objeto que envía los parámetros
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{name: 'idTrabajo',
//                    value: req.query.idTrabajo,
//                    type: self.model.types.INT}]; 

//     this.model.query('SEL_OBTIENE_COTIZACIONES_APROBADO_ORDEN_SP', params, function (error, result) {
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }

// //inserta el trabajo de la cita
// Trabajo.prototype.post_insertBpro = function(req, res, next){
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Referencia a la clase para callback
//     var self = this;
//     //Objeto que envía los parámetros
//     var params = {};
    
//     //Asigno a params el valor de mis variables
//     var params = [{
//                 name: 'idTrabajo',
//                 value: req.query.idTrabajo,
//                 type: self.model.types.INT
//                 },
//                 {
//                 name: 'idUsuario',
//                 value: req.query.idUsuario,
//                 type: self.model.types.INT
//                 }];
    
//     this.model.post('UPD_ORDEN_PAGO_SP',params, function (error, result) {
//     //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }

// //Elimina la Orden completa incluyendo la cita
// Trabajo.prototype.post_eliminaOrden = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [
//         {
//             name: 'idCita',
//             value: req.body.idCita,
//             type: self.model.types.INT
//         }
//     ];

//     this.model.post('EXT_UPD_CANCELACION_ORDEN_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }  


// //Genera un Certificado de Conformidad sin alterar su estatus
// Trabajo.prototype.post_generaCertificado = function (req, res, next) {
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [
//         {
//             name: 'idTrabajo',
//             value: req.body.idTrabajo,
//             type: self.model.types.INT
//         }
//     ];

//     this.model.post('SEL_GENERA_CERTIFICADO_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// } 

// //obtiene los trabajos con estatus de terminado
// Trabajo.prototype.get_cotizacionRFC = function(req, res, next){
//     //Objeto que almacena la respuesta
//     var object = {};
//     //Objeto que envía los parámetros
//     var params = {};
//     //Referencia a la clase para callback
//     var self = this;

//     //Obtención de valores de los parámetros del request
//     var params = [
//     {
//         name: 'idCotizacion',
//         value: req.query.idCotizacion, 
//         type: self.model.types.INT
//     }
//     ];
    
//     this.model.query('SEL_RFC_COTIZACION_SP', params, function(error, result) {
//                 //Callback
//         object.error = error;
//         object.result = result;

//         self.view.expositor(res, object);
//     });
// }

// //Actualiza el trabajo a orden de servicio en garantia
// Trabajo.prototype.post_insertTerminOsur = function(req, res, next){
//     //Referencia a la clase para callback
//     var self = this;
//     //Obtención de valores de los parámetros del request
//     var params = [{
//         name: 'idTar', 
//         value: req.body.idTar,
//         type: self.model.types.INT
//     },
//     {
//         name: 'idOsur', 
//         value: req.body.idOsur, 
//         type: self.model.types.INT
//     },
//     {
//         name: 'idTrabajo', 
//         value: req.body.idTrabajo, 
//         type: self.model.types.INT
//     },
//     {
//         name: 'presupuesto', 
//         value: req.body.presupuesto,
//         type: self.model.types.DECIMAL
//     },
//     {
//         name: 'saldo', 
//         value: req.body.saldo, 
//         type: self.model.types.DECIMAL
//     },
//     {
//         name: 'utilizado', 
//         value: req.body.utilizado, 
//         type: self.model.types.DECIMAL
//     },
//     {
//         name: 'montoOrden', 
//         value: req.body.montoOrden, 
//         type: self.model.types.DECIMAL
//     }];
    
//     this.model.post('INS_TERMINO_OSUR_SP', params, function (error, result) {
//         //Callback
//         self.view.expositor(res, {
//             error: error,
//             result: result
//         });
//     });
// }  

module.exports = Trabajo;