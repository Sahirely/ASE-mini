registrationModule.controller('evidenciaSustitutoController', function (MarkerCreatorService, userFactory, $scope, $modal, $route, $rootScope, $location, localStorageService, alertFactory, globalFactory, sustitutoRepository, uploadRepository, commonService ) {
	$rootScope.modulo = 'evidenciaSustituto';

        

	$scope.initEvidencia = function (){
	   	userFactory.ValidaSesion();
	    $scope.userData = userFactory.getUserData()
	    $scope.rolLogged = $scope.userData.idRol
	    $scope.idUsuario = $scope.userData.idUsuario
	    $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
	}


});