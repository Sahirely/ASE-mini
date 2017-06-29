registrationModule.controller('osurController', function ($scope, alertFactory, globalFactory, osurRepository, citaRepository, localStorageService) {
    $scope.presupuestoTotal=0.00;
    $scope.utilizadoTotal=0.00;
    $scope.saldoTotal=0.00;
    $scope.conTar = false;
    $scope.selectedTar = "";
    $scope.selectedCliente = "";
    $scope.fechaInicial = '';
    $scope.fechaFinal = '';
    $scope.folio = '';
    $scope.solpe = '';
    $scope.presupuesto = 0;
    $scope.verificaDatosOsur = '';

    $scope.init = function () {
        getTARS();
        $scope.getCliente ();
    }

    var getTARS = function () {
        osurRepository.getTars($scope.userData.idUsuario).then(function (tars) {
            if (tars.data.length > 0) {
                $scope.tars = tars.data;
                //alertFactory.success("Trabajos cargados");
            } else {
                alertFactory.info("No se encontro ninguna TAR");
            }
        }, function (error) {
            alertFactory.error("Error al cargar las TAR");
        });
    }

    $scope.getCliente = function () {
        citaRepository.getCliente($scope.userData.idUsuario).then(function (cliente) {
            if (cliente.data.length > 0) {
                $scope.clientes = cliente.data;
                alertFactory.success("Clientes cargados");
            } else {
                alertFactory.info("No se encontraron clientes");
            }
        }, function (error) {
            alertFactory.error("Error al cargar clientes");
        });
    }

    $scope.validateCliente = function (){
        if ($scope.selectedCliente != "" && $scope.selectedCliente != null ) {
                if ($scope.selectedCliente.idCliente == 1) {
                    return true;
                }else{
                 return false;
             } 
         }else{
            return false;
        }

    }

    $scope.changeCliente = function (){
        $scope.verificaDatosOsur = '';
        if ($scope.selectedCliente != null) {
            $scope.presupuestoTotal=0.00;
            $scope.utilizadoTotal=0.00;
            $scope.saldoTotal=0.00;
            $('.dataTableOsur').DataTable().destroy();
            $scope.datosOsur=[];
            if ($scope.selectedCliente.idCliente != 1) {
                $scope.selectedTar = "";
                $scope.GetMonto();
            }
        }
    }

    $scope.GetMonto = function () {
        $scope.presupuestoTotal=0.00;
        $scope.utilizadoTotal=0.00;
        $scope.saldoTotal=0.00;
        if ($scope.selectedCliente.idCliente == 1) {
            if ($scope.selectedTar == "" || $scope.selectedTar == null) {
                //$scope.conTar = false;
                //alertFactory.info("Debe seleccionar una TAR");
                $scope.selectedTar = { "idTAR": null }
                $scope.datos_osur();       
            } else {
                $scope.datos_osur();
            }
        }else{
                $scope.datos_osur();
        }   
    }

    $scope.datos_osur= function () {
        $scope.conTar = true;
        $('.dataTableOsur').DataTable().destroy();
        osurRepository.getDatosOsur($scope.selectedTar.idTAR, $scope.selectedCliente.idCliente).then(function (result) {
            if (result.data.length > 0) {
                $scope.datosOsur = result.data;

                for(var i=0;i<result.data.length;i++){
                    $scope.presupuestoTotal += parseFloat(result.data[i].presupuesto);
                    $scope.utilizadoTotal += parseFloat(result.data[i].utilizado);
                    $scope.saldoTotal += parseFloat(result.data[i].saldo);
                };
                $scope.verificaDatosOsur = 1;
                globalFactory.waitDrawDocument("dataTableOsur", "Utilidad");
            } else {
                $scope.datosOsur = [];
                alertFactory.info("No existe información con los criterios de búsqueda");
            }
        },function (error) {
            alertFactory.error("Error al obtener la información");
        });
    }

    $scope.validateTAR = function() {
        if ($scope.selectedCliente != "" && $scope.selectedCliente != null) {
            if ($scope.selectedCliente.idCliente == 1) {
                if ($scope.selectedTar !== "") {
                    return true;
                }else{
                    return false;
                }
            }else{
             return true;
            } 
        }else{
            return false;
        }

    }

        //fecha
        $('#fechaFinal .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true,
            format: "dd/mm/yyyy"
        });

        $('#fechaInicial .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true,
            format: "dd/mm/yyyy"
        });

    $scope.change_presupuesto = function (){
        $scope.presupuestoSumaTotal= parseFloat($scope.presupuesto) + parseFloat($scope.presupuestoSuma);
    }

    //Ventana Modal
    $scope.nuevaOsur = function () {
        $('#newOsurModal').appendTo('body').modal('show');
        $scope.tarNuevo=$scope.selectedTar.nombreTar;
        $scope.cliente=$scope.selectedCliente.nombre;
        $scope.presupuestoSuma=0;
        $scope.presupuestoSumaTotal=0;
        $scope.presupuesto=0;
        var indice= 0;
        $scope.sumaOsur=[];
        $scope.conTar = true;
       // $('.dataTablePresupuestos').DataTable().destroy();
       if($scope.selectedTar != ''){
        osurRepository.getDatosOsur($scope.selectedTar.idTAR, $scope.selectedCliente.idCliente).then(function (result) {
            if (result.data.length > 0) {
                if($scope.selectedTar.idTAR != $scope.datosOsur[0].idTAR){
                    $('.dataTableOsur').DataTable().destroy();
                    $scope.datosOsur = result.data;
                    $scope.presupuestoTotal=0.00;
                    $scope.utilizadoTotal=0.00;
                    $scope.saldoTotal=0.00;
                    for(var i=0;i<$scope.datosOsur.length;i++){             
                        if ($scope.datosOsur[i].estatus === 'Utilizado'  && $scope.datosOsur[i].idAplicacion === null && $scope.datosOsur[i].saldo > 0 ) {
                            obj = new Object();
                            obj.idOsur= $scope.datosOsur[i].idOsur;
                            obj.folio = $scope.datosOsur[i].folio;
                            obj.saldo = $scope.datosOsur[i].saldo;
                            obj.estatus = $scope.datosOsur[i].estatus;
                            obj.indice = indice;
                            obj.class_suma = 'glyphicon glyphicon-plus';
                            $scope.sumaOsur.push(obj);
                            indice +=1;
                        }  
                    };
                    for(var i=0;i<result.data.length;i++){
                        $scope.presupuestoTotal += parseFloat(result.data[i].presupuesto);
                        $scope.utilizadoTotal += parseFloat(result.data[i].utilizado);
                        $scope.saldoTotal += parseFloat(result.data[i].saldo);
                    };
                    globalFactory.waitDrawDocument("dataTableOsur", "Utilidad");
                           // globalFactory.waitDrawDocument("dataTablePresupuestos", "Presupuesto");
                       }else{
                        for(var i=0;i<result.data.length;i++){             
                            if (result.data[i].estatus === 'Utilizado'  && result.data[i].idAplicacion === null && result.data[i].saldo > 0 ) {
                                obj = new Object();
                                obj.idOsur= result.data[i].idOsur;
                                obj.folio = result.data[i].folio;
                                obj.saldo = result.data[i].saldo;
                                obj.estatus = result.data[i].estatus;
                                obj.indice = indice;
                                obj.class_suma = 'glyphicon glyphicon-plus';
                                $scope.sumaOsur.push(obj);
                                indice +=1;
                            }  
                        };
                    }

                } else {
                    $scope.datosOsur = [];
                }
            },function (error) {
                alertFactory.error("Error al obtener la información");
            });
        }
    }


    $scope.sumaPresupuesto = function (indice){       
        if ($scope.sumaOsur[indice].class_suma === 'glyphicon glyphicon-plus') {
            $scope.presupuestoSuma+= $scope.sumaOsur[indice].saldo;
            $scope.sumaOsur[indice].class_suma ='glyphicon glyphicon-minus'
        }else{
            $scope.presupuestoSuma-= $scope.sumaOsur[indice].saldo;
            $scope.sumaOsur[indice].class_suma ='glyphicon glyphicon-plus'
        }
        $scope.presupuestoSumaTotal= parseFloat($scope.presupuesto) + parseFloat($scope.presupuestoSuma);
    }

    $scope.saveOsur = function () {    
        if (($scope.fechaInicial != undefined && $scope.fechaInicial != '') && ($scope.fechaFinal != undefined && $scope.fechaFinal != '') && 
            ($scope.folio != undefined && $scope.folio != '') && ($scope.solpe != undefined && $scope.solpe != '')) {

            var valoresInicial = $scope.fechaInicial.split('/');
        var dateStringInicial = valoresInicial[2] + '-' + valoresInicial[1] + '-' + valoresInicial[0];

        var valoresFinal = $scope.fechaFinal.split('/');
        var dateStringFinal = valoresFinal[2] + '-' + valoresFinal[1] + '-' + valoresFinal[0];
        $scope.aplicacion=[];

        for(var i=0;i<$scope.sumaOsur.length;i++){
            if ($scope.sumaOsur[i].class_suma ==='glyphicon glyphicon-minus') {
                obj = new Object();
                obj.idAplicacion = $scope.sumaOsur[i].idOsur;
                obj.presupuestoAplicacion =$scope.sumaOsur[i].saldo;
                $scope.aplicacion.push(obj);
            };
        };

        osurRepository.putNuevaOsur($scope.presupuestoSumaTotal, $scope.selectedTar.idTAR, $scope.folio, dateStringInicial, dateStringFinal, $scope.solpe, $scope.selectedCliente.idCliente ).then(function (result) {
            if (result.data.length>0) {
                alertFactory.info("Se generó correctamente la Osur");
                $('#newOsurModal').modal('hide');
                if ($scope.selectedTar != null) {
                    $scope.GetMonto();
                }
                $scope.fechaInicial = '';
                $scope.fechaFinal = '';
                $scope.folio = '';
                $scope.solpe = '';
                $scope.presupuesto = 0;
                $scope.datosOsur = [];

                for(var i=0;i<$scope.aplicacion.length;i++){
                    osurRepository.getOsurAplicacion( $scope.selectedTar.idTAR, $scope.aplicacion[i].idAplicacion.toString(), $scope.aplicacion[i].presupuestoAplicacion.toString() ).then(function (result) {
                        if (result.data.length > 0) {
                            alertFactory.info("Se generó correctamente la Osur");

                        } 
                    },
                    function (error) {
                        alertFactory.error("Error al procesar la información");
                    });
                };


            } else {
                $scope.datosOsur = [];
                alertFactory.info("No existe información con los criterios de búsqueda");
            }
        },
        function (error) {
            alertFactory.error("Error al procesar la información");
        });
        }else{
            alertFactory.info("Llene todos los campos");
        }
    }

    $scope.cancelaAltaOsur = function (info) {
        $scope.fechaInicial = '';
        $scope.fechaFinal = '';
        $scope.folio = '';
        $scope.solpe = '';
        $scope.presupuesto = 0;
    }

    $scope.verAplicacion = function (info) {
        $('.dataTableFondos').DataTable().destroy();
        osurRepository.getFondos(info.idTAR, info.idOsur).then(function (result) {
            if (result.data.length > 0) {
                $scope.fondos=result.data;
                globalFactory.waitDrawDocument("dataTableFondos", "Fondos");
                $('#fondosOsurModal').appendTo('body').modal('show');

            } else {
                swal({
                    title: "Información",
                    text: "No se encuentra ningún fondo asociado.",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#67BF11",
                    confirmButtonText: "Aceptar",
                    closeOnConfirm: true
                });;
            }
        },
        function (error) {
            alertFactory.error("Error al obtener la información");
        });
    }

    $scope.activarOsur = function (osur){
        swal({
            title: "Advertencia",
            text: "Se activara la Osur seleccionada y pondrá como pendiente la activa.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#67BF11",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
                osurRepository.putEstatusOsurTar(osur.idOsur, osur.idTAR).then(function (result) {;
                    if (result.data[0].ID == 0) {
                        alertFactory.success("Se actualizo el estatus correctamente");
                        $scope.GetMonto();
                    }

                },
                function (error) {
                    alertFactory.error("Error al procesar la información");
                });
            }
        });
    }

    $scope.verHistorial = function (idOsur, saldo, numeroOsur, TAR){
        $scope.SaldoOsur = saldo;
        $scope.numeroOsur = numeroOsur;
        $scope.nombreTAR = TAR;
        $scope.precioOrdenHistorial = 0;
        $('.dataTableCertificados').DataTable().destroy();
        osurRepository.getHistorial(idOsur).then(function (result) {
            if (result.data.length > 0) {

                $scope.certificados = result.data;
                for (var i = 0; i < $scope.certificados.length; i++) {
                    $scope.precioOrdenHistorial += $scope.certificados[i].precioOrden;
                };
                globalFactory.waitDrawDocument("dataTableCertificados", "Certificados");
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
        function (error) {
            alertFactory.error("Error al obtener la información");
        });
    }

    $scope.verDetalle = function (idTAR, saldo, numeroOsur, TAR){
        $scope.SaldoOsur = saldo;
        $scope.numeroOsur = numeroOsur;
        $scope.nombreTAR = TAR;
        $scope.precioOrdenDetalle = 0;  
        $('.dataTablePendientes').DataTable().destroy();
        osurRepository.getDetalle(idTAR).then(function (result) {
            if (result.data.length > 0) {

                $scope.pendientes=result.data;
                for (var i = 0; i < $scope.pendientes.length; i++) {
                    $scope.precioOrdenDetalle += $scope.pendientes[i].precioOrden;
                };
                globalFactory.waitDrawDocument("dataTablePendientes", "Pendientes");
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
        function (error) {
            alertFactory.error("Error al obtener la información");
        }); 
    }


    $scope.aprobarTrabajo = function (trabajo, valBotonera) {
        var objBotonera = {};
        objBotonera.accion = valBotonera;
        objBotonera.idCita = trabajo.idCita;
        localStorageService.set('objTrabajo', trabajo);
        localStorageService.set("botonera", objBotonera);
        location.href = '/ordenservicio';
    }

});