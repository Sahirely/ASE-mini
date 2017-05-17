function modal_citas($scope, $modal, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/citas.html',
        controller: 'detalleCitasController',
        backdrop: 'static',
        size: 300,
        resolve: {
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
}

function modal_consultaCitas($scope, $modal, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/consultaCitas.html',
        controller: 'detalleConsultaCitasController',
        backdrop: 'static',
        size: 300,
        resolve: {
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
}

function modal_aprobaciones($scope, $modal, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/aprobaciones.html',
        controller: 'detalleAprobacionesController',
        backdrop: 'static',
        size: 300,
        resolve: {
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
}

function modal_servicios($scope, $modal, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/servicios.html',
        controller: 'detalleServiciosController',
        backdrop: 'static',
        size: 300,
        resolve: {
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
}

function modal_porCobrar($scope, $modal, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/porCobrar.html',
        controller: 'detallePorCobrarController',
        backdrop: 'static',
        size: 300,
        resolve: {
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
}

