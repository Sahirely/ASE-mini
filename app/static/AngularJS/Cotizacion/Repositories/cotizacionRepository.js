var searchUrl = global_settings.urlCORS + '/api/cotizacion/';
var cotizacion = global_settings.urlCORS + '/api/orden/';
var ruta = global_settings.uploadPath;
//var ruta = 'C:/Users/Mario/Documents/FileUpload';

registrationModule.factory('cotizacionRepository', function($http) {
    return {

        insCotizacionNueva: function(idTaller, idUsuario, idEstatusCotizacion, idOrden, idCatalogoTipoOrdenServicio, existeTaller) {
            var msgObj = {
                idTaller: idTaller,
                idUsuario: idUsuario,
                idEstatusCotizacion: idEstatusCotizacion,
                idOrden: idOrden,
                idCatalogoTipoOrdenServicio: idCatalogoTipoOrdenServicio,
                existeTaller: existeTaller
            }
            return $http({
                url: searchUrl + 'cotizacionNueva',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        inCotizacionDetalle: function(idCotizacion, costo, cantidad, venta, idPartida, idEstatusPartida) {
            var msgObj = {
                idCotizacion: idCotizacion,
                costo: costo,
                cantidad: cantidad,
                venta: venta,
                idPartida: idPartida,
                idEstatusPartida: idEstatusPartida
            }
            return $http({
                url: searchUrl + 'cotizacionDetalle',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getMostrarCotizaciones: function(numeroOrden, estatus, usuario) {
            return $http({
                url: cotizacion + 'cotizaciones',
                method: "GET",
                params: {
                    numeroOrden: numeroOrden,
                    estatus: estatus,
                    usuario: usuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
