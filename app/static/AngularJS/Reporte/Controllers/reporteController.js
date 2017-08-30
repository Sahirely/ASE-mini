    registrationModule.controller('reporteController', function($scope, alertFactory, $rootScope, globalFactory, localStorageService, ordenPorCobrarRepository, reporteRepository, dashBoardRepository, cotizacionConsultaRepository, userFactory) {
        //*****************************************************************************************************************************//
        // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
        //*****************************************************************************************************************************//
        $rootScope.modulo = 'reporteAntiguedad';
        $scope.message = "Buscando...";
        $scope.tipofecha = "";
        $scope.ordenes = [];


        $scope.x = 0;
        $scope.totalNiveles = 0;
        $scope.zonaSelected = "0";
        $scope.ZonasSeleccionadas = {};
        $scope.NivelesZona = [];
        $scope.Zonas = [];
        $scope.callCenters = [];
        $scope.lstEstatus = [];
        $scope.txtTaller = "";
        $scope.rptParams = [];
        $scope.sumatoriaCosto = 0;
        $scope.sumatoriaVenta = 0;



        $scope.Zonas = [];

        $scope.init = function() {
            $scope.userData = userFactory.getUserData();
            userFactory.ValidaSesion();
            $scope.ZonasSeleccionadas[0] = "0";
            $scope.obtieneNivelZona();

            $scope.rptParams = $scope.getEmptyFilterParams();
            $scope.rptParams.idOperacion = $scope.userData.idOperacion;

            $scope.getReporteAntiguedad($scope.rptParams);
            $scope.getEjecutivos();
            $scope.estatusOrdenes();
        }

        $scope.fechaRango = function() {
            $scope.fechaMes = null;
        }
        $scope.fechaMess = function() {
            $scope.fechaInicio = null;
            $scope.fechaFin = null;
        }

        $scope.getReporteAntiguedad = function(params) {
            reporteRepository.reporteAntiguedadSaldo(params).then(function(result) {
                $scope.ordenes = result.data;
                globalFactory.filtrosTabla("tblAntiguedadSaldos", "AntiguedadSaldos", 100);
                
                setTimeout(function() {
                    $('[data-toggle="popover"]').popover({
                        html: true
                    });
                }, 100);

                $scope.sumatoriaCosto = 0;
                $scope.sumatoriaVenta = 0;

                $scope.ordenes.forEach(function(item) {
                    $scope.sumatoriaCosto += item.costo;
                    $scope.sumatoriaVenta += item.venta;
                });


            });
        };

        $scope.estatusOrdenes = function() {
            reporteRepository.estatusOrdenes().then(function(result) {
                $scope.lstEstatus = result.data;
            });
        };

        $scope.getEjecutivos = function() {
            cotizacionConsultaRepository.obtieneEjecutivos($scope.userData.contratoOperacionSeleccionada).then(function(ejecutivos) {
                if (ejecutivos.data.length > 0) {
                    $scope.callCenters = ejecutivos.data;
                }
            }, function(error) {
                alertFactory.error('No se pudo recuperar información de los ejecutivos');
            });
        };

        $scope.obtieneNivelZona = function() {
            $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.userData.contratoOperacionSeleccionada).then(function(result) {
                    $scope.totalNiveles = result.data.length;
                    if (result.data.length > 0) {
                        $scope.NivelesZona = result.data;
                        $scope.devuelveZonas();
                    }
                },
                function(error) {
                    alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
                });
        }

        //obtiene las zonas por cada nivel con que cuenta el usuario
        $scope.devuelveZonas = function() {
            for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
                cotizacionConsultaRepository.getZonas($scope.userData.contratoOperacionSeleccionada, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function(result) {
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

        $scope.cambioZona = function(id, orden) {
            //al cambiar de zona se establece como zona seleccionada.
            $scope.zonaSelected = id;
            //se limpian los combos siguientes.
            for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
                $scope.ZonasSeleccionadas[$scope.x] = "0";
            }
        }


        $scope.searchByFilters = function() {
            $scope.rptParams = $scope.getEmptyFilterParams();
            $scope.rptParams.idOperacion = $scope.userData.idOperacion;;
            $scope.rptParams.fechaInicial = $scope.fechaInicio == "" ? null : $scope.fechaInicio === undefined ? null : $scope.fechaInicio;
            $scope.rptParams.fechaFinal = $scope.fechaFin == "" ? null : $scope.fechaFin === undefined ? null : $scope.fechaFin;
            $scope.rptParams.taller = $scope.txtTaller == "" ? null : $scope.txtTaller;
            $scope.rptParams.idCallcenter = $scope.callCenter === undefined ? null : $scope.callCenter;
            $scope.rptParams.idEstatus = $scope.estatus === undefined ? null : $scope.estatus;
            $scope.rptParams.idZona = $scope.ZonasSeleccionadas[$scope.totalNiveles] == 0 ? null : $scope.ZonasSeleccionadas[$scope.totalNiveles] === undefined ? null : $scope.ZonasSeleccionadas[$scope.totalNiveles];
            $scope.getReporteAntiguedad($scope.rptParams);

        }

        $scope.searchByOrderNumber = function() {
            $scope.rptParams = $scope.getEmptyFilterParams();
            $scope.rptParams.idOperacion = $scope.userData.idOperacion;
            $scope.rptParams.numeroOrden = $scope.numeroTrabajo == "" ? null : $scope.numeroTrabajo;
            $scope.getReporteAntiguedad($scope.rptParams);
        }

        $scope.getEmptyFilterParams = function() {
            var filterParams = {};

            filterParams.idOperacion = null;
            filterParams.fechaInicial = null;
            filterParams.fechaFinal = null;
            filterParams.taller = null;
            filterParams.idCallcenter = null;
            filterParams.idEstatus = null;
            filterParams.idZona = null;
            filterParams.numeroOrden = null;

            return filterParams;
        }


        $scope.redirectTo = function(numeroOrden) {            
            location.href ='/detalle?orden='+numeroOrden
        }


    });