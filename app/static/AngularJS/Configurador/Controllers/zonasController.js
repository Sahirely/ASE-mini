registrationModule.controller('zonasController', function ($scope, $modal, idContratoOperacion, $modalInstance, configuradorRepository, alertFactory) {

	$scope.init = function () {
		//$scope.tipoUnidades = data;
	}

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

});