registrationModule.controller('partidas_controller', function($scope, $modalInstance, $modal, $http, $sce, $window, idtaller, especialidades, partidas, idCotizacion, infoBusqueda, callback, error, ordenServicioRepository, alertFactory, consultaCitasRepository, globalFactory, userFactory) {
    $scope.idTaller = idtaller;
    $scope.especialidades = especialidades;
    $scope.lstPartidaSeleccionada = partidas;
    $scope.idCotizacion = idCotizacion;
    $scope.btnSwitch = {};
    $scope.btnSwitch.classCosto = 'btn btn-success';
    $scope.btnSwitch.showCostoVenta = true;
    $scope.btnSwitch.classVenta = 'btn btn-default';
    $scope.detalleBusqueda = infoBusqueda;
    $scope.init = function() {
        $scope.userData = userFactory.getUserData();
        $scope.permisosUsuario();
        if ($scope.lstPartidaSeleccionada.length > 0) {
            $scope.sumatoriaTotal();
        }

        var partidas = [];
        consultaCitasRepository.getPartidasTaller($scope.idTaller, $scope.especialidades, $scope.userData.contratoOperacionSeleccionada).then(function(result) {
            if (result.data.length > 0) {
                $scope.partidasTaller = result.data;

                globalFactory.filtrosTabla("partidas", "Partidas Talleres", 100);
                setTimeout(function() {
                    $('[data-toggle="popover"]').popover({
                        html: true
                    });
                }, 100);
            }
        }, function(error) {
            alertFactory.error('No se puenen obtener las órdenes');
        });
    };
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.permisosUsuario = function() {
        switch ($scope.userData.idRol) {
            case 1:
                $scope.btnSwitch.showCostoVenta = false;
                $scope.muestraSwitch = false;
                break;
            case 2:
                $scope.btnSwitch.showCostoVenta = true;
                $scope.muestraSwitch = true;
                break;
            case 3:
                $scope.btnSwitch.showCostoVenta = true;
                $scope.muestraSwitch = true;
                break;
            case 4:
                $scope.btnSwitch.showCostoVenta = true;
                $scope.muestraSwitch = false;
                break;

        }
    };

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
                partida: $scope.objeto.partida,
                noParte: $scope.objeto.noParte,
                cantidad: 1,
                descripcion: $scope.objeto.descripcion,
                costo: $scope.objeto.costo,
                venta: $scope.objeto.venta,
                idEstatusPartida: 1
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
                    partida: $scope.objeto.partida,
                    noParte: $scope.objeto.noParte,
                    cantidad: 1,
                    descripcion: $scope.objeto.descripcion,
                    costo: $scope.objeto.costo,
                    venta: $scope.objeto.venta,
                    idEstatusPartida: 1
                });
            }
        }
        $scope.sumatoriaTotal();
        setTimeout(function() {
            $('[data-toggle="popover"]').popover({
                html: true
            });
        }, 100);
    };
    $scope.sumatoriaTotal = function() {
        $scope.subTotalPrecio = 0;
        $scope.subTotalCosto = 0;
        $scope.ivaSubTotalPrecio = 0;
        $scope.ivaSubTotalCosto = 0;
        $scope.totalPrecio = 0;
        $scope.totalCosto = 0;
        for (var h = 0; h < $scope.lstPartidaSeleccionada.length; h++) {
            $scope.subTotalPrecio += $scope.lstPartidaSeleccionada[h].cantidad * $scope.lstPartidaSeleccionada[h].venta;
            $scope.subTotalCosto += $scope.lstPartidaSeleccionada[h].cantidad * $scope.lstPartidaSeleccionada[h].costo;
        }
        $scope.ivaSubTotalPrecio += $scope.subTotalPrecio * 0.16;
        $scope.ivaSubTotalCosto += $scope.subTotalCosto * 0.16;
        $scope.totalPrecio += $scope.subTotalPrecio + $scope.ivaSubTotalPrecio;
        $scope.totalCosto += $scope.subTotalCosto + $scope.ivaSubTotalCosto;
    };
    $scope.agregarItem = function(obj) {
        for (var h = 0; h < $scope.lstPartidaSeleccionada.length; h++) {
            if ($scope.lstPartidaSeleccionada[h].idPartida == obj.idPartida) {
                $scope.lstPartidaSeleccionada.slice(h, 1, $scope.lstPartidaSeleccionada[h].cantidad += 1)
            }
        }
        $scope.sumatoriaTotal();
    };
    $scope.quitarItem = function(obj) {
        for (var h = 0; h < $scope.lstPartidaSeleccionada.length; h++) {
            if ($scope.lstPartidaSeleccionada[h].idPartida == obj.idPartida) {
                $scope.posicion = h
                if ($scope.lstPartidaSeleccionada[h].cantidad <= 1) {
                    if ($scope.idCotizacion == undefined) {
                        $scope.lstPartidaSeleccionada.splice((h), 1)
                        $scope.sumatoriaTotal();
                    } else {
                        $scope.lstPartidaSeleccionada[h].idEstatusPartida = 3;
                        $scope.lstPartidaSeleccionada[h].cantidad = 0;
                        $scope.lstPartidaSeleccionada[h].precioUnitario = 0;
                        $scope.lstPartidaSeleccionada[h].costoUnitario = 0;
                        $scope.sumatoriaTotal();
                    }
                } else {
                    $scope.lstPartidaSeleccionada.slice(h, 1, $scope.lstPartidaSeleccionada[h].cantidad -= 1)
                    $scope.sumatoriaTotal();
                }
            }
        }
    };
    $scope.agregar = function() {
        callback($scope.lstPartidaSeleccionada);
        $scope.close();
    };

});
