registrationModule.controller('cotizacionConsultaController', function ($scope, $rootScope, localStorageService, alertFactory, globalFactory, cotizacionConsultaRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'aprobaciones';

    $scope.filtroEstatus = '';
    $scope.fechaMes = '';
    $scope.message = "Buscando...";
    $scope.idUsuario = '2';
    // $scope.userData = localStorageService.get('userData');
    // $scope.userData.idTipoUsuario != 4 ? $scope.vistaPrecio = 1 : $scope.vistaPrecio = 2;
    $scope.datosCita = {
            idCita: ''
        }

    $scope.init = function () {
        $scope.devuelveZonas();
        $scope.devuelveEjecutivos();
    }

    //realiza consulta según filtros
    $scope.consultaCotizacionesFiltros = function(PorOrden) {
      if (PorOrden == 1){
        $scope.promise = cotizacionConsultaRepository.get($scope.idUsuario, null, null, null, null, null, null, $scope.numeroTrabajo == '' || $scope.numeroTrabajo == undefined ? null : $scope.numeroTrabajo, PorOrden).then(function (result) {
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
        $scope.promise = cotizacionConsultaRepository.get($scope.idUsuario, $scope.zonaSelected == '' || $scope.zonaSelected == undefined ? null : $scope.zonaSelected, $scope.ejecutivoSelected == '' || $scope.ejecutivoSelected == undefined ? null : $scope.ejecutivoSelected, $scope.fechaMes == '' || $scope.fechaMes == undefined ? null : $scope.fechaMes, $scope.fechaInicio == '' || $scope.fechaInicio == undefined ? null : $scope.fechaInicio, $scope.fechaFin == '' || $scope.fechaFin == undefined ? null : $scope.fechaFin, this.obtieneFechaMes() == '' ? null : this.obtieneFechaMes(), null, PorOrden).then(function (result) {
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
        cotizacionConsultaRepository.getZonas($scope.idUsuario).then(function(zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;
            }
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    };

    //obtiene los usuarios ejecutivos
    $scope.devuelveEjecutivos = function(){
        cotizacionConsultaRepository.obtieneEjecutivos($scope.idUsuario).then(function(ejecutivos){
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
                        $scope.cancelarOrden(idCotizacion);
                        location.href = '/cotizacionconsulta';
                    } else {
                        swal("Cotizacion no cancelada");
                    }
                });
        });
    };

    $scope.cancelarCotizacion = function(idCotizacion) {
        $scope.promise = cotizacionConsultaRepository.cancelaCotizacion($scope.idUsuario, idCotizacion).then(function () {
               swal("Trabajo terminado!", "La cotización se ha cancelado");
         },
         function (error) {
             alertFactory.error('No se pudo cancelar la cotización, inténtelo más tarde.');
         });
    };

    $scope.AutorizacionDetalle = function (nOrden) {
        location.href = "/detalle?orden=" + nOrden;
    };

});
