var consultaCitaUrl = global_settings.urlCORS + '/api/OrdenServicio/';
var cotizacionUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('consultaCitasRepository', function($http, $q) {
    var deferred = $q.defer();

    return {
        getTotalOrdenes: function() {
            return $http({
                url: consultaCitaUrl + 'getTotalOrdenes/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getExisteOrden: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenExistente/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
