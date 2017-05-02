registrationModule.controller('usuariotarController', function($scope, $route, $modal, $rootScope, localStorageService, alertFactory, usuariotarRepository, reporteRepository, dashBoardRepository, globalFactory) {
    $scope.userData = localStorageService.get('userData');
    $scope.init = function() {
        $scope.devuelveZonas();
        $scope.buscaCallCenter();
        $scope.usuarioporTar();
    };
    $scope.devuelveTars = function(zona) {
        if (zona != null) {
            dashBoardRepository.getTars(zona).then(function(tars) {
                if (tars.data.length > 0) {
                    $scope.tars = tars.data;
                }
            }, function(error) {
                alertFactory.error('No se pudo recuperar información de las TARs');
            });
        } else {
            $scope.tar = null;
        }
    };
    $scope.devuelveTar = function(zona) {
        if (zona != null) {
            dashBoardRepository.getTars(zona).then(function(tars) {
                if (tars.data.length > 0) {
                    $scope.tars = tars.data;
                }
            }, function(error) {
                alertFactory.error('No se pudo recuperar información de las TARs');
            });
        } else {
            $scope.tar = null;
        }
    };
    $scope.devuelveZonas = function() {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function(zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;
            }
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    };
    $scope.buscaCallCenter = function() {
        var idUsuario = null;
        if ($scope.userData.idTipoUsuario == 2) {
            idUsuario = $scope.userData.idUsuario;
        }
        reporteRepository.callcenter(idUsuario).then(function(response) {
            if (response.data.length > 0) {
                $scope.callCenters = response.data;
            }
        }, function(error) {
            alertFactory.error('Error al obtener la informacion');
        });
    };
    $scope.usuarioporTar = function() {
        usuariotarRepository.buscaUsuarios($scope.zona, $scope.tar, $scope.callCenter).then(function(response) {
            $('.dataTableUsuarioTar').DataTable().destroy();
            if (response.data.length > 0) {
                globalFactory.waitDrawDocument("dataTableUsuarioTar", "Usuario_TAR");
                $scope.users = response.data;
                alertFactory.success('Usuarios encontrados exitosamente!!');
            } else {
                alertFactory.info('No se encontraron usuarios');
            }
        }, function(error) {
            alertFactory.error('Error al obtener la informacion');
        });
    };
    $scope.asignaUsuario = function() {
        $('#usuarioTarModal').appendTo("body").modal('show');
    };
    $scope.quitaUsuarioTar = function(idTar, idUsuario) {
        swal({
                title: "¿Esta seguro que desea denvincular el Usuario?",
                text: "Se quitara el usuario de la TAR asignada",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65BD10",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    usuariotarRepository.deleteUsuario(idTar, idUsuario).then(function(response) {
                        $('.dataTableUsuarioTar').DataTable().destroy();
                        if (response.data.length > 0) {
                            $scope.usuarioporTar();
                            alertFactory.success('Usuario Denvinculado Correctamente!!');
                        }
                    }, function(error) {
                        alertFactory.error('Error al quitar el usuario');
                    });
                    swal("Trabajo terminado!", "El Usuario se ha desvinculado", "success");
                } else {
                    swal("No Desvinculado", "", "error");
                    $('#finalizarTrabajoModal').modal('hide');
                }
            });
    };
    $scope.asignarUsuarioTar = function() {
        if (($scope.zonaModal != undefined && $scope.zonaModal != null && $scope.zonaModal != "") &&
            ($scope.tarModal != undefined && $scope.tarModal != null && $scope.tarModal != "") &&
            ($scope.callCenterModal != undefined && $scope.callCenterModal != null && $scope.callCenterModal != "")) {
            usuariotarRepository.addUsuarioTar($scope.callCenterModal, $scope.tarModal).then(function(response) {
                $('.dataTableUsuarioTar').DataTable().destroy();
                if (response.data.length > 0) {
                    $scope.usuarioporTar();
                    alertFactory.success('Usuario Vinculado Correctamente!!');
                    $scope.zonaModal = "";
                    $scope.tarModal = "";
                    $scope.callCenterModal = "";
                }
            }, function(error) {
                alertFactory.error('Error al insertar el usuario');
            });
        } else {
            alertFactory.info("Llene todos los campos");
        }
    };
});
