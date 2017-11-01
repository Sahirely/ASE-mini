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

        getTags: function(){
            return $http({
                url: quejasURL + 'consultaTags/',
                method: 'GET',
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        
        getQuejaSeguimientoUsuario: function(idTipoUsuario){
            return $http({
                url: quejasURL + 'consultaSeguimientoQuejaUsuario/',
                method: 'GET',
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

        getTagPorQueja: function(){
            return $http({
                url: quejasURL + 'consultaTagPorQueja/',
                method: 'GET',
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        saveLogQueja: function(idQueja, idUsuario, Observaciones, jsonEvidencias, contieneEvidencias, estatus, jsonTags){
            return $http({
                url: quejasURL + 'saveLogQueja/',
                method: 'POST',
                params: {
                    idQueja: idQueja,
                    idUsuario: idUsuario,
                    Observaciones: Observaciones,
                    jsonEvidencias: jsonEvidencias,
                    contieneEvidencias: contieneEvidencias,
                    estatus: estatus,
                    jsonTags: jsonTags
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
        },

        getEstatusQueja: function(){
            return $http({
                url: quejasURL + 'consultaEstatusQueja/',
                method: 'GET',
                params: {},
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        }
    }
})  