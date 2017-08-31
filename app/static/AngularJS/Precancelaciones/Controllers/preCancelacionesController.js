var preCancelacionesController = function($scope, $route, $routeParams, userFactory, preCancelacionesRepository, $rootScope, $modal, alertFactory) {
    $rootScope.module = 'PreCancelaciones';
    $scope.Zonas = [];
    $scope.TotalOrdenes = [];


    $scope.init = function() {
        userFactory.ValidaSesion();
    };

    $scope.initPrecancelacion = function() {
        consultaOrdenesCanceladas();
    }

    function consultaOrdenesCanceladas() {
        $('.dataTableOrdenes').DataTable().destroy();
        preCancelacionesRepository.GetAllOrdersCanceled().then(function(result) {
            if (result.length > 0) {
                $scope.TotalOrdenes = result;
            } else {
                alertFactory.info('No se encontraron citas canceladas');
            }
        });

    }


};

registrationModule.controller('preCancelacionesController', preCancelacionesController);