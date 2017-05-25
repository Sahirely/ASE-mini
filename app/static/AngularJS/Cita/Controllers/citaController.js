registrationModule.controller('citaController', function($scope, $route, $modal, $rootScope, $routeParams, localStorageService, alertFactory, globalFactory, citaRepository, busquedaUnidadRepository) {
    //*****************************************************************************************************************//
    //SE INICIALIZAN VARIABLES
    //*****************************************************************************************************************//
    $scope.idUsuario = 2;
    $scope.init = function() {
        $scope.getDetalleUnidad();
        $('.clockpicker').clockpicker();
        // $('.input-group.date').datepicker({
        //     todayBtn: "linked",
        //     keyboardNavigation: true,
        //     forceParse: false,
        //     calendarWeeks: true,
        //     autoclose: true,
        //     todayHighlight: true,
        //     format: 'dd/mm/yyyy'
        // });
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
            console.log($scope.detalleUnidad);
            if ($scope.detalleUnidad.situacionOrden == 1) {
                $scope.muestraAgendarCita = true;
                location.href = '/unidad?economico=' + $routeParams.economico;
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
            console.log(result)
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
                console.log('Respuesta correcta')
            } else if ($scope.servicios[0].respuesta == 0) {
                $scope.mensajeServicios = true;
                console.log('No se encontraros registros')
            } else {
                error();
            }
            console.log(result.data, 'Son las Especialidades');

        });
    };
    //*****************************************************************************************************************************//
    // Se manda a llamar la modal para mostrar las partidas y seleccionar las paritdas necesarias para la unidad
    //*****************************************************************************************************************************//
    $scope.getModalPartidas = function() {
        $('.modal-dialog').css('width', '1050px');
        modal_partidas($scope, $modal);
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
        var fecha = $scope.fechaCita.split('/');
        var fechaTrabajo = fecha[2] + '/' + fecha[1] + '/' + fecha[0]
        citaRepository.putAgendarCita($scope.detalleUnidad.idUnidad, $scope.idUsuario, $scope.tipoDeCita.idTipoCita, $scope.estadoDeUnidad.idEstadoUnidad, $scope.grua, fechaTrabajo + ' ' + $scope.horaCita + ':00.000', $scope.comentarios, 1, 0).then(function(result) {
            console.log(result, 'Soy el resultado al insertar la orden de servicio')
            if (result.data[0].respuesta == 1) {
                alertFactory.success('Orden de Servicio Agendada');
                setTimeout(function() {
                    location.href = '/unidad?economico=' + $routeParams.economico;
                }, 1000);
            } else if (result.data[0].respuesta == 0) {
                alertFactory.info('Ocurrio un problema al agendar la orden de servicio. Intente de nuevo')
            } else {
                alertFactory.error('Ocurrio un problema')
            }
        });
    };

    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    //     $rootScope.modulo = 'nuevaCita';
    //     var idTrabajoNew = '';
    //     $scope.message = 'Buscando...';
    //     $scope.userData = localStorageService.get('userData');
    //     var itemsAutorizacionRechazo = [];
    //     $scope.listaPiezas = [];
    //     $scope.talleres = [];
    //     $scope.preCotizaciones = [];
    //     $scope.isPreCotizacion = false;
    //     localStorageService.remove('idCotizacionEdit');
    //     obtieneFechaActual();
    //     $scope.selectedCliente = '';
    //     $scope.init = function() {};
    //     //init de la pantalla citaTrabajo
    //     $scope.initCita = function() {
    //         var userData = localStorageService.get('userData');
    //         $scope.unidadInfo = localStorageService.get('unidad');
    //         getCita($scope.unidadInfo.idUnidad, userData.idUsuario);
    //     };
    //     //init de la pantalla  nuevaCita
    //     $scope.initNuevaCita = function() {
    //         $scope.edita = localStorageService.get('ModoEdicion');
    //         localStorageService.remove('ModoEdicion');
    //         getCliente();
    //         $scope.idEstadoAutotanque = '';
    //         $scope.procesAutotanque = '';
    //         //requiereGrua
    //         //clasificacionCita
    //         $scope.datosCita = {
    //             razonSocial: "",
    //             direccion: "",
    //             idTaller: "",
    //             fechaCita: "",
    //             horaCita: "",
    //             trabajoCita: "",
    //             observacionCita: ""
    //         }
    //         if (localStorageService.get('citaEdicion') != undefined) {
    //             var idCita = localStorageService.get('citaEdicion')
    //             getidCita(idCita);
    //             localStorageService.remove('citaEdicion');
    //             busquedaServicioDetalle(idCita);
    //         }
    //         getTipoCita();
    //         getTrasladoUnidad();
    //         $scope.idTipoCita = 1;
    //         $scope.userData = localStorageService.get('userData');
    //         $('.clockpicker').clockpicker();
    //         $scope.userData.idTipoUsuario == 4 ? $scope.selectedTaller = false : $scope.selectedTaller = true;
    //         $scope.datosCita = {};
    //         $scope.unidadInfo = localStorageService.get('unidad');
    //         $scope.labelItems = 0;
    //     };
    //     //init de la pantalla tallerCita
    //     $scope.initTallerCita = function() {
    //         Dropzone.autoDiscover = false;
    //         $scope.dzOptionsRecepcion = uploadRepository.getDzOptions('image/*,application/pdf', 1);
    //         $('#calendar .input-group.date').datepicker({
    //             todayBtn: "linked",
    //             keyboardNavigation: true,
    //             forceParse: false,
    //             calendarWeeks: true,
    //             autoclose: true,
    //             todayHighlight: true
    //         });
    //         $scope.busquedaCita('');
    //     };
    //     //obtiene la unidad mediante el dato buscado
    //     var getUnidad = function(datoUnidad) {
    //         $('#btnBuscar').button('Buscando...');
    //         $scope.promise = citaRepository.getUnidadInformation(datoUnidad, $scope.userData.idUsuario).then(function(unidadInfo) {
    //             $('.dataTableUnidad').DataTable().destroy();
    //             $scope.unidades = unidadInfo.data;
    //             if (unidadInfo.data.length > 0) {
    //                 globalFactory.waitDrawDocument("dataTableUnidad", "Citas");
    //                 alertFactory.success('Datos encontrados');
    //                 $('#btnBuscar').button('reset');
    //             } else {
    //                 alertFactory.info('No se encontraron datos');
    //                 $('#btnBuscar').button('reset');
    //             }
    //         }, function(error) {
    //             alertFactory.error('Error al obtener los datos');
    //             $('#btnBuscar').button('reset');
    //         });
    //     };
    //     //obtiene las citas de la unidad
    //     var getCita = function(idUnidad, idUsuario) {
    //         $('.dataTableCita').DataTable().destroy();
    //         $scope.promise = citaRepository.getCita(idUnidad, idUsuario).then(function(cita) {
    //             $scope.citas = cita.data;
    //             if (cita.data.length > 0) {
    //                 globalFactory.waitDrawDocument("dataTableCita", "Citas");
    //                 alertFactory.success('Datos encontrados');
    //             } else {
    //                 alertFactory.info('No se encontraron datos');
    //             }
    //         }, function(error) {
    //             alertFactory.error('Error al obtener datos');
    //         });
    //     };
    //     //regresa a la pantalla de cita
    //     $scope.backToCita = function() {
    //         location.href = '/cita';
    //     };
    //     //Obtiene información de la unidad
    //     $scope.lookUpUnidad = function(selectedCliente, datoUnidad) {
    //         if (datoUnidad !== '' && datoUnidad !== undefined) {
    //             getUnidad(datoUnidad);
    //         } else {
    //             alertFactory.info('Todos los campos son obligatorios');
    //         }
    //     };
    //     //obtiene las citas y servicios de la unidad
    //     $scope.lookUpCita = function(unidad) {
    //         location.href = '/citatrabajo';
    //         localStorageService.set('unidad', unidad);
    //     };
    //     //Búsqueda de citas
    //     $scope.busquedaCita = function(fecha) {
    //         if (fecha != '') {
    //             var fechaCita = '';
    //             var dateHoy = new Date();
    //             var fechaHoy = ('0' + dateHoy.getDate()).slice(-2) + '/' + ('0' + (dateHoy.getMonth() + 1)).slice(-2) + '/' + dateHoy.getFullYear();
    //             var date = fecha.toString();
    //             var dia = date.substring(0, 2);
    //             var mes = date.substring(3, 5);
    //             var anio = date.substring(6, date.length);
    //             if (fechaHoy == date) {
    //                 fechaCita = anio + '' + mes + '' + dia;
    //             } else {
    //                 fechaCita = anio + '' + dia + '' + mes;
    //             }
    //             getCitaTaller(fechaCita, 0, $scope.userData.idUsuario);
    //         } else {
    //             getCitaTaller(null, 0, $scope.userData.idUsuario);
    //         }
    //     };
    //     //Se obtienen las citas de la fecha seleccionada
    //     var getCitaTaller = function(fecha, idCita, idUsuario) {
    //         $('.dataTableCitaTaller').DataTable().destroy();
    //         $scope.promise = citaRepository.getCitaTaller(fecha, idCita, idUsuario).then(function(cita) {
    //             if (cita.data.length > 0) {
    //                 $scope.listaCitas = cita.data;
    //                 globalFactory.waitDrawDocument("dataTableCitaTaller", "Citas");
    //                 alertFactory.success('Datos de citas cargados.');
    //             } else {
    //                 $scope.listaCitas = '';
    //                 alertFactory.info('No hay citas en la fecha seleccionada.');
    //             }
    //         }, function(error) {
    //             alertFactory.error("Error al obtener citas");
    //         });
    //     };
    //     //obtiene los talleres con su especialidad
    //     $scope.lookUpTaller = function(datoTaller) {
    //         if (datoTaller !== '' && datoTaller !== undefined) {
    //             $('.dataTableTaller').DataTable().destroy();
    //             $scope.promise = citaRepository.getTaller(datoTaller, $scope.userData.idUsuario).then(function(taller) {
    //                 $scope.talleres = taller.data;
    //                 if (taller.data.length > 0) {
    //                     globalFactory.waitDrawDocument("dataTableTaller", "Citas");
    //                     alertFactory.success('Datos encontrados');
    //                 } else {
    //                     alertFactory.info('No se encontraron datos');
    //                 }
    //             }, function(error) {
    //                 alertFactory.error('Error al obtener los datos');
    //             });
    //         } else {
    //             alertFactory.info('Llene el campo de búsqueda');
    //         }
    //         inicializaListas();
    //     };
    //     //inserta una nueva cita
    //     $scope.addCita = function() {
    //         if (($scope.datosCita.fechaCita != undefined && $scope.datosCita.fechaCita != "") && ($scope.datosCita.horaCita != undefined && $scope.datosCita.horaCita != "") &&
    //             ($scope.datosCita.trabajoCita != undefined && $scope.datosCita.trabajoCita != "") && ($scope.labelItems > 0) &&
    //             ($scope.procesAutotanque != "") && ($scope.idEstadoAutotanque != "") && ($scope.selectedCliente != "") && ($scope.selectedCliente != undefined)) {

    //             if (($scope.procesAutotanque == "1" && $scope.requiereGrua == undefined) || ($scope.procesAutotanque == "1" && $scope.clasificacionCita == "")) {
    //                 alertFactory.info("Llene todos los campos");
    //             } else {
    //                 if ($scope.userData.idTipoUsuario != 4 && $scope.datosCita.idTaller == undefined) {
    //                     alertFactory.info("Seleccione un Taller");
    //                 } else {

    //                     if ($scope.unidadInfo.idZona == 2 && $scope.altace == undefined) {
    //                         alertFactory.info("Llene todos los campos");
    //                     } else {

    //                         $scope.datosCita.pieza = "";
    //                         if (localStorageService.get('stgListaPiezas', $scope.listaPiezas) != undefined) {
    //                             $scope.datosCita.pieza = localStorageService.get('stgListaPiezas', $scope.listaPiezas).slice(0);
    //                         }

    //                         if ($scope.altace == undefined) {
    //                             $scope.altace = 0;
    //                         }
    //                         var citaTaller = {};
    //                         citaTaller.idCita = 0;
    //                         citaTaller.idUnidad = localStorageService.get('unidad').idUnidad;
    //                         $scope.userData.idTipoUsuario == 4 ? citaTaller.idTaller = 0 :
    //                             citaTaller.idTaller = $scope.datosCita.idTaller;
    //                         citaTaller.fecha = $scope.datosCita.fechaCita + ' ' + $scope.datosCita.horaCita;
    //                         citaTaller.trabajo = $scope.datosCita.trabajoCita;
    //                         citaTaller.observacion = $scope.datosCita.observacionCita;
    //                         citaTaller.idUsuario = $scope.userData.idUsuario;

    //                         citaTaller.idTipoCita = $scope.clasificacionCita;
    //                         $scope.procesAutotanque == "4" ? citaTaller.idTipoCita = $scope.procesAutotanque : citaTaller.idTipoCita;
    //                         citaTaller.idTrasladoUnidad = $scope.requiereGrua;
    //                         citaTaller.idEstadoAutotanque = $scope.idEstadoAutotanque;
    //                         citaTaller.idCliente = $scope.selectedCliente.idCliente;
    //                         citaTaller.altace = $scope.altace;
    //                         citaRepository.addCita(citaTaller).then(function(cita) {
    //                             citaTaller.idCita = cita.data[0].idCita;
    //                             if (citaTaller.idCita > 0) {
    //                                 alertFactory.success("Se agendó correctamente");
    //                                 $scope.clearInputs();
    //                                 if ($scope.datosCita.pieza != "") {
    //                                     $scope.datosCita.pieza.forEach(function(pieza, i) {
    //                                         var item = {};
    //                                         item.idCita = citaTaller.idCita;
    //                                         item.idTipoElemento = pieza.idTipoElemento;
    //                                         item.idElemento = pieza.idItem;
    //                                         item.cantidad = pieza.cantidad;
    //                                         citaRepository.addCitaServicioDetalle(item).then(function(piezaInserted) {
    //                                             if (piezaInserted.data.length > 0) {
    //                                                 alertFactory.success("Se insertó correctamente");
    //                                             }
    //                                             if (($scope.datosCita.pieza.length - i) == 1) {
    //                                                 citaRepository.enviarMailConfirmacion(citaTaller.idCita, $scope.userData.idTipoUsuario).then(function(enviado) {
    //                                                     if (enviado.data.length > 0) {
    //                                                         alertFactory.success("e-mail enviado");
    //                                                         localStorageService.set('objCita', citaTaller);
    //                                                         setTimeout(function() {
    //                                                             location.href = '/tallercita';
    //                                                         }, 1000);
    //                                                         //localStorageService.remove('stgListaPiezas');
    //                                                     } else {
    //                                                         alertFactory.info("No se envío el e-mail");
    //                                                     }
    //                                                 }, function(error) {
    //                                                     alertFactory.error("Error al enviar el e-mail")
    //                                                 });
    //                                             }
    //                                         }, function(error) {
    //                                             alertFactory.error("Error al insertar servicios");
    //                                         });
    //                                     });
    //                                 }
    //                             } else {
    //                                 alertFactory.error("El autotanque tiene una orden de servicio pendiente, si desea agendar una nueva cita comuníquese al Centro de Control.")
    //                             }
    //                         }, function(error) {
    //                             alertFactory.error("Error al insertar la cita");
    //                         });
    //                     }
    //                 }
    //             }
    //         } else if (($scope.datosCita.fechaCita != undefined && $scope.datosCita.fechaCita != "") &&
    //             ($scope.datosCita.horaCita != undefined && $scope.datosCita.horaCita != "") &&
    //             ($scope.datosCita.trabajoCita != undefined && $scope.datosCita.trabajoCita != "") &&
    //             ($scope.labelItems <= 0)) {
    //             alertFactory.info("Llene la Pre-Orden");
    //         } else {
    //             alertFactory.info("Llene todos los campos");
    //         }
    //     };
    //     //combina la fecha y hora en una cadena
    //     var combineDateAndTime = function(date, time) {
    //         timeString = time.getHours() + ':' + time.getMinutes() + ':00';
    //         var year = date.getFullYear();
    //         var month = date.getMonth() + 1; // Jan is 0, dec is 11
    //         var day = date.getDate();
    //         var dateString = '' + year + '-' + month + '-' + day;
    //         var combined = dateString + ' ' + timeString;
    //         return combined;
    //     };
    //     //limpia los inputs del modal Cita
    //     $scope.clearInputs = function() {
    //         $scope.talleres = [];
    //         $scope.datoTaller = undefined;
    //         $scope.fechaCita = undefined;
    //         $scope.horaCita = undefined;
    //         $scope.trabajoCita = undefined;
    //     };
    //     //obtiene el taller seleccionado
    //     $scope.getTaller = function(idTaller) {
    //         $scope.selectedTaller = false;
    //         $scope.datosCita.idTaller = idTaller;
    //     };
    //     //Redirige a pagina para nueva cotización
    //     $scope.nuevaCotizacion = function(cita, preCotizacion, nvaCotizacion) {
    //         localStorageService.set('citaRefacciones', cita);
    //         if (nvaCotizacion == 1) {
    //             localStorageService.set('cita', cita);
    //             localStorageService.set('isNuevaCotizacion', nvaCotizacion);
    //         } else if ($scope.isPreCotizacion == true) {
    //             localStorageService.set('cita', cita);
    //             localStorageService.set('isPreCotizacion', $scope.isPreCotizacion);
    //         } else {
    //             var objEditCotizacion = {
    //                 idCotizacion: preCotizacion.idCotizacion,
    //                 idTaller: preCotizacion.idTaller,
    //                 idTrabajo: preCotizacion.idTrabajo,
    //                 idTipoCotizacion: preCotizacion.idTipoCotizacion,
    //                 idClienteCita: preCotizacion.idCliente
    //             };
    //             localStorageService.set('objEditCotizacion', objEditCotizacion);
    //         }
    //         location.href = '/cotizacionnueva';
    //     };
    //     //despliega el div de las tablas
    //     $scope.slideDown = function() {
    //         $("#borderTop").slideDown(2000);
    //     };
    //     //contrae el div de las tablas
    //     $scope.slideUp = function() {
    //         $("#borderTop").slideUp(3000);
    //     };
    //     //va a la pantalla de nueva cita
    //     $scope.goNewCita = function() {
    //         localStorageService.remove('cita');
    //         location.href = 'nuevacita';
    //     };
    //     //visualiza la modal de servicioCita
    //     $scope.showCitaServicioModal = function() {
    //         if (localStorageService.get('cita') != null) {
    //             $scope.citaDatos = localStorageService.get('cita');
    //             $scope.estado = 1;
    //             $scope.editar = 0;
    //             datosCitaBien();
    //             $scope.idTaller = $scope.citaDatos.idTaller == 0 ? $scope.datosCita.idTaller : $scope.citaDatos.idTaller;
    //         }
    //         $scope.piezas = [];
    //         $('.dataTablePiezaTaller').DataTable().destroy();
    //         $('#citaServicioModal').appendTo("body").modal('show');
    //     };
    //     //init de servicio controller
    //     $scope.initCitaServicio = function() {
    //         $scope.listaPiezas = [];
    //     };
    //     //obtiene servicios/items
    //     $scope.getPieza = function(nombrePieza) {
    //         if (nombrePieza !== '' && nombrePieza !== undefined) {
    //             $('#btnBuscarPieza').button('Buscando...');
    //             $('.dataTablePiezaTaller').DataTable().destroy();
    //             if ($scope.userData.idTipoUsuario == 4) {
    //                 $scope.datosCita.idTaller = 0;
    //             };
    //             $scope.promise = cotizacionRepository.buscarPieza($scope.datosCita.idTaller, nombrePieza, $scope.procesAutotanque, $scope.userData.idUsuario, $scope.selectedCliente.idCliente).then(function(pieza) {
    //                 $scope.piezas = pieza.data;
    //                 if (pieza.data.length > 0) {
    //                     globalFactory.waitDrawDocument("dataTablePiezaTaller", "Citas");
    //                     alertFactory.success("Datos obtenidos");
    //                 } else {
    //                     $scope.piezas = [];
    //                     alertFactory.info("No se encontraron piezas");
    //                 }
    //             }, function(error) {
    //                 alertFactory.error("Error al obtener piezas");
    //                 $('#btnBuscarPieza').button('reset');
    //             });
    //         } else {
    //             $scope.piezas = [];
    //             alertFactory.info("Introduzca datos para buscar")
    //         }
    //         $('#btnBuscarPieza').button('reset');
    //     };
    //     //añade una pieza en la lista
    //     $scope.addPieza = function(pieza) {
    //         if ($scope.listaPiezas.length > 0) { //idItem
    //             if (validaItemExists($scope.listaPiezas, pieza.idItem) == false) {
    //                 if ($scope.edita == 1) {
    //                     pieza.accion = 1;
    //                 }
    //                 pieza.cantidad = 1;
    //                 $scope.listaPiezas.push(pieza);
    //                 $scope.labelItems = $scope.listaPiezas.length;
    //             }
    //         } else {
    //             if ($scope.edita == 1) {
    //                 pieza.accion = 1;
    //             }
    //             pieza.cantidad = 1;
    //             $scope.listaPiezas.push(pieza);
    //             $scope.labelItems = $scope.listaPiezas.length;
    //         }
    //     };
    //     //valida si ya existe la pieza y aumenta la cantidad
    //     var validaItemExists = function(piezas, idItem) {
    //         var exists = false;
    //         piezas.forEach(function(p, i) {
    //             if (p.idItem == idItem) {
    //                 $scope.listaPiezas[i].cantidad = p.cantidad + 1;
    //                 exists = true;
    //             }
    //         });
    //         return exists;
    //     };
    //     //quita piezas de la lista
    //     $scope.removePieza = function(idItem) {
    //         $scope.listaPiezas.forEach(function(p, i) {
    //             if (p.idItem == idItem) {
    //                 if (p.cantidad > 1) {
    //                     $scope.listaPiezas[i].cantidad = p.cantidad - 1;
    //                 } else {
    //                     $scope.listaPiezas.splice(i, 1);
    //                     $scope.labelItems = $scope.listaPiezas.length;
    //                 }
    //             }
    //         })
    //     };
    //     //regresar a nueva cita
    //     $scope.generarCitaServicio = function(pieza) {
    //         if (pieza != undefined) {
    //             if ($scope.listaPiezas.length > 0) { //idItem
    //                 if (validaItemExists($scope.listaPiezas, pieza.idItem) == false) {
    //                     pieza.cantidad = 1;
    //                     $scope.labelItems = $scope.listaPiezas.length;
    //                 }
    //             } else {
    //                 pieza.cantidad = 1;
    //                 $scope.listaPiezas.push(pieza);
    //                 $scope.labelItems = $scope.listaPiezas.length;
    //             }
    //         }
    //         localStorageService.set('stgListaPiezas', $scope.listaPiezas);
    //         localStorageService.remove('cita');
    //         $('#citaServicioModal').modal('hide');
    //     };
    //     //inicializa valores
    //     var inicializaListas = function() {
    //         $scope.talleres = [];
    //         $scope.piezas = [];
    //         $scope.datosCita.idTaller = undefined;
    //     };
    //     //ir a cotización trabajo
    //     $scope.goToCotizacionTrabajo = function(cita) {
    //         //obtiene los tabajos de la cita
    //         $scope.promise = citaRepository.getTrabajo(cita.idCita).then(function(trabajo) {
    //             if (trabajo.data.length > 0) {
    //                 var objBotonera = {};
    //                 objBotonera.accion = 0;
    //                 objBotonera.idCita = cita.idCita;
    //                 localStorageService.set("objTrabajo", trabajo.data);
    //                 localStorageService.set("botonera", objBotonera);
    //                 location.href = '/ordenservicio'
    //             } else {
    //                 alertFactory.info('Aún no existe un trabajo');
    //             }

    //         }, function(error) {
    //             alertFactory.error("Error al obtener datos del trabajo");
    //         })
    //     };
    //     //fecha
    //     $('#fechaTrabajo .input-group.date').datepicker({
    //         todayBtn: "linked",
    //         keyboardNavigation: true,
    //         forceParse: false,
    //         calendarWeeks: true,
    //         autoclose: true,
    //         todayHighlight: true,
    //         startDate: new Date()
    //     });
    //     //muestra el modal para la linea de tiempo
    //     $scope.showLineTime = function(idCita) {
    //         $('#lineaTiempoModal').appendTo("body").modal('show');
    //         getTimeLine(idCita);
    //     };
    //     //timeLine
    //     var getTimeLine = function(idCita) {
    //         trabajoRepository.getTimeLine(idCita).then(function(timeLine) {
    //             $scope.timeLine = timeLine.data;
    //         }, function(error) {
    //             alertFactory.error("Error al obtener timeLine");
    //         })
    //     };
    //     //obtiene los clientes
    //     var getCliente = function() {
    //         citaRepository.getCliente($scope.userData.idUsuario).then(function(cliente) {
    //             if (cliente.data.length > 0) {
    //                 $scope.clientes = cliente.data;
    //                 if ($scope.userData.idTipoUsuario == 4) {
    //                     for (var i = 0; i < $scope.clientes.length; i++) {
    //                         if ($scope.clientes[i].idCliente == $scope.userData.idCliente) {
    //                             $scope.selectedCliente = $scope.clientes[i];
    //                         };
    //                     };
    //                 };
    //                 alertFactory.success("Clientes cargados");
    //             } else {
    //                 alertFactory.info("No se encontraron clientes");
    //             }
    //         }, function(error) {
    //             alertFactory.error("Error al cargar clientes");
    //         });
    //     };
    //     //Modal Adjuntar Formato
    //     $scope.formatoRecepcion = function(cita) {
    //         if (cita.idTipoCita == 4) {
    //             $scope.idTrabajoUpl = cita.idTrabajo;
    //             $scope.idCitaUpld = cita.idCita;
    //             $scope.idUnidadUpl = cita.idUnidad;
    //             $('#evidencia').appendTo('body').modal('show');
    //         } else {
    //             localStorageService.set('cita', cita);
    //             location.href = '/comprobanteRecepcion';
    //         }
    //     };
    //     //obtiene el tipo de cita
    //     var getTipoCita = function() {
    //         citaRepository.getTipoCita().then(function(citas) {
    //             if (citas.data.length > 0) {
    //                 $scope.tiposCita = citas.data;
    //                 alertFactory.success("Tipos de citas cargados");
    //             }
    //         }, function(error) {
    //             alertFactory.error("Error al obtener tipos de cita");
    //         });
    //     };
    //     //realiza la obtención de idCita para su edición
    //     $scope.editaCita = function(idCita, idUnidad, edita, cita) {
    //         localStorageService.set('IDUNIDAD', idUnidad);
    //         localStorageService.set('idCitaActualizar', idCita);
    //         localStorageService.set('ModoEdicion', edita);
    //         localStorageService.set('citaEdicion', idCita);
    //         localStorageService.set('cita', cita);
    //         localStorageService.set('unidad', cita);
    //         location.href = "nuevacita"
    //     };
    //     //realiza la actualización de partidas de la cita
    //     $scope.updateCita = function() {
    //         if (($scope.datosCita.fechaCita != undefined && $scope.datosCita.fechaCita != "") && ($scope.datosCita.horaCita != undefined && $scope.datosCita.horaCita != "") &&
    //             ($scope.datosCita.trabajoCita != undefined && $scope.datosCita.trabajoCita != "") && ($scope.labelItems > 0) &&
    //             ($scope.procesAutotanque != "") && ($scope.idEstadoAutotanque != "")) {
    //             if (($scope.procesAutotanque == "1" && $scope.requiereGrua == undefined) || ($scope.procesAutotanque == "1" && $scope.clasificacionCita == "")) {
    //                 alertFactory.info("Llene todos los campos");
    //             } else {
    //                 if ($scope.userData.idTipoUsuario != 4 && $scope.datosCita.idTaller == undefined) {
    //                     alertFactory.info("Seleccione un Taller");
    //                 } else {
    //                     $scope.datosCita.pieza = "";
    //                     compareList($scope.arrayOriginal, $scope.listaPiezas);
    //                     joinListsItems();
    //                     $scope.datosCita.pieza = JSON.parse(JSON.stringify($scope.listaPiezas));
    //                     var citaTaller = {};
    //                     citaTaller.idCita = localStorageService.get('idCitaActualizar');
    //                     citaTaller.idUnidad = localStorageService.get('IDUNIDAD');
    //                     citaTaller.idTaller = $scope.datosCita.idTaller;
    //                     citaTaller.fecha = $scope.datosCita.fechaCita + ' ' + $scope.datosCita.horaCita;
    //                     citaTaller.trabajo = $scope.datosCita.trabajoCita;
    //                     citaTaller.observacion = $scope.datosCita.observacionCita;
    //                     citaTaller.idUsuario = $scope.userData.idUsuario;
    //                     citaTaller.idTipoCita = $scope.clasificacionCita;
    //                     $scope.procesAutotanque == "4" ? citaTaller.idTipoCita = $scope.procesAutotanque : citaTaller.idTipoCita;
    //                     citaTaller.idTrasladoUnidad = $scope.requiereGrua;
    //                     citaTaller.idEstadoAutotanque = $scope.idEstadoAutotanque;
    //                     citaRepository.updateCita(citaTaller).then(function(cita) {
    //                         citaTaller.idCita = $scope.idCitaToUpdate;
    //                         if (citaTaller.idCita > 0) {
    //                             alertFactory.success("Se agendó correctamente");
    //                             $scope.clearInputs();
    //                             if ($scope.datosCita.pieza != "") {
    //                                 $scope.datosCita.pieza.forEach(function(pieza, i) {
    //                                     var item = {};
    //                                     item.idCita = citaTaller.idCita;
    //                                     item.idTipoElemento = pieza.idTipoElemento;
    //                                     item.idElemento = pieza.idItem;
    //                                     item.cantidad = pieza.cantidad;
    //                                     item.accion = pieza.accion;
    //                                     citaRepository.addCitaDetalle(item).then(function(piezaInserted) {
    //                                         if (piezaInserted.data.length > 0) {
    //                                             alertFactory.success("Se insertó correctamente");
    //                                         }
    //                                         if (($scope.datosCita.pieza.length - i) == 1) {
    //                                             citaRepository.enviarMailConfirmacion(citaTaller.idCita, $scope.userData.idTipoUsuario).then(function(enviado) {
    //                                                 if (enviado.data.length > 0) {
    //                                                     alertFactory.success("e-mail enviado");
    //                                                     localStorageService.set('objCita', citaTaller);
    //                                                     localStorageService.remove('stgListaPiezas');
    //                                                     alertFactory.success("Cita actualizada correctamente");
    //                                                     setTimeout(function() {
    //                                                         location.href = '/tallercita';
    //                                                     }, 1000);
    //                                                 } else {
    //                                                     alertFactory.info("No se envío el e-mail");
    //                                                 }
    //                                             }, function(error) {
    //                                                 alertFactory.error("Error al enviar el e-mail")
    //                                             });
    //                                         }
    //                                     }, function(error) {
    //                                         alertFactory.error("Error al insertar servicios");
    //                                     });
    //                                 });
    //                             }
    //                         }
    //                     }, function(error) {
    //                         alertFactory.error("Error al insertar la cita");
    //                     });
    //                 }
    //             }
    //         } else if (($scope.datosCita.fechaCita != undefined && $scope.datosCita.fechaCita != "") &&
    //             ($scope.datosCita.horaCita != undefined && $scope.datosCita.horaCita != "") &&
    //             ($scope.datosCita.trabajoCita != undefined && $scope.datosCita.trabajoCita != "") &&
    //             ($scope.labelItems <= 0)) {
    //             alertFactory.info("Llene la Pre-Orden");
    //         } else {
    //             alertFactory.info("Llene todos los campos");
    //         }
    //     };
    //     var getidCita = function(idCita) {
    //         citaRepository.getidCita(idCita).then(function(result) {
    //             if (result.data.length > 0) {
    //                 var citaDato = result.data;
    //                 $scope.idCitaToUpdate = citaDato[0].idCita;
    //                 $scope.datosCita.razonSocial = citaDato[0].razonSocial;
    //                 $scope.datosCita.direccion = citaDato[0].direccion;
    //                 $scope.datosCita.idTaller = citaDato[0].tallerid;
    //                 if (citaDato[0].idEstadoAutotanque != '' && citaDato[0].idEstadoAutotanque != null) {
    //                     $scope.idEstadoAutotanque = citaDato[0].idEstadoAutotanque.toString();
    //                 }
    //                 citaDato[0].NumCita == 4 ? $scope.procesAutotanque = "4" : $scope.procesAutotanque = "1";
    //                 if (citaDato[0].NumCita != 4) {
    //                     $scope.clasificacionCita = citaDato[0].NumCita.toString();
    //                 }
    //                 if (citaDato[0].idTrasladoUnidad != null) {
    //                     $scope.requiereGrua = citaDato[0].idTrasladoUnidad.toString();
    //                 }
    //                 $scope.datosCita.fechaCita = citaDato[0].fechaCita;
    //                 $scope.datosCita.horaCita = citaDato[0].horaCita;
    //                 $scope.datosCita.trabajoCita = citaDato[0].trabajo;
    //                 $scope.datosCita.observacionCita = citaDato[0].observacion;
    //                 $scope.datosCita.selectedCliente = citaDato[0].idCliente;
    //                 citaRepository.getCliente($scope.userData.idUsuario).then(function(cliente) {
    //                     if (cliente.data.length > 0) {
    //                         $scope.clientes = cliente.data;
    //                         for (var i = 0; i < $scope.clientes.length; i++) {
    //                             if ($scope.clientes[i].idCliente == citaDato[0].idCliente) {
    //                                 $scope.selectedCliente = $scope.clientes[i];
    //                             };
    //                         };
    //                     } else {
    //                         alertFactory.info("No se encontraron clientes");
    //                     }
    //                 }, function(error) {
    //                     alertFactory.error("Error al cargar clientes");
    //                 });
    //                 localStorageService.set('idtallerselected', $scope.datosCita.idTaller);
    //                 $scope.datosCita.idTaller = localStorageService.get('idtallerselected');
    //                 localStorageService.remove('idtallerselected');
    //                 alertFactory.success("Datos encontado");
    //             } else {
    //                 alertFactory.info("No se encontraron datos");
    //             }
    //         }, function(error) {
    //             alertFactory.error("Error al cargar datos");
    //         });
    //     };
    //     //cambia el estatus de la cita a cancelada
    //     $scope.dropCita = function(idCita) {
    //         citaRepository.dropCita(idCita).then(function(result) {
    //                 $scope.algo = result.data;
    //             },
    //             function(error) {});
    //         $('#finalizarTrabajoModal').modal('hide');
    //         location.href = '/tallercita';
    //     };
    //     //Abre la modal para la cancelación de la cita
    //     $scope.openFinishingTrabajoModal = function(idCita) {
    //         $scope.idCita = idCita;
    //         $('.btnTerminarTrabajo').ready(function() {
    //             swal({
    //                     title: "¿Esta seguro que desea cancelar la cita?",
    //                     text: "Se cambiará el estatus a 'Cita Cancelada'",
    //                     type: "warning",
    //                     showCancelButton: true,
    //                     confirmButtonColor: "#65BD10",
    //                     confirmButtonText: "Si",
    //                     cancelButtonText: "No",
    //                     closeOnConfirm: false,
    //                     closeOnCancel: false
    //                 },
    //                 function(isConfirm) {
    //                     if (isConfirm) {
    //                         $scope.dropCita($scope.idCita);
    //                         swal("Trabajo terminado!", "La cita se ha cancelado", "success");
    //                     } else {
    //                         swal("No cancelado", "", "error");
    //                         $('#finalizarTrabajoModal').modal('hide');
    //                     }
    //                 });
    //         });
    //     };
    //     var datosCitaBien = function() {
    //         if (localStorageService.get('cita') != null) {
    //             $scope.numEconomico = $scope.citaDatos.numEconomico;
    //             $scope.modeloMarca = $scope.citaDatos.modeloMarca;
    //             $scope.trabajo = $scope.citaDatos.trabajo;
    //         }
    //     };
    //     //obtiene la preorden
    //     var busquedaServicioDetalle = function(idCita) {
    //         citaRepository.busquedaServicioDetalle(idCita)
    //             .then(function(result) {
    //                 $scope.listaPiezas = result.data;
    //                 $scope.arrayOriginal = JSON.parse(JSON.stringify($scope.listaPiezas));
    //                 $scope.labelItems = $scope.arrayOriginal.length;
    //             }, function(error) {
    //                 alertFactory.error('Error');
    //             });
    //     };
    //     //lista de items eliminados
    //     $scope.arrayDeletes = [];
    //     var compareList = function(arrayOriginal, arrayChanged) {
    //         //items existentes en ambos arrays
    //         arrayOriginal.forEach(function(itemOriginal, i) {

    //             if (!(existsItem(arrayChanged, itemOriginal))) {
    //                 $scope.arrayOriginal[i].accion = 3;
    //                 $scope.arrayDeletes.push(itemOriginal);
    //             }
    //         });
    //     };
    //     //realiza la unión de items en un solo array
    //     var joinListsItems = function() {
    //         if ($scope.arrayDeletes.length > 0) {
    //             $scope.arrayDeletes.forEach(function(item) {
    //                 $scope.listaPiezas.push(item);
    //             });
    //         }
    //     };
    //     //valida si ya existe el item en lalista
    //     var existsItem = function(piezas, item) {
    //         var exists = false;
    //         piezas.forEach(function(p, i) {
    //             if (p.idItem === item.idItem) {
    //                 if (p.cantidad !== item.cantidad) {
    //                     $scope.listaPiezas[i].accion = 2;
    //                 }
    //                 exists = true;
    //             }
    //         });
    //         return exists;
    //     };
    //     //Devuelve los estados de un autotanque
    //     var getEstadoAutotanque = function() {
    //         citaRepository.getEstadoAutotanque().then(function(result) {
    //             if (result.data.length > 0) {
    //                 $scope.estadosAutotanque = result.data;
    //             } else {
    //                 alertFactory.info('No se pudieron obtener los estados de un autotanque.');
    //             }
    //         }, function(error) {
    //             alertFactory.error('No se pudieron obtener los estados de un autotanque.');
    //         });
    //     };
    //     //Devuelve los traslados de un autotanque
    //     var getTrasladoUnidad = function() {
    //         citaRepository.getTrasladoUnidad().then(function(result) {
    //             if (result.data.length > 0) {
    //                 $scope.TrasladosUnidad = result.data;
    //             } else {
    //                 alertFactory.info('No se pudieron obtener los traslados de la unidad');
    //             }
    //         }, function(error) {
    //             alertFactory.error('No se pudieron obtener los traslados.');
    //         });
    //     };
    //     //call backs of drop zone
    //     $scope.dzCallbacks = {
    //         'addedfile': function(file) {
    //             $scope.newFile = file;
    //         },
    //         'sending': function(file, xhr, formData) {
    //             formData.append('idTrabajo', $scope.idTrabajoNew);
    //             formData.append('idCotizacion', 0);
    //             formData.append('idCategoria', 2);
    //             formData.append('idNombreEspecial', 1);
    //         },
    //         'completemultiple': function(file, xhr) {
    //             var checkErrorFile = file.some(checkExistsError);
    //             if (!checkErrorFile) {
    //                 var allSuccess = file.every(checkAllSuccess);
    //                 if (allSuccess) {
    //                     setTimeout(function() {
    //                         $scope.dzMethods.removeAllFiles(true);
    //                         $('#evidencia').appendTo('body').modal('hide');
    //                         $scope.busquedaCita('');
    //                     }, 1000)
    //                 }
    //             }
    //         },
    //         'error': function(file, xhr) {
    //             if (!file.accepted) {
    //                 $scope.dzMethods.removeFile(file);
    //             } else {
    //                 $scope.dzMethods.removeAllFiles(true);
    //                 alertFactory.info("No se pudieron subir los archivos");
    //             }
    //         },
    //     };
    //     //comprobante recepción cargada
    //     $scope.updateEstatusTrabajo = function() {
    //         trabajoRepository.insertTrabajo($scope.idCitaUpld, $scope.userData.idUsuario, $scope.idUnidadUpl)
    //             .then(function(trabajo) {
    //                 $scope.idTrabajoNew = trabajo.data[0].idTrabajo;
    //                 if ($scope.idTrabajoNew != null) {
    //                     $scope.dzMethods.processQueue();
    //                 }
    //             }, function(error) {
    //                 alertFactory.error("Error al insertar el trabajo");
    //             });
    //     };
    //     $scope.dzMethods = {};
    //     //valida si todos son success
    //     function checkAllSuccess(file, index, array) {
    //         return file.status === 'success';
    //     };
    //     //valida si existe algún error
    //     function checkExistsError(file) {
    //         return file.status === 'error';
    //     };
    //     //validación de fechas y horarios
    //     $scope.validaHoraCita = function() {
    //         var currentDate = new Date();
    //         if ($scope.datosCita.horaCita != null && $scope.datosCita.fechaCita) {
    //             var horaArray = $scope.datosCita.horaCita.split(':');
    //             var fechaArray = $scope.datosCita.fechaCita.toString().split('/');
    //             var fechaComparacion = new Date(fechaArray[2], fechaArray[0] - 1, fechaArray[1], horaArray[0] - 1, horaArray[1]);
    //             if (!(fechaComparacion >= currentDate)) {
    //                 $scope.datosCita.horaCita = null;
    //                 alertFactory.info("Debe agendar citas con 1 hora de anticipación como mínimo.")
    //             }
    //         }
    //     };
    //     //Recupera la preOrden de Servicio de una Cita
    //     $scope.getPreCotizacion = function(idCita) {
    //         citaRepository.getPreOrden(idCita).then(function(preCotizaciones) {
    //             if (preCotizaciones.data.length > 0) {
    //                 $scope.preCotizaciones = preCotizaciones.data;
    //                 if (preCotizaciones.data.length == 1) {
    //                     if (preCotizaciones.data[0].numeroCotizacion == 'PRE-COTIZACION') {
    //                         $scope.isPreCotizacion = true;
    //                     } else {
    //                         $scope.isPreCotizacion = false;
    //                     }
    //                 } else {
    //                     $scope.isPreCotizacion = false;
    //                 }
    //             }
    //         }, function(error) {
    //             alertFactory.error('No se pudieron obtener las cotizaciones para esta cita');
    //         });
    //     };
    //     //Elimina Pre-Cotizacion
    //     $scope.deletePreCotizacion = function(idCita, idCotizacion) {
    //         citaRepository.eliminaPreCotizacion(idCita, idCotizacion).then(function(result) {
    //             if (result.data.length > 0) {
    //                 alertFactory.success('Cotización eliminada correctamente');
    //                 $scope.busquedaCita('');
    //             }
    //         }, function(error) {
    //             alertFactory.error('No se pudo eliminar la cotización');
    //         });
    //     };
    //     $scope.asignaTipoCotizacion = function(idCita) {
    //         $('.btnNvaCotizar').ready(function() {
    //             swal({
    //                     title: "¿Qué tipo de cotización desea crear?",
    //                     text: "",
    //                     type: "success",
    //                     showCancelButton: true,
    //                     confirmButtonColor: "#E6C200",
    //                     cancelCotizacionButtonColor: "#1f90d8",
    //                     confirmButtonText: "Servicio",
    //                     cancelButtonText: "Refacciones",
    //                     closeOnConfirm: false,
    //                     closeOnCancel: false
    //                 },
    //                 function(isConfirm) {
    //                     if (isConfirm) {
    //                         swal('Cotización: Servicio', '', 'success');
    //                         localStorageService.set('tipoCotizacion', 1);
    //                         $scope.nuevaCotizacion(idCita);
    //                     } else {
    //                         swal("Cotización: Refacciones", '', 'success');
    //                         localStorageService.set('tipoCotizacion', 2);
    //                         $scope.nuevaCotizacion(idCita);
    //                     }
    //                 });
    //         });
    //     };
    //     //valida el envío de cotizaciones a aprobación
    //     $scope.enviaAprobacion = function(cita) {
    //         var validaUtilidad = false;
    //         $scope.cita = cita;
    //         var uitilidad = (cita.precioOrden - cita.montoOrden) / cita.precioOrden;
    //         $scope.margen = ((cita.precioOrden - cita.montoOrden) * 100) / cita.precioOrden;
    //         var UtilidadNeta = 0;
    //         $scope.idTrabajo = cita.idTrabajo;
    //         if (cita.idEstatus == 15) {
    //             var existePrecotizacion = $scope.preCotizaciones.some(checkExistsPrecotizacion);
    //             if (!existePrecotizacion) {
    //                 console.log("no existe");
    //                 ordenServicioRepository.getParametro(1, 'MV').then(function(parametro) {
    //                     if (parametro.data.length > 0) {
    //                         UtilidadNeta = parametro.data[0].valor;
    //                         //verifica si la unidad ya llegó al taller
    //                         ordenServicioRepository.getEstatusUtilidad(cita.idTrabajo, 1).then(function(estatusUtilidad) {
    //                             if (estatusUtilidad.data.length > 0) {
    //                                 if (estatusUtilidad.data[0].estatus == 1) {
    //                                     modal_tiket($scope, $modal, estatusUtilidad.data[0].idAprobacionUtilidad, 'Cita', $scope.aprobacionCita, '');
    //                                 } else {
    //                                     $scope.aprobacionCita();
    //                                 }
    //                             } else {
    //                                 if (UtilidadNeta > uitilidad) {
    //                                     //Detalle de la cotiazacion
    //                                     $('.modal-dialog').css('width', '1050px');
    //                                     modal_detalle_cotizacion($scope, $modal, $scope.idTrabajo, 'Cita', $scope.margen, $scope.saveUtilidad, '');
    //                                 } else {
    //                                     $scope.aprobacionCita();
    //                                 }
    //                             }
    //                         }, function(error) {
    //                             alertFactory.error("Error al cargar la orden");
    //                         });
    //                     }
    //                 }, function(error) {
    //                     alertFactory.error("Error en la consulta");
    //                 });
    //             } else {
    //                 alertFactory.info("Falta asignar la cotización");
    //             }
    //         } else {
    //             alertFactory.info("No se podrán enviar las cotizaciones a Aprobación, la unidad aún no llega al taller");
    //         }
    //     };
    //     $scope.aprobacionCita = function() {
    //         citaRepository.enviaAprobacion($scope.cita.idCita).then(function(result) {
    //             if (result.data[0].respuesta != 0) {
    //                 alertFactory.success('Cotizaciones enviadas a aprobación');
    //                 location.href = '/cotizacionconsulta';
    //             }
    //         }, function(error) {
    //             alertFactory.error('No se pudieron enviar las cotizaciones  a Aprobación');
    //         });
    //     };
    //     //UTILIDAD
    //     $scope.saveUtilidad = function() {
    //         $('.modal-dialog').css('width', '600px');
    //         ordenServicioRepository.putAprobacionUtilidad($scope.idTrabajo, $scope.userData.idUsuario, 1, $scope.margen).then(function(aprobacionUtilidad) {
    //             if (aprobacionUtilidad.data[0].id > 0) {
    //                 //CORREO
    //                 ordenServicioRepository.enviarNotificacionUtilidad($scope.idTrabajo, $scope.userData.idUsuario).then(function(mail) {
    //                     if (mail.data[0].enviado == 1) {
    //                         swal({
    //                             title: "Advertencia",
    //                             text: "La orden se envió a aprobación por que el margen de utilidad es menor a lo esperado.",
    //                             type: "warning",
    //                             showCancelButton: false,
    //                             confirmButtonColor: "#67BF11",
    //                             confirmButtonText: "Aceptar",
    //                             cancelButtonText: "No",
    //                             closeOnConfirm: true,
    //                             closeOnCancel: true
    //                         });
    //                     }
    //                 }, function(error) {
    //                     alertFactory.error("Error al enviar mail");
    //                 });
    //             }
    //         }, function(error) {
    //             alertFactory.error("Error al cargar la orden");
    //         });
    //     };
    //     //valida si existe alguna precotización
    //     function checkExistsPrecotizacion(precotizacion) {
    //         return precotizacion.idCotizacion == null;
    //     };
    //     //Si es unidad parada el valor de tipo de cita es Correctiva
    //     $scope.unidadParada = function(estadoAutotanque) {
    //         if (estadoAutotanque == 1) {
    //             $scope.clasificacionCita = '2';
    //         } else {
    //             $scope.clasificacionCita = '';
    //         }
    //     };
    //     //deseleccion del radio
    //     $scope.radioSelect = function(procesAutotanque) {
    //         if (procesAutotanque == '') {
    //             $('input:radio[name=radioInline]').attr('checked', false);
    //         } else if (procesAutotanque == '1') {
    //             $('input:radio[name=radioInline]').attr('checked', false);
    //         }
    //     };
    //     function obtieneFechaActual() {
    //         var today = new Date();
    //         var dd = today.getDate();
    //         var mm = today.getMonth() + 1;
    //         var yyyy = today.getFullYear();
    //         if (dd < 10) {
    //             dd = '0' + dd
    //         }
    //         if (mm < 10) {
    //             mm = '0' + mm
    //         }
    //         var today = mm + '/' + dd + '/' + yyyy;
    //     };
    //     $scope.videoTutorialAdministrador = function() {
    //         window.open($rootScope.vIpServer + '/uploads/tutorial/citas_administrador.mp4', '_blank', 'Cita');
    //     };
    //     $scope.videoTutorialCliente = function() {
    //         window.open($rootScope.vIpServer + '/uploads/tutorial/citas_cliente.mp4', '_blank', 'Cita');
    //     };
});
