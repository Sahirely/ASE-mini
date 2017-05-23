registrationModule.controller('presupuestosController', function ($scope, $modal, callback, error, $modalInstance) {
	
	$scope.numCentros=0;
	$scope.models=[];
	

	$scope.init = function (){

		 $scope.plusCentro ();
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

	$scope.dataCentro = function (id, data) {
		$scope.models[id].valor=data;
	}

	$scope.guardarCentros = function (){;
		callback($scope.models);
		$scope.close();
	}

});

