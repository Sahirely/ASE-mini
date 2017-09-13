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
                response.data.forEach(function (element) {
                    
                    if ($scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum) == undefined) {
                        $scope.Memorandums.push({
                            "idMemorandum": element.idMemorandum,
                            "fecha": new Date(element.fecha),
                            "titulo": element.titulo,
                            "descripcion": element.descripcion,
                            evidencias: [
                                {
                                    "rootPath": $rootScope.docServer + '/memorandum/'+element.idMemorandum + '/',
                                    "idEvidencia": element.idEvidencia,
                                    "evidencia": element.evidencia
                                }
                            ]
                        })
                    }
                    else {
                        $scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum).evidencias.push({
                            "rootPath": $rootScope.docServer + '/memorandum/'+element.idMemorandum + '/',
                            "idEvidencia": element.idEvidencia,
                            "evidencia": element.evidencia 
                        })
                    }
                }, this);
            })

    }
});