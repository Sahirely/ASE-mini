registrationModule.controller('configuradorController', function ($scope, $route, $modal, $rootScope, userFactory, globalFactory, configuradorRepository, localStorageService, alertFactory, $window) {


	$scope.contadorModulo=0;
	$scope.contador=0;
	$scope.adicionaleModulos=[];
	$scope.operacioActiva=true;
	$scope.idOperacion = 0;
	$scope.unidades = [];
    $scope.idContrato = '';
    $scope.porcentajeUtilidad = 0;

	$scope.init= function (){
        userFactory.ValidaSesion();
        Dropzone.autoDiscover = false;
        $scope.dzOptionsCotizacion = configuradorRepository.getDzOptions("image/*,application/pdf,.mp4,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/xml,.docX,.DOCX,.ppt,.PPT",20);
		$scope.limpiarDatos ();
		$scope.show_wizard= false;
		$scope.show_busquedaOperacion=true;
		$scope.getOperaciones();
	}

	$scope.limpiarDatos = function () { 
		$scope.tipoOperacion = '';  
		$scope.utilidad = '';  
		$scope.porcentajeUtilidad = 0; 
		$scope.gsp = '';  
        $scope.asignado = '';  
		$scope.estatus = '';  
		$scope.formaDePago = '';  
		$scope.presupuesto = ''; 
		$scope.centros = ''; 
		$scope.idContrato = 0;
	}

    $scope.menu = function (modulo) {
        $scope.operacionActivity='';
        $scope.licitacionActivity='';
        $scope.unidadActivity='';
        $scope.moduloActivity='';

        switch(modulo) {
            case "operacion":
                $scope.operacionActivity='activityMenu';
                break;
            case "licitacion":
                $scope.licitacionActivity='activityMenu';
                break;
            case "unidad":
                $scope.unidadActivity='activityMenu';
                break;
            case "modulos":
                $scope.moduloActivity='activityMenu';
                break;
        }
    }

/********BUSQUEDA*************/	

	$scope.nuevaOperacion= function (){
		$scope.show_wizard= true;
		$scope.show_busquedaOperacion=false;
		$scope.show_operacion=true;
		$scope.menu('operacion'); 
        $scope.btn_operacion = 'Guardar';
		$scope.getTipoOperacion();
		//$scope.getFormaPago();

	}

	$scope.lookUpOperacion = function (data){
		
		$scope.idOperacion=data.idOperacion;

		$scope.promise = configuradorRepository.getDatosOperacion(data.idOperacion).then(function (result) {
            if (result.data.length > 0) {
                $scope.nuevaOperacion();
            	$scope.datosOperacion= result.data;
            	$scope.utilidad = result.data[0].manejoUtilidad;
            	$scope.porcentajeUtilidad = result.data[0].porcentajeUtilidad;
            	$scope.presupuesto = result.data[0].presupuesto;
            	$scope.gsp = result.data[0].geolocalizacion;
                $scope.asignado = result.data[0].tiempoAsignado; 
            	$scope.estatus = result.data[0].idEstatusOperacion;
                $scope.formaDePago = result.data[0].formaPago;
                $scope.btn_operacion = 'Siguiente';
            	if ($scope.estatus == 1) {
            		$scope.operacioActiva=false;
            	}else {
                    $scope.operacioActiva=true;
                }

            	if ($scope.presupuesto == 1) {
            		$scope.show_linkPresupuesto=true;
            	};

            	

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
                 globalFactory.filtrosTabla("dataTableOperacion", "Operaciones", 100);
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
                if ($scope.idOperacion !== '') {
                	for (var i = 0 ; i < result.data.length; i++) {
                		if ($scope.datosOperacion[0].idCatalogoTipoOperacion == result.data[i].idTipoOperacion) {
                			$scope.tipoOperacion =result.data[i].idTipoOperacion;
                		}
                	}
                };
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Tipos de Operación');
        });
    }

     /*$scope.getFormaPago = function(){
        $scope.promise = configuradorRepository.getFormaDePago().then(function (result) {
            if (result.data.length > 0) {
                $scope.formaDePagos = result.data;
                if ($scope.idOperacion !== '') {
                	for (var i = 0 ; i < result.data.length; i++) {
                		if ($scope.datosOperacion[0].idCatalogoFormaPago == result.data[i].idFormaPago) {
                			$scope.formaDePago =result.data[i].idFormaPago;
                		}
                	}
                };
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las Formas de Pago');
        });
    }*/

    $scope.presupuestos = function (modalUnidad) {
        modalUnidad != 1 ? modalUnidad = 2 : modalUnidad;
    	modal_presupuestos($scope, $modal, $scope.idOperacion, modalUnidad, $scope.centrosDeTrabajo, '');
    }

    $scope.centrosDeTrabajo = function (data) {
        $scope.centros ='';
        $scope.idCentroTrabajo ='';
    	for (var i = 0 ; i < data.length; i++) {
          if (data[i].valor!= undefined) {
          		$scope.centros+=data[i].valor+',';
                $scope.idCentroTrabajo+=data[i].idCentroTrabajo+',';
          };
        }
    }

   
	$scope.guardarOperacion = function () {
        localStorageService.set('timeAsigna', $scope.asignado);
		$scope.promise = configuradorRepository.postOperaciones($scope.tipoOperacion, $scope.utilidad, $scope.porcentajeUtilidad, $scope.gsp, $scope.asignado, $scope.estatus, $scope.formaDePago, $scope.presupuesto, $scope.centros, $scope.idOperacion, $scope.idCentroTrabajo).then(function (result) {
            
            if (result.data[0].idOperacion != undefined) {
            
            	$scope.idOperacion=result.data[0].idOperacion;
                $scope.show_operacion=false;
				$scope.show_licitacion=true;
				$scope.menu('licitacion');
				$scope.getLicitaciones();
            }
        }, function (error) {
            alertFactory.error('No se puenen guardar la Operación');
        });
	}

	/*$scope.validarCorreo = function(correos) {
        if ($.trim(correos) == '') {
            return false;
        } else if (!isValidEmailAddress($.trim(correos))) {
            return false;
        } else {
            return true;
        }
    }*/


	$scope.disabledOperacion = function () {

		if ($scope.estatus == 1) {
			return true;
		}else{
			if ($scope.tipoOperacion !=='' && $scope.utilidad !=='' && $scope.gsp !=='' && $scope.asignado !== '' && $scope.estatus !=='' &&  $scope.formaDePago !=='' &&  $scope.presupuesto !=='' ) {

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
        $scope.promise = configuradorRepository.getLicitaciones($scope.idOperacion).then(function (result) {
            if (result.data.length > 0) {
            	for (var i = 0 ; i < result.data.length; i++) {
                   
            		if (result.data[i].idOperacion == null) {
            			$scope.licitaciones.push(result.data[i]);
            		}else if (result.data[i].idOperacion == $scope.idOperacion) {
            			$scope.licitaciones.push(result.data[i]);
                        $scope.idContratoOperacion=result.data[i].idContratoOperacion;
            		};
            	}
                
                 globalFactory.filtrosTabla("dataTableLicitaciones", "Operaciones", 100);
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las Operaciones');
        });
    } 

    $scope.selectLicitacion = function (contrato) {
    	$scope.idContrato=contrato.idContrato;

        $scope.promise = configuradorRepository.postContratoOperacion($scope.idOperacion, $scope.idContrato).then(function (result) {
                if (result.data.length > 0) {
                    $scope.getLicitaciones();
                }
            }, function (error) {
                alertFactory.error('No se puenen guardar la Operación');
            });

    }


	$scope.guardarLicitacion = function (){
		if (($scope.idContrato != 0 && $scope.idContrato != undefined) || $scope.idContratoOperacion>0) {
		$scope.promise = configuradorRepository.postContratoOperacion($scope.idOperacion, $scope.idContrato).then(function (result) {
				
	        	if (result.data.length > 0) {
                    if (result.data[0].idContratoOperacion != undefined) {
                        $scope.idContratoOperacion=result.data[0].idContratoOperacion;
                       
                    };
                    $scope.show_licitacion=false;
                    $scope.show_unidad=true;
                    $scope.menu('unidad');
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
        $scope.menu('operacion');
	}

/********UNIDAD*************/	

	$scope.getTipoUnidad = function(){
        $('.dataTableLicitaciones').DataTable().destroy();
        $scope.tiposUnidades=[];

        $scope.promise = configuradorRepository.getTipoUnidades($scope.idOperacion).then(function (result) {
            if (result.data.length > 0) {
                $scope.tiposUnidades = result.data;
                 globalFactory.filtrosTabla("dataTableUnidades", "Unidades", 100);
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Centros de Trabajo');
        });
    }

	$scope.guardarUnidad = function (){
    		$scope.show_unidad=false;
    		$scope.show_modulos=true;
    		$scope.menu('modulos');
    		$scope.catalogoDeModulos('Default');
    		$scope.catalogoDeModulos('Adicional');
        
	}

	$scope.openLicitacion = function (){
		$scope.show_licitacion=true;
		$scope.show_unidad=false;
        $scope.menu('licitacion');
	}

	$scope.nuevaUnidad = function () {
    	modal_nuevaUnidad($scope, $modal, $scope.idOperacion, $scope.presupuesto, $scope.gsp, $scope.getTipoUnidad , $scope.idContratoOperacion);
    }

    $scope.verTipoUnidades = function () {
    	modal_tipoUnidad($scope, $modal, $scope.tiposUnidades);
    }

    $scope.verZonas = function () {
        modal_zonas($scope, $modal, $scope.idContratoOperacion)
    }
    

    /*$scope.changeTipo = function (tipo, valor) {
        var bandera = false;
        var indice = 0

        if ($scope.unidades.length>0) {
            for (var i = 0 ; i < $scope.unidades.length; i++) {
                if ($scope.unidades[i].ID == tipo.idTipoUnidad) {
                	indice= i;
                    bandera = true
                };
            };

            if(!bandera){
               var obj=new Object();
			        obj.ID= tipo.idTipoUnidad;
			        obj.valor=valor;
			        $scope.unidades.push(obj);
	                $scope.contador += 1;
            }else{
                $scope.unidades[indice].valor=valor
            }
        }else{
            var obj=new Object();
		        obj.ID= tipo.idTipoUnidad;
		        obj.valor=valor;
		        $scope.unidades.push(obj);
                $scope.contador += 1;
        }
    }*/

    $scope.guardarTipoUnidades = function (data) {

        	$scope.promise = configuradorRepository.postnumeroUnidades($scope.idOperacion, data.idTipoUnidad, data.cantidad).then(function (result) {
                if (result.data.length > 0) {
                    $scope.getTipoUnidad ();
                }
            }, function (error) {
                alertFactory.error('No se guardaron las unidades');
            });
    	
    }


    /*$scope.numeroUnidades = function () {
    	$scope.promise = configuradorRepository.getunidadOperacion($scope.idOperacion).then(function (result) {
            if (result.data.length > 0) {
                
            	$scope.numUnidades = result.data;
            }
        }, function (error) {
            alertFactory.error('No se guardaron las unidades');
        });
    	
    }*/

    $scope.descarga_formatoExcelDeUnidades= function () {
        var url = $rootScope.vIpServer + '/AngularJS/Configurador/FormatoExcelDeUnidades.xlsx'
        var a = document.createElement('a');
            a.href = url;
            a.download = 'FormatoUnidad';
            a.click();
        //window.open('C:/Produccion/ASE/ASEv2/app/static/AngularJS/Configurador/FormatoExcelDeUnidades.xlsx', 'FormatoUnidad');
    }

    $scope.carga_formatoExcelDeUnidades = function () {

    	$scope.promise = configuradorRepository.postCargararMaxUnidades($scope.idOperacion, 'Unidades.xlsx').then(function (result) {
            if (result.data.length > 0) {
                
            }
        }, function (error) {
            alertFactory.error('No se pueden obtener los Modulos');
        });

    }


/********MODULOS*************/	

	$scope.detalleModulo = function (modulo){
        
		modal_detalleModulos($scope, $modal, $scope.idOperacion, modulo, $scope.idContratoOperacion, $scope.numUnidades);
	}

	$scope.catalogoDeModulos = function(tipo){
		$scope.modulosDefault = [];
		$scope.modulosAdicional = [];

        $scope.promise = configuradorRepository.getCatalogoModulos($scope.idOperacion, tipo).then(function (result) {
            if (result.data.length > 0) {
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
        $scope.menu('unidad');
	}

	 $scope.changeModulo = function (data, modulo) {
        var bandera = false;
        if ($scope.adicionaleModulos.length>0) {
	        for (var i = 0 ; i < $scope.adicionaleModulos.length; i++) {
	            if ($scope.adicionaleModulos[i].idCatalogoModulo == data.idCatalogoModulos) {
	                bandera = true
	            };
	        };

	        if(!bandera){
	            var obj=new Object();
	                obj=new Object();
	                obj.ID= $scope.contadorModulo;
	                obj.idCatalogoModulo = data.idCatalogoModulos;
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
                obj.idCatalogoModulo = data.idCatalogoModulos;
                obj.valor=modulo;
                $scope.adicionaleModulos.push(obj);
                $scope.contadorModulo += 1;
	     }



    }

    $scope.uploadExcelUnidades = function () {
        $scope.promise = configuradorRepository.postuploadExcel().then(function (result) {
            if (result.data.length > 0) {

            }
        }, function (error) {
            alertFactory.error('No se puede cargar el Archivo');
        });

    }

    $scope.guardarModulos = function () {
        var modulos = '';
        for (var i = 0 ; i < $scope.adicionaleModulos.length; i++) {
            if ($scope.adicionaleModulos[i].valor) {
                modulos += $scope.adicionaleModulos[i].idCatalogoModulo +',';
            };
        };

		$scope.promise = configuradorRepository.postModuloAdicional($scope.idOperacion, modulos).then(function (result) {
            if (result.data.length > 0) {
            	$scope.show_busquedaOperacion=true;
				$scope.show_modulos=false;
                $scope.show_wizard=false;
                swal({
                    title: "Éxito",
                    text: "Se Guardo Correctamente La Operación",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#67BF11 ",
                    confirmButtonText: "Aceptar",
                    closeOnConfirm: true
                });
            }
        }, function (error) {
            alertFactory.error('No se puede guardar la configuración');
        });
	}

    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.newFile = file;
        },
        'sending': function(file, xhr, formData){
            formData.append('idTrabajo', 0);
            formData.append('idCotizacion', 0);
            formData.append('idCategoria', 4);
            formData.append('idNombreEspecial', 0);//evidenciaTrabajo
        }
        ,
        'completemultiple': function (file, xhr) {
            var checkErrorFile = file.some(checkExistsError);
            if(!checkErrorFile){
                var allSuccess = file.every(checkAllSuccess);
                if(allSuccess){
                    $scope.cargaEvidencias();
                    setTimeout(function(){
                        $scope.dzMethods.removeAllFiles(true);
                        $('#cotizacionDetalle').appendTo('body').modal('hide');
                    },1000);
                }
            }
        },
        'error': function (file, xhr) {
            if(!file.accepted){
                $scope.dzMethods.removeFile(file);
            }
            else{
                $scope.dzMethods.removeAllFiles(true);
                alertFactory.info("No se pudieron subir los archivos");   
            }
        },
    };

    //valida si todos son success
    function checkAllSuccess(file, index, array) {
        return file.status === 'success';
    }
    
    //valida si existe algún error
    function checkExistsError(file) {
        return file.status === 'error';
    }

    $scope.adjuntarEvidencia = function () {
        $('#cotizacionDetalle').appendTo('body').modal('show');
    }

    $scope.cargaEvidencias = function () {
        setTimeout(function () {
        $scope.promise = configuradorRepository.postCargararMaxUnidades($scope.idOperacion, 'Unidades.xlsx').then(function (result) {
            if (result.data.length > 0) {
               // $scope.numeroUnidades();  
               $scope.getTipoUnidad (); 
            }
        }, function (error) {
            alertFactory.error('No se pueden obtener los Modulos');
        });
        }, 1000); 
/*        cotizacionEvidenciasRepository.getEvidenciasByCotizacion(idCotizacion, $scope.userData.idTipoUsuario, $scope.idTrabajo).then(function (result) {
            if (result.data.length > 0) {
                $scope.slides = result.data;
                setTimeout(function () {
                    $scope.efectoEvidencias();
                }, 1000)
            } else {
                $scope.alerta = 1;
            }
        }, function (error) {});*/
    }

    $scope.efectoEvidencias = function () {
        $('.file-box').each(function () {
            animationHover(this, 'pulse');
        });
    }

    $scope.deleteModulo = function (idModulo) {
        $scope.promise = configuradorRepository.deleteModulos(idModulo).then(function (result) {
            if (result.data.length > 0) {
                $scope.catalogoDeModulos('Default');
                $scope.catalogoDeModulos('Adicional');
            }
        }, function (error) {
            alertFactory.error('No se pueden obtener los Modulos');
        });
    }

});

