registrationModule.controller('presupuestosController', function ($scope, $modal, idOperacion, modalUnidad, callback, error, $modalInstance, configuradorRepository) {
	
	$scope.numCentros=0;
	$scope.models=[];
	$scope.modalPlus = modalUnidad;

	$scope.init = function (){
		 $scope.plusCentro ();
		 $scope.recuperaCentros();
	};

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.plusCentro = function (){
      	var obj=new Object();
        obj=new Object();
        obj.ID= $scope.numCentros;
        obj.valor='';
        $scope.models.push(obj);

        $scope.numCentros += 1;

	};

	$scope.recuperaCentros= function (){
        $scope.promise = configuradorRepository.getCentrosDeTrabajo(idOperacion).then(function (result) {
            if (result.data.length > 0) {
                $scope.centrosDeTrabajo = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Centros de Trabajo');
        });

	};

	$scope.dataCentro = function (id, data) {
		$scope.models[id].valor=data;
	}

	$scope.guardarCentros = function (){;
		callback($scope.models);
		$scope.close();
	}

});

