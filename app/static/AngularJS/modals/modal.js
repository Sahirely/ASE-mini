function modal_tiket($scope, $modal, idAprobacionUtilidad, origen, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/modals/Template/token.html',
        controller: 'token_controller',
        backdrop: 'static',
        size: 300,
        resolve: {
            idAprobacionUtilidad: function() {
                return idAprobacionUtilidad;
            },
            origen: function() {
                return origen;
            },
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
}

function modal_detalle_cotizacion($scope, $modal, idTrabajo, origen, utilidad, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/modals/Template/cotizacionDetalle.html',
        controller: 'cotizacionDetalle_controller',
        backdrop: 'static',
        size: 300,
        resolve: {
            idTrabajo: function() {
                return idTrabajo;
            },
            origen: function() {
                return origen;
            },
            utilidad: function() {
                return utilidad;
            },
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
}

function modal_respuesta_busqueda($scope, $modal, tipobusqueda, respuesta, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/modals/Template/respuestaBusqueda.html',
        controller: 'respuestaBusqueda_controller',
        backdrop: 'static',
        size: 300,
        resolve: {
            tipobusqueda: function() {
                return tipobusqueda
            },
            respuesta: function() {
                return respuesta
            },
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
};

function modal_partidas($scope, $modal, idtaller, especialidades, partidas, idCotizacion, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/modals/Template/partidas.html',
        controller: 'partidas_controller',
        backdrop: 'static',
        size: 300,
        resolve: {
            idtaller: function() {
                return idtaller
            },
            especialidades: function() {
                return especialidades
            },
            partidas: function() {
                return partidas
            },
            idCotizacion: function() {
                return idCotizacion
            },
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
};
