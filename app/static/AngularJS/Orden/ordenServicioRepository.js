var searchUrl = global_settings.urlCORS + '/api/cotizacion/';
var ordenUrl = global_settings.urlCORS + '/api/ordenes/';

registrationModule.factory('ordenServicioRepository', function ($http) {
    return {
        getChat: function (idCita) {
            return $http({
                url: searchUrl + 'chat/' + idCita,
                method: "GET"
            });
        },
        putMessage: function (usuario, msg, cita) {
            var msgObj = {
                idUsuario: usuario,
                mensaje: msg,
                idCita: cita
            };

            return $http({
                url: searchUrl + 'message',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getFichaTecnica: function (idCita) {
            return $http({
                url: searchUrl + 'ficha/' + idCita,
                method: "GET"
            });
        },
        getCotizacionByTrabajo: function (idCita, idUsuario) {
            return $http({
                url: searchUrl + 'cotizacionByTrabajo',
                method: "GET",
                params: {
                    idCita: idCita,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        putCotizacionAprobacion: function (cotizacion, usuario, comentario) {
            var aprobacionObj = {
                cotizacion: cotizacion,
                usuario: usuario,
                comentarios: comentario
            };

            return $http({
                url: searchUrl + 'cotizacionAprobacion',
                method: "POST",
                data: aprobacionObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getEvidenciasByCotizacion: function (idCotizacion) {
            return $http({
                url: searchUrl + 'evidenciasByCotizacion/' + idCotizacion,
                method: "GET"
            });
        },
        putCotizacionRechazo: function (cotizacion, usuario, comentario) {
            var rechazoObj = {
                cotizacion: cotizacion,
                usuario: usuario,
                comentarios: comentario
            };

            return $http({
                url: searchUrl + 'cotizacionRechazo',
                method: "POST",
                data: rechazoObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDocs: function (idCotizacion) {
            return $http({
                url: searchUrl + 'docs/' + idCotizacion,
                method: "GET"
            });
        },
        getOrdenesPorCobrar: function () {
            return $http({
                url: ordenUrl + 'ordenesporcobrar',
                method: "GET"
            });
        },
        getAdmonOrdenes: function (numeroTrabajo) {
            return $http({
                url: ordenUrl + 'getadmonordenes/',
                method: "GET",
                params: {
                    numeroTrabajo: numeroTrabajo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },

        getAprobacionUtilidad: function () {
            return $http({
                url: ordenUrl + 'getaprobacionutilidad/',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },

        putAprobacionUtilidad: function (idTrabajo,idUsuario) {             
            return $http({        
                url: ordenUrl + 'insertaDatosAprobacionUtilidad',
                        method: "POST",
                         data: {
                           idTrabajo: idTrabajo,
                           idUsuario: idUsuario
                        },

                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            });    
        },
        putPrecioEditado: function (idCotizacion, idPartida, nuevoPrecio) {
            var precioObj = {
                idCotizacion: idCotizacion,
                idPartida: idPartida,
                nuevoPrecio: nuevoPrecio
            };

            return $http({
                url: ordenUrl + 'precioEditado',
                method: "POST",
                data: precioObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        cierreOrden: function (idTrabajo) {
            var cierreObj = {
                idTrabajo: idTrabajo
            };

            return $http({
                url: ordenUrl + 'mueveCierreOrden/',
                method: "POST",
                data: cierreObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        updateCotMaestro: function (idCotizacion,idTipoCotizacion,idTaller) {
            var cierreObj = {
                idCotizacion: idCotizacion,
                idTipoCotizacion:idTipoCotizacion,
                idTaller:idTaller
            };

            return $http({
                url: ordenUrl + 'actualizaCotizacionMaestro/',
                method: "POST",
                data: cierreObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        tipoCotizacion: function () {
            return $http({
                url: ordenUrl + 'obtieneCotizacion',
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        recuperaCotizacion: function (idCotizacion) {
            return $http({
                url: ordenUrl + 'obtieneMaestro',
                method: "GET",
                params: {
                    idCotizacion: idCotizacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});