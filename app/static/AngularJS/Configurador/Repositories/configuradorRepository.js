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
        postOperaciones: function(nombreOperacion, nombreContacto, correoContacto, telefonoContacto, fechaInicio, fechaFin, idCatalogoTipoOperacion, manejoUtilidad, porcentajeUtilidad, geolocalizacion, estatusOperacion, idCatalogoFormaPago, presupuesto, centros, idOperacion) {
          
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
                centros: centros,
                idOperacion:idOperacion
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
        },
        postUnidad: function(numeroEconomico, vin,  gps, idTipoUnidad, sustituto, idOperacion, idCentroTrabajo) {
          
           var msgObj = {
                numeroEconomico: numeroEconomico,
                vin: vin,
                gps: gps,
                idTipoUnidad: idTipoUnidad,
                sustituto: sustituto,
                idOperacion: idOperacion,
                idCentroTrabajo: idCentroTrabajo
            };
            return $http({
                url: onfiguradorUrl + 'nuevaUnidad/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getCentrosDeTrabajo: function(idOperacion) {
            
            var msgObj = {
                idOperacion: idOperacion
            };
            return $http({
                url: onfiguradorUrl + 'centrosDeTrabajo/',
                method: "GET",
                params: {
                         idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTipoUnidades: function(idOperacion) {
            return $http({
                url: onfiguradorUrl + 'tipoUnidades/',
                method: "GET",
                params: {
                         idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getCatalogoModulos: function(idOperacion, tipo) {
            var msgObj = {
                idOperacion: idOperacion,
                tipo: tipo
            };

            return $http({
                url: onfiguradorUrl + 'catalogoModulos/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getDetalleModulo: function(idModulo) {
            return $http({
                url: onfiguradorUrl + 'detalleModulo/',
                method: "GET",
                params: {
                         idModulo: idModulo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postModuloPorDertalle: function(idModulo, detalle) {
          
           var msgObj = {
                idModulo: idModulo,
                detalle: detalle
            };
            return $http({
                url: onfiguradorUrl + 'moduloPorDertalle/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postModuloAdicional: function(idOperacion, modulos) {
          
           var msgObj = {
                idOperacion: idOperacion,
                modulos: modulos
            };
            return $http({
                url: onfiguradorUrl + 'moduloAdicional/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDatosOperacion: function(idOperacion) {
            var msgObj = {
                idOperacion: idOperacion
            };

            return $http({
                url: onfiguradorUrl + 'datosOperacion/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

    }    
});
