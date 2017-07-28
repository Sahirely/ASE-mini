registrationModule.controller('tipoUnidadesController', function ($scope, $modal, data, idOperacion, $modalInstance, userFactory, configuradorRepository, alertFactory, globalFactory) {

	$scope.init = function () {
		userFactory.ValidaSesion();
		$('.dataTableTipoUnidades').DataTable().destroy();
		$scope.tipoUnidades=[];
		var operacion = idOperacion;

		configuradorRepository.getTipoUnidadesProveedores(operacion).then(function(result){
			if (result.data.length > 0){
				$scope.tipoUnidades = result.data;
				globalFactory.filtrosTabla("dataTableTipoUnidades", "Unidades", 100);
			}
		}, function(error){
				alertFactory.info('No se pudieron obtener los tipos de unidad.')
		});
	}

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

});
