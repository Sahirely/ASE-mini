registrationModule.controller('detalleController', function($scope, $location, $modal, $timeout, userFactory, cotizacionRepository, cotizacionConsultaRepository, consultaCitasRepository, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, detalleRepository, aprobacionRepository, commonFunctionRepository, utilidadesRepository, filterFilter) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    //$rootScope.modulo = 'reporteHistorial';
    //Inicializa la pagina

    $scope.IdsCotizacionesPorOrden = [];
    $scope.btn_editarCotizacion = false;
    $scope.idUsuario = 0;
    $scope.numeroOrden = $routeParams.orden;
    $scope.idEstatusOrden = 0;
    $scope.estatus = 0;
    $scope.textoNota = null;
    $scope.notaTrabajo = [];
    $scope.HistoricoOrden = [];
    $scope.x = 0;
    $scope.numCotz = 0;
    $scope.TieneSaldo = true;
    $scope.totalSumaCosto = 0;
    $scope.totalSumaVenta = 0;
    $scope.btnSwitch = {};
    $scope.userData = {};
    $scope.centroTrabajo = '';


    $scope.facturas_empty = true;
    $scope.facturas_empty = true;
    $scope.Facturas = [];
    $scope.totalfacturas = 0;
    $scope.errores_factura = false;
    $scope.idOrden = 0;
    $scope.show_tokenMargen = false;
    $scope.procesarCompra = '';
    $scope.estadoCompra = false;
    $scope.sinTiempoDisponible = 1;
    $scope.tiempoTranscurridoDisplay = '00:00 / 00:00';

    //Agrega para comentarios
    $scope.comentarios = [];

    $scope.init = function() {
        userFactory.ValidaSesion();
        $('#loadModal').modal('show');
        $scope.userData = userFactory.getUserData();
        $scope.rolLogged = $scope.userData.idRol;
        $scope.aprovisonamiento = localStorageService.get('provision');
        $scope.idUsuario = $scope.userData.idUsuario;
        $scope.btnSwitch.classCosto = 'btn btn-success';
        $scope.btnSwitch.classVenta = 'btn btn-default';
        $scope.showButtonSwitch($scope.userData.idRol);
        $scope.checkComprobanteRecepcion();
        $scope.checkHojaTrabajo();
        $scope.HistoricoCotizaciones = [];
        $scope.getHistoricos();

        $scope.enviaNota();
        $scope.getOrdenCliente($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.getOrdenDocumentos($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.getOrdenEvidencias($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.getOrdenDetalle($scope.userData.idUsuario, $scope.numeroOrden);

        if ($scope.userData.presupuesto == 1) {
            $scope.getSaldos($routeParams.orden);
        }
        $('.horaAsignada').clockpicker();
        $scope.ShowFacturas();
        if ($scope.userData.tiempoAsignado == 1) {
            //inicia reloj
            $scope.iniTime();
        } else {
            $scope.sinTiempoDisponible = 0;
            $scope.tiempoTranscurridoDisplay = '00:00 / 00:00';
        }
    };

    //funcion reloj recursiva cada minuto
    $scope.iniTime = function() {
        detalleRepository.getTiempoTranscurrido($scope.numeroOrden).then(function(result) {
            if (result.data.length > 0) {
                $scope.sinTiempoDisponible = result.data[0].sinTiempoDisponible;
                $scope.tiempoTranscurridoDisplay = result.data[0].tiempoTranscurridoDisplay;

                $timeout(function() {
                    $scope.iniTime();
                }, 60000);
            }
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('No se pudo obtener el tiempo transcurrido.');
            $scope.sinTiempoDisponible = 0;
            $scope.tiempoTranscurridoDisplay = '00:00 / 00:00';
        });
    };



    $scope.getHistoricos = function() {
        detalleRepository.getHistoricoOrden($scope.numeroOrden).then(function(result) {
            if (result.data.length > 0) {
                $scope.HistoricoOrden = result.data;

            }
        }, function(error) {
            alertFactory.error('No se puede obtener el historico de la orden.');
        });

        detalleRepository.getIdCotizacionesPorOrden($scope.numeroOrden).then(function(result) {
            $scope.numCotz = result.data.length;
            if (result.data.length > 0) {
                $scope.IdsCotizacionesPorOrden = result.data;

            }
            $scope.getHistoricosCotz();
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('No se puede obtener las cotizaciones de la orden.');
        });
    }

    $scope.getHistoricosCotz = function() {
        for ($scope.x = 0; $scope.x < $scope.numCotz; $scope.x++) {
            detalleRepository.getHistoricoCotizacion($scope.IdsCotizacionesPorOrden[$scope.x].idCotizacion).then(function(result) {
                if (result.data.length > 0) {
                    var valueToPush = {};
                    valueToPush.consecutivo = result.data[0].consecutivo;
                    valueToPush.data = result.data;

                    $scope.HistoricoCotizaciones.push(valueToPush);
                }
            }, function(error) {
                alertFactory.error('No se pudo recuperar el historico de la cotización.');
            });
        }
    }

    $scope.getOrdenDetalle = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenDetalle(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.idOrden = result.data[0].idOrden;
                $scope.nombreCentroTrabajo = result.data[0].nombreCentroTrabajo;
                $scope.detalleOrden = result.data[0];
                $scope.estatus = $routeParams.estatus;
                $scope.estatusUtilidad();
                //LQMA add 11072017
                $scope.idZona_Orden = result.data[0].idZona;

                if ($scope.estatus == undefined)
                    $scope.estatus = $scope.detalleOrden.idEstatusOrden;

                $scope.idEstatusOrden = $scope.detalleOrden.idEstatusOrden;
                $scope.idOrdenURL = $scope.detalleOrden.idOrden;
                var statusCotizacion = 0;
                if ($scope.estatus == 1 || $scope.estatus == 2 || $scope.estatus == 3) {
                    statusCotizacion = '1';
                } else if ($scope.estatus == 4) {
                    statusCotizacion = '1,2';
                } else if ($scope.estatus == 5 || $scope.estatus == 6 || $scope.estatus == 7) {
                    statusCotizacion = '3';
                }

                $scope.setActiveButtons($scope.estatus);
                $scope.validaFacturaCotizacionBoton();

                $scope.getMostrarCotizaciones($scope.numeroOrden, statusCotizacion, $scope.idUsuario)
            }
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('No se puede obtener los detalles de la orden');
        });
    }

    $scope.getOrdenCliente = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenCliente(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleCliente = result.data[0];
            }
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('No se puede obtener los detalles del cliente');
        });
    }

    $scope.getOrdenDocumentos = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenDocumentos(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleDocumentos = result.data[0];
            }
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('No se puede obtener los documentos de la orden');
        });
    }

    $scope.getOrdenEvidencias = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenEvidencias(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                var resEvidnecias = result.data;
                resEvidnecias.forEach(function(item, key) {
                    resEvidnecias[key].tipo = item.rutaEvidencia.split('.').pop().toString();
                    resEvidnecias[key].ruta = $rootScope.docServer + '/orden/' + item.rutaEvidencia;
                });

                $scope.detalleEvidencias = resEvidnecias;
            }
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('No se puede obtener los documentos de la orden');
        });
    }

    $scope.getMostrarCotizaciones = function(numeroOrden, estatus, idUsuario) {
        cotizacionRepository.getMostrarCotizaciones(numeroOrden, estatus, idUsuario).then(function(result) {
            console.log("--------------------------------------");
            console.log(result);
            console.log("--------------------------------------");
            if (result.data.success == true) {
                $scope.cotizaciones = result.data.data;
                $scope.getTotales();
                $scope.centroTrabajo = $scope.cotizaciones[0].centroTrabajo;
                $('#loadModal').modal('hide');
            } else {
              $('#loadModal').modal('hide');
                // alertFactory.error('No se puede obtener los documentos de la orden');
            }
        }, function(error) {
          $('#loadModal').modal('hide');
            alertFactory.error('Ocurrio un error');
        });
    }

    $scope.getTotales = function() {
        $scope.totalSumaCosto = 0;
        $scope.totalSumaVenta = 0;
        if ($scope.cotizaciones != null || $scope.cotizaciones != undefined) {
            $scope.cotizaciones.forEach(function(item) {
                if (item.idEstatusCotizacion == 4) {} else {
                    if (item.detalle != null || item.detalle != undefined){
                        item.detalle.forEach(function(itemDetail) {
                            if (itemDetail.idEstatusPartida == 3 || itemDetail.idEstatusPartida == 4) {} else {
                                $scope.totalSumaCosto = $scope.totalSumaCosto + itemDetail.costoTotal;
                                $scope.totalSumaVenta = $scope.totalSumaVenta + itemDetail.ventaTotal;
                            }

                        });
                    }
                }

            });
        }
    }

    $scope.nuevaCotizacion = function() {
        $scope.class_buttonNuevaCotizacion = 'fa fa-spinner fa-spin';
        //location.href = '/cotizacionnueva?orden=' + $routeParams.orden;
        //LQMA 11072017
        location.href = '/cotizacionnueva?orden=' + $routeParams.orden + '&idZona=' + $scope.idZona_Orden;
    }

    $scope.enviaNota = function() {
        $scope.notaTrabajo = [];
        var Nota = $scope.textoNota == '' ? null : $scope.textoNota;
        detalleRepository.insNota(Nota, $scope.numeroOrden, $scope.userData.idUsuario, $scope.idEstatusOrden).then(function(result) {
            if (result.data.length > 0) {
                $scope.notaTrabajo = result.data;
            }

        }, function(error) {
            alertFactory.error('No se pudieron obtener las notas');
            $('#loadModal').modal('hide');
        });
        $scope.textoNota = null;
    };

    $scope.comprobante = function() {
        $scope.class_buttonComprobanteRecepcion = 'fa fa-spinner fa-spin';
        location.href = '/comprobanteRecepcion?orden=' + $routeParams.orden;
    };

    $scope.partidasportokentotal = 0;
    $scope.initApproveButtons = function(item, idCotizacion) {
        if (item.Aprueba == 1 && item.idEstatusPartida == 1) {
            item.btnDisabled = false;
            if ($scope.portoken) {
                $scope.partidasportokentotal++;
                item.selOption = 1; // 2
                if ($scope.idCotizacionActive == idCotizacion) {
                    item.selOption = 2; // 2
                } else {
                    item.selOption = 1; // 2
                    item.btnDisabled = true;
                }
            } else {
                item.selOption = item.idEstatusPartida;
            }
        } else {
            item.btnDisabled = true;
            item.selOption = item.idEstatusPartida;
        }
    };

    $scope.err_aprobacion_show = false;
    $scope.idUsuarioToken = 0;
    $scope.VerificaTokenAprobacion = function() {
        $(".aprobar_partidas").attr("disabled", "disabled");
        $(".aprobar_partidas i").show();
        $scope.pidiendoToken = true;
        if ($scope.token_aprobacion == '' || $scope.token_aprobacion === undefined) {
            $(".err_aprobacion").fadeIn();
            $scope.err_apronacion = 'Es necesario el token para hacer esta operación';
            $(".aprobar_partidas i").hide();
            setTimeout(function() {
                $(".aprobar_partidas").removeAttr("disabled");
                $(".err_aprobacion").fadeOut();
            }, 3000);
        } else {
            detalleRepository.validaTokenAprobacion($scope.detalleOrden.idOrden, $scope.token_aprobacion, $scope.idCotizacionActive).then(function(result) {
                if (result.data[0].Success == 1) {
                    $("#ModalShowToken").modal('hide');
                    $scope.aprobacionPorToken($scope.numeroOrden, $scope.idEstatusCotizacionActive, result.data[0].idUsuario);
                    setTimeout(function() {

                        if ($scope.partidasportokentotal == 0) {
                            alertFactory.warning('El token proporcionado no cuenta con el nivel de autorización necesario para esta operación.');
                        } else {
                            var coti = filterFilter($scope.cotizaciones, { idCotizacion: $scope.idCotizacionActive });
                            $scope.idUsuarioToken = result.data[0].idUsuario;
                            // $scope.btnSaveCotizacion(result.data[0].idUsuario, coti[0]);
                        }
                    }, 500);
                } else {
                    $(".err_aprobacion").fadeIn();
                    $scope.err_apronacion = result.data[0].Msg;
                    $scope.token_aprobacion = '';
                    setTimeout(function() {
                        $(".err_aprobacion").fadeOut();
                    }, 3000);
                }

                $(".aprobar_partidas i").hide();
                $(".aprobar_partidas").removeAttr("disabled");
            }, function(error) {
                // alertFactory.error('');
            });
        }

        $scope.token_aprobacion = '';
    }

    $scope.portoken = false;
    $scope.aprobacionPorToken = function(numeroOrden, estatus, usuario) {
        $scope.portoken = true;
        $scope.getMostrarCotizaciones(numeroOrden, estatus, usuario);
    }

    $scope.idCotizacionActive = 0
    $scope.modal_aprobacion = function(id, estatus) {
        $("#ModalShowToken").modal();
        $scope.idCotizacionActive = id;
        $scope.idEstatusCotizacionActive = estatus;
    }

    $scope.setActiveButtons = function(idstatus) {

        switch (Number(idstatus)) {
            case 1:
                $scope.hideAllButtons();
                $scope.showButtonsInProcess();
                break;
            case 2:
                $scope.hideAllButtons();
                $scope.showButtonsInProcess();
                break;
            case 3:
                $scope.hideAllButtons();
                $scope.showButtonsInProcess();
                $scope.btnMoradoIsEnable = false;
                break;
            case 4: //Botones habilitados para modulo aprobación
                $scope.hideAllButtons();
                //$scope.btnEditarIsEnable = false;
                $scope.btnGuardaCotizacionIsEnable = false;
                break;
            default:
                $scope.hideAllButtons();
        }

    };

    $scope.btnSaveCotizacion = function(idUsuario, cotizacion) {
        $('#loadModal').modal('show');
        if ($scope.idUsuarioToken != 0) {
            idUsuario = $scope.idUsuarioToken;
            $scope.idUsuarioToken = 0;
        }

        $scope.class_buttonGuardaCotizacion = 'fa fa-spinner fa-spin';
        if ($scope.userData.presupuesto == 1) {
            var haveBalance = $scope.checkBalance(cotizacion);
            if (haveBalance == true) {
                $scope.UpdatePartidaStatus(idUsuario, cotizacion);
                $scope.updateComentariosPartidas();
            } else {
                $('#loadModal').modal('hide');
                $('.modal-dialog').css('width', '1050px');
                modal_saldos($scope, $modal, $scope.saldos, $scope.nombreCentroTrabajo, '', '');
                $scope.class_buttonGuardaCotizacion = '';
            }
        } else {
            $scope.UpdatePartidaStatus(idUsuario, cotizacion);
            $scope.updateComentariosPartidas();
        }
    };

    $scope.checkBalance = function(cotizacion) {
        var sumOperacion = 0;
        cotizacion.detalle.forEach(function(item) {
            if (item.btnStep != 0 && item.btnDisabled == false) {
                sumOperacion += item.ventaTotal;
            }
        });
        if ($scope.saldos != undefined) {
            if (sumOperacion <= ($scope.saldos.presupuesto - $scope.saldos.utilizado)) {
                $scope.TieneSaldo = true;
                return true;
            } else {
                $scope.TieneSaldo = false;
                return false;
            }
        } else {
            $scope.TieneSaldo = false;
            return false;
        }
    };

    $scope.UpdatePartidaStatus = function(idUsuario, cotizacion) {

        cotizacion.detalle.forEach(function(item) {
            if (item.btnDisabled == false && item.selOption > 1) {
                var params = {
                    idUsuario: '',
                    idCotizacion: '',
                    idPartida: '',
                    idEstatusPartida: 0
                };
                params.idUsuario = idUsuario;
                params.idCotizacion = cotizacion.idCotizacion;
                params.idPartida = item.idPartida;
                params.idEstatusPartida = item.selOption;

                aprobacionRepository.getUpdateStatusPartida(params).then(function(result) {
                    if (result.data.length > 0) {}
                }, function(error) {
                    alertFactory.error('Aprobación getUpdateStatusPartida error.');
                });
            }
        });

        setTimeout(function() {
            $scope.UpdateCotizacionStatus(cotizacion.idCotizacion, idUsuario);
        }, 1000);
    };

    $scope.UpdateCotizacionStatus = function(idCotizacion, idUsuario) {
        aprobacionRepository.getUpdateStatusCotizacion(idCotizacion, idUsuario).then(function(result) {
            if (result.data.length > 0) {
                var valor = result.data[0].idEstatusCotizacion;
                console.log(valor);

                switch (Number(valor)) {
                    case 2: //cliente
                        $scope.class_buttonGuardaCotizacion = '';
                        //$scope.init();
                        $('#loadModal').modal('hide');

                        alertFactory.success('Faltan partidas por aprobar.');
                        setTimeout(function() {
                            location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4';
                        }, 500);
                        break;
                    case 3:
                        commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function(resp) {
                            if (resp.data.length > 0) {
                                var correoDe = resp.data[0].correoDe;
                                var correoPara = resp.data[0].correoPara;
                                var asunto = resp.data[0].asunto;
                                var texto = resp.data[0].texto;
                                var bodyhtml = resp.data[0].bodyhtml;
                                commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function(result) {
                                    $('#loadModal').modal('hide');
                                    location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=5';

                                }, function(error) {
                                    $scope.class_buttonGuardaCotizacion = '';
                                    alertFactory.error('No se puede enviar el correo');
                                    setTimeout(function() {
                                        $('#loadModal').modal('hide');
                                        location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=5';
                                    }, 1500);
                                });
                            }
                            $scope.class_buttonGuardaCotizacion = '';
                        }, function(error) {
                            $scope.class_buttonGuardaCotizacion = '';
                            $('#loadModal').modal('hide');
                            alertFactory.error("Error al obtener información para el mail");

                        });
                        break;
                    case 4:
                        $('#loadModal').modal('hide');
                        location.href = '/cotizacionconsulta';
                        break;
                    default:
                        $scope.class_buttonGuardaCotizacion = '';
                        $('#loadModal').modal('hide');
                        alertFactory.info('Debe seleccionar partidas para aprobar.');
                }

            } else {
                $scope.buttonGuardaCotizacion = '';
                $('#loadModal').modal('hide');
                alertFactory.success('Finalizó sin respuesta.');
            }
        }, function(error) {
            $scope.buttonGuardaCotizacion = '';
            $('#loadModal').modal('hide');
            alertFactory.error('Aprobación getUpdateStatusCotizacion error.');
        });
    };

    $scope.setRowColor = function(obj) {

        switch (Number(obj.nivel)) {
            case 1:
                obj.rowColor = 'info';
                break;
            case 2:
                obj.rowColor = 'success';
                break;
            case 3:
                obj.rowColor = 'warning';
                break;
            case 4:
                obj.rowColor = 'danger';
                break;
            case 5:
                obj.rowColor = 'active';
                break;
            default:
                obj.rowColor = 'info';
        }
    };

    $scope.showButtonSwitch = function(usrRol) {
        switch (Number(usrRol)) {
            case 1: //cliente
                $scope.hideSwitchBtn = true;
                $scope.btnSwitch.showCostoVenta = false;
                $scope.btn_editarCotizacion = false;
                break;
            case 2: //admin
                $scope.hideSwitchBtn = false;
                $scope.btnSwitch.showCostoVenta = true;
                $scope.btn_editarCotizacion = true;
                break;
            case 3: //callcenter
                $scope.hideSwitchBtn = false;
                $scope.btnSwitch.showCostoVenta = true;
                $scope.btn_editarCotizacion = true;
                break;
            case 4: //proveedor
                $scope.hideSwitchBtn = true;
                $scope.btnSwitch.showCostoVenta = true;
                break;
            default:
                $scope.hideSwitchBtn = true;
        }
    };

    $scope.hideAllButtons = function() {
        $scope.btnEditarIsEnable = true;
        $scope.btnGuardaCotizacionIsEnable = true;
        $scope.btnNuevaCotizacionIsEnable = true;
        $scope.btnEditarCotizacionIsEnable = true;
        $scope.btnComprobanteRecepcionIsEnable = true;
        $scope.btnEditarCitaIsEnable = true;
        $scope.btnCancelarCitaIsEnable = true;
        $scope.btnNegroIsEnable = true;
        $scope.btnMoradoIsEnable = true;
    };

    $scope.showButtonsInProcess = function() {
        $scope.btnEditarCotizacionIsEnable = false;
        $scope.btnNuevaCotizacionIsEnable = false;
        $scope.btnComprobanteRecepcionIsEnable = false;
        $scope.btnEditarCitaIsEnable = false;
    };

    $scope.getSaldos = function(numeroOrden) {
        aprobacionRepository.getPresupuesto(numeroOrden).then(function(result) {
            if (result.data.length > 0) {
                $scope.saldos = result.data[0];
            }
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('sinsaldos');
        });
    };

    $scope.editarCotizacion = function(data) {
        $scope.class_buttonEditarCotizacion = 'fa fa-spinner fa-spin';
        var orden = $scope.numeroOrden;
        var idCotizacion = String(data.idCotizacion);
        location.href = '/cotizacionnueva?orden=' + orden + '&idCotizacion=' + idCotizacion + '&estatus=' + $scope.estatus;
    }

    //LQMA 07062017
    $scope.getReporteConformidad = function(idOrden) {
        detalleRepository.getReporteConformidad(idOrden).then(function(result) {
            if (result.data.length > 0) {
                var rptReporteConformidadData = []
                rptReporteConformidadData.encabezado = result.data[0][0];
                rptReporteConformidadData.partidas = result.data[1];
                rptReporteConformidadData.total = result.data[2][0];
                rptReporteConformidadData.firma = result.data[3];
                rptReporteConformidadData.zona = result.data[4];
                new Promise(function(resolve, reject) {
                    var rptReporteConformidad = {
                        "encabezado": [
                            rptReporteConformidadData.encabezado
                        ],
                        "partidas": rptReporteConformidadData.partidas,
                        "total": rptReporteConformidadData.total.total,
                        "firma": rptReporteConformidadData.firma,
                        "zona": rptReporteConformidadData.zona
                    }
                    var jsonData = {
                        "template": {
                            "name": "reporteConformidad_rpt"
                        },
                        "data": rptReporteConformidad //
                    }
                    resolve(jsonData);
                }).then(function(jsonData) {
                    detalleRepository.getGuardaReporteConformidad(jsonData, idOrden).then(function(result) {

                    });
                });
            }
        }, function(error) {
            alertFactory.error('Error al obtener Reporte Conformidad');
        });
    }

    //********** [ Aqui Comienza Ordenes en Proceso ] *****************************************************************************//
    $scope.pnl_token_admin = false;

    $scope.ShowAutorizacionAdmin = function() {
        $scope.pnl_token_admin = true;
        $("html, body").animate({
            scrollTop: $(document).height()
        }, 1000);
        setTimeout(function() {
            $(".token_admin").focus();
        }, 1001);
    }

    $scope.HideAutorizacionAdmin = function() {
        $scope.pnl_token_admin = false;
    }

    $scope.OpenModalFactura = function(no, cf, ct, nc) {
        $scope.idOrden = no;
        $scope.cotizacionFactura = cf;
        $scope.numeroCotizacion = nc;
        $scope.cotizacionTotal = ct;
        $scope.alert_respuesta = false;

        console.log("numeroCotizacion", $scope.numeroCotizacion);

        $(".alert-warning").hide();
        $("#myModal").modal();
        $(".archivos").show();
        $(".uploading").hide();
        $(".btn-cerrar").removeAttr("disabled");
        $(".btn-subir").removeAttr("disabled");

        document.getElementById("frm_subir_factura").reset();

        var inputs = document.querySelectorAll('.inputfile');
        Array.prototype.forEach.call(inputs, function(input) {
            var label = input.nextElementSibling;
            label.querySelector('span').innerHTML = 'Seleccionar archivo';
        });
    }

    $scope.HideModalFactura = function() {
        $("#myModal").modal('hide');
    }

    $scope.Cargar_Factura = function() {
        var fxml = $(".inputfile-1").val();
        var fpdf = $(".inputfile-2").val();

        if (fxml == '' && fpdf == '') {
            $(".alert-danger").fadeIn();
            $(".alert-danger span").text('Proporciona al menos uno de los archivos que se piden');
            setTimeout(function() {
                $(".alert-danger").fadeOut('fast');
            }, 3000);
        } else {
            $(".archivos").hide();
            $(".uploading").show();
            $(".btn-cerrar").attr("disabled", "disabled");
            $(".btn-subir").attr("disabled", "disabled");


            detalleRepository.postSubirFacturas($scope.numeroOrden).then(function(result) {
                var Respuesta = result.data;

                $(".alert-warning").show('fast');
                $(".errores_factura").html('');

                document.getElementById("frm_subir_factura").reset();
                $(".uploading").hide();
                if (Respuesta.res.return.codigo == 1) {
                    $scope.titulo_factura = 'Factura Cargada correctamente';
                } else {
                    $scope.titulo_factura = 'Factura no válida';
                }

                $.each(Respuesta.res.return, function(key, item) {
                    $(".errores_factura").append('<tr> <td width="20%"><strong>' + key + '</strong></td> <td>' + item + '</td> </tr>');
                });

                $(".btn-cerrar").removeAttr("disabled");
            }, function(error) {});
        }
    }

    $scope.subirEvidencias = function() {
        var evidencia_file = $(".inputfile-3").val();
        if (evidencia_file == '') {
            alertFactory.warning("Selecciona un archivo.");

        } else {
            $(".btn-evidencia").attr("disabled", "disabled");

            detalleRepository.postSubirEvidencia().then(function(result) {
                var Respuesta = result;
                document.getElementById("frm_evidencia").reset();
                $(".lbl_evidencia").text('Seleccionar archivo');

                var _nombre = Respuesta.data.data[0].nombre;
                var _descri = '';
                var _ruta = Respuesta.data.data[0].PathDB;
                var _orden = Respuesta.data.data[0].Param.idOrden;


                consultaCitasRepository.agregarEvidencias(_nombre, _descri, _ruta, _orden).then(function(result) {
                    $scope.getOrdenEvidencias($scope.userData.idUsuario, $scope.numeroOrden);
                    $(".btn-evidencia").removeAttr("disabled");

                });
            }, function(error) {});
        }
    }

    $scope.Cargar_Factura_Tmp = function() {
        $scope.class_buttonCargaFactura = 'fa fa-spinner fa-spin';
        var fxml = $(".inputfile-1").val();
        var fpdf = $(".inputfile-2").val();

        if (fxml == '' || fpdf == '') {
            $(".alert-info").fadeIn();
            $(".alert-info span").text('Debes proporcionar el XML y el PDF de la factura que vas a cargar.');
            $scope.class_buttonCargaFactura = '';
            setTimeout(function() {
                $(".alert-info").fadeOut('fast');
            }, 4000);
        } else {
            $(".archivos").hide();
            $(".uploading").show();
            $(".btn-cerrar").attr("disabled", "disabled");
            $(".btn-subir").attr("disabled", "disabled");

            detalleRepository.postSubirFacturas($scope.numeroOrden).then(function(result) {
                var Respuesta = result.data;

                Respuesta.data.forEach(function(item, key) {
                    var ServerPath = item.Param.docServer + '/orden/' + item.PathDB;
                    var Extension = item.PathDB.split('.').pop().toLowerCase();

                    if (Extension == 'xml') {

                        detalleRepository.validaFactura(item.PathDB).then(function(result) {
                            if (parseInt(result.data.return.codigo) == 0) {
                                $scope.FacturaLista();
                                $("#mensaje").text('¡Factura no válida!');
                                $.each(result.data.return, function(key, registro) {
                                    if (key != 'codigo')
                                        $(".errores_factura").append('<tr> <td width="20%"><strong>' + key + '</strong></td> <td>' + registro + '</td> </tr>');
                                });
                            } else if (parseInt(result.data.return.codigo) == 2) {
                                $scope.FacturaLista();
                                $("#mensaje").text('¡No se ha podivo verificar!');
                                $.each(result.data.return, function(key, registro) {
                                    if (key != 'codigo')
                                        $(".errores_factura").append('<tr> <td width="20%"><strong>' + key + '</strong></td> <td>' + registro + '</td> </tr>');
                                });
                            } else {
                                $("#mensaje").text('¡Factura cargada correctamente!');
                                var xml = result.data.xml_objet;
                                var sxml = result.data.xml;

                                var UUID = xml['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$['UUID'];
                                var RFC_Emisor = xml['cfdi:Comprobante']['cfdi:Emisor'][0].$['rfc']
                                var RFC_Receptor = xml['cfdi:Comprobante']['cfdi:Receptor'][0].$['rfc'];
                                var subTotal = xml['cfdi:Comprobante'].$['subTotal'];
                                var Total = xml['cfdi:Comprobante'].$['total'];
                                var Fecha = xml['cfdi:Comprobante'].$['fecha'];
                                var Folio = xml['cfdi:Comprobante'].$['folio'];

                                if (Folio === undefined || Folio === null || Folio == "") {
                                    var aux = UUID.split("-");
                                    Folio = aux[0];
                                }


                                detalleRepository.getRFCFactura($scope.numeroCotizacion).then(function(result) {
                                    if (result.data.length != 0) {
                                        var rfc = result.data[0];

                                        // Esta sección se debera quitar para producción
                                        // Esta sección se debera quitar para producción
                                        // Esta sección se debera quitar para producción
                            //              var RFC_Receptor = rfc.RFCCliente;
                            //              var RFC_Emisor = rfc.RFCTaller;
                            //              var subTotal = $scope.cotizacionTotal;
                                        // Esta sección se debera quitar para producción
                                        // Esta sección se debera quitar para producción
                                        // Esta sección se debera quitar para producción

                                        if (RFC_Receptor != rfc.RFCCliente) {
                                            $scope.FacturaLista();
                                            $("#mensaje").text('¡Factura no válida!');
                                            $(".errores_factura").append('<tr> <td width="20%"><strong>RFC Receptor</strong></td> <td>El RFC Receptor no coincide con el de la cotización.</td> </tr>');
                                            detalleRepository.eliminaFactura(item.PathDB);
                                        } else if (RFC_Emisor != rfc.RFCTaller) {
                                            $scope.FacturaLista();
                                            $("#mensaje").text('¡Factura no válida!');
                                            $(".errores_factura").append('<tr> <td width="20%"><strong>RFC Emisor</strong></td> <td>El RFC Emisor no coincide con el de la cotización.</td> </tr>');
                                            detalleRepository.eliminaFactura(item.PathDB);
                                        } else {
                                            if ($scope.cotizacionTotal >= (parseInt(subTotal) - 1) && $scope.cotizacionTotal <= (parseInt(subTotal) + 1)) {
                                                console.log("Todas las validaciones son correctas");
                                                var parametros = {
                                                    idCotizacion: rfc.idCotizacion,
                                                    numFactura: Folio,
                                                    uuid: UUID,
                                                    fechaFactura: Fecha,
                                                    subTotal: subTotal,
                                                    iva: subTotal * 0.16,
                                                    total: Total,
                                                    idUsuario: $scope.idUsuario,
                                                    xml: sxml,
                                                    rfcEmisor: RFC_Emisor,
                                                    rfcReceptor: RFC_Receptor
                                                }

                                                detalleRepository.insertarFactura(parametros).then(function(result) {
                                                    console.log(result.data);
                                                    if (result.data.length != 0) {
                                                        Respuesta.data.forEach(function(archivo, key) {
                                                            var ServerPath = archivo.Param.docServer + '/orden/' + archivo.PathDB;
                                                            detalleRepository.getGuardarFactura(ServerPath, archivo.Param.idOrden, archivo.Param.cotizacionFactura).then(function(result) {
                                                                console.log(result);
                                                            });
                                                        });

                                                        setTimeout(function() {
                                                            $("#myModal").modal('hide');
                                                            $scope.init();
                                                        }, 2500);
                                                        $scope.FacturaLista();
                                                        $("#mensaje").text('¡Factura guardada!');
                                                        $(".errores_factura").append('<tr> <td width="20%"><strong>Info</strong></td> <td>Factura guardada correctamente.</td> </tr>');
                                                        detalleRepository.eliminaFactura(item.PathDB);
                                                    } else {
                                                        $scope.FacturaLista();
                                                        $("#mensaje").text('¡Factura no guardada!');
                                                        $(".errores_factura").append('<tr> <td width="20%"><strong>Info</strong></td> <td>La factura no pudo ser guardada, intente nuevamente.</td> </tr>');
                                                        detalleRepository.eliminaFactura(item.PathDB);
                                                    }
                                                }, function(error) {
                                                    $scope.FacturaLista();
                                                    $("#mensaje").text('¡Factura no guardada!');
                                                    $(".errores_factura").append('<tr> <td width="20%"><strong>Info</strong></td> <td>La factura no pudo ser guardada, intente nuevamente.</td> </tr>');
                                                    detalleRepository.eliminaFactura(item.PathDB);
                                                });
                                            } else {
                                                $scope.FacturaLista();
                                                $("#mensaje").text('¡Factura no válida!');
                                                $(".errores_factura").append('<tr> <td width="20%"><strong>Totales</strong></td> <td>El Total no coincide con el de la cotización.</td> </tr>');
                                                detalleRepository.eliminaFactura(item.PathDB);
                                            }
                                        }

                                        // console.log("Valida RFC Receptor", rfc.RFCCliente, RFC_Receptor);
                                        // console.log("Valida RFC Emisor", rfc.RFCTaller, RFC_Emisor);
                                        // console.log("SubTotal", subTotal, $scope.cotizacionTotal);
                                    } else {
                                        $scope.FacturaLista();
                                    }

                                }, function(error) {
                                    //console.log(error);
                                });
                            }
                        }, function(error) {
                            console.log(error);
                        });
                    }
                    // detalleRepository.getGuardarFactura(ServerPath, item.Param.idOrden, item.Param.cotizacionFactura).then(function(result) {

                    // });
                });


            }, function(error) {
                //console.log(error);
            });
        }
    }

    $scope.FacturaLista = function() {
        $scope.alert_respuesta = true;
        $(".uploading").hide();
        $(".alert_respuesta").fadeIn();
        $(".errores_factura").html('');
        $scope.class_buttonCargaFactura = '';
        $(".btn-cerrar").removeAttr("disabled");
    }

    $scope.ValidaTerminoTrabajo = function() {
        $scope.class_buttonTerminaTrabajo = 'fa fa-spinner fa-spin';
        if ($scope.userData.presupuesto == 1) {
            detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function(result) {
                if (result.data[0].RealizarOperacion) {

                    aprobacionRepository.getPresupuesto($scope.numeroOrden).then(function(result) {
                        if (result.data.length > 0) {
                            $scope.saldosTermino = result.data[0];
                            if (result.data[0].presupuestoVenta > 0) {
                                $scope.idPresupuesto = result.data[0].idPresupuesto;
                                detalleRepository.restaPresupuestoOrden($scope.idPresupuesto, $scope.idOrden, $scope.userData.idUsuario).then(function(result) {
                                    if (result.data.length > 0) {

                                        detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(r_token) {
                                            $scope.class_buttonTerminaTrabajo = '';
                                            alertFactory.success('Se ha terminado el trabajo');
                                            $("html, body").animate({
                                                scrollTop: 0
                                            }, 1000);
                                            $scope.getReporteConformidad($scope.detalleOrden.idOrden);
                                            $scope.addComentarioTermino();

                                        });
                                    }
                                });

                            } else {
                                $('.modal-dialog').css('width', '1050px');
                                modal_saldos($scope, $modal, $scope.saldosTermino, $scope.nombreCentroTrabajo, '', '');
                                $scope.class_buttonTerminaTrabajo = '';
                            }
                        } else {
                            $('.modal-dialog').css('width', '1050px');
                            modal_saldos($scope, $modal, $scope.saldosTermino, $scope.nombreCentroTrabajo, '', '');
                            $scope.class_buttonTerminaTrabajo = '';
                        }
                    });

                } else {
                    $scope.class_buttonTerminaTrabajo = '';
                    alertFactory.info('Aún quedan cotizaciones pendientes por revisar');
                }
            });
        } else {
            detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function(result) {
                if (result.data[0].RealizarOperacion) {
                    detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(r_token) {
                        $scope.class_buttonTerminaTrabajo = '';
                        alertFactory.success('Se ha terminado el trabajo');
                        $("html, body").animate({
                            scrollTop: 0
                        }, 1000);
                        $scope.getReporteConformidad($scope.detalleOrden.idOrden);
                        $scope.addComentarioTermino();

                    });
                } else {
                    $scope.class_buttonTerminaTrabajo = '';
                    alertFactory.info('Aún quedan cotizaciones pendientes por revisar');
                }
            });
        }
    }

    $scope.ValidaEntrega = function(objeto) {
        if (objeto == 0) {
            detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function(result) {
                if (result.data[0].RealizarOperacion) {
                    if ($scope.token_termino == '' || $scope.token_termino === undefined) {
                        alertFactory.error('Introduce el Token de Verificación');
                    } else {
                        detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_termino).then(function(r_token) {
                            if (r_token.data[0].Success) {
                                detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(c_token) {
                                    alertFactory.success('Se ha pasado a estatus Entrega');
                                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function(resp) {
                                        if (resp.data.length > 0) {
                                            var correoDe = resp.data[0].correoDe;
                                            var correoPara = resp.data[0].correoPara;
                                            var asunto = resp.data[0].asunto;
                                            var texto = resp.data[0].texto;
                                            var bodyhtml = resp.data[0].bodyhtml;
                                            commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function(result) {
                                                $("html, body").animate({
                                                    scrollTop: 0
                                                }, 1000);
                                                $scope.init();
                                                $scope.token_termino = '';
                                                $scope.getReporteConformidad($scope.detalleOrden.idOrden);

                                            }, function(error) {
                                                alertFactory.error('No se puede enviar el correo');
                                            });
                                        }
                                    }, function(error) {
                                        alertFactory.error("Error al obtener información para el mail");
                                    });
                                });

                            } else {
                                alertFactory.error(r_token.data[0].Msg);
                                $scope.token_termino = '';
                            }
                        });
                    }
                } else {
                    alertFactory.error('Aun quedan cotizaciones pendientes por revisar');
                }
            });
        } else {
            if ($scope.validaProcesoProvisionamiento == 2) {
                detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function(result) {
                    if (result.data[0].RealizarOperacion) {
                        if ($scope.token_termino == '' || $scope.token_termino === undefined) {
                            alertFactory.error('Introduce el Token de Verificación');
                        } else {
                            detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_termino).then(function(r_token) {
                                if (r_token.data[0].Success) {
                                    detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(c_token) {
                                        alertFactory.success('Se ha pasado a estatus Cobranza');
                                        commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function(resp) {
                                            if (resp.data.length > 0) {
                                                var correoDe = resp.data[0].correoDe;
                                                var correoPara = resp.data[0].correoPara;
                                                var asunto = resp.data[0].asunto;
                                                var texto = resp.data[0].texto;
                                                var bodyhtml = resp.data[0].bodyhtml;
                                                commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function(result) {
                                                    $("html, body").animate({
                                                        scrollTop: 0
                                                    }, 1000);
                                                    $scope.init();
                                                    $scope.token_termino = '';
                                                    $scope.getReporteConformidad($scope.detalleOrden.idOrden);

                                                }, function(error) {
                                                    alertFactory.error('No se puede enviar el correo');
                                                });
                                            }
                                        }, function(error) {
                                            alertFactory.error("Error al obtener información para el mail");
                                        });
                                    });

                                } else {
                                    alertFactory.error(r_token.data[0].Msg);
                                    $scope.token_termino = '';
                                }
                            });
                        }
                    } else {
                        alertFactory.error('Aun quedan cotizaciones pendientes por revisar');
                    }
                });

            } else {
                swal("Advertencia!", "La orden se debe provisionar");
            }
        }

    }

    $scope.ValidaPorCobrar = function() {
        detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function(result) {
            if (result.data[0].RealizarOperacion) {
                if ($scope.token_termino == '' || $scope.token_termino === undefined) {
                    alertFactory.error('Introduce el Token de Verificación');
                } else {
                    detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_termino).then(function(r_token) {
                        if (r_token.data[0].Success) {
                            detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(c_token) {
                                alertFactory.success('Se ha pasado a Orden por Cobrar');
                                commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function(resp) {
                                    if (resp.data.length > 0) {
                                        var correoDe = resp.data[0].correoDe;
                                        var correoPara = resp.data[0].correoPara;
                                        var asunto = resp.data[0].asunto;
                                        var texto = resp.data[0].texto;
                                        var bodyhtml = resp.data[0].bodyhtml;
                                        commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function(result) {
                                            $("html, body").animate({
                                                scrollTop: 0
                                            }, 1000);
                                            $scope.init();
                                            $scope.token_termino = '';

                                            $scope.getReporteConformidad($scope.detalleOrden.idOrden);

                                        }, function(error) {
                                            alertFactory.error('No se puede enviar el correo');
                                        });
                                    }
                                }, function(error) {
                                    alertFactory.error("Error al obtener información para el mail");
                                });
                            });
                        } else {
                            alertFactory.error(r_token.data[0].Msg);
                            $scope.token_termino = '';
                        }
                    });
                }
            } else {
                alertFactory.error('Aun quedan cotizaciones pendientes por revisar');
            }
        });
    }

    $(".token-group button i").hide();
    $scope.ValidaUtilidad = function() {
        $(".token-group input").attr("disabled", "disabled");
        $(".token-group button").attr("disabled", "disabled");
        $(".token-group button i").show();

        if ($scope.token_utilidad == '' || $scope.token_utilidad === undefined) {
            alertFactory.error('Introduce el Token de Verificación');
            $(".token-group input").removeAttr("disabled");
            $(".token-group button").removeAttr("disabled");
            $(".token-group button i").hide();
        } else {
            detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_utilidad).then(function(r_token) {
                if (r_token.data[0].Success) {
                    $scope.token_utilidad = '';
                    detalleRepository.tokenEstatus($scope.detalleOrden.idOrden).then(function(resp) {});
                    detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(result) {
                        commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function(resp) {
                            if (resp.data.length > 0) {
                                var correoDe = resp.data[0].correoDe;
                                var correoPara = resp.data[0].correoPara;
                                var asunto = resp.data[0].asunto;
                                var texto = resp.data[0].texto;
                                var bodyhtml = resp.data[0].bodyhtml;
                                commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function(result) {

                                    location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4';

                                    // $(".token-group input").removeAttr("disabled");
                                    // $(".token-group button").removeAttr("disabled");
                                    // $(".token-group button i").hide();
                                    //$scope.init();
                                }, function(error) {
                                    alertFactory.error('No se puede enviar el correo');
                                    setTimeout(function() {
                                        location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4';
                                    }, 1500);
                                });
                            }
                        }, function(error) {
                            alertFactory.error("Error al obtener información para el mail");
                            location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4';
                        });
                    });
                } else {
                    alertFactory.error(r_token.data[0].Msg);
                    $scope.token_termino = '';

                    $scope.token_utilidad = '';
                    $(".token-group input").removeAttr("disabled");
                    $(".token-group button").removeAttr("disabled");
                    $(".token-group button i").hide();
                }
            });
        }
    }

    $scope.RechazarTrabajo = function() {
        /* swal({
                 title: "¿Estas seguro?",
                 text: "Al rechazar el trabajo éste se cambiara a estatus 'Proceso'",
                 type: "warning",
                 showCancelButton: true,
                 confirmButtonColor: "#DD083F",
                 confirmButtonText: "Rechazar trabajo",
                 cancelButtonText: "Cerrar",
                 cancelButtonColor: "#DD083F",
                 closeOnConfirm: false
             },
             function() {

             });*/
        $("#ModalRechazoTrabajo").modal();
        $scope.motivo_rechazoTrabajo = '';
    }

    $scope.aceptarRechazoTrabajo = function() {

        if ($scope.motivo_rechazoTrabajo != '') {
            $("#ModalRechazoTrabajo").modal('hide');

            detalleRepository.rechazaTrabajo($scope.detalleOrden.idOrden, $scope.idUsuario, $scope.motivo_rechazoTrabajo).then(function(Rechazado) {
                commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function(resp) {
                    if (resp.data.length > 0) {
                        var correoDe = resp.data[0].correoDe;
                        var correoPara = resp.data[0].correoPara;
                        var asunto = resp.data[0].asunto;
                        var texto = resp.data[0].texto;
                        var bodyhtml = resp.data[0].bodyhtml;
                        commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function(result) {
                            $("html, body").animate({
                                scrollTop: 0
                            }, 1000);
                            $scope.init();
                            swal("", "Se ha rechazado el trabajo", "success");

                        }, function(error) {
                            alertFactory.error('No se puede enviar el correo');
                        });
                    }
                }, function(error) {
                    alertFactory.error("Error al obtener información para el mail");
                });
            });
        } else {
            alertFactory.info('Debes poner el motivo del rechazo del trabajo.');
        }

    }

    $scope.OpenModalShowFactura = function() {
        $("#ModalShowFactura").modal();
    }

    $scope.OpenModalPlanAccion = function() {
        $("#ModalPlanAccion").modal();
    }

    $scope.ShowFacturas = function() {
        detalleRepository.getFacturas($scope.numeroOrden).then(function(respuesta) {
            $scope.Facturas = respuesta.data;
            if ($scope.Facturas.success) {
                $scope.facturas_empty = false;
                $scope.Facturas.data.forEach(function(item, key) {
                    item.facturas.forEach(function(element, k) {
                        $scope.totalfacturas++;
                    });
                });
            } else {
                $scope.facturas_empty = true;
            }
        }, function(error){
          $('#loadModal').modal('hide');
        });
    }
    //********** [ Aqui Termina Ordenes en Proceso ] ******************************************************************************//

    $scope.checkComprobanteRecepcion = function() {
        detalleRepository.getExistsComprobanteRecepcion($scope.numeroOrden, 1).then(function(result) {
            var resultado = result.data[0];
            if (resultado[0].ID != 0) {
                $scope.validaCertificado = 1;
            } else {
                $scope.validaCertificado = 0;
            }
        }, function(error) {
          $('#loadModal').modal('hide');
            alertFactory.error('No se puede obtener el historico de la orden.');
        });
    }

    $scope.validaHojaTrabajo = false;
    $scope.checkHojaTrabajo = function() {
        detalleRepository.getExistsComprobanteRecepcion($scope.numeroOrden, 2).then(function(result) {
            var resultado = result.data[0];
            if (resultado[0].ID != 0) {
                $scope.validaHojaTrabajo = true;
            } else {
                $scope.validaHojaTrabajo = false;
            }
        }, function(error) {
            $('#loadModal').modal('hide');
            alertFactory.error('No se puede obtener el historico de la orden.');
        });
    }

    $scope.archivoEvidencia = function(dato) {
        if (dato == 1)
            var url = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/comprobanteRecepcion/ComprobanteRecepcion.pdf';
        window.open(url);
    }

    $scope.OpenTrabajo = function() {
        var url = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/hojaTrabajo/Recibo_Comprobante.pdf';
        window.open(url);
    }

    $scope.acciones = function() {
        if (($scope.comentaAccion != undefined && $scope.comentaAccion != "") && ($scope.fechaAccion != undefined && $scope.fechaAccion != "")) {
            //FAL 12072017 calcula la nueva fecha
            $scope.fechaCompleta = $scope.fechaAccion + ' ' + $scope.horaAccion;
            detalleRepository.postAcciones($scope.comentaAccion, $scope.fechaCompleta, $scope.userData.idUsuario, $scope.idOrdenURL).then(function(result) {
                if (result.data.length > 0) {
                    alertFactory.success('Se inserto correctamente la Acción');
                    $scope.getOrdenDetalle($scope.userData.idUsuario, $scope.numeroOrden);
                    $scope.comentaAccion = "";
                    $scope.fechaAccion = "";
                    $("#ModalPlanAccion").modal('hide');
                }
            }, function(error) {
                alertFactory.error('No se puede guardar accion, intente mas tarde o comuniquese con el administrador');
            });
        } else {
            alertFactory.info('Porfavor llene todos los campos');
        }
    }
    $scope.recordatorio = function() {
        if (($scope.comentaRecordatorio != undefined && $scope.comentaRecordatorio != "") &&
            ($scope.fechaRecordatorio != undefined && $scope.fechaRecordatorio != "") &&
            ($scope.horaRecordatorio != undefined && $scope.horaRecordatorio != "")) {

            $scope.fechaCompleta = $scope.fechaRecordatorio + ' ' + $scope.horaRecordatorio;
            detalleRepository.postRecordatorio($scope.comentaRecordatorio, $scope.fechaCompleta, $scope.userData.idUsuario, $scope.idOrdenURL).then(function(result) {
                if (result.data.length > 0) {
                    alertFactory.success('Se inserto correctamente el Recordatorio');
                    $scope.comentaRecordatorio = "";
                    $scope.fechaRecordatorio = "";
                    $scope.horaRecordatorio = "";
                    $scope.fechaCompleta = "";
                }
            }, function(error) {
                alertFactory.error('No se puede guardar recordatorio, intente mas tarde o comuniquese con el administrador');
            });
        } else {
            alertFactory.info('Porfavor llene todos los campos');
        }
    };

    $scope.editarCita = function() {
        $scope.class_buttonEditarCita = 'fa fa-spinner fa-spin';
        location.href = '/nuevacita?economico=' + $scope.detalleOrden.numeroEconomico + '&orden=' + $scope.detalleOrden.idOrden;
    };

    $scope.validateEstatusAprobacion = function() {
        var bandera = true;

        if ($scope.cotizaciones != undefined) {
            $scope.cotizaciones.forEach(function(item) {
                item.detalle.forEach(function(itemDetail) {
                    if (itemDetail.costo == 0) {
                        bandera = false;
                    };
                });
            });

            if (bandera) {
                if ($scope.userData.manejoUtilidad == 1) {
                    $scope.enviaAprobacion();

                } else {
                    $scope.estatusAprobacion();
                }

            } else {
                swal('No se puede enviar a aprobación ya que cuenta con partidas sin precio asignado.');
            }
        } else {
            swal('Debe de contar con una cotización.');
        }

    }

    //utilidad
    $scope.enviaAprobacion = function() {
        var uitilidad = ($scope.totalSumaVenta - $scope.totalSumaCosto) / $scope.totalSumaVenta;
        var margen = (($scope.totalSumaVenta - $scope.totalSumaCosto) * 100) / $scope.totalSumaVenta;


        var UtilidadNeta = ($scope.userData.porcentajeUtilidad * .01);

        if (UtilidadNeta > uitilidad) {

            swal({
                    title: "La utilidad es menor a lo esperado",
                    text: "¿Desea continuar con el margen de " + margen.toFixed(2) + "%?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#65BD10",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    cancelButtonColor: "#DD083F",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function(isConfirm) {
                    if (isConfirm) {
                        utilidadesRepository.putUtilidad($scope.idOrden, $scope.userData.idUsuario, margen.toFixed(2)).then(function(result) {
                            if (result.data.length > 0) {
                                if (result.data[0].idAprobacionUtilidad > 0) {
                                    swal('La orden se encuentra en espera de Aprobación de Utilidad');
                                    $scope.margen = margen;
                                    $scope.show_tokenMargen = true;

                                    commonFunctionRepository.dataMailUtilidad($scope.idOrden, $scope.userData.idUsuario, $scope.cotizaciones[0].idCotizacion).then(function(resp) {
                                        if (resp.data.length > 0) {
                                            var correoDe = resp.data[0].correoDe;
                                            var correoPara = resp.data[0].correoPara;
                                            var asunto = resp.data[0].asunto;
                                            var texto = resp.data[0].texto;
                                            var bodyhtml = resp.data[0].bodyhtml;
                                            commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function(result) {
                                                //$scope.estatusAprobacion();
                                                alertFactory.info('Se notifico por correo la utilidad');

                                            }, function(error) {
                                                alertFactory.error('No se puede enviar el correo');
                                            });
                                        }
                                    }, function(error) {
                                        alertFactory.error("Error al obtener información para el mail");
                                    });
                                } else {
                                    swal('La orden se encuentra en espera de Aprobación de Utilidad');
                                }

                            }
                        }, function(error) {
                            alertFactory.error('No se puede guardar accion, intente mas tarde o comuniquese con el administrador');
                        });

                    }
                });

        } else {
            $scope.estatusAprobacion();
        }


    }

    $scope.estatusUtilidad = function() {
        utilidadesRepository.getValidacionAprobacion($scope.idOrden).then(function(result) {
            if (result.data.length > 0) {
                if (result.data[0].idAprobacionUtilidad > 0) {
                    if (result.data[0].estatusAprobacion == 1) {
                        $scope.show_tokenMargen = true;
                    } else {
                        $scope.show_tokenMargen = false;
                    }

                } else {
                    $scope.show_tokenMargen = false;
                }
            }
        }, function(error) {
            alertFactory.error('No se puede guardar accion, intente mas tarde o comuniquese con el administrador');
        });

    };



    $scope.estatusAprobacion = function() {
        swal({
                title: "¿Está seguro que desea enviar la Orden a aprobación?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65BD10",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                cancelButtonColor: "#DD083F",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(result) {
                        commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function(resp) {
                            if (resp.data.length > 0) {
                                var correoDe = resp.data[0].correoDe;
                                var correoPara = resp.data[0].correoPara;
                                var asunto = resp.data[0].asunto;
                                var texto = resp.data[0].texto;
                                var bodyhtml = resp.data[0].bodyhtml;
                                commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function(result) {

                                    location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4';
                                    //$scope.init();
                                }, function(error) {
                                    alertFactory.error('No se puede enviar el correo');
                                    setTimeout(function() {
                                        location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4';
                                    }, 1500);
                                });
                            }
                        }, function(error) {
                            alertFactory.error("Error al obtener información para el mail");
                        });
                    });
                    swal("Orden en aprobación!");
                } else {
                    swal("La Orden no se envió a aprobación!");
                }
            });
    };


    $scope.validaFacturaCotizacion = function(provision) {
        swal({
                title: "Advertencia",
                text: "¿Está seguro de aprobar la provisión de la orden?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#67BF11",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function(isConfirm) {
                if (isConfirm) {
                    detalleRepository.getfacturaCotizacion($scope.idOrden, $scope.userData.idUsuario).then(function(result) {
                        if (result.data[0].success == 1) {
                            detalleRepository.insertaBPRO($scope.idOrden, $scope.userData.idUsuario).then(function(result) {
                                if (result.data.length > 0) {
                                    alertFactory.info('Se ha provisionado correctamente');
                                    swal("Proceso Realizado");
                                    $("html, body").animate({
                                        scrollTop: 0
                                    }, 1000);
                                    $scope.init();
                                }
                            }, function(error) {
                                alertFactory.error('No se pudo insertar en BPRO');
                            });
                        } else {
                            alertFactory.info('Faltan cargar facturas');
                        }
                    }, function(error) {
                        alertFactory.error('No se pudo revisar estatus de facturas');
                    });
                }
            });
    };


    //Abre la modal para confirmar la cancelación de la orden
    $scope.CancelarCita = function() {
        swal({
                title: "¿Esta seguro que desea cancelar la Cita?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65BD10",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    $scope.cancelarOrden();
                    location.href = '/consultaCitas';
                } else {
                    swal("Cita no cancelada");
                }
            });
    };

    $scope.cancelarOrden = function() {
        detalleRepository.postCancelaOrden($scope.userData.idUsuario, $scope.detalleOrden.idOrden).then(function(result) {
                swal("Trabajo terminado!", "La cita se ha cancelado");
                location.href = '/consultaCitas';
            },
            function(error) {
                alertFactory.error('No se pudo cancelar la cotización, inténtelo más tarde.');
            });
    };

    /*  $scope.validaFacturaCotizacion = function() {
          detalleRepository.getfacturaCotizacion($scope.idOrden, $scope.userData.idUsuario).then(function(result) {
              if (result.data[0].success == 1) {
                  detalleRepository.insertaBPRO($scope.idOrden, $scope.userData.idUsuario).then(function(result) {
                      if (result.data.length > 0) {
                          alertFactory.info('Se ha provisionado correctamente');
                          $("html, body").animate({
                              scrollTop: 0
                          }, 1000);
                          $scope.init();
                      }
                  }, function(error) {
                      alertFactory.error('No se pudo insertar en BPRO');
                  });
              } else {
                  alertFactory.info('Faltan cargar facturas');
              }
          }, function(error) {
              alertFactory.error('No se pudo revisar estatus de facturas');
          });
      } */

    $scope.validaFacturaCotizacionBoton = function() {
        detalleRepository.getfacturaCotizacion($scope.idOrden, $scope.userData.idUsuario).then(function(result) {
            console.log(result);
            if (result.data[0].success == 1) {
                $scope.botonProcesarCompra = true;
            } else if (result.data[0].success == 2) {
                $scope.botonProcesarCompra = false;
                $scope.estadoCompra = true;
                $scope.procesarCompra = 'PROVISIONADO';
            } else {
                $scope.botonProcesarCompra = false;
            }
            $scope.validaProcesoProvisionamiento = result.data[0].success;
        }, function(error) {
            alertFactory.error('No se pudo revisar estatus de facturas');
        });
    }


    //Abre la modal para confirmar la cancelación de la orden
    $scope.cancelarAprobacion = function(Cotizacion) {
        $('.btnTerminarTrabajo').ready(function() {
            swal({
                    title: "¿Esta seguro que desea cancelar la cotización?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#65BD10",
                    confirmButtonText: "Si",
                    cancelButtonText: "No",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        $scope.cancelarCotizacion(Cotizacion.idCotizacion);
                        location.href = '/unidad?economico=' + $scope.detalleOrden.numeroEconomico;
                        //location.href = "/detalle?orden=" + $scope.numeroOrden + "&estatus=4";
                    } else {
                        swal("Cotizacion no cancelada");
                    }
                });
        });
    };

    $scope.cancelarCotizacion = function(idCotizacion) {
        $scope.promise = cotizacionConsultaRepository.cancelaCotizacion($scope.userData.idUsuario, idCotizacion).then(function() {
                swal("Trabajo terminado!", "La cotización se ha cancelado");
            },
            function(error) {
                alertFactory.error('No se pudo cancelar la cotización, inténtelo más tarde.');
            });
    };

    $scope.realizaProvision = function() {
        $scope.promise = detalleRepository.postaproviosionamiento($scope.idOrden, $scope.userData.idUsuario).then(function() {
                swal("Trabajo terminado!", "La orden se ha provisionado corractamente");
                localStorageService.remove('provision');
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);
                $scope.init();
            },
            function(error) {
                alertFactory.error('No se pudo cancelar la cotización, inténtelo más tarde.');
            });
    };
    //Funcion para genear comentarios
    $scope.agregarComentario = function(tipoComentario, partida) {
        $scope.tipoComentario = 1;
        //tipoComentario=1 <-- Cuando se rechaza una partida
        var repetido = 0;
        angular.forEach($scope.comentarios, function(value, key) {
            if (value.id == partida.idPartida) { repetido++; } else {

            }
        });
        if (repetido != 0) {

        } else {
            $scope.partidaComentario = [];
            $scope.partidaComentario = partida;
            $('.modal-dialog').css('width', '1050px');
            modal_agregarComentario($scope, $modal, $scope.resultadoComentario, '');
        }


    };
    $scope.resultadoComentario = function(comentarios) {
        if ($scope.tipoComentario == 1) {
            $scope.comentarios.push({
                id: $scope.partidaComentario.idPartida,
                comentario: 'Número de Parte: ' + $scope.partidaComentario.noParte + ' Comentario: ' + comentarios
            });
        } else if ($scope.tipoComentario == 2) {
            $scope.comentarios.push({
                comentario: comentarios
            });
            $scope.updateComentariosPartidas();
        }

    };
    $scope.verificaComentario = function(tipoComentario, partida) {
        //tipoComentario=1 <-- Cuando se rechaza una partida
        angular.forEach($scope.comentarios, function(value, key) {
            if (value.id == partida.idPartida) {
                $scope.comentarios.splice((key), 1)
            } else {}
        });
    };
    $scope.updateComentariosPartidas = function() {
        if ($scope.tipoComentario == 1) {
            angular.forEach($scope.comentarios, function(value, key) {
                detalleRepository.insNota(value.comentario, $scope.numeroOrden, $scope.userData.idUsuario, $scope.idEstatusOrden).then(function(result) {
                    if (result.data.length > 0) {
                        $scope.notaTrabajo = result.data;
                    }
                }, function(error) {
                    alertFactory.error('No se pudieron obtener las notas');
                });
            });
        } else if ($scope.tipoComentario == 2) {
            detalleRepository.insNota($scope.comentarios[0].comentario, $scope.numeroOrden, $scope.userData.idUsuario, 6).then(function(result) {
                if (result.data.length > 0) {
                    $scope.notaTrabajo = result.data;
                    $scope.init();
                }
            }, function(error) {
                alertFactory.error('No se pudieron obtener las notas');
            });
        }

        $scope.comentarios = [];
    };
    $scope.addComentarioTermino = function() {
        $scope.tipoComentario = 2;
        $('.modal-dialog').css('width', '1050px');
        modal_agregarComentario($scope, $modal, $scope.resultadoComentario, '');
    };
    //Termina lo de comentarios
    //FAL 12072017 funciones para no permitir planes difernetes de la fecha actual
    $scope.NoFechaAntigua = function(fecha) {

        var CurrentDate = new Date();
        var anio = CurrentDate.getFullYear();
        var mes = CurrentDate.getMonth() + 1;
        var dia = CurrentDate.getDate();
        var diaActual = new Date(anio + '/' + mes + '/' + dia);
        var fechaSeleccionada = new Date(fecha);

        if (fechaSeleccionada < diaActual) {
            $scope.fechaAccion = '';
            $scope.horaAccion = '';
            $scope.SeleccionoDiaActual = false;
            alertFactory.info('No puede seleccionar una fecha anterior.');
        }

        if (!(fechaSeleccionada < diaActual) && !(fechaSeleccionada > diaActual)) {
            $scope.SeleccionoDiaActual = true;
            if ($scope.horaAccion != undefined && $scope.horaAccion != '' && $scope.horaAccion != null) {
                $scope.NoHoraAntigua($scope.horaAccion);
            }
        }

        if (fechaSeleccionada > diaActual) {
            $scope.SeleccionoDiaActual = false;
        }
    };

    $scope.NoHoraAntigua = function(hora) {

        if ($scope.fechaAccion != undefined && $scope.fechaAccion != '' && $scope.fechaAccion != null) {
            if ($scope.SeleccionoDiaActual == true) {
                var HoraActual = new Date();
                var anio = HoraActual.getFullYear();
                var mes = HoraActual.getMonth() + 1;
                var dia = HoraActual.getDate();
                var HoraSeleccionada = new Date(anio + '/' + mes + '/' + dia + ' ' + hora + ':00.000');

                if (!(HoraSeleccionada > HoraActual)) {
                    $scope.horaAccion = '';
                    alertFactory.info('No puede seleccionar una hora anterior.');
                }
            }
        } else {
            $scope.horaAccion = '';
            alertFactory.info('Seleccione antes la fecha del recordatorio.');
        }
    }

      //FAL 14072017   direccionamiento a preorden-cotizacion
    $scope.irpreordenCotizacion = function(idCotizacion) {
        $scope.class_buttonNuevaCotizacion = 'fa fa-spinner fa-spin';
        location.href = '/preordenCotizacion?idCotizacion=' + idCotizacion + '&orden=' + $scope.numeroOrden;
    }

});
