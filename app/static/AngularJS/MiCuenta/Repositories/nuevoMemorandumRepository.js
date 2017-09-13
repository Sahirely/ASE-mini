var nuevoMemorandumUrl = global_settings.urlCORS + '/api/memorandum/';

registrationModule.factory('nuevoMemorandumRepository', function ($http) {
    return {
        save: function(titulo, descripcion, notificaZona, notificaPerfil, notificaUsuario, contieneEvidencias, jsonZonas, jsonPerfiles, jsonUsuarios, jsonEvidencias){
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
        getMemoUsuario: function(idUsuario)
        {
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

        }
    }
})