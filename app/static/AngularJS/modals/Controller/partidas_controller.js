registrationModule.controller('partidas_controller', function($scope, $modalInstance, $modal, $http, $sce, $window, ordenServicioRepository, alertFactory, consultaCitasRepository, globalFactory) {
    $scope.idTaller = 1;

    $scope.init = function() {
        consultaCitasRepository.getPartidasTaller($scope.idTaller).then(function(result) {
            if (result.data.length > 0) {
                $scope.partidasTaller = result.data;
                globalFactory.filtrosTabla("talleres", "Partidas Talleres", 5);

            }
        }, function(error) {
            alertFactory.error('No se puenen obtener las órdenes');
        });
    };
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };



});
