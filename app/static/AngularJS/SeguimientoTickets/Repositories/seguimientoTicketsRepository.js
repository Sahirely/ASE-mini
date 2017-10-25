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
        }
    }
})  