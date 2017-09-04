registrationModule.controller('inversionMensualController', function ($scope, $modal, $route, $rootScope, userFactory,  $location, localStorageService, alertFactory, globalFactory, analisisFlotillaRepository) {
   $rootScope.modulo = 'aprobacionProvision';

  	$scope.init =function(){
      userFactory.ValidaSesion();
      $scope.userData = userFactory.getUserData();
  
  	}	

  

  });