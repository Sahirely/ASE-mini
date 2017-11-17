var proveedorURL = global_settings.urlCORS + '/api/proveedor/';

registrationModule.factory('dispersionRepository', function($http){
    return {
        getDispersion: function(params){
            return $http({
                url: proveedorURL + 'consultaDispersion',
                method: 'GET',
                params: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
})