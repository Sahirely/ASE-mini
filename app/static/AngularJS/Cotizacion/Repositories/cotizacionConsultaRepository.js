var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionConsultaRepository', function ($http) {
    return {
        getNivelZona: function(idUsuario){
          return $http({
              url: searchUrl + 'nivelZona',
              method: "GET",
              params: {
                  idUsuario: idUsuario
              },
              headers:{ 'Content-Type': 'application/json' }
          });
        },
        cancelaCotizacion: function(idUsuario, idCotizacion){
          return $http({
              url: searchUrl + 'cancelaCot',
              method: "POST",
              params: {
                  idUsuario: idUsuario,
                  idCotizacion: idCotizacion
              },
              headers:{ 'Content-Type': 'application/json' }
          });
        },
        getZonas: function (idUsuario, idPadre, orden) {
            return $http({
                url: searchUrl + 'zonas/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idPadre: idPadre,
                    orden: orden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        obtieneEjecutivos: function(idUsuario){
            return $http({
                url: searchUrl + 'ejecutivos/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        consultarOrdenes: function(tipoConsulta){
          return $http({
              url: searchUrl + 'ConsultaOrdenes/',
              method: "GET",
              params: {
                tipoConsulta: tipoConsulta
              },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        },
        get: function(idUsuario, idZona, idEjecutivo, Mes, Inicio, Fin, Fecha, NumOrden, EsPorOrden, ConPresupuesto){
          var objConsultaOrden = {
            idUsuario: idUsuario,
            idZona: idZona,
            idEjecutivo: idEjecutivo,
            Mes: Mes,
            Inicio: Inicio,
            Fin: Fin,
            Fecha: Fecha,
            NumOrden: NumOrden,
            EsPorOrden: EsPorOrden,
            ConPresupuesto: ConPresupuesto
          };
            return $http({
                url: searchUrl + 'see/',
                method: "GET",
                params: objConsultaOrden,
                headers: {
                'Content-Type': 'application/json'
                }
            });
        }
        //,
        // busquedaPieza: function(){
        // 	return $http({
        // 		url: searchUrl + 'buscar',
        // 		method: "GET"
        // 	});
        // },
        // getDetail: function (idCotizacion, idTaller, idUsuario) {
        //     var objCotizacion = {
        //         idCotizacion: idCotizacion,
        //         idTaller: idTaller,
        //         idUsuario: idUsuario
        //     };
        //
        //     return $http({
        //         url: searchUrl + 'detail',
        //         method: "GET",
        //         params: objCotizacion,
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     /*return $http({
        //         url: searchUrl + 'detail/' + idCotizacion,
        //         method: "POST"
        //     });*/
        // },
        // cancelaOrden: function (idTrabajo,idCotizacion) {
        //     var msgObj = {
        //         idTrabajo: idTrabajo,
        //         idCotizacion:idCotizacion
        //     }
        //     return $http({
        //         url: searchUrl + 'cancelacionOrden',
        //         method: "POST",
        //         data: msgObj,
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        // }

    };
});
