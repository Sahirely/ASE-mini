registrationModule.controller('historialReclamacionController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, uploadRepository, reclamacionRepository, dashBoardRepository) {
    $scope.userData = localStorageService.get('userData');
	$scope.reclamacionUploadFile = localStorageService.get('idReclamacion');
    $rootScope.modulo = 'consultaOficios';

    $scope.init = function () {
		//$scope.devuelveZonas();
        //$scope.callReclamacion();
    }

    $scope.initEvidencia = function () {
		//Dropzone.autoDiscover = false;
        //$scope.cargaEvidencias();
        //$scope.dzOptionsServicio = uploadRepository.getDzOptions("image/*,application/pdf,.mp4,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/xml,.docX,.DOCX,.ppt,.PPT",20);
    }

    $('#fecha .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
            //startDate: new Date()
    });

    //Rango de datos
    $('#data_5 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true
    });
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

    $scope.callReclamacion = function () {
    	$('.dataTableReclamacion').DataTable().destroy();
    	$scope.reportes = '';
    	$scope.fechaInicio == '' ? $scope.fechaInicio = null : $scope.fechaInicio;
        $scope.fechaFin == '' ? $scope.fechaFin = null : $scope.fechaFin;
        reclamacionRepository.getReclamacion($scope.numeroReporte,$scope.fechaInicio,$scope.fechaFin).then(function (result) {
            if (result.data.length > 0) {
                $scope.reportes = result.data;
                alertFactory.success('Historial recuperado correctamente');
				waitDrawDocument("dataTableReclamacion", "Reclamación");
            }else{
                alertFactory.info('No se encontro información !');
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    }

  $scope.verEvidencia = function (idReclamacion) {
    localStorageService.set('idReclamacion', idReclamacion);
    location.href = '/evidenciaReclamacion';
 }

   $scope.cargaEvidencias = function () {
        reclamacionRepository.getEvidenciasByReclamacion($scope.reclamacionUploadFile, $scope.userData.idTipoUsuario).then(function (result) {
            if (result.data.length > 0) {
                $scope.slides = result.data;
                setTimeout(function () {
                    $scope.efectoEvidencias();
                }, 1000)
            } else {
                $scope.alerta = 1;
            }
        }, function (error) {});
    }

    $scope.efectoEvidencias = function () {
        $('.file-box').each(function () {
            animationHover(this, 'pulse');
        });
    }

    $scope.adjuntarEvidencia = function () {
        $('#cotizacionDetalle').appendTo('body').modal('show');
    }
        //call backs of drop zone
    $scope.dzCallbacks = {
        'addedfile': function (file) {
            $scope.newFile = file;
        },
        'sending': function(file, xhr, formData){
            formData.append('idTrabajo', $scope.reclamacionUploadFile);
            formData.append('idCotizacion', 0);
            formData.append('idCategoria', 4);
            formData.append('idNombreEspecial', 0);//evidenciaTrabajo
        }
        ,
        'completemultiple': function (file, xhr) {
            var checkErrorFile = file.some(checkExistsError);
            if(!checkErrorFile){
                var allSuccess = file.every(checkAllSuccess);
                if(allSuccess){
                    $scope.cargaEvidencias();
                    setTimeout(function(){
                        $scope.dzMethods.removeAllFiles(true);
                        $('#cotizacionDetalle').appendTo('body').modal('hide');
                    },1000);
                }
            }
        },
        'error': function (file, xhr) {
            if(!file.accepted){
                $scope.dzMethods.removeFile(file);
            }
            else{
                $scope.dzMethods.removeAllFiles(true);
                alertFactory.info("No se pudieron subir los archivos");   
            }
        },
    };

    //valida si todos son success
    function checkAllSuccess(file, index, array) {
        return file.status === 'success';
    }
    
    //valida si existe algún error
    function checkExistsError(file) {
        return file.status === 'error';
    }

            //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable, title) {
        setTimeout(function () {
            var indicePorOrdenar = 0;
            if (dataTable == 'dataTableReclamacion') {
                indicePorOrdenar = 4;
            } else {
                indicePorOrdenar = 4;
            }

            $('.' + dataTable).DataTable({
                aaSorting: [[indicePorOrdenar, 'desc']],
                dom: '<"html5buttons"B>lTfgitp',
                "iDisplayLength": 100,
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