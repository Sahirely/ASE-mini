registrationModule.controller('preordenCotizacionController', function($scope, $route, $modal, $rootScope, $routeParams, localStorageService, alertFactory, globalFactory, userFactory, citaRepository, busquedaUnidadRepository, preordenCotizacionRepository, cotizacionRepository, commonFunctionRepository) {
    //*****************************************************************************************************************//
    //SE INICIALIZAN VARIABLES
    //*****************************************************************************************************************//
    $scope.idCotizacion = $routeParams.idCotizacion;
    $scope.numeroOrden = $routeParams.orden;
    $scope.cotizaciones = [];
    $scope.talleres = [];
    $scope.cotizacionesSeleccionadas = [];


    $scope.init = function() {
        userFactory.ValidaSesion();
        $('#loadModal').modal('show');
        $scope.userData = userFactory.getUserData();
        $scope.idUsuario = $scope.userData.idUsuario;
        $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
        $scope.getTipoUnidad($scope.idCotizacion);
        $scope.talleres = [];
    };

    var error = function() {
        alertFactory.error('Ocurrio un Error');
    };

    $scope.getTipoUnidad = function(idCotizacion) {
        preordenCotizacionRepository.getTipoUnidadByCotizacion(idCotizacion).then(function(result) {
            var idTipoUnidad = result.data[0].idTipoUnidad;
            $scope.getMostrarCotizacion($scope.idCotizacion);
            $scope.getMostrarTalleres($scope.idUsuario, $scope.idContratoOperacion, idTipoUnidad);
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('Ocurrio un error.');
        });
    }
    $scope.openPDF = function(str) {
        window.open(str, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
    }
    $scope.getMostrarCotizacion = function(idCotizacion) {
        preordenCotizacionRepository.getCotizacion(idCotizacion).then(function(result) {

            if (result.data.length > 0) {
                $scope.cotizaciones = result.data;
                var resCotizaciones = result.data;
                resCotizaciones.forEach(function(item, key) {
                    resCotizaciones[key].idTallertmp = 0;
                });
                $scope.cotizaciones = resCotizaciones;
            } else {
                alertFactory.info('No tiene partidas esta preorden');
                location.href = '/detalle?orden=' + $scope.numeroOrden;
            }
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('Ocurrio un error');
        });
    };

    $scope.getMostrarTalleres = function(idUsuario, idContratoOperacion, idTipoUnidad) {
        preordenCotizacionRepository.getTalleres(idUsuario, idContratoOperacion, idTipoUnidad).then(function(result) {
            if (result.data.length > 0) {

                $scope.talleres = result.data;
                globalFactory.filtrosTabla("proveedoresTable", "Talleres", 5);
                $('#loadModal').modal('hide');

                // var resTalleres = result.data;
                // resTalleres.forEach(function(item, key) {
                //     resTalleres[key].partidas = JSON.parse($scope.talleres[key].partidas);
                // });
                // $scope.talleres = resTalleres;

            } else

            {
                $scope.talleres = [];
                globalFactory.filtrosTabla("proveedoresTable", "Talleres", 5);
                $('#loadModal').modal('hide');
                alertFactory.info('El usuario no tiene talleres asignados');
            }

        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('Ocurrio un error.');
        });


    };

    $scope.selectTaller = function(tallerSel) {
        $scope.tallerSeleccionado = tallerSel;
    }

    $scope.seleccionaPartidas = function() {
        $scope.cotizaciones.forEach(function(item) {
            item.idTallertmp = 0;
        });
        if ($scope.tallerSeleccionado == undefined) {
            alertFactory.info('No ha seleccionado ningun proveedor');
        } else {
            // var intTallerSeleccionado = JSON.parse($scope.tallerSeleccionado[0]);
            // $scope.tallerSeleccionado = JSON.parse($scope.tallerSeleccionado);
            // $scope.idZonaSeleccionado = intTallerSeleccionado[1];

            // preordenCotizacionRepository.getPartidasTaller($scope.tallerSeleccionado.idTaller, $scope.idCotizacion).then(function(result){
            //     if(result.data.length > 0){
            //         var partidasTaller = result.data;
            //         var resCotizaciones = $scope.cotizaciones;
            //         var contPartidasEncontradas = 0;
            //
            //         for (var i = 0; i < resCotizaciones.length; i++) {
            //
            //             for (var j = 0; j < partidasTaller.length; j++) {
            //                 if (partidasTaller[j].idPartida == resCotizaciones[i].idPartida) {
            //                     resCotizaciones[i].idTallertmp = parseInt($scope.tallerSeleccionado.idTaller);
            //                     contPartidasEncontradas ++;
            //                 }
            //             }
            //         }
            //
            //         $scope.cotizaciones = resCotizaciones;
            //         if (contPartidasEncontradas == 0){
            //             alertFactory.info('El taller seleccionado no cuenta con las partidas de su preorden.');
            //         }
            //     }else {
            //       alertFactory.info('El taller Seleccionado no cuenta con partidas para su unidad.');
            //     }
            // },function(error){
            //     alertFactory.error(error);
            // });

            // FAL preordenCotizacionRepository.getPartidasTaller($scope.tallerSeleccionado.idTaller, $scope.idCotizacion).then(function(result){
            //     if(result.data.length > 0){
            //         var partidasTaller = result.data;
            //         var resCotizaciones = $scope.cotizaciones;
            //         var contPartidasEncontradas = 0;
            //
            //         for (var i = 0; i < resCotizaciones.length; i++) {
            //
            //             for (var j = 0; j < partidasTaller.length; j++) {
            //                 if (partidasTaller[j].idPartida == resCotizaciones[i].idPartida) {
            //                     resCotizaciones[i].idTallertmp = parseInt($scope.tallerSeleccionado.idTaller);
            //                     contPartidasEncontradas ++;
            //                 }
            //             }
            //         }
            //
            //         $scope.cotizaciones = resCotizaciones;
            //         if (contPartidasEncontradas == 0){
            //             alertFactory.info('El taller seleccionado no cuenta con las partidas de su preorden.');
            //         }
            //     }else {
            //       alertFactory.info('El taller Seleccionado no cuenta con partidas para su unidad.');
            //     }
            // },function(error){
            //     alertFactory.error(error);
            // });


            $scope.cotizaciones.forEach(function(item) {
                item.idTallertmp = parseInt($scope.tallerSeleccionado.idTaller);
            });


        }


    };



    $scope.agregaTalleres = function() {
        $scope.cotizacionesSeleccionadas = [];
        var intTallerSeleccionado = $scope.tallerSeleccionado
        var resCotizaciones = $scope.cotizaciones;
        resCotizaciones.forEach(function(item, key) {
            if (resCotizaciones[key].idTallertmp != 0 && resCotizaciones[key].idTallertmp != 'Q') {
                $scope.cotizacionesSeleccionadas.push(item);

            }
        });
        var rescotisel = $scope.cotizacionesSeleccionadas;
        rescotisel.forEach(function(item, key) {

            rescotisel[key].nombreComercial = $scope.tallerSeleccionado.nombreComercial;

        });
        $scope.cotizacionesSeleccionadas = rescotisel;
    };


    $scope.partidaQuitar = function(partida) {

        var intTallerSeleccionado = $scope.tallerSeleccionado;
        var resCotizaciones = $scope.cotizaciones;
        resCotizaciones.forEach(function(item, key) {

            if (resCotizaciones[key].idPartida == partida.idPartida) {
                resCotizaciones[key].idTallertmp = 'Q';
            }

        });
        $scope.cotizaciones = resCotizaciones;
    };

    $scope.partidaAgregar = function(partida) {

        $scope.cotizaciones.forEach(function(item, key) {
            if (item.idPartida == partida.idPartida) {
                item.idTallertmp = $scope.tallerSeleccionado.idTaller;
            }
        });
    }

    $scope.irpreordenCotizacion = function() {
        $scope.class_buttonNuevaCotizacion = 'fa fa-spinner fa-spin';
        location.href = '/preordenCotizacion?idCotizacion=' + $scope.idCotizacion + '&orden=' + $scope.numeroOrden;
    }

    $scope.guardaFactura = function() {
        //LQMA 15072017 begin
        $('#loadModal').modal('show');
        var partidas = '';
        angular.forEach($scope.cotizacionesSeleccionadas, function(value, key) {
            partidas = partidas + ',' + $scope.cotizacionesSeleccionadas[key].idPartida
        });

        partidas = partidas.substring(1, partidas.length)
            //LQMA 15072017 end

        preordenCotizacionRepository.getGuardarCotizacion($scope.idCotizacion, $scope.idUsuario, $scope.tallerSeleccionado.idTaller, partidas, $scope.tallerSeleccionado.idZona).then(function(result) {
            var hasDM = false;
            angular.forEach($scope.userData.Modulos, function(modulo) {
                if (modulo.idCatalogoModulo == 4) {
                    angular.forEach(modulo.detalle, function(detalleModulo, key) {
                        if (detalleModulo.idCatalogoDetalleModulo == 6) {
                            hasDM = true;
                        }
                    });
                }
            });

            if (hasDM) {
                if (result.data.length > 0) {
                    $scope.idOrden = result.data[0].idOrden;
                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function(resp) {
                        if (resp.data.length > 0) {
                            var correoDe = resp.data[0].correoDe;
                            var correoPara = resp.data[0].correoPara;
                            var asunto = resp.data[0].asunto;
                            var texto = resp.data[0].texto;
                            var bodyhtml = resp.data[0].bodyhtml;
                            commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function(result) {
                                if (result.data.length > 0) {}
                            }, function(error) {
                                // alertFactory.error('No se puede enviar el correo');
                            });
                        }
                    }, function(error) {
                        // alertFactory.error("Error al obtener información para el mail");
                    });

                }
            }

            $('#loadModal').modal('hide');
            location.href = '/preordenCotizacion?idCotizacion=' + $scope.idCotizacion + '&orden=' + $scope.numeroOrden;


        });
    }

    $scope.cancelarPartida = function(partida) {
        swal({
            title: '¿Esta seguró de cancelar la partida?',
            text: "se cancelará la partida " + partida.partida + " de la PreOrden.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
        }, function(isConfirm) {
            if (isConfirm) {
                preordenCotizacionRepository.cancelaPartidaPreorden($scope.idCotizacion, partida.idPartida).then(function(result) {
                    if (result.data.length > 0) {
                        alertFactory.info(result.data[0].msg);
                    }
                    $scope.init();
                }, function(error) {
                    alertFactory.error('Ocurrio un error');
                });
            }
        });

    }


});