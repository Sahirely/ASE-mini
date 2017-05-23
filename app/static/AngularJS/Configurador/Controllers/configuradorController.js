registrationModule.controller('configuradorController', function ($scope, $route, $modal, $rootScope, globalFactory, configuradorRepository, localStorageService, alertFactory) {

	$scope.nomOperacion = ''; 
	$scope.nomContacto = '';  
	$scope.correoContacto = '';  
	$scope.telContacto = '';  
	$scope.fechaIni = '';  
	$scope.fechaFin = '';  
	$scope.tipoOperacion = '';  
	$scope.utilidad = '';  
	$scope.porcentajeUtilidad = ''; 
	$scope.gsp = '';  
	$scope.estatus = '';  
	$scope.formaDePago = '';  
	$scope.presupuesto = ''; 
	$scope.centros = ''; 
	$scope.idContrato = '';

	$scope.init= function (){
		$scope.show_wizard= false;
		$scope.show_busquedaOperacion=true;
		$scope.getOperaciones();
	}

/********BUSQUEDA*************/	

	$scope.nuevaOperacion= function (){

		$scope.show_wizard= true;
		$scope.show_busquedaOperacion=false;
		$scope.show_operacion=true;
		$scope.getTipoOperacion();
		$scope.getFormaPago();

	}

	 $scope.getOperaciones = function(){
         $('.dataTableOperacion').DataTable().destroy();
         $scope.operaciones=[];
        $scope.promise = configuradorRepository.getOperaciones().then(function (result) {
            if (result.data.length > 0) {
                $scope.operaciones = result.data;
                 globalFactory.waitDrawDocument("dataTableOperacion", "Operaciones");
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las Operaciones');
        });
    }

/********OPERACIÓN*************/	

     $scope.getTipoOperacion = function(){
        $scope.promise = configuradorRepository.getTipoOperaciones().then(function (result) {
            if (result.data.length > 0) {
                $scope.tipoOperaciones = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Tipos de Operación');
        });
    }

     $scope.getFormaPago = function(){
        $scope.promise = configuradorRepository.getFormaDePago().then(function (result) {
            if (result.data.length > 0) {
                $scope.formaDePagos = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las Formas de Pago');
        });
    }

    $scope.presupuestos = function () {
    	modal_presupuestos($scope, $modal, $scope.centrosDeTrabajo, '');
    }

    $scope.centrosDeTrabajo = function (data) {
    	$scope.centros ='';
    	for (var i = 0 ; i < data.length; i++) {
          if (data[i].valor!= undefined) {
          		$scope.centros+=data[i].valor+',';
          };
        }
    }

   
	$scope.guardarOperacion = function () {
		if ( $scope.validarCorreo($scope.correoContacto)) {
			//$scope.promise = configuradorRepository.postOperaciones($scope.nomOperacion, $scope.nomContacto, $scope.correoContacto, $scope.telContacto, $scope.fechaIni, $scope.fechaFin, $scope.tipoOperacion, $scope.utilidad, $scope.porcentajeUtilidad, $scope.gsp, $scope.estatus, $scope.formaDePago, $scope.presupuesto, $scope.centros).then(function (result) {
	          //  if (result.data.length > 0) {
	            //	$scope.idOperacion=result.data[0].idOperacion;

	            	$scope.idOperacion=7;
	                $scope.show_operacion=false;
					$scope.show_licitacion=true;
					$scope.getLicitaciones();
	            //}
	        //}, function (error) {
	          //  alertFactory.error('No se puenen guardar la Operación');
	        //});
		}else{
			alertFactory.error('El formato del Correo es incorrecto');
		}
	}

	$scope.validarCorreo = function(correos) {
        if ($.trim(correos) == '') {
            return false;
        } else if (!isValidEmailAddress($.trim(correos))) {
            return false;
        } else {
            return true;
        }
    }


	$scope.disabledOperacion = function () {
		
		if ($scope.nomOperacion !=='' && $scope.nomContacto !=='' && $scope.correoContacto !=='' && $scope.telContacto !=='' && $scope.fechaIni !=='' && $scope.fechaFin !=='' && $scope.tipoOperacion !=='' && $scope.utilidad !=='' && $scope.gsp !=='' &&  $scope.estatus !=='' &&  $scope.formaDePago !=='' &&  $scope.presupuesto !=='' ) {

			if ($scope.utilidad == 1) {
				if ($scope.porcentajeUtilidad !=='') {
					if ($scope.presupuesto == 1) {
						if ( $scope.centros !=='' ) {
							return true;
						}else {
							return false;
						}
					}else{
						return true;
					}
				}else{
					return false;
				}

			}else{
				if ($scope.presupuesto == 1) {
					if ( $scope.centros !=='' ) {
						return true;
					}else {
						return false;
					}
				}else{
					return true;
				}
			}
			
		}else{
			return false;
		}
		  
	}

	$scope.openBusqueda = function () {
		$scope.idOperacion='';
        $scope.show_wizard= false;
		$scope.show_busquedaOperacion=true;
		$scope.show_operacion=false;
	}
		

/********LICITACIÓN*************/	

	$scope.getLicitaciones = function() {
         $('.dataTableLicitaciones').DataTable().destroy();
         $scope.licitaciones=[];
        $scope.promise = configuradorRepository.getLicitaciones().then(function (result) {
            if (result.data.length > 0) {
                $scope.licitaciones = result.data;
                 globalFactory.waitDrawDocument("dataTableLicitaciones", "Operaciones");
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las Operaciones');
        });
    } 

    $scope.selectLicitacion = function (contrato) {
    	$scope.idContrato=contrato.idContrato;

    }


	$scope.guardarLicitacion = function (){

		//if ($scope.idContrato != '' || $scope.idContrato != undefined) {
		//	$scope.promise = configuradorRepository.postContratoOperacion($scope.idOperacion, $scope.idContrato).then(function (result) {
				
	      //      if (result.data.length > 0) {
	        //    	$scope.idContratoOperacion=result.data[0].idContratoOperacion;
	                $scope.show_licitacion=false;
					$scope.show_unidad=true;
	            }
	        /*}, function (error) {
	            alertFactory.error('No se puenen guardar la Operación');
	        });
		}else{
			alertFactory.error('Seleccione una Licitación.');
		}*/

		
	}

	$scope.openOperacion = function (){
		$scope.show_operacion=true;
		$scope.show_licitacion=false;
	}

/********UNIDAD*************/	

	$scope.guardarUnidad = function (){
		$scope.show_unidad=false;
		$scope.show_modulos=true;
	}

	$scope.openLicitacion = function (){
		$scope.show_licitacion=true;
		$scope.show_unidad=false;
	}

/********MODULOS*************/	

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

	$scope.openUnidad = function (){
		$scope.show_unidad=true;
		$scope.show_modulos=false;
	}
});

