registrationModule.controller('preordenCotizacionController', function($scope, $route, $modal, $rootScope, $routeParams, localStorageService, alertFactory, globalFactory, userFactory, citaRepository, busquedaUnidadRepository, preordenCotizacionRepository, cotizacionRepository, commonFunctionRepository) {
    //*****************************************************************************************************************//
    //SE INICIALIZAN VARIABLES
    //*****************************************************************************************************************//
    $scope.idCotizacion = $routeParams.idCotizacion;
    $scope.cotizaciones = [];
    $scope.talleres = [];
    $scope.cotizacionesSeleccionadas = [];


    $scope.init = function() {
        userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        $scope.idUsuario = $scope.userData.idUsuario;
        $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
        $scope.getMostrarCotizacion($scope.idCotizacion, $scope.idContratoOperacion);
        $scope.getMostrarTalleres($scope.idUsuario, $scope.idContratoOperacion);
        $scope.talleres = [];
    };

    var error = function() {
        alertFactory.error('Ocurrio un Error');
    };

    $scope.getMostrarCotizacion = function(idCotizacion, idContratoOperacion) {
        preordenCotizacionRepository.getCotizacion(idCotizacion, idContratoOperacion).then(function(result) {

            if (result.data.length > 0) {
                $scope.cotizaciones = result.data;
                var resCotizaciones = result.data;
                resCotizaciones.forEach(function(item, key) {
                    resCotizaciones[key].idTallertmp = 0;
                });
                $scope.cotizaciones = resCotizaciones;
            } else {
                alertFactory.error('No tiene partidas esta preorden');
            }
        }, function(error) {
            alertFactory.error(result.msg);
        });
    };

    $scope.getMostrarTalleres = function(idUsuario, idContratoOperacion) {
        preordenCotizacionRepository.getTalleres(idUsuario, idContratoOperacion).then(function(result) {

            if (result.data.length > 0) {

                $scope.talleres = result.data;

                var resTalleres = result.data;
                resTalleres.forEach(function(item, key) {
                    resTalleres[key].partidas = JSON.parse($scope.talleres[key].partidas);
                });
                $scope.talleres = resTalleres;

            } else

            {
                alertFactory.error('El usuario no tiene talleres asignados');
            }

        }, function(error) {
            alertFactory.error(result.msg);
        });


    };

    $scope.seleccionaPartidas = function() {

        if ($scope.tallerSeleccionado == undefined) {
            alertFactory.error('No ha seleccionado ningun proveedor');
        } else {
            // var intTallerSeleccionado = JSON.parse($scope.tallerSeleccionado[0]);
            $scope.tallerSeleccionado = JSON.parse($scope.tallerSeleccionado);
            // $scope.idZonaSeleccionado = intTallerSeleccionado[1];
            var partidasTaller = $scope.tallerSeleccionado.partidas;
            var resCotizaciones = $scope.cotizaciones;


            for (var i = 0; i < resCotizaciones.length; i++) {

                for (var j = 0; j < partidasTaller.length; j++) {
                    if (partidasTaller[j].idPartida == resCotizaciones[i].idPartida) {
                        resCotizaciones[i].idTallertmp = parseInt($scope.tallerSeleccionado.idTaller);
                    }
                }
            }

            $scope.cotizaciones = resCotizaciones;
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

        var intTallerSeleccionado = $scope.tallerSeleccionado
        var resCotizaciones = $scope.cotizaciones;
        resCotizaciones.forEach(function(item, key) {

            if (resCotizaciones[key].idPartida == partida.idPartida) {
                resCotizaciones[key].idTallertmp = 'Q';
            }

        });
        $scope.cotizaciones = resCotizaciones;
    };

    $scope.irpreordenCotizacion = function() {
        $scope.class_buttonNuevaCotizacion = 'fa fa-spinner fa-spin';
        location.href = '/preordenCotizacion?idCotizacion=' + $scope.idCotizacion;
    }

    $scope.guardaFactura = function() {
        //LQMA 15072017 begin
        var partidas = '';
        angular.forEach($scope.cotizacionesSeleccionadas, function(value, key) {
            partidas = partidas + ',' + $scope.cotizacionesSeleccionadas[key].idPartida
        });

        partidas = partidas.substring(1, partidas.length)
        //LQMA 15072017 end

        preordenCotizacionRepository.getGuardarCotizacion($scope.idCotizacion, $scope.idUsuario, $scope.tallerSeleccionado.idTaller, partidas, $scope.tallerSeleccionado.idZona).then(function(result) {

            location.href = '/preordenCotizacion?idCotizacion=' + $scope.idCotizacion;


        });
    }


});