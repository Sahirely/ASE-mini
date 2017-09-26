var nuevoMemorandumUrl = global_settings.urlCORS + '/api/memorandum/';
var quejasUrl = global_settings.urlCORS + '/api/quejas/'

registrationModule.factory('nuevoMemorandumRepository', function($http) {
    return {
        save: function(titulo, descripcion, notificaZona, notificaPerfil, notificaUsuario, contieneEvidencias, jsonZonas, jsonPerfiles, jsonUsuarios, jsonEvidencias) {
            return $http({
                url: nuevoMemorandumUrl + 'alta/',
                method: "POST",
                params: {
                    titulo: titulo,
                    descripcion: descripcion,
                    notificaZona: notificaZona,
                    notificaPerfil: notificaPerfil,
                    notificaUsuario: notificaUsuario,
                    contieneEvidencias: contieneEvidencias,
                    jsonZonas: jsonZonas,
                    jsonPerfiles: jsonPerfiles,
                    jsonUsuarios: jsonUsuarios,
                    jsonEvidencias: jsonEvidencias
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getMemoUsuario: function(idUsuario) {
            return $http({
                url: nuevoMemorandumUrl + 'consulta/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        },
        actualizaLog: function(idMemorandum, idUsuario, leido, aceptado, comentarios) {
            return $http({
                url: nuevoMemorandumUrl + 'actualizaLog/',
                method: "POST",
                params: {
                    idMemorandum: idMemorandum,
                    idUsuario: idUsuario,
                    leido: leido,
                    aceptado: aceptado,
                    comentarios: comentarios
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        saveQueja: function(idUsuario, idCatalogoTipoQueja, asunto, mensaje, contieneEvidencias, jsonEvidencias) {
            return $http({
                url: quejasUrl + 'alta/',
                method: "POST",
                params: {
                    idUsuario,
                    idCatalogoTipoQueja,
                    asunto: asunto,
                    mensaje: mensaje,
                    contieneEvidencias: contieneEvidencias,
                    jsonEvidencias: jsonEvidencias
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getQuejas: function(idUsuario, asunto, mensaje) {
            return $http({
                url: quejasUrl + 'consulta/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
})