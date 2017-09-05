var preCancelacionesController = function($scope, $route, $routeParams, userFactory, preCancelacionesRepository, $rootScope, $modal, alertFactory, detalleRepository, commonFunctionRepository) {
    $rootScope.module = 'PreCancelaciones';
    $scope.Zonas = [];
    $scope.TotalOrdenes = [];


    $scope.init = function() {
        userFactory.ValidaSesion();
    };

    $scope.initPrecancelacion = function() {
        consultaOrdenesCanceladas();
    }
    $scope.CancelOrder = function(idOrden) {
        swal({
            title: "Cancelar Orden",
            text: "Cancela la orden",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                CancelOrderProcess(idOrden);
            } else {
                swal("Ninguna acción realizada.");
            }

        });
    }

    function CancelOrderProcess(idOrden) {
        detalleRepository.postCancelaOrden($scope.userData.idUsuario, idOrden).then(function(result) {
            preCancelacionesRepository.postDeleteOrderCancel(idOrden).then(function(result) {
                preCancelacionesRepository.postGetMailNotification($scope.userData.idUsuario, idOrden, 2).then(function(result) {
                    commonFunctionRepository.sendMail(result.data[0].correoDe, result.data[0].correoPara, 'Cancelación', 'Ordenes', result.data[0].bodyhtml, '', '').then(function(response) {
                        swal({
                            title: "Trabajo terminado",
                            message: "La cita se ha cancelado",
                            type: 'success',
                            showCancelButton: false
                        }, function() {
                            location.reload();
                        });
                    });
                });

            });


        });

    }
    $scope.DissmisOrder = function(idOrden) {
        swal({
                title: "Ignorar cancelación",
                text: "Ignora la cancelación de la cita y volvera a aparecer en la consulta de citas",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65BD10",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    dissmisOrderProcess(idOrden);
                } else {
                    swal("Ninguna acción realizada.");
                }

            }

        )

    }

    function dissmisOrderProcess(idOrden) {
        preCancelacionesRepository.postDeleteOrderCancel(idOrden).then(function(result) {

            swal({
                title: "Cancelación rechazada",
                message: "Se ha rechazado la solicitud de cancelación, ahora puedes ver el registro en consulta",
                type: 'success',
                showCancelButton: false
            }, function() {
                location.reload();
            });



        })
    }

    function consultaOrdenesCanceladas() {
        $('.dataTableOrdenes').DataTable().destroy();
        preCancelacionesRepository.GetAllOrdersCanceled().then(function(result) {
            if (result.length > 0) {
                $scope.TotalOrdenes = result;
            } else {
                alertFactory.info('No se encontraron citas canceladas');
            }
        });

    }


};

registrationModule.controller('preCancelacionesController', preCancelacionesController);