var reclamacionUrl = global_settings.urlCORS + '/api/reclamacion/';
var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('reclamacionRepository', function ($http, $q) {
    var deferred = $q.defer();

    return {
        getReclamacion: function (noReporte,fechaInicio, fechaFin) {
            return $http({
                url: reclamacionUrl + 'reclamacion/',
                method: "GET",
                params: {
                    noReporte:noReporte,
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getEvidenciasByReclamacion: function (idReclamacion, idTipoUsuario) {
            return $http({
                url: searchUrl + 'evidenciasByReclamacion',
                method: "GET",
                params: {
                    idReclamacion: idReclamacion, 
                    idTipoUsuario:idTipoUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
                getResumen: function () {
            return $http({
                url: reclamacionUrl + 'resumenReclamcion/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getReclamacion: function () {
            return $http({
                url: reclamacionUrl + 'reclamcionMeastro/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
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
        callZip: function (jsonAnexos) {
            return $http({
                url: cotizacionUrl + 'generaZip/',
                method: "POST",
                data: {
                    jsonAnexos: jsonAnexos
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getInfoAnexos: function (idZona,idTar,cantidad1,noReportes1,diaMax1,cantidad2,noReportes2,diaMax2,cantidad3,noReportes3,diaMax3,idOsur) {
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
                    idOsur:idOsur
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
        },
        callZip: function (jsonAnexo1) {
            return $http({
                url: cotizacionUrl + 'generaZip/',
                method: "POST",
                data: {
                    jsonAnexo1: jsonAnexo1
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
        getAnexos: function (idZona, anexo, idContratoOperacion) {
            return $http({
                url: reclamacionUrl + 'buscaAnexos/',
                method: "GET",
                params: {
                    idZona: idZona,
                    anexo: anexo,
                    idContratoOperacion: idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };

});