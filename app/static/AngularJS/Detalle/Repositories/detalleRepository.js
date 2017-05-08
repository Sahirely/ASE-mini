var detalleUrl = global_settings.urlCORS + '/api/detalle/';

registrationModule.factory('detalleRepository', function ($http) {
    return {        
        getNumCita: function (idTar,idZona,idUsuario) {
            return $http({
                url: detalleUrl + 'sumatoriaCitas/',
                method: "GET",
                params: {
                    idTar:idTar,
                    idZona: idZona,
                    idUsuario:idUsuario
                    
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});