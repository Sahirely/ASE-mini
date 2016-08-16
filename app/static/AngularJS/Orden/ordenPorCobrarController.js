registrationModule.controller('ordenPorCobrarController', function ($scope, localStorageService, alertFactory, ordenPorCobrarRepository, $rootScope, uploadRepository) {

    $scope.message = "Buscando...";
    $scope.userData = localStorageService.get('userData');

    $scope.init = function () {
        Dropzone.autoDiscover = false;
        $scope.dzOptionsOrdenCobrar = uploadRepository.getDzOptions("application/pdf,text/xml",2);
        $scope.fecha='';
        $scope.getOrdenesPorCobrar();
        if ($scope.userData.idTipoUsuario == 1 || $scope.userData.idTipoUsuario == 2) {
            $scope.preFacturas();
        }
        if ($scope.userData.idTipoUsuario == 1) {
             $scope.getCopades();
         }
          $scope.fechaRecepcionCopade = '';
         $scope.cleanDatos();
    }

    //Devuelve las órdenes por cobrar
    $scope.getOrdenesPorCobrar = function () {
        $scope.promise =
            ordenPorCobrarRepository.getOrdenesPorCobrar().then(function (result) {
                if (result.data.length > 0) {
                    $scope.ordenes = result.data;
                    setTimeout(function () {
                        $('.dataTableOrdenesPorCobrar').DataTable({
                            buttons: [
                                {
                                    extend: 'copy'
                                    },
                                {
                                    extend: 'csv'
                                    },
                                {
                                    extend: 'excel',
                                    title: 'ExampleFile'
                                    },
                                {
                                    extend: 'pdf',
                                    title: 'ExampleFile'
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
                    }, 1000);
                } else {
                    alertFactory.info('No se encontraron ordenes por cobrar.');
                }
            }, function (error) {
                alertFactory.error("No se pudieron obtener las órdenes por cobrar");
            });
    }

    //Carga Adenda y Copade
    $scope.subir = function (idTrabajo) {
        $('#subirAdenda').appendTo('body').modal('show');
        $scope.idTrabajo = idTrabajo;
    }

    $scope.removePieza = function(idItem){
        $scope.listaPiezas.forEach(function(p, i){
            if(p.idItem == idItem){
                if(p.cantidad > 1){
                    $scope.listaPiezas[i].cantidad =  p.cantidad - 1;
                }
                else{
                    $scope.listaPiezas.splice(i,1); 
                }
            }   
        })
    }
    //Inserta a historial proceso y Asocia DatosCopadeOrden
    $scope.trabajoCobrado = function (idTrabajo,idDatosCopade) {
        $('.dataTableOrdenesPorCobrar').DataTable().destroy();
        ordenPorCobrarRepository.putTrabajoCobrado(idTrabajo,idDatosCopade).then(function (result) {
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
        $('.dataTablePreFacturas').DataTable().destroy();
        ordenPorCobrarRepository.getPreFacturas().then(function (result) {
            if (result.data.length > 0) {
                $scope.facturas = result.data;
                setTimeout(function () {
                    $('.dataTablePreFacturas').DataTable({
                        buttons: [
                            {
                                extend: 'copy'
                                    },
                            {
                                extend: 'csv'
                                    },
                            {
                                extend: 'excel',
                                title: 'ExampleFile'
                                    },
                            {
                                extend: 'pdf',
                                title: 'ExampleFile'
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
                }, 1000);
            } else {
                alertFactory.info('No se encontraron trabajos por cobrar');
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
                       $('#finalizarTrabajoModal').modal('hide');
           } else {
               alertFactory.info('Debe ingresar una fecha');
           }
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
                   file.forEach(function(archivo){
                       nombreCopades.push(archivo.name);
                   });
                   ordenPorCobrarRepository.putGeneraDatosCopade(nombreCopades,$scope.fechaRecepcionCopade).then(function (result) {
                       var copadesInfo = result.data;
                       ordenPorCobrarRepository.putInsertaDatosCopade(copadesInfo).then(function (resp) {
                            alertFactory.success("COPADE insertada");
                            copadesInfo = [];
                       }, function (error) {
                alertFactory.error(error);
                       });
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
       $('.dataTablePreFacturas').DataTable().destroy();
       ordenPorCobrarRepository.getCopades().then(function (result) {
           if (result.data.length > 0) {
               $scope.copades = result.data;  
          setTimeout(function () {
                   $('.dataTableCopades').DataTable({
                       buttons: [
                           {
                               extend: 'copy'
                                   },
                           {
                               extend: 'csv'
                                   },
                           {
                               extend: 'excel',
                               title: 'ExampleFile'
                                   },
                           {
                               extend: 'pdf',
                               title: 'ExampleFile'
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
               }, 1000);
           } else {
               alertFactory.info('No se encontró ninguna COPADE');
           }
       }, function (error) {
           alertFactory.error("Error al obtener las COPADES");
       });
   }
//Busqueda de las mejores coincidencias para los datos Copade
 $scope.buscaCoincidencia = function (idDatosCopade) {
     $scope.copades.forEach(function (p, i) {
         if (p.idDatosCopade == idDatosCopade) {
             $scope.folio = $scope.copades[i].ordenSurtimiento;
             $scope.monto = $scope.copades[i].subTotal;
             $scope.idDatosDeCopade = $scope.copades[i].idDatosCopade;
             ordenPorCobrarRepository.getMejorCoincidencia($scope.folio, $scope.monto).then(function (result) {
                 if (result.data.length > 0) {
                     $scope.coincidencia = result.data;
                     $('#mejorCoincidencia').appendTo("body").modal('show');
                 } else {
                     alertFactory.info('No se encontró ninguna Coincidencia');
                 }
             }, function (error) {
                 alertFactory.error("Error al obtener las COPADE");
             });
         }
     });
 }

//Selecciona una orden en Radio y obtiene idTrabajo
 $scope.seleccionMejorCoincidencia = function (idTrabajo) {
     $scope.idDeTrabajo = idTrabajo;
 }
//Asociamos un idtrabajo con DatosCopade
 $scope.asociarCopade = function () {
     if ($scope.idDeTrabajo != '') {
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
                             $scope.trabajoCobrado($scope.idDeTrabajo,$scope.idDatosDeCopade);
                             $scope.cleanDatos();
                             swal("Trabajo terminado!", "La copade se ha asociada", "success");
                             location.href = '/ordenesporcobrar';  
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
 //Limpiamos campos idTrabajo
 $scope.cleanDatos = function () {
  $scope.idDeTrabajo='';
 }


 });


