var tallerUrl = global_settings.urlCORS + '/api/taller/';

registrationModule.factory('tallerRepository', function($http) {
    return {
        getTalleres: function(idUsuario, idContratoOperacion, idzona, nombretaller, servicios) {
            return $http({
                url: tallerUrl + 'Talleres/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idContratoOperacion: idContratoOperacion,
                    idzona: idzona,
                    nombretaller: nombretaller,
                    servicios: servicios
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
