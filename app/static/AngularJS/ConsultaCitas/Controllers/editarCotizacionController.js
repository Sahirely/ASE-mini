registrationModule.controller('editarCotizacionController', function($scope, $location, userFactory, cotizacionRepository, consultaCitasRepository, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, detalleRepository) {
	
	$scope.numeroOrden = $routeParams.orden;
	$scope.cotizacion = $routeParams.data;
	 $scope.userData = userFactory.getUserData();

	 
    
	$scope.init  = function (){
		userFactory.ValidaSesion();
		$scope.getOrdenDetalle();
	}

	 $scope.getOrdenDetalle = function() {
	 
        consultaCitasRepository.getOrdenDetalle( $scope.userData.idUsuario, $scope.numeroOrden).then(function(result) {
        	
            if (result.data.length > 0) {

                $scope.detalleOrden = result.data[0];
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los detalles de la orden');
        });
    }
});