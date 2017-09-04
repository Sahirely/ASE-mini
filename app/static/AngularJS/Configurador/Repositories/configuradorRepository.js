var onfiguradorUrl = global_settings.urlCORS + '/api/configurador/';

registrationModule.factory('configuradorRepository', function($http, $q) {
    var deferred = $q.defer();

    return {
        getOperaciones: function() {
            return $http({
                url: onfiguradorUrl + 'operaciones/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        deleteModulos: function(idModulo){
            return $http({
                url: onfiguradorUrl + 'eliminaModulo/',
                method: "POST",
                params: { idModulo: idModulo },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getTipoOperaciones: function() {
            return $http({
                url: onfiguradorUrl + 'tipoOperaciones/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getFormaDePago: function() {
            return $http({
                url: onfiguradorUrl + 'formaPago/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        postOperaciones: function(idCatalogoTipoOperacion, manejoUtilidad, porcentajeUtilidad, geolocalizacion, tiempoAsignado, estatusOperacion, formaPago, presupuesto, centros, idOperacion, idcentros, verificacion) {

           var msgObj = {
                idCatalogoTipoOperacion: idCatalogoTipoOperacion,
                manejoUtilidad: manejoUtilidad,
                porcentajeUtilidad: porcentajeUtilidad,
                geolocalizacion: geolocalizacion,
                tiempoAsignado: tiempoAsignado,
                estatusOperacion: estatusOperacion,
                formaPago: formaPago,
                presupuesto: presupuesto,
                centros: centros,
                idOperacion:idOperacion,
                idcentros:idcentros,
                verificacion: verificacion
            };
            return $http({
                url: onfiguradorUrl + 'nuevaOperacion/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getLicitaciones: function(idOperacion) {
            var msgObj = {
                idOperacion: idOperacion
            };
            return $http({
                url: onfiguradorUrl + 'licitaciones/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postContratoOperacion: function(idOperacion, idContrato) {

           var msgObj = {
                idOperacion: idOperacion,
                idContrato: idContrato
            };
            return $http({
                url: onfiguradorUrl + 'contratoOperacion/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postUnidad: function(numeroEconomico, vin,  gps, idTipoUnidad, sustituto, idOperacion, idCentroTrabajo, placas, idZona, modelo, combustible, verificada) {

           var msgObj = {
                numeroEconomico: numeroEconomico,
                vin: vin,
                gps: gps,
                idTipoUnidad: idTipoUnidad,
                sustituto: sustituto,
                idOperacion: idOperacion,
                idCentroTrabajo: idCentroTrabajo,
                placas: placas,
                idZona: idZona,
                modelo: modelo,
                combustible: combustible,
                verificada: verificada
            };
            return $http({
                url: onfiguradorUrl + 'nuevaUnidad/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getCentrosDeTrabajo: function(idOperacion) {

            var msgObj = {
                idOperacion: idOperacion
            };
            return $http({
                url: onfiguradorUrl + 'centrosDeTrabajo/',
                method: "GET",
                params: {
                         idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTipoUnidades: function(idOperacion) {
            return $http({
                url: onfiguradorUrl + 'tipoUnidades/',
                method: "GET",
                params: {
                         idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTipoUnidadesProveedores: function(idOperacion){
            return $http({
                url: onfiguradorUrl + 'tipoUnidadesProveedores/',
                method: "GET",
                params: {idOperacion: idOperacion},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getCatalogoModulos: function(idOperacion, tipo) {
            var msgObj = {
                idOperacion: idOperacion,
                tipo: tipo
            };

            return $http({
                url: onfiguradorUrl + 'catalogoModulos/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getDetalleModulo: function(idModulo, idOperacion) {
            return $http({
                url: onfiguradorUrl + 'detalleModulo/',
                method: "GET",
                params: {
                         idModulo: idModulo,
                         idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postModuloPorDertalle: function(idModulo, detalle, idOperacion) {

           var msgObj = {
                idModulo: idModulo,
                detalle: detalle,
                idOperacion: idOperacion
            };
            return $http({
                url: onfiguradorUrl + 'moduloPorDertalle/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postModuloAdicional: function(idOperacion, modulos) {

           var msgObj = {
                idOperacion: idOperacion,
                modulos: modulos
            };
            return $http({
                url: onfiguradorUrl + 'moduloAdicional/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDatosOperacion: function(idOperacion) {
            var msgObj = {
                idOperacion: idOperacion
            };

            return $http({
                url: onfiguradorUrl + 'datosOperacion/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
         getZonas: function(idContratoOperacion) {
            var msgObj = {
                idContratoOperacion: idContratoOperacion
            };

            return $http({
                url: onfiguradorUrl + 'zonas/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        postnumeroUnidades: function(idOperacion, idTipoUnidad, cantidad) {

           var msgObj = {
                idOperacion: idOperacion,
                idTipoUnidad: idTipoUnidad,
                cantidad: cantidad
            };
            return $http({
                url: onfiguradorUrl + 'numeroUnidades/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getunidadOperacion: function(idOperacion) {
            var msgObj = {
                idOperacion: idOperacion
            };

            return $http({
                url: onfiguradorUrl + 'unidadOperacion/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        postCargararMaxUnidades: function(idOperacion, archivo) {

           var msgObj = {
                idOperacion: idOperacion,
                archivo: archivo
            };
            return $http({
                url: onfiguradorUrl + 'cargararMaxUnidades/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postFechas: function(idOperacion, idEstatusOrden, tiempoEnEspera) {
          debugger;
           var msgObj = {
                idOperacion: idOperacion,
                idEstatusOrden: idEstatusOrden,
                tiempoEnEspera: tiempoEnEspera
            };
            return $http({
                url: onfiguradorUrl + 'moduloporFechas/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTiempoEspera: function(idOperacion) {
            var msgObj = {
                idOperacion: idOperacion
            };

            return $http({
                url: onfiguradorUrl + 'datosOperacionTiempoEspera/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        postuploadExcel: function() {
            return $http({
                url: onfiguradorUrl + 'subirArchivo/',
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDzOptions: function (acceptedFiles, maxFiles) {
            var dzOptions = {
                url: '/api/configurador/uploadfiles',
                autoProcessQueue: false,
                uploadMultiple: true,
                addRemoveLinks: true,
                parallelUploads: 20,
                acceptedFiles: acceptedFiles,/*"image/*,application/pdf,.mp4,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/docx,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/xml,.docX,.DOCX,.ppt,.PPT",*/
                createImageThumbnails: true,
                maxFiles: maxFiles,
                dictDefaultMessage : ''
            };

            return dzOptions;
        },
        getTiposAprobacion: function() {

            return $http({
                url: onfiguradorUrl + 'tiposAprobacion/',
                method: "GET",
                params: {},
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getPartidasUnidad: function(idContratoOperacion, idTipoUnidad) {
            var msgObj = {
                idContratoOperacion: idContratoOperacion,
                idTipoUnidad: idTipoUnidad
            };

            return $http({
                url: onfiguradorUrl + 'partidasUnidad/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        quitaDetalleModulo: function(idDetalleModulo) {

           var msgObj = {
                idDetalleModulo: idDetalleModulo
            };
            return $http({
                url: onfiguradorUrl + 'eliminaDetalleModulo/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postNivelMonto: function(idOperacionContrato, montoDe, montoA, montoMax, nivel) {

           var msgObj = {
                idOperacionContrato: idOperacionContrato,
                montoDe: montoDe,
                montoA: montoA,
                montoMax:montoMax,
                nivel: nivel
            };
            return $http({
                url: onfiguradorUrl + 'nivelMonto/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        postEliminaNivelMonto: function(idOperacionContrato){
            return $http({
                url: onfiguradorUrl + 'EliminaNivelMonto/',
                method: "POST",
                data: {
                  idOperacionContrato: idOperacionContrato
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        postNivelPartda: function(idOperacionContrato, idPartida, nivel) {

           var msgObj = {
                idOperacionContrato: idOperacionContrato,
                idPartida: idPartida,
                nivel: nivel
            };
            return $http({
                url: onfiguradorUrl + 'nivelPartida/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postModificacionNivelMonto: function(idOperacionContrato, montoDe, montoA, nivel) {

           var msgObj = {
                idOperacionContrato: idOperacionContrato,
                montoDe: montoDe,
                montoA: montoA,
                nivel: nivel
            };
            return $http({
                url: onfiguradorUrl + 'modificacionNivelMonto/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        postModificacionNivelPartida: function(idOperacionContrato, idPartida, nivel) {

           var msgObj = {
                idOperacionContrato: idOperacionContrato,
                idPartida: idPartida,
                nivel: nivel
            };
            return $http({
                url: onfiguradorUrl + 'modificacionNivelPartida/',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getInfoNivelMonto: function(idOperacionContrato) {
            var msgObj = {
                idOperacionContrato: idOperacionContrato
            };

            return $http({
                url: onfiguradorUrl + 'infoNivelMonto/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getInfoNivelPartida: function(idContratoOperacion, idTipoUnidad) {
            var msgObj = {
                idContratoOperacion: idContratoOperacion //,
                //idTipoUnidad,idTipoUnidad
            };

            return $http({
                url: onfiguradorUrl + 'infoNivelPartida/',
                method: "GET",
                params: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getDatosFacturacion: function(idOperacion){
            return $http({
                url: onfiguradorUrl + 'getDatosFacturacion/',
                method: "GET",
                params: { idOperacion: idOperacion },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        insDatosFacturacion: function(idOperacion, rfc, razonSocial){
          return $http({
              url: onfiguradorUrl + 'insContratoFacturacion/',
              method: "GET",
              params: { idOperacion: idOperacion,
                        rfc: rfc,
                        razonSocial: razonSocial },
              headers: {
                  'Content-Type': 'application/json'
              }
          })
        }

    }
});
