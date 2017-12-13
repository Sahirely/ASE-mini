var searchUrl = global_settings.urlCORS + '/api/nuevoUsuario/';

registrationModule.factory('nuevoUsuarioRepository', function ($http) {
    return {
        getEvidenciasByOrden: function (idTrabajo, idTipoUsuario) {
            return $http({
                url: searchUrl + 'evidenciasByOrden',
                method: "GET",
                params: {
                    idTrabajo: idTrabajo, idTipoUsuario:idTipoUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});