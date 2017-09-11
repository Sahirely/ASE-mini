registrationModule.controller('busquedaUnidadController', function($scope, $location, $rootScope, $routeParams, MarkerCreatorService, alertFactory, globalFactory, commonService, localStorageService, userFactory, busquedaUnidadRepository) {
    //*****************************************************************************************************************//
    //SE INICIALIZAN VARIABLES
    //*****************************************************************************************************************//
    $scope.muestraCosto = false;
    $scope.muestraPrecio = true;
    $scope.btnSwitch = {};
    $scope.btnSwitch.classCosto = 'btn btn-success';
    $scope.btnSwitch.showCostoVenta = true;
    $scope.btnSwitch.classVenta = 'btn btn-default';
    //Inicializa la pagina
    $scope.init = function() {
        userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        $scope.idUsuario = $scope.userData.idUsuario;
        $scope.map = {};
        $scope.permisos();
        $scope.permisosUsuario();
        $scope.getDetalleUnidad();
        $scope.getOrdenActual();
        $scope.getHistoricoOrdenes();

    };
    $scope.permisos = function() {

        // configuración de coordenadas por default - aquí se cargará la localización real de las unidades
        var gps = {};
        gps.lat = 19.4284700;
        gps.lng = -99.1276600;
        $scope.direccion = 'Ciudad de México';

        ////////////////////////////////////////////////////////////
        //MAPA
        ///////////////////////////////////////////////////////////
        var mapOptions1 = {
            zoom: 15,
            center: gps,
            format: 'png',
            markers: []
          };

        // Get all html elements for map
        var mapElement1 = document.getElementById('map1');
        // Create the Google Map using elements
        var map1 = new google.maps.Map(mapElement1, mapOptions1);
        ////////////////////////////////////////////////////////////
        //MAPA
        ///////////////////////////////////////////////////////////

        if ($scope.userData.geolocalizacion == 1) {
              var contentString = '<div><strong>Dirección</strong> : <p>'+$scope.direccion+'</p></div>';
              var infowindow = new google.maps.InfoWindow({
                       content: contentString,
                       position: gps,
                       map: map1
                     });

              var marker = new google.maps.Marker({
                  position: gps,
                  map: map1
                });

              infowindow.open(map1);
              marker.addListener('click', function() {
                 infowindow.open(map1);
              });
        }

        $scope.mostrarComentarios = false;
        angular.forEach($scope.userData.Modulos, function(value, key) {
            if (value.idCatalogoModulo == 3) {
                $scope.consultaCita = value;
                angular.forEach($scope.consultaCita.detalle, function(value, key) {
                    if (value.idCatalogoDetalleModulo == 7) {
                        $scope.mostrarComentarios = true;
                    }
                });
            }
        });
    };
    var error = function() {
        alertFactory.error('Ocurrio un Error');
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
    $scope.getDetalleUnidad = function() {
        busquedaUnidadRepository.getDetalleUnidad($scope.idUsuario, $routeParams.economico).then(function(result) {
            $scope.detalleUnidad = result.data[0];
        });
    };
    $scope.btnAgendarCita = function() {
        location.href = '/nuevacita?economico=' + $routeParams.economico+'&tipo=nueva';
    };
    $scope.getOrdenActual = function() {
        busquedaUnidadRepository.getOrdenActual($scope.idUsuario, $routeParams.economico, $scope.userData.contratoOperacionSeleccionada).then(function(result) {

            if (result.data.length>0) {
                $scope.ordendesActual = result.data;

                if ($scope.ordendesActual[0].respuesta == 1) {
                    $scope.muestraOrdenActual = true;
                    $scope.agendarCita = true;
                    var contador1 = 0;
                    var contador2 = 0;
                    var contador3 = 0;
                    var contadorTipoOrden = 0;
                    angular.forEach($scope.ordendesActual, function(value, key) {

                        if (value.idTipoOrden == 1) {

                            if (value.idEstatusOrden < 8) {
                                contadorTipoOrden++;
                                contador1++;
                            }
                        }
                        if (value.idTipoOrden == 2) {

                            if (value.idEstatusOrden < 8) {
                                 contadorTipoOrden++;
                                contador3++;
                            }
                        };
                         if (value.idTipoOrden == 3) {

                            if (value.idEstatusOrden < 8) {
                                contadorTipoOrden++;
                                contador2++;
                            }
                        };
                    });

                    if (contadorTipoOrden=3 ) {
                        if (contador1>0 && contador2>0 && contador3>0) {
                            $scope.agendarCita = false;
                        };

                    }
                } else if ($scope.ordendesActual[0].respuesta == 0) {
                    $scope.muestraOrdenActual = false;
                    $scope.agendarCita = true;
                } else {
                    error();
                }
            }else{
                $scope.muestraOrdenActual = false;
                $scope.agendarCita = true;
            }
        });
    };
    $scope.getHistoricoOrdenes = function() {
        busquedaUnidadRepository.getHistoricoOrdenes($scope.idUsuario, $routeParams.economico, $scope.userData.contratoOperacionSeleccionada).then(function(result) {
            if (result.data.length >0) {
                $scope.historialOrdenes = result.data;
                globalFactory.filtrosTabla("historialUnidad", "Historial Unidades", 100);


                if ($scope.historialOrdenes[0].respuesta == 1) {
                    $scope.muestraHistorial = true;
                } else if ($scope.historialOrdenes[0].respuesta == 0) {
                    $scope.muestraHistorial = false;
                } else {
                    error();
                }
            };
        });
    };
    $scope.detalleOrden = function(orden) {
        location.href = '/detalle?orden=' + orden.numeroOrden + '&estatus=' + orden.idEstatusOrden;
    };
});
