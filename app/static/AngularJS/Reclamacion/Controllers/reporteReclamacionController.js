// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/03/2017
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reporteReclamacionController', function ($scope, alertFactory, userFactory, $rootScope, localStorageService, reclamacionRepository, cotizacionConsultaRepository, globalFactory) {
    $rootScope.modulo = 'rptReclamacion';
    var trabajos = {};
    var idTrabajos = [];
    $scope.userData = userFactory.getUserData();
    $scope.idUsuario = $scope.userData.idUsuario;
    $scope.idRol = $scope.userData.idRol;
    $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = [];
    $scope.NivelesZona = [];
    $scope.Zonas = [];

    //Inicializa la pagina
    $scope.init = function () {
        userFactory.ValidaSesion();
        $scope.ZonasSeleccionadas[0] = "0";
        $scope.obtieneNivelZona();
        $scope.callAnexos();
    }

    $scope.obtieneNivelZona = function(){
        $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.userData.contratoOperacionSeleccionada).then(function (result) {
            $scope.totalNiveles = result.data.length;
            if(result.data.length > 0){
              $scope.NivelesZona = result.data;
              $scope.devuelveZonas();
            }
         },
         function (error) {
             alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
         });
    }

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function() {
      for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x ++){
        cotizacionConsultaRepository.getZonas($scope.userData.contratoOperacionSeleccionada, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function(result) {
          if (result.data.length > 0){
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

    $scope.cambioZona = function(id, orden){
      //al cambiar de zona se establece como zona seleccionada.
      $scope.zonaSelected = id;
      //se limpian los combos siguientes.
      for($scope.x = orden+1; $scope.x <= $scope.totalNiveles; $scope.x ++){
        $scope.ZonasSeleccionadas[$scope.x] = "0";
      }
    }

    $scope.callAnexos = function () {
        $scope.cantidadTotal = 0;
        $scope.idZona = $scope.ZonasSeleccionadas[$scope.totalNiveles] === undefined || $scope.ZonasSeleccionadas[$scope.totalNiveles] === "0" ? null : $scope.ZonasSeleccionadas[$scope.totalNiveles];
        ///////////////////////////////////
    	$scope.anexos1 = '';
    	$scope.anexos2 = '';
    	$scope.anexos3 = '';
        ///////////////////////////////////
		$scope.Anexo1($scope.idZona,1,$scope.idContratoOperacion);
		$scope.Anexo2($scope.idZona,2,$scope.idContratoOperacion);
		$scope.Anexo3($scope.idZona,3,$scope.idContratoOperacion);
    }

    $scope.Anexo1 = function (idZona, anexo, idContratoOperacion) {
            $scope.cantidad1 = 0;
            $scope.diaTotal1 = 0;
            $scope.noReportes1 = 0;
            $scope.diaMax1 = 0;
            $('.dataTableAnexo1').DataTable().destroy();
        reclamacionRepository.getAnexos(idZona, anexo, idContratoOperacion).then(function (result) {
            if (result.data.length > 0) {   	
            	$scope.anexos1 = result.data;
                waitDrawDocument("dataTableAnexo1", "Anexo1", 100);
                $scope.noReportes1 = $scope.anexos1.length;
                $scope.diaMax1 = $scope.anexos1[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos1.length; i++) {
                    $scope.cantidad1 += ($scope.anexos1[i].precioOrden); 
                    $scope.diaTotal1 += ($scope.anexos1[i].DiasAtraso);     
                }
                $scope.cantidadTotal += $scope.cantidad1; 
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }

    $scope.Anexo2 = function (idZona, anexo, idContratoOperacion) {
            $scope.cantidad2 = 0;
            $scope.diaTotal2 = 0;
            $scope.noReportes2 = 0;
            $scope.diaMax2 = 0;
            $('.dataTableAnexo2').DataTable().destroy();
        reclamacionRepository.getAnexos(idZona, anexo, idContratoOperacion).then(function (result) {
            if (result.data.length > 0) {
            	$scope.anexos2 = result.data;
            	waitDrawDocument("dataTableAnexo2", "Anexo2", 100);
                $scope.noReportes2 = $scope.anexos2.length;
                $scope.diaMax2 = $scope.anexos2[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos2.length; i++) {
                    $scope.cantidad2 += ($scope.anexos2[i].precioOrden); 
                    $scope.diaTotal2 += ($scope.anexos2[i].DiasAtraso);     
                }
                $scope.cantidadTotal += $scope.cantidad2; 
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  

    $scope.Anexo3 = function (idZona, anexo, idContratoOperacion) {
            $scope.cantidad3 = 0;
            $scope.diaTotal3 = 0;
            $scope.noReportes3 = 0;
            $scope.diaMax3 = 0;
            $('.dataTableAnexo3').DataTable().destroy();
        reclamacionRepository.getAnexos(idZona, anexo, idContratoOperacion).then(function (result) {
            if (result.data.length > 0) {
                $scope.anexos3 = result.data;
                waitDrawDocument("dataTableAnexo3", "Anexo3", 100);
                $scope.idOsur3 = result.data[0].idOsur;
                $scope.noReportes3 = $scope.anexos3.length;
                $scope.diaMax3 = $scope.anexos3[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos3.length; i++) {
                    $scope.cantidad3 += ($scope.anexos3[i].precioOrden);   
                    $scope.diaTotal3 += ($scope.anexos3[i].DiasAtraso);   
                }
                $scope.cantidadTotal += $scope.cantidad3; 
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  

    var waitDrawDocument = function(dataTable, title, displayLength) {
            $('.' + dataTable).DataTable().destroy()
            $('.' + dataTable + ' thead th').each(function() {
                var titulo = $(this).text()
                $(this).html(titulo + '<br><input type="text" class="filtro-tabla"/>')
            })
            setTimeout(function() {
                var indicePorOrdenar = 0;
                if (dataTable == 'dataTableAnexo1') {
                    indicePorOrdenar = 10;
                } else if (dataTable == 'dataTableAnexo2') {
                    indicePorOrdenar = 11;
                } else if (dataTable == 'dataTableAnexo3') {
                    indicePorOrdenar = 10;
                } else {
                    indicePorOrdenar = 10;
                }
                var table = $('.' + dataTable).DataTable({
                    order: [[indicePorOrdenar, 'desc']],
                    dom: '<"html5buttons"B>lTfgitp',
                    'iDisplayLength': displayLength,
                    buttons: [{
                        extend: 'excel',
                        exportOptions: {
                            columns: ':visible'
                        },
                        title: title
                    }, {
                        extend: 'print',
                        exportOptions: {
                            columns: ':visible'
                        },
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg')
                            $(win.document.body).css('font-size', '10px')

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit')
                        }
                    }]
                })
                table.columns().every(function() {
                    var that = this

                    $('input', this.header()).on('keyup change', function() {
                        if (that.search() !== this.value) {
                            that
                                .search(this.value)
                                .draw()
                        }
                    })
                })
            }, 100)
        }

});