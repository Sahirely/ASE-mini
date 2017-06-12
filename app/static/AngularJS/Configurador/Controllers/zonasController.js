registrationModule.controller('zonasController', function ($scope, $modal, idContratoOperacion, $modalInstance, configuradorRepository, alertFactory, globalFactory) {

	$scope.init = function () {
		$scope.getZonas();
	}

	$scope.getZonas= function (){
		$('.dataTableZonas').DataTable().destroy();
		$scope.zonas =[];
        $scope.promise = configuradorRepository.getZonas(idContratoOperacion).then(function (result) {
        
            if (result.data.length > 0) {
                $scope.zonas = result.data;
                globalFactory.filtrosTabla("dataTableZonas", "Zonas", 100);
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Centros de Trabajo');
        });

	};

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

});