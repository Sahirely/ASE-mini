registrationModule.controller('tipoUnidadesController', function ($scope, $modal, data, $modalInstance, configuradorRepository, alertFactory, globalFactory) {

	$scope.init = function () {

		$('.dataTableTipoUnidades').DataTable().destroy();
        $scope.tipoUnidades=[];
		$scope.tipoUnidades = data;
		globalFactory.filtrosTabla("dataTableTipoUnidades", "Unidades", 100);
	}

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

});