var reporteGralUrl = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteRepository', function($http) {
    return {
        reporteParqueVehicular: function(idOperacion, idTipoUnidad, idZona) {
            return $http({
                url: reporteGralUrl + 'ReporteParqueVehicular',
                method: "GET",
                params: {
                    idOperacion: idOperacion,
                    idTipoUnidad: idTipoUnidad,
                    idZona: idZona
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        reporteAntiguedadSaldo: function(params) {
            return $http({
                url: reporteGralUrl + 'reporteAntiguedadSaldo',
                method: "GET",
                params: params,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        estatusOrdenes: function() {
            return $http({
                url: reporteGralUrl + 'estatusOrdenes',
                method: "GET",                
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTipoUnidades: function(idOperacion) {
            return $http({
                url: reporteGralUrl + 'tipoUnidad',
                method: "GET",
                params: {
                    idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});