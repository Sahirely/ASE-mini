registrationModule.controller('detalleController', function($scope, $location, $modal, $timeout, userFactory, cotizacionRepository, consultaCitasRepository, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, detalleRepository, aprobacionRepository, commonFunctionRepository, utilidadesRepository) {
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
    $scope.show_tokenMargen=false;

    $scope.sinTiempoDisponible = 1;
    $scope.tiempoTranscurridoDisplay = '00:00 / 00:00';

    $scope.init = function() {
        userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        $scope.idUsuario = $scope.userData.idUsuario;
        $scope.btnSwitch.classCosto = 'btn btn-success';
        $scope.btnSwitch.classVenta = 'btn btn-default';
        $scope.showButtonSwitch($scope.userData.idRol);
        $scope.checkComprobanteRecepcion();
        $scope.HistoricoCotizaciones = [];
        $scope.getHistoricos();
        $scope.getOrdenDetalle($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.getOrdenCliente($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.getOrdenDocumentos($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.getOrdenEvidencias($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.enviaNota();
        $scope.getSaldos($routeParams.orden);
        $('.horaAsignada').clockpicker();
        $scope.ShowFacturas();
        if($scope.userData.tiempoAsignado == 1){
          //inicia reloj
          $scope.iniTime();
        }else{
          $scope.sinTiempoDisponible = 0;
          $scope.tiempoTranscurridoDisplay = '00:00 / 00:00';
        }
 
    };

    //funcion reloj recursiva cada minuto
    $scope.iniTime = function(){
        detalleRepository.getTiempoTranscurrido($scope.numeroOrden).then(function(result){
          if (result.data.length > 0){
            $scope.sinTiempoDisponible = result.data[0].sinTiempoDisponible;
            $scope.tiempoTranscurridoDisplay = result.data[0].tiempoTranscurridoDisplay;

            $timeout(function(){
                $scope.iniTime();
            },60000);
          }
        }, function(error){
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
                $scope.detalleOrden = result.data[0];
                $scope.estatus = $routeParams.estatus;
                $scope.estatusUtilidad();

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

                $scope.getMostrarCotizaciones($scope.numeroOrden, statusCotizacion, $scope.idUsuario)
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los detalles de la orden');
        });
    }

    $scope.getOrdenCliente = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenCliente(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleCliente = result.data[0];
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los detalles del cliente');
        });
    }

    $scope.getOrdenDocumentos = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenDocumentos(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleDocumentos = result.data[0];
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los documentos de la orden');
        });
    }

    $scope.getOrdenEvidencias = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenEvidencias(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                var resEvidnecias = result.data;
                console.log( "Cantidad de evidencias: " + resEvidnecias.length );
                console.log( Math.round(resEvidnecias.length / 4) );
                resEvidnecias.forEach( function( item, key ){
                    resEvidnecias[key].tipo = item.rutaEvidencia.split('.').pop().toString();
                    resEvidnecias[key].ruta = $rootScope.docServer + '/orden/' + item.rutaEvidencia;
                });

                $scope.detalleEvidencias = resEvidnecias;
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los documentos de la orden');
        });
    }

    $scope.getMostrarCotizaciones = function(numeroOrden, estatus, idUsuario) {
        cotizacionRepository.getMostrarCotizaciones(numeroOrden, estatus, idUsuario).then(function(result) {
            if (result.data.success == true) {
                $scope.cotizaciones = result.data.data;
                $scope.getTotales();
                $scope.centroTrabajo = $scope.cotizaciones[0].centroTrabajo;
                console.log($scope.cotizaciones);
            } else {
                alertFactory.error('No se puede obtener los documentos de la orden');
            }
        }, function(error) {
            alertFactory.error(result.msg);
        });
    }

    $scope.getTotales = function() {
        $scope.totalSumaCosto = 0;
        $scope.totalSumaVenta = 0;
        if ($scope.cotizaciones != null || $scope.cotizaciones != undefined) {
            $scope.cotizaciones.forEach(function(item) {
                item.detalle.forEach(function(itemDetail) {
                    $scope.totalSumaCosto = $scope.totalSumaCosto + itemDetail.costoTotal;
                    $scope.totalSumaVenta = $scope.totalSumaVenta + itemDetail.ventaTotal;
                });
            });
        }
    }

    $scope.nuevaCotizacion = function() {
        $scope.class_buttonNuevaCotizacion = 'fa fa-spinner fa-spin';
        location.href = '/cotizacionnueva?orden=' + $routeParams.orden;
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
        });
        $scope.textoNota = null;
    };

    $scope.comprobante = function() {
        $scope.class_buttonComprobanteRecepcion = 'fa fa-spinner fa-spin';
        location.href = '/comprobanteRecepcion?orden=' + $routeParams.orden;
    };

    $scope.partidasportokentotal = 0;
    $scope.initApproveButtons = function(item) {
        if (item.Aprueba == 1 && item.idEstatusPartida == 1) {
            item.btnDisabled = false;
            if( $scope.portoken ){
                $scope.partidasportokentotal++;
                item.selOption = 2;
            }
            else{
                item.selOption = item.idEstatusPartida;
            }
        } else {
            item.btnDisabled = true;
            item.selOption = item.idEstatusPartida;
        }
    };

    $scope.err_aprobacion_show = false;
    $scope.VerificaTokenAprobacion = function(){
        if( $scope.token_aprobacion == '' || $scope.token_aprobacion === undefined ){
            $(".err_aprobacion").fadeIn();
            $scope.err_apronacion = 'Es necesario el token para hacer esta operación';
            setTimeout( function(){
                $(".err_aprobacion").fadeOut();
            }, 3000);
        }
        else{
            // idOrden, Token, idCotizacion
            detalleRepository.validaTokenAprobacion( $scope.detalleOrden.idOrden, $scope.token_aprobacion, $scope.idCotizacionActive ).then(function(result) {
                if( result.data[0].Success == 1 ){
                    $("#ModalShowToken").modal('hide');
                    $scope.aprobacionPorToken($scope.numeroOrden, $scope.idEstatusCotizacionActive, result.data[0].idUsuario );
                    setTimeout( function(){

                        if( $scope.partidasportokentotal == 0 ){
                            alertFactory.warning('El token proporcionado no cuenta con el nivel de autorización necesario para esta operación.');
                        }
                        else{
                            $scope.btnSaveCotizacion( result.data[0].idUsuario );
                        }
                    },500 );
                }
                else{
                    $(".err_aprobacion").fadeIn();
                    $scope.err_apronacion = result.data[0].Msg;
                    $scope.token_aprobacion = '';
                    setTimeout( function(){
                        $(".err_aprobacion").fadeOut();
                    }, 3000);
                }
            }, function(error) {
                // alertFactory.error('');
            });
        }

        $scope.token_aprobacion = '';
    }

    $scope.portoken = false;
    $scope.aprobacionPorToken = function(numeroOrden, estatus, usuario){
        console.log('Aprobacion por Token');
        $scope.portoken = true;
        $scope.getMostrarCotizaciones(numeroOrden, estatus, usuario);
    }

    $scope.idCotizacionActive = 0
    $scope.modal_aprobacion = function( id, estatus ){
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

    $scope.btnSaveCotizacion = function( idUsuario ) {
        $scope.buttonGuardaCotizacion = 'fa fa-spinner fa-spin';
        console.log( 'idUsuario', idUsuario );
        var haveBalance = $scope.checkBalance();

        if (haveBalance == true) {
            $scope.UpdatePartidaStatus( idUsuario );
        } else {
            $('.modal-dialog').css('width', '1050px');
            modal_saldos($scope, $modal, $scope.saldos, '', '');
            $scope.buttonGuardaCotizacion = '';
        }

    };

    $scope.checkBalance = function() {
        var sumOperacion = 0;

        $scope.cotizaciones[0].detalle.forEach(function(item) {
            if (item.btnStep != 0 && item.btnDisabled == false) {
                sumOperacion += item.ventaTotal;
            }
        });

        if (sumOperacion > ($scope.saldos.presupuesto - $scope.saldos.saldoReal)) {
            $scope.TieneSaldo = false;
            return false;
        } else {
            $scope.TieneSaldo = true;
            return true;
        }
    };

    $scope.UpdatePartidaStatus = function( idUsuario ) {
        $scope.cotizaciones[0].detalle.forEach(function(item) {
            if (item.btnDisabled == false && item.selOption > 1) {
                var params = {
                    idUsuario: '',
                    idCotizacion: '',
                    idPartida: '',
                    idEstatusPartida: 0
                };
                params.idUsuario = idUsuario;
                params.idCotizacion = $scope.cotizaciones[0].idCotizacion;
                params.idPartida = item.idPartida;
                params.idEstatusPartida = item.selOption;

                aprobacionRepository.getUpdateStatusPartida(params).then(function(result) {
                    if (result.data.length > 0) {}
                }, function(error) {
                    alertFactory.error('Aprobación getUpdateStatusPartida error.');
                });
                /*
                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                            if (resp.data.length > 0) {
                                var correoDe = resp.data[0].correoDe;
                                var correoPara = resp.data[0].correoPara;
                                var asunto = resp.data[0].asunto;
                                var texto = resp.data[0].texto;
                                var bodyhtml = resp.data[0].bodyhtml;
                                 commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                                    if (result.data.length > 0) {
                                        console.log('envia correo desde front')
                                    }
                                }, function(error) {
                                    alertFactory.error('No se puede enviar el correo');
                                });
                            }
                        }, function (error) {
                            alertFactory.error("Error al obtener información para el mail");
                        });
                */
            }
        });

        setTimeout(function() {
            $scope.UpdateCotizacionStatus($scope.cotizaciones[0].idCotizacion, idUsuario);
        }, 1000);
    };

    $scope.UpdateCotizacionStatus = function(idCotizacion, idUsuario) {
        aprobacionRepository.getUpdateStatusCotizacion(idCotizacion, idUsuario).then(function(result) {
            if (result.data.length > 0) {
                var valor = result.data[0].idEstatusCotizacion;

                switch (Number(valor)) {
                    case 2: //cliente
                        alertFactory.success('Faltan partidas por aprobar.');
                        $scope.buttonGuardaCotizacion = '';
                        $scope.init();
                        break;
                    case 3:
                        commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                            if (resp.data.length > 0) {
                                var correoDe = resp.data[0].correoDe;
                                var correoPara = resp.data[0].correoPara;
                                var asunto = resp.data[0].asunto;
                                var texto = resp.data[0].texto;
                                var bodyhtml = resp.data[0].bodyhtml;
                                 commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {

                                        console.log('envia correo desde front')
                                        location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=5';

                                }, function(error) {
                                    $scope.buttonGuardaCotizacion = '';
                                    alertFactory.error('No se puede enviar el correo');
                                });
                            }
                            $scope.buttonGuardaCotizacion = '';
                        }, function (error) {
                            alertFactory.error("Error al obtener información para el mail");
                            $scope.buttonGuardaCotizacion = '';
                        });
                        break;
                    case 4:
                        location.href = '/cotizacionconsulta';
                        break;
                    default:
                        $scope.buttonGuardaCotizacion = '';
                        alertFactory.info('Debe seleccionar partidas para aprobar.');
                }

            } else {
                $scope.buttonGuardaCotizacion = '';
                alertFactory.success('Finalizó sin respuesta.');
            }
        }, function(error) {
            $scope.buttonGuardaCotizacion = '';
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

    $scope.OpenModalFactura = function(no, cf, ct) {
        $scope.idOrden = no;
        $scope.cotizacionFactura = cf;
        $scope.cotizacionTotal = ct;
        $scope.alert_respuesta = false;

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
            }, function(error) {
                console.log(error);
            });
        }
    }

    $scope.subirEvidencias = function() {
        var evidencia_file = $(".inputfile-3").val();
        if (evidencia_file == '') {
            alertFactory.warning("Selecciona un archivo.");

        }
        else{
            $(".btn-evidencia").attr("disabled","disabled");

            detalleRepository.postSubirEvidencia().then(function(result) {
                var Respuesta = result;
                document.getElementById("frm_evidencia").reset();
                $(".lbl_evidencia").text('Seleccionar archivo');

                var _nombre = Respuesta.data.data[0].nombre;
                var _descri = '';
                var _ruta = Respuesta.data.data[0].PathDB;
                var _orden = Respuesta.data.data[0].Param.idOrden;


                consultaCitasRepository.agregarEvidencias( _nombre, _descri, _ruta, _orden ).then(function(result) {
                    $scope.getOrdenEvidencias($scope.userData.idUsuario, $scope.numeroOrden);
                    $(".btn-evidencia").removeAttr("disabled");

                });
            }, function(error) {
                console.log(error);
            });
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
                $scope.alert_respuesta = true;
                $(".uploading").hide();
                $(".alert_respuesta").fadeIn();

                Respuesta.data.forEach(function(item, key) {
                    var ServerPath = item.Param.docServer + '/orden/' + item.PathDB;

                    detalleRepository.getGuardarFactura(ServerPath, item.Param.idOrden, item.Param.cotizacionFactura).then(function(result) {
                        // Resultado
                    });
                });

                setTimeout(function() {
                    $("#myModal").modal('hide');
                    $scope.init();
                }, 2000);
            }, function(error) {
                console.log(error);
            });
        }
    }

    $scope.ValidaTerminoTrabajo = function() {
        $scope.class_buttonTerminaTrabajo = 'fa fa-spinner fa-spin';
        detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function(result) {
            if (result.data[0].RealizarOperacion) {
                detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(r_token) {
                    $scope.class_buttonTerminaTrabajo = '';
                    alertFactory.success('Se ha terminado el trabajo');
                                        /*
                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                            if (resp.data.length > 0) {
                                var correoDe = resp.data[0].correoDe;
                                var correoPara = resp.data[0].correoPara;
                                var asunto = resp.data[0].asunto;
                                var texto = resp.data[0].texto;
                                var bodyhtml = resp.data[0].bodyhtml;
                                 commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                                    if (result.data.length > 0) {
                                        console.log('envia correo desde front')
                                    }
                                }, function(error) {
                                    alertFactory.error('No se puede enviar el correo');
                                });
                            }
                        }, function (error) {
                            alertFactory.error("Error al obtener información para el mail");
                        });
                    */
                    $("html, body").animate({
                        scrollTop: 0
                    }, 1000);
                    $scope.init();
                });
            } else {
                $scope.class_buttonTerminaTrabajo = '';
                alertFactory.error('Aun quedan cotizaciones pendientes por revisar');
            }
        });
    }

    $scope.ValidaEntrega = function() {
        detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function(result) {
            if (result.data[0].RealizarOperacion) {
                if ($scope.token_termino == '' || $scope.token_termino === undefined) {
                    alertFactory.error('Introduce el Token de Verificación');
                } else {
                    detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_termino).then(function(r_token) {
                        if (r_token.data[0].Success) {
                            detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(c_token) {
                                alertFactory.success('Se ha pasado a estatus Entrega');
                                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                                            if (resp.data.length > 0) {
                                                var correoDe = resp.data[0].correoDe;
                                                var correoPara = resp.data[0].correoPara;
                                                var asunto = resp.data[0].asunto;
                                                var texto = resp.data[0].texto;
                                                var bodyhtml = resp.data[0].bodyhtml;
                                                 commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                                                        $("html, body").animate({
                                                            scrollTop: 0
                                                        }, 1000);
                                                        $scope.init();
                                                        $scope.token_termino = '';
                                                        $scope.getReporteConformidad($scope.detalleOrden.idOrden);
                                                        console.log('envia correo desde front')
                                                }, function(error) {
                                                    alertFactory.error('No se puede enviar el correo');
                                                });
                                            }
                                        }, function (error) {
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
                                        commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                                                if (resp.data.length > 0) {
                                                    var correoDe = resp.data[0].correoDe;
                                                    var correoPara = resp.data[0].correoPara;
                                                    var asunto = resp.data[0].asunto;
                                                    var texto = resp.data[0].texto;
                                                    var bodyhtml = resp.data[0].bodyhtml;
                                                     commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                                                            $("html, body").animate({
                                                                scrollTop: 0
                                                            }, 1000);
                                                            $scope.init();
                                                            $scope.token_termino = '';

                                                            $scope.getReporteConformidad($scope.detalleOrden.idOrden);
                                                            console.log('envia correo desde front')

                                                    }, function(error) {
                                                        alertFactory.error('No se puede enviar el correo');
                                                    });
                                                }
                                            }, function (error) {
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

    $scope.ValidaUtilidad = function() {
        if ($scope.token_utilidad == '' || $scope.token_utilidad === undefined) {
            alertFactory.error('Introduce el Token de Verificación');
        } else {
            detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_utilidad).then(function(r_token) {
                if (r_token.data[0].Success) {
                        $scope.token_utilidad = '';
                            detalleRepository.tokenEstatus($scope.detalleOrden.idOrden).then(function(resp) {});
                            detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(result) {
                                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                                        if (resp.data.length > 0) {
                                            var correoDe = resp.data[0].correoDe;
                                            var correoPara = resp.data[0].correoPara;
                                            var asunto = resp.data[0].asunto;
                                            var texto = resp.data[0].texto;
                                            var bodyhtml = resp.data[0].bodyhtml;
                                             commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                                                    console.log('envia correo desde front')
                                                    location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4';
                                                    //$scope.init();
                                            }, function(error) {
                                                alertFactory.error('No se puede enviar el correo');
                                            });
                                        }
                                    }, function (error) {
                                        alertFactory.error("Error al obtener información para el mail");
                                    });
                            });
                } else {
                    alertFactory.error(r_token.data[0].Msg);
                    $scope.token_termino = '';
                }
            });
        }
    }

    $scope.RechazarTrabajo = function() {
        swal({
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
                detalleRepository.rechazaTrabajo($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(Rechazado) {
                      commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                            if (resp.data.length > 0) {
                                var correoDe = resp.data[0].correoDe;
                                var correoPara = resp.data[0].correoPara;
                                var asunto = resp.data[0].asunto;
                                var texto = resp.data[0].texto;
                                var bodyhtml = resp.data[0].bodyhtml;
                                 commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                                        $("html, body").animate({
                                            scrollTop: 0
                                        }, 1000);
                                        $scope.init();
                                        swal("", "Se ha rechazado el trabajo", "success");
                                        console.log('envia correo desde front')
                                }, function(error) {
                                    alertFactory.error('No se puede enviar el correo');
                                });
                            }
                        }, function (error) {
                            alertFactory.error("Error al obtener información para el mail");
                        });
                });
            });
    }

    $scope.OpenModalShowFactura = function() {
        $("#ModalShowFactura").modal();
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
            detalleRepository.postAcciones($scope.comentaAccion, $scope.fechaAccion, $scope.userData.idUsuario, $scope.idOrdenURL).then(function(result) {
                if (result.data.length > 0) {
                    alertFactory.success('Se inserto correctamente la Acción');
                    $scope.getOrdenDetalle($scope.userData.idUsuario, $scope.numeroOrden);
                    $scope.comentaAccion = "";
                    $scope.fechaAccion = "";
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
        location.href = '/nuevacita?economico=' + $scope.detalleOrden.numeroEconomico;
    };

    $scope.validateEstatusAprobacion = function (){
        if ($scope.userData.manejoUtilidad == 1) {
            $scope.enviaAprobacion();

        }else{
            $scope.estatusAprobacion();
        }

    }

    //utilidad
    $scope.enviaAprobacion = function () {
        var uitilidad = ( $scope.totalSumaVenta - $scope.totalSumaCosto)/$scope.totalSumaVenta;
        var margen = (($scope.totalSumaVenta -$scope.totalSumaCosto)*100)/ $scope.totalSumaVenta;


        var UtilidadNeta = ($scope.userData.porcentajeUtilidad * .01);

         if (UtilidadNeta >uitilidad) {

                swal({
                title: "La utilidad es menor a lo esperado",
                text: "¿Desea continuar con el margen de "+margen.toFixed(2) +"%?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#65BD10",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                cancelButtonColor: "#DD083F",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                   utilidadesRepository.putUtilidad($scope.idOrden, $scope.userData.idUsuario, margen.toFixed(2)).then(function(result) {
                        if (result.data.length > 0) {
                            if (result.data[0].idAprobacionUtilidad >0 ) {
                                swal('La orden se encuentra en espera de Aprobación de Utilidad');
                                $scope.margen = margen;
                                $scope.show_tokenMargen=true;

                                 commonFunctionRepository.dataMailUtilidad($scope.idOrden, $scope.userData.idUsuario, $scope.cotizaciones[0].idCotizacion).then(function (resp) {
                                    if (resp.data.length > 0) {
                                        var correoDe = resp.data[0].correoDe;
                                        var correoPara = resp.data[0].correoPara;
                                        var asunto = resp.data[0].asunto;
                                        var texto = resp.data[0].texto;
                                        var bodyhtml = resp.data[0].bodyhtml;
                                         commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                                                //$scope.estatusAprobacion(); 
                                            alertFactory.info('Se notifico por correo la utilidad');
                                                
                                        }, function(error) {
                                            alertFactory.error('No se puede enviar el correo');
                                        });
                                    }
                                }, function (error) {
                                    alertFactory.error("Error al obtener información para el mail");
                                });
                            }else{
                                swal('La orden se encuentra en espera de Aprobación de Utilidad');
                            }
                            
                        }
                    }, function(error) {
                        alertFactory.error('No se puede guardar accion, intente mas tarde o comuniquese con el administrador');
                    });
                   
                }
            });

        }else{
            $scope.estatusAprobacion();
        }


    }

    $scope.estatusUtilidad = function() {
        utilidadesRepository.getValidacionAprobacion($scope.idOrden).then(function(result) {
            if (result.data.length > 0) {
                if (result.data[0].idAprobacionUtilidad>0) {
                    if (result.data[0].estatusAprobacion == 1) {
                         $scope.show_tokenMargen=true;
                    }else{
                        $scope.show_tokenMargen=false;
                    }

                }else{
                    $scope.show_tokenMargen=false;
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
        function (isConfirm) {
            if (isConfirm) {
                detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(result) {
                        commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                            if (resp.data.length > 0) {
                                var correoDe = resp.data[0].correoDe;
                                var correoPara = resp.data[0].correoPara;
                                var asunto = resp.data[0].asunto;
                                var texto = resp.data[0].texto;
                                var bodyhtml = resp.data[0].bodyhtml;
                                 commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                                        console.log('envia correo desde front')
                                        location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4';
                                        //$scope.init();
                                }, function(error) {
                                    alertFactory.error('No se puede enviar el correo');
                                });
                            }
                        }, function (error) {
                            alertFactory.error("Error al obtener información para el mail");
                        });
                });
                swal("Orden en aprobación!");
            } else {
                swal("La Orden no se envió a aprobación!");
            }
        });
    };


    $scope.aprobarProvision = function (provision){

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
         function (isConfirm) {
            if (isConfirm) {

                swal("Proceso Realizado!");

               /* provisionesRepository.putAprobacionProvision(provision.idTrabajo, $scope.userData.idUsuario ).then(function (res) {

                    if (res.data[0].id == 1) {
                         swal("Proceso Realizado!");
                        $scope.getAprobacionProvision();
                    }else if (res.data[0].id  == 2) {
                         swal("Ya se encuentra procesada");
                    }
                }, function (error) {
                    alertFactory.error("Error al cargar la orden");
                });*/
            }
        });


    };
});
