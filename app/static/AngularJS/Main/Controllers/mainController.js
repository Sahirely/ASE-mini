registrationModule.controller('mainController', function($scope, $rootScope, $location, localStorageService, mainRepository) {
    $rootScope.showChat = 0;
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Se inicializa variable para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = '';
    //*****************************************************************************************************************************//
    // $rootScope.busqueda <<-- si es 1 sera "Buscar Unidad" si es 2 sera "Buscar Orden"
    //*****************************************************************************************************************************//
    $rootScope.busqueda = 1;
    var citaMsg = localStorageService.get('citaMsg');

    $scope.descripcion = localStorageService.get('desc');
    $scope.comentarios = '';
    $scope.comentario = '';

    $scope.init = function() {
        $scope.cargaChatTaller();
        $scope.cargaChatCliente();
        $rootScope.userData = localStorageService.get('userData');
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
    }
    $scope.botonBusqueda = function(busqueda) {
        if (busqueda == 1) {
            $rootScope.busqueda = 2;
        } else if (busqueda == 2) {
            $rootScope.busqueda = 1;
        }
    };


});
