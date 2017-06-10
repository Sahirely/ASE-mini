registrationModule.controller('saldos_controller', function($scope, $modalInstance, $modal, saldos, callback, error, $http, $sce, $window) {

    $scope.presupuesto = 0;
    $scope.saldoDisponible = 0;
    $scope.saldoReal = 0;

    $scope.init = function() {
          $scope.presupuesto = saldos.presupuesto;
          $scope.saldoDisponible = saldos.saldoDisponible;
          $scope.saldoReal = saldos.saldoReal;
    };
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };

});
