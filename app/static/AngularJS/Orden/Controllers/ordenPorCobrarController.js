registrationModule.controller('ordenPorCobrarController', function ($scope, localStorageService, alertFactory, dashBoardRepository, globalFactory, ordenPorCobrarRepository, reporteUtilidadRepository, $rootScope, uploadRepository, ordenServicioRepository) {

    $scope.message = "Buscando...";
    $scope.userData = localStorageService.get('userData');
    $scope.stories= [];
    $scope.checkedTrabajos=[];
    $scope.fechaRecepcionCopade = localStorageService.get("fechaRecepcion");
    $scope.onText = 'Copade';
    $scope.offText = 'Cotización';
    $scope.size = 'mini';
    $scope.showCopade = 1
    $scope.isSelected = 'yep';
    $scope.isSelectedFactura = 'yep';
    $scope.inverse = true;
    $scope.fechaInicio= '';
    $scope.fechaFin = '';
    $scope.showCopadeFacturas = 1;
   

    $scope.init = function () {
        Dropzone.autoDiscover = false;
        $scope.dzOptionsOrdenCobrar = uploadRepository.getDzOptions("application/pdf,text/xml", 2);
        $scope.fecha = '';
        $scope.trabajosporCOPADE = '';
        if ($scope.userData.idTipoUsuario == 1 || $scope.userData.idTipoUsuario == 2) {
            $scope.preFacturas();
            $scope.trabajosFacturados();
        }
        if ($scope.userData.idTipoUsuario == 1) {
            $scope.getCopades();
        }
        //$scope.limpiaFecha();
        $scope.cleanDatos();
        $scope.getOrdenesPorCobrar(); 
        $scope.trabajosAbonados();
       // $scope.cotizacionesAbonos ();
        $scope.devuelveZonas();
        $scope.devuelveTars();


    }

     $scope.change_switch = function () {
        if ($scope.showCopade == 2) {
            $scope.showCopade = 1;
        } else {
            $scope.showCopade = 2;
        }
    };

    //Carga Adenda y Copade
    $scope.subir = function (idTrabajo) {
        $('#subirAdenda').appendTo('body').modal('show');
        $scope.idTrabajo = idTrabajo;
    }

    $scope.removePieza = function (idItem) {
            $scope.listaPiezas.forEach(function (p, i) {
                if (p.idItem == idItem) {
                    if (p.cantidad > 1) {
                        $scope.listaPiezas[i].cantidad = p.cantidad - 1;
                    } else {
                        $scope.listaPiezas.splice(i, 1);
                    }
                }
            })
        }
        //Inserta a historial proceso y Asocia DatosCopadeOrden
    $scope.trabajoCobrado = function (idTrabajo, idDatosCopade) {
        $('.dataTableOrdenesPorCobrar').DataTable().destroy();
        ordenPorCobrarRepository.putTrabajoCobrado(idTrabajo, idDatosCopade).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success('Trabajo cobrado exitosamente');
            } else {
                alertFactory.info('No se pudo actualizar el trabajo cobrado');
            }
        }, function (error) {
            alertFactory.error("Error al actualizar el trabajo cobrado");
        });
    }

    //Visualiza la órden de servicio
    $scope.aprobarTrabajo = function (orden, valBotonera) {
        var objBotonera = {};
        objBotonera.accion = valBotonera;
        objBotonera.idCita = orden.idCita;
        localStorageService.set('objTrabajo', orden);
        localStorageService.set("botonera", objBotonera);
        location.href = '/ordenservicio';
    }

    $scope.preFacturas = function () {
        var sumatoria= 0;
        $('.dataTablePreFacturas').DataTable().destroy();
        ordenPorCobrarRepository.getPreFacturas($scope.userData.idUsuario).then(function (result) {
            if (result.data.length > 0) {
                $scope.facturas = result.data;
                for(var i=0;i<result.data.length;i++){
                    sumatoria += parseFloat(result.data[i].total);
                };
                $scope.sumatoriaPrefactura=sumatoria;
                globalFactory.waitDrawDocument("dataTablePreFacturas", "OrdenporCobrar");
            } else {
                alertFactory.info('No se encontraron trabajos por cobrar');
            }
        }, function (error) {
            alertFactory.error("Error al obtener trabajos por cobrar");
        });
    }

    $scope.verOrdenes= function(idDatosCopade){
    $('.dataTableTrabajosCobrados').DataTable().destroy();
    $('#facturasOrden').appendTo("body").modal('show');
        ordenPorCobrarRepository.getTrbajoCobrado(idDatosCopade).then(function (result) {
            if (result.data.length > 0) {
                $scope.trabajosCobrados = result.data;
                 $scope.numeroCopadeOrden = $scope.trabajosCobrados[0].numeroCopade;
                globalFactory.waitDrawDocument("dataTableTrabajosCobrados", "OrdenporCobrar");
            }
        }, function (error) {
            alertFactory.error("Error al obtener trabajos por cobrar");
        });
    }

   
    $scope.generaTXT = function (idTrabajo, numeroTrabajo) {
        ordenPorCobrarRepository.getGeneraTXT(idTrabajo).then(function (result) {
            if (result.data.length > 0) {
                alertFactory.success("PreFactura generada correctamente!");
                $scope.downloadFile($rootScope.vIpServer + '/facturas/factura-' + numeroTrabajo + '.txt')
            } else {
                alertFactory.info('No existe la factura.xml');
            }
        }, function (error) {
            alertFactory.error("Error al generar la prefactura");
        });
    }
    $('#fechaTrabajo .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });
    //Muestra la captura de la fecha
    $scope.fechaRecepcibeCopade = function () {
            $('#finalizarTrabajoModal').appendTo("body").modal('show');
        }
        //Guardamos la fecha capturable de la copade
    $scope.saveFecha = function () {
        if ($scope.fechaRecepcionCopade != '') {
            localStorageService.set("fechaRecepcion", $scope.fechaRecepcionCopade);
            $('#finalizarTrabajoModal').modal('hide');
        } else {
            alertFactory.info('Debe ingresar una fecha');
        }
    }

    $scope.limpiaFecha = function () {
        $scope.fechaRecepcionCopade = '';
    }

    $('.clockpicker').clockpicker();

    $scope.downloadFile = function (downloadPath) {
        window.open(downloadPath, '_blank', 'Factura');
    }

    //Se realiza la carga de archivos
    //call backs of drop zone
    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.newFile = file;
        },
        'sending': function (file, xhr, formData) {
            formData.append('idTrabajo', $scope.idTrabajo);
            formData.append('idCotizacion', 0);
            formData.append('idCategoria', 3);
            formData.append('idNombreEspecial', 0); //adencaCopade
            formData.append('idDatosCopade', 1);
        },
        'completemultiple': function (file, xhr) {
            var checkErrorFile = file.some(checkExistsError);
            if (!checkErrorFile) {
                var allSuccess = file.every(checkAllSuccess);
                if (allSuccess) {
                    var nombreCopades = [];
                    file.forEach(function (archivo) {
                        nombreCopades.push(archivo.name);
                    });
                    ordenPorCobrarRepository.putGeneraDatosCopade(nombreCopades, $scope.fechaRecepcionCopade).then(function (result) {
                        if (result.data.length > 0) {
                            ordenPorCobrarRepository.putInsertaDatosCopade(result.data).then(function (resp) {
                                if (resp.data.length > 0) {

                                    if (resp.data[0].id==0) {
                                        alertFactory.error('Ya existe un archivo para la COPADE');
                                    }else{
                                        ordenPorCobrarRepository.putRenombraCopade(nombreCopades, resp.data).then(function (respuesta) {
                                            if (respuesta.data > 0) {
                                                alertFactory.success('Copade cargada satisfactoriamente');
                                                //$scope.limpiaFecha();
                                                $scope.cleanDatos();
                                                $scope.getCopades();
                                            }
                                        }, function (error) {
                                            alertFactory.error('No se pudo cargar la copade');
                                        }); 
                                    }
                                    
                                } else {
                                    alertFactory.error('No se pudieron extraer los datos de la copade');
                                }            
                            }, function (error) {
                                alertFactory.error(error);            
                            }); 
                        } else {
                            alertFactory.error('No se pudo procesar la copade');
                        }                     
                    }, function (error) {
                        alertFactory.error(error);          
                    });
                    setTimeout(function () {
                        $scope.dzMethods.removeAllFiles(true);
                        $('#subirAdenda').appendTo('body').modal('hide');
                    }, 1000);
                }
            }
        },
        'error': function (file, xhr) {
            if (!file.accepted) {
                $scope.dzMethods.removeFile(file);
            } else {
                $scope.dzMethods.removeAllFiles(true);
                alertFactory.info("No se pudieron subir los archivos");
            }
        },
    };

    //valida si todos son success
    function checkAllSuccess(file, index, array) {
        return file.status === 'success';
    }

    //valida si existe algún error
    function checkExistsError(file) {
        return file.status === 'error';
    }

    //Devuelve las copades pendientes por asignar
    $scope.getCopades = function () {
        var sumatoria = 0;
        $('.dataTableCopades').DataTable().destroy();
        ordenPorCobrarRepository.getCopades().then(function (result) {
            if (result.data.length > 0) {
                $scope.copades = result.data;
                 for(var i=0;i<result.data.length;i++){
                    sumatoria += parseFloat(result.data[i].subTotal);
                };
                $scope.sumatoriaCOPADE=sumatoria;
                globalFactory.waitDrawDocument("dataTableCopades", "OrdenporCobrar");
            } else {
                alertFactory.info('No se encontró ninguna COPADE');
            }
        }, function (error) {
            alertFactory.error("Error al obtener las COPADES" + error);
        });
    }

    //Busqueda de las mejores coincidencias para los datos Copade
    $scope.buscaCoincidencia = function (idDatosCopade) {
        $('.dataTableCoincidencia').DataTable().destroy();
        $('.dataTableOrdenesPorCobrar').DataTable().destroy();
        $scope.ordenes = [];
        $scope.coincidencia = [];
        $scope.copades.forEach(function (p, i) {
            if (p.idDatosCopade == idDatosCopade) {
                $scope.folio = $scope.copades[i].ordenSurtimiento;
                $scope.monto = $scope.copades[i].subTotal;
                $scope.numeroCopade = $scope.copades[i].numeroCopade;
                $scope.numeroCopade == null ? $scope.numeroCopade = 'S/N COPADE' : $scope.copades[i].numeroCopade;
                $scope.fechacarga = $scope.copades[i].fechaCarga;
                $scope.fecharecepcion = $scope.copades[i].fechaRecepcionCopade;
                $scope.numeroestimacion = $scope.copades[i].numeroEstimacion;

                $scope.idDatosDeCopade = $scope.copades[i].idDatosCopade;
                ordenPorCobrarRepository.getMejorCoincidencia($scope.folio, $scope.monto).then(function (result) {
                    $scope.coincidencia = result.data;
                    $scope.trabajos=[];
                    $('#mejorCoincidencia').modal('show');
                    setTimeout(function () {
                        $('.dataTableCoincidencia').DataTable();
                    }, 1500);
                }, function (error) {
                    alertFactory.error("Error al obtener las COPADE");
                });
                ordenPorCobrarRepository.getOrdenesPorCobrar($scope.monto).then(function (result) {
                    $scope.ordenes = result.data;
                    setTimeout(function () {
                        $('.dataTableOrdenesPorCobrar').DataTable();
                    }, 1500);
                }, function (error) {
                    alertFactory.error("No se pudieron obtener las órdenes por cobrar");
                });

            }
        });
    }
       
    //Selecciona una orden en Radio y obtiene idTrabajo
    $scope.seleccionMejorCoincidencia = function (idTrabajo, montoOrdenSeleccionado, numeroTrabajo) {

         var trabajo = false;
        if ($scope.checkedTrabajos.length>0) {

            for (i = 0; i < $scope.checkedTrabajos.length; i++) {
                if ($scope.checkedTrabajos[i].idTrabajo == idTrabajo) {
                    trabajo = true;

                     if ($scope.checkedTrabajos[i].check ) {
                        $scope.checkedTrabajos[i].check= false;
                    }else{
                        $scope.checkedTrabajos[i].check= true;
                    } 
                }
         
            } 

            if (!trabajo) {
                 obj = new Object();
                obj.idTrabajo= idTrabajo;
                obj.numeroTrabajo= numeroTrabajo;
                obj.montoOrdenSeleccionado= montoOrdenSeleccionado;
                obj.check = true;
                $scope.checkedTrabajos.push(obj); 
            }

        }else{
            obj = new Object();
            obj.idTrabajo= idTrabajo;
            obj.numeroTrabajo= numeroTrabajo;
            obj.montoOrdenSeleccionado= montoOrdenSeleccionado;
            obj.check = true;
            $scope.checkedTrabajos.push(obj); 
        }
          

       // $scope.idDeTrabajo = idTrabajo;
       // $scope.montoOrdenSeleccionado = montoOrdenSeleccionado;


    }

    //Asociamos un idtrabajo con DatosCopade
    $scope.asociarCopade = function () {
      
       var idTrabajos='';
       var numeroTrbajos='';
       var montoOrdenSeleccionadoSuma=0;
        for (i = 0; i < $scope.checkedTrabajos.length; i++) {
            if ($scope.checkedTrabajos[i].check ) {
                idTrabajos+=$scope.checkedTrabajos[i].idTrabajo+',';
                numeroTrbajos+=$scope.checkedTrabajos[i].numeroTrabajo+',';
                montoOrdenSeleccionadoSuma+=parseFloat($scope.checkedTrabajos[i].montoOrdenSeleccionado);
            }
        };

        ordenServicioRepository.getOrden(numeroTrbajos).then(function (result) {

            if (result.data[0].Orden != 0) {

               if(validaMontoCapadeOrden(montoOrdenSeleccionadoSuma)){
                    if (idTrabajos != '') {
                        $('.btnTerminarTrabajo').ready(function () {
                            swal({
                                    title: "¿Esta seguro en asociar esta copade con la orden de servicio selecionado?",
                                    text: "Se cambiará el estatus a 'Cobrado'",
                                    type: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#65BD10",
                                    confirmButtonText: "Si",
                                    cancelButtonText: "No",
                                    closeOnConfirm: false,
                                    closeOnCancel: false
                                },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        $scope.trabajoCobrado(idTrabajos, $scope.idDatosDeCopade);
                                        ordenPorCobrarRepository.putMueveCopade(idTrabajos, $scope.idDatosDeCopade).then(function (resp) {
                                           if (resp.data > 0) {
                                             alertFactory.success('La copade se copio correctamente');
                                           }
                                       }, function (error) {
                                           alertFactory.error('La copade no se pudo depositar en su carpeta');
                                        }); 
                                        $scope.cleanDatos();
                                        swal("Trabajo terminado!", "La copade se ha asociada", "success");
                                        setTimeout(function () {
                                         location.href = '/ordenesporcobrar';
                                         }, 1500);
                                    } else {
                                        swal("Copade no asociada", "", "error");
                                        $scope.cleanDatos();
                                        $('#finalizarTrabajoModal').modal('hide');
                                    }
                                });
                        });
                    } else {
                        alertFactory.error("Debe seleccionar una orden de servicio");
                    }   
                }
                else{
                   alertFactory.error("El monto de la orden seleccionada rebasa el rango especificado de (+- $1.00 MXN), seleccione una orden que se adecúe con el monto de la COPADE");
                }

            }else{

                swal({
                    title: "Advertencia",
                    text: "No se ha creado la provisión de esta orden.",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#67BF11",
                    confirmButtonText: "Aceptar",
                    closeOnConfirm: true
                });
            }
         }, function (error) {
            alertFactory.error("Error al verificar la orden");
        });     
    }


    //Limpiamos campos idTrabajo
    $scope.cleanDatos = function () {
        $scope.idDeTrabajo = '';
    }

     //Devuelve las copades pendientes por asignar
    $scope.getOrdenesPorCobrar = function () {
        var sumatoria= 0;
        $('.dataTableOrdenesVerificadas').DataTable().destroy();
        ordenPorCobrarRepository.getOrdenesVerificadas($scope.userData.idUsuario).then(function (result) {
            if (result.data.length > 0) {
                $scope.verificadas = result.data;
                 for(var i=0;i<result.data.length;i++){
                    sumatoria += parseFloat(result.data[i].montoOrden);
                };
                $scope.sumatoriaOrdenes=sumatoria;
                globalFactory.waitDrawDocument("dataTableOrdenesVerificadas", "OrdenporCobrar");
            } else {
                alertFactory.info('No se encontró ninguna Orden Verificada');
            }
        }, function (error) {
            alertFactory.error("Error al obtener las Ordenes" + error);
        });
    }

    $scope.trabajosFacturados = function () {
        var sumatoria= 0;
        $('.dataTableFacturados').DataTable().destroy();
        ordenPorCobrarRepository.getFacturados($scope.userData.idUsuario).then(function (result) {
            if (result.data.length > 0) {
                $scope.facturados = result.data;
                
                for(var i=0;i<result.data.length;i++){
                    sumatoria += parseFloat(result.data[i].total);
                };
                $scope.sumatoriafacturadas=sumatoria;

                globalFactory.waitDrawDocument("dataTableFacturados", "OrdenporCobrar");
            } else {
                alertFactory.info('No se encontraron trabajos por cobrar');
            }
        }, function (error) {
            alertFactory.error("Error al obtener trabajos por cobrar");
        });
    }

    $scope.trabajosAbonados = function () {
        var sumatoria= 0;
        var sumatoriaSaldo= 0;
        var sumatoriaAbono= 0;
        $('.dataTableAbonos').DataTable().destroy();
        ordenPorCobrarRepository.getAbonos($scope.userData.idUsuario).then(function (result) {

            if (result.data.length > 0) {
                $scope.abonos = result.data;
                
                for(var i=0;i<result.data.length;i++){
                    sumatoria += parseFloat(result.data[i].total);
                    sumatoriaSaldo += parseFloat(result.data[i].COP_SALDO);
                    sumatoriaAbono += parseFloat(result.data[i].abono);
                };
                $scope.sumatoriaTotal=sumatoria;
                $scope.sumatoriaSaldos=sumatoriaSaldo;
                $scope.sumatoriaAbonos=sumatoriaAbono;

                globalFactory.waitDrawDocument("dataTableAbonos", "OrdenporCobrar");
            } else {
                alertFactory.info('No se encontraron trabajos por cobrar');
            }
        }, function (error) {
            alertFactory.error("Error al obtener trabajos por cobrar");
        });
    }

    $scope.changeFecha = function (fecha, tipo){

        if (tipo =='iniCotizacion') {
            $scope.fecIniCot=fecha;
        }else if (tipo == 'finCotizacion') {
             $scope.fecFinCot=fecha;
        };


    }

    $scope.cotizacionesAbonos = function (fechaInicio, fechaFinal, proveedor) {
       
        var sumatoria= 0;
        var fechaInicio = fechaInicio;
        var fechaFinal = fechaFinal;
        $('.dataTableCotAbonos').DataTable().destroy();
        $scope.cotizaciones=[];

        fechaInicio== '' ? fechaInicio = null : fechaInicio;
        fechaFinal == '' ? fechaFinal = null : fechaFinal;

       if (fechaInicio != undefined) {
            var valoresInicial = fechaInicio.split('/');
            var dateStringInicial = valoresInicial[0] + '/' + valoresInicial[1] + '/' + valoresInicial[2];

            var valoresFinal = fechaFinal.split('/');
            var dateStringFinal = valoresFinal[0] + '/' + valoresFinal[1] + '/' + valoresFinal[2];  
        };

       

        ordenPorCobrarRepository.getCotizacionesAbonos($scope.userData.idUsuario, dateStringInicial,  dateStringFinal, proveedor).then(function (result) {
            if (result.data.length > 0) {
              
                $scope.cotizaciones = result.data;
              
                for(var i=0;i<result.data.length;i++){
                   // sumatoria += parseFloat(result.data[i].precioCotizacion);
                   sumatoria += result.data[i].precioCotizacion;
                };
                $scope.sumatoriaCotizaciones=sumatoria;

                globalFactory.waitDrawDocument("dataTableCotAbonos", "OrdenporCobrar");
            } else {
                alertFactory.info('No se encontraron trabajos por cobrar');
            }
        }, function (error) {
            alertFactory.error("Error al obtener trabajos por cobrar");
        });
    }

    //obtiene los scope necesarios para el reporte de utilidad 
    $scope.buscaFiltros = function (fechaInicio, fechaFin, fechaMes, zona, tar, idTipoCita, proveedorFac) {
       
        $scope.fechaInicio =fechaInicio;
        $scope.fechaFin =fechaFin;
        $scope.zona=zona;
        $scope.tar=tar;
        $scope.idTipoCita =idTipoCita;
        $scope.fechaMes =fechaMes;
        
        if ($scope.showCopadeFacturas==1) {
            $scope.bandera = 3;
        }else{
            $scope.bandera = 1;
        }
        $scope.proveedorFac= proveedorFac;

        $scope.fechaInicio == '' ? $scope.fechaInicio = null : $scope.fechaInicio;
        $scope.fechaFin == '' ? $scope.fechaFin = null : $scope.fechaFin;
        $scope.fechaMes == '' ? $scope.fechaMes = null : $scope.fechaMes;
        $scope.rangoInicial == '' ? $scope.rangoInicial = null : $scope.rangoInicial;
        $scope.rangoFinal == '' ? $scope.rangoFinal = null : $scope.rangoFinal;
        $scope.zona;
        $scope.tar;
        $scope.idTipoCita == '' ? $scope.idTipoCita = null : $scope.idTipoCita;
        //$scope.estatus == '' ? $scope.bandera = 1 : $scope.bandera = 2;
        $scope.numeroTrabajo;
        $scope.getMargenUtilidad($scope.fechaInicio,$scope.fechaFin,$scope.fechaMes,$scope.zona,$scope.tar,$scope.idTipoCita,$scope.estatus,$scope.numeroTrabajo, $scope.bandera, $scope.proveedorFac);
    }

    //obtiene los scope necesarios para el reporte de utilidad 
    $scope.buscaOrden = function (numeroTrabajo) {
        if (numeroTrabajo != null || numeroTrabajo != undefined){
            if ($scope.showCopadeFacturas==1) {
                $scope.bandera = 4;
            }else{
                $scope.bandera = 2;
            }
            $scope.fechaInicio == '' ? $scope.fechaInicio = null : $scope.fechaInicio;
            $scope.fechaFin == '' ? $scope.fechaFin = null : $scope.fechaFin;
            $scope.fechaMes == '' ? $scope.fechaMes = null : $scope.fechaMes;
            
            $scope.rangoInicial == '' ? $scope.rangoInicial = null : $scope.rangoInicial;
            $scope.rangoFinal == '' ? $scope.rangoFinal = null : $scope.rangoFinal;
            $scope.zona;
            $scope.tar;
            $scope.idTipoCita == '' ? $scope.idTipoCita = null : $scope.idTipoCita;
           // $scope.estatus == '' ? $scope.estatus == null : $scope.estatus;
            $scope.numeroTrabajo= numeroTrabajo;
            $scope.getMargenUtilidad($scope.fechaInicio,$scope.fechaFin,$scope.fechaMes,$scope.zona,$scope.tar,$scope.idTipoCita,$scope.estatus,$scope.numeroTrabajo, $scope.bandera, $scope.proveedorFac);
        }else{
            alertFactory.error('Debe de ingrsar un número de orden ');
        }
    }

    //obtiene el resultado de reporte de utilidad 
    $scope.getMargenUtilidad = function (fechaInicio,fechaFin,fechaMes,zona,tar,idTipoCita,estatus,numeroTrabajo,bandera, proveedorFac) {
      
       if ($scope.showCopadeFacturas==1) {
           $scope.sumatoriaFacturasPagadas = 0.00;
           $('.dataTablePagadaCopade').DataTable().destroy();
        }else{
            $scope.sumatoriaPagadas = 0.00;
            $('.dataTablePagadas').DataTable().destroy();
        }


        if(fechaMes != '' && fechaMes != null && fechaMes != undefined){
            var fechaPartida = fechaMes.split('-');
            if(fechaPartida[0] == 'Enero'){
                fechaMes = '01/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Febrero'){
                fechaMes = '02/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Marzo'){
                fechaMes = '03/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Abril'){
                fechaMes = '04/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Mayo'){
                fechaMes = '05/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Junio'){
                fechaMes = '06/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Julio'){
                fechaMes = '07/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Agosto'){
                fechaMes = '08/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Septiembre'){
                fechaMes = '09/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Octubre'){
                fechaMes = '10/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Noviembre'){
                fechaMes = '11/01/' + fechaPartida[1];
            }
            else if(fechaPartida[0] == 'Diciembre'){
                fechaMes = '12/01/' + fechaPartida[1];
            }
        }
             
        ordenPorCobrarRepository.getFacturasPagadas(fechaInicio,fechaFin,fechaMes,zona,tar,idTipoCita,estatus,numeroTrabajo,bandera, proveedorFac).then(function (utilidad) { 
       

           var sumatoria = 0.00;
            if (utilidad.data.length > 0) {
                
                        
            
                 for(var i=0;i<utilidad.data.length;i++){
                    
                    if ($scope.showCopadeFacturas==1) {
                       sumatoria += parseFloat(utilidad.data[i].total);
                    }else{
                       sumatoria += parseFloat(utilidad.data[i].precioCotizacion);
                    }
                };

                if ($scope.showCopadeFacturas==1) {
                   $scope.pagadasCopades = utilidad.data;
                   $scope.sumatoriaFacturasPagadas += sumatoria;
                   waitDrawDocument("dataTablePagadaCopade");
                }else{
                    $scope.pagadas = utilidad.data;
                    $scope.sumatoriaPagadas += sumatoria;
                    waitDrawDocument("dataTablePagadas");
                }
                console.log(sumatoria);

                alertFactory.success('Datos encontrados');
            } else {
                alertFactory.info('No se encontraron datos');
            }
        }, function (error) {
            alertFactory.error('Error al obtener los datos');
        });
    }

    $scope.devuelveTars = function (zona) {
        if (zona != null) {
            dashBoardRepository.getTars(zona).then(function (tars) {
                if (tars.data.length > 0) {
                    $scope.tars = tars.data;

                }
            }, function (error) {
                alertFactory.error('No se pudo recuperar información de las TARs');
            });
        } else {
            $scope.tar = null;
        }
    }

     //Devuelve todas las zonas correspondientes
    $scope.devuelveZonas = function () {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function (zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    }
  


    //valida (+-)1 del monto de la copa contrar la orden seleccionada
    var validaMontoCapadeOrden = function(montoOrdenSeleccionado){
        if($scope.monto != null && $scope.monto != '' && $scope.monto > 0){
            var resultado = montoOrdenSeleccionado >= $scope.monto ? (montoOrdenSeleccionado - $scope.monto) : ($scope.monto - montoOrdenSeleccionado);
            if(resultado >= 0 && resultado <= 10)
                return true;
            else
                return false;
        }
    }

    //espera que el documento se pinte para llenar el dataTable
            var waitDrawDocument = function (dataTable) {
                setTimeout(function () {
                    var indicePorOrdenar = 0;
                    if (dataTable == 'dataTableUtilidad') {
                        indicePorOrdenar = 11;
                    }

                    $('.' + dataTable).DataTable({
                        order: [[indicePorOrdenar, 'desc']],
                        dom: '<"html5buttons"B>lTfgitp',
                        "iDisplayLength": 100,
                        buttons: [
                            {
                                extend: 'excel',
                                title: 'MargenUtilidad'
                            },
                            {
                                extend: 'print',
                                customize: function (win) {
                                    $(win.document.body).addClass('white-bg');
                                    $(win.document.body).css('font-size', '10px');

                                    $(win.document.body).find('table')
                                        .addClass('compact')
                                        .css('font-size', 'inherit');
                                }
                            }
                        ]
                    });
                }, 2500);
            }

            $scope.change_switchFacturas = function () {

                if ($scope.showCopadeFacturas == 2) {
                    $scope.showCopadeFacturas = 1;
                } else {
                    $scope.showCopadeFacturas = 2;
                }
            };

    
});



