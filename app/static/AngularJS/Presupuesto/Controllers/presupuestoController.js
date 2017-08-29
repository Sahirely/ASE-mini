registrationModule.controller('presupuestoController', function($scope, $route, $routeParams, userFactory, $modal, $rootScope, presupuestoRepository, localStorageService, alertFactory, globalFactory) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'presupuesto'; // <<-- Para activar en que opción del menú se encuentra
    $scope.presupuestoTotal = 0.00;
    $scope.utilizadoTotal = 0.00;
    $scope.saldoTotal = 0.00;
    $scope.margenUtilizado = 0.00;
    $scope.margenTotal = 0.00;
    $scope.userData = userFactory.getUserData();
    $scope.numeroOrden = $routeParams.orden;
    $scope.lstPresupuestos = [];

    $scope.init = function() {
        userFactory.ValidaSesion();
        $scope.obtieneCentroTrabajo();
        $scope.cancelaAltaPresupuesto();
    }
    // Obtiene los centros de trabajo por operacion
    $scope.obtieneCentroTrabajo = function() {
        presupuestoRepository.getCentroTrabajo($scope.userData.idOperacion).then(function(result) {
            if (result.data.length > 0) {
                $scope.ctrabajos = result.data;
            } else {
                alertFactory.info("No se encontro ninguna TAR");
            }
        }, function(error) {
            alertFactory.error("Error al cargar las TAR");
        });
    }
    // Funcion que manda a llamar la peticion de obtener los presupuestos por idCentroTrabajo y idOperacion
    $scope.obtienePresupuesto = function() {
        $scope.presupuestoTotal = 0.00;
        $scope.utilizadoTotal = 0.00;
        $scope.saldoTotal = 0.00;
        if ($scope.selectedcTrabajo == "" || $scope.selectedcTrabajo == null) {
            $scope.selectedcTrabajo = { "idCentroTrabajo": null }
            $scope.datosPresupuesto();
        } else {
            $scope.datosPresupuesto();
        }
    }
    // Obtiene los datos de los presupuestos por el centro de trabajo
    $scope.datosPresupuesto = function() {
        $scope.dataPresupuestos = [];
        $scope.lstPresupuestos = [];
        $scope.itemPresupuesto = {};
        $scope.txtSolpe="";

        $('.dataTableCentroTrabajo').DataTable().destroy();
        presupuestoRepository.getPresupuesto($scope.selectedcTrabajo.idCentroTrabajo, $scope.userData.idOperacion).then(function(result) {
            if (result.data.length > 0) {
                $scope.dataPresupuestos = result.data;
                for (var i = 0; i < result.data.length; i++) {
                    $scope.presupuestoTotal += parseFloat(result.data[i].presupuesto);
                    $scope.utilizadoTotal += parseFloat(result.data[i].utilizado);
                    $scope.saldoTotal += parseFloat(result.data[i].saldo);

                    if ($scope.saldoTotal > 0) {
                        $scope.itemPresupuesto = { idPresupuesto: result.data[i].idPresupuesto, saldo: result.data[i].saldo, isChecked: false };
                        $scope.lstPresupuestos.push($scope.itemPresupuesto);
                    }

                };

                $scope.margenUtilizado = (($scope.presupuestoTotal - $scope.utilizadoTotal) * 100) / $scope.presupuestoTotal;
                $scope.margenTotal = (($scope.presupuestoTotal - $scope.saldoTotal) * 100) / $scope.presupuestoTotal;
                globalFactory.filtrosTabla("dataTableCentroTrabajo", "CentroTrabajo");
            } else {
                alertFactory.info("No existe información con los criterios de búsqueda");
            }
        }, function(error) {
            alertFactory.error("Error al obtener la información");
        });
    }
    //Limpiamos los campos de el presupuesto cuando el usuario cancela el proceso
    $scope.cancelaAltaPresupuesto = function() {
        $scope.folioPresupuesto = '';
        $scope.presupuesto = 0;
        $scope.fechaInicioPresupuesto = '';
        $scope.fechaFinalPresupuesto = '';
    }
    // datepicker para la fecha final e inicial del presupuesto
    $('#fechaFinal .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        format: "dd/mm/yyyy"
    });
    // datepicker para la fecha final e inicial del presupuesto
    $('#fechaInicial .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        format: "dd/mm/yyyy"
    });
    // Abre el modal para dar de alta un nuevo presupuesto
    $scope.nuevoPresupuesto = function() {
        $('#newPresupuestoModal').appendTo('body').modal('show');
    }
    // Guarda un nuevo presupuesto 
    $scope.savePresupuesto = function() {
        if (($scope.fechaInicioPresupuesto != undefined && $scope.fechaInicioPresupuesto != '') &&
            ($scope.fechaFinalPresupuesto != undefined && $scope.fechaFinalPresupuesto != '') &&
            ($scope.folioPresupuesto != undefined && $scope.folioPresupuesto != '')) {
            var valoresInicial = $scope.fechaInicioPresupuesto.split('/');
            var dateStringInicial = valoresInicial[2] + '-' + valoresInicial[1] + '-' + valoresInicial[0];
            var valoresFinal = $scope.fechaFinalPresupuesto.split('/');
            var dateStringFinal = valoresFinal[2] + '-' + valoresFinal[1] + '-' + valoresFinal[0];
            var solpe = $scope.txtSolpe == "" ? null : $scope.txtSolpe;
            $scope.aplicacion = [];
            presupuestoRepository.putNuevoPresupuesto($scope.presupuesto, $scope.folioPresupuesto, dateStringInicial, dateStringFinal, $scope.selectedcTrabajo.idCentroTrabajo, $scope.userData.idUsuario, solpe).then(function(result) {
                    if (result.data.length > 0) {
                        $scope.insertTraspaso(result.data[0].result);
                        alertFactory.success("Se guardo correctamente el Presupuesto");
                        $('#newPresupuestoModal').modal('hide');
                        $scope.obtienePresupuesto();
                        $scope.cancelaAltaPresupuesto();
                    } else {
                        $scope.dataPresupuestos = [];
                        alertFactory.info("No existe información con los criterios de búsqueda");
                    }
                },
                function(error) {
                    alertFactory.error("Error al procesar la información");
                });
        } else {
            alertFactory.info("Porfavor llene todos los campos.");
        }
    }
    // Activa el presupuesto para su uso cambia el estatus a activo
    $scope.activarPendiente = function(dataPresupuesto) {
        swal({
                title: "Advertencia",
                text: "Se activara el Presupuesto seleccionado y pondrá como pendiente la activa.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#67BF11",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    presupuestoRepository.putEstatusPresupuestoCDT(dataPresupuesto.idPresupuesto, dataPresupuesto.idCentroTrabajo).then(function(result) {;
                            if (result.data.length > 0) {
                                alertFactory.success("Se actualizo el estatus correctamente");
                                $scope.obtienePresupuesto();
                            }
                        },
                        function(error) {
                            alertFactory.error("Error al procesar la información");
                        });
                }
            });
    }
    //Obtiene la totalidad de las hojas de trabajo generadas en la historia
    $scope.verHistorial = function(idPresupuesto, saldo, folioPresupuesto, nombreCentroTrabajo) {
        $scope.saldoPresupuesto = saldo;
        $scope.folioPresupuesto = folioPresupuesto;
        $scope.nombreCentroTrabajo = nombreCentroTrabajo;
        $scope.precioOrdenHistorial = 0;
        $('.dataTableHojas').DataTable().destroy();
        presupuestoRepository.getHistorial(idPresupuesto).then(function(result) {
                if (result.data.length > 0) {
                    $scope.hojas = result.data;
                    for (var i = 0; i < $scope.hojas.length; i++) {
                        $scope.precioOrdenHistorial += $scope.hojas[i].venta;
                    };
                    globalFactory.filtrosTabla("dataTableHojas", "Hojas de Trabajo");
                    $('#certificadosModal').appendTo('body').modal('show');
                } else {
                    swal({
                        title: "Información",
                        text: "No se encuentra información asociada.",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#67BF11",
                        confirmButtonText: "Aceptar",
                        closeOnConfirm: true
                    });;
                }
            },
            function(error) {
                alertFactory.error("Error al obtener la información");
            });
    }
    // Detalle de las ordenes que estan en proceso y que esta por autorizar
    $scope.verDetalle = function(idCentroTrabajo, saldo, folioPresupuesto, nombreCentroTrabajo) {
        $scope.saldoPresupuesto = saldo;
        $scope.folioPresupuesto = folioPresupuesto;
        $scope.nombreCentroTrabajo = nombreCentroTrabajo;
        $scope.precioOrdenDetalle = 0;
        $('.dataTablePendientes').DataTable().destroy();
        presupuestoRepository.getDetalle(idCentroTrabajo).then(function(result) {
                if (result.data.length > 0) {
                    $scope.pendientes = result.data;
                    for (var i = 0; i < $scope.pendientes.length; i++) {
                        $scope.precioOrdenDetalle += $scope.pendientes[i].venta;
                    };
                    globalFactory.filtrosTabla("dataTablePendientes", "Ordenes Pendientes");
                    $('#ordenesModal').appendTo('body').modal('show');

                } else {
                    swal({
                        title: "Información",
                        text: "No se encuentra información asociada.",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonColor: "#67BF11",
                        confirmButtonText: "Aceptar",
                        closeOnConfirm: true
                    });;
                }
            },
            function(error) {
                alertFactory.error("Error al obtener la información");
            });
    }




    $scope.insertTraspaso = function(idDestino) {

        $scope.lstPresupuestos.forEach(function(item) {
            if (item.isChecked === true) {
                var data = {
                    idPresupuestoOrigen: item.idPresupuesto,
                    idPresupuestoDestino: idDestino,
                    monto: item.saldo
                };

                presupuestoRepository.insTraspasoPresupuesto(data).then(function(result) {
                    console.log(result);
                });
            }

        });
    }










});
/*   
    $scope.aprobarTrabajo = function (trabajo, valBotonera) {
        var objBotonera = {};
        objBotonera.accion = valBotonera;
        objBotonera.idCita = trabajo.idCita;
        localStorageService.set('objTrabajo', trabajo);
        localStorageService.set("botonera", objBotonera);
        location.href = '/ordenservicio';
    }*/