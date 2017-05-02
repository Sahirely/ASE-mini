var reporteOrdenUrl = global_settings.urlCORS + '/api/dashboard/';
var cotizacionUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('reporteReclamacionRepository', function ($http) {
    return {        
        getAnexos: function (idZona, idTar, anexo) {
            return $http({
                url: reporteOrdenUrl + 'buscaAnexos/',
                method: "GET",
                params: {
                    idZona: idZona,
                    idTar: idTar,
                    anexo: anexo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getInfoAnexos: function (idZona,idTar,cantidad1,noReportes1,diaMax1,cantidad2,noReportes2,diaMax2,cantidad3,noReportes3,diaMax3,cantidad4,noReportes4,diaMax4) {
            return $http({
                url: reporteOrdenUrl + 'informacionAnexos/',
                method: "GET",
                params: {
                    idZona: idZona,
                    idTar: idTar,
                    cantidad1: cantidad1,
                    noReportes1: noReportes1,
                    diaMax1: diaMax1,
                    cantidad2: cantidad2,
                    noReportes2: noReportes2,
                    diaMax2: diaMax2,
                    cantidad3: cantidad3,
                    noReportes3: noReportes3,
                    diaMax3: diaMax3,
                    cantidad4: cantidad4,
                    noReportes4: noReportes4,
                    diaMax4: diaMax4
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        callExternalPdf: function (jsonData) {
            return $http({
                url: cotizacionUrl + 'newpdfReclamacion/',
                method: "POST",
                data: {
                    values: jsonData
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        callExternalAnexo: function (jsonData, idReclamacion, nombre) {
            return $http({
                url: cotizacionUrl + 'newAnexo/',
                method: "POST",
                data: {
                    values: jsonData,
                    idReclamacion: idReclamacion,
                    nombre: nombre
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }
});