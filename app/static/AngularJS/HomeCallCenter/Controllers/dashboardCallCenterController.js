registrationModule.controller('dashboardCallCenterController', function($scope, alertFactory, userFactory, $rootScope, localStorageService, $route, dashboardCallCenterRepository,$timeout,dateFilter) {
    
    $rootScope.modulo            = 'home'; // <<-- Para activar en que opción del menú se encuentra
    $scope.userData              = userFactory.getUserData();
    $scope.idOperacion           = 3;//$scope.userData.idOperacion;

    $scope.init = function() {
      $scope.fecha_actual = new Date();
      $scope.traeOrdenesAtrasadas();
      $scope.traeOrdenesParaHoy();
      $scope.traeOrdenesSinObjetivo();
    };

    //funcion reloj recursiva cada minuto
    $scope.iniClock = function(){
        $scope.theclock = (dateFilter(new Date(), 'hh:mm'));
          $timeout(function(){
            $scope.iniClock();
        },60000);
      };

    //inicia reloj 
      $scope.iniClock();

    $scope.traeOrdenesAtrasadas = function() {

            dashboardCallCenterRepository.getOrdenAtraso($scope.idOperacion, $scope.userData.idUsuario)
                .then(function successCallback(response) {
                    $scope.ordenesAtrasadas = response.data[0].NUM;
                  }, function errorCallback(response) {
                    $scope.ordenesAtrasadas = 0;
                });

        };

    $scope.traeOrdenesParaHoy = function() {
            dashboardCallCenterRepository.getOrdenParaHoy($scope.idOperacion, $scope.userData.idUsuario)
                .then(function successCallback(response) {
                    $scope.ordenesParaHoy = response.data[0].NUM;
                }, function errorCallback(response) {
                    $scope.ordenesParaHoy = 0;
                });
        };

    $scope.traeOrdenesSinObjetivo = function() {
            dashboardCallCenterRepository.getOrdenSinObjetivo($scope.idOperacion, $scope.userData.idUsuario)
                .then(function successCallback(response) {
                    $scope.ordenesSinObjetivo = response.data[0].NUM;
                }, function errorCallback(response) {
                    $scope.ordenesSinObjetivo = 0;
                });
        };

     $scope.traeRecordatorios = function() {
            dashboardCallCenterRepository.getRecordatorios($scope.idOperacion, $scope.userData.idUsuario)
                .then(function successCallback(response) {
                   $('.dataTableRecordatorios').DataTable().destroy();
                  $scope.recordatorios = ordentermina.data;
                  waitDrawDocument("dataTableRecordatorios");
                }, function errorCallback(response) {
                    $scope.ordenesSinObjetivo = 0;
                });
        };

});
