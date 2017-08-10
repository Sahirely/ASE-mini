registrationModule.controller('detalleModulosController', function ($scope, $modal, idOperacion, detalle, userFactory, idContratoOperacion, unidades, $modalInstance, configuradorRepository, localStorageService, alertFactory, globalFactory) {
$scope.timeAsignacion = localStorageService.get('timeAsigna');

    $scope.init = function () {
        userFactory.ValidaSesion();
        $scope.titulo= detalle.nombreModulos;
        $scope.detalleModulo ();
        $scope.contador =0;
        $scope.contadorPartida = 0;
        $scope.detallesPorModulo = [];
        $scope.show_nivelesAprobacion=false;
        $scope.disabledTipoNivel = false;
        $scope.nivelPartida = [];


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
                                                                    if(result.data[i].idEstatusOrden == 11)
                                                                         $scope.generada=result.data[i].tiempoEnEspera;
                                                                            if(result.data[i].idEstatusOrden == 12)
                                                                                 $scope.enviadas=result.data[i].tiempoEnEspera;
                                                                                    if(result.data[i].idEstatusOrden == 13)
                                                                                         $scope.abonadas=result.data[i].tiempoEnEspera;

                        }
                    }
                }, function (error) {
                    alertFactory.error('No se puede realizar la Operacion');
                });
            }
        }
        $scope.promise = configuradorRepository.getDetalleModulo(detalle.idModulo, idOperacion).then(function (result) {
            if (result.data.length > 0) {
               $scope.detalles = result.data;
                    for (var i = 0 ; i < result.data.length; i++) {
                        if(result.data[i].idCatalogoDetalleModulo == 12){
                            $scope.show_nivelesAprobacion = true;
                            $scope.getAprobaciones();
                        }

                    }
            }
        }, function (error) {
            alertFactory.error('No se puede guardar la configuración');
        });
    }

    $scope.getAprobaciones = function(){
        $scope.selAprobaciones ();
         $scope.tiposNiveles=[];
        $scope.promise = configuradorRepository.getTiposAprobacion().then(function (result) {
            if (result.data.length > 0) {
                $scope.tiposNiveles = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las Operaciones');
        });
    }


    $scope.selAprobaciones = function(){
        //monto
       $scope.promise = configuradorRepository.getInfoNivelMonto(idContratoOperacion).then(function (result) {
            if (result.data.length > 0) {
                   $scope.niveles = [];
                   $scope.show_nivelMonto = true;
                   $scope.tipoNivel = 1;
                   $scope.disabledTipoNivel = true;
                   $scope.numNiveles = 0;
                for (var i = 0 ; i < result.data.length; i++) {
                    var obj=new Object();
                    obj.ID= $scope.numNiveles;
                    obj.numNiveles=result.data[i].nivel;
                    obj.cantidadDe=result.data[i].montoDe;
                    obj.cantidadA=result.data[i].montoA;
                    obj.cantidadMax=result.data[i].montoMax;
                    obj.isNew = false;

                    obj.valor='';

                    $scope.niveles.push(obj);
                    $scope.idDetalleOperacionAprobacionMonto = result.data[i].idDetalleOperacionAprobacionMonto;

                    $scope.numNiveles += 1;
                 }
            }else{
                //partidas
                    //$scope.disabledTipoNivel = true;
                    $scope.getPartidasUnidad ();
                    $scope.show_nivelPartida = true;
                    $scope.tipoNivel = 2;

            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Niveles de Atorización');
        });
    }

    $scope.getPartidasUnidad = function(){
        $scope.dataPartidas=[];
        $('.dataTablePartidas').DataTable().destroy();
        // for (var i = 0 ; i < unidades.length; i++) {
            var obj=new Object();
        //     obj.ID = unidades[i].idTipoUnidad;
        //     obj.unidad = unidades[i].unidad;
            $scope.partidas=[];

            $scope.promise = configuradorRepository.getInfoNivelPartida(idContratoOperacion).then(function (result) {

                if (result.data.length > 0) {

                    $scope.partidas = result.data;

                    obj.partidas=$scope.partidas;
                    $scope.dataPartidas.push(obj);

                }
            }, function (error) {
                alertFactory.error('No se puenen obtener las Operaciones');
            });
        // };

        globalFactory.filtrosTabla("dataTablePartidas", "PARTIDAS", 5);
    }

     $scope.plusNivel = function (){
        var obj=new Object();
        obj.ID= $scope.numNiveles;
        obj.numNiveles= $scope.numNiveles + 1;
        obj.valor='';
        obj.isNew = true;
        $scope.niveles.push(obj);

        $scope.numNiveles += 1;

    };


    $scope.agregarNivelMonto = function(){
          // swal({
          //     title: "Advertencia",
          //     text: "¿Desea otro nivel de aprobacion?  ",
          //     type: "warning",
          //     showCancelButton: true,
          //     confirmButtonColor: "#67BF11 ",
          //     confirmButtonText: "Si",
          //     cancelButtonText: "No",
          //     closeOnConfirm: true,
          //     closeOnCancel: true
          // },
          //     function (isConfirm) {
          //         if (isConfirm) {
                       $scope.plusNivel();
          //         }else{
          //             $scope.close();
          //         }
          // });
    }

     $scope.guardarNivelMonto = function (data,montoDe, montoA, montoMax){
        $scope.promise = configuradorRepository.postNivelMonto(idContratoOperacion, montoDe, montoA, montoMax, data.numNiveles).then(function (result) {
            if (result.data.length > 0) {
              var dato = result.data[0];
              var tipoGuardado = dato[""];

              if (tipoGuardado == 1){
                  alertFactory.success('Se guardó su nivel exitosamente.');

                  data.isNew = false;
              }else if(tipoGuardado == 2){
                  alertFactory.success('Se actualizó su nivel exitosamente.');
              }
            }
        }, function (error) {
            alertFactory.error('No se pudo guardar su nivel de aprobación.');
        });

    };

    $scope.delNivelArray = function(nivel){
        var nivelesTemp =  $scope.niveles;
        $scope.niveles = [];
        $scope.numNiveles -= 1;
        angular.forEach(nivelesTemp, function(item){
            if (item.ID != nivel.ID){
                $scope.niveles.push(item);
            }
        });
    }

    $scope.eliminarNivelMonto = function (){
        swal({
            title: "Advertencia",
            text: "¿Desea eliminar el último nivel de aprobación? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#67BF11 ",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        },
            function (isConfirm) {
                if (isConfirm) {
                     $scope.eliminarNivelMontoConfirmado();
                }
        });
    }

    $scope.eliminarNivelMontoConfirmado = function (){

        var nivel = $scope.niveles[$scope.numNiveles -1];

        if (nivel.isNew){
            $scope.delNivelArray(nivel);
        }else{
            $scope.promise = configuradorRepository.postEliminaNivelMonto(idContratoOperacion).then(function (result){
                if(result.data.length > 0){

                    var resultado = result.data[0];
                    var valor = resultado[""];

                    if (valor == 0){
                        alertFactory.info(resultado.msg);
                        $scope.delNivelArray(nivel);
                    } else if (valor == 1){
                        alertFactory.success(resultado.msg);
                        $scope.delNivelArray(nivel);
                    }
                }
            }, function (error){
                alertFactory.error('Ocurrio un error al eliminar el nivel.');
            });
        }
    }

     $scope.changePartida = function (data, idTipoUnidad) {
        $scope.promise = configuradorRepository. postNivelPartda(idContratoOperacion, data.idPartida, data.nivel).then(function (result) {

            if (result.data.length > 0) {
               //  alertFactory.success('Se guardo correctamente el nivel');

            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las Operaciones');
        });

    }


    $scope.change_nivelAprobacion = function () {
        $scope.show_nivelMonto = false;
        $scope.show_nivelPartida = false;
        $scope.numNiveles = 0;
        //$scope.disabledTipoNivel = false;

        if ($scope.tipoNivel == 1) {
            $scope.show_nivelMonto = true;
            $scope.niveles = [];
            $scope.plusNivel ();

        }else if ($scope.tipoNivel == 2) {
            $scope.show_nivelPartida = true;
            $scope.numNiveles += 1
            show_nuevaPartida = true
            $scope.getPartidasUnidad();
        }
    }

    $scope.changeDetalle = function (data, detalle) {

      if (data.idCatalogoDetalleModulo == 12 && detalle ) {
            $scope.banAprobacione = true;
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
                    $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle, idOperacion).then(function (result) {
                        if (result.data.length > 0) {
                            $scope.close();
                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la configuración');
                    });
        }
        if($scope.banderaModulo == 4){
            $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle, idOperacion).then(function (result) {
                if (result.data.length > 0) {
                    $scope.close();
                }
            }, function (error) {
                alertFactory.error('No se puede guardar la configuración');
            });
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

            }else{
                alertFactory.info('Porfavor ingrese las fechas');
            }
        }
        if($scope.banderaModulo == 5){
            $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle, idOperacion).then(function (result) {
                if (result.data.length > 0) {
                    if ($scope.banderaidModulo == 19) {
                        $scope.show_nivelesAprobacion=true;
                        $scope.getAprobaciones();
                    }else{
                        $scope.close();
                    }
                }
            }, function (error) {
                alertFactory.error('No se puede guardar la configuración');
            });
            if(($scope.aprobacion != undefined && $scope.aprobacion != "")){
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 4, $scope.aprobacion).then(function (result) {
                        if (result.data.length > 0) {
                            if ($scope.banAprobacione) {
                                $scope.show_nivelesAprobacion=true;
                                $scope.getAprobaciones()
                            }
                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    });

            }else{
                alertFactory.info('Porfavor ingrese una fecha');
            }
        }
        if($scope.banderaModulo == 6){
            $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle, idOperacion).then(function (result) {
                if (result.data.length > 0) {
                    $scope.close();
                }
            }, function (error) {
                alertFactory.error('No se puede guardar la configuración');
            });
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

            }else{
                alertFactory.info('Porfavor ingrese las fechas');
            }
        }
        if($scope.banderaModulo == 7){
            $scope.promise = configuradorRepository.postModuloPorDertalle($scope.banderaidModulo, detalle, idOperacion).then(function (result) {
                if (result.data.length > 0) {
                    $scope.close();
                }
            }, function (error) {
                alertFactory.error('No se puede guardar la configuración');
            });
            if(($scope.porcobrar != undefined && $scope.porcobrar != "")){
                    $scope.promise = configuradorRepository.postFechas(idOperacion, 8, $scope.porcobrar).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    });

                    $scope.promise = configuradorRepository.postFechas(idOperacion, 11, $scope.generada).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    });

                    $scope.promise = configuradorRepository.postFechas(idOperacion, 12, $scope.enviadas).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    });

                    $scope.promise = configuradorRepository.postFechas(idOperacion, 13, $scope.abonadas).then(function (result) {
                        if (result.data.length > 0) {

                        }
                    }, function (error) {
                        alertFactory.error('No se puede guardar la fecha');
                    });

            }else{
                alertFactory.info('Porfavor ingrese una fecha');
            }

        }

	}
});
