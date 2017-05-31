// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 28/03/2016
// -- Description: Cotizacion Controller
// -- Modificó: Mario Mejía
// -- Fecha: 
// -- =============================================
registrationModule.controller('cotizacionController', function($scope, $route, $rootScope, alertFactory, $routeParams, globalFactory, uploadRepository, localStorageService, cotizacionRepository, cotizacionMailRepository, exampleRepo, uploadRepository, consultaCitasRepository, citaRepository, commonService) {

    $scope.numeroOrden = $routeParams.orden;
    $scope.idTaller = '';
    //$scope.idCatalogoTipoOrdenServicio = 0;
    $scope.lstPartidaSeleccionada = [];
    $scope.mostrarTalleres = true;
    $scope.mostrarPartida = false;
    $scope.idTipoCita = 0;
    $scope.init = function() {
        $scope.getTipoOrdenesServicio()
        $scope.mostrarTalleres = true;
        $scope.mostrarPartida = false;
        //$scope.getTalleres();
        $scope.getOrdenDetalle(1, $scope.numeroOrden);
    }

    $scope.getTipoOrdenesServicio = function() {
        citaRepository.getTipoOrdenesServicio().then(function(result) {
            $scope.tipoCita = result.data;
        });
    };
    $scope.seleccionarTipoCotizacion = function(obj){
        console.log(obj)
        $scope.idTipoCita = obj.idTipoCita;
        //$scope.idCatalogoTipoOrdenServicio = obj.idCatalogoTipoOrdenServicio
        $scope.getTalleres()
        $scope.limpiarParametros()
    }

    $scope.getTalleres = function() {
        $('#loadModal').modal('show');
        $('.dataTableTalleres').DataTable().destroy();
        $scope.promise = consultaCitasRepository.getTalleres().then(function(result) {
            if (result.data.length > 0) {
                $scope.totalOrdenes = result.data;
                globalFactory.minMinDrawDocument("dataTableTalleres", "Talleres");
            }
            $('#loadModal').modal('hide');
        }, function(error) {
            alertFactory.error('No se puenen obtener las órdenes');
            $('#loadModal').modal('hide');
        });
    }

    $scope.getOrdenDetalle = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenDetalle(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleOrden = result.data[0];
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los detalles de la orden');
        });
    }

    $scope.seleccionarTaller = function(obj) {
        $scope.limpiarParametros();
        $scope.datosTaller = obj;
        $scope.getPartidasTaller(obj.idTaller)
        $scope.mostrarTalleres = false;
        $scope.mostrarPartida = true;

    }

    $scope.limpiarParametros = function() {
        $scope.lstPartidaSeleccionada = [];
        $scope.partidasTaller = [];
        $scope.subTotal = 0;
        $scope.ivaSubTotal = 0;
        $scope.total = 0;
        $scope.mostrarTalleres = true;
        $scope.mostrarPartida = false;
        $('.dataTablePartidasSeleccionadas').DataTable().destroy();
    }

    $scope.getPartidasTaller = function(idTaller) {
        $('#loadModal').modal('show');
        $scope.idTaller = idTaller;
        $('.dataTablePartidasTalleres').DataTable().destroy();
        consultaCitasRepository.getPartidasTaller(idTaller).then(function(result) {
            if (result.data.length > 0) {
                $scope.partidasTaller = result.data;
                globalFactory.minMinDrawDocument("dataTablePartidasTalleres", "PartidasTalleres");

            }
            $('#loadModal').modal('hide');
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('No se puenen obtener las órdenes');
        });

    }

    $scope.partidaSeleccionada = function(obj) {
        $scope.objeto = obj
        var existe = 0;
        var noExiste = 0;
        $scope.subTotal = 0;
        $scope.ivaSubTotal = 0;
        $scope.total = 0;
        if ($scope.lstPartidaSeleccionada.length == 0) {
            $scope.lstPartidaSeleccionada.push({
                idPartida: $scope.objeto.idPartida,
                cantidad: 1,
                descripcion : $scope.objeto.descripcion,
                precioUnitario: $scope.objeto.precio
            });
        } else {
            for (var i = 0; i < $scope.lstPartidaSeleccionada.length; i++) {
                if ($scope.lstPartidaSeleccionada[i].idPartida != $scope.objeto.idPartida) {
                    noExiste += 1;
                } else {
                    $scope.lstPartidaSeleccionada[i].cantidad += 1
                    existe += 1;
                }
            }
            if (existe == 0) {
                $scope.lstPartidaSeleccionada.push({
                    idPartida: $scope.objeto.idPartida,
                    cantidad: 1,
                    descripcion : $scope.objeto.descripcion,
                    precioUnitario: $scope.objeto.precio
                });
            }
        }
        $scope.sumatoriaTotal();
    }

    $scope.slideDown = function() {
        $("#borderTop").slideDown(2000);
    };
    //contrae el div de las tablas
    $scope.slideUp = function() {
        $("#borderTop").slideUp(3000);
    };

    $scope.nuevaCotizacion = function() {
        console.log( $scope.idTipoCita)
        $('#loadModal').modal('show');
        cotizacionRepository.insCotizacionNueva($scope.idTaller, 2, 1, $scope.numeroOrden, $scope.idTipoCita).then(function(result) {
            if (result.data[0].idCotizacion > 0) {
                $scope.idCotizacion = result.data[0].idCotizacion;
                $scope.lstPartidaSeleccionada.forEach(function(detalleCotizacion) {
                    cotizacionRepository.inCotizacionDetalle($scope.idCotizacion, detalleCotizacion.precioUnitario, detalleCotizacion.cantidad, 0, detalleCotizacion.idPartida, 1).then(function(nuevos) {
                        if (nuevos.data[0].idCotizacionDetalle > 0) {} else {
                            console.log('Error al Guardar')
                        }
                    });
                });
                alertFactory.success('se creo nueva cotización');
                $scope.limpiarParametros();
                $('#loadModal').modal('hide');
                location.href = '/detalle?orden=' + $scope.numeroOrden;
            } else {
                $('#loadModal').modal('hide');
                alertFactory.error('No se pudo crear cotización');
                $scope.limpiarParametros();

            }
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('No se pudo crear cotización');
            $scope.limpiarParametros();
        });
    }

    $scope.sumatoriaTotal = function() {
        $scope.total = 0;
        $scope.subTotal = 0;
        $scope.ivaSubTotal = 0;
        for (var h = 0; h < $scope.lstPartidaSeleccionada.length; h++) {
            $scope.subTotal += $scope.lstPartidaSeleccionada[h].cantidad * $scope.lstPartidaSeleccionada[h].precioUnitario
        }
        $scope.ivaSubTotal += $scope.subTotal * 0.16
        $scope.total += $scope.subTotal + $scope.ivaSubTotal
    }

    $scope.agregarItem = function(obj) {
        for (var h = 0; h < $scope.lstPartidaSeleccionada.length; h++) {
            if ($scope.lstPartidaSeleccionada[h].idPartida == obj.idPartida) {
                $scope.lstPartidaSeleccionada.slice(h, 1, $scope.lstPartidaSeleccionada[h].cantidad += 1)
            }
        }
        $scope.sumatoriaTotal();
    }

    $scope.quitarItem = function(obj) {
        for (var h = 0; h < $scope.lstPartidaSeleccionada.length; h++) {
            if ($scope.lstPartidaSeleccionada[h].idPartida == obj.idPartida) {
                $scope.posicion = h
                if ($scope.lstPartidaSeleccionada[h].cantidad <= 1) {
                    // $scope.eliminar();
                    // setTimeout(function () {
                    // console.log($scope.respuesta)
                    // if ($scope.respuesta == 1) {                    
                        $scope.lstPartidaSeleccionada.splice((h), 1)
                        $scope.sumatoriaTotal();
                    // }
                    // }, 2000);
                } else {
                    $scope.lstPartidaSeleccionada.slice(h, 1, $scope.lstPartidaSeleccionada[h].cantidad -= 1)
                    $scope.sumatoriaTotal();
                }
            }
        }
    }
    $scope.eliminar = function() {
        swal({
            title: "¿Quieres eliminar la partida?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Si",
            closeOnConfirm: false
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.respuesta = 1
                    // break;
                swal("Exito!", "Registro Eliminado", "success");
            } else {
                swal("Cancelado", "Se cancelo eliminación", "error");
                $scope.respuesta = 2
            }
        });
    }

    $scope.mostrarDetallesPartida = function(obj) {

    }

});
