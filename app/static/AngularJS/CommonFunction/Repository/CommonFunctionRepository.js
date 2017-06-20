var commonFunctionUrl = global_settings.urlCORS + '/api/commonFunctions/';

registrationModule.factory('commonFunctionRepository', function ($http) {
    return {
        sendMail: function(correoDe,correoPara,asunto, texto, bodyhtml, archivoRuta, nombreArchivo){
            return $http({
                url: commonFunctionUrl + 'sendMail/',
                method: "POST",
                data: {
                    correoDe: correoDe,
                    correoPara: correoPara,
                    asunto: asunto,
                    texto: texto,
                    bodyhtml: bodyhtml,
                    archivoRuta: archivoRuta,
                    nombreArchivo : nombreArchivo
                  },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        dataMail: function(idOrden,idUsuario){
            return $http({
                url: commonFunctionUrl + 'dataMail/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    idUsuario: idUsuario
                  },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        dataMailUtilidad: function(idOrden,idUsuario,idCotizacion){
            return $http({
                url: commonFunctionUrl + 'dataMailUtilidad/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    idUsuario: idUsuario,
                    idCotizacion: idCotizacion
                  },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }            
    };
});