var busquedaUnidadUrl = global_settings.urlCORS + '/api/busquedaUnidad/';

registrationModule.factory('busquedaUnidadRepository', function($http) {
    return {
        getDetalleUnidad: function(idUsuario, economico) {
            return $http({
                url: busquedaUnidadUrl + 'detalleUnidad/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    economico: economico
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        //*****************************************************************************************************************************//
        // Busca si existe la unidad, si el usuario tiene permisos para el tipo de operación y el rol al que pertenece 
        // puede visualizar la información de dicha unidad, el SP nos da como respuesta las siguientes opcioes
        // respuesta = 0 <-- No existe la unidad 
        // respuesta = 1 <-- Existe la unidad y tiene todos los permisos necesarios 
        // respuesta = 2 <-- Existe la unidad pero el tipo de operación no le corresponde
        // respuesta = 3 <-- Existe la unidad pero el rol no tiene permisos para visualizar la información
        //*****************************************************************************************************************************//
        getExisteUnidad: function(idUsuario, economico) {
            return $http({
                url: busquedaUnidadUrl + 'existeUnidad/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    economico: economico
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getNumerosEconomicos: function(idContratoOperacion) {
            return $http({
                url: busquedaUnidadUrl + 'numerosEconomicos/',
                method: "GET",
                params: {
                    idContratoOperacion: idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenActual: function(idUsuario, economico) {
            return $http({
                url: busquedaUnidadUrl + 'ordenActual/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    economico: economico
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistoricoOrdenes: function(idUsuario, economico) {
            return $http({
                url: busquedaUnidadUrl + 'historicoOrdenes/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    economico: economico
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDetalleOrden: function(economico) {
            return $http({
                url: busquedaUnidadUrl + 'detalleOrden/',
                method: "GET",
                params: {
                    numeroEconomico: economico
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDetalleOrdenEspecialidad: function(idOrden) {
            return $http({
                url: busquedaUnidadUrl + 'detalleOrdenEspecialidad/',
                method: "GET",
                params: {
                    idOrden: idOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };
});
