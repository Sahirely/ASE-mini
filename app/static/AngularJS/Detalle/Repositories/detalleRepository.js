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
        getFacturas: function( numeroOrden ) {
            return $http({
                url: detalleUrl + 'facturasPorOrden/',
                method: "GET",
                params: {
                    numeroOrden: numeroOrden,
                    estatus: 3
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
        insNota: function(nota, numOrden, idUsuario, idEstatusOrden) {
            return $http({
                url: detalleUrl + 'insertaNota/',
                method: "GET",
                params: {
                    nota: nota,
                    numOrden: numOrden,
                    idUsuario: idUsuario,
                    idEstatusOrden: idEstatusOrden
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
                // url: detalleUrl + 'subirFactura/',
                url: detalleUrl + 'subirFacturaTmp/',
                method: "POST",
                // params: oData,
                data: oData,
                headers: {
                    'Content-Type': undefined
                }
            });
        },
        getGuardarFactura: function(ruta, idOrden, idCotizacion) {
            return $http({
                url: detalleUrl + 'guardarDocumento/',
                method: "GET",
                params: {
                    ruta: ruta,
                    idOrden: idOrden,
                    idCotizacion: idCotizacion
                },
                headers: {
                    'Content-Type': 'application/json'
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
        postSubirEvidencia: function() {
            var form = document.forms.namedItem("frm_evidencia");
            var oData = new FormData( form );
            return $http({
                url: detalleUrl + 'subirEvidencia/',
                method: "POST",
                data: oData,
                headers: {
                    'Content-Type': undefined
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
        },
        postAcciones: function(texto, fecha, idUsuario, idOrden){
          return $http({
              url: detalleUrl + 'accion/',
              method: "POST",
              params: {
                  texto: texto,
                  fecha: fecha,
                  idUsuario: idUsuario,
                  idOrden: idOrden
                },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        },
        postRecordatorio: function(texto, fecha, idUsuario, idOrden){
          return $http({
              url: detalleUrl + 'recordatorio/',
              method: "POST",
              params: {
                  texto: texto,
                  fecha: fecha,
                  idUsuario: idUsuario,
                  idOrden: idOrden
                },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        }
    };
});
