var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionConsultaRepository', function ($http) {
    return {
        getNivelZona: function(idContratoOperacion){
          return $http({
              url: searchUrl + 'nivelZona',
              method: "GET",
              params: {
                  idContratoOperacion: idContratoOperacion
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
        getZonas: function (idContratoOperacion, idNivel) {
            return $http({
                url: searchUrl + 'zonas/',
                method: "GET",
                params: {
                    idContratoOperacion: idContratoOperacion,
                    idNivel: idNivel
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        obtieneEjecutivos: function(idContratoOperacion){
            return $http({
                url: searchUrl + 'ejecutivos/',
                method: "GET",
                params: {
                    idContratoOperacion: idContratoOperacion
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
                fechaInicial: '2017/05/21',
                fechaFin: '2017/06/01',
                idContratoOperacion: 2,
                idZona: 1,
                tipoConsulta: tipoConsulta
                // tipoConsulta: tipoConsulta
              },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        },
        getOrdenes: function(idContratoOperacion, idZona, idEjecutivo, fechaMes, fechaInicial, fechaFin, fechaEspecifico, NumOrden, porOrden, tipoConsulta){
          var objConsultaOrden = {
              idContratoOperacion: idContratoOperacion,
              idZona: idZona,
              idEjecutivo: idEjecutivo,
              fechaMes: fechaMes,
              fechaInicial: fechaInicial,
              fechaFin: fechaFin,
              fechaEspecifico: fechaEspecifico,
              NumOrden: NumOrden,
              porOrden: porOrden,
              tipoConsulta: tipoConsulta
          };
            return $http({
                url: searchUrl + 'ObtenerOrdenes/',
                method: "GET",
                params: objConsultaOrden,
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },

        ObtenerOrdenesTipoConsulta: function(idContratoOperacion, idZona, nivelZona, idEjecutivo, fechaMes, fechaInicial, fechaFin, fechaEspecifico, NumOrden, tipoConsulta){
          var objConsultaOrden = {
              idContratoOperacion: idContratoOperacion,
              idZona: idZona,
              nivelZona:nivelZona,
              idUsuario: idEjecutivo,
              fechaMes: fechaMes,
              fechaInicial: fechaInicial,
              fechaFin: fechaFin,
              fechaEspecifico: fechaEspecifico,
              numeroOrden: NumOrden,
              tipoConsulta: tipoConsulta
          };
            return $http({
                url: searchUrl + 'ObtenerOrdenesTipoConsulta/',
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
