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
        },
        getTipoOperaciones: function() {
            return $http({
                url: onfiguradorUrl + 'tipoOperaciones/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getFormaDePago: function() {
            return $http({
                url: onfiguradorUrl + 'formaPago/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        postOperaciones: function(nombreOperacion, nombreContacto, correoContacto, telefonoContacto, fechaInicio, fechaFin, idCatalogoTipoOperacion, manejoUtilidad, porcentajeUtilidad, geolocalizacion, estatusOperacion, idCatalogoFormaPago, presupuesto, centros) {
          
           var msgObj = {
                nombreOperacion: nombreOperacion,
                nombreContacto: nombreContacto,
                correoContacto: correoContacto,
                telefonoContacto: telefonoContacto,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                idCatalogoTipoOperacion: idCatalogoTipoOperacion,
                manejoUtilidad: manejoUtilidad,
                porcentajeUtilidad: porcentajeUtilidad,
                geolocalizacion: geolocalizacion,
                estatusOperacion: estatusOperacion,
                idCatalogoFormaPago: idCatalogoFormaPago,
                presupuesto: presupuesto,
                centros: centros
            };
            return $http({
                url: onfiguradorUrl + 'nuevaOperacion/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getLicitaciones: function() {
            return $http({
                url: onfiguradorUrl + 'licitaciones/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postContratoOperacion: function(idOperacion, idContrato) {
          
           var msgObj = {
                idOperacion: idOperacion,
                idContrato: idContrato
            };
            return $http({
                url: onfiguradorUrl + 'contratoOperacion/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }    
});
