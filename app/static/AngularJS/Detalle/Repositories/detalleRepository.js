var detalleUrl = global_settings.urlCORS + '/api/detalle/';
var ordenesUrl = global_settings.urlCORS + '/api/orden/';
var trabajoUrl = global_settings.urlCORS + 'api/trabajo/'

registrationModule.factory('detalleRepository', function($http) {
    return {
        validaCotizacionesRevisadas: function( idOrden ) { 
            // localhost:5300/api/trabajo/validaTerminoTrabajo/?idOrden=107
            return $http({
                url: detalleUrl + 'validaTerminoTrabajo/',
                method: "GET",
                params: {
                    idOrden: idOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        validaToken: function( idOrden, Token ) { 
            // localhost:5300/api/detalle/validaToken/?Token=CB817E35&idOrden=107
            return $http({
                url: detalleUrl + 'validaToken/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    Token:Token
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        CambiaStatusOrden: function( idOrden, idUsuario ) { 
            // localhost:5300/api/trabajo/cambiarStatusOrden?idOrden=11&idUsuario=2
            return $http({
                url: detalleUrl + 'cambiarStatusOrden/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    idUsuario:idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        rechazaTrabajo: function( idOrden, idUsuario ) { 
            // localhost:5300/api/trabajo/cambiarStatusOrden?idOrden=11&idUsuario=2
            return $http({
                url: detalleUrl + 'rechazaTrabajo/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    idUsuario:idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getNumCita: function(idTar, idZona, idUsuario) {
            return $http({
                url: detalleUrl + 'sumatoriaCitas/',
                method: "GET",
                params: {
                    idTar: idTar,
                    idZona: idZona,
                    idUsuario: idUsuario

                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        insNota: function(nota, numOrden, idUsuario) {
            return $http({
                url: detalleUrl + 'insertaNota/',
                method: "GET",
                params: {
                    nota: nota,
                    numOrden: numOrden,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistoricoOrden: function(numOrden) {
            return $http({
                url: detalleUrl + 'obtenerHistoricoOrden/',
                method: "GET",
                params: {
                    numOrden: numOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getIdCotizacionesPorOrden: function(numOrden) {
            return $http({
                url: detalleUrl + 'obtenerIdCotzPorOrden/',
                method: "GET",
                params: {
                    numOrden: numOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistoricoCotizacion: function(idCotizacion) {
            return $http({
                url: detalleUrl + 'obtenerHistoricoCotizacion/',
                method: "GET",
                params: {
                    idCotizacion: idCotizacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getCotizacionesByOrden: function(numeroOrden, estatus) {
            return $http({
                url: ordenesUrl + 'cotizaciones/',
                method: "GET",
                params: {
                    numeroOrden: numeroOrden,
                    estatus: estatus
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postSubirFacturas: function(numOrden) {
            var form = document.forms.namedItem("frm_subir_factura");

            var oData = new FormData( form );
            return $http({
                url: detalleUrl + 'subirFactura/',
                method: "POST",
                // params: oData,
                data: oData,
                headers: {
                    'Content-Type': undefined
                }
            });
        },
        //LQMA  07062017
        getReporteConformidad: function(idOrden) {
            return $http({
                url: detalleUrl + 'reporteConformidad/',
                method: "GET",
                params: {
                    idOrden: idOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getExistsComprobanteRecepcion: function(numeroOrden, idCatalogoDocumento) {
            return $http({
                url: detalleUrl + 'existComprobanteRecepcion/',
                method: "GET",
                params: {
                    numeroOrden: numeroOrden,
                    idCatalogoDocumento: idCatalogoDocumento
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },//LQMA 07062017
        getGuardaReporteConformidad: function(myJson, idOrden) {
            return $http({
                url: detalleUrl + 'guardaReporteConformidad/',
                method: "GET",
                params: {
                    myJson: myJson,
                    idOrden: idOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});
