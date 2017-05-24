registrationModule.controller('cotizacionConsultaController', function ($scope, $rootScope, localStorageService, alertFactory, globalFactory, cotizacionConsultaRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'aprobaciones';

    $scope.filtroEstatus = '';
    $scope.fechaMes = '';
    $scope.message = "Buscando...";
    $scope.idUsuario = '2';
    $scope.zonaSelected = '';
    $scope.TieneZona2 = false;
    $scope.TieneZona3= false;
    $scope.TieneZona4 = false;
    $scope.nivelesZona = 0;
    // $scope.userData = localStorageService.get('userData');
    // $scope.userData.idTipoUsuario != 4 ? $scope.vistaPrecio = 1 : $scope.vistaPrecio = 2;
    $scope.datosCita = {
            idCita: ''
        }

    $scope.init = function () {
        $scope.obtieneNivelZona();
        $scope.devuelveZonas(1,0);
        $scope.devuelveEjecutivos();
    }

    //realiza consulta según filtros
    $scope.consultaCotizacionesFiltros = function(PorOrden, presupuesto) {
      $scope.cotizaciones = [];
      $scope.cotizacionesSinPresupuesto = [];
      $('.dataTableCotizaciones_').DataTable().destroy();
      $('.dataTableCotizacionesSinPresupuesto').DataTable().destroy();
      var Zona = $scope.zonaSelected == '' || $scope.zonaSelected == undefined ? null : $scope.zonaSelected;
      var idEjecutivo = $scope.ejecutivoSelected == '' || $scope.ejecutivoSelected == undefined ? null : $scope.ejecutivoSelected;
      var fechaMes = this.obtieneFechaMes() == '' ? null : this.obtieneFechaMes();
      var rInicio = $scope.fechaInicio == '' || $scope.fechaInicio == undefined ? null : $scope.fechaInicio;
      var rFin = $scope.fechaFin == '' || $scope.fechaFin == undefined ? null : $scope.fechaFin;
      var fecha = $scope.fecha == '' || $scope.fecha == undefined ? null : $scope.fecha;
      var numeroOrden = $scope.numeroTrabajo == '' || $scope.numeroTrabajo == undefined ? null : $scope.numeroTrabajo;
      $scope.promise = cotizacionConsultaRepository.get($scope.idUsuario, Zona, idEjecutivo, fechaMes, rInicio, rFin, fecha, numeroOrden, PorOrden, presupuesto)
      .then(function (result) {
            debugger;
              if (result.data.length == 0) {
                  alertFactory.info('No se encontraron cotizaciones.');
              }
              if (presupuesto == 1){
                 $scope.cotizaciones = result.data;
                 globalFactory.waitDrawDocument("dataTableCotizaciones_", "");
              }else if(presupuesto == 0){
                  $scope.cotizacionesSinPresupuesto = result.data;
                  globalFactory.waitDrawDocument("dataTableCotizacionesSinPresupuesto","");
              }
           },
           function (error) {
               alertFactory.error('No se encontraron cotizaciones, inténtelo más tarde.');
           });
    };

    $scope.SeleccionoZona = function(nivelZona){
        if(nivelZona < $scope.nivelesZona){
          $scope.TieneZona2 = false;
          $scope.TieneZona3= false;
          $scope.TieneZona4 = false;
          switch (nivelZona) {
              case 1:
                  if($scope.zonaSelected != null){
                      $scope.devuelveZonas(2, $scope.zonaSelected);
                      $scope.TieneZona2 = true;
                  }
                  break;
              case 2:
                  if($scope.zonaSelected != null){
                      $scope.devuelveZonas(3, $scope.zonaSelected);
                      $scope.TieneZona2 = true;
                      $scope.TieneZona3 = true;
                  }
                  break;
              case 3:
                  if($scope.zonaSelected != null){
                      $scope.devuelveZonas(4, $scope.zonaSelected);
                      $scope.TieneZona2 = true;
                      $scope.TieneZona3 = true;
                      $scope.TieneZona4 = true;
                  }
                  break;
            }
        }
    }

    $scope.obtieneNivelZona = function(){
        $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.idUsuario).then(function (result) {
            debugger;
            $scope.nivelesZona = result.data[0].Niveles;
         },
         function (error) {
             alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
         });
    }

    //obtiene las zonas
    $scope.devuelveZonas = function(nivel, padre) {
        cotizacionConsultaRepository.getZonas(nivel, padre).then(function(zonas) {
              switch (nivel) {
                  case 1: $scope.zonas = zonas.data; break;
                  case 2: $scope.zonas2 = zonas.data; break;
                  case 3: $scope.zonas3 = zonas.data; break;
                  case 4: $scope.zonas4 = zonas.data; break;
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
    $scope.obtieneFechaMes = function(){
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
