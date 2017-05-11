registrationModule.controller('configuradorController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory) {

	$scope.show_wizard= false;
	$scope.show_busquedaCliente=true;

	$scope.nuevoCliente = function (){

		$scope.show_wizard= true;
		$scope.show_busquedaCliente=false;

	}
});

