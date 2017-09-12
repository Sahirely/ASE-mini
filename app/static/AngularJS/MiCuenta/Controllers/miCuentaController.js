registrationModule.controller('miCuentaController', function ($scope, $route, $modal, $rootScope, userFactory, nuevoMemorandumRepository) {
    $rootScope.modulo = 'miCuenta'; // <<-- Para activar en que opción del menú se encuentra

    $scope.Memorandums = []

    // FILE UPLOAD
    $scope.multiple = true;
    $scope.accept = "application/pdf,image/*";
    $scope.files = [];
    $scope.uploadMode = "instantly";

    $scope.fileUploadOptions = {
        selectButtonText: "Selecciona...",
        labelText: "o arrasta aquí",
        uploadUrl: "/api/configurador/uploadMemo",
        bindingOptions: {
            multiple: "multiple",
            accept: "accept",
            value: "files",
            uploadMode: "uploadMode"
        }
    };

    $scope.init = function () {
        $scope.userData = userFactory.getUserData()
        $scope.getMemorandums()
    }

    $scope.getMemorandums = function () {
        nuevoMemorandumRepository.getMemoUsuario($scope.userData.idUsuario)
            .then(function successCallback(response) {
                $scope.Memorandums = response.data
                

            })

    }
});