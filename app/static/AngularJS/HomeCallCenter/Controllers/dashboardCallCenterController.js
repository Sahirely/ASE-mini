registrationModule.controller('dashboardCallCenterController', function($scope, alertFactory, userFactory,$modal, $rootScope, localStorageService, $route, dashboardCallCenterRepository,$timeout,dateFilter,globalFactory, detalleRepository) {

    // <<-- Para activar en que opción del menú se encuentra
    $scope.userData              = userFactory.getUserData();
    $scope.idOperacion           = $scope.userData.idOperacion;
    $scope.idUsuario = '';
    $scope.fechaRetraso = '';
    $scope.fechaRestante= '';

    $scope.init = function() {
//Se agrego la validación de sesiones de Usuario Rodrigo Olivares
        userFactory.ValidaSesion();
      $scope.fecha_actual = new Date();
      if ($scope.userData.idRol == 3) {
        $scope.idUsuario = $scope.userData.idUsuario;
        $scope.traeOrdenesAtrasadas();
        $scope.traeOrdenesParaHoy();
        $scope.traeOrdenesSinObjetivo();
        $scope.traeRecordatorios();
        $scope.traeOrdenCallCenter(0);
        $scope.zonasCallCenter();
        $rootScope.modulo            = 'home';

      }else{
        $scope.traeEjecutivos ();
        $rootScope.modulo            = 'callcenter';
      }

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

    $scope.traeEjecutivos = function() {

        dashboardCallCenterRepository.getEjecutivos($scope.userData.contratoOperacionSeleccionada)
            .then(function successCallback(response) {
                $scope.ejecutivos = response.data;
              }, function errorCallback(response) {
                $scope.ordenesAtrasadas = 0;
            });

    };

    $scope.changeEjecutivo = function (data) {
        $scope.idUsuario = data;
        $scope.traeOrdenesAtrasadas();
        $scope.traeOrdenesParaHoy();
        $scope.traeOrdenesSinObjetivo();
        $scope.traeRecordatorios();
        $scope.traeOrdenCallCenter(0);
        $scope.zonasCallCenter();


    }

    $scope.traeOrdenesAtrasadas = function() {

        dashboardCallCenterRepository.getOrdenAtraso($scope.userData.contratoOperacionSeleccionada, $scope.idUsuario)
            .then(function successCallback(response) {
                $scope.ordenesAtrasadas = response.data[0].NUM;
              }, function errorCallback(response) {
                $scope.ordenesAtrasadas = 0;
            });

    };

    $scope.traeOrdenesParaHoy = function() {

        dashboardCallCenterRepository.getOrdenParaHoy($scope.userData.contratoOperacionSeleccionada, $scope.idUsuario)
            .then(function successCallback(response) {
                $scope.ordenesParaHoy = response.data[0].NUM;
            }, function errorCallback(response) {
                $scope.ordenesParaHoy = 0;
            });
    };

    $scope.traeOrdenesSinObjetivo = function() {
        dashboardCallCenterRepository.getOrdenSinObjetivo($scope.userData.contratoOperacionSeleccionada, $scope.idUsuario)
            .then(function successCallback(response) {
                $scope.ordenesSinObjetivo = response.data[0].NUM;
            }, function errorCallback(response) {
                $scope.ordenesSinObjetivo = 0;
            });
    };


     $scope.traeRecordatorios = function(){
         $('.dataTableRecordatorios').DataTable().destroy();
         $scope.operaciones=[];
        $scope.promise = dashboardCallCenterRepository.getRecordatorios($scope.userData.contratoOperacionSeleccionada, $scope.idUsuario).then(function (result) {
            if (result.data.length > 0) {
                $scope.recordatorios = result.data;
                 globalFactory.filtrosTabla("dataTableRecordatorios", "fechaAccion", 5);
            } else {
                $scope.recordatorios = [];
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

        $scope.promise = dashboardCallCenterRepository.getOrdenCallCenter($scope.userData.contratoOperacionSeleccionada, $scope.idUsuario, tipo).then(function (result) {
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

        $scope.promise = dashboardCallCenterRepository.getZonasCallCenter($scope.idUsuario, $scope.userData.contratoOperacionSeleccionada,).then(function (result) {

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

    $scope.recoradatorios = function (data) {

        modal_recordatorios($scope, $modal, $scope.userData.contratoOperacionSeleccionada, data, $scope.traeRecordatorios, '');
    }

    $scope.finalizarRecordatorio = function (data) {

        swal({
            title: "Recoradatorio",
            text: "¿Desea finalizar el Recoradatorio?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            cancelButtonColor: "#81F781",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {
               detalleRepository.postEstatusRecordatorio(data.idRecordatorio).then(function(result) {
                    if (result.data.length > 0) {
                      debugger;
                        $scope.traeRecordatorios();
                        swal('El Recordatorio fue Finalizado.');


                    }
                }, function(error) {
                    alertFactory.error('No se puede guardar accion, intente mas tarde o comuniquese con el administrador');
                });

            }
        });

    }


});
