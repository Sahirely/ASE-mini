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

        getUsuariosResponsablesQueja: function(){
            return $http({
                url: quejasURL + 'consultaUsuariosResponsablesQueja',
                method: 'GET',
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getTipoQuejaPorUsuario: function(){
            return $http({
                url: quejasURL + 'consultaTipoQuejaUsuario',
                method: 'GET',
                params: {},
                headers:{
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

        getQuejaResponsable: function(){
            return $http({
                url: quejasURL + 'consultaQuejaResponsable/',
                method: 'GET',
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        saveLogQueja: function(idQueja, idUsuario, Observaciones, jsonEvidencias, contieneEvidencias, estatus, contieneTags, jsonTags, contieneUsers, jsonUsers){
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
                    contieneTags: contieneTags,
                    jsonTags: jsonTags,
                    contieneUsers: contieneUsers,
                    jsonUsers: jsonUsers
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