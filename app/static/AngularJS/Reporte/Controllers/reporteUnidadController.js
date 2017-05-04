registrationModule.controller('reporteUnidadController', function($scope, alertFactory, globalFactory, commonService, $location, $rootScope, localStorageService, reporteUnidadRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'reporteHistorial';
    //Inicializa la pagina
    $scope.init = function() {};
    $scope.verOrden = function(trabajo, valBotonera) {
        var objBotonera = {};
        objBotonera.accion = valBotonera;
        objBotonera.idCita = trabajo.idCita;
        localStorageService.set('objTrabajo', trabajo);
        localStorageService.set("botonera", objBotonera);
        commonService.idEstatusTrabajo = 5;
        commonService.idCita = trabajo.idCita;
        $location.path('/ordenservicio');
    };
    //Obtiene todas las citas no canceladas generadas para cierta unidad
    $scope.getHistorialUnidad = function(numeroEconomico) {
        if (numeroEconomico != '') {
            //carga de citas
            $('.dataTableCita').DataTable().destroy();
            reporteUnidadRepository.getCitasUnidad(numeroEconomico).then(function(citasUnidad) {
                if (citasUnidad.data.length > 0) {
                    $scope.citasUnidad = citasUnidad.data;
                    alertFactory.success("Citas cargadas");
                    globalFactory.waitDrawDocument("dataTableCita", "OrdenServicio");
                } else {
                    alertFactory.info("No existen citas en el historial de la unidad requerida");
                }
            }, function(error) {
                alertFactory.error("Error al obtener citas de la unidad");
            });
            //carga de cotizaciones
            $('.dataTableCotizacion').DataTable().destroy();
            reporteUnidadRepository.getCotizacionesUnidad(numeroEconomico).then(function(cotizacionesUnidad) {
                if (cotizacionesUnidad.data.length > 0) {
                    $scope.cotizacionesUnidad = cotizacionesUnidad.data;
                    alertFactory.success("Cotizaciones cargadas");
                    globalFactory.waitDrawDocument("dataTableCotizacion", "OrdenServicio");
                } else {
                    alertFactory.info("No existen cotizaciones en el historial de la unidad requerida");
                }
            }, function(error) {
                alertFactory.error("Error al obtener cotizaciones de la unidad");
            });
            //carga de órdenes
            $('.dataTableOrden').DataTable().destroy();
            reporteUnidadRepository.getOrdenesUnidad(numeroEconomico).then(function(ordenesUnidad) {
                if (ordenesUnidad.data.length > 0) {
                    $scope.ordenesUnidad = ordenesUnidad.data;
                    alertFactory.success("Órdenes cargadas");
                    globalFactory.waitDrawDocument("dataTableOrden", "OrdenServicio");
                } else {
                    alertFactory.info("No existen órdenes en el historial de la unidad requerida");
                }
            }, function(error) {
                alertFactory.error("Error al obtener órdenes de la unidad");
            });
        } else {
            alertFactory.info("Ingresar el número económico de la unidad");
        }
        $scope.numeroEconomico = '';
    }
});