var tallerUrl = global_settings.urlCORS + '/api/taller/';

registrationModule.factory('tallerRepository', function($http) {
    return {
        getTalleres: function(idUsuario, idContratoOperacion, idzona, nombretaller, servicios, idTipoUnidad) {
            return $http({
                url: tallerUrl + 'Talleres/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idContratoOperacion: idContratoOperacion,
                    idzona: idzona,
                    nombretaller: nombretaller,
                    servicios: servicios,
                    idTipoUnidad: idTipoUnidad
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTallerXid: function(idTaller) {
            return $http({
                url: tallerUrl + 'tallerXid/',
                method: "GET",
                params: {
                    idTaller: idTaller
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
