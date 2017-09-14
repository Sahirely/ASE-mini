registrationModule.controller('miCuentaController', function ($scope, $route, $modal, $rootScope, userFactory, nuevoMemorandumRepository, alertFactory) {
    $rootScope.modulo = 'miCuenta'; // <<-- Para activar en que opción del menú se encuentra

    $scope.Memorandums = []
    $scope.asuntoQueja = ""
    $scope.mensajeQueja = ""
    $scope.Quejas = []

    $scope.init = function () {
        $scope.userData = userFactory.getUserData()
        $scope.getMemorandums()
        $scope.getQuejas()
    }

    $scope.getMemorandums = function () {
        nuevoMemorandumRepository.getMemoUsuario($scope.userData.idUsuario)
            .then(function successCallback(response) {
                response.data.forEach(function (element) {

                    if ($scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum) == undefined) {
                        $scope.Memorandums.push({
                            "idMemorandum": element.idMemorandum,
                            "fecha": new Date(element.fecha).toLocaleDateString() + ' ' + new Date(element.fecha).toLocaleTimeString(),
                            "titulo": element.titulo,
                            "descripcion": element.descripcion,
                            "leido": element.leido,
                            "aceptado": element.aceptado,
                            "comentarios": element.comentarios,
                            evidencias: [
                                {
                                    "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                                    "idEvidencia": element.idEvidencia,
                                    "evidencia": element.evidencia
                                }
                            ]
                        })
                    }
                    else {
                        $scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum).evidencias.push({
                            "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                            "idEvidencia": element.idEvidencia,
                            "evidencia": element.evidencia
                        })
                    }
                }, this);
            })

    }

    $scope.getQuejas = function()
    {
        nuevoMemorandumRepository.getQuejas()
        .then(function successCallback(response) {
            $scope.Quejas = response.data;
        });
    }

    $scope.saveQueja = function () {
        nuevoMemorandumRepository.saveQueja($scope.userData.idUsuario,$scope.asuntoQueja, $scope.mensajeQueja)
            .then(function successCallback(response) {
                alertFactory.success('Queja generada de forma correcta.');
            });
    }
});