registrationModule.controller('tutorialController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, citaRepository, ordenServicioRepository, cotizacionRepository, trabajoRepository, uploadRepository) {
 	//*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'tutorial';
 	$scope.show_slide=false;
 	$scope.class_info="animate_off";
 	$scope.class_width="content_info";
 	$scope.class_info_width="";

	$scope.info = function () {
		if ($scope.show_slide==false) {
			$scope.show_slide=true;
	        $scope.class_info="animate_on";
	        $scope.class_width="content_width";
	        $scope.class_info_width="info_width";
		}else{
			$scope.show_slide=false;
	        $scope.class_info="animate_off";
		 	$scope.class_width="content_info";
		 	$scope.class_info_width="";
		}
     }

    $scope.descargaTeam = function () {
    	window.open($rootScope.vIpServer + '/uploads/tutorial/TeamViewer.exe');
    }
});