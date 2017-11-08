registrationModule.controller('reporteSustitutoController', function (MarkerCreatorService, userFactory, $scope, $modal, $route, $rootScope, $location, localStorageService, alertFactory, globalFactory, sustitutoRepository, uploadRepository, commonService) {
  $rootScope.modulo = 'reporteSustituto';
        	
    $scope.init = function (){
    	userFactory.ValidaSesion();
	    $scope.userData = userFactory.getUserData()
	    $scope.rolLogged = $scope.userData.idRol
	    $scope.idUsuario = $scope.userData.idUsuario
	    $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
        $scope.getReporteSustituto();
        $scope.getMotivo();
    }
       
    $scope.posicionUnidad = function (idUnidad){
        modal_detalle_ubicacion($scope, $modal, idUnidad, '', '');
    }

    $scope.Desvinculacion=function (idUnidadSustituto) {
        swal({
            title: "Advertencia",
            text: "¿Está seguro que desea liberar la Unidad?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#67BF11",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
            },
        function (isConfirm) {
            if (isConfirm){
                sustitutoRepository.putUnidadDesvicula(idUnidadSustituto).then(function (unidadSustituto) {//va a mi repository y entra a function getReporte [.then(function (reporte)  es para que devuelva repuesta]
                    if (unidadSustituto.data.length > 0) { //valida que tenga una caden amayor de cero sino es porque no tiene registros 
                        swal("Exito", " La unidad a sido Desvinculada", "success");
                        $scope.getReporteSustituto();
                    } else {
                        alertFactory.info("Fallo el Proceso de desvincular");
                    }
                }, function (error) {
                    alertFactory.error("Error al desvincular la unidad");
                });
                    } else {
                        swal("Proceso Cancelado", "Unidad no Desvinculada");
                    } 
                });
            }

        $scope.validaMotivo = function (motivo){
            if(motivo != null){
                $scope.idMotivoUnidad=motivo.idMotivo;
            }else{
                 $scope.idMotivoUnidad=null;
            }  
             $scope.getReporteSustituto();
        }

            //crea funcion getReporteSustituto
    $scope.getReporteSustituto = function () {
        $('.dataTableReporteSustituto').DataTable().destroy();
        $scope.reporteSustituto=[];
                sustitutoRepository.getReporte($scope.idMotivoUnidad, $scope.idContratoOperacion).then(function (reporte) {//va a mi repository y entra a function getReporte [.then(function (reporte)  es para que devuelva repuesta]
                    if (reporte.data.length > 0) { //valida que tenga una caden amayor de cero sino es porque no tiene registros
                        $scope.reporteSustituto = reporte.data;
                        // globalFactory.waitDrawDocument("dataTableReporteSustituto", "ReporteSustituto");
                        var dataTableSustituto = 'dataTableReporteSustituto';
                           setTimeout(function () {  
                               var indicePorOrdenar = 7;
                               $('.' + dataTableSustituto).DataTable({
                                   order: [[indicePorOrdenar, 'desc']],
                                   dom: '<"html5buttons"B>lTfgitp',
                                   "iDisplayLength": 100,
                                   buttons: [
                                       {
                                           extend: 'excel',
                                           title: 'ReporteSustituto'
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
                           }, 1500);

                        alertFactory.success("Reporte cargado");
                    } else {
                        alertFactory.info("No se encontraron Reporte");
                    }
                }, function (error) {
                    alertFactory.error("Error al cargar Reporte Sustituto");
                });
            }

            //Funcion que devuelve la descripcion de los motivos de las asignacion de sustitutos  
        $scope.getMotivo = function () {
            sustitutoRepository.getMotivo().then(function (motivo) {
                if (motivo.data.length > 0) {
                    $scope.motivos = motivo.data;
                    
                    alertFactory.success("Motivos cargados");
                } else {
                    alertFactory.info("No se encontraron motivos");
                }
            }, function (error) {
                alertFactory.error("Error al cargar motivos");
            });
        }

    //Visualiza la órden de servicio
    $scope.aprobarTrabajo = function (numeroOrden) {
        location.href = '/detalle?orden=' + numeroOrden;
    }


        });