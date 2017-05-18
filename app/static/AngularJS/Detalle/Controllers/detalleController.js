registrationModule.controller('detalleController', function($scope, $location, consultaCitasRepository, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, detalleRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    //$rootScope.modulo = 'reporteHistorial';
    //Inicializa la pagina

    $scope.idUsuario = 2;
    $scope.numeroOrden = $routeParams.orden;
    $scope.init = function() {
        $scope.getOrdenDetalle($scope.idUsuario, $scope.numeroOrden)
        $scope.getOrdenCliente($scope.idUsuario, $scope.numeroOrden)
    };

    $scope.getOrdenDetalle = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenDetalle(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleOrden = result.data[0];
                console.log($scope.detalleOrden)
            }
        }, function(error) {
            alertFactory.error('No se puenen obtener los detalles de las órdenes');
        });
    }

     $scope.getOrdenCliente = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenCliente(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleCliente = result.data[0];
            }
        }, function(error) {
            alertFactory.error('No se puenen obtener los detalles de las órdenes');
        });
    }

});
