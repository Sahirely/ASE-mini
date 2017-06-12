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
        }        
    };
});