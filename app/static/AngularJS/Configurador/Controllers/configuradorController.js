registrationModule.controller('configuradorController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory) {

	$scope.show_wizard= false;
	$scope.show_busquedaCliente=true;

	$scope.nuevoCliente = function (){

		$scope.show_wizard= true;
		$scope.show_busquedaCliente=false;
		$scope.show_cliente=true;

	}

	$scope.guardarCliente = function (){
		$scope.show_cliente=false;
		$scope.show_operacion=true;
	}

	$scope.guardarOperacion = function (){
		$scope.show_operacion=false;
		$scope.show_licitacion=true;
	}

	$scope.guardarLicitacion = function (){
		$scope.show_licitacion=false;
		$scope.show_unidad=true;
	}

	$scope.guardarUnidad = function (){
		$scope.show_unidad=false;
		$scope.show_modulos=true;
	}
});

