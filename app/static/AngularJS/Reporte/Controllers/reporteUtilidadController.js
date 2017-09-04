registrationModule.controller('reporteUtilidadController', function($scope, alertFactory, globalFactory, userFactory, $rootScope, localStorageService, reporteUtilidadRepository, cotizacionConsultaRepository, dashBoardRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'reporteMargenUtilidad';
    $scope.estatus = '';
    $scope.fechaInicio = null;
    $scope.fechaFin = null;
    $scope.fechaMes = null;
    $scope.sumatoriaCosto = 0.00;
    $scope.sumatoriaPrecio = 0.00;
    $scope.sumatoriaUtilidad = 0.00;

    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = [];
    $scope.NivelesZona = [];
    $scope.Zonas = [];

    $scope.initUtilidad = function() {
        $scope.userData = userFactory.getUserData();
        userFactory.ValidaSesion();
        $scope.ZonasSeleccionadas[0] = "0";
        $scope.obtieneNivelZona();
        $scope.getTiposOrden();
        $scope.buscaOrden(2);
    };

    $scope.detalleUrl = function(numOrden){
        location.href = "/detalle?orden=" + numOrden;
    }

    $scope.getTiposOrden = function(){
        $scope.tiposOrdenes = [];
        $scope.promise = reporteUtilidadRepository.getTipoOrden().then(function (result){
            if(result.data.length > 0){
                $scope.tiposOrdenes = result.data;
            }
        },
        function (error){
            alertFactory.error('No se pudieron obtener los tipos de ordenes, intentelo más tarde.');
        });
    }

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
        cotizacionConsultaRepository.getZonas($scope.userData.contratoOperacionSeleccionada, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function(result) {
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

    $scope.buscaFiltros = function(tipoConsulta) {
        //inicializar sumatorias
        $scope.sumatoriaCosto = 0.00;
        $scope.sumatoriaPrecio = 0.00;
        $scope.sumatoriaUtilidad = 0.00;

        $scope.numeroOrden = null;

        $scope.idZona = $scope.ZonasSeleccionadas[$scope.totalNiveles] === undefined || $scope.ZonasSeleccionadas[$scope.totalNiveles] === "0" ? null : $scope.ZonasSeleccionadas[$scope.totalNiveles];
        $scope.fechaInicio = $scope.fechaInicio === undefined || $scope.fechaInicio === '' ? null : $scope.fechaInicio;
        $scope.fechaFin = $scope.fechaFin === undefined || $scope.fechaFin === '' ? null : $scope.fechaFin;
        $scope.fechaMesBuscar = $scope.obtieneFechaMes() === undefined || $scope.obtieneFechaMes() === '' ? null : $scope.obtieneFechaMes();
        $scope.rangoInicial = $('#rangoi').val() === undefined || $('#rangoi').val() === '' ? null : $('#rangoi').val();
        $scope.rangoFinal = $('#rangof').val() === undefined || $('#rangof').val() === '' ? null : $('#rangof').val();
        $scope.idTipoCita = $scope.idTipoCita === undefined || $scope.idTipoCita === '' ? null : $scope.idTipoCita;
        $scope.estatus = $scope.estatus === undefined || $scope.estatus === '' ? null : $scope.estatus;

        $scope.getMargenUtilidad(tipoConsulta);
    };

    $scope.buscaOrden = function(tipoConsulta) {
        //inicializar sumatorias
        $scope.sumatoriaCosto = 0.00;
        $scope.sumatoriaPrecio = 0.00;
        $scope.sumatoriaUtilidad = 0.00;

        // obtener los parametros seleccionados para el tipo de consulta
        $scope.numeroOrden = $scope.numeroOrden === undefined || $scope.numeroOrden === '' ? null : $scope.numeroOrden;

        // limpiar los parametros no utilizados en el tipo de consulta
        $scope.ZonasSeleccionadas.forEach(function (item, key){
            $scope.ZonasSeleccionadas[key] = "0";
        });
        $scope.idZona = null;
        $scope.fechaInicio = null;
        $scope.fechaFin = null;
        $scope.fechaMes = null;
        $scope.fechaMesBuscar = null;
        $('#rangoi').val('');
        $('#rangof').val('');
        $scope.rangoInicial = null;
        $scope.rangoFinal = null;
        $scope.idTipoCita = null;
        $scope.estatus = null;
        $scope.getMargenUtilidad(tipoConsulta);
    };


    $scope.getMargenUtilidad = function(tipoConsulta) {
        reporteUtilidadRepository.getUtilidad(tipoConsulta, $scope.userData.idOperacion, $scope.numeroOrden, $scope.fechaInicio, $scope.fechaFin, $scope.fechaMesBuscar, $scope.idZona, $scope.rangoInicial, $scope.rangoFinal, $scope.idTipoCita, $scope.estatus, $scope.userData.isProduction).then(function (result){
            if(result.data.length > 0){
                $scope.margenUtilidad = result.data;

                $scope.margenUtilidad.forEach(function (item){
                  $scope.sumatoriaCosto += item.costo;
                  $scope.sumatoriaPrecio += item.venta;
                  $scope.sumatoriaUtilidad += item.utilidad;
                });

                globalFactory.filtrosTabla("dataTableUtilidad", "Margen de Utilidad", 100);
                setTimeout(function() {
                    $('[data-toggle="popover"]').popover({
                        html: true
                    });
                }, 100);
            }else{
                $scope.margenUtilidad = [];
                $scope.sumatoriaCosto = 0.00;
                $scope.sumatoriaPrecio = 0.00;
                $scope.sumatoriaUtilidad = 0.00;
                globalFactory.filtrosTabla("dataTableUtilidad", "Margen de Utilidad", 100);
                alertFactory.info('No se obtuvieron resultados.');
                setTimeout(function() {
                    $('[data-toggle="popover"]').popover({
                        html: true
                    });
                }, 100);
            }
        }, function (error){
            alertFactory.info('No se pudo obtener la información del reporte');
        });
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

    $(".touchspin2").TouchSpin({
        min: -1000,
        max: 1000,
        step: 0.1,
        decimals: 2,
        //boostat: 5,
        //maxboostedstep: 10,
        //postfix: '%',
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white'
    });


});
