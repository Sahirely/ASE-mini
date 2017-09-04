registrationModule.controller('miCuentaController', function ($scope, $route, $modal, $rootScope) {
    $rootScope.modulo = 'miCuenta'; // <<-- Para activar en que opción del menú se encuentra

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

    }
});