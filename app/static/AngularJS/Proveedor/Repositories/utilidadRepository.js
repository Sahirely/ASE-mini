var proveedorURL = global_settings.urlCORS + '/api/proveedor/';

registrationModule.factory('utilidadRepository', function($http){
    return {
        getUtilidad: function(params){
            return $http({
                url: proveedorURL + 'consultaUtilidad',
                method: 'GET',
                params: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
})