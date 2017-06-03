registrationModule.controller('detalleModulosController', function ($scope, $modal, idOperacion, detalle, idContratoOperacion, unidades, $modalInstance, configuradorRepository, localStorageService, alertFactory) {
$scope.timeAsignacion = localStorageService.get('timeAsigna');

    $scope.init = function () {
        $scope.titulo= detalle.nombreModulos;
        $scope.detalleModulo ();
        $scope.contador =0;
        $scope.detallesPorModulo = [];
        $scope.show_nivelesAprobacion=false;


                //fecha
    $('#fechaAsignada .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        startDate: new Date()
    });

    $('.horaAsignada').clockpicker();
    }

    $scope.detalleModulo = function () {
        $scope.detalles = [];
        $scope.banderaModulo=detalle.idCatalogoModulos;
        $scope.banderaidModulo=detalle.idModulo;
        if($scope.timeAsignacion  == 1){
            if($scope.banderaModulo != 3){
                $scope.promise = configuradorRepository.getTiempoEspera(idOperacion).then(function (result) {
                if (result.data.length > 0) {
                        for (var i = 0 ; i < result.data.length; i++) {
                            if(result.data[i].idEstatusOrden == 1)
                                $scope.sintaller=result.data[i].tiempoEnEspera;
                                if(result.data[i].idEstatusOrden == 2)
                                    $scope.contaller=result.data[i].tiempoEnEspera;
                                    if(result.data[i].idEstatusOrden == 3)
                                        $scope.entaller=result.data[i].tiempoEnEspera;
                                        if(result.data[i].idEstatusOrden == 4)
                                            $scope.aprobacion=result.data[i].tiempoEnEspera;
                                            if(result.data[i].idEstatusOrden == 5)
                                                $scope.enproceso=result.data[i].tiempoEnEspera;
                                                if(result.data[i].idEstatusOrden == 6)
                                                    $scope.terminotrabajo=result.data[i].tiempoEnEspera;
                                                    if(result.data[i].idEstatusOrden == 7)
                                                        $scope.entrega=result.data[i].tiempoEnEspera;
                                                        if(result.data[i].idEstatusOrden == 8)
                                                            $scope.porcobrar=result.data[i].tiempoEnEspera;

                        }
                    }
                }, function (error) {
                    alertFactory.error('No se puede realizar la Operacion');
                });
            }
        }
        $scope.promise = configuradorRepository.getDetalleModulo(detalle.idModulo).then(function (result) {
            if (result.data.length > 0) {
               $scope.detalles = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puede guardar la configuración');
        });
    }

    $scope.getAprobaciones = function(){
         $scope.tiposNiveles=[];
        $scope.promise = configuradorRepository.getTiposAprobacion().then(function (result) {
            if (result.data.length > 0) {
                $scope.tiposNiveles = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las Operaciones');
        });
    }

    $scope.getPartidasUnidad = function(){
        debugger;
        $scope.dataPartidas=[];
        for (var i = 0 ; i < unidades.length; i++) {  
            var obj=new Object();
            obj.ID = unidades[i].idTipoUnidad;
            obj.unidad = unidades[i].unidad;
            $scope.partidas=[];
            $scope.promise = configuradorRepository.getPartidasUnidad(idContratoOperacion, unidades[i].idTipoUnidad).then(function (result) {
                debugger;
                if (result.data.length > 0) {
                    
                    $scope.partidas = result.data;

                    
                    obj.partidas=$scope.partidas;
                    $scope.dataPartidas.push(obj);

                }
            }, function (error) {
                alertFactory.error('No se puenen obtener las Operaciones');
            });
        };
    }

     $scope.plusNivel = function (){
        var obj=new Object();
        obj.ID= $scope.numNiveles + 1;
        obj.valor='';
        $scope.niveles.push(obj);

        $scope.numNiveles += 1;

    };

    $scope.change_nivelAprobacion = function () {
        debugger;
        $scope.show_nivelMonto = false;
        $scope.show_nivelPartida = false;

        if ($scope.tipoNivel == 1) {
            $scope.show_nivelMonto = true;
            $scope.niveles = [];
            $scope.numNiveles = 0;
            $scope.plusNivel ();

        }else{
            $scope.show_nivelPartida = true;
            $scope.getPartidasUnidad();
        }
    }

    $scope.changeDetalle = function (data, detalle) {
      debugger;

      if (data.idCatalogoDetalleModulo == 12 && detalle ) {
            $scope.show_nivelesAprobacion=true;
            $scope.getAprobaciones();
      };
        var bandera = false;

        if ($scope.detallesPorModulo.length>0) {
            for (var i = 0 ; i < $scope.detalles.length; i++) {
                if ($scope.detallesPorModulo[i].idCatalogoDetalleModulo == data.idCatalogoDetalleModulo) {
                    bandera = true
                };
            };

            if(!bandera){
                var obj=new Object();
                    obj=new Object();
                    obj.ID= $scope.contador;
                    obj.idCatalogoDetalleModulo = data.idCatalogoDetalleModulo;
                    obj.valor=detalle;
                    $scope.detallesPorModulo.push(obj);
                    $scope.contador += 1;
            }else{
                $scope.detallesPorModulo[data].valor=detalle
            }
        }else{
            var obj=new Object();
                obj=new Object();
                obj.ID= $scope.contador;
                obj.idCatalogoDetalleModulo = data.idCatalogoDetalleModulo;
                obj.valor=detalle;
                $scope.detallesPorModulo.push(obj);
                $scope.contador += 1;
        }
    }

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.deleteDetalleModulo = function (idDetalleModulo) {
        $scope.promise = configuradorRepository.quitaDetalleModulo(idDetalleModulo).then(function (result) {
            if (result.data.length > 0) {
                $scope.detalleModulo();
            }
        }, function (error) {
            alertFactory.error('No se puede guardar la configuración');
        });
    };

    $scope.guardarDetalle = function () {
        var detalle = '';
        for (var i = 0 ; i < $scope.detallesPorModulo.length; i++) {
            if ($scope.detallesPorModulo[i].valor) {
                detalle += $scope.detallesPorModulo[i].idCatalogoDetalleModulo +',';
            };
        };
        if($scope.banderaModulo == 3){
                    $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle).then(function (result) {
                        if (result.data.length > 0) {
                            $scope.close();
                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la configuración');
                    });
        }
        if($scope.banderaModulo == 4){
            if(($scope.sintaller != undefined && $scope.sintaller != "") && ($scope.contaller != undefined && $scope.contaller  != "") && 
               ($scope.entaller != undefined && $scope.entaller  != "")){
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 1, $scope.sintaller).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    }); 
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 2, $scope.contaller).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    }); 
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 3, $scope.entaller).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    });
                            $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle).then(function (result) {
                                if (result.data.length > 0) {
                                    $scope.close();
                                }
                            }, function (error) {
                                alertFactory.error('No se puede guardar la configuración');
                            }); 
            }else{
                alertFactory.info('Porfavor ingrese las fechas');
            }
        }
        if($scope.banderaModulo == 5){
            if(($scope.aprobacion != undefined && $scope.aprobacion != "")){
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 4, $scope.aprobacion).then(function (result) {
                        if (result.data.length > 0) {
                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    }); 
                            $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle).then(function (result) {
                                if (result.data.length > 0) {
                                    $scope.close();
                                }
                            }, function (error) {
                                alertFactory.error('No se puede guardar la configuración');
                            });
            }else{
                alertFactory.info('Porfavor ingrese una fecha');
            }
        }
        if($scope.banderaModulo == 6){
            if(($scope.enproceso != undefined && $scope.enproceso != "") && ($scope.terminotrabajo != undefined && $scope.terminotrabajo  != "") && 
               ($scope.entrega != undefined && $scope.entrega  != "")){
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 5, $scope.enproceso).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    }); 
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 6, $scope.terminotrabajo).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    }); 
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 7, $scope.entrega).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    }); 
                            $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle).then(function (result) {
                                if (result.data.length > 0) {
                                    $scope.close();
                                }
                            }, function (error) {
                                alertFactory.error('No se puede guardar la configuración');
                            });
            }else{
                alertFactory.info('Porfavor ingrese las fechas');
            }  
        }
        if($scope.banderaModulo == 7){
            if(($scope.porcobrar != undefined && $scope.porcobrar != "")){
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 8, $scope.porcobrar).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    }); 
                            $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle).then(function (result) {
                                if (result.data.length > 0) {
                                    $scope.close();
                                }
                            }, function (error) {
                                alertFactory.error('No se puede guardar la configuración');
                            });
            }else{
                alertFactory.info('Porfavor ingrese una fecha');
            }
            
        }

	}
});

