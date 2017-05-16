registrationModule.controller('detalleController', function($scope, $location, consultaCitasRepository,$rootScope, $routeParams,alertFactory, globalFactory, commonService, localStorageService, detalleRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    //$rootScope.modulo = 'reporteHistorial';
    //Inicializa la pagina
    $scope.init = function() {
    	console.log($routeParams.orden);

    }
});