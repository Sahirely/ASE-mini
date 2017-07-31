var citaUrl = global_settings.urlCORS + '/api/cita/';
var cotizacionUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('citaRepository', function($http, $q) {
    var deferred = $q.defer();

    return {
        getTipoOrdenesServicio: function() {
            return $http({
                url: citaUrl + 'tiposOrdenesServicio/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getTipoOrdenesServicioUnidad: function(idUnidad) {
            return $http({
                url: citaUrl + 'tiposOrdenesServicioUnidad/',
                method: "GET",
                params: {
                    idUnidad:idUnidad
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getTipoEstadoUnidad: function() {
            return $http({
                url: citaUrl + 'tipoEstadoUnidad/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getZonasCita: function(idZona) {
            return $http({
                url: citaUrl + 'ZonasCita/',
                method: "GET",
                params: {
                  idZona: idZona
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        putAgendarCita: function(idUnidad, idUsuario, idTipoCita, idEstadoUnidad, grua, fechaCita, comentario, idZona, taller, especialidades, idCentroTrabajo) {
            return $http({
                url: citaUrl + 'agendarCita/',
                method: "PUT",
                params: {
                    idUnidad: idUnidad,
                    idUsuario: idUsuario,
                    idTipoOrdenServicio: idTipoCita,
                    idEstadoUnidad: idEstadoUnidad,
                    grua: grua,
                    fechaCita: fechaCita,
                    comentario: comentario,
                    idZona: idZona,
                    taller: taller,
                    especialidades:especialidades,
                    idCentroTrabajo: idCentroTrabajo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getServicios: function(idUsuario, economico) {
            return $http({
                url: citaUrl + 'servicios/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    economico: economico
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        putActualizarCita: function(idOrden,idUnidad, idUsuario, idTipoCita, idEstadoUnidad, grua, fechaCita, comentario, idZona, taller, especialidades, idCentroTrabajo) {
            return $http({
                url: citaUrl + 'actualizarCita/',
                method: "PUT",
                params: {
                    idOrden: idOrden,
                    idUnidad: idUnidad,
                    idUsuario: idUsuario,
                    idTipoOrdenServicio: idTipoCita,
                    idEstadoUnidad: idEstadoUnidad,
                    grua: grua,
                    fechaCita: fechaCita,
                    comentario: comentario,
                    idZona: idZona,
                    taller: taller,
                    especialidades: especialidades,
                    idCentroTrabajo: idCentroTrabajo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        putEspecialidadOrden: function(idOrden,especialidades, estatus) {
            return $http({
                url: citaUrl + 'especialidadOrden/',
                method: "PUT",
                params: {
                    idOrden: idOrden,
                    especialidades: especialidades,
                    estatus: estatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    };
});
