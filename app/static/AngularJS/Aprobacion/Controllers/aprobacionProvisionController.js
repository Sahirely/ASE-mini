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
        debugger;
        location.href = '/detalle?orden=' + obj.numeroOrden + '&estatus=' + obj.idEstatusOrden;
    }


    $scope.aprobarProvision = function (provision){

    	swal({
            title: "Advertencia",
            text: "¿Está seguro de aprobar la provisión de la orden?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#67BF11",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: true
        },
         function (isConfirm) {
            /*if (isConfirm) {

            	provisionesRepository.putAprobacionProvision(provision.idTrabajo, $scope.userData.idUsuario ).then(function (res) {
        
		            if (res.data[0].id == 1) {
		            	 swal("Proceso Realizado!");
		            	$scope.getAprobacionProvision();
		            }else if (res.data[0].id  == 2) {
		            	 swal("Ya se encuentra procesada");
		            }
		        }, function (error) {
		            alertFactory.error("Error al cargar la orden");
		        });
            }*/
        });

    	 
    }

   
 



  });