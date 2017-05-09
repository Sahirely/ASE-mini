var busquedaUnidadUrl = global_settings.urlCORS + '/api/busquedaUnidad/';

registrationModule.factory('busquedaUnidadRepository', function ($http) {
    return {        
        getNumCita: function (idTar,idZona,idUsuario) {
            return $http({
                url: busquedaUnidadUrl + 'sumatoriaCitas/',
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