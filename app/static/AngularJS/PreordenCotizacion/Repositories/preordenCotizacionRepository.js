var citaUrl = global_settings.urlCORS + '/api/cita/';
var preordenCotizacionUrl = global_settings.urlCORS + '/api/preordenCotizacion/';

registrationModule.factory('preordenCotizacionRepository', function($http, $q) {
    var deferred = $q.defer();

    return {

       getCotizacion: function(idCotizacion, idContratoOperacion) {
            return $http({
                url: preordenCotizacionUrl + 'Preorden/',
                method: "GET",
                params: {
                    idCotizacion: idCotizacion,
                    idContratoOperacion: idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getTalleres: function(idUsuario, idContratoOperacion) {
            return $http({
                url: preordenCotizacionUrl + 'Talleres/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idContratoOperacion: idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getPartidasTaller: function(idTaller, idCotizacion){
            return $http({
                url: preordenCotizacionUrl + 'partidasTaller/',
                method: "GET",
                params: {
                    idTaller: idTaller,
                    idCotizacion: idCotizacion
                },
                headers: {
                    'Content-Type':'application/json'
                }
            });
        },

        getGuardarCotizacion: function(idCotizacion, idUsuario, idTaller, idCotizacionesDetalle, idZona) {
            return $http({
                url: preordenCotizacionUrl + 'guardarCotizacion/',
                method: "GET",
                params: {
                    idCotizacion: idCotizacion,
                    idUsuario: idUsuario,
                    idTaller: idTaller,
                    idCotizacionesDetalle: idCotizacionesDetalle,
                    idZona: idZona
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }


    };
});
