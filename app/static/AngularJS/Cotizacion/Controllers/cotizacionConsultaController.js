registrationModule.controller('cotizacionConsultaController', function ($scope, $rootScope, localStorageService, alertFactory, globalFactory, cotizacionConsultaRepository, dashBoardRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'aprobaciones';

    $scope.filtroEstatus = '';
    $scope.fechaMes = '';
    $scope.message = "Buscando...";
    $scope.userData = localStorageService.get('userData');
    $scope.userData.idTipoUsuario != 4 ? $scope.vistaPrecio = 1 : $scope.vistaPrecio = 2;
    $scope.datosCita = {
            idCita: ''
        }

    $scope.init = function () {
        $scope.devuelveZonas();
        $scope.devuelveEjecutivos();
        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true
        });
        $('#divfechaMes .input-group.date').datepicker({
            minViewMode: 1,
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            todayHighlight: true,
            format: 'MM-yyyy'
        });
    }

    //realiza consulta según filtros
    $scope.consultaCotizacionesFiltros = function(PorOrden) {
      if (PorOrden == 1){
        $scope.promise = cotizacionConsultaRepository.get(null, null, null, null, null, null, $scope.numeroTrabajo == '' || $scope.numeroTrabajo == undefined ? null : $scope.numeroTrabajo, PorOrden).then(function (result) {
               if (result.data.length > 0) {
                   $scope.cotizaciones = result.data;
                   globalFactory.waitDrawDocument("dataTableCotizaciones", "OrdenporCobrar");
               } else {
                   alertFactory.info('No se encontraron cotizaciones.');
               }
           },
           function (error) {
               alertFactory.error('No se encontraron cotizaciones, inténtelo más tarde.');
           });
      } else if(PorOrden == 0){
        $scope.promise = cotizacionConsultaRepository.get($scope.zonaSelected == '' || $scope.zonaSelected == undefined ? null : $scope.zonaSelected, $scope.ejecutivoSelected == '' || $scope.ejecutivoSelected == undefined ? null : $scope.ejecutivoSelected, $scope.fechaMes == '' || $scope.fechaMes == undefined ? null : $scope.fechaMes, $scope.fechaInicio == '' || $scope.fechaInicio == undefined ? null : $scope.fechaInicio, $scope.fechaFin == '' || $scope.fechaFin == undefined ? null : $scope.fechaFin, this.obtieneFechaMes() == '' ? null : this.obtieneFechaMes(), null, PorOrden).then(function (result) {
               if (result.data.length > 0) {
                   $scope.cotizaciones = result.data;
                   globalFactory.waitDrawDocument("dataTableCotizaciones", "OrdenporCobrar");
               } else {
                   alertFactory.info('No se encontraron cotizaciones.');
               }
           },
           function (error) {
               alertFactory.error('No se encontraron cotizaciones, inténtelo más tarde.');
           });
      }
    };

    //obtiene las zonas
    $scope.devuelveZonas = function() {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function(zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;
            }
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    };

    //obtiene los usuarios ejecutivos
    $scope.devuelveEjecutivos = function(){
        cotizacionConsultaRepository.obtieneEjecutivos().then(function(ejecutivos){
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
    }

    $scope.RangoChange = function(){
        $scope.fechaMes = '';
        $scope.fecha = '';
    }

    $scope.FechaChange = function(){
        $scope.fechaMes = '';
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
    }

    //obtiene el mes en formato de fecha
    $scope.obtieneFechaMes = function() {
      var result = '';
      if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
          var fechaPartida = $scope.fechaMes.split('-');
          if (fechaPartida[0] == 'Enero') {
              result = '01/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Febrero') {
              result = '01/02/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Marzo') {
              result = '01/03/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Abril') {
              result = '01/04/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Mayo') {
              result = '01/05/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Junio') {
              result = '01/06/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Julio') {
              result = '01/07/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Agosto') {
              result = '01/08/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Septiembre') {
              result = '01/09/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Octubre') {
              result = '01/10/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Noviembre') {
              result = '01/11/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Diciembre') {
              result = '01/12/' + fechaPartida[1];
          }
        }
      return result;
  };

    //Abre la modal para la cancelación de la orden
    $scope.cancelarAprobacion = function (idTrabajo,idCotizacion) {
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
                        //$scope.cancelarOrden(idTrabajo,idCotizacion);
                        swal("Trabajo terminado!", "La órden se ha cancelado");
                        location.href = '/cotizacionconsulta';
                    } else {
                        swal("No cancelada");
                    }
                });
        });
    }

    $scope.AutorizacionDetalle = function (nOrden) {
        location.href = "/detalle?orden=" + nOrden;
    }

});
