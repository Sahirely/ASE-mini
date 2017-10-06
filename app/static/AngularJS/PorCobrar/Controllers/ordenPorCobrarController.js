registrationModule.controller('ordenPorCobrarController', function ($scope, $rootScope, localStorageService, alertFactory, globalFactory, ordenPorCobrarRepository, userFactory, cotizacionConsultaRepository, nuevoMemorandumRepository) {
  $rootScope.modulo = 'ordenxCobrar'

  $scope.x = 0
  $scope.totalNiveles = 0
  $scope.zonaSelected = '0'
  $scope.ZonasSeleccionadas = []
  $scope.NivelesZona = []
  $scope.Zonas = []
  $scope.checkedTrabajos = [];
  $scope.checkedFacturasTotal = [];

  $scope.grouper = 'numeroOrden'
  $scope.idGrouper = 2
  $scope.option = null

  $scope.total = 0

  $scope.changeGrouper = function (type) {
    $scope.idGrouper = type
    switch (type) {
      case 1:
        $scope.grouper = 'numeroCotizacion'
        break
      case 2:
        $scope.grouper = 'numeroOrden'
        break
      case 3:
        $scope.grouper = 'ordenPago'
        break
    }
    $scope.idGrouper = type
    $('.dataTablePorCobrar').DataTable().destroy()
    $('.dataTablePrefactura').DataTable().destroy()
    $('.dataTableEnviada').DataTable().destroy()
    $('.dataTableAbonadas').DataTable().destroy()
    $('.dataTablePagadas').DataTable().destroy()
    setTimeout(function () {
      globalFactory.filtrosTabla('dataTablePorCobrar', 'Ordenes Por Cobrar', 100)
      globalFactory.filtrosTabla('dataTablePrefactura', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTableEnviada', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTableAbonadas', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTablePagadas', 'PreFactura Generada', 100)
    }, 200)
  }

  $scope.init = function () {
    $scope.userData = userFactory.getUserData()
    // para obtener las zonas promero se inicializa la primer zona padre.
    userFactory.ValidaSesion()
    $scope.ZonasSeleccionadas[0] = '0'
    $scope.obtieneNivelZona()
    // termina el cargado de las Zonas del usuario.
    $scope.devuelveEjecutivos()

    // Obtengo la lista de tablas
    $('.dataTablePorCobrar').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerporcobrar', {  'idContratoOperacion': $scope.userData.contratoOperacionSeleccionada,'idUsuario': $scope.userData.idUsuario }).then(function (result) {
      $scope.porCobrar = result.data
      $scope.total = 0
      angular.forEach($scope.porCobrar, function (value, key) {
        $scope.total = $scope.total + value.venta
      })

      globalFactory.filtrosTabla('dataTablePorCobrar', 'Ordenes Por Cobrar', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las órdenes por cobrar')
    })

    // Obtengo la lista de tablas (COBRANZA)
    $('.dataTableCobrazna').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenercobranza', { 'idUsuario': $scope.userData.idUsuario }).then(function (result) {
      $scope.cobranza = result.data
     var sumatoria = 0;
          for(var i=0;i<result.data.length;i++){
            sumatoria += parseFloat(result.data[i].subTotal);
        };
       $scope.totalCobranza = sumatoria;
      globalFactory.filtrosTabla('dataTableCobrazna', 'Documento Cobranza', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener los documentos generados')
    })
   
    // Obtengo la lista de tablas
    $('.dataTablePrefactura').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerprefactura', { 'idUsuario': $scope.userData.idUsuario }).then(function (result) {
      $scope.prefactura = result.data
      globalFactory.filtrosTabla('dataTablePrefactura', 'PreFacturas Generadas', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las prefacturas generadas')
    })
    
    // Obtengo la lista de tablas
    $('.dataTableEnviada').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerenviadas', { 'idUsuario': $scope.userData.idUsuario }).then(function (result) {
      $scope.enviada = result.data
      globalFactory.filtrosTabla('dataTableEnviada', 'Facturas Enviada al Cliente', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las Facturas Enviada al Cliente')
    })

    
    /*/ Obtengo la lista de tablas (ABONOS)
    $('.dataTableAbonos').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerabonos', { 'idUsuario': 1 }).then(function (result) {
      $scope.selectCotizaciones = result.data
     var sumatoria = 0;
          for(var i=0;i<result.data.length;i++){
            sumatoria += parseFloat(result.data[i].subTotal);
        };
       $scope.total = sumatoria;
      globalFactory.filtrosTabla('dataTableAbonos', 'Selección de Abonos', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener los abonos generados')
    })*/

    //Obtengo la lista de tablas (ABONOS)
    $('.dataTableAbonos').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerabonos', { 'idUsuario': $scope.userData.idUsuario }).then(function (result) {
      $scope.selectCotizaciones = result.data
     var sumatoriaMontoCopade = 0;
     var sumatoriaAbonoCopade = 0;
     var sumatoriaSaldoCopade = 0;
     var sumatoriaMontoProveedor = 0;
     var sumatoriaSaldoProveedor = 0;
          for(var i=0;i<result.data.length;i++){
            sumatoriaMontoCopade += parseFloat(result.data[i].COP_CARGO);
            sumatoriaAbonoCopade += parseFloat(result.data[i].abono);
            sumatoriaSaldoCopade += parseFloat(result.data[i].COP_SALDO);
            sumatoriaMontoProveedor += parseFloat(result.data[i].total);
            sumatoriaSaldoProveedor += parseFloat(result.data[i].saldoProveedor);
        };
       $scope.montoCopAbonoSelect = sumatoriaMontoCopade;
       $scope.abonoCopAbonoSelect = sumatoriaAbonoCopade;
       $scope.saldoCopAbonoSelect = sumatoriaSaldoCopade;
       $scope.montoProvAbonoSelect = sumatoriaMontoProveedor;
       $scope.saldoProvAbonoSelect = sumatoriaSaldoProveedor;	   
      globalFactory.filtrosTabla('dataTableAbonos', 'Selección de Abonos', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener los abonos generados')
    })
    

    // Obtengo la lista de tablas
    $('.dataTableAbonadas').DataTable().destroy();
    $scope.promise = ordenPorCobrarRepository.get('obtenerabonadas', { 'idUsuario': $scope.userData.idUsuario }).then(function (result) {
      $scope.abonadas = result.data;
      //$scope.data = result.data;
      globalFactory.filtrosTabla('dataTableAbonadas', 'Facturas Abonadas', 100);
    }, function (error) {
      alertFactory.error('No se puenen obtener las Facturas Abonadas')
    })

    $('.dataTablePagadas').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerpagadas', {'idZona':0,'fechaInicio':"0001-01-01 00:00:00.000",'fechaFin':"0001-01-01 00:00:00.000",'fechaEspecifica':"0001-01-01 00:00:00.000", 'idUsuario': $scope.userData.idUsuario,'idDatosCopade':0 }).then(function (result) {
      $scope.pagadas = result.data
      globalFactory.filtrosTabla('dataTablePagadas', 'Facturas Pagadas', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las Facturas Pagadas')
    })
    
    
    /*
    $('.dataTableOrdenPago').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerordenpago', { 'idUsuario': 1 }).then(function (result) {
      $scope.ordenPago = result.data
      globalFactory.filtrosTabla('dataTableOrdenPago', 'Ordenes de Pago', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las Facturas Pagadas')
    })*/

    $scope.getMemorandums()
    
  }

  // obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
  $scope.obtieneNivelZona = function () {
    $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.userData.contratoOperacionSeleccionada).then(function (result) {
      $scope.totalNiveles = result.data.length
      if (result.data.length > 0) {
        $scope.NivelesZona = result.data
        $scope.devuelveZonas()
      }
    },
      function (error) {
        alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.')
      })
  }

  // obtiene las zonas por cada nivel con que cuenta el usuario
  $scope.devuelveZonas = function () {
    for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
      cotizacionConsultaRepository.getZonas($scope.userData.contratoOperacionSeleccionada, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function (result) {
        if (result.data.length > 0) {
          var valueToPush = {}
          valueToPush.orden = result.data[0].orden
          valueToPush.etiqueta = result.data[0].etiqueta
          valueToPush.data = result.data
          $scope.Zonas.push(valueToPush)
          // se establece por default cada zona seleccionada en 0
          $scope.ZonasSeleccionadas[result.data[0].orden] = '0'
        }
      }, function (error) {
        alertFactory.error('No se pudo recuperar información de las zonas')
      })
    }
  }

  // obtiene los usuarios ejecutivos
  $scope.devuelveEjecutivos = function () {
    cotizacionConsultaRepository.obtieneEjecutivos($scope.userData.contratoOperacionSeleccionada).then(function (ejecutivos) {
      if (ejecutivos.data.length > 0) {
        $scope.listaEjecutivos = ejecutivos.data
      }
    }, function (error) {
      alertFactory.error('No se pudo recuperar información de los ejecutivos')
    })
  }

  $scope.MesChange = function () {
    $scope.fechaInicio = ''
    $scope.fechaFin = ''
    $scope.fecha = ''
  }

  $scope.RangoChange = function () {
    $scope.fechaMes = ''
    $scope.fecha = ''
    this.ValidaRangoFechas()
  }

  $scope.FechaChange = function () {
    $scope.fechaMes = ''
    $scope.fechaInicio = ''
    $scope.fechaFin = ''
  }

  $scope.ValidaRangoFechas = function () {
    var isValid = true

    // valida si están seleccionadas ambas fechas del rango
    if ($scope.fechaInicio != '' && $scope.fechaFin != '') {
      var fechaInicial = $scope.fechaInicio.split('/')
      var fechaFinal = $scope.fechaFin.split('/')

      // valida el anio
      if (parseInt(fechaInicial[2]) > parseInt(fechaFinal[2])) {
        isValid = false
      } else if (parseInt(fechaInicial[2]) == parseInt(fechaFinal[2])) {
        // valida el mes
        if (parseInt(fechaInicial[0]) > parseInt(fechaFinal[0])) {
          isValid = false
        } else if (parseInt(fechaInicial[0]) == parseInt(fechaFinal[0])) {
          // valida el día
          if (parseInt(fechaInicial[1]) > parseInt(fechaFinal[1])) {
            isValid = false
          }
        }
      }

      if (isValid == false) {
        $scope.fechaInicio = ''
        $scope.fechaFin = ''
        alertFactory.info('La Fecha de Fin Debe Ser Posterior a la Fecha de Inicio.')
      }
    }
  }

  // obtiene el mes en formato de fecha
  $scope.obtieneFechaMes = function () {
    var result = ''
    if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
      var fechaPartida = $scope.fechaMes.split('-')
      if (fechaPartida[0] == 'Enero') {
        result = fechaPartida[1] + '/01/01'
      } else if (fechaPartida[0] == 'Febrero') {
        result = fechaPartida[1] + '/02/01'
      } else if (fechaPartida[0] == 'Marzo') {
        result = fechaPartida[1] + '/03/01'
      } else if (fechaPartida[0] == 'Abril') {
        result = fechaPartida[1] + '/04/01'
      } else if (fechaPartida[0] == 'Mayo') {
        result = fechaPartida[1] + '/05/01'
      } else if (fechaPartida[0] == 'Junio') {
        result = fechaPartida[1] + '/06/01'
      } else if (fechaPartida[0] == 'Julio') {
        result = fechaPartida[1] + '/07/01'
      } else if (fechaPartida[0] == 'Agosto') {
        result = fechaPartida[1] + '/08/01'
      } else if (fechaPartida[0] == 'Septiembre') {
        result = fechaPartida[1] + '/09/01'
      } else if (fechaPartida[0] == 'Octubre') {
        result = fechaPartida[1] + '/10/01'
      } else if (fechaPartida[0] == 'Noviembre') {
        result = fechaPartida[1] + '/11/01'
      } else if (fechaPartida[0] == 'Diciembre') {
        result = fechaPartida[1] + '/12/01'
      }
    }
    return result
  }

  $scope.AbrirOrden = function (obj) {
    location.href = '/detalle?orden=' + obj.numeroOrden + '&estatus=' + 8
  }

  $scope.AbrirCoincidencias = function () {
    $('#mejorCoincidencia').modal.show()
  }

  $scope.GuardarOrdenPago = function () {
    $scope.promise = ordenPorCobrarRepository.post('agregarordenpago', {
      'idUsuario': 1,
      'folio': 9999,
      'fecha': '20170608',
      'monto': 12345
    }).then(function (result) {
      alertFactory.success('Orden de pago almacenada correctamente.')
      $('.dataTableOrdenPago').DataTable().destroy()
      $scope.promise = ordenPorCobrarRepository.get('obtenerordenpago', { 'idUsuario': 1 }).then(function (result) {
        $scope.ordenPago = result.data
        globalFactory.filtrosTabla('dataTableOrdenPago', 'Ordenes de Pago', 100)
      }, function (error) {
        alertFactory.error('No se puenen obtener las Facturas Pagadas')
      })
    }, function (error) {
      alertFactory.error('No se puenen obtener las órdenes por cobrar')
    })
  }

  $scope.getMemorandums = function () {
    nuevoMemorandumRepository.getMemoUsuario($scope.userData.idUsuario)
      .then(function successCallback(response) {
        $scope.Memorandums = []
        response.data.forEach(function (element) {
          if (element.leido != 1) {
            if ($scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum) == undefined) {
              $scope.Memorandums.push({
                "idMemorandum": element.idMemorandum,
                "fecha": new Date(element.fecha).toLocaleDateString() + ' ' + new Date(element.fecha).toLocaleTimeString(),
                "titulo": element.titulo,
                "descripcion": element.descripcion,
                "leido": element.leido,
                "aceptado": element.aceptado,
                "comentarios": element.comentarios,
                evidencias: [
                  {
                    "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                    "idEvidencia": element.idEvidencia,
                    "evidencia": element.evidencia,
                    "fullPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/' + element.evidencia
                  }
                ]
              })
            }
            else {
              $scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum).evidencias.push({
                "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                "idEvidencia": element.idEvidencia,
                "evidencia": element.evidencia,
                "fullPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/' + element.evidencia
              })
            }
          }
        }, this);
        if ($scope.Memorandums.find(X => X.leido != 1) != undefined) {
          $rootScope.hasMemo = true
          location.href = "/miCuenta"
        }
      })

  }

  //Busqueda de las mejores coincidencias para los datos Copade
  $scope.buscaCoincidencia = function (idDatosCopade) {
    $('.dataTableCoincidencia').DataTable().destroy();
    $('.dataTableOrdenesPorCobrar').DataTable().destroy();
    $scope.ordenes = [];
    $scope.coincidencia = [];
    $scope.cobranza.forEach(function (p, i) {
        if (p.idDatosCopade == idDatosCopade) {
            $scope.folio = $scope.cobranza[i].ordenSurtimiento;
            $scope.monto = $scope.cobranza[i].subTotal;
            $scope.numeroCopade = $scope.cobranza[i].numeroCopade;
            $scope.numeroCopade == null ? $scope.numeroCopade = 'S/N COPADE' : $scope.cobranza[i].numeroCopade;
            $scope.fechacarga = $scope.cobranza[i].fechaCarga;
            $scope.fecharecepcion = $scope.cobranza[i].fechaRecepcionCopade;
            $scope.numeroestimacion = $scope.cobranza[i].numeroEstimacion;
            $scope.idDatosDeCopade = $scope.cobranza[i].idDatosCopade;
            //get('obtenerpagadas', { 'idUsuario': 1 })
            ordenPorCobrarRepository.get('MejorCoincidencia',{'folio':$scope.folio}).then(function (result) {
                $scope.coincidencia = result.data;
                $scope.trabajos=[];
                $('#mejorCoincidencia').modal('show');
                setTimeout(function () {
                    $('.dataTableCoincidencia').DataTable();
                }, 1500);
            }, function (error) {
                alertFactory.error("Error al obtener las COPADE");
            });
            /*ordenPorCobrarRepository.get('OrdenesPorCobrar',{'monto':$scope.monto}).then(function (result) {
                $scope.ordenes = result.data;
                setTimeout(function () {
                    $('.dataTableOrdenesPorCobrar').DataTable();
                }, 1500);
            }, function (error) {
                alertFactory.error("No se pudieron obtener las órdenes por cobrar");
            });*/
        }
    });
  }
  //Selecciona una orden en Radio y obtiene idTrabajo
  $scope.seleccionMejorCoincidencia = function (idOrden, montoOrdenSeleccionado, numeroOrden) {
    
        var trabajo = false;
      if ($scope.checkedTrabajos.length>0) {
          for (i = 0; i < $scope.checkedTrabajos.length; i++) {
              if ($scope.checkedTrabajos[i].idTrabajo == idOrden) {
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
              obj.idTrabajo= idOrden;
              obj.numeroTrabajo= numeroOrden;
              obj.montoOrdenSeleccionado= montoOrdenSeleccionado;
              obj.check = true;
              $scope.checkedTrabajos.push(obj); 
          }
      }else{
          obj = new Object();
          obj.idTrabajo= idOrden;
          obj.numeroTrabajo= numeroOrden;
          obj.montoOrdenSeleccionado= montoOrdenSeleccionado;
          obj.check = true;
          $scope.checkedTrabajos.push(obj); 
      }
        
      // $scope.idDeTrabajo = idTrabajo;
      // $scope.montoOrdenSeleccionado = montoOrdenSeleccionado;
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

      $scope.promise = ordenPorCobrarRepository.get("getOrden",numeroTrbajos).then(function (result) {

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

  $scope.verOrdenes= function(idDatosCopade){
    $('.dataTableTrabajosCobrados').DataTable().destroy();
    $('#facturasOrden').appendTo("body").modal('show');
        ordenPorCobrarRepository.getTrbajoCobrado({'idZona':0,'fechaInicio':"0001-01-01 00:00:00.000",'fechaFin':"0001-01-01 00:00:00.000",'fechaEspecifica':"0001-01-01 00:00:00.000", 'idUsuario': $scope.userData.idUsuario,'idDatosCopade':idDatosCopade}).then(function (result) {
            if (result.data.length > 0) {
                $scope.trabajosCobrados = result.data;
                 $scope.numeroCopadeOrden = $scope.trabajosCobrados[0].numeroCopade;
                globalFactory.waitDrawDocument("dataTableTrabajosCobrados", "OrdenporCobrar");
            }
        }, function (error) {
            alertFactory.error("Error al obtener trabajos por cobrar");
        });
    }

    $scope.asociarFacturaCotizacion = function () {
      var ordenGlobal='';
      for (var index = 0; index < selectCotizaciones.length; index++) {
        var element = array[index];
        if(element.selected == true){
          ordenGlobal+= element.numeroOrdenGlobal+',';          
        }
      }
       /*for (i = 0; i < $scope.checkedFacturasTotal.length; i++) {
           if ($scope.checkedFacturasTotal[i].check ) {
               ordenGlobal+=$scope.checkedFacturasTotal[i].numeroOrdenGlobal+',';
           }
       };*/
       if (ordenGlobal != '') {
           $('.btnTerminarTrabajo').ready(function () {
               swal({
                       title: "¿Esta seguro en guardar la Factura selecionada?",
                       text: "Se cambiará el estatus a 'Facturas Abonadas'",
                       type: "warning",
                       showCancelButton: true,
                       confirmButtonColor: "#65BD10",
                       confirmButtonText: "Si",
                       cancelButtonText: "No",
                       closeOnConfirm: true,
                       closeOnCancel: true
                   },
                   function (isConfirm) {
                       if (isConfirm) {
                           ordenPorCobrarRepository.putFacturaAbonada(ordenGlobal).then(function (result) {
                               if (result.data.length > 0) {
                                   swal("Trabajo terminado!", "Las Facturas se han abonado", "success");
                                        $scope.trabajosAbonados(1);
                                        $scope.checkedFacturas=[];
                                        $scope.totalSeleccionadoSuma = 0;
                                   alertFactory.success('Factura abonada correctamente');
                                   location.href = '/ordenesporcobrar';
                               } else {
                                   alertFactory.info('No se pudo actualizar la Factura');
                               }
                           }, function (error) {
                               alertFactory.error("Error al actualizar la factura");
                           });
                       } else {
                           swal("Factura no asociada", "", "error");
                           $('#finalizarTrabajoModal').modal('hide');
                       }
                   });
           });
       } else {
           alertFactory.error("Debe seleccionar al menos una Factura");
       }   
   }

  //Carga Adenda y Copade
  $scope.subir = function (idTrabajo) {
    $('#subirAdenda').appendTo('body').modal('show');
    $scope.idTrabajo = idTrabajo;
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
  //Carga de archivos
  $scope.subirCopade = function () {
    var file = $('#myFile1:file')[0].files[0];
    var name = file.name;
  
    var copade_file = $('#myFile1').val()
    if (copade_file == '') {
      alertFactory.warning('Selecciona un archivo.')
    } else {
      $('.btn-copade').attr('disabled', 'disabled')

      ordenPorCobrarRepository.postSubirCopade().then(function (result) {
        var Respuesta = result
        document.getElementById('frm_copade').reset()
        //$('.lbl_evidencia').text('Seleccionar archivo')

        var _nombre = Respuesta.data.data[0].nombre
        var _descri = ''
        var _ruta = Respuesta.data.data[0].PathDB
        //var _orden = Respuesta.data.data[0].Param.idOrden

        /*consultaCitasRepository.agregarEvidencias(_nombre, _descri, _ruta, _orden).then(function (result) {
          $scope.getOrdenEvidencias($scope.userData.idUsuario, $scope.numeroOrden)
          $('.btn-evidencia').removeAttr('disabled')
        })*/
      }, function (error) { })
    }
    /*var archivo = null;
    
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      archivo = reader.result;
      $scope.promise = ordenPorCobrarRepository.post("dcUpload", { 'archivoCopade': archivo,"nombre":name }).then(function (result) {
          if(result.data > 0){
            //todo ok
          }      
      })
      
    };
*/
    
    
    
    /*var ajax = new XMLHttpRequest;
    
    var formData = new FormData;
    formData.append('pdf', file);
    
    //ajax.upload.addEventListener("progress", myProgressHandler, false);
    //ajax.addEventListener('load', myOnLoadHandler, false);
    ajax.open('POST', '/dcUpload', true);
    ajax.send(formData);*/
  }
  
  $scope.seleccionFacturaAbonadaCotizacion= function (idTrabajoAgrupado, ordenGlobal, total) {
    //Marcar seleccionados
     //var factura = false;
     $scope.totalSeleccionadoSuma = 0;
    if ($scope.checkedFacturasTotal.length > 0) {
        for (i = 0; i < $scope.checkedFacturasTotal.length; i++) {
            if ($scope.checkedFacturasTotal[i].ordenGlobal == ordenGlobal) {
                //factura = true;
                 if ($scope.checkedFacturasTotal[i].check == false) {
                    $scope.checkedFacturasTotal[i].check = true;
                        angular.forEach($scope.selectCotizaciones, function(value, key) {
                         if(value.COP_ORDENGLOBAL == ordenGlobal)
                            value.selected = true;
                        });
                }else{
                    $scope.checkedFacturasTotal[i].check = false; 
                        angular.forEach($scope.selectCotizaciones, function(value, key) {
                         if(value.COP_ORDENGLOBAL == ordenGlobal)
                            value.selected = false;
                        });
                } 
            }
        } 
    } 
    for (i = 0; i < $scope.checkedFacturasTotal.length; i++) {
        if ($scope.checkedFacturasTotal[i].check) {
           $scope.totalSeleccionadoSuma+=parseFloat($scope.checkedFacturasTotal[i].total);
        }
    }
  }

  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 
})
