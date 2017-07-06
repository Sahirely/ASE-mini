registrationModule.controller('citaController', function($scope, $route, $modal, $rootScope, $routeParams, localStorageService, alertFactory, globalFactory, userFactory, citaRepository, busquedaUnidadRepository, cotizacionConsultaRepository, tallerRepository, cotizacionRepository, consultaCitasRepository, commonFunctionRepository) {
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
        // debugger;
        busquedaUnidadRepository.getDetalleUnidad($scope.idUsuario, $routeParams.economico).then(function(result) {
            $scope.detalleUnidad = result.data[0];
           
            if ($scope.detalleUnidad.situacionOrden == 1) {
               
                $scope.muestraAgendarCita = false;
                // debugger;
                busquedaUnidadRepository.getDetalleOrden($routeParams.orden).then(function(result) {
                    // debugger;
                    if (result.data.length>0) {
                        $scope.detalleOrden = result.data[0];
                        console.log( $scope.detalleOrden );
                        if ($scope.detalleOrden.respuesta == 1 && $routeParams.tipo != 'nueva') {
                            $scope.tipoDeCita.idTipoCita = $scope.detalleOrden.idTipoCita;
                            $scope.estadoDeUnidad.idEstadoUnidad = $scope.detalleOrden.idEstadoUnidad;
                            $scope.idTaller = $scope.detalleOrden.idTaller;
                            $scope.zonaSelected = $scope.detalleOrden.idZona;
                            $scope.opcionTipoCita = false;
                            $scope.opcionEstadoUnidad = false;
                            $scope.grua = $scope.detalleOrden.grua;
                            $scope.idCotizacion = $scope.detalleOrden.idCotizacion;
                            $scope.idOrden = $scope.detalleOrden.idOrden;
                            var date = new Date($scope.detalleOrden.fechaCita);
                            $scope.fechaCita = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
                            var hora = date.getUTCMinutes();
                            if (hora <= 9) { hora = '0' + hora }
                            $scope.horaCita = date.getUTCHours() + ":" + hora;
                            $scope.comentarios = $scope.detalleOrden.comenatario;
                            $scope.getTipoOrdenesServicioActulizar();
                            $scope.getTipoEstadoUnidad();
                            $scope.getServicios();
                            $scope.getTallerXid($scope.detalleOrden.idTaller);
                            $scope.getPreCotizacion($scope.idCotizacion);

                            $scope.getZonasCita($scope.zonaSelected);
                            $scope.getDetalleOrdenEspecialidad();

                        } else if ($scope.detalleOrden.respuesta == 0 || $routeParams.tipo == 'nueva') {
                           // location.href = '/unidad?economico=' + $routeParams.economico;
                           $scope.getTipoOrdenesServicio();
                            $scope.getTipoEstadoUnidad();
                            $scope.getServicios();
                            $scope.muestraAgendarCita = true;
                        } else {
                            error();
                        }
                    }else{
                        $scope.getTipoOrdenesServicio();
                        $scope.getTipoEstadoUnidad();
                        $scope.getServicios();
                        $scope.muestraAgendarCita = true;
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
    // Obtiene las especialidades de la cita
    //*****************************************************************************************************************************//
    $scope.getDetalleOrdenEspecialidad = function(){
        
      busquedaUnidadRepository.getDetalleOrdenEspecialidad($scope.idOrden).then(function(result){
        
        if (result.data.length > 0){
            for (var i = 0 ; i < result.data.length; i++) {
                 angular.forEach($scope.servicios, function(value, key) {
                    if (value.idServicio  == result.data[i].idEspecialidad) {
                        value.seleccionado = true;
                    }

                 });
            };
        }

      });
    }

    //*****************************************************************************************************************************//
    // Obtiene la zona y sus zonas padre correspondientes a la cita.
    //*****************************************************************************************************************************//
    $scope.getZonasCita = function(idZona){
      citaRepository.getZonasCita(idZona).then(function(result){
          var zonasArray = result.data;
          if (zonasArray.length > 0){
            zonasArray.forEach(function(item) {
                $scope.ZonasSeleccionadas[item.nivel] = '' +item.idZona +'';
            });

          }else{
            alertFactory.info('No se encontraron las zonas de la cita.')
          }

      });
    }

    //*****************************************************************************************************************************//
    // Obtiene los tipos de ordenes de servicio por ejemplo servicio y refacciones
    //*****************************************************************************************************************************//
    $scope.getTipoOrdenesServicioActulizar = function() {
        // debugger;
        $scope.tipoCita = [];
        citaRepository.getTipoOrdenesServicio().then(function(result) {
                // debugger;
                $scope.tipoCita=result.data;
        });
    };

    //*****************************************************************************************************************************//
    // Obtiene los tipos de ordenes de servicio por ejemplo servicio y refacciones
    //*****************************************************************************************************************************//
    $scope.getTipoOrdenesServicio = function() {
        // debugger;
        $scope.tipoCita = [];
        citaRepository.getTipoOrdenesServicioUnidad($scope.detalleUnidad.idUnidad).then(function(result) {
            for (var i = 0 ; i < result.data.length; i++) {
                // debugger;
                if ( $routeParams.tipo == 'nueva') {
                    if (result.data[i].orden  == 0) {
                         $scope.tipoCita.push(result.data[i]);
                    };
                }else{
                    $scope.tipoCita=result.data;
                }
            };
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
        $('.modal-dialog').css('width', '1050px');
        modal_partidas($scope, $modal, $scope.idTaller, $scope.idServicios.slice(0, -1), $scope.partidas, $scope.idCotizacion, $scope.infoBusqueda, $scope.resultado, '');
    };
    $scope.resultado = function(partidas) {
        $scope.partidas = partidas;
        $scope.labelItems = partidas.length;
    };
    //*****************************************************************************************************************************//
    // Se inserta la orden de servicio en la base de datos
    //*****************************************************************************************************************************//
    $scope.agendarCita = function() {
        // var fecha = $scope.fechaCita.split('/');
        // var fechaTrabajo = fecha[2] + '/' + fecha[1] + '/' + fecha[0]
        citaRepository.putAgendarCita($scope.detalleUnidad.idUnidad, $scope.idUsuario, $scope.tipoDeCita.idTipoCita, $scope.estadoDeUnidad.idEstadoUnidad, $scope.grua, $scope.fechaCita + ' ' + $scope.horaCita + ':00.000', $scope.comentarios, $scope.zonaSelected, $scope.idTaller, $scope.idServicios).then(function(result) {
           
            if (result.data[0].respuesta == 1) {
                $scope.numeroOrden = result.data[0].numeroOrden;
                $scope.idOrden = result.data[0].idOrden;

                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                            if (resp.data.length > 0) {
                                var correoDe = resp.data[0].correoDe;
                                var correoPara = resp.data[0].correoPara;
                                var asunto = resp.data[0].asunto;
                                var texto = resp.data[0].texto;
                                var bodyhtml = resp.data[0].bodyhtml;
                                 commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                                    if (result.data.length > 0) {
                                    }
                                }, function(error) {
                                    alertFactory.error('No se puede enviar el correo');
                                });
                            }
                        }, function (error) {
                            alertFactory.error("Error al obtener información para el mail");
                        });

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

            alertFactory.warning("Seleccione minimo un especialidad como criterio de búsqueda.");
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
            $scope.mostrarTabla = true;
            $scope.mostrarAccion = false;
            $scope.muestraBtnPreOrden = true;
            $scope.talleres = result.data;
        });
    };
    $scope.getPreCotizacion = function(idCotizacion) {
        consultaCitasRepository.getCotizacionDetalle(idCotizacion, $scope.idUsuario).then(function(result) {
            $scope.labelItems = result.data.length;
            $scope.partidas = result.data;
        });
    };

    $scope.actualizarCita = function() {
        if ($scope.grua == true) {
            $scope.grua = 1;
        } else { $scope.grua = 0 }

        $scope.idServicios = '';
        $scope.serviciosEstatus = '';
        angular.forEach($scope.servicios, function(value, key) {
           
            $scope.idServicios = value.idServicio + ',' + $scope.idServicios;

             if (value.seleccionado == true) {
               $scope.serviciosEstatus ='1,' + $scope.serviciosEstatus; 
            }else{
                $scope.serviciosEstatus ='0,' + $scope.serviciosEstatus; 
            }
        });

        citaRepository.putActualizarCita($scope.detalleOrden.idOrden, $scope.detalleUnidad.idUnidad, $scope.idUsuario, $scope.tipoDeCita.idTipoCita, $scope.estadoDeUnidad.idEstadoUnidad, $scope.grua, $scope.fechaCita + ' ' + $scope.horaCita + ':00.000', $scope.comentarios, $scope.zonaSelected, $scope.idTaller).then(function(result) {
            if( $scope.idCotizacion == 0 ){
                cotizacionRepository.insCotizacionNueva($scope.idTaller, $scope.idUsuario, 1, $scope.detalleOrden.numeroOrden, $scope.tipoDeCita.idTipoCita).then(function(result) {
                    $scope.idCotizacion = result.data[0].idCotizacion;
                    angular.forEach($scope.partidas, function(value, key) {
                        cotizacionRepository.inCotizacionDetalle($scope.idCotizacion, value.costo, value.cantidad, value.venta, value.idPartida, value.idEstatusPartida).then(function(result) {
                            alertFactory.success('Cotización Detalle Creada');
                            // citaRepository.putActualizarCita($scope.detalleOrden.idOrden, $scope.idServicios, ).then(function(result) {
                            //     setTimeout(function() {
                            //         // location.href = '/detalle?orden=' + $scope.detalleOrden.numeroOrden + '&estatus=2'; // Esta funciona
                            //         //location.href = '/unidad?economico=' + $routeParams.economico;
                            //     }, 1000);
                            // });
                        });
                    }); 
                });
            }
            else{
                angular.forEach($scope.partidas, function(value, key) {
                    cotizacionRepository.inCotizacionDetalle($scope.idCotizacion, value.costo, value.cantidad, value.venta, value.idPartida, value.idEstatusPartida).then(function(result) {
                        alertFactory.success('Cotización Detalle Creada');
                        // citaRepository.putActualizarCita($scope.detalleOrden.idOrden, $scope.idServicios, ).then(function(result) {
                        //     setTimeout(function() {
                        //         // location.href = '/detalle?orden=' + $scope.detalleOrden.numeroOrden + '&estatus=2'; // Esta funciona
                        //         //location.href = '/unidad?economico=' + $routeParams.economico;
                        //     }, 1000);
                        // });
                    });
                });    
            }  

            setTimeout(function() {
                // location.href = '/detalle?orden=' + $scope.detalleOrden.numeroOrden + '&estatus=2'; // Esta funciona
                //location.href = '/unidad?economico=' + $routeParams.economico;
            }, 1000);          
        });
    };
});
