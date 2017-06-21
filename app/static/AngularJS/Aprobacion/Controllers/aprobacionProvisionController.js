registrationModule.controller('aprobacionProvisionController', function ($scope, $modal, $route, $rootScope, userFactory,  $location, localStorageService, alertFactory, globalFactory, provisionesRepository, uploadRepository, ordenPorCobrarRepository, commonService, ordenAnticipoRepository, trabajoRepository ) {
  	//*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'aprobacionProvision';

  	$scope.init =function(){
      $scope.userData = userFactory.getUserData();
  		$scope.getAprobacionProvision();
  	}	

  	$scope.getAprobacionProvision = function () {

        $scope.aprobacionProvision =[];
        $('.dataTableAprobacionProvision').DataTable().destroy();
        
        provisionesRepository.getAprobacionProvision($scope.userData.contratoOperacionSeleccionada).then(function (result) {
        
            if (result.data.length > 0) {
               $scope.aprobacionProvision=result.data;
               globalFactory.filtrosTabla("dataTableAprobacionProvision", "Provisión", 100);
               
            } else {
                alertFactory.info("No se encontrarón datos");
            }
        }, function (error) {
            alertFactory.error("Error al cargar la orden");
        });
    }

    $scope.seleccionarOrden = function(obj) {
        location.href = '/detalle?orden=' + obj.numeroOrden + '&estatus=' + obj.idEstatusOrden;
    }

  });