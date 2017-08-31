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
    this.postDeleteOrderCancel = function(idOrden) {
        var postDeleteOrderCancelUri = PreCancelDatesUri + '/postDeleteOrderCancel';

        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        var data = {
            idOrden: idOrden
        }
        $http.post(postDeleteOrderCancelUri, data, config).then(function(response) {
            defered.resolve(response);
        });
        return promise;
    }
    this.postCancelaOrden = function(idUsuario, idOrden) {
        var postCancelCitaUri = PreCancelDatesUri + '/cancelaOrden';
        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        var data = {
            idUsuario: idUsuario,
            idOrden: idOrden
        }
        $http.post(postCancelCitaUri, data, config).then(function(response) {
            defered.resolve(response);
        });

        return promise;
    }

    return {
        postCancelaOrden: this.postCancelaOrden,
        postDeleteOrderCancel: this.postDeleteOrderCancel,
        GetAllOrdersCanceled: this.GetAllOrdersCanceled
    }



}
registrationModule.factory('preCancelacionesRepository', preCancelacionesRepository);