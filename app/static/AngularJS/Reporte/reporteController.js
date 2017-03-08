registrationModule.controller('reporteController', function ($scope, alertFactory, $rootScope, globalFactory, localStorageService, ordenPorCobrarRepository, reporteRepository,dashBoardRepository) {
    $scope.message = "Buscando...";
    
    $scope.init = function () {
        //$scope.getReporte();
        //$rootScope.userData = localStorageService.get('userData');

        $scope.devuelveZonas();
        $scope.buscaCallCenter();
        $scope.buscaEstatus();
        //$scope.devuelveTars();
    }

    $scope.fechaRango = function () {
        $scope.fechaMes = null;
    }

    $scope.fechaMess = function () {
        $scope.fechaInicio = null;
        $scope.fechaFin = null;
    }

    $scope.getReporte = function () {
        $scope.promise =
        reporteRepository.reporteGral()
            .then(function (result) {
                if (result.data.length > 0) {                    
                    $scope.datos = result.data;
                    
                    setTimeout(function () {
                        
                            $('.dataTableReporte').DataTable({
                                dom: '<"html5buttons"B>lTfgitp',
                                buttons: [
                                    {
                                        extend: 'excel',
                                        title: 'ReporteGeneral'
                                    },
                                    {
                                        extend: 'print',
                                        customize: function (win) {
                                            $(win.document.body).addClass('white-bg');
                                            $(win.document.body).css('font-size', '10px');

                                            $(win.document.body).find('table')
                                                .addClass('compact')
                                                .css('font-size', 'inherit');
                                        }
                            }
                        ]
                            });
                        }, 1000);
                } 
            }, function (error) {
                alertFactory.error('Error');
            });
    }

    
    $scope.devuelveTars = function (zona) {
        if (zona != null) {
            dashBoardRepository.getTars(zona).then(function (tars) {
                if (tars.data.length > 0) {
                    $scope.tars = tars.data;

                }
            }, function (error) {
                alertFactory.error('No se pudo recuperar información de las TARs');
            });
        } else {
            $scope.tar = null;
        }
    }

    $scope.devuelveZonas = function () {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function (zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    }

    $scope.callReporte = function (tipo) {
       
        $scope.ordenes=[];
         $('.dataTableReporteSaldos').DataTable().destroy();
        reporteRepository.reporteAntiguedad($scope.fechaInicio, $scope.fechaFin, $scope.zona, $scope.tar, $scope.estatus, $scope.numeroTrabajo, tipo, $scope.callCenter).then(function (response) {
          
            if (response.data.length > 0) {
                $scope.ordenes = response.data;
                globalFactory.waitDrawDocument("dataTableReporteSaldos", "ReporteAntiguedadSaldos");

            }else{
                alertFactory.info('No se encontraro información');
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    }

    $scope.buscaCallCenter = function () {
        reporteRepository.callcenter().then(function (response) {
            if (response.data.length > 0) {
                $scope.callCenters = response.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de callcenter');
        });
    }

    $scope.buscaEstatus = function () {
        reporteRepository.estatus().then(function (response) {
            if (response.data.length > 0) {
                $scope.estatuss = response.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de los estatus');
        });
    }


  

       
    
});

