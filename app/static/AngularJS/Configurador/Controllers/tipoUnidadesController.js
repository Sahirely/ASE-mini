registrationModule.controller('tipoUnidadesController', function ($scope, $modal, data, $modalInstance, configuradorRepository, alertFactory) {

	$scope.init = function () {
		$scope.tipoUnidades = data;
	}

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

});