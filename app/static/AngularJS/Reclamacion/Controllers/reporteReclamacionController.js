// -- =============================================
// -- Author:      Carlos Adolfo Martinez Diosdado
// -- Create date: 30/03/2017
// -- Description: Reporte Cita controller
// -- =============================================

registrationModule.controller('reporteReclamacionController', function ($scope, alertFactory, $rootScope, localStorageService, reclamacionRepository, dashBoardRepository, globalFactory) {
    $scope.userData = localStorageService.get('userData');
    $scope.jsonDataAnexo1 = undefined;
    $scope.jsonDataAnexo2 = undefined;
    $scope.jsonDataAnexo3 = undefined;
    var trabajos = {};
    var idTrabajos = [];
    $scope.idTrabajoAnexo1 = undefined;
    $scope.idTrabajoAnexo2 = undefined;
    $scope.idTrabajoAnexo3 = undefined;
    $rootScope.modulo = 'rptReclamacion';

    //Inicializa la pagina
    $scope.init = function () {
		/*$scope.devuelveZonas();
        $scope.reclamacion = localStorageService.get('objResumen');
        if($scope.reclamacion != null){
           $scope.zona = $scope.reclamacion.idZona;
           $scope.tar = $scope.reclamacion.idTAR;
           $scope.devuelveTars($scope.zona);
             $scope.callAnexos();
        }*/
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

    $scope.callAnexos = function () {
        var trabajos = {};
        var idTrabajos = [];
        $scope.idTrabajoAnexo1 = undefined;
        ///////////////////////////////////
        $scope.cantidadTotal = 0;
        $scope.jsonDataAnexo1 = undefined;
        $scope.jsonDataAnexo2 = undefined;
        $scope.jsonDataAnexo3 = undefined;
        ///////////////////////////////////
    	$scope.anexos1 = '';
    	$scope.anexos2 = '';
    	$scope.anexos3 = '';
        ///////////////////////////////////
		$scope.Anexo1($scope.zona,$scope.tar,1);
		$scope.Anexo2($scope.zona,$scope.tar,2);
		$scope.Anexo3($scope.zona,$scope.tar,3);
        ///////////////////////////////////
        if($scope.reclamacion != null){
            localStorageService.remove('objResumen');
        }
    }

/*    $scope.Anexo1 = function (idZona, idTar, anexo) {
            $scope.cantidad1 = 0;
            $scope.diaTotal1 = 0;
            $scope.noReportes1 = 0;
            $scope.diaMax1 = 0;
            $('.dataTableAnexo1').DataTable().destroy();
        reclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {
            	$scope.anexos1 = result.data;
            	waitDrawDocument("dataTableAnexo1", "Anexo1");
                $scope.noReportes1 = $scope.anexos1.length;
                $scope.diaMax1 = $scope.anexos1[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos1.length; i++) {
                    $scope.cantidad1 += ($scope.anexos1[i].precioOrden);
                    $scope.diaTotal1 += ($scope.anexos1[i].DiasAtraso); 
                      var trabajos = {
                                "idTrabajo":result.data[i].idTrabajo         
                                }
                    idTrabajos.push(trabajos); 
                    $scope.idTrabajoAnexo1 = {
                        "idTrabajo": idTrabajos
                    }
                }	
                $scope.cantidadTotal += $scope.cantidad1; 
                var data1 = {};
                var estructura1 = {};
                var anexo1 = [];
                    for (i = 0; i < result.data.length; i++) {
                        var data1 = {
                                    "Consecutivo":result.data[i].Consecutivo,
                                    "Cliente":result.data[i].Cliente,
                                    "NoOrden":result.data[i].NoOrden,
                                    "NoEconomico":result.data[i].NoEconomico,
                                    "Zona":result.data[i].Zona,
                                    "TAR":result.data[i].TAR,
                                    "folioCertificado":result.data[i].folioCertificado,
                                    "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                    "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                    "precioOrden":result.data[i].precioOrden,
                                    "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                    "DiasAtraso":result.data[i].DiasAtraso            
                                    } 
                        anexo1.push(data1);  
                    } 
                        var detalle1 = {
                                    "noReportes":$scope.noReportes1,
                                    "cantidad":$scope.cantidad1,
                                    "diaTotal":$scope.diaTotal1 
                                    } 
                var estructura1 = {
                    "anexo1": anexo1,
                    "detalle1": detalle1
                }

                $scope.jsonDataAnexo1 = {
                    "template": {
                        "name": "anexo1_rpt"
                    },
                    "data": estructura1
                }
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }*/

    $scope.Anexo1 = function (idZona, idTar, anexo) {
            $scope.cantidad1 = 0;
            $scope.diaTotal1 = 0;
            $scope.noReportes1 = 0;
            $scope.diaMax1 = 0;
            $('.dataTableAnexo1').DataTable().destroy();
        reclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {   	
            	$scope.anexos1 = result.data;
                waitDrawDocument("dataTableAnexo1", "Anexo1");
                $scope.noReportes1 = $scope.anexos1.length;
                $scope.diaMax1 = $scope.anexos1[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos1.length; i++) {
                    $scope.cantidad1 += ($scope.anexos1[i].precioOrden); 
                    $scope.diaTotal1 += ($scope.anexos1[i].DiasAtraso);     
                }
                $scope.cantidadTotal += $scope.cantidad1; 
                var data1 = {};
                var estructura1 = {};
                var anexo1 = [];
                    for (i = 0; i < result.data.length; i++) {
                        var data1 = {
                                    "Consecutivo":result.data[i].Consecutivo,
                                    "Cliente":result.data[i].Cliente,
                                    "NoOrden":result.data[i].NoOrden,
                                    "NoEconomico":result.data[i].NoEconomico,
                                    "Zona":result.data[i].Zona,
                                    "TAR":result.data[i].TAR,
                                    "folioCertificado":result.data[i].folioCertificado,
                                    "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                    "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                    "precioOrden":result.data[i].precioOrden,
                                    "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                    "DiasAtraso":result.data[i].DiasAtraso
                                
                            } 
                        anexo1.push(data1);  
                    } 
                        var detalle1 = {
                            "noReportes":$scope.noReportes1,
                            "cantidad":$scope.cantidad1,
                            "diaTotal":$scope.diaTotal1 
                        } 

                var estructura1 = {
                    "anexo1": anexo1,
                    "detalle1": detalle1
                }

                $scope.jsonDataAnexo1 = {
                    "template": {
                        "name": "anexo1_rpt"
                    },
                    "data": estructura1
                }
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }

    $scope.Anexo2 = function (idZona, idTar, anexo) {
            $scope.cantidad2 = 0;
            $scope.diaTotal2 = 0;
            $scope.noReportes2 = 0;
            $scope.diaMax2 = 0;
            $('.dataTableAnexo2').DataTable().destroy();
        reclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {
            	$scope.anexos2 = result.data;
            	waitDrawDocument("dataTableAnexo2", "Anexo2");
                $scope.noReportes2 = $scope.anexos2.length;
                $scope.diaMax2 = $scope.anexos2[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos2.length; i++) {
                    $scope.cantidad2 += ($scope.anexos2[i].precioOrden); 
                    $scope.diaTotal2 += ($scope.anexos2[i].DiasAtraso);     
                }
                $scope.cantidadTotal += $scope.cantidad2; 
                var data2 = {};
                var estructura2 = {};
                var anexo2 = [];
                    for (i = 0; i < result.data.length; i++) {
                        var data2 = {
                                    "Consecutivo":result.data[i].Consecutivo,
                                    "Cliente":result.data[i].Cliente,
                                    "NoOrden":result.data[i].NoOrden,
                                    "NoEconomico":result.data[i].NoEconomico,
                                    "Zona":result.data[i].Zona,
                                    "TAR":result.data[i].TAR,
                                    "Copade":result.data[i].Copade,
                                    "folioCertificado":result.data[i].folioCertificado,
                                    "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                    "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                    "precioOrden":result.data[i].precioOrden,
                                    "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                    "DiasAtraso":result.data[i].DiasAtraso
                                
                            } 
                        anexo2.push(data2);  
                    } 
                        var detalle2 = {
                            "noReportes":$scope.noReportes2,
                            "cantidad":$scope.cantidad2,
                            "diaTotal":$scope.diaTotal2 
                        } 

                var estructura2 = {
                    "anexo2": anexo2,
                    "detalle2": detalle2
                }

                $scope.jsonDataAnexo2 = {
                    "template": {
                        "name": "anexo2_rpt"
                    },
                    "data": estructura2
                }
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  

    $scope.Anexo3 = function (idZona, idTar, anexo) {
            $scope.cantidad3 = 0;
            $scope.diaTotal3 = 0;
            $scope.noReportes3 = 0;
            $scope.diaMax3 = 0;
            $('.dataTableAnexo3').DataTable().destroy();
        reclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {
                $scope.anexos3 = result.data;
                waitDrawDocument("dataTableAnexo3", "Anexo3");
                $scope.idOsur3 = result.data[0].idOsur;
                $scope.noReportes3 = $scope.anexos3.length;
                $scope.diaMax3 = $scope.anexos3[0].DiasAtraso;
                for (var i = 0; i < $scope.anexos3.length; i++) {
                    $scope.cantidad3 += ($scope.anexos3[i].precioOrden);   
                    $scope.diaTotal3 += ($scope.anexos3[i].DiasAtraso);   
                }
                $scope.cantidadTotal += $scope.cantidad3; 
                var data3 = {};
                var estructura3 = {};
                var anexo3 = [];
                    for (i = 0; i < result.data.length; i++) {
                        var data3 = {
                                    "Consecutivo":result.data[i].Consecutivo,
                                    "Cliente":result.data[i].Cliente,
                                    "NoOrden":result.data[i].NoOrden,
                                    "NoEconomico":result.data[i].NoEconomico,
                                    "Zona":result.data[i].Zona,
                                    "TAR":result.data[i].TAR,
                                    "folioCertificado":result.data[i].folioCertificado,
                                    "FechaTerminoOsur":result.data[i].FechaTerminoOsur,
                                    "fechaOsurActiva":result.data[i].fechaOsurActiva,
                                    "precioOrden":result.data[i].precioOrden,
                                    "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                    "DiasAtraso":result.data[i].DiasAtraso
                                
                            } 
                        anexo3.push(data3);  
                    } 
                        var detalle3 = {
                            "noReportes":$scope.noReportes3,
                            "cantidad":$scope.cantidad3,
                            "diaTotal":$scope.diaTotal3 
                        } 
                var estructura3 = {
                    "anexo3": anexo3,
                    "detalle3": detalle3
                }

                $scope.jsonDataAnexo3 = {
                    "template": {
                        "name": "anexo3_rpt"
                    },
                    "data": estructura3
                }
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  

    $scope.reporteReclamacion = function () {
        if (($scope.zona != undefined && $scope.zona != null)) {
                $scope.class_buttonReclamacion = 'fa fa-spinner fa-spin';
                    reclamacionRepository.getInfoAnexos($scope.zona, $scope.tar,$scope.cantidad1,$scope.noReportes1,$scope.diaMax1,$scope.cantidad2,$scope.noReportes2,$scope.diaMax2,$scope.cantidad3,$scope.noReportes3,$scope.diaMax3,$scope.idOsur3).then(function (result) {
                    //$('.dataTableAnexo3').DataTable().destroy();
                    if (result.data.length > 0) {
                        result.data[0].noReportes1 == 0 ? result.data[0].noReportes1 = "" : result.data[0].noReportes1;
                        result.data[0].noReportes2 == 0 ? result.data[0].noReportes2 = "" : result.data[0].noReportes2;
                        result.data[0].noReportes3 == 0 ? result.data[0].noReportes3 = "" : result.data[0].noReportes3;

                        result.data[0].TAR == null ? result.data[0].TAR = "" : result.data[0].TAR;
                        
                        if($scope.jsonDataAnexo1 != undefined){
                            $scope.jsonDataAnexo1.data.detalle1.noReporte =  result.data[0].noReporte;
                            $scope.jsonDataAnexo1.data.detalle1.fecha = result.data[0].fecha;

/*                                reclamacionRepository.callZip($scope.idTrabajoAnexo1).then(function (tars) {
                                        if (tars.data.length > 0) {

                                        }
                                }, function (error) {
                                     alertFactory.error('No se pudo generar el Zip del Anexo 1');
                                });*/
                        }
                        if($scope.jsonDataAnexo2 != undefined){
                            $scope.jsonDataAnexo2.data.detalle2.noReporte =  result.data[0].noReporte;
                            $scope.jsonDataAnexo2.data.detalle2.fecha = result.data[0].fecha;
                        }
                        if($scope.jsonDataAnexo3 != undefined){
                            $scope.jsonDataAnexo3.data.detalle3.noReporte =  result.data[0].noReporte;
                            $scope.jsonDataAnexo3.data.detalle3.fecha = result.data[0].fecha;
                        }


                    var data = {
                    "reclamacion": 
                        {
                            "idReclamacion":result.data[0].idReclamacion,
                            "noReportes1":result.data[0].noReportes1,
                            "cantidad1":result.data[0].cantidad1,
                            "diaMax1":result.data[0].diaMax1,
                            "noReportes2":result.data[0].noReportes2,
                            "cantidad2":result.data[0].cantidad2,
                            "diaMax2":result.data[0].diaMax2,
                            "noReportes3":result.data[0].noReportes3,
                            "cantidad3":result.data[0].cantidad3,
                            "diaMax3":result.data[0].diaMax3,
                            "noReporte":result.data[0].noReporte,
                            "fechaLarga":result.data[0].fechaLarga,
                            "personaPemex":result.data[0].personaPemex,
                            "personaPemexA":result.data[0].personaPemexA,
                            "tar":result.data[0].TAR,
                            "zona":result.data[0].zona,
                            "representanteLegal":result.data[0].representanteLegal,
                            "nombreSAD":result.data[0].nombreSAD,
                            "nombreGAD":result.data[0].nombreGAD,
                            "letraGAD":result.data[0].letraGAD,
                            "nombreTAD":result.data[0].nombreTAD
                        }
                    }   
                }   
   
                var jsonData = {
                    "template": {
                        "name": "reclamacion_rpt" 
                    },
                    "data": data
                }

                        reclamacionRepository.callExternalPdf(jsonData).then(function (result) {               
                            setTimeout(function () {
                                  $scope.idReclamacionAnexos = result.data.idReclamacion;
                                  var url = $rootScope.vIpServer + result.data.fileresponse;
                                  var a = document.createElement('a');
                                  a.href = url;
                                  a.download = 'reporteReclamacion';
                                  a.click();
                                  if($scope.jsonDataAnexo1 != undefined){
                                            reclamacionRepository.callExternalAnexo($scope.jsonDataAnexo1,$scope.idReclamacionAnexos,'Anexo1').then(function (result) {               
                                                setTimeout(function () {
                                                      var url = $rootScope.vIpServer + result.data;
                                                      var a = document.createElement('a');
                                                      a.href = url;
                                                      a.download = 'Anexo1';
                                                      //a.target = '_blank';
                                                      a.click();
                                                      $scope.jsonDataAnexo1 = undefined;
                                                         $scope.$apply( function () { 
                                                            $scope.class_buttonReclamacion = 'glyphicon glyphicon-ok';
                                                         });
                                                 }, 5300);                          
                                            });
                                        }
                                    if($scope.jsonDataAnexo2 != undefined){
                                            reclamacionRepository.callExternalAnexo($scope.jsonDataAnexo2,$scope.idReclamacionAnexos,'Anexo2').then(function (result) {               
                                                setTimeout(function () {
                                                      var url = $rootScope.vIpServer + result.data;
                                                      var a = document.createElement('a');
                                                      a.href = url;
                                                      a.download = 'Anexo2';
                                                      //a.target = '_blank';
                                                      a.click();
                                                      $scope.jsonDataAnexo2 = undefined;
                                                         $scope.$apply( function () { 
                                                            $scope.class_buttonReclamacion = 'glyphicon glyphicon-ok';
                                                         });
                                                 }, 5300);                          
                                            });
                                        }
                                    if($scope.jsonDataAnexo3 != undefined){
                                            reclamacionRepository.callExternalAnexo($scope.jsonDataAnexo3,$scope.idReclamacionAnexos,'Anexo3').then(function (result) {               
                                                setTimeout(function () {
                                                      var url = $rootScope.vIpServer + result.data;
                                                      var a = document.createElement('a');
                                                      a.href = url;
                                                      a.download = 'Anexo3';
                                                      //a.target = '_blank';
                                                      a.click();
                                                      $scope.jsonDataAnexo3 = undefined;
                                                         $scope.$apply( function () { 
                                                            $scope.class_buttonReclamacion = 'glyphicon glyphicon-ok';
                                                         });
                                                 }, 5300);                          
                                            });
                                        }
                             }, 4000);                          
                        });

                }, function (error) {
                    alertFactory.error('Error al recuperar la informacion solicitada');
                });
        }else{
        	alertFactory.info('Para generar el reporte de reclamacion es necesario seleccionar una Zona');
        }
    }

        //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable, title) {
        setTimeout(function () {
            var indicePorOrdenar = 0;
            if (dataTable == 'dataTableAnexo1') {
                indicePorOrdenar = 11;
            } else if (dataTable == 'dataTableAnexo2') {
                indicePorOrdenar = 12;
            } else if (dataTable == 'dataTableAnexo3') {
                indicePorOrdenar = 11;
            } else {
                indicePorOrdenar = 11;
            }

            $('.' + dataTable).DataTable({
                order: [[indicePorOrdenar, 'desc']],
                dom: '<"html5buttons"B>lTfgitp',
                "iDisplayLength": 5,
                buttons: [
                    {
                        extend: 'excel',
                        title: title
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
        }, 2500);
    }

});