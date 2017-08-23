var reporteUtilidadUrl = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteUtilidadRepository', function ($http) {
    return {
        getUtilidad: function (tipoConsulta, idOperacion, numOrden, fechaInicial, fechaFinal, fechaMes, idZona, rangoInicial, rangoFinal, idTipoOrden, idEstatus){//fechaInicio, fechaFin, fechaMes, rangoInicial, rangoFinal, zona, tar, idTipoCita, estatus, numeroTrabajo, bandera) {
            return $http({
                url: reporteUtilidadUrl + 'reporteUtilidad/',
                method: "GET",
                params: {
                    tipoConsulta : tipoConsulta,
                    idOperacion : idOperacion,
                    numOrden : numOrden,
                    fechaInicial : fechaInicial,
                    fechaFinal : fechaFinal,
                    fechaMes : fechaMes,
                    idZona : idZona,
                    rangoInicial : rangoInicial,
                    rangoFinal : rangoFinal,
                    idTipoOrden : idTipoOrden,
                    idEstatus : idEstatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
