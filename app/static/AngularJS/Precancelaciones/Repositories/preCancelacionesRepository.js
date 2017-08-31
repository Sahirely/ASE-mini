var PreCancelDatesUri = global_settings.urlCORS + '/api/OrdenServicio';

var preCancelacionesRepository = function($http, $q) {
    var defered = $q.defer();
    var promise = defered.promise;

    this.GetAllOrdersCanceled = function() {
        var getPreCancelDatesUri = PreCancelDatesUri + '/getAllOrdersCanceled';
        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };

        $http.get(getPreCancelDatesUri, config).then(function(response) {
            defered.resolve(response.data);
        });
        return promise;
    };
    return {
        GetAllOrdersCanceled: this.GetAllOrdersCanceled
    }



}
registrationModule.factory('preCancelacionesRepository', preCancelacionesRepository);