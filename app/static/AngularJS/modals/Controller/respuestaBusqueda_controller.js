registrationModule.controller('respuestaBusqueda_controller', function($scope, $modalInstance, $modal, callback, error, $http, $sce, $window, ordenServicioRepository, alertFactory) {


    $scope.init = function() {

    }
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };


});
