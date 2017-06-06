registrationModule.controller('mainController', function($scope, $rootScope, $location, $modal, consultaCitasRepository, localStorageService, userFactory, mainRepository, busquedaUnidadRepository) {
    $rootScope.showChat = 0;
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Se inicializa variable para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = '';
    //*****************************************************************************************************************************//
    // $rootScope.busqueda <<-- si es 1 sera "Buscar Unidad" si es 2 sera "Buscar Orden"
    //*****************************************************************************************************************************//
    $rootScope.busqueda = 1;
    $scope.numeroEconomico = '';
    var citaMsg = localStorageService.get('citaMsg');

    $scope.descripcion = localStorageService.get('desc');
    $scope.comentarios = '';
    $scope.comentario = '';

    $scope.init = function() {
        $scope.cargaChatTaller();
        $scope.cargaChatCliente();
        $scope.userData = userFactory.getUserData(); //localStorageService.get('userData');
        //$scope.idUsuario = $scope.userData.idUsuario;
    }

    $scope.CambiarOperacion = function(idCont) {
        $scope.userData = userFactory.updateSelectedOperation(idCont);
        if ($scope.userData.idRol == 3) {
            location.href = '/dashboardCallCenter';
        } else if ($scope.userData.idRol == 5) {
            location.href = '/configurador';
        } else {
            location.href = '/dashboardgeneral';
        }
    }

    $scope.logOut = function() {
        userFactory.logOut();
    }

    $scope.cargaChatTaller = function() {
        if (citaMsg !== null) {
            mainRepository.getChat(citaMsg, 1).then(function(result) {
                if (result.data.length > 0) {
                    $scope.chattaller = result.data;
                }
            }, function(error) {});
        }
    }

    $scope.cargaChatCliente = function() {
        if (citaMsg !== null) {
            mainRepository.getChat(citaMsg, 2).then(function(result) {
                if (result.data.length > 0) {
                    $scope.chatcliente = result.data;
                }
            }, function(error) {});
        }
    }

    $scope.EnviarComentario1 = function(comentarios, idTipoChat) {
        mainRepository.putMessage($rootScope.userData.idUsuario, comentarios, citaMsg, idTipoChat).then(function(result) {
                $scope.algo = result.data;
                $scope.clearComments();
                $scope.cargaChatTaller();
            },
            function(error) {});
    }

    $scope.EnviarComentario2 = function(comentario) {
        mainRepository.putMessage($rootScope.userData.idUsuario, comentario, citaMsg, 2).then(function(result) {
                $scope.algo = result.data;
                $scope.BorraComentario();
                $scope.cargaChatCliente();
            },
            function(error) {});
    }

    $scope.clearComments = function() {
        $scope.comentarios = '';
    }
    $scope.BorraComentario = function() {
        $scope.comentario = '';
    };
    //*****************************************************************************************************************************//
    // Funcion para mostrar u ocultar input de busqueda en el header  busqueda = 1 <-- Muestra Busca Unidad
    //                                                                busqueda = 2 <-- Muestra Busca Orden
    //*****************************************************************************************************************************//
    $scope.botonBusqueda = function(busqueda) {
        if (busqueda == 1) {
            $scope.numeroOrden = '';
            $rootScope.busqueda = 2;
        } else if (busqueda == 2) {
            $scope.numeroEconomico = '';
            $rootScope.busqueda = 1;
        }
    };

    //*****************************************************************************************************************************//
    // ***  busquedaUnidadRepository.getExisteUnidad($scope.idUsuario, economico)  ***/
    // Busca si existe la unidad, si el usuario tiene permisos para el tipo de operación y el rol al que pertenece
    // puede visualizar la información de dicha unidad
    // $scope.tipoRespuesta = 0 <-- No existe la unidad
    // $scope.tipoRespuesta = 1 <-- Existe la unidad y tiene todos los permisos necesarios
    // $scope.tipoRespuesta = 2 <-- Existe la unidad pero el tipo de operación no le corresponde
    // $scope.tipoRespuesta = 3 <-- Existe la unidad pero el rol no tiene permisos para visualizar la información
    //*****************************************************************************************************************************//
    $scope.getDetalleUnidad = function(economico) {
        busquedaUnidadRepository.getExisteUnidad($scope.idUsuario, economico).then(function(result) {
            $scope.tipoRespuesta = result.data[0];
            if ($scope.tipoRespuesta.respuesta == 0) {
                //
                $('.modal-dialog').css('width', '1050px');
                modal_respuesta_busqueda($scope, $modal, $rootScope.busqueda, $scope.tipoRespuesta, '', '');
            } else if ($scope.tipoRespuesta.respuesta == 1) {
                location.href = '/unidad?economico=' + economico;
            } else if ($scope.tipoRespuesta.respuesta == 2) {
                $('.modal-dialog').css('width', '1050px');
                modal_respuesta_busqueda($scope, $modal, $rootScope.busqueda, $scope.tipoRespuesta, '', '');
            }

        });

    };
    //*****************************************************************************************************************************//
    // Busca el detalle de la Orden de Servicio
    //*****************************************************************************************************************************//
    $scope.getDetalleOrden = function(orden) {
        consultaCitasRepository.getExisteOrden($scope.idUsuario, orden).then(function(result) {
            $scope.tipoRespuesta = result.data[0];
            if ($scope.tipoRespuesta.respuesta == 0) {
                $('.modal-dialog').css('width', '1050px');
                modal_respuesta_busqueda($scope, $modal, $rootScope.busqueda, $scope.tipoRespuesta, '', '');
            } else if ($scope.tipoRespuesta.respuesta == 1) {
                location.href = '/detalle?orden=' + orden;
            }
        });
    };

});
