registrationModule.controller('busquedaUnidadController', function($scope, $location, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, busquedaUnidadRepository) {
    //*****************************************************************************************************************//
    //SE INICIALIZAN VARIABLES
    //*****************************************************************************************************************//
    $scope.idUsuario = 2;
    //Inicializa la pagina
    $scope.init = function() {
        $scope.getDetalleUnidad();
        $scope.getOrdenActual();
        $scope.getHistoricoOrdenes();
    };
    $scope.getDetalleUnidad = function() {
        busquedaUnidadRepository.getDetalleUnidad($scope.idUsuario, $routeParams.economico).then(function(result) {
            $scope.detalleUnidad = result.data[0];
        });
    };
    $scope.btnAgendarCita = function() {
        location.href = '/nuevacita?economico=' + $routeParams.economico;
    };
    $scope.getOrdenActual = function() {
        busquedaUnidadRepository.getOrdenActual($scope.idUsuario, $routeParams.economico).then(function(result) {
            $scope.ordendesActual = result.data;
            console.log($scope.ordendesActual);
            if ($scope.ordendesActual[0].respuesta == 1) {
                $scope.muestraOrdenActual = true;
                $scope.agendarCita = true;
                var contador = 0;
                angular.forEach($scope.ordendesActual, function(value, key) {
                    if (value.idEstatusOrden < 8) {
                        contador++;
                    }
                });
                if (contador > 0) {
                    $scope.agendarCita = false;
                }
            } else if ($scope.ordendesActual[0].respuesta == 0) {
                $scope.muestraOrdenActual = false;
                $scope.agendarCita = true;
            }
        });
    };
    $scope.getHistoricoOrdenes = function() {
        busquedaUnidadRepository.getHistoricoOrdenes($scope.idUsuario, $routeParams.economico).then(function(result) {
            $scope.historialOrdenes = result.data;
            if ($scope.historialOrdenes[0].respuesta == 1) {
                $scope.muestraHistorial = true;
            } else if ($scope.historialOrdenes[0].respuesta == 0) {
                $scope.muestraHistorial = false;
            }
        });
    };
    $scope.detalleOrden = function(orden) {
        location.href = '/detalle?orden=' + orden.numeroOrden;
    };
});
