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
    var error = function() {
        alertFactory.error('Ocurrio un Error');
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
            //globalFactory.filtrosTabla("ordenActual", "Ordenes Actuales", 5);
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
            } else {
                error();
            }
        });
    };
    $scope.getHistoricoOrdenes = function() {
        busquedaUnidadRepository.getHistoricoOrdenes($scope.idUsuario, $routeParams.economico).then(function(result) {
            $scope.historialOrdenes = result.data;
            globalFactory.filtrosTabla("historialUnidad", "Historial Unidades", 5);


            if ($scope.historialOrdenes[0].respuesta == 1) {
                $scope.muestraHistorial = true;
            } else if ($scope.historialOrdenes[0].respuesta == 0) {
                $scope.muestraHistorial = false;
            } else {
                error();
            }
        });
    };
    $scope.detalleOrden = function(orden) {
        location.href = '/detalle?orden=' + orden.numeroOrden;
    };
});
