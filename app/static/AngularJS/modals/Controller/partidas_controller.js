registrationModule.controller('partidas_controller', function($scope, $modalInstance, $modal, $http, $sce, $window, idtaller, especialidades, callback, error, ordenServicioRepository, alertFactory, consultaCitasRepository, globalFactory) {
    $scope.idTaller = idtaller;
    $scope.especialidades = especialidades;
    $scope.lstPartidaSeleccionada = [];
    $scope.init = function() {
        console.log($scope.especialidades, 'Soy las especialidades')
        consultaCitasRepository.getPartidasTaller($scope.idTaller, $scope.especialidades).then(function(result) {
            if (result.data.length > 0) {
                $scope.partidasTaller = result.data;
                console.log($scope.partidasTaller, 'Somos las partidas de los tallesres')
                globalFactory.filtrosTabla("partidas", "Partidas Talleres", 5);

            }
        }, function(error) {
            alertFactory.error('No se puenen obtener las órdenes');
        });
    };
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
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
                numPartida: $scope.objeto.noParte,
                cantidad: 1,
                descripcion: $scope.objeto.descripcion,
                costoUnitario: $scope.objeto.costo,
                precioUnitario: $scope.objeto.venta
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
                    numPartida: $scope.objeto.noParte,
                    cantidad: 1,
                    descripcion: $scope.objeto.descripcion,
                    costoUnitario: $scope.objeto.costo,
                    precioUnitario: $scope.objeto.venta
                });
            }
        }
        $scope.sumatoriaTotal();
    };
    $scope.sumatoriaTotal = function() {
        $scope.subTotalPrecio = 0;
        $scope.subTotalCosto = 0;
        $scope.ivaSubTotalPrecio = 0;
        $scope.ivaSubTotalCosto = 0;
        $scope.totalPrecio = 0;
        $scope.totalCosto = 0;
        for (var h = 0; h < $scope.lstPartidaSeleccionada.length; h++) {
            $scope.subTotalPrecio += $scope.lstPartidaSeleccionada[h].cantidad * $scope.lstPartidaSeleccionada[h].precioUnitario;
            $scope.subTotalCosto += $scope.lstPartidaSeleccionada[h].cantidad * $scope.lstPartidaSeleccionada[h].costoUnitario;
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
                    $scope.lstPartidaSeleccionada.splice((h), 1)
                    $scope.sumatoriaTotal();
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
