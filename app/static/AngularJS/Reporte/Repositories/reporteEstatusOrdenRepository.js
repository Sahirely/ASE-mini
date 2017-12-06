var reporteEstatusOrden = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteEstatusOrdenRepository', function($http) {
    return {
        getAverage: function(params) {
            return $http({
                url: reporteEstatusOrden + 'consultapromedio/',
                method: "GET",
                params: {
                    tipoOperacion: params.tipoOperacion,
                    fechaCOPADEInicial : params.fechaPagoInicial,
                    fechaCOPADEFinal: params.fechaPagoFinal,
                    fechaCreacionInicial: params.fechaCreacionInicial,
                    fechaCreacionFinal: params.fechaCreacionFinal,
                    montoInicial: params.montoInicial,
                    montoFinal: params.montoFinal,
                    montoMayorQue: params.montoMayorQue
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
    };
});