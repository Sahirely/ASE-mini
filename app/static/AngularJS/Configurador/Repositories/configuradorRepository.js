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
        postOperaciones: function(nombreOperacion, nombreContacto, correoContacto, telefonoContacto, fechaInicio, fechaFin, idCatalogoTipoOperacion, manejoUtilidad, porcentajeUtilidad, geolocalizacion, tiempoAsignado, estatusOperacion, idCatalogoFormaPago, presupuesto, centros, idOperacion) {
          
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
                tiempoAsignado: tiempoAsignado,
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
        getLicitaciones: function(idOperacion) {
            var msgObj = {
                idOperacion: idOperacion
            };
            return $http({
                url: onfiguradorUrl + 'licitaciones/',
                method: "GET",
                params: msgObj,
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
        postUnidad: function(numeroEconomico, vin,  gps, idTipoUnidad, sustituto, idOperacion, idCentroTrabajo, placas) {
          
           var msgObj = {
                numeroEconomico: numeroEconomico,
                vin: vin,
                gps: gps,
                idTipoUnidad: idTipoUnidad,
                sustituto: sustituto,
                idOperacion: idOperacion,
                idCentroTrabajo: idCentroTrabajo,
                placas: placas
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
        postModuloPorDertalle: function(idModulo, detalle, tiempoAsignado) {
          
           var msgObj = {
                idModulo: idModulo,
                detalle: detalle,
                tiempoAsignado: tiempoAsignado
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
        },
        postnumeroUnidades: function(idOperacion, unidades, numUnidades) {
          
           var msgObj = {
                idOperacion: idOperacion,
                unidades: unidades,
                numUnidades: numUnidades
            };
            return $http({
                url: onfiguradorUrl + 'numeroUnidades/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getunidadOperacion: function(idOperacion) {
            var msgObj = {
                idOperacion: idOperacion
            };

            return $http({
                url: onfiguradorUrl + 'unidadOperacion/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }, 
        postCargararMaxUnidades: function(idOperacion, archivo) {
          
           var msgObj = {
                idOperacion: idOperacion,
                archivo: archivo
            };
            return $http({
                url: onfiguradorUrl + 'cargararMaxUnidades/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    }    
});
