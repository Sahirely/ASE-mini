var detalleUrl = global_settings.urlCORS + '/api/detalle/';
var ordenesUrl = global_settings.urlCORS + '/api/orden/';

registrationModule.factory('detalleRepository', function($http) {
    return {
        getNumCita: function(idTar, idZona, idUsuario) {
            return $http({
                url: detalleUrl + 'sumatoriaCitas/',
                method: "GET",
                params: {
                    idTar: idTar,
                    idZona: idZona,
                    idUsuario: idUsuario

                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        insNota: function(nota, numOrden, idUsuario) {
            return $http({
                url: detalleUrl + 'insertaNota/',
                method: "GET",
                params: {
                    nota: nota,
                    numOrden: numOrden,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistoricoOrden: function(numOrden) {
            return $http({
                url: detalleUrl + 'obtenerHistoricoOrden/',
                method: "GET",
                params: {
                    numOrden: numOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getIdCotizacionesPorOrden: function(numOrden) {
            return $http({
                url: detalleUrl + 'obtenerIdCotzPorOrden/',
                method: "GET",
                params: {
                    numOrden: numOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistoricoCotizacion: function(idCotizacion) {
            return $http({
                url: detalleUrl + 'obtenerHistoricoCotizacion/',
                method: "GET",
                params: {
                    idCotizacion: idCotizacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getCotizacionesByOrden: function(numeroOrden, estatus) {
            return $http({
                url: ordenesUrl + 'cotizaciones/',
                method: "GET",
                params: {
                    numeroOrden: numeroOrden,
                    estatus: estatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
