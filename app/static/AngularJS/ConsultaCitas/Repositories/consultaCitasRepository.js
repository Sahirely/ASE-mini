var consultaCitaUrl = global_settings.urlCORS + '/api/OrdenServicio/';
//var cotizacionUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('consultaCitasRepository', function($http, $q) {
    var deferred = $q.defer();

    return {
        getTotalOrdenes: function() {
            return $http({
                url: consultaCitaUrl + 'getTotalOrdenes/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getExisteOrden: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenExistente/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getNumerosOrdenes: function(idContratoOperacion) {
            return $http({
                url: consultaCitaUrl + 'numerosOrdenes/',
                method: "GET",
                params: {
                    idContratoOperacion: idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenAcciones: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenAcciones/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenCliente: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenCliente/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenDocumentos: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenDocumentos/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenEvidencias: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenEvidencias/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenDetalle: function(idUsuario, numeroOrden) {
            return $http({
                url: consultaCitaUrl + 'getOrdenDetalle/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    numeroOrden: numeroOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getCotizacionDetalle: function(idCotizacion, usuario) {
            return $http({
                url: consultaCitaUrl + 'getCitizacionDetalle/',
                method: "GET",
                params: {
                    idCotizacion: idCotizacion,
                    usuario: usuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTalleres: function(idUsuario, idContratoOperacion, idZona) {
            return $http({
                url: consultaCitaUrl + 'getTalleres/',
                method: "GET",
                params: { //LQMA add 11072017
                    idUsuario: idUsuario,
                    idContratoOperacion: idContratoOperacion,
                    idZona : idZona
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getPartidasTaller: function(idTaller, especialidad, idContratoOperacion, idTipoUnidad) {
            return $http({
                url: consultaCitaUrl + 'getPartidasTaller/',
                method: "GET",
                params: {
                    idTaller: idTaller,
                    especialidad: especialidad,
                    idContratoOperacion: idContratoOperacion,
                    idTipoUnidad: idTipoUnidad
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getdatosComprobante: function(idTipoUnidad) {
            return $http({
                url: consultaCitaUrl + 'getdatosComprobante',
                method: "GET",
                params: {
                    idTipoUnidad: idTipoUnidad
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        agregarModuloComprobante: function(idCatalogoModuloCOmprobante, numeroOrden, idUsuario) {
            var msgObj = {
                idCatalogoModuloCOmprobante: idCatalogoModuloCOmprobante,
                numeroOrden: numeroOrden,
                idUsuario: idUsuario
            }
            return $http({
                url: consultaCitaUrl + 'agregarModuloComprobante',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        agregarDetalleModuloComprobante: function(accion, idCatalogoDetalleModuloComprobante, idModuloComprobante, descripcion) {
            var msgObj = {
                accion: accion,
                idCatalogoDetalleModuloComprobante: idCatalogoDetalleModuloComprobante,
                idModuloComprobante: idModuloComprobante,
                descripcion: descripcion
            }
            return $http({
                url: consultaCitaUrl + 'agregarDetalleModuloComprobante',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        agregarEvidencias: function(nombreEvidencia, descripcionEvidencia, rutaEvidencia, idOrden) {
            var msgObj = {
                nombreEvidencia: nombreEvidencia,
                descripcionEvidencia: descripcionEvidencia,
                rutaEvidencia: rutaEvidencia,
                idOrden: idOrden
            }
            return $http({
                url: consultaCitaUrl + 'agregarEvidencias',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        agregarAcciones: function(nombreAccion, fechaAccion, idUsuario, numeroOrden , recordatorio) {
            var msgObj = {
                nombreAccion: nombreAccion,
                fechaAccion: fechaAccion ,
                idUsuario:  idUsuario,
                numeroOrden: numeroOrden,
                recordatorio: recordatorio
            }
            return $http({
                url: consultaCitaUrl + 'agregarAcciones',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDatosRecepcion: function(idOrden) {
            return $http({
                url: consultaCitaUrl + 'getRecepcionInfo/',
                method: "GET",
                params: {
                    idOrden: idOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        callExternalPdf: function (jsonData, idOrden) {
            return $http({
                url: consultaCitaUrl + 'newpdf/',
                method: "POST",
                data: {
                    values: jsonData,
                    idOrden: idOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        estatusOrdenRecepcion: function (idUsuario, idOrden) {
            return $http({
                url: consultaCitaUrl + 'estatusRecepcion/',
                method: "POST",
                data: {
                    idUsuario: idUsuario,
                    idOrden: idOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getPartidasUnidad: function(idTipoUnidad, idContratoOperacion) {
            return $http({
                url: consultaCitaUrl + 'getPartidasUnidad/',
                method: "GET",
                params: {
                    idTipoUnidad: idTipoUnidad,
                    idContratoOperacion: idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
