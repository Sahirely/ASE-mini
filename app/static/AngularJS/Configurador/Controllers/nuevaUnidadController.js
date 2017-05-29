registrationModule.controller('nuevaUnidadController', function ($scope, $modal, idOperacion, presupuesto, gps, callback, error, $modalInstance, configuradorRepository, alertFactory) {

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.init = function () {
    	$scope.show_centros=false;
    	$scope.show_gps=false

        $scope.getTipoUnidad();

    	if (presupuesto==1) {
    		$scope.show_centros=true;
    		$scope.getCentrosDeTrabajo();
    	};

    	if (gps==1) {
    		$scope.show_gps=true;
    	};

    }
  
     $scope.getCentrosDeTrabajo = function(){
        $scope.promise = configuradorRepository.getCentrosDeTrabajo(idOperacion).then(function (result) {
            if (result.data.length > 0) {
                $scope.centrosDeTrabajo = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Centros de Trabajo');
        });
    }

    $scope.getTipoUnidad = function(){
        $scope.promise = configuradorRepository.getTipoUnidades(3).then(function (result) {
            if (result.data.length > 0) {
                $scope.tipoUnidades = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Centros de Trabajo');
        });
    }

	$scope.guardarUnidad = function () {
		$scope.promise = configuradorRepository.postUnidad($scope.numEconomico, $scope.vin, $scope.numGPS, $scope.tipoUnidad, $scope.sustituto, idOperacion, $scope.centroTrabajo).then(function (result) {
           if (result.data.length > 0) {
           		alertFactory.success('Se guardó correctamente la unidad.');
            	$scope.close();
            }
        }, function (error) {
            alertFactory.error('No se puenen guardar la Operación');
        });
		
	}

});

