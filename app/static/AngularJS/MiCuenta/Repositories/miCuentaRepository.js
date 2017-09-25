var quejasURL = global_settings.urlCORS + '/api/quejas/';
registrationModule.factory('miCuentaRepository', function ($http) {
    return {
        getTipoQuejaUsuario: function (idTipoUsuario) {
            return $http({
                url: quejasURL + 'conultaTipoQuejaUsuario/',
                method: "GET",
                params: {
                    idTipoUsuario: idTipoUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        }
    }
})