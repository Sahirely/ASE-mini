registrationModule.controller('dashBoardController', function($scope, alertFactory, userFactory, $rootScope, localStorageService, $route, dashBoardRepository, cotizacionConsultaRepository) {
    $rootScope.modulo            = 'home'; // <<-- Para activar en que opción del menú se encuentra

    // $scope.zonaSelected          = null;
    $scope.tarSelected           = null;
    $scope.totalCitas            = 0;
    $scope.totalCotizaciones     = 0;
    $scope.totalOrdenes          = 0;
    $scope.totalOrdenesPorCobrar = 0;
    $scope.userData              = userFactory.getUserData();
    $scope.idOperacion           = $scope.userData.idOperacion;
    $scope.idUsuario             = $scope.userData.idUsuario;
    $scope.idContratoOperacion   = $scope.userData.contratoOperacionSeleccionada;

    console.log( $scope.userData );
    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = {};
    $scope.NivelesZona = [];
    $scope.Zonas = [];

    $scope.init = function() {
        //para obtener las zonas promero se inicializa la primer zona padre.
        $scope.ZonasSeleccionadas[0] = "0";
        $scope.obtieneNivelZona();

        $scope.LoadData();        
    };

    $scope.LoadData = function(){
        $scope.sumatoriaCitas();
        $scope.sumatoriaCotizaciones();
        $scope.sumatoriaOrdenes();
        $scope.sumatoriaOrdenesPorCobrar();
    }

    $scope.sumatoriaCitas = function() {
        $scope.totalCitas = 0;
        $scope.totalHorasCitas = 0;

        dashBoardRepository.getTotalCitas( $scope.idOperacion, $scope.zonaSelected ).then(function(datos) {
            var Resultados = datos.data;

            Resultados.forEach(function(item, key) {
                $scope.totalCitas       = $scope.totalCitas + parseInt( item.total );
                $scope.totalHorasCitas  = $scope.totalHorasCitas + parseInt( item.promedio );
            });

            $scope.citas = Resultados;

            // Grafica
            $('#morris-donut-citas').empty();
            if( $scope.totalCitas == 0 ){
                // console.log( 'Los datos de la grafica estan en 0' );
            }   
            else{
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
            }

        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });        
    };

    $scope.sumatoriaCotizaciones = function() {
        dashBoardRepository.getTotalCotizaciones( $scope.idOperacion, $scope.zonaSelected ).then(function( cotizaciones ) {
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
            if( $scope.totalCotizaciones == 0 ){
                // console.log( 'Los datos de la grafica estan en 0' );
            }   
            else{
                Morris.Donut({
                    element: 'morris-donut-cotizaciones',
                    data: valuesDonut,
                    resize: true,
                    colors: colores,
                }).on('click', function(i, row) {
                    location.href = '/cotizacionconsulta';
                });
                
            }
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las cotizaciones');
        });
    };

    $scope.sumatoriaOrdenes = function() {
        dashBoardRepository.getTotalOrdenes( $scope.idOperacion, $scope.zonaSelected ).then(function(ordenes) {
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
            if( $scope.totalOrdenes == 0 ){
                // console.log( 'Los datos de la grafica estan en 0' );
            }   
            else{
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
            }
            
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las ordenes');
        });
    };

    $scope.sumatoriaOrdenesPorCobrar = function() {
        dashBoardRepository.getTotalOrdenesPorCobrar( $scope.idOperacion, $scope.zonaSelected ).then(function(ordenesCobrar) {
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
            if( $scope.totalOrdenesPorCobrar == 0 ){
                // console.log( 'Los datos de la grafica estan en 0' );
            }   
            else{
                Morris.Donut({
                    element: 'morris-donut-cobrar',
                    data: valuesDonut,
                    resize: true,
                    colors: colores,
                }).on('click', function(i, row) {
                    location.href = '/ordenesporcobrar';
                });
            }
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las ordenes por cobrar');
        });
    };

    // =================================================================================
    //obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
    $scope.obtieneNivelZona = function() {
        $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.idContratoOperacion).then(function(result) {
                $scope.totalNiveles = result.data.length;
                if (result.data.length > 0) {
                    $scope.NivelesZona = result.data;
                    $scope.devuelveZonas();
                }
            },
            function(error) {
                alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
            });
    };

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function() {
        for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
            cotizacionConsultaRepository.getZonas($scope.idContratoOperacion, $scope.NivelesZona[$scope.x].idNivelZona).then(function(result) {
                if (result.data.length > 0) {
                    var valueToPush = {};
                    valueToPush.orden = result.data[0].orden;
                    valueToPush.etiqueta = result.data[0].etiqueta;
                    valueToPush.data = result.data;
                    $scope.Zonas.push(valueToPush);
                    //se establece por default cada zona seleccionada en 0
                    $scope.ZonasSeleccionadas[result.data[0].orden] = "0";
                }
            }, function(error) {
                alertFactory.error('No se pudo recuperar información de las zonas');
            });
        }
    };

    $scope.cambioZona = function(id, orden, zona, zonaseleccionada) {
        //al cambiar de zona se establece como zona seleccionada.
        $scope.zonaSelected = id;

        $scope.LoadData();
        //se limpian los combos siguientes.
        for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
        }
    };  
});
