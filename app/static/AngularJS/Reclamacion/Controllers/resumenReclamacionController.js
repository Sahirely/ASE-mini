registrationModule.controller('resumenReclamacionController', function ($scope, $route, $modal, $rootScope, userFactory, localStorageService, alertFactory, globalFactory, uploadRepository, reclamacionRepository, dashBoardRepository, reporteReclamacionRepository) {
    $scope.userData = userFactory.getUserData();
    $scope.idUsuario = $scope.userData.idUsuario;
    $scope.idRol = $scope.userData.idRol;
    $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
    $rootScope.modulo = 'emisionOficios';

    $scope.init = function () {
        userFactory.ValidaSesion();
    }

});
