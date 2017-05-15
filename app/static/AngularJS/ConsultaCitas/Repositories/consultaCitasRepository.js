var citaUrl = global_settings.urlCORS + '/api/OrdenServicio/';
var cotizacionUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('consultaCitasRepository', function ($http, $q) {
    var deferred = $q.defer();

    return {
        getTotalOrdenes: function () {
            return $http({
                url: citaUrl + 'getTotalOrdenes/',
                method: "GET",
                params: {
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    };
});