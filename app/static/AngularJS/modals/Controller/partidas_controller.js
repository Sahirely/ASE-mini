registrationModule.controller('partidas_controller', function($scope, $modalInstance, $modal, $http, $sce, $window, idtaller, ordenServicioRepository, alertFactory, consultaCitasRepository, globalFactory) {
    $scope.idTaller = idtaller;
    $scope.lstPartidaSeleccionada = [];
    $scope.init = function() {

        consultaCitasRepository.getPartidasTaller($scope.idTaller).then(function(result) {
            if (result.data.length > 0) {
                $scope.partidasTaller = result.data;
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
                cantidad: 1,
                descripcion: $scope.objeto.descripcion,
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
                    descripcion: $scope.objeto.descripcion,
                    precioUnitario: $scope.objeto.precio
                });
            }
        }
        $scope.sumatoriaTotal();
    };
    $scope.sumatoriaTotal = function() {
        $scope.total = 0;
        $scope.subTotal = 0;
        $scope.ivaSubTotal = 0;
        for (var h = 0; h < $scope.lstPartidaSeleccionada.length; h++) {
            $scope.subTotal += $scope.lstPartidaSeleccionada[h].cantidad * $scope.lstPartidaSeleccionada[h].precioUnitario
        }
        $scope.ivaSubTotal += $scope.subTotal * 0.16
        $scope.total += $scope.subTotal + $scope.ivaSubTotal
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
    }

});
