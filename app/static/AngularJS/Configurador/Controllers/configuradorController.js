registrationModule.controller('configuradorController', function ($scope, $route, $modal, $rootScope, globalFactory, configuradorRepository, localStorageService, alertFactory) {

	
	$scope.show_cargaUnidades=false;
	$scope.contadorModulo=0;
	$scope.adicionaleModulos=[];
	$scope.disabledOperacion=true;
	$scope.idOperacion = '';

	$scope.init= function (){
		$scope.limpiarDatos ();
		$scope.show_wizard= false;
		$scope.show_busquedaOperacion=true;
		$scope.getOperaciones();
	}

	$scope.limpiarDatos = function () {
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
	}

/********BUSQUEDA*************/	

	$scope.nuevaOperacion= function (){
		
		$scope.show_wizard= true;
		$scope.show_busquedaOperacion=false;
		$scope.show_operacion=true;
		$scope.operacionActivity='activityMenu';
		$scope.getTipoOperacion();
		$scope.getFormaPago();

	}

	$scope.lookUpOperacion = function (data){
		debugger;
		
		$scope.idOperacion=data.idOperacion;
		$scope.promise = configuradorRepository.getDatosOperacion(data.idOperacion).then(function (result) {
            if (result.data.length > 0) {

            	var fechaIni=new Date(result.data[0].fechaInicio);
            	fechaIni = fechaIni.toString();
            	var fechaFin=new Date(result.data[0].fechaFin);
            	fechaFin = fechaFin.toString();
            	$scope.datosOperacion= result.data;
            	$scope.nomOperacion = result.data[0].nombreOperacion;
            	$scope.nomContacto = result.data[0].nombreContacto;
            	$scope.correoContacto = result.data[0].correoContacto;
            	$scope.telContacto = result.data[0].telefonoContacto;
            	$scope.fechaIni = fechaIni;
            	$scope.fechaFin = fechaFin;
            	$scope.utilidad = result.data[0].manejoUtilidad;
            	$scope.porcentajeUtilidad = result.data[0].porcentajeUtilidad;
            	$scope.presupuesto = result.data[0].presupuesto;
            	$scope.gsp = result.data[0].geolocalizacion;
            	$scope.estatus = result.data[0].idEstatusOperacion;
            	if (result.data[0].idEstatusOperacion == 1) {
            		$scope.disabledOperacion=true;
            	}

            	if ($scope.presupuesto == 1) {
            		$scope.show_linkPresupuesto=true;
            	};

            	$scope.nuevaOperacion();

            }
        }, function (error) {
            alertFactory.error('No se pudierón obyener los datos de la Operación');
        });
	}

	 $scope.getOperaciones = function(){
         $('.dataTableOperacion').DataTable().destroy();
         $scope.operaciones=[];
        $scope.promise = configuradorRepository.getOperaciones().then(function (result) {
            if (result.data.length > 0) {
                $scope.operaciones = result.data;
                 globalFactory.filtrosTabla("dataTableOperacion", "Operaciones", 5);
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
                debugger;
                if ($scope.idOperacion !== '') {
                	$scope.tipoOperacion =$scope.tipoOperaciones[$scope.datosOperacion[0].idCatalogoTipoOperacion]
                };
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Tipos de Operación');
        });
    }

     $scope.getFormaPago = function(){
        $scope.promise = configuradorRepository.getFormaDePago().then(function (result) {
            if (result.data.length > 0) {
                $scope.formaDePagos = result.data;
                if ($scope.idOperacion !== '') {
                	for (var i = 0 ; i < result.data.length; i++) {
                		if ($scope.datosOperacion[0].idCatalogoFormaPago == result.data[i].idCatalogoFormaPago) {
                			$scope.formaDePago =result.data[i];
                		}
                	}
                };
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
		var fecha= $scope.fechaIni.split('/');
        var fechaIni = fecha[2] + '/' + fecha[1] + '/' + fecha[0]
        var fecha2 = $scope.fechaFin.split('/');
        var fechaFin = fecha2[2] + '/' + fecha2[1] + '/' + fecha2[0]

		if ( $scope.validarCorreo($scope.correoContacto)) {
			$scope.promise = configuradorRepository.postOperaciones($scope.nomOperacion, $scope.nomContacto, $scope.correoContacto, $scope.telContacto, fechaIni, fechaFin, $scope.tipoOperacion, $scope.utilidad, $scope.porcentajeUtilidad, $scope.gsp, $scope.estatus, $scope.formaDePago, $scope.presupuesto, $scope.centros, $scope.idOperacion).then(function (result) {
	            if (result.data[0].idOperacion != undefined) {
	            
	            	$scope.idOperacion=result.data[0].idOperacion;
	                $scope.show_operacion=false;
					$scope.show_licitacion=true;
					$scope.operacionActivity='';
					$scope.licitacionActivity='activityMenu';
					$scope.getLicitaciones();
	            }
	        }, function (error) {
	            alertFactory.error('No se puenen guardar la Operación');
	        });
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
		$scope.limpiarDatos();
	}
		

/********LICITACIÓN*************/	

	$scope.getLicitaciones = function() {
         $('.dataTableLicitaciones').DataTable().destroy();
         $scope.licitaciones=[];
        $scope.promise = configuradorRepository.getLicitaciones().then(function (result) {
            if (result.data.length > 0) {
                $scope.licitaciones = result.data;
                 globalFactory.filtrosTabla("dataTableLicitaciones", "Operaciones", 5);
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las Operaciones');
        });
    } 

    $scope.selectLicitacion = function (contrato) {
    	$scope.idContrato=contrato.idContrato;

    }


	$scope.guardarLicitacion = function (){

		if ($scope.idContrato != '' || $scope.idContrato != undefined) {
		$scope.promise = configuradorRepository.postContratoOperacion($scope.idOperacion, $scope.idContrato).then(function (result) {
				
	        	if (result.data.length > 0) {
	           		$scope.idContratoOperacion=result.data[0].idContratoOperacion;
	                $scope.show_licitacion=false;
					$scope.show_unidad=true;
					$scope.licitacionActivity='';
					$scope.unidadActivity='activityMenu';
					$scope.getTipoUnidad();
	            }
	        }, function (error) {
	            alertFactory.error('No se puenen guardar la Operación');
	        });
		}else{
			alertFactory.error('Seleccione una Licitación.');
		}

		
	}

	$scope.openOperacion = function (){
		$scope.show_operacion=true;
		$scope.show_licitacion=false;
	}

/********UNIDAD*************/	

	$scope.getTipoUnidad = function(){
		$scope.disabledTipoUnidad=false;
        $scope.promise = configuradorRepository.getTipoUnidades(3).then(function (result) {
            if (result.data.length > 0) {
                $scope.tiposUnidades = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Centros de Trabajo');
        });
    }

	$scope.guardarUnidad = function (){
		$scope.show_unidad=false;
		$scope.show_modulos=true;
		$scope.unidadActivity='';
		$scope.moduloActivity='activityMenu';
		$scope.catalogoDeModulos('Default');
		$scope.catalogoDeModulos('Adicional');
	}

	$scope.openLicitacion = function (){
		$scope.show_licitacion=true;
		$scope.show_unidad=false;
	}

	$scope.nuevaUnidad = function () {
    	modal_nuevaUnidad($scope, $modal, $scope.idOperacion, $scope.presupuesto, $scope.gsp, '', '');
    }

    $scope.changeTipo = function (tipo, valor) {
    	var obj=new Object();
        obj=new Object();
        obj.ID= tipo.idTipoUnidad;
        obj.valor=valor;
        $scope.unidades.push(obj);
    }

    $scope.guardarTipoUnidades = function () {

    	///falta guardar info
    	$scope.show_cargaUnidades=true;
    	$scope.disabledTipoUnidad=true;
    }

/********MODULOS*************/	

	$scope.detalleModulo = function (modulo){
		modal_detalleModulos($scope, $modal, $scope.idOperacion, modulo, '', '');
	}

	$scope.catalogoDeModulos = function(tipo){
		$scope.modulosDefault = [];
		$scope.modulosAdicional = [];

        $scope.promise = configuradorRepository.getCatalogoModulos($scope.idOperacion, tipo).then(function (result) {
            if (result.data.length > 0) {
	                debugger;
                if (tipo == 'Default') {
                	$scope.modulosDefault = result.data;
                }else{
                	$scope.modulosAdicional = result.data;
                }
                
            }
        }, function (error) {
            alertFactory.error('No se pueden obtener los Modulos');
        });
    }

	$scope.openUnidad = function (){
		$scope.show_unidad=true;
		$scope.show_modulos=false;
	}

	 $scope.changeModulo = function (data, modulo) {
        debugger;
        var bandera = false;
        if ($scope.adicionaleModulos.length>0) {
	        for (var i = 0 ; i < $scope.adicionaleModulos.length; i++) {
	            if ($scope.adicionaleModulos[i].idCatalogoModulo == data.idCatalogoModulo) {
	                bandera = true
	            };
	        };

	        if(!bandera){
	            var obj=new Object();
	                obj=new Object();
	                obj.ID= $scope.contadorModulo;
	                obj.idCatalogoModulo = data.idCatalogoModulo;
	                obj.valor=modulo;
	                $scope.adicionaleModulos.push(obj);
	                $scope.contadorModulo += 1;
	        }else{
	            $scope.adicionaleModulos[data].valor=detalle
	        }
	     }else{
	     	var obj=new Object();
                obj=new Object();
                obj.ID= $scope.contadorModulo;
                obj.idCatalogoModulo = data.idCatalogoModulo;
                obj.valor=modulo;
                $scope.adicionaleModulos.push(obj);
                $scope.contadorModulo += 1;
	     }



    }

    $scope.guardarModulos = function () {
        var modulos = '';
        for (var i = 0 ; i < $scope.adicionaleModulos.length; i++) {
            if ($scope.detalles[i].valor) {
                modulos += $scope.detalles[i].idCatalogoModulo +',';
            };
        };

		$scope.promise = configuradorRepository.postModuloAdicional($scope.idOperacion, modulos).then(function (result) {
            if (result.data.length > 0) {
            	debugger;
            	$scope.show_busquedaOperacion=true;
				$scope.show_modulos=false;
            }
        }, function (error) {
            alertFactory.error('No se puede guardar la configuración');
        });
	}
});

