// -- =============================================
// -- Author:      Uriel Godínez Martínez
// -- Create date: 28/03/2016
// -- Description: Cotizacion Controller
// -- Modificó: Mario Mejía
// -- Fecha: 
// -- =============================================
registrationModule.controller('cotizacionController', function($scope, $route, $rootScope, alertFactory, $routeParams, globalFactory, uploadRepository, localStorageService, cotizacionRepository, cotizacionMailRepository, exampleRepo, uploadRepository, consultaCitasRepository, citaRepository, commonService) {

    $scope.numeroOrden = $routeParams.orden;
    $scope.numeroOrden = $routeParams.orden;
    $scope.idTaller = '';
    $scope.lstPartidaSeleccionada = [];
    $scope.init = function() {

        $scope.getTalleres();
        $scope.getOrdenDetalle(1, $scope.numeroOrden);
    }

    $scope.getTalleres = function() {
        $('.dataTableTalleres').DataTable().destroy();
        $scope.promise = consultaCitasRepository.getTalleres().then(function(result) {
            if (result.data.length > 0) {
                $scope.totalOrdenes = result.data;
                globalFactory.minMinDrawDocument("dataTableTalleres", "Talleres");
            }
        }, function(error) {
            alertFactory.error('No se puenen obtener las órdenes');
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
        $scope.datosTaller = obj;
        $scope.getPartidasTaller(obj.idTaller)
        $scope.lstPartidaSeleccionada = [];
        $scope.subTotal = 0;
        $scope.ivaSubTotal = 0;
        $scope.total = 0;
        $('.dataTablePartidasSeleccionadas').DataTable().destroy();
    }

    $scope.getPartidasTaller = function(idTaller) {
        $scope.idTaller = idTaller;
        $('.dataTablePartidasTalleres').DataTable().destroy();
        consultaCitasRepository.getPartidasTaller(idTaller).then(function(result) {
            if (result.data.length > 0) {
                $scope.partidasTaller = result.data;
                globalFactory.minDrawDocument("dataTablePartidasTalleres", "PartidasTalleres");
            }
        }, function(error) {
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
                    precioUnitario: $scope.objeto.precio
                });
            }
        }
        for (var h = 0; h < $scope.lstPartidaSeleccionada.length; h++) {
            $scope.subTotal += $scope.lstPartidaSeleccionada[h].cantidad * $scope.lstPartidaSeleccionada[h].precioUnitario
        }
        $scope.ivaSubTotal += $scope.subTotal * 0.16
        $scope.total += $scope.subTotal + $scope.ivaSubTotal
    }

    $scope.slideDown = function() {
        $("#borderTop").slideDown(2000);
    };
    //contrae el div de las tablas
    $scope.slideUp = function() {
        $("#borderTop").slideUp(3000);
    };

    $scope.nuevaCotizacion = function() {
        console.log('nueva ' + $scope.idTaller , ' ', $scope.numeroOrden)
        cotizacionRepository.insCotizacionNueva($scope.idTaller, 2, 1, $scope.numeroOrden).then(function(result) {
            if (result.data[0].idCotizacion > 0) {
                console.log(result.data[0].idCotizacion + ' nuevaaa' +result.data[0].mensaje)
                console.log('dentro de nueva ' + $scope.idTaller + ' '+ $scope.numeroOrden)
                $scope.idCotizacion = result.data[0].idCotizacion;
                $scope.lstPartidaSeleccionada.forEach(function(detalleCotizacion) {
                    cotizacionRepository.inCotizacionDetalle($scope.idCotizacion, detalleCotizacion.precioUnitario, detalleCotizacion.cantidad, 0, detalleCotizacion.idPartida, 1).then(function(nuevos) {
                        if (nuevos.data[0].idCotizacionDetalle > 0) {
                            console.log(nuevos.data[0].idCotizacionDetalle+'Se guardo bien ' + nuevos.data[0].mensaje)
                        } else {
                            console.log('Error al Guardar')
                        }
                    });
                });
            }
        });
    }

});
