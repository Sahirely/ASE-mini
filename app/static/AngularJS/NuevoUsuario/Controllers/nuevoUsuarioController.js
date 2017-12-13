registrationModule.controller('nuevoUsuarioController', function($scope, $rootScope, localStorageService, userFactory, alertFactory, commonService, $location) 
{
    $rootScope.modulo = 'nuevoUsuario';
    $scope.prueba = '';
    
    $scope.init = function()
    {
        $scope.prueba = 'HOLA';
    }

});
