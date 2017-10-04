var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('cotizacionConsultaRepository', function($http) {
    return {
        getNivelZona: function(idContratoOperacion) {
            return $http({
                url: searchUrl + 'nivelZona',
                method: "GET",
                params: {
                    idContratoOperacion: idContratoOperacion
                },
                headers: { 'Content-Type': 'application/json' }
            });
        },
        cancelaCotizacion: function(idUsuario, idCotizacion) {
            return $http({
                url: searchUrl + 'cancelaCot',
                method: "POST",
                params: {
                    idUsuario: idUsuario,
                    idCotizacion: idCotizacion
                },
                headers: { 'Content-Type': 'application/json' }
            });
        },
        getZonas: function(idContratoOperacion, idNivel, idUsuario) {
            return $http({
                url: searchUrl + 'zonas/',
                method: "GET",
                params: {
                    idContratoOperacion: idContratoOperacion,
                    idNivel: idNivel,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        obtieneEjecutivos: function(idContratoOperacion) {
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
        /*consultarOrdenes: function(
          tipoConsulta, 
          idContratoOperacion, 
          idZona, 
          fechaInicial, 
          fechaFin,
          fecha,
          fechaMes,
          numeroTrabajo,
          NivelZona,
          idUsuario
        ){
          return $http({
              url: searchUrl + 'ObtenerOrdenesTipoConsulta/',
              method: "GET",
              params: {
                fechaEspecifico: fecha,  //tipoConsulta: tipoConsulta,
                fechaFin: fechaFin,         //idContratoOperacion: idContratoOperacion,
                fechaInicial: fechaInicial,     //idZona: idZona,
                fechaMes: fechaMes,         //fechaInicial: fechaInicial,
                idContratoOperacion: idContratoOperacion,//fechaFin: fechaFin,
                idUsuario: idUsuario,        //fecha: fecha,
                idZona: idZona,           //fechaMes: fechaMes,
                nivelZona: NivelZona,        //numeroTrabajo: numeroTrabajo,
                numeroOrden: numeroTrabajo,      //NivelZona: NivelZona,
                tipoConsulta: tipoConsulta      //idUsuario: idUsuario
              },
              // params: {
              //   tipoConsulta: tipoConsulta,
              //   idContratoOperacion: idContratoOperacion,
              //   idZona: idZona,
              //   fechaInicial: fechaInicial,
              //   fechaFin: fechaFin,
              //   fecha: fecha,
              //   fechaMes: fechaMes,
              //   numeroTrabajo: numeroTrabajo,
              //   NivelZona: NivelZona,
              //   idUsuario: idUsuario
              // },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        },*/
        getOrdenes: function(idContratoOperacion, idZona, idEjecutivo, fechaMes, fechaInicial, fechaFin, fechaEspecifico, NumOrden, porOrden, tipoConsulta) {
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

        ObtenerOrdenesTipoConsulta: function(fechaInicial, fechaFin, fechaEspecifico, fechaMes, numeroOrden, idZona, idEjecutivo, idUsuario, idContratoOperacion, tipoConsulta) {
            var objConsultaOrden = {
                fechaInicial: fechaInicial,
                fechaFin: fechaFin,
                fechaEspecifico: fechaEspecifico,
                fechaMes: fechaMes,
                numeroOrden: numeroOrden,
                idZona: idZona,
                idEjecutivo: idEjecutivo,
                idUsuario: idUsuario,
                idContratoOperacion: idContratoOperacion,
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
        },
        ObtenerOrdenesConTaller: function(idContratoOperacion, numeroOrden, idEjecutivo, idUsuario) {
            var data = {
                idContratoOperacion: idContratoOperacion,
                numeroOrden: numeroOrden,
                idEjecutivo: idEjecutivo,
                idUsuario: idUsuario
            };
            return $http({
                url: searchUrl + 'ObtenerOrdenesConTaller',
                method: "GET",
                params: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        },
        ObtenerOrdenesSinTaller: function(idContratoOperacion, numeroOrden, idEjecutivo, idUsuario) {
            var data = {
                idContratoOperacion: idContratoOperacion,
                numeroOrden: numeroOrden,
                idEjecutivo: idEjecutivo,
                idUsuario: idUsuario
            };
            return $http({
                url: searchUrl + 'ObtenerOrdenesSinTaller',
                method: "GET",
                params: data,
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