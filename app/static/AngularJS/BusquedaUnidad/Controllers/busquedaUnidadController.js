registrationModule.controller('busquedaUnidadController', function($scope, $location, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, userFactory, busquedaUnidadRepository) {
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
        console.log($scope.userData)
        $scope.permisos();
        $scope.permisosUsuario();
        $scope.getDetalleUnidad();
        $scope.getOrdenActual();
        $scope.getHistoricoOrdenes();

    };
    $scope.permisos = function() {
        if ($scope.userData.geolocalizacion == 0) {
            $scope.mostrarMapa = false;
        } else if ($scope.userData.geolocalizacion == 1) {
            $scope.mostrarMapa = true;
            ////////////////////////////////////////////////////////////
            //MAPA
            ///////////////////////////////////////////////////////////
            var mapOptions1 = {
                zoom: 14,
                center: new google.maps.LatLng(19.3269503, -99.2138245)
                    // Style for Google Maps
                    //styles: [{ "featureType": "water", "stylers": [{ "saturation": 43 }, { "lightness": -11 }, { "hue": "#0088ff" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "saturation": -100 }, { "lightness": 99 }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#808080" }, { "lightness": 54 }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "color": "#ece2d9" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#ccdca1" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#767676" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "color": "#b8cb93" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.sports_complex", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.medical", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "simplified" }] }]
            };
            // Get all html elements for map
            var mapElement1 = document.getElementById('map1');
            // Create the Google Map using elements
            var map1 = new google.maps.Map(mapElement1, mapOptions1);

            ////////////////////////////////////////////////////////////
            //MAPA
            ///////////////////////////////////////////////////////////
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
            console.log($scope.detalleUnidad, 'Soy el detalle de la unidad')
        });
    };
    $scope.btnAgendarCita = function() {
        location.href = '/nuevacita?economico=' + $routeParams.economico+'&tipo=nueva';
    };
    $scope.getOrdenActual = function() {
        busquedaUnidadRepository.getOrdenActual($scope.idUsuario, $routeParams.economico).then(function(result) {
            $scope.ordendesActual = result.data;
            //globalFactory.filtrosTabla("ordenActual", "Ordenes Actuales", 5);
            console.log($scope.ordendesActual);
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
        });
    };
    $scope.getHistoricoOrdenes = function() {
        busquedaUnidadRepository.getHistoricoOrdenes($scope.idUsuario, $routeParams.economico).then(function(result) {
            if (result.data.length >0) {
                $scope.historialOrdenes = result.data;
                console.log($scope.historialOrdenes,'Soy el historial de las ordenes ')
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
