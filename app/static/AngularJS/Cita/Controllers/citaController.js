registrationModule.controller('citaController', function($scope, $route, $modal, $rootScope, $routeParams, localStorageService, alertFactory, globalFactory, userFactory, citaRepository, busquedaUnidadRepository, cotizacionConsultaRepository, tallerRepository, cotizacionRepository) {
    //*****************************************************************************************************************//
    //SE INICIALIZAN VARIABLES
    //*****************************************************************************************************************// 
    $scope.mostrarTabla = false;
    $scope.muestraBtnPreOrden = false;
    $scope.idTaller = 0;
    $scope.taller = '';
    $scope.grua = 0;
    $scope.opcionTipoCita = true;
    $scope.opcionEstadoUnidad = true;
    $scope.mostrarAccion = true;
    $scope.tipoDeCita = [];
    $scope.estadoDeUnidad = [];
    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = {};
    $scope.NivelesZona = [];
    $scope.Zonas = [];
    $scope.init = function() {
        $scope.userData = userFactory.getUserData();
        $scope.idUsuario = $scope.userData.idUsuario;
        $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
        $scope.permisos();
        $scope.getDetalleUnidad();
        //para obtener las zonas promero se inicializa la primer zona padre.
        $scope.ZonasSeleccionadas[0] = "0";
        $scope.obtieneNivelZona();
        //--------------------------------------
        $('.clockpicker').clockpicker();
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

    //*****************************************************************************************************************************//
    // Obtiene el detalle de la unidad como marca, modelo, etc
    // Cuando $scope.detalleUnidad.situacionOrden = 1 <-- Significa que la unidad tiene una Orden de Servicio en proceso    
    //                                                    por lo tanto no se puede crear una nueva cita sin embargo si podrá
    //                                                    modificar los datos de la Orden de Servicio
    //        $scope.detalleUnidad.situacionOrden = 0 <-- Significa que la unidad no tiene una Orden de Servicio en proceso
    //                                                    por lo tanto puede crear una nueva ORden de Servicio para la unidad
    //*****************************************************************************************************************************//
    $scope.getDetalleUnidad = function() {
        busquedaUnidadRepository.getDetalleUnidad($scope.idUsuario, $routeParams.economico).then(function(result) {
            $scope.detalleUnidad = result.data[0];
            if ($scope.detalleUnidad.situacionOrden == 1) {
                $scope.muestraAgendarCita = false;
                busquedaUnidadRepository.getDetalleOrden($routeParams.economico).then(function(result) {
                    $scope.detalleOrden = result.data[0];
                    if ($scope.detalleOrden.respuesta == 1) {
                        console.log($scope.detalleOrden, 'Soy el detalle de la orden')
                        $scope.tipoDeCita.idTipoCita = $scope.detalleOrden.idTipoCita;
                        $scope.estadoDeUnidad.idEstadoUnidad = $scope.detalleOrden.idEstadoUnidad;
                        $scope.idTaller = $scope.detalleOrden.idTaller;
                        $scope.zonaSelected = $scope.detalleOrden.idZona;
                        $scope.opcionTipoCita = false;
                        $scope.opcionEstadoUnidad = false;
                        $scope.grua = $scope.detalleOrden.grua;
                        var date = new Date($scope.detalleOrden.fechaCita);
                        console.log(date, 'Soy la fecha que viene de bd')
                        $scope.fechaCita = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
                        $scope.horaCita = date.getUTCHours() + ":" + date.getUTCMinutes();
                        $scope.comentarios = $scope.detalleOrden.comenatario;
                        console.log($scope.detalleOrden.zonas, 'Son las zonas')
                        $scope.getTipoOrdenesServicio();
                        $scope.getTipoEstadoUnidad();
                        $scope.getServicios();
                        $scope.getTallerXid($scope.detalleOrden.idTaller);
                        $scope.getPreCotizacion($scope.detalleOrden.idCotizacion);
                    } else if ($scope, detalleOrden == 0) {
                        location.href = '/unidad?economico=' + $routeParams.economico;
                    } else {
                        error();
                    }
                });
            } else if ($scope.detalleUnidad.situacionOrden == 0) {
                $scope.getTipoOrdenesServicio();
                $scope.getTipoEstadoUnidad();
                $scope.getServicios();
                $scope.muestraAgendarCita = true;
            }
        });
    };
    //*****************************************************************************************************************************//
    // Obtiene los tipos de ordenes de servicio por ejemplo servicio y refacciones
    //*****************************************************************************************************************************//
    $scope.getTipoOrdenesServicio = function() {
        citaRepository.getTipoOrdenesServicio().then(function(result) {
            $scope.tipoCita = result.data;
        });
    };
    //*****************************************************************************************************************************//
    // Obtiene los estados  de la unidad por ejemplo en operacion y parada
    //*****************************************************************************************************************************//
    $scope.getTipoEstadoUnidad = function() {
        citaRepository.getTipoEstadoUnidad().then(function(result) {
            $scope.estadoUnidad = result.data;
        });
    };
    //*****************************************************************************************************************************//
    // Obtiene los servicios(especialidades) que se le pueden ofrecer dependiendo de la operación y el contrato
    //*****************************************************************************************************************************//
    $scope.getServicios = function() {
        citaRepository.getServicios($scope.idUsuario, $routeParams.economico).then(function(result) {
            $scope.servicios = result.data;
            if ($scope.servicios[0].respuesta == 1) {
                $scope.mensajeServicios = false;
            } else if ($scope.servicios[0].respuesta == 0) {
                $scope.mensajeServicios = true;
                console.log('No se encontraros registros')
            } else {
                error();
            }
        });
    };
    //*****************************************************************************************************************************//
    // Se manda a llamar la modal para mostrar las partidas y seleccionar las paritdas necesarias para la unidad
    //*****************************************************************************************************************************//
    $scope.getModalPartidas = function() {
        $('.modal-dialog').css('width', '1050px');
        modal_partidas($scope, $modal, $scope.idTaller, $scope.idServicios.slice(0, -1), $scope.resultado, '');
    };
    $scope.resultado = function(partidas) {
        $scope.partidas = partidas;
        $scope.labelItems = partidas.length;
    };
    //*****************************************************************************************************************************//
    // Se inserta la orden de servicio en la base de datos 
    //*****************************************************************************************************************************//
    $scope.agendarCita = function() {
        console.log($scope.tipoDeCita.idTipoCita,
            $scope.estadoDeUnidad.idEstadoUnidad,
            $scope.grua,
            $scope.fechaCita,
            $scope.horaCita,
            $scope.comentarios
        );
        // var fecha = $scope.fechaCita.split('/');
        // var fechaTrabajo = fecha[2] + '/' + fecha[1] + '/' + fecha[0]
        citaRepository.putAgendarCita($scope.detalleUnidad.idUnidad, $scope.idUsuario, $scope.tipoDeCita.idTipoCita, $scope.estadoDeUnidad.idEstadoUnidad, $scope.grua, $scope.fechaCita + ' ' + $scope.horaCita + ':00.000', $scope.comentarios, $scope.zonaSelected, $scope.idTaller).then(function(result) {
            if (result.data[0].respuesta == 1) {
                $scope.numeroOrden = result.data[0].numeroOrden;
                if ($scope.labelItems > 0) {
                    cotizacionRepository.insCotizacionNueva($scope.idTaller, $scope.idUsuario, 1, $scope.numeroOrden, $scope.tipoDeCita.idTipoCita).then(function(result) {
                        $scope.idCotizacion = result.data[0].idCotizacion;
                        angular.forEach($scope.partidas, function(value, key) {
                            cotizacionRepository.inCotizacionDetalle($scope.idCotizacion, value.costoUnitario, value.cantidad, value.precioUnitario, value.idPartida, 1).then(function(result) {
                                alertFactory.success('Orden de Servicio Agendada');
                                setTimeout(function() {
                                    location.href = '/unidad?economico=' + $routeParams.economico;
                                }, 1000);
                            });
                        });
                    });
                } else {
                    alertFactory.success('Orden de Servicio Agendada');
                    setTimeout(function() {
                        location.href = '/unidad?economico=' + $routeParams.economico;
                    }, 1000);
                }

            } else if (result.data[0].respuesta == 0) {
                alertFactory.info('Ocurrio un problema al agendar la orden de servicio. Intente de nuevo')
            } else {
                alertFactory.error('Ocurrio un problema')
            }
        });
    };
    //obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
    $scope.obtieneNivelZona = function() {
        $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.idContratoOperacion).then(function(result) {
                console.log(result, 'Soy las zonas ')
                $scope.totalNiveles = result.data.length;
                if (result.data.length > 0) {
                    $scope.NivelesZona = result.data;
                    $scope.devuelveZonas();
                }
            },
            function(error) {
                alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
            });
    };

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function() {
        for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
            cotizacionConsultaRepository.getZonas($scope.idContratoOperacion, $scope.NivelesZona[$scope.x].idNivelZona).then(function(result) {
                if (result.data.length > 0) {
                    var valueToPush = {};
                    valueToPush.orden = result.data[0].orden;
                    valueToPush.etiqueta = result.data[0].etiqueta;
                    valueToPush.data = result.data;
                    $scope.Zonas.push(valueToPush);
                    //se establece por default cada zona seleccionada en 0
                    $scope.ZonasSeleccionadas[result.data[0].orden] = "0";
                }
            }, function(error) {
                alertFactory.error('No se pudo recuperar información de las zonas');
            });
        }
    };

    $scope.cambioZona = function(id, orden, zona, zonaseleccionada) {
        //al cambiar de zona se establece como zona seleccionada.
        $scope.zonaSelected = id;
        //se limpian los combos siguientes.
        for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
        }
    };
    //*****************************************************************************************************************************//
    // Se obtienen los talleres con los filtros seleccionados
    //*****************************************************************************************************************************//
    $scope.buscarTaller = function() {
        $scope.mostrarAccion = true;
        $scope.idServicios = ''
        angular.forEach($scope.servicios, function(value, key) {
            if (value.seleccionado == true) {
                $scope.idServicios = value.idServicio + ',' + $scope.idServicios;
            }

        });
        tallerRepository.getTalleres($scope.idUsuario, $scope.idContratoOperacion, $scope.zonaSelected, $scope.taller, $scope.idServicios.slice(0, -1)).then(function(result) {
            $scope.mostrarTabla = true;
            $scope.talleres = result.data;
            globalFactory.filtrosTabla("talleres", "Talleres", 100);
        });
    };
    $scope.sendIdTaller = function(idTaller) {
        $scope.idTaller = idTaller;
        $scope.muestraBtnPreOrden = true;
    };
    $scope.getTallerXid = function(idTaller) {
        tallerRepository.getTallerXid(idTaller).then(function(result) {
            console.log(result.data[0], 'Soy el taller')
            $scope.mostrarTabla = true;
            $scope.mostrarAccion = false;
            $scope.muestraBtnPreOrden = true;
            $scope.talleres = result.data;
        });
    };
    $scope.getPreCotizacion = function(idCotizacion) {
        console.log(idCotizacion);
    };
    $scope.actualizarCita = function() {
        console.log($scope.detalleUnidad.idUnidad, $scope.idUsuario, $scope.tipoDeCita.idTipoCita, $scope.estadoDeUnidad.idEstadoUnidad, $scope.grua, $scope.fechaCita + ' ' + $scope.horaCita + ':00.000', $scope.comentarios, $scope.zonaSelected, $scope.idTaller);
    };
});
