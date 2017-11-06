var detalleUrl = global_settings.urlCORS + '/api/detalle/';
var ordenesUrl = global_settings.urlCORS + '/api/orden/';
var trabajoUrl = global_settings.urlCORS + 'api/trabajo/'

registrationModule.factory('detalleRepository', function($http) {
    return {
        validaCotizacionesRevisadas: function(idOrden) {
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
        getUsuarioHojaTrabajo: function(numOrden, idContratoOperacion){
            return $http(
              {
                  url: detalleUrl + 'getUsuarioHojaTrabajo',
                  method: "GET",
                  params: {
                      numOrden: numOrden,
                      idContratoOperacion: idContratoOperacion
                  },
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }
            );
        },
        getFacturas: function(numeroOrden, estatus, idUsuario, idOperacion) {
            return $http({
                url: detalleUrl + 'facturasPorOrden/',
                method: "GET",
                params: {
                    numeroOrden: numeroOrden,
                    estatus: estatus,
                    idUsuario: idUsuario,
                    idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        validaTokenAprobacion: function(idOrden, Token, idCotizacion) {
            // Token, idOrden, idCotizacion
            // localhost:5300/api/detalle/validaToken/?Token=CB817E35&idOrden=107
            return $http({
                url: detalleUrl + 'validaTokenAprobacion/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    Token: Token,
                    idCotizacion: idCotizacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        validaToken: function(idOrden, Token) {
            // localhost:5300/api/detalle/validaToken/?Token=CB817E35&idOrden=107
            return $http({
                url: detalleUrl + 'validaToken/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    Token: Token
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        CambiaStatusOrden: function(idOrden, idUsuario) {
            // localhost:5300/api/trabajo/cambiarStatusOrden?idOrden=11&idUsuario=2
            return $http({
                url: detalleUrl + 'cambiarStatusOrden/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenesDescontadas: function(idOrden){
            return $http({
                url: detalleUrl + 'ordenDescontada/',
                method: "GET",
                params: { idOrden: idOrden},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        rechazaTrabajo: function(idOrden, idUsuario, motivo) {
            return $http({
                url: detalleUrl + 'rechazaTrabajo/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    idUsuario: idUsuario,
                    motivo: motivo
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
        getTiempoTranscurrido: function(numOrden) {
            return $http({
                url: detalleUrl + 'tiempoTranscurrido/',
                method: "GET",
                params: {
                    numOrden: numOrden
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
        getIdCotizacionesPorOrden: function(numOrden, idUsuario, idOperacion) {
            return $http({
                url: detalleUrl + 'obtenerIdCotzPorOrden/',
                method: "GET",
                params: {
                    numOrden: numOrden,
                    idUsuario: idUsuario,
                    idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getReenvioHojaUtilidad: function(numOrden, idOperacion) {
            return $http({
                url: detalleUrl + 'reenvioHojaUtilidad/',
                method: "GET",
                params: {
                    numOrden: numOrden,
                    idOperacion: idOperacion
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
            var oData = new FormData(form);
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
        getReporteConformidad: function(idOrden, idContratoOperacion, idUsuario) {
            return $http({
                url: detalleUrl + 'reporteConformidad/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    idContratoOperacion: idContratoOperacion,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postSubirEvidencia: function() {
            var form = document.forms.namedItem("frm_evidencia");
            var oData = new FormData(form);
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
        }, //LQMA 07062017
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
        postAcciones: function(texto, fecha, idUsuario, idOrden, idEstatusOrden) {
            return $http({
                url: detalleUrl + 'accion/',
                method: "POST",
                params: {
                    texto: texto,
                    fecha: fecha,
                    idUsuario: idUsuario,
                    idOrden: idOrden,
                    idEstatusOrden: idEstatusOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postRecordatorio: function(texto, fecha, idUsuario, idContratoOperacion, idRecordatorio) {
            return $http({
                url: detalleUrl + 'recordatorio/',
                method: "POST",
                params: {
                    texto: texto,
                    fecha: fecha,
                    idUsuario: idUsuario,
                    idContratoOperacion: idContratoOperacion,
                    idRecordatorio: idRecordatorio
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postEstatusRecordatorio: function(idRecordatorio) {
            return $http({
                url: detalleUrl + 'estatusRecordatorio/',
                method: "POST",
                params: {
                    idRecordatorio: idRecordatorio
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        tokenEstatus: function(idOrden) {
            return $http({
                url: detalleUrl + 'tokenEstatus/',
                method: "GET",
                params: {
                    idOrden: idOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        restaPresupuestoOrden: function(idPresupuesto, idOrden, idUsuario, idOperacion) {
            return $http({
                url: detalleUrl + 'presupuestoOrden/',
                method: "POST",
                params: {
                    idPresupuesto: idPresupuesto,
                    idOrden: idOrden,
                    idUsuario: idUsuario,
                    idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postCancelaOrden: function(idUsuario, idOrden) {
            debugger;
            return $http({
                url: detalleUrl + 'cancelaOrden',
                method: "POST",
                params: {
                    idUsuario: idUsuario,
                    idOrden: idOrden
                },
                headers: { 'Content-Type': 'application/json' }
            });
        },
        postPreCancelaOrden: function(idUsuario, idOrden, comentario) {
            debugger;
            return $http({
                url: detalleUrl + 'preCancelaOrden',
                method: "POST",
                params: {
                    idUsuario: idUsuario,
                    idOrden: idOrden,
                    comentario: comentario
                },
                header: { 'Content-Type': 'application/json' }
            });
        },
        validaFactura: function(path) {
            return $http({
                url: detalleUrl + 'validaFactura/',
                method: "GET",
                params: {
                    path: path
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getRFCFactura: function(numeroCotizacion) {
            return $http({
                url: detalleUrl + 'getRFCFactura/',
                method: "GET",
                params: {
                    numeroCotizacion: numeroCotizacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        eliminaFactura: function(path) {
            return $http({
                url: detalleUrl + 'eliminaFactura/',
                method: "GET",
                params: {
                    path: path
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        insertarFactura: function(parametros) {
            return $http({
                url: detalleUrl + 'insertarFactura/',
                method: "GET",
                params: parametros,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getfacturaCotizacion: function(idOrden, idUsuario, idOperacion, isProduction) {
            return $http({
                url: detalleUrl + 'facturaCotizacion/',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    idUsuario: idUsuario,
                    idOperacion: idOperacion,
                    isProduction: isProduction
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        insertaBPRO: function(idOrden, idUsuario, idOperacion, isProduction) {
            return $http({
                url: detalleUrl + 'insertBPRO',
                method: "POST",
                params: {
                    idOrden: idOrden,
                    idUsuario: idUsuario,
                    idOperacion: idOperacion,
                    isProduction: isProduction
                },
                headers: { 'Content-Type': 'application/json' }
            });
        },
        postaproviosionamiento: function(idOrden, idUsuario, idOperacion, isProduction) {
            return $http({
                url: detalleUrl + 'aproviosionamiento',
                method: "POST",
                params: {
                    idOrden: idOrden,
                    idUsuario: idUsuario,
                    idOperacion: idOperacion,
                    isProduction: isProduction
                },
                headers: { 'Content-Type': 'application/json' }
            });
        },
        updateDetalleCotizacion: function(idCotizacionDetalle, costo, venta, idUsuario)
        {
            return $http({
                url: detalleUrl + 'updateDetalleCotizacion/',
                method:'POST',
                params:
                {
                    idCotizacionDetalle : idCotizacionDetalle,
                    costo: costo,
                    venta: venta,
                    idUsuario:idUsuario
                },
                headers:{'Content-Type':'application/json' }
            });
        },
        postCorreoSaldoPresupuesto : function(idOrden, idUsuario, idCotizacion, saldo, idPresupuesto)
        {
            return $http({
                url: detalleUrl + 'correoSaldoPresupuesto/',
                method:'POST',
                params:
                {
                    idOrden : idOrden,
                    idUsuario: idUsuario,
                    idCotizacion: idCotizacion,
                    saldo: saldo,
                    idPresupuesto : idPresupuesto
                },
                headers:{'Content-Type':'application/json' }
            });
        }
    };
});
