var searchUrl = global_settings.urlCORS + '/api/cotizacion/';
var ruta = global_settings.uploadPath;
//var ruta = 'C:/Users/Mario/Documents/FileUpload';

registrationModule.factory('cotizacionRepository', function ($http) {
    return {
       
        insertCotizacionMaestro: function (idCita, idUsuario, observaciones, idUnidad, idTipoCotizacion, idTaller, idEstatus) {
            var msgObj = {
                idCita: idCita,
                idUsuario: idUsuario,
                observaciones: observaciones,
                idUnidad: idUnidad,
                idTipoCotizacion: idTipoCotizacion,
                idTaller: idTaller,
                idEstatus: idEstatus
            }
            return $http({
                url: searchUrl + 'cotizacionMaestro',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        insertCotizacionDetalle: function (idCotizacion, idTipoElemento, idElemento, precio, cantidad, idEstatus, idNivelAutorizacion, idUsuario) {
            var msgObj = {
                idCotizacion: idCotizacion,
                idTipoElemento: idTipoElemento,
                idElemento: idElemento,
                precio: precio,
                cantidad: cantidad,
                idNivelAutorizacion: idNivelAutorizacion,
                idEstatus: idEstatus,
                idUsuario:idUsuario
            }
            return $http({
                url: searchUrl + 'cotizacionDetalle',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});