registrationModule.controller('nuevoUsuarioController', function($scope, $rootScope, localStorageService, userFactory, alertFactory, commonService, $location, nuevoUsuarioRepository) {
    $rootScope.modulo = 'nuevoUsuario';

    $scope.init = function(){
        $scope.prueba = 'HOLA';
    }

});
