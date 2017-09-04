var nuevoMemorandumUrl = global_settings.urlCORS + '/api/memorandum/';

registrationModule.factory('nuevoMemorandumRepository', function ($http) {
    return {
        save: function(titulo, descripcion, notificaZona, notificaPerfil, notificaUsuario, jsonZonas, jsonPerfiles, jsonUsuarios){
            return $http({
                url: nuevoMemorandumUrl + 'alta/',
                method: "POST",
                params: {
                    titulo: titulo,
                    descripcion: descripcion,
                    notificaZona: notificaZona, 
                    notificaPerfil: notificaPerfil, 
                    notificaUsuario: notificaUsuario, 
                    jsonZonas: jsonZonas,
                    jsonPerfiles: jsonPerfiles,
                    jsonUsuarios: jsonUsuarios
                  },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }
       
    }
})