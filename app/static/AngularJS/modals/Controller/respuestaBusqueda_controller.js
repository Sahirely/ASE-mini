registrationModule.controller('respuestaBusqueda_controller', function($scope, $modalInstance, $modal, tipobusqueda, respuesta, callback, error, $http, $sce, $window, ordenServicioRepository, alertFactory, busquedaUnidadRepository) {
    //*****************************************************************************************************************************//
    // $scope.busqueda <<-- si es 1 sera "Buscar Unidad" si es 2 sera "Buscar Orden"
    //*****************************************************************************************************************************//
    $scope.busqueda = tipobusqueda;
    $scope.idUsuarioPruebas = 0;

    $scope.init = function() {
        $scope.mensaje = respuesta.mensaje;
        console.log($scope.busqueda, 'Holis soy el tipo busqueda')
    };
    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };
    //*****************************************************************************************************************************//
    // ***  busquedaUnidadRepository.getExisteUnidad($scope.idUsuarioPruebas, economico)  ***/
    // Busca si existe la unidad, si el usuario tiene permisos para el tipo de operación y el rol al que pertenece 
    // puede visualizar la información de dicha unidad
    // $scope.tipoRespuesta = 0 <-- No existe la unidad 
    // $scope.tipoRespuesta = 1 <-- Existe la unidad y tiene todos los permisos necesarios 
    // $scope.tipoRespuesta = 2 <-- Existe la unidad pero el tipo de operación no le corresponde
    // $scope.tipoRespuesta = 3 <-- Existe la unidad pero el rol no tiene permisos para visualizar la información
    //*****************************************************************************************************************************//
    $scope.getDetalleUnidad = function(economico) {
        busquedaUnidadRepository.getExisteUnidad($scope.idUsuarioPruebas, economico).then(function(result) {
            $scope.tipoRespuesta = result.data[0];
            if ($scope.tipoRespuesta.respuesta == 0) {
                $modalInstance.dismiss('cancel');
                $('.modal-dialog').css('width', '1050px');
                modal_respuesta_busqueda($scope, $modal, $scope.busqueda, $scope.tipoRespuesta, '', '')
            } else if ($scope.tipoRespuesta.respuesta == 1) {
                $modalInstance.dismiss('cancel');
                location.href = '/unidad?economico=' + economico;
            }

        });

    };
    //*****************************************************************************************************************************//
    // Busca el detalle de la Orden de Servicio
    //*****************************************************************************************************************************//
    $scope.getDetalleOrden = function(orden) {
        location.href = '/detalle?orden=' + orden;
    };


});
