var administracionUrl = global_settings.urlCORS + '/api/administracion/';

registrationModule.factory('usuariotarRepository', function ($http, $q) {
    var deferred = $q.defer();

    return {
        buscaUsuarios: function (idZona,idTar,idUsuario) {
            return $http({
                url: administracionUrl + 'users/',
                method: "GET",
                params: {
                    idZona: idZona,
                    idTar:idTar,
                    idUsuario:idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        deleteUsuario: function (idTar,idUsuario) {
            var msgObj = {
                idTar:idTar,
                idUsuario:idUsuario
            }
            return $http({
                url: administracionUrl + 'deleteUserTar',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        addUsuarioTar: function (idUsuario,idTar) {
            var msgObj = {
                idUsuario:idUsuario,
                idTar:idTar
            }
            return $http({
                url: administracionUrl + 'addUserTar',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});