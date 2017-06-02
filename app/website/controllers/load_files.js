var type_images     = ["jpg", "JPG", "jpeg", "JPEG", "png", "PNG", "gif", "GIF"];
var type_pdfs       = ["pdf", "PDF"];
var type_docs       = ["pdf", "PDF", "doc", "DOC", "docx", "DOCX"];
var type_xml        = ["xml", "XML"];
var type_excel      = ["xls", "XLS", "xlsx", "XLSX"];
var opt_dest_fields;
var Respuesta        = [];

var Load_Files = function(){
    // Clase Upload
    // Desarrollado por Ing. Alejandro Grijalva Antonio
}

Load_Files.prototype.upload = function( miCallback, destino, req, res ) { // Type Options: * / img / xml / pdf / docs / xls
    var index = 0;    
    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function( req, file, callback ){
            var files     = req.files;
            var fieldname = files[ index ].fieldname;
            var extencion = file.originalname.split('.').pop();
            if( opt_dest_fields === undefined ){
                callback( null, destino );
                Respuesta.push( { fieldname: fieldname, success:true, msg: "Se cargo correctamente"} );
            }
            else{
                if( opt_dest_fields[ fieldname ] === undefined || opt_dest_fields[ fieldname ] == '' ){
                    callback( null, destino );
                    Respuesta.push( { fieldname: fieldname, success:true, msg: "Se cargo correctamente"} );
                }
                else{
                    var lista_tipos = [];
                    switch( opt_dest_fields[ fieldname ].Type ){
                        case 'img' : lista_tipos = type_images; break;
                        case 'xml' : lista_tipos = type_xml; break;
                        case 'pdf' : lista_tipos = type_pdfs; break;
                        case 'docs': lista_tipos = type_docs; break;
                        case 'xls' : lista_tipos = type_excel; break;
                    }
                    
                    if( opt_dest_fields[ fieldname ].Type == '*' || opt_dest_fields[ fieldname ].Type == undefined || opt_dest_fields[ fieldname ].Type == '' ){
                        callback( null, opt_dest_fields[ fieldname ].Path );
                        Respuesta.push( { fieldname: fieldname, success:true, msg: "Se cargo correctamente"} );
                    }
                    else{
                        if( lista_tipos.indexOf( extencion )  != -1 ){
                            callback( null, opt_dest_fields[ fieldname ].Path );
                            Respuesta.push( { fieldname: fieldname, success:true, msg: "Se cargo correctamente"} );
                        }                        
                        else{
                            Respuesta.push( { fieldname: fieldname, success:false, msg: file.originalname + " :: no es el tipo de archivo permitido para esta operación"} );
                        }
                    }
                }
            }

            index++;
        },
        filename: function( req, file, callback ){
            var files     = req.files;
            var fieldname = files[ index ].fieldname;
            var extencion = file.originalname.split('.').pop();
            var nameFile  = '';

            if( opt_dest_fields === undefined ){
                nameFile = file.originalname;
            }
            else{
                if( opt_dest_fields[ fieldname ] === undefined || opt_dest_fields[ fieldname ] == '' ){
                    nameFile = file.originalname;
                }
                else{
                    if( opt_dest_fields[ fieldname ].Name == undefined || opt_dest_fields[ fieldname ].Name == '' ){
                        nameFile = file.originalname;
                    }
                    else{
                        nameFile = opt_dest_fields[ fieldname ].Name + '.' + extencion;
                    }
                }
            }  

            callback( null, nameFile );
        }
    });

    // var upload = multer( { storage: storage } ).single('myFile2');
    var upload = multer( { storage: storage } ).any();

    upload( req, res, function( err ){
        // console.log( req );
        if( err ){
            miCallback( err );
            return res.end("Error uploading file.");
        }
        // res.end("File is uploaded.");

        // console.log( "Se ha termino de subir los archivos" );
        // console.log( Respuesta );
        miCallback( Respuesta );
        // return Respuesta;
    });
};

Load_Files.prototype.options = function( options ) {
    opt_dest_fields = options;
};

module.exports = Load_Files;