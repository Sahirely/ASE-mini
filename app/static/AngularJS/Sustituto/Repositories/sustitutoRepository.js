var sustitutoUrl = global_settings.urlCORS + '/api/sustituto/';

    registrationModule.factory('sustitutoRepository', function ($http, $q) {
        var deferred = $q.defer();

        return {
            getMotivo: function () {
                return $http({
                    url: sustitutoUrl + 'motivo/',
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },
            getSustituto: function (numEconomico, tipo, idContratoOperacion) {
                return $http({
                    url: sustitutoUrl + 'sustituto/',
                    method: "GET",
                    params: {
                        numEconomico: numEconomico,
                        tipo: tipo,
                        idContratoOperacion: idContratoOperacion
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },
            getValidaOrden: function (numeroOrden, idContratoOperacion) {
                return $http({
                    url: sustitutoUrl + 'validaorden/',
                    method: "GET",
                    params: {
                        numeroOrden: numeroOrden,
                        idContratoOperacion: idContratoOperacion
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },
            getNotificaciones: function (idTipo, numEconomico, fechaInicio, fechaFin) {
                
                return $http({
                    url: sustitutoUrl + 'notificacionesUnidad/',
                    method: "GET",
                    params: {
                        idTipo: idTipo,
                        numEconomico: numEconomico,
                        fechaInicio:fechaInicio,
                        fechaFin:fechaFin

                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },
            addUnidadSustituto: function (idUnidad, idSustituto, idMotivo, idUsuario, numeroOrden, idContratoOperacion) {
                var msgObj = {
                    idUnidad: idUnidad,
                    idSustituto: idSustituto,
                    idMotivo:idMotivo,
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden,
                    idContratoOperacion: idContratoOperacion

                }
                return $http({
                    url: sustitutoUrl + 'addunidadsustituto/',
                    method: "POST",
                    data: msgObj,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },

            getReporte:function(idMotivo, idContratoOperacion){
                return $http({
                        url: sustitutoUrl + 'reportesustituto',//va al controller de node
                        method:"GET", 
                    params: {
                        idMotivo: idMotivo,
                        idContratoOperacion: idContratoOperacion
                    },                      //el metodo get es porque se realizara una consulta
                        headers:{'Content-Type':'application/json'
                    }
                });
            },
            
            putUnidadDesvicula:function(idUnidadSustituto){
            var msgObj = {
                idUnidadSustituto: idUnidadSustituto
            };
                return $http({
                    url: sustitutoUrl + 'unidadDesvinculada',
                    method:"PUT",
                    data: msgObj,
                    headers: {
                         'Content-Type': 'application/json'
                    }
                });
            },
            ubicaUnidad: function (idUnidad) {
                return $http({
                    url: sustitutoUrl + 'unidadUbicacion/',
                    method: "GET",
                    params: {
                        idUnidad: idUnidad
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }


        };
    });

