var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionConsultaRepository', function ($http) {
    return {
        obtieneEjecutivos: function(){
            return $http({
                url: searchUrl + 'ejecutivos/',
                method: "GET",
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        get: function(idZona, idEjecutivo, Mes, Inicio, Fin, Fecha, NumOrden, EsPorOrden){
          var objConsultaOrden = {
            idZona: idZona,
            idEjecutivo: idEjecutivo,
            Mes: Mes,
            Inicio: Inicio,
            Fin: Fin,
            Fecha: Fecha,
            NumOrden: NumOrden,
            EsPorOrden: EsPorOrden
          };
            return $http({
                url: searchUrl + 'see/',
                method: "GET",
                params: objConsultaOrden,
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        busquedaPieza: function(){
        	return $http({
        		url: searchUrl + 'buscar',
        		method: "GET"
        	});
        },
        getDetail: function (idCotizacion, idTaller, idUsuario) {
            var objCotizacion = {
                idCotizacion: idCotizacion,
                idTaller: idTaller,
                idUsuario: idUsuario
            };

            return $http({
                url: searchUrl + 'detail',
                method: "GET",
                params: objCotizacion,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            /*return $http({
                url: searchUrl + 'detail/' + idCotizacion,
                method: "POST"
            });*/
        },
        cancelaOrden: function (idTrabajo,idCotizacion) {
            var msgObj = {
                idTrabajo: idTrabajo,
                idCotizacion:idCotizacion
            }
            return $http({
                url: searchUrl + 'cancelacionOrden',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };
});
