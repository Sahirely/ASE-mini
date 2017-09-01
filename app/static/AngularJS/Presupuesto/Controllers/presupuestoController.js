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
    $scope.showTransferPnl = false;
    $scope.sumTraspaso = 0.00;

    $scope.init = function() {
        userFactory.ValidaSesion();
        $scope.obtieneCentroTrabajo();
        $scope.cancelaAltaPresupuesto();
        $scope.obtienePresupuesto();
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

                   // if(result.data[i].idEstatusPresupuesto == 1 ){
                        $scope.presupuestoTotal += parseFloat(result.data[i].presupuesto);
                    //}

                    $scope.utilizadoTotal += parseFloat(result.data[i].utilizado);
                    $scope.saldoTotal += parseFloat(result.data[i].saldo);

                    if (result.data[i].saldo > 0) {
                        $scope.itemPresupuesto = { idPresupuesto: result.data[i].idPresupuesto, saldo: result.data[i].saldo, isChecked: false };
                        $scope.lstPresupuestos.push($scope.itemPresupuesto);
                    }

                };

                $scope.margenUtilizado = (($scope.presupuestoTotal - $scope.utilizadoTotal) * 100) / $scope.presupuestoTotal;
                $scope.margenTotal = (($scope.presupuestoTotal - $scope.saldoTotal) * 100) / $scope.presupuestoTotal;
                globalFactory.filtrosTabla("dataTableCentroTrabajo", "CentroTrabajo", 100);
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
        $scope.presupuestoEspecial = 0;
        $scope.folioPresupuesto = '';
        $scope.presupuesto = 0;
        $scope.fechaInicioPresupuesto = '';
        $scope.fechaFinalPresupuesto = '';
        $scope.showTransferPnl = false;
        $('#newPresupuestoModal').appendTo('body').modal('show');
    }

    $scope.changePresupuestoEspecial = function() {
        var especial = $scope.presupuestoEspecial === undefined || $scope.presupuestoEspecial === null ? 0 : $scope.presupuestoEspecial;

        if (especial == 0){
            $scope.presupuestoEspecial = 1;
            //se llena la tabla de ordenes del centro de trabajo para el nuevo presupuesto
            presupuestoRepository.getOrdenesByCT($scope.selectedcTrabajo.idCentroTrabajo, $scope.userData.contratoOperacionSeleccionada).then(function(result){
                $scope.OrdenesCT = result.data;
                $scope.sumatoriaSeleccionado = 0;
                $scope.totalOrdenesCT = 0;

                $scope.OrdenesCT.forEach(function (item){
                    $scope.totalOrdenesCT += item.venta;
                });

            }, function (error){
                $scope.OrdenesCT = [];
                $scope.sumatoriaSeleccionado = 0;
                $scope.totalOrdenesCT = 0;
                $scope.presupuestoEspecial = 0;
                alertFactory.info('Ocurrio un error al cargar las ordenes.');
            });
        }else{
            $scope.OrdenesCT = [];
            $scope.sumatoriaSeleccionado = 0;
            $scope.totalOrdenesCT = 0;
            $scope.presupuestoEspecial = 0;
        }
    }
    $scope.insertOrdenesEspecial = function(idPresupuesto){
        $scope.OrdenesCT.forEach(function(item){
            var itemAgrega = item.agregar === undefined || item.agregar === null ? false : item.agregar;
            if (itemAgrega){
                presupuestoRepository.insOrdenPresupuestoEspecial(item.idOrden, idPresupuesto, $scope.userData.idUsuario).then(function(result){
                    if (result.data.length > 0){
                      alertFactory.success("orden agregada exitosamente al presupuesto.");
                    }
                }, function (error){
                    alertFactory.info('Ocurrio un error al agregar las ordenes del presupuesto especial.');
                });
            }

        });
    }

    $scope.OrdenesAgregarEspecial = function(){
        var result = 0;

        if ($scope.OrdenesCT !== undefined){
            $scope.OrdenesCT.forEach(function(item){
                var itemAgrega = item.agregar === undefined || item.agregar === null ? false : item.agregar;

                if (itemAgrega){
                  result += 1;
                }
            });
        }

        return result;
    }

    $scope.updateSum = function(){
        $scope.sumatoriaSeleccionado = $scope.sumaOrdenesAgregar();
    }

    $scope.sumaOrdenesAgregar = function(){
        var result = 0;

        if ($scope.OrdenesCT !== undefined){
            $scope.OrdenesCT.forEach(function(item){
                var itemAgrega = item.agregar === undefined || item.agregar === null ? false : item.agregar;

                if (itemAgrega){
                  result += item.venta;
                }
            });
        }

        return result;
    }

    $scope.verOrdenesPresupuesto = function(preSelected){
          $scope.OrdenesPEspecial = [];
          $scope.folioPE = preSelected.folioPresupuesto;
          $scope.saldoPE = preSelected.saldo;
          $scope.sumTotalOrdenesPE = 0;
          $('.dataTableOrdenesPE').DataTable().destroy();
          presupuestoRepository.getOrdenesByPE(preSelected.idPresupuesto, $scope.userData.contratoOperacionSeleccionada).then(function(result){
                if (result.data.length > 0){
                  $scope.OrdenesPEspecial = result.data;

                  $scope.OrdenesPEspecial.forEach(function (item){
                      $scope.sumTotalOrdenesPE += item.venta;
                  });
                  globalFactory.filtrosTabla("dataTableOrdenesPE", "Ordenes de Presupuesto Especial", 5);
                  $('#OrdenesPEModal').appendTo('body').modal('show');
                }
          }, function(error){
            alertFactory.error('Ocurrio un error al obtener las Ordenes del presupuesto especial seleccionado.');
          });
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
            var especial = $scope.presupuestoEspecial === undefined || $scope.presupuestoEspecial === null ? 0 : $scope.presupuestoEspecial;
            $scope.aplicacion = [];
            if (($scope.OrdenesAgregarEspecial() > 0 && especial == 1 && $scope.sumaOrdenesAgregar() <= $scope.presupuesto) || (especial == 0)){
                presupuestoRepository.putNuevoPresupuesto($scope.presupuesto, $scope.folioPresupuesto, dateStringInicial, dateStringFinal, $scope.selectedcTrabajo.idCentroTrabajo, $scope.userData.idUsuario, solpe, especial).then(function(result) {
                        if (result.data.length > 0) {
                            $scope.insertTraspaso(result.data[0].result);
                            if (especial == 1){
                              $scope.insertOrdenesEspecial(result.data[0].result);
                            }
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
                alertFactory.info("Debe seleccionar mínimo una orden para un presupuesto especial.");
                alertFactory.info("El total de las ordenes no debe exceder el total del presupuesto.");
            }
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
        $scope.hojas = [];
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
                    globalFactory.filtrosTabla("dataTableHojas", "Hojas de Trabajo", 5);
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
                    globalFactory.filtrosTabla("dataTablePendientes", "Ordenes Pendientes", 5);
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



    $scope.showTransferDetail = function(idPresupúesto) {
        $scope.lstTraspasos =[];
        presupuestoRepository.getTraspasos(idPresupúesto).then(function(result) {
                    $scope.lstTraspasos = result.data;
                    $('#fondosOsurModal').appendTo('body').modal('show');
                });
    }


    $scope.showPanelTransfer = function() {

        if($scope.showTransferPnl === false){
            $scope.showTransferPnl = true;
        }else{
            $scope.showTransferPnl = false;
        }

        $scope.lstPresupuestos.forEach(function(item) {
                item.isChecked = false;
            });

        $scope.sumTraspaso =0.00;
    }


    $scope.sumTraspasoSaldos = function(objPresupuesto) {

        $scope.sumTraspaso = parseFloat($scope.presupuesto == '' ? 0 : $scope.presupuesto);

        if (objPresupuesto !== undefined){
        presupuestoRepository.hasCompletePayment(objPresupuesto.idPresupuesto).then(function(result) {

            if(result.data[0].result == 1 ){
                    $scope.lstPresupuestos.forEach(function(item) {
                        if (item.isChecked == true) {
                            $scope.sumTraspaso += parseFloat(item.saldo);
                        }
                    });
            }
            else{
                objPresupuesto.isChecked= false;
                alertFactory.info("El saldo del presupuesto especial no se puede seleccionar porque cuenta con ordenes pendientes de cobro.");
            }

        });
      } else{
            $scope.lstPresupuestos.forEach(function(item) {
                if (item.isChecked == true) {
                    $scope.sumTraspaso += parseFloat(item.saldo);
                }
            });
      }
    }

    $scope.change_presupuesto = function(){
      $scope.sumTraspasoSaldos();
    }

    $scope.hasCompletePayment = function(idPresupúesto) {

    presupuestoRepository.hasCompletePayment(idPresupúesto).then(function(result) {
            console.log(result.data[0].result);
            return  result.data[0].result;
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
