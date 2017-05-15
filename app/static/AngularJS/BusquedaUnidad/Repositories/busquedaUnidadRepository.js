var busquedaUnidadUrl = global_settings.urlCORS + '/api/busquedaUnidad/';

registrationModule.factory('busquedaUnidadRepository', function($http) {
    return {
        getDetalleUnidad: function(idUsuario, economico) {
            return $http({
                url: busquedaUnidadUrl + 'detalleUnidad/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    economico: economico
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
