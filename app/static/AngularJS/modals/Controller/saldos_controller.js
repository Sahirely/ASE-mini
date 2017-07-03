registrationModule.controller('saldos_controller', function($scope, $modalInstance, $modal, saldos, nombreCentroTrabajo, callback, error, $http, $sce, $window) {
    $scope.presupuesto = 0;
    $scope.utilizado = 0;
    $scope.saldo = 0;
    $scope.venta = 0;

    $scope.init = function() {
      if(saldos != undefined){
          $scope.presupuesto = saldos.presupuesto;
          $scope.utilizado = saldos.utilizado;
          $scope.saldo = saldos.saldo;
          $scope.venta = saldos.venta;
      }
      if(nombreCentroTrabajo != undefined){
          $scope.nombreCentroTrabajo = nombreCentroTrabajo;
      }
    };
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };

});
