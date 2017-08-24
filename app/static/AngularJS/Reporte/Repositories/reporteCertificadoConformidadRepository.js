var reporteUnidadUrl = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteCertificadoConformidadRepository', function ($http) {
    

    return {
        
        reporteCertificadoConformidad : function(params) {
            return $http({
                url: reporteGralUrl + 'reporteCertificadoConformidad',
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