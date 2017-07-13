registrationModule.controller('tipoUnidadesController', function ($scope, $modal, data, $modalInstance, userFactory, configuradorRepository, alertFactory, globalFactory) {

	$scope.init = function () {
		userFactory.ValidaSesion();
		$('.dataTableTipoUnidades').DataTable().destroy();
        $scope.tipoUnidades=[];
		$scope.tipoUnidades = data;
		globalFactory.filtrosTabla("dataTableTipoUnidades", "Unidades", 100);
	}

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

});