registrationModule.controller('presupuestosController', function ($scope, $modal, idOperacion, modalUnidad, userFactory, callback, error, $modalInstance, configuradorRepository) {
	
	$scope.numCentros=0;
	$scope.models=[];
	$scope.modalPlus = modalUnidad;

	$scope.init = function (){
		 userFactory.ValidaSesion();
		 $scope.recuperaCentros();
	};

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.plusCentro = function (){
      	var obj=new Object();
        obj.ID= $scope.numCentros;
        obj.num= $scope.numCentros + 1;
        obj.valor='';
        obj.idCentroTrabajo='';
        $scope.models.push(obj);

        $scope.numCentros += 1;

	};

	$scope.recuperaCentros= function (){
        $scope.promise = configuradorRepository.getCentrosDeTrabajo(idOperacion).then(function (result) {
        
            if (result.data.length > 0) {
            	for (var i = 0 ; i < result.data.length; i++) {
            		var obj=new Object();
				        obj.ID= $scope.numCentros;
				        obj.num= $scope.numCentros + 1;
				        obj.valor=result.data[i].nombreCentroTrabajo;
				        obj.idCentroTrabajo=result.data[i].idCentroTrabajo;
				        $scope.models.push(obj);

				        $scope.numCentros += 1;
            	};
                //$scope.centrosDeTrabajo = result.data;
            }else{
            	$scope.plusCentro ();
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

