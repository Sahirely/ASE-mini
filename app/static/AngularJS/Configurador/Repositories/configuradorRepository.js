var onfiguradorUrl = global_settings.urlCORS + '/api/configurador/';

registrationModule.factory('configuradorRepository', function($http, $q) {
    var deferred = $q.defer();

    return {
        getOperaciones: function() {
            return $http({
                url: onfiguradorUrl + 'operaciones/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
         
    };
});
