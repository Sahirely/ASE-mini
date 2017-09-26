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

        },
        getQuejaPorUsuario: function(idUsuario){
            return $http({
                url: quejasURL + 'consultaPorUsuario/',
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