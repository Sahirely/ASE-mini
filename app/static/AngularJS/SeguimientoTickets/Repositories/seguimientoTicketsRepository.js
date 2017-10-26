var quejassURL = global_settings.urlCORS + '/api/quejas/';
registrationModule.factory('seguimientoTicketsRepository', function ($http) {
    return {
        getQuejaPorTipoUsuario: function(idTipoUsuario){
            return $http({
                url: quejasURL + 'consultaPorTipoUsuario/',
                method: "GET",
                params: {
                    idTipoUsuario: idTipoUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getLogQuejaPorId: function(idQueja){
            return $http({
                url: quejasURL + 'consultaLogQueja/',
                method: 'GET',
                params: {
                    idQueja: idQueja
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getEvidenciaQuejaPorId: function(idQueja){
            return $http({
                url: quejasURL + 'consultaQuejaEvidencia/',
                method: 'GET',
                params: {
                    idQueja: idQueja
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        saveLogQueja: function(idQueja, idUsuario, Observaciones, jsonEvidencias, contieneEvidencias, estatus){
            return $http({
                url: quejasURL + 'saveLogQueja/',
                method: 'POST',
                params: {
                    idQueja: idQueja,
                    idUsuario: idUsuario,
                    Observaciones: Observaciones,
                    jsonEvidencias: jsonEvidencias,
                    contieneEvidencias: contieneEvidencias,
                    estatus: estatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        cerrarTicket: function(idQueja, idUsuario, Observaciones ,estatus){
            return $http({
                url: quejasURL + 'cerrarTicket/',
                method: 'PUT',
                params: {
                    idQueja: idQueja,
                    idUsuario: idUsuario,
                    Observaciones: Observaciones,
                    estatus: estatus
                },
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        }
    }
})  