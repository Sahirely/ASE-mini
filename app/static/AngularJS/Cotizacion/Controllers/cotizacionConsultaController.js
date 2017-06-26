registrationModule.controller('cotizacionConsultaController', function ($scope, $rootScope, $routeParams, userFactory, alertFactory, globalFactory, cotizacionConsultaRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'aprobaciones';

    $scope.filtroEstatus = '';
    $scope.fechaMes = '';
    $scope.message = "Buscando...";
    $scope.userData = {};
    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = [];
    $scope.NivelesZona = [];
    $scope.Zonas = [];
    $scope.estatusDashboard = 0;

    $scope.cotizaciones = [];

     $scope.show_sumatorias = false;

    $scope.sumatoria_conPresupuesto = 0;
     $scope.sumatoria_sinPresupuesto = 0;

    $scope.init = function () {
        //para obtener las zonas promero se inicializa la primer zona padre.
        userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        $scope.estatusDashboard = $routeParams.e;
        if ($scope.estatusDashboard != null || $scope.estatusDashboard != undefined) {
          $scope.filtroEstatus = $scope.estatusDashboard; 
        }else{
          $scope.filtroEstatus = '';
        }

        $scope.consultaCotizacionesFiltros();

        $scope.ZonasSeleccionadas[0] = "0";
        $scope.obtieneNivelZona();
        //termina el cargado de las Zonas del usuario.
        $scope.devuelveEjecutivos();
        globalFactory.filtrosTabla("ordenesPresupuesto", "Ordenes Con Presupuesto", 100);
        globalFactory.filtrosTabla("ordenesSinPresupuesto", "Ordenes Sin Presupuesto", 100);


        if ($scope.userData.idRol == 2) {
            $scope.show_sumatorias = true;
        };

    }

    //obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
    $scope.obtieneNivelZona = function(){
        $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.userData.contratoOperacionSeleccionada).then(function (result) {
            $scope.totalNiveles = result.data.length;
            if(result.data.length > 0){
              $scope.NivelesZona = result.data;
              $scope.devuelveZonas();
            }
         },
         function (error) {
             alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
         });
    }

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function() {
      for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x ++){
        cotizacionConsultaRepository.getZonas($scope.userData.contratoOperacionSeleccionada, $scope.NivelesZona[$scope.x].idNivelZona).then(function(result) {
          if (result.data.length > 0){
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

    $scope.cambioZona = function(id, orden){
      //al cambiar de zona se establece como zona seleccionada.
      $scope.zonaSelected = id;
      //se limpian los combos siguientes.
      for($scope.x = orden+1; $scope.x <= $scope.totalNiveles; $scope.x ++){
        $scope.ZonasSeleccionadas[$scope.x] = "0";
      }
    }

    //realiza consulta según filtros
    $scope.consultaCotizacionesFiltros = function() {
      $scope.cotizaciones = [];
      $scope.cotizacionesSinPresupuesto = [];
      $scope.sumatoria_conPresupuesto = 0;
      $scope.sumatoria_sinPresupuesto = 0;
      $('.ordenesPresupuesto').DataTable().destroy();
      $('.ordenesSinPresupuesto').DataTable().destroy();
      var Zona = $scope.zonaSelected == '' || $scope.zonaSelected == undefined ? 0 : $scope.zonaSelected;
      var idEjecutivo = $scope.ejecutivoSelected == '' || $scope.ejecutivoSelected == undefined ? 0 : $scope.ejecutivoSelected;
      var fechaMes = this.obtieneFechaMes();
      var rInicio = $scope.fechaInicio == '' || $scope.fechaInicio == undefined ? '' : $scope.fechaInicio;
      var rFin = $scope.fechaFin == '' || $scope.fechaFin == undefined ? '' : $scope.fechaFin;
      var fecha = $scope.fecha == '' || $scope.fecha == undefined ? '' : $scope.fecha;
      var numeroOrden = $scope.numeroTrabajo == '' || $scope.numeroTrabajo == undefined ? '' : $scope.numeroTrabajo;
      $scope.promise = cotizacionConsultaRepository.ObtenerOrdenesTipoConsulta( $scope.userData.contratoOperacionSeleccionada, Zona, 0, idEjecutivo, fechaMes, rInicio, rFin, fecha, numeroOrden, 2).then(function (result){
          if (result.data.length > 0){
            
              result.data.forEach(function(item) {
                  var existe = false;

                    debugger;
                       if (item.tienePresupuesto==1) {
                          $scope.sumatoria_conPresupuesto += item.venta;
                      }else if (item.tienePresupuesto==0) {
                          $scope.sumatoria_sinPresupuesto += item.venta;
                      }

                  $scope.cotizaciones.forEach(function(value){
                      if (value.idOrden == item.idOrden){
                          existe = true;
                      }
                      
                  });
                  if (!existe){
                      $scope.cotizaciones.push(item);
                  }
              });
              globalFactory.filtrosTabla("ordenesPresupuesto", "Ordenes Con Presupuesto", 5);
              globalFactory.filtrosTabla("ordenesSinPresupuesto", "Ordenes Sin Presupuesto", 5);
          } else {
              $scope.cotizaciones = [];
              globalFactory.filtrosTabla("ordenesPresupuesto", "Ordenes Con Presupuesto", 5);
              globalFactory.filtrosTabla("ordenesSinPresupuesto", "Ordenes Sin Presupuesto", 5);
              alertFactory.info('No se Encontraron Ordenes en Aprobación.');
          }

      },function (error) {
          alertFactory.error('No se encontraron cotizaciones, inténtelo más tarde.')
      });
      // $scope.promise = cotizacionConsultaRepository.get($scope.idUsuario, Zona, idEjecutivo, fechaMes, rInicio, rFin, fecha, numeroOrden, PorOrden, presupuesto)
      // .then(function (result) {
      //         if (result.data.length == 0) {
      //             alertFactory.info('No se encontraron cotizaciones.');
      //         }
      //         if (presupuesto == 1){
      //            $scope.cotizaciones = result.data;
      //            globalFactory.filtrosTabla("ordenesPresupuesto", "Ordenes Con Presupuesto", 10);
      //            //globalFactory.waitDrawDocument("dataTableCotizaciones_", "");
      //         }else if(presupuesto == 0){
      //             $scope.cotizacionesSinPresupuesto = result.data;
      //             globalFactory.filtrosTabla("ordenesSinPresupuesto", "Ordenes Sin Presupuesto", 10);
      //             //globalFactory.waitDrawDocument("dataTableCotizacionesSinPresupuesto","");
      //         }
      //      },
      //      function (error) {
      //          alertFactory.error('No se encontraron cotizaciones, inténtelo más tarde.');
      //      });
    };

    //obtiene los usuarios ejecutivos
    $scope.devuelveEjecutivos = function(){
        cotizacionConsultaRepository.obtieneEjecutivos($scope.userData.contratoOperacionSeleccionada).then(function(ejecutivos){
            if(ejecutivos.data.length > 0){
                $scope.listaEjecutivos = ejecutivos.data;
            }
        }, function(error){
            alertFactory.error('No se pudo recuperar información de los ejecutivos');
        });
    };

    $scope.MesChange = function (){
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
        $scope.fecha = '';
    };

    $scope.RangoChange = function(){
        $scope.fechaMes = '';
        $scope.fecha = '';
        this.ValidaRangoFechas();
    };

    $scope.FechaChange = function(){
        $scope.fechaMes = '';
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
    };

    $scope.ValidaRangoFechas = function(){
      var isValid = true;

      //valida si están seleccionadas ambas fechas del rango
      if ($scope.fechaInicio != '' && $scope.fechaFin != ''){
          var fechaInicial = $scope.fechaInicio.split('/');
          var fechaFinal = $scope.fechaFin.split('/');

          //valida el anio
          if(parseInt(fechaInicial[2]) > parseInt(fechaFinal[2])){
              isValid = false;
          }else if(parseInt(fechaInicial[2]) == parseInt(fechaFinal[2])){
              //valida el mes
              if(parseInt(fechaInicial[0]) > parseInt(fechaFinal[0])){
                  isValid = false;
              }else if(parseInt(fechaInicial[0]) == parseInt(fechaFinal[0])){
                  //valida el día
                  if(parseInt(fechaInicial[1]) > parseInt(fechaFinal[1])){
                    isValid = false;
                  }
              }
          }

          if(isValid == false){
              $scope.fechaInicio = '';
              $scope.fechaFin = '';
              alertFactory.info('La Fecha de Fin Debe Ser Posterior a la Fecha de Inicio.');
          }
      }
    };

    //obtiene el mes en formato de fecha
    $scope.obtieneFechaMes = function(){
      var result = '';
      if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
          var fechaPartida = $scope.fechaMes.split('-');
          if (fechaPartida[0] == 'Enero') {
              result = fechaPartida[1] + '/01/01' ;
          } else if (fechaPartida[0] == 'Febrero') {
              result = fechaPartida[1] + '/02/01' ;
          } else if (fechaPartida[0] == 'Marzo') {
              result = fechaPartida[1] + '/03/01' ;
          } else if (fechaPartida[0] == 'Abril') {
              result = fechaPartida[1] + '/04/01' ;
          } else if (fechaPartida[0] == 'Mayo') {
              result = fechaPartida[1] + '/05/01' ;
          } else if (fechaPartida[0] == 'Junio') {
              result = fechaPartida[1] + '/06/01';
          } else if (fechaPartida[0] == 'Julio') {
              result = fechaPartida[1] + '/07/01' ;
          } else if (fechaPartida[0] == 'Agosto') {
              result = fechaPartida[1] + '/08/01' ;
          } else if (fechaPartida[0] == 'Septiembre') {
              result = fechaPartida[1] + '/09/01' ;
          } else if (fechaPartida[0] == 'Octubre') {
              result = fechaPartida[1] + '/10/01' ;
          } else if (fechaPartida[0] == 'Noviembre') {
              result = fechaPartida[1] + '/11/01' ;
          } else if (fechaPartida[0] == 'Diciembre') {
              result = fechaPartida[1] + '/12/01' ;
          }
        }
      return result;
    }

    //Abre la modal para confirmar la cancelación de la orden
    $scope.cancelarAprobacion = function (idCotizacion) {
        $('.btnTerminarTrabajo').ready(function () {
            swal({
                    title: "¿Esta seguro que desea cancelar la cotización?",
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
                        $scope.cancelarCotizacion(idCotizacion);
                        location.href = '/cotizacionconsulta';
                    } else {
                        swal("Cotizacion no cancelada");
                    }
                });
        });
    };

    $scope.cancelarCotizacion = function(idCotizacion) {
        $scope.promise = cotizacionConsultaRepository.cancelaCotizacion($scope.userData.idUsuario, idCotizacion).then(function () {
               swal("Trabajo terminado!", "La cotización se ha cancelado");
         },
         function (error) {
             alertFactory.error('No se pudo cancelar la cotización, inténtelo más tarde.');
         });
    };

    $scope.AutorizacionDetalle = function (nOrden) {
        location.href = "/detalle?orden=" + nOrden + "&estatus=4";
    };

});
