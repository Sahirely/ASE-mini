registrationModule.controller('editarCotizacionController', function($scope, $location, userFactory, cotizacionRepository, consultaCitasRepository, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, detalleRepository) {
	debugger;
	$scope.numeroOrden = $routeParams.orden;
	$scope.cotizacion = $routeParams.data;
	 $scope.userData = userFactory.getUserData();

	 
    
	$scope.init  = function (){
		debugger;
		$scope.getOrdenDetalle();
	}

	 $scope.getOrdenDetalle = function() {
	 	debugger;
        consultaCitasRepository.getOrdenDetalle( $scope.userData.idUsuario, $scope.numeroOrden).then(function(result) {
        	debugger;
            if (result.data.length > 0) {

                $scope.detalleOrden = result.data[0];
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los detalles de la orden');
        });
    }
});