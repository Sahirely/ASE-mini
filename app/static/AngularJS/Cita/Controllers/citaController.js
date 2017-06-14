registrationModule.controller('citaController', function($scope, $route, $modal, $rootScope, $routeParams, localStorageService, alertFactory, globalFactory, userFactory, citaRepository, busquedaUnidadRepository, cotizacionConsultaRepository, tallerRepository, cotizacionRepository, consultaCitasRepository) {
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
    $scope.partidas = [];
    $scope.idServicios = '';
    $scope.idCotizacion = undefined;
    $scope.infoBusqueda = [];
    $scope.etiquetaFecha = 'Fecha';
    $scope.etiquetaHora = 'Hora';
    $scope.SeleccionoDiaActual = false;
    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = {};
    $scope.NivelesZona = [];
    $scope.Zonas = [];

    $scope.init = function() {
        userFactory.ValidaSesion();
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
                        $scope.idCotizacion = $scope.detalleOrden.idCotizacion;
                        var date = new Date($scope.detalleOrden.fechaCita);
                        console.log(date, 'Soy la fecha que viene de bd')
                        $scope.fechaCita = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
                        var hora = date.getUTCMinutes();
                        if (hora <= 9) { hora = '0' + hora }
                        $scope.horaCita = date.getUTCHours() + ":" + hora;
                        $scope.comentarios = $scope.detalleOrden.comenatario;
                        console.log($scope.detalleOrden.zonas, 'Son las zonas')
                        $scope.getTipoOrdenesServicio();
                        $scope.getTipoEstadoUnidad();
                        $scope.getServicios();
                        $scope.getTallerXid($scope.detalleOrden.idTaller);
                        $scope.getPreCotizacion($scope.idCotizacion);
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
    // Valida que la fecha ingresada no sea antigua.
    //*****************************************************************************************************************************//
    $scope.NoFechaAntigua = function(fecha){
        var CurrentDate = new Date();
        var anio = CurrentDate.getFullYear();
        var mes = CurrentDate.getMonth() + 1;
        var dia = CurrentDate.getDate();
        var diaActual  = new Date(anio+'/'+mes+'/'+dia);
        var fechaSeleccionada = new Date(fecha);

        if (fechaSeleccionada < diaActual){
            $scope.fechaCita = '';
            $scope.horaCita = '';
            $scope.SeleccionoDiaActual = false;
            alertFactory.info('No puede seleccionar una fecha pasada.');
        }

        if(!(fechaSeleccionada < diaActual) && !(fechaSeleccionada > diaActual)){
            $scope.SeleccionoDiaActual = true;
            if($scope.horaCita != undefined && $scope.horaCita != '' && $scope.horaCita != null){
                $scope.NoHoraAntigua($scope.horaCita);
            }
        }

        if(fechaSeleccionada > diaActual){
          $scope.SeleccionoDiaActual = false;
        }
    };

    $scope.NoHoraAntigua = function(hora){
      if($scope.fechaCita != undefined && $scope.fechaCita != '' && $scope.fechaCita != null){
          if($scope.SeleccionoDiaActual == true){
              var HoraActual = new Date();
              var anio = HoraActual.getFullYear();
              var mes = HoraActual.getMonth() + 1;
              var dia = HoraActual.getDate();
              var HoraSeleccionada  = new Date(anio+'/'+mes+'/'+dia+' '+hora+ ':00.000');

              if (!(HoraSeleccionada > HoraActual)){
                $scope.horaCita = '';
                alertFactory.info('No puede seleccionar una hora pasada.');
              }
          }
      }else{
            $scope.horaCita = '';
            alertFactory.info('Seleccione antes la fecha de la cita.');
      }
    }
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
        $scope.infoBusqueda = [{
            idTipoUnidad: $scope.detalleUnidad.idTipoUnidad,
            nombreTipoUnidad: $scope.detalleUnidad.nombreTipoUnidad,
            nombreServicios: $scope.nombreServicios,
            nombreZona: $scope.nombreZona,
            etiquetaZona: $scope.etiquetaZona
        }]
        console.log($scope.infoBusqueda, 'Soy lo que enviare en la modal')
        $('.modal-dialog').css('width', '1050px');
        modal_partidas($scope, $modal, $scope.idTaller, $scope.idServicios.slice(0, -1), $scope.partidas, $scope.idCotizacion, $scope.infoBusqueda, $scope.resultado, '');
    };
    $scope.resultado = function(partidas) {
        $scope.partidas = partidas;
        console.log($scope.partidas, 'Soy las partidas despues de agregar de la modal')
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
                            cotizacionRepository.inCotizacionDetalle($scope.idCotizacion, value.costo, value.cantidad, value.venta, value.idPartida, 1).then(function(result) {
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

    $scope.changeTipoCita = function (data) {
        $scope.opcionTipoCita = true;
        if (data.tipoCita == 'Refacciones') {
            $scope.etiquetaFecha = 'Fecha de Entrega';
            $scope.etiquetaHora = 'Hora de Entrega';
        }else{
            $scope.etiquetaFecha = 'Fecha';
            $scope.etiquetaHora = 'Hora';
        }

    }

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
        //Obtengo la zona seleccionada
        angular.forEach(zona.data, function(value, key) {
            if (value.idZona == $scope.zonaSelected) {
                $scope.nombreZona = value.nombre;
                $scope.etiquetaZona = value.etiqueta;
            }
        });

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
        $scope.idServicios = '';
        $scope.nombreServicios = '';
        angular.forEach($scope.servicios, function(value, key) {
            if (value.seleccionado == true) {
                $scope.idServicios = value.idServicio + ',' + $scope.idServicios;
                $scope.nombreServicios = value.nombreServicio + ', ' + $scope.nombreServicios
            }

        });
        if ($scope.idServicios == '') {

            alertFactory.warning("Seleccione minimo un servicio como criterio de búsqueda.");
        } else if ($scope.zonaSelected == 0) {
            alertFactory.warning("Seleccione minimo una zona como criterio de búsqueda.");
        } else {
            tallerRepository.getTalleres($scope.idUsuario, $scope.idContratoOperacion, $scope.zonaSelected, $scope.taller, $scope.idServicios.slice(0, -1)).then(function(result) {
                $scope.mostrarTabla = true;
                $scope.talleres = result.data;
                globalFactory.filtrosTabla("talleres", "Talleres", 100);
            });
        }
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
        consultaCitasRepository.getCotizacionDetalle(idCotizacion, $scope.idUsuario).then(function(result) {
            console.log(result.data, 'Soy la cotizacion')
            $scope.labelItems = result.data.length;
            $scope.partidas = result.data;
        });
    };
    $scope.actualizarCita = function() {
        if ($scope.grua == true) {
            $scope.grua = 1;
        } else { $scope.grua = 0 }
        citaRepository.putActualizarCita($scope.detalleOrden.idOrden, $scope.detalleUnidad.idUnidad, $scope.idUsuario, $scope.tipoDeCita.idTipoCita, $scope.estadoDeUnidad.idEstadoUnidad, $scope.grua, $scope.fechaCita + ' ' + $scope.horaCita + ':00.000', $scope.comentarios, $scope.zonaSelected, $scope.idTaller).then(function(result) {
            console.log(result, 'Soy lo que regresa despues de actualizar la Orden de Servicio')
            angular.forEach($scope.partidas, function(value, key) {
                cotizacionRepository.inCotizacionDetalle($scope.idCotizacion, value.costo, value.cantidad, value.venta, value.idPartida, value.idEstatusPartida).then(function(result) {
                    alertFactory.success('Cotización Detalle Creada');
                    setTimeout(function() {
                        location.href = '/unidad?economico=' + $routeParams.economico;
                    }, 1000);
                });
            });
        });
        console.log($scope.detalleUnidad.idUnidad, $scope.idUsuario, $scope.tipoDeCita.idTipoCita, $scope.estadoDeUnidad.idEstadoUnidad, $scope.grua, $scope.fechaCita + ' ' + $scope.horaCita + ':00.000', $scope.comentarios, $scope.zonaSelected, $scope.idTaller);

    };
});
