registrationModule.controller('detalleController', function($scope, $location, consultaCitasRepository, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, detalleRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    //$rootScope.modulo = 'reporteHistorial';
    //Inicializa la pagina

    $scope.idUsuario = 2;
    $scope.numeroOrden = $routeParams.orden;
    $scope.textoNota = null;
    $scope.notaTrabajo = [];
    $scope.init = function() {
        $scope.getOrdenDetalle($scope.idUsuario, $scope.numeroOrden);
        $scope.getOrdenCliente($scope.idUsuario, $scope.numeroOrden);
        $scope.getOrdenDocumentos($scope.idUsuario, $scope.numeroOrden);
        $scope.enviaNota();
    };

    $scope.getOrdenDetalle = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenDetalle(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleOrden = result.data[0];
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los detalles de la orden');
        });
    }

     $scope.getOrdenCliente = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenCliente(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleCliente = result.data[0];
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los detalles del cliente');
        });
    }

    $scope.getOrdenDocumentos = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenDocumentos(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleDocumentos = result.data[0];
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los documentos de la orden');
        });
    }

    $scope.nuevaCotizacion = function(){
        location.href = '/cotizacionnueva?orden=' + $routeParams.orden;
    }

    $scope.enviaNota = function(){
      $scope.notaTrabajo = [];
      var Nota = $scope.textoNota == '' ? null : $scope.textoNota;
      detalleRepository.insNota(Nota, $scope.numeroOrden, $scope.idUsuario).then(function(result){
          if (result.data.length > 0){
              $scope.notaTrabajo = result.data;
          }
      },function(error){
          alertFactory.error('No se pudieron obtener las notas');
      });
      $scope.textoNota = null;
    };

});
