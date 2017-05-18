registrationModule.controller('configuradorController', function ($scope, $route, $modal, $rootScope, globalFactory, configuradorRepository, localStorageService, alertFactory) {

	

	$scope.init= function (){
		$scope.show_wizard= false;
		$scope.show_busquedaOperacion=true;
		$scope.getOperaciones();
	}

	$scope.nuevaOperacion= function (){

		$scope.show_wizard= true;
		$scope.show_busquedaOperacion=false;
		$scope.show_operacion=true;

	}

	 $scope.getOperaciones = function(){
         $('.dataTableOperacion').DataTable().destroy();
         $scope.operaciones=[];
        $scope.promise = configuradorRepository.getOperaciones().then(function (result) {
        	debugger;
            if (result.data.length > 0) {
                $scope.operaciones = result.data;
                 globalFactory.waitDrawDocument("dataTableOperacion", "Operaciones");
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las órdenes');
        });
    }
	/*$scope.guardarCliente = function (){
		$scope.show_cliente=false;
		$scope.show_operacion=true;
	}*/

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

	$scope.detalleModulo = function (modulo){

		switch(modulo)
        {
            case "citas":
            	modal_citas($scope, $modal, '', '')
            break;
            case "consultaCitas":
            	modal_consultaCitas($scope, $modal, '', '')
            break;
            case "aprobaciones":
            	modal_aprobaciones($scope, $modal, '', '')
            break;
            case "servicio":
            	modal_servicios($scope, $modal, '', '')
            break;
            case "porCobrar":
            	modal_porCobrar($scope, $modal, '', '')
            break;
        }
	}
});

