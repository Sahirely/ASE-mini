registrationModule.controller('planDeAccion_controller', function($scope, $modalInstance, $modal, $http, $sce, $window,callback, error, ordenServicioRepository, alertFactory, consultaCitasRepository, globalFactory, userFactory) {

	$scope.close = function() {
        $modalInstance.dismiss('cancel');
    };
});