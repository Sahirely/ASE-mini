registrationModule.controller('reporteCertificadoConformidadController', function($scope, alertFactory, globalFactory, $rootScope, localStorageService, reporteCertificadoConformidadRepository, userFactory,cotizacionConsultaRepository,reporteCertificadoConformidadRepository   ) {

        $rootScope.modulo = 'reporteCertificadoConformidad';
        $scope.message = "Buscando...";
        $scope.tipofecha = "";
        $scope.ordenes = [];


        $scope.x = 0;
        $scope.totalNiveles = 0;
        $scope.zonaSelected = "0";
        $scope.ZonasSeleccionadas = {};
        $scope.NivelesZona = [];
        $scope.Zonas = [];

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

            // $scope.rptParams = $scope.getEmptyFilterParams();
            // $scope.rptParams.idOperacion = $scope.userData.idOperacion;
            // $scope.rptParams.idUsuario = $scope.userData.idUsuario;
            //
            // $scope.getReporteCertificadoConformidad($scope.rptParams);

        }

        $scope.fechaRango = function() {
            $scope.fechaMes = null;
        }
        $scope.fechaMess = function() {
            $scope.fechaInicio = null;
            $scope.fechaFin = null;
        }

        $scope.getReporteCertificadoConformidad = function(params) {
            $('#loadModal').modal('show');
            reporteCertificadoConformidadRepository.reporteCertificadoConformidad(params).then(function(result) {
              $scope.sumatoriaCosto = 0;
              $scope.sumatoriaVenta = 0;
                if (angular.isArray(result.data)){

                      $scope.ordenes = result.data;
                      globalFactory.filtrosTabla("tblCertificadoConformidad", "CertificadoConformidad", 100);
                      setTimeout(function() {
                          $('[data-toggle="popover"]').popover({
                              html: true
                          });
                      }, 100);

                    if (result.data.length > 0){
                        $scope.sumatoriaCosto = $scope.ordenes[0].sumaCosto;
                        $scope.sumatoriaVenta = $scope.ordenes[0].sumaVenta;
                      }else{
                        $scope.sumatoriaCosto = 0;
                        $scope.sumatoriaVenta = 0;
                      }

                    $('#loadModal').modal('hide');

                }else {
                    $scope.ordenes = [];

                    globalFactory.filtrosTabla("tblCertificadoConformidad", "CertificadoConformidad", 100);
                    setTimeout(function() {
                        $('[data-toggle="popover"]').popover({
                            html: true
                        });
                    }, 100);

                    $scope.sumatoriaCosto = 0;
                    $scope.sumatoriaVenta = 0;

                    $('#loadModal').modal('hide');
                }




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

        $scope.searchWithoutFilters = function() {
          //se limpia el filtro de zonas
          for ($scope.x = 0; $scope.x <= $scope.totalNiveles; $scope.x++) {
              $scope.ZonasSeleccionadas[$scope.x] = "0";
          }

          $scope.fechaInicio = '';
          $scope.fechaFin = '';
          $('#txtFIni').datepicker('setDate', null);
          $('#txtFFin').datepicker('setDate', null);

          $scope.searchByFilters();
        }


        $scope.searchByFilters = function() {
            $scope.rptParams = $scope.getEmptyFilterParams();
            $scope.rptParams.idOperacion = $scope.userData.idOperacion;
            $scope.rptParams.idUsuario = $scope.userData.idUsuario;
            $scope.rptParams.fechaInicial = $scope.fechaInicio == "" ? null : $scope.fechaInicio === undefined ? null : $scope.fechaInicio;
            $scope.rptParams.fechaFinal = $scope.fechaFin == "" ? null : $scope.fechaFin === undefined ? null : $scope.fechaFin;

            var foundValue = false;
            for(var i=$scope.totalNiveles;i>=0;i--) {
                if (!foundValue){
                    if ($scope.ZonasSeleccionadas[i] !== 0 && $scope.ZonasSeleccionadas[i] !== '0' && $scope.ZonasSeleccionadas[i] !== undefined && $scope.ZonasSeleccionadas[i] !== null){
                        $scope.rptParams.idZona = $scope.ZonasSeleccionadas[i];
                        foundValue = true;
                    }
                }
            }

            if (!foundValue){
                $scope.rptParams.idZona = null;
            }

            if ($scope.rptParams.fechaInicial == null && $scope.rptParams.fechaFinal == null && $scope.rptParams.idZona == null) {
              swal({
                    title: '¿Desea realizar la búsqueda sin criterios de selección?',
                    text: "Al realizar la búsqueda sin criterios, se traerán todos los resultados.",
                    type: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33', confirmButtonText: 'Si', cancelButtonText: 'Cancelar'
                  }, function (isConfirm) {
                    if (isConfirm) {
                      $scope.getReporteCertificadoConformidad($scope.rptParams);
                   }
                 });
            }else{
              $scope.getReporteCertificadoConformidad($scope.rptParams);
            }
        }

        $scope.getEmptyFilterParams = function() {
            var filterParams = {};

            filterParams.idOperacion = null;
            filterParams.fechaInicial = null;
            filterParams.fechaFinal = null;
            filterParams.idZona = null;

            return filterParams;
        }

        $scope.redirectTo = function(numeroOrden) {
            location.href ='/detalle?orden='+numeroOrden
        }



});
