registrationModule.controller('trabajoController', function($scope, $modal, userFactory, $rootScope,$routeParams, $location, localStorageService, alertFactory, globalFactory, trabajoRepository, ordenServicioRepository, cotizacionConsultaRepository) {
    $rootScope.modulo = 'ordenServicio'; // <<-- Para activar en que opción del menú se encuentra

    // $scope.idOperacion           = 2;
    // $scope.idUsuario             = 2;
    // $scope.idContratoOperacion   = 2;
    $scope.idOperacion = $scope.userData.idOperacion;
    $scope.idUsuario = $scope.userData.idUsuario;
    $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;

    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = {};
    $scope.NivelesZona = [];
    $scope.Zonas = [];
    $scope.idZona = 0;

    $scope.fechaMes      = '';
    $scope.fechaInicio   = '';
    $scope.fechaFin      = '';
    $scope.fecha         = '';
    $scope.numeroTrabajo = '';

    $scope.idOrden_Temp  = 0;
    $scope.filtroEstatus = '';

    $scope.sumatoria_entrega=0;
    $scope.sumatoria_proceso=0;

    $scope.Init = function() {
      $scope.userData = userFactory.getUserData();
      userFactory.ValidaSesion();
        $scope.show_proceso=true;
        $scope.show_entrega=false;
        $scope.muestraTabla = false;
        $scope.show_sumatorias = false;

        //para obtener las zonas promero se inicializa la primer zona padre.
        $scope.ZonasSeleccionadas[0] = "0";
        // $scope.obtieneNivelZona();
        $scope.obtieneNivelZona();
        //termina el cargado de las Zonas del usuario.
        $scope.devuelveEjecutivos();

        // globalFactory.filtrosTabla("ordenesPresupuesto", "Ordenes Con Presupuesto", 10);
        // globalFactory.filtrosTabla("ordenesSinPresupuesto", "Ordenes Sin Presupuesto", 10);

        //------------------------------------------------------------------//
        //--$scope.getOrdenesServicio(3); En el SP se utiliza
        //                                  1 pantalla consulta de citas
        //                                  2 pantalla Aprobación
        //                                  3 pantalla Órdenes de Servicio
        //-----------------------------------------------------------------//
        //$scope.getOrdenesServicio(3);

        // $scope.estatusValidador = 5;
        $scope.estatusDashboard = $routeParams.e;
        if ($scope.estatusDashboard != null || $scope.estatusDashboard != undefined) {
            $scope.filtroEstatus = $scope.estatusDashboard;
            $scope.getOrdenesServicioInit(3);
            if($scope.filtroEstatus == 0 || $scope.filtroEstatus == 5){
                $scope.show_proceso=true;
                $scope.show_entrega=false;
            }else{
                $scope.show_proceso=false;
                $scope.show_entrega=true;
            }

        }else{
            $scope.getOrdenesServicio(3);
        }

        if ($scope.userData.idRol == 2) {
            $scope.show_sumatorias = true;
        };


    };

    $scope.cambioFiltro = function(){
          globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 100);
          if ($scope.filtroEstatus == 55){
              $scope.procesoActive = true;
              $scope.entregaActive = false;
                  $scope.estatusValidador = 5;
                  $scope.estadoGarantia = '';
                  $scope.sumatoria_proceso = 0;
                   $scope.ordenes.forEach(function(item) {
                      if (item.idEstatusOrden==5) {
                          $scope.sumatoria_proceso += item.venta;
                      }
                  });
          }
          if ($scope.filtroEstatus == 0){
              $scope.procesoActive = true;
              $scope.entregaActive = false;
                  $scope.estatusValidador = 5;
                  $scope.estadoGarantia = 1;
                  $scope.sumatoria_proceso = 0;
                   $scope.ordenes.forEach(function(item) {
                      if (item.idEstatusOrden == 5 && item.idGarantia == 1) {
                          $scope.sumatoria_proceso += item.venta;
                      }
                  });
          }
          if ($scope.filtroEstatus == 5){
              $scope.procesoActive = true;
              $scope.entregaActive = false;
                  $scope.estatusValidador = $scope.filtroEstatus;
                  $scope.estadoGarantia = 0;
                  $scope.sumatoria_proceso = 0;
                   $scope.ordenes.forEach(function(item) {
                      if (item.idEstatusOrden == 5  && item.idGarantia == 0) {
                          $scope.sumatoria_proceso += item.venta;
                      }

                  });
          }
          if ($scope.filtroEstatus == 67){
              $scope.procesoActive = false;
              $scope.entregaActive = true;
               $scope.estatusValidador = '';
               $scope.estadoEstatus = 1;
               $scope.sumatoria_entrega = 0;
               $scope.ordenes.forEach(function(item) {
                  if (item.conjuntoEstatus== 1 ) {
                     $scope.sumatoria_entrega += item.venta;
                  }
              });
          }
          if ($scope.filtroEstatus == 6){
              $scope.procesoActive = false;
              $scope.entregaActive = true;
                  $scope.estatusValidador = $scope.filtroEstatus;
              $scope.sumatoria_entrega = 0;
              $scope.ordenes.forEach(function(item) {
                  if (item.idEstatusOrden== 6) {
                     $scope.sumatoria_entrega += item.venta;
                  }

              });

          }
          if ($scope.filtroEstatus == 7){
              $scope.procesoActive = false;
              $scope.entregaActive = true;
                  $scope.estatusValidador = $scope.filtroEstatus;
               $scope.sumatoria_entrega = 0;
               $scope.ordenes.forEach(function(item) {
                  if (item.idEstatusOrden== 7 ) {
                     $scope.sumatoria_entrega += item.venta;
                  }
              });
          }
      }


/*  $scope.userFilter = function(filter) {
    return function(user) {
      return user.idEstatusOrden == filter.idEstatusOrden || user.idEstatusOrden2 == filter.idEstatusOrden2;
    };
  };*/

    $scope.menu = function(data){
        $scope.show_proceso=false;
        $scope.show_entrega=false;
        globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 100);
        switch(data)
        {
              case 0:
                $scope.show_proceso=true;
                $scope.estatusValidador = 5;
                $scope.estadoGarantia = '';
                $scope.filtroEstatus = 55;
                $scope.sumatoria_proceso = 0;
                 $scope.ordenes.forEach(function(item) {
                    if (item.idEstatusOrden==5) {
                        $scope.sumatoria_proceso += item.venta;
                    }
                });
              break;

              case 1:
                $scope.show_entrega=true;
                $scope.estatusValidador = '';
                $scope.estadoEstatus = 1;
                $scope.filtroEstatus = 67;
                 $scope.sumatoria_entrega = 0;
                 $scope.ordenes.forEach(function(item) {
                    if (item.conjuntoEstatus== 1 ) {
                       $scope.sumatoria_entrega += item.venta;
                    }
                });
              break;
        }
    }

    $scope.indiceOrdenes = -1;
    $scope.OpenModal = function( index, Id ){
        $scope.fecha_inicio  = '';
        $scope.hora_inicio   = '';
        $scope.indiceOrdenes = index;
        $scope.idOrden_Temp  = Id;
        $("#myModal").modal();
    }

    $scope.fecha_error = false;
    $scope.Guardar_Fecha = function(){
        if( $scope.indiceOrdenes == -1 ){
            //console.log('Esta ocurriendo un error, por algun motivo no se esta seleccionando el indice de ragistro');
        }
        else{
            if( $scope.fecha_inicio == '' || $scope.fecha_inicio === undefined ){
                $scope.fecha_error = true;
                $scope.msg_error = 'Debes ingresar la fecha de Inicio del Trabajo';

                setTimeout( function(argument) {
                    $scope.fecha_error = false;
                    $scope.msg_error = '';
                }, 2000 );
            }
            else if( $scope.hora_inicio == '' || $scope.hora_inicio === undefined ){
                $scope.fecha_error = true;
                $scope.msg_error = 'Debes ingresar la hora de Inicio del Trabajo';

                setTimeout( function(argument) {
                    $scope.fecha_error = false;
                    $scope.msg_error = '';
                }, 2000 );
            }
            else{
                var fechaTrabajo = $scope.fecha_inicio + ' ' + $scope.hora_inicio;

                trabajoRepository.saveFechaTrabajo($scope.idOrden_Temp, fechaTrabajo).then(function( registros ){
                    $scope.ordenes[ $scope.indiceOrdenes ].fechaInicioTrabajo = fechaTrabajo;
                }, function(error){
                    alertFactory.error('No se pudo recuperar la respuesta');
                });

                $("#myModal").modal('hide');

            }

        }

    }

    $scope.cambioZona = function(id, orden, zona, zonaseleccionada) {
        //al cambiar de zona se establece como zona seleccionada.
        $scope.zonaSelected = id;

        // $scope.LoadData();
        //se limpian los combos siguientes.
        for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
        }
    };

    //obtiene los usuarios ejecutivos
    $scope.devuelveEjecutivos = function(){
        cotizacionConsultaRepository.obtieneEjecutivos($scope.idContratoOperacion).then(function(ejecutivos){
            if(ejecutivos.data.length > 0){
                $scope.listaEjecutivos = ejecutivos.data;
            }
        }, function(error){
            alertFactory.error('No se pudo recuperar información de los ejecutivos');
        });
    };

    $scope.MesChange = function() {
        var array = $scope.fechaMes.split('-');
        var mes = '';
        switch( array[0] ){
            case 'Enero':      mes = '01'; break;
            case 'Febrero':    mes = '02'; break;
            case 'Marzo':      mes = '03'; break;
            case 'Abril':      mes = '04'; break;
            case 'Mayo':       mes = '05'; break;
            case 'Junio':      mes = '06'; break;
            case 'Julio':      mes = '07'; break;
            case 'Agosto':     mes = '08'; break;
            case 'Septiembre': mes = '09'; break;
            case 'Octubre':    mes = '10'; break;
            case 'Noviembre':  mes = '11'; break;
            case 'Diciembre':  mes = '12'; break;
        }

        $scope.fechaMes = array[1] + '/' + mes + '/01';

        $scope.fechaInicio = '';
        $scope.fechaFin = '';
        $scope.fecha = '';
    };

    $scope.RangoChange = function() {
        $scope.fechaMes = '';
        $scope.fecha = '';
        this.ValidaRangoFechas();
    };

    $scope.FechaChange = function() {
        $scope.fechaMes = '';
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
    };

    $scope.getOrdenesServicio = function(tipoConsulta) {
        $scope.estatusValidador = '!7';
        $('.clockpicker').clockpicker();

        $scope.numeroTrabajo = '';
        $('.ordenservicio').DataTable().destroy();
        cotizacionConsultaRepository.ObtenerOrdenesTipoConsulta(
            $scope.fechaInicio,
            $scope.fechaFin,
            $scope.fecha,
            $scope.fechaMes,
            $scope.numeroTrabajo,
            $scope.zonaSelected,
            $scope.ejecutivoSelected,
            $scope.userData.idUsuario,
            $scope.idContratoOperacion,
            tipoConsulta) // $scope.idUsuario
        .then(function(result) {
            $scope.ordenes = result.data;
            $scope.muestraTabla = true;
            //if ($scope.estatusDashboard == null || $scope.estatusDashboard == undefined) {
                $scope.menu(0);
                $scope.procesoActive = true;
            //}
            //globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 5);
        });
    };

    $scope.getOrdenesServicioInit = function(tipoConsulta) {

        $scope.estatusValidador = '!7';
        $('.clockpicker').clockpicker();

        $scope.numeroTrabajo = '';
        $('.ordenservicio').DataTable().destroy();

        cotizacionConsultaRepository.ObtenerOrdenesTipoConsulta(
            $scope.fechaInicio,
            $scope.fechaFin,
            $scope.fecha,
            $scope.fechaMes,
            $scope.numeroTrabajo,
            $scope.zonaSelected,
            $scope.ejecutivoSelected,
            $scope.userData.idUsuario,
            $scope.idContratoOperacion,
            tipoConsulta) // $scope.idUsuario
        .then(function(result) {

            if (result.data.length>0) {
                 //rInicio, rFin, fecha, fechaMes, numeroOrden, Zona, idEjecutivo, $scope.userData.idUsuario, $scope.userData.contratoOperacionSeleccionada, 2

                $scope.ordenes = result.data;
                $scope.cambioFiltro();
                $scope.muestraTabla = true;
            }
            //globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 100);
        });
    };

/*    $scope.getOrdenesByNumero = function(tipoConsulta) {
        debugger;
        $('.clockpicker').clockpicker();

        if( $scope.numeroTrabajo == '' ){
            $("#numeroTrabajo").focus();
            // alert('Numero de Orden vacío');
        }
        else{
            $('.ordenservicio').DataTable().destroy();
            cotizacionConsultaRepository.consultarOrdenes(
                tipoConsulta,
                $scope.idContratoOperacion,
                0,
                '',
                '',
                '',
                '',
                $scope.numeroTrabajo,
                0, // Nivel Zona
                0) // $scope.idUsuario
            .then(function(result) {
                $scope.ordenes = result.data;

                $scope.muestraTabla = true;
                globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 100);
            });
        }
    };*/

    $scope.detalleOrden = function(orden) {
        location.href = '/detalle?orden=' + orden.numeroOrden + '&estatus=5';
    };

    // =================================================================================
    //obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
    $scope.obtieneNivelZona = function() {
        // console.log( "idContratoOperacion", $scope.idContratoOperacion );
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

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function() {
        for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
            cotizacionConsultaRepository.getZonas($scope.idContratoOperacion, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function(result) {
                if (result.data.length > 0) {
                    var valueToPush      = {};
                    valueToPush.orden    = result.data[0].orden;
                    valueToPush.etiqueta = result.data[0].etiqueta;
                    valueToPush.data     = result.data;
                    $scope.Zonas.push(valueToPush);
                    //se establece por default cada zona seleccionada en 0
                    $scope.ZonasSeleccionadas[result.data[0].orden] = "0";
                }
            }, function(error) {
                alertFactory.error('No se pudo recuperar información de las zonas');
            });
        }
    };

    // $scope.cambioZona = function(id, orden, zona, zonaseleccionada) {
    //     //al cambiar de zona se establece como zona seleccionada.
    //     $scope.zonaSelected = id;

    //     $scope.LoadData();
    //     //se limpian los combos siguientes.
    //     for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
    //         $scope.ZonasSeleccionadas[$scope.x] = "0";
    //     }
    // };
});
