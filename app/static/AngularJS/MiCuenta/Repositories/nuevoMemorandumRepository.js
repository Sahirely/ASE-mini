var nuevoMemorandumUrl = global_settings.urlCORS + '/api/memorandum/';

registrationModule.factory('nuevoMemorandumRepository', function ($http) {
    return {
        getPerfiles: function (idContratoOperacion,idUsuario) {
            return $http({
                url: nuevoMemorandumUrl + 'ordenesAtraso/',
                method: "GET",
                params: {
                    idUsuario:idUsuario,
                    idContratoOperacion:idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
    }
})