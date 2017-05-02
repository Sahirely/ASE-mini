var reporteGralUrl = global_settings.urlCORS + '/api/reporte/';

registrationModule.factory('reporteRepository', function ($http) {
    return {        
        reporteGral: function () {
            return $http({
                url: reporteGralUrl + 'reportegral',
                method: "GET"
            });
        },

        reporteAntiguedad: function (fechaInicio, fechaFin, zona, tar, estatus, numeroTrabajo, tipo, idUsuario, tipofecha) {
            return $http({
                url: reporteGralUrl + 'reporteAntiguedad',
                method: "GET",
                params: {
                    fechaInicio: fechaInicio,
                    fechaFin: fechaFin,
                    zona: zona,
                    tar: tar,
                    estatus: estatus,
                    numeroTrabajo: numeroTrabajo,
                    tipo: tipo,
                    idUsuario: idUsuario,
                    tipofecha:tipofecha
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        estatus: function () {
            return $http({
                url: reporteGralUrl + 'estatus',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        callcenter: function (idUsuario) {
            return $http({
                url: reporteGralUrl + 'callcenter',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});