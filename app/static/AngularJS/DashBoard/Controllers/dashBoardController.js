registrationModule.controller('dashBoardController', function($scope, alertFactory, $rootScope, localStorageService, $route, dashBoardRepository) {
    $rootScope.modulo            = 'home'; // <<-- Para activar en que opción del menú se encuentra

    $scope.zonaSelected          = null;
    $scope.tarSelected           = null;
    $scope.totalCitas            = 0;
    $scope.totalCotizaciones     = 0;
    $scope.totalOrdenes          = 0;
    $scope.totalOrdenesPorCobrar = 0;
    $scope.userData              = localStorageService.get('userData');

    $scope.init = function() {
        $scope.sumatoriaCitas();
        $scope.sumatoriaCotizaciones();
        $scope.sumatoriaOrdenes();
        $scope.sumatoriaOrdenesPorCobrar();

        // $scope.devuelveZonas();
    };

    $scope.sumatoriaCitas = function() {
        $scope.totalCitas = 0;
        $scope.totalHorasCitas = 0;

        dashBoardRepository.getTotalCitas( 2 ).then(function(datos) {
            var Resultados = datos.data;

            Resultados.forEach(function(item, key) {
                $scope.totalHorasCitas  = $scope.totalHorasCitas + parseInt( item.promedio );
                $scope.totalCitas       = $scope.totalCitas + parseInt( item.total );
            });

            $scope.citas = Resultados;

            // Grafica
            $('#morris-donut-citas').empty();
            Morris.Donut({
                element: 'morris-donut-citas',
                data: [
                    {label: Resultados[0].estatus, value: Resultados[0].total },
                    {label: Resultados[1].estatus, value: Resultados[1].total }, 
                    {label: Resultados[2].estatus, value: Resultados[2].total }
                ],
                resize: true,
                colors: [ Resultados[0].color , Resultados[1].color, Resultados[2].color],
            }).on('click', function(i, row) {
                location.href = '/consultaCitas';
            });

        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });        
    };

    $scope.sumatoriaCotizaciones = function() {
        dashBoardRepository.getTotalCotizaciones( 3 ).then(function( cotizaciones ) {
            var Resultados  = cotizaciones.data;
            var valuesDonut = [];
            var colores     = [];

            $scope.cotizaciones             = Resultados;
            $scope.totalCotizaciones        = 0;
            $scope.totalHorasCotizaciones   = 0;

            $scope.cotizaciones.forEach( function( item, key ){
                valuesDonut.push( { label: item.estatus, value: item.total } );
                colores.push( item.color );

                $scope.totalCotizaciones  = $scope.totalCotizaciones + parseInt( item.total );
                $scope.totalHorasCotizaciones  = $scope.totalHorasCotizaciones + parseInt( item.promedio );
            });

            $('#morris-donut-cotizaciones').empty();
            Morris.Donut({
                element: 'morris-donut-cotizaciones',
                data: valuesDonut,
                resize: true,
                colors: colores,
            }).on('click', function(i, row) {
                location.href = '/cotizacionconsulta';
            });
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las cotizaciones');
        });
    };

    $scope.sumatoriaOrdenes = function() {
        dashBoardRepository.getTotalOrdenes( 2 ).then(function(ordenes) {
            var Resultados                    = ordenes.data;
            $scope.totalOrdenes               = 0;
            $scope.totalHorasOrdenesServicio  = 0;

            Resultados.forEach(function(item, key) {
                $scope.totalOrdenes       = $scope.totalOrdenes + parseInt( item.total );
                $scope.totalHorasOrdenesServicio  = $scope.totalHorasOrdenesServicio + parseInt( item.promedio );
            });

            $scope.ordenesServicio = Resultados;

            // Grafica
            $('#morris-donut-ordenes').empty();
            Morris.Donut({
                element: 'morris-donut-ordenes',
                data: [
                    {label: Resultados[0].estatus, value: Resultados[0].total },
                    {label: Resultados[1].estatus, value: Resultados[1].total }, 
                    {label: Resultados[2].estatus, value: Resultados[2].total }
                ],
                resize: true,
                colors: [ Resultados[0].color , Resultados[1].color, Resultados[2].color],
            }).on('click', function(i, row) {
                location.href = '/trabajo';
            });
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las ordenes');
        });
    };

    $scope.sumatoriaOrdenesPorCobrar = function() {
        dashBoardRepository.getTotalOrdenesPorCobrar( 2 ).then(function(ordenesCobrar) {
            var Resultados  = ordenesCobrar.data;
            var valuesDonut = [];
            var colores     = [];

            $scope.totalOrdenesPorCobrar      = 0;
            $scope.totalHorasOrdenesCobrar    = 0;

            Resultados.forEach(function(item, key) {
                valuesDonut.push( { label: item.estatus, value: item.total } );
                colores.push( item.color );

                $scope.totalOrdenesPorCobrar    = $scope.totalOrdenesPorCobrar + parseInt( item.total );
                $scope.totalHorasOrdenesCobrar  = $scope.totalHorasOrdenesCobrar + parseInt( item.promedio );
            });

            $scope.ordenesCobrar = Resultados;

            $('#morris-donut-cobrar').empty();
            Morris.Donut({
                element: 'morris-donut-cobrar',
                data: valuesDonut,
                resize: true,
                colors: colores,
            }).on('click', function(i, row) {
                location.href = '/ordenesporcobrar';
            });
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las ordenes por cobrar');
        });
    };

    // $scope.devuelveZonas = function() {
    //     dashBoardRepository.getZonas($scope.userData.idUsuario).then(function(zonas) {
    //         if (zonas.data.length > 0) {
    //             $scope.zonas = zonas.data;

    //         }
    //     }, function(error) {
    //         alertFactory.error('No se pudo recuperar información de las citas');
    //     });
    // };

    // $scope.devuelveTars = function() {
    //     if ($scope.zonaSelected != null) {
    //         dashBoardRepository.getTars($scope.zonaSelected).then(function(tars) {
    //             if (tars.data.length > 0) {
    //                 $scope.tars = tars.data;
    //             }
    //         }, function(error) {
    //             alertFactory.error('No se pudo recuperar información de las citas');
    //         });
    //     } else {
    //         $scope.tarSelected = null;
    //     }
    //     $scope.sumatoriaCitas();
    //     $scope.sumatoriaCotizaciones();
    //     $scope.sumatoriaOrdenes();
    //     $scope.sumatoriaOrdenesPorCobrar();
    // };

    // $scope.getDashBoard = function() {
    //     $scope.sumatoriaCitas();
    //     $scope.sumatoriaCotizaciones();
    //     $scope.sumatoriaOrdenes();
    //     $scope.sumatoriaOrdenesPorCobrar();
    // };

    

    
});
