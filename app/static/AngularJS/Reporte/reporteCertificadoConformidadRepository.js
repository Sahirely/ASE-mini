var reporteUnidadUrl = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteCertificadoConformidadRepository', function ($http) {
    return {
        getReporteCertificadoConformidad: function (idZona, idTar, fechaInicial, fechaFinal) {
            return $http({
                url: reporteUnidadUrl + 'reporteCertificadoConformidad/',
                method: "GET",
                params: {
                    idZona: idZona,
                    idTar: idTar,
                    fechaInicial: fechaInicial,
                    fechaFinal: fechaFinal
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});