var consultaCitaUrl = global_settings.urlCORS + '/api/OrdenServicio/';
//var cotizacionUrl = global_settings.urlCORS + '/api/cotizacion/';

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
        },
        getOrdenAcciones: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenAcciones/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenCliente: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenCliente/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenDocumentos: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenDocumentos/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenEvidencias: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenEvidencias/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenDetalle: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenDetalle/',
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
