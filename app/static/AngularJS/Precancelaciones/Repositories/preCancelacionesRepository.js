var PreCancelDatesUri = global_settings.urlCORS + '/api/OrdenServicio';

var preCancelacionesRepository = function($http, $q) {


    this.GetAllOrdersCanceled = function(idOperacion) {
        var defered = $q.defer();
        var promise = defered.promise;
        var getPreCancelDatesUri = PreCancelDatesUri + '/getAllOrdersCanceled';
        var data={
            idOperacion:idOperacion
        }
        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };

        $http.post(getPreCancelDatesUri,data,config).then(function(response) {
            defered.resolve(response.data);
        });
        return promise;
    };
    this.postDeleteOrderCancel = function(idOrden) {
        var defered = $q.defer();
        var promise = defered.promise;
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
        var defered = $q.defer();
        var promise = defered.promise;
        var postCancelCitaUri = PreCancelDatesUri + '/cancelaOrden';
        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        var data = {
            idUsuario: idUsuario,
            idOrden: idOrden
        };
        $http.post(postCancelCitaUri, data, config).then(function(response) {
            defered.resolve(response);
        });

        return promise;
    }
    this.postGetMailNotification = function(idUsuario, idOrden, tipoConsulta) {
        var defered = $q.defer();
        var promise = defered.promise;
        var postGetMailNotificationUri = PreCancelDatesUri + '/getMailCancelaOrden';
        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        var data = {
            idUsuario: idUsuario,
            idOrden: idOrden,
            tipoConsulta: tipoConsulta
        };
        $http.post(postGetMailNotificationUri, data, config).then(function(response) {
            defered.resolve(response);
        });
        return promise;

    }

    return {
        postGetMailNotification: this.postGetMailNotification,
        postCancelaOrden: this.postCancelaOrden,
        postDeleteOrderCancel: this.postDeleteOrderCancel,
        GetAllOrdersCanceled: this.GetAllOrdersCanceled
    }



}
registrationModule.factory('preCancelacionesRepository', preCancelacionesRepository);