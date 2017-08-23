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
        $scope.buscaOrden();
    };

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
          debugger;
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

    $scope.buscaFiltros = function() {
    };

    $scope.buscaOrden = function() {
        $scope.numeroTrabajo = $scope.numeroTrabajo === undefined || $scope.numeroTrabajo === '' ? null : $scope.numeroTrabajo;
        $scope.getMargenUtilidad();
    };


    $scope.getMargenUtilidad = function() {
        reporteUtilidadRepository.getUtilidad($scope.userData.idOperacion, $scope.numeroTrabajo).then(function (result){
            if(result.data.length > 0){
                $scope.margenUtilidad = result.data;
                console.log($scope.margenUtilidad);

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


});
