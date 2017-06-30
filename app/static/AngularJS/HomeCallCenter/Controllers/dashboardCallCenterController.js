registrationModule.controller('dashboardCallCenterController', function($scope, alertFactory, userFactory,$modal, $rootScope, localStorageService, $route, dashboardCallCenterRepository,$timeout,dateFilter,globalFactory) {
    
    $rootScope.modulo            = 'home'; // <<-- Para activar en que opción del menú se encuentra
    $scope.userData              = userFactory.getUserData();
    $scope.idOperacion           = $scope.userData.idOperacion;

    $scope.init = function() {
      $scope.fecha_actual = new Date();
      $scope.traeOrdenesAtrasadas();
      $scope.traeOrdenesParaHoy();
      $scope.traeOrdenesSinObjetivo();
      $scope.traeRecordatorios();
      $scope.traeOrdenCallCenter(0);
      $scope.zonasCallCenter();
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

            dashboardCallCenterRepository.getOrdenAtraso($scope.userData.contratoOperacionSeleccionada, $scope.userData.idUsuario)
                .then(function successCallback(response) {
                    $scope.ordenesAtrasadas = response.data[0].NUM;
                  }, function errorCallback(response) {
                    $scope.ordenesAtrasadas = 0;
                });

        };

    $scope.traeOrdenesParaHoy = function() {

            dashboardCallCenterRepository.getOrdenParaHoy($scope.userData.contratoOperacionSeleccionada, $scope.userData.idUsuario)
                .then(function successCallback(response) {
                    $scope.ordenesParaHoy = response.data[0].NUM;
                }, function errorCallback(response) {
                    $scope.ordenesParaHoy = 0;
                });
        };

    $scope.traeOrdenesSinObjetivo = function() {
            dashboardCallCenterRepository.getOrdenSinObjetivo($scope.userData.contratoOperacionSeleccionada, $scope.userData.idUsuario)
                .then(function successCallback(response) {
                    $scope.ordenesSinObjetivo = response.data[0].NUM;
                }, function errorCallback(response) {
                    $scope.ordenesSinObjetivo = 0;
                });
        };


     $scope.traeRecordatorios = function(){
         $('.dataTableRecordatorios').DataTable().destroy();
         $scope.operaciones=[];
        $scope.promise = dashboardCallCenterRepository.getRecordatorios($scope.userData.contratoOperacionSeleccionada, $scope.userData.idUsuario).then(function (result) {
            if (result.data.length > 0) {
                $scope.recordatorios = result.data;
                 globalFactory.filtrosTabla("dataTableRecordatorios", "fechaAccion", 5);
            }
        }, function (error) {
            alertFactory.error('El usuario no tiene recordatorios');
        });
    };

    $scope.traeOrdenCallCenter = function(tipo){
        var ordenes = [];
        $scope.ordencall=[];
        $scope.sumatoria_ordenes = 0;
        $('.dataTableOrdenCallCenter').DataTable().destroy();
       
        $scope.promise = dashboardCallCenterRepository.getOrdenCallCenter($scope.userData.contratoOperacionSeleccionada, $scope.userData.idUsuario, tipo).then(function (result) {
            if (result.data.length > 0) {
                $scope.ordencall = result.data;

                $scope.ordencall.forEach(function(item) {
                  if (ordenes.indexOf(item.idOrden) == -1) {
                    ordenes.push(item.idOrden);
                    $scope.sumatoria_ordenes += item.venta;
                  };
                });
                
                globalFactory.filtrosTabla("dataTableOrdenCallCenter", "numeroOrden", 100);
            }
        }, function (error) {
            alertFactory.error('El usuario no tiene recordatorios');
        });
    };

    $scope.zonasCallCenter = function(tipo){
        $scope.zonas=[];
       
        $scope.promise = dashboardCallCenterRepository.getZonasCallCenter($scope.userData.idUsuario, $scope.userData.contratoOperacionSeleccionada,).then(function (result) {
            
            if (result.data.length > 0) {
                $scope.zonas = result.data;
            }
        }, function (error) {
            alertFactory.error('El usuario no tiene recordatorios');
        });
    };


     $scope.seleccionarOrden = function(obj) {
        location.href = '/detalle?orden=' + obj.numeroOrden + '&estatus=' + 1;
    }

    $scope.recoradatorios = function () {
        modal_recordatorios($scope, $modal, $scope.userData.contratoOperacionSeleccionada, $scope.traeRecordatorios, '');
    }


});
