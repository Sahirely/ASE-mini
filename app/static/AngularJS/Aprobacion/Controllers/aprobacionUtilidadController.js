registrationModule.controller('aprobacionutilidadController', function ($scope, $modal, $route, $rootScope, localStorageService, alertFactory, globalFactory, uploadRepository, utilidadesRepository, userFactory ) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'aprobaciones2';
        $scope.idTipoCotizacion=0;
        $scope.ideTaller=0;
    //init del controller
    $scope.init = function () {
        $scope.userData = userFactory.getUserData();
        $scope.getAprobacionUtilidad();
    }

    $scope.getAprobacionUtilidad = function () {
        $('.dataTableAprobacionUtilidad').DataTable().destroy();
        utilidadesRepository.getAprobacionUtilidad().then(function (result) {
            if (result.data.length > 0) {
                $scope.aprobacionUtilidades = result.data;     
                globalFactory.filtrosTabla("dataTableAprobacionUtilidad", "Utilidad", 100); 
            }else {
                alertFactory.info("No se encontrarón datos");
            }
        }, function (error) {
            alertFactory.error("Error al cargar la orden");
        });
    }

     $scope.seleccionarOrden = function(obj) {
        location.href = '/detalle?orden=' + obj.numeroOrden + '&estatus=' + obj.idEstatusOrden;
    }

});



