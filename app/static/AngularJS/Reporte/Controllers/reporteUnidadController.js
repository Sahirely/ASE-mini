registrationModule.controller('reporteUnidadController', function($scope, alertFactory, globalFactory, userFactory, commonService, $location, $rootScope, localStorageService, reporteUnidadRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'reporteHistorial';
    //Inicializa la pagina

    $scope.init = function() {
        userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        $scope.idUsuario = $scope.userData.idUsuario;
        $scope.idRol = $scope.userData.idRol;
        $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
    };

    $scope.detalleOrden = function(orden) {
        location.href = '/detalle?orden=' + orden.numeroOrden;
    };

    //Obtiene todas las citas no canceladas generadas para cierta unidad
    $scope.getHistorialUnidad = function(numeroEconomico) {
        if (numeroEconomico != '') {
             //carga de órdenes
            $('.dataTableOrden').DataTable().destroy();
            reporteUnidadRepository.getHistorialUnidad(numeroEconomico, 1, $scope.idContratoOperacion).then(function(result) {
                if (result.data.length > 0) {
                    $scope.ordenesUnidad = result.data;
                    alertFactory.success("Órdenes cargadas");
                    globalFactory.filtrosTabla("dataTableOrden", "Orden Servicio", 100);
                } else {
                    alertFactory.info("No existen órdenes en el historial de la unidad requerida");
                }
            }, function(error) {
                alertFactory.error("Error al obtener órdenes de la unidad");
            });
            //carga de cotizaciones
            $('.dataTableCotizacion').DataTable().destroy();
            reporteUnidadRepository.getHistorialUnidad(numeroEconomico, 2, $scope.idContratoOperacion).then(function(result) {
                if (result.data.length > 0) {
                    $scope.cotizacionesUnidad = result.data;
                    alertFactory.success("Cotizaciones cargadas");
                    globalFactory.filtrosTabla("dataTableCotizacion", "Orden Servicio", 100);
                } else {
                    alertFactory.info("No existen cotizaciones en el historial de la unidad requerida");
                }
            }, function(error) {
                alertFactory.error("Error al obtener cotizaciones de la unidad");
            });

        } else {
            alertFactory.info("Ingresar el número económico de la unidad");
        }
        $scope.numeroEconomico = '';
    }
});