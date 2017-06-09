registrationModule.controller('detalleController', function($scope, $location, userFactory, cotizacionRepository, consultaCitasRepository, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, detalleRepository, aprobacionRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    //$rootScope.modulo = 'reporteHistorial';
    //Inicializa la pagina

    $scope.idUsuario = 2;
    $scope.numeroOrden = $routeParams.orden;
    $scope.idEstatusOrden = 0;
    $scope.estatus = $routeParams.estatus;
    $scope.textoNota = null;
    $scope.notaTrabajo = [];
    $scope.HistoricoOrden = [];
    $scope.IdsCotizacionesPorOrden = [];
    $scope.x = 0;
    $scope.numCotz = 0;
    $scope.TieneSaldo = true;
    $scope.totalSumaCosto = 0;
    $scope.totalSumaVenta = 0;
    $scope.btnSwitch ={};
    $scope.userData = {};
    $scope.btn_editarCotizacion = false;

    $scope.init = function() {
        $scope.btnSwitch.classCosto='btn btn-success';
        $scope.btnSwitch.showCostoVenta=true;
        $scope.btnSwitch.classVenta='btn btn-default';
        $scope.checkComprobanteRecepcion();
        $scope.HistoricoCotizaciones = [];
        userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        $scope.getHistoricos();
        $scope.getOrdenDetalle($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.getOrdenCliente($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.getOrdenDocumentos($scope.userData.idUsuario, $scope.numeroOrden);
        $scope.getOrdenEvidencias($scope.userData.idUsuario, $scope.numeroOrden);
        // Las cotizaciones se muestran desde GetOrdenDetalle
        $scope.setActiveButtons($scope.estatus);
        $scope.enviaNota();

        console.log('==============================');
        // console.log( $scope.detalleOrden );
        console.log($scope.idEstatusOrden);
        console.log('==============================');
        $scope.getSaldos($routeParams.orden);
        $('.horaAsignada').clockpicker();

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
        console.log($scope.HistoricoCotizaciones);
    }


    $scope.getOrdenDetalle = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenDetalle(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleOrden = result.data[0];
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
                // switch ($scope.idEstatusOrden) {
                //     case 1:
                //         statusCotizacion = 1;
                //         break;
                //     case 5:
                //         statusCotizacion = 3;
                //         break;
                // }

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
                $scope.detalleEvidencias = result.data;
                console.log($scope.detalleEvidencias)
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los documentos de la orden');
        });
    }

    $scope.getMostrarCotizaciones = function(numeroOrden, estatus, idUsuario) {

        console.log("variables", numeroOrden, estatus, idUsuario);


        cotizacionRepository.getMostrarCotizaciones(numeroOrden, estatus, idUsuario).then(function(result) {
            console.log(result.data)
            if (result.data.success == true) {
                $scope.cotizaciones = result.data.data;

                $scope.getTotales();
                console.log($scope.cotizaciones)
                console.log($scope.cotizaciones[0].detalle)

            } else {
                alertFactory.error('No se puede obtener los documentos de la orden');
            }
        }, function(error) {
            alertFactory.error(result.msg);
        });
    }

    $scope.getTotales = function(){
      $scope.totalSumaCosto = 0;
      $scope.totalSumaVenta = 0;
      if ($scope.cotizaciones != null || $scope.cotizaciones != undefined){
        $scope.cotizaciones.forEach(function(item) {
            item.detalle.forEach(function(itemDetail){
              $scope.totalSumaCosto = $scope.totalSumaCosto + itemDetail.costo;
              $scope.totalSumaVenta = $scope.totalSumaVenta + itemDetail.venta;
            });
        });
        console.log($scope.totalSumaCosto);
        console.log($scope.totalSumaVenta);
      }
    }

    $scope.nuevaCotizacion = function() {
        location.href = '/cotizacionnueva?orden=' + $routeParams.orden;
    }

    $scope.enviaNota = function() {
        $scope.notaTrabajo = [];
        var Nota = $scope.textoNota == '' ? null : $scope.textoNota;
        detalleRepository.insNota(Nota, $scope.numeroOrden, $scope.userData.idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.notaTrabajo = result.data;
            }
        }, function(error) {
            alertFactory.error('No se pudieron obtener las notas');
        });
        $scope.textoNota = null;
    };

    $scope.comprobante = function() {
        location.href = '/comprobanteRecepcion?orden=' + $routeParams.orden;
    };

    $scope.btnConfig = [
        { idStep: 0, idStatus: 1, btnText: "No Seleccion", cssClass: "btn btn-warning", iconClass: "glyphicon glyphicon-question-sign" },
        { idStep: 1, idStatus: 2, btnText: "Aprovado", cssClass: "btn btn-success", iconClass: "glyphicon glyphicon-ok" },
        { idStep: 2, idStatus: 3, btnText: "Rechazado", cssClass: "btn btn-danger", iconClass: "glyphicon glyphicon-remove" }
    ];

    $scope.initApproveButtons = function(item) {

        if (item.Aprueba == 1 && item.idEstatusPartida == 1) {
            item.btnDisabled = false;
        } else {
            item.btnDisabled = true;
            item.btnClass = "btn btn-default";
            item.btnStep = 0;
            if (item.Aprueba == 0 && item.idEstatusPartida == 1) {
                item.btnIcon = "glyphicon glyphicon-ban-circle";
            } else {
                item.btnIcon = $scope.btnConfig[item.idEstatusPartida - 1].iconClass;
            }
        }

    };


    $scope.setApprove = function(item) {

        if (item.btnDisabled == true) return;

        var index = item.btnStep + 1;

        if (index >= $scope.btnConfig.length) {
            item.btnClass = $scope.btnConfig[0].cssClass;
            item.btnStep = $scope.btnConfig[0].idStep;
            item.btnText = $scope.btnConfig[0].btnText;
            item.btnIcon = $scope.btnConfig[0].iconClass;
            item.idStatus = $scope.btnConfig[0].idStatus;
        } else {
            item.btnClass = $scope.btnConfig[index].cssClass;
            item.btnStep = $scope.btnConfig[index].idStep;
            item.btnText = $scope.btnConfig[index].btnText;
            item.btnIcon = $scope.btnConfig[index].iconClass;
            item.idStatus = $scope.btnConfig[index].idStatus;
        }

    };

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
                break;
            case 4: //Botones habilitados para modulo aprobación
                $scope.hideAllButtons();
                //$scope.btnEditarIsEnable = false;
                $scope.btnGuardaCotizacionIsEnable = false;
                $scope.btn_editarCotizacion = true;
                break;
            default:
                $scope.hideAllButtons();
        }

    };


    $scope.btnSaveCotizacion = function() {

        var haveBalance = $scope.checkBalance();

        if (haveBalance == true) {
            $scope.UpdatePartidaStatus();
        } else {
            alertFactory.error('Saldo insuficiente');
        }

    };


    $scope.checkBalance = function() {


        var sumOperacion = 0;

        $scope.cotizaciones[0].detalle.forEach(function(item) {
            if (item.btnStep != 0 && item.btnDisabled == false) {
                sumOperacion += item.venta;
            }
        });

        if (sumOperacion > ($scope.saldos.presupuesto - $scope.saldos.saldoReal)){
            $scope.TieneSaldo = false;
            return false;
        }
        else{
            $scope.TieneSaldo = true;
            return true;
        }

    };

    $scope.UpdatePartidaStatus = function() {

            $scope.cotizaciones[0].detalle.forEach(function(item) {

                if (item.btnStep != 0 && item.btnDisabled == false) {

                    var params = { idUsuario: '', idCotizacion: '', idPartida: '', idEstatusPartida: 0 };
                    params.idUsuario = $scope.idUsuario;
                    params.idCotizacion = $scope.cotizaciones[0].idCotizacion;
                    params.idPartida = item.idPartida;
                    params.idEstatusPartida = item.idStatus;


                    aprobacionRepository.getUpdateStatusPartida(params).then(function(result) {
                        if (result.data.length > 0) {
                            console.log("OK");
                        }
                    }, function(error) {
                        alertFactory.error('Aprobación getUpdateStatusPartida error.');
                    });

                }

            });
              setTimeout(function() {
                          $scope.UpdateCotizacionStatus($scope.cotizaciones[0].idCotizacion, $scope.idUsuario);
                           }, 1000);


        };


        $scope.UpdateCotizacionStatus = function(idCotizacion, idUsuario) {

            aprobacionRepository.getUpdateStatusCotizacion(idCotizacion, idUsuario).then(function(result) {
                if (result.data.length > 0) {

                    var valor = result.data[0].idEstatusCotizacion;
                    console.log("valor de resultado:", valor);

                    switch (Number(valor)) {
                        case 2: //cliente
                            console.log("entro  al caso 2");
                            alertFactory.success('Faltan partidas por aprobar.');
                            $scope.init ();
                            //location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=' + $routeParams.estatus;
                            break;
                        case 3:
                            location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=5';
                            break;
                        case 4:
                            location.href = '/cotizacionconsulta';
                            break;
                        default:
                          alertFactory.info('Debe seleccionar partidas para aprobar.');
                          console.log("sin acción");
                    }

                } else {
                    alertFactory.success('Finalizó sin respuesta.');
                }
            }, function(error) {
                alertFactory.error('Aprobación getUpdateStatusCotizacion error.');
            });

        };


    $scope.showButtonSwitch = function(usrRol) {

        switch (Number(usrRol)) {
            case 1: //cliente
                $scope.hideSwitchBtn = true;
                $scope.btnSwitch.showCostoVenta = true;
                $scope.btn_editarCotizacion = true;
                break;
            case 2: //admin
                $scope.hideSwitchBtn = false;
                $scope.btn_editarCotizacion = true;
                break;
            case 4: //proveedor
                $scope.hideSwitchBtn = true;
                $scope.btnSwitch.showCostoVenta = false;
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
                console.log($scope.saldos);
            }
        }, function(error) {
            alertFactory.error('sinsaldos');
        });
    };

    $scope.editarCotizacion = function(data) {
        var orden = $scope.numeroOrden;
        var idCotizacion = String(data.idCotizacion);
        location.href = '/cotizacionnueva?orden=' + orden + '&idCotizacion=' + idCotizacion;

    }

    //LQMA 07062017
    $scope.getReporteConformidad = function( idOrden ) {
        detalleRepository.getReporteConformidad( idOrden ).then(function(result) {
            if (result.data.length > 0) {
                var rptReporteConformidadData = []
                rptReporteConformidadData.encabezado = result.data[0][0];
                rptReporteConformidadData.partidas = result.data[1];
                rptReporteConformidadData.total = result.data[2][0];
                new Promise(function(resolve, reject) {
                    var rptReporteConformidad = {
                        "encabezado": [
                            rptReporteConformidadData.encabezado
                        ],
                        "partidas":
                            rptReporteConformidadData.partidas
                            ,
                        "total": rptReporteConformidadData.total.total
                    }
                    var jsonData = {
                        "template": { "name": "reporteConformidad_rpt" },
                        "data": rptReporteConformidad //
                    }
                    //console.log(JSON.stringify(jsonData));
                    resolve(jsonData);
                }).then(function(jsonData) {
                    detalleRepository.getGuardaReporteConformidad(jsonData, idOrden).then(function(result) {
                        /*if (result.data.length > 0) {
                            console.log(data)
                            console.log('guardo reporte conformidad')
                        }*/
                    });
                });
                //console.log(JSON.stringify(jsonData));
                //console.log(jsonData);
            }
        }, function(error) {
            alertFactory.error('Error al obtener Reporte Conformidad');
        });
    }


    //********** [ Aqui Comienza Ordenes en Proceso ] *****************************************************************************//
    $scope.pnl_token_admin = false;

    $scope.ShowAutorizacionAdmin = function() {
        $scope.pnl_token_admin = true;
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
        setTimeout(function() { $(".token_admin").focus(); }, 1001);
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

    $scope.errores_factura = false;
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
                // console.log( resul}t );
                // console.log( oReq.status );
                // var Respuesta = JSON.parse(result);
                var Respuesta = result.data;

                $(".alert-warning").show('fast');
                $(".errores_factura").html('');


                document.getElementById("frm_subir_factura").reset();
                $(".uploading").hide();
                console.log(Respuesta.res.return.codigo);
                if (Respuesta.res.return.codigo == 1) {
                    $scope.titulo_factura = 'Factura Cargada correctamente';
                } else {
                    $scope.titulo_factura = 'Factura no válida';
                }
                // $("#myModal").modal('hide');
                $.each(Respuesta.res.return, function(key, item) {
                    $(".errores_factura").append('<tr> <td width="20%"><strong>' + key + '</strong></td> <td>' + item + '</td> </tr>');
                });
                // }
                // else{
                $(".btn-cerrar").removeAttr("disabled");
                // }

                // if (result.data.length > 0) {
                //     $scope.HistoricoOrden = result.data;
                // }
            }, function(error) {
                console.log(error);
                // alertFactory.error('No se puede obtener el historico de la orden.');
            });


            // var form = document.forms.namedItem("frm_subir_factura");

            // var oData = new FormData( form );
            // oData.append('username', 'Chris');

            // var oReq = new XMLHttpRequest();
            // oReq.open( 'post', "api/trabajo/subirArchivo", true );
            // oReq.onload = function( oEvent ){
            //     console.log( oReq.status );
            //     var Respuesta = JSON.parse(oReq.response);

            //     $(".alert-warning").show('fast');
            //     $(".errores_factura").html('');
            //     $(".btn-cerrar").removeAttr("disabled");

            //     document.getElementById("frm_subir_factura").reset();
            //     $(".uploading").hide();
            //     $.each( Respuesta.res.return, function( key, item){
            //         $(".errores_factura").append('<tr> <td width="20%"><strong>'+ key +'</strong></td> <td>'+ item +'</td> </tr>');
            //     });
            // }
            // oReq.send( oData );
        }
    }

    $scope.Cargar_Factura_Tmp = function() {
        var fxml = $(".inputfile-1").val();
        var fpdf = $(".inputfile-2").val();
        // console.log( "hola", $rootScope.docServer );

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
                $scope.alert_respuesta = true;
                $(".uploading").hide();
                $(".alert_respuesta").fadeIn();

                setTimeout( function(){
                    $("#myModal").modal('hide');
                    $scope.init();
                }, 2000 );
                console.log( Respuesta );
                // alert('Subiendo Factura');
            }, function(error) {
                console.log(error);
                // alertFactory.error('No se puede obtener el historico de la orden.');
            });
        }
    }

    $scope.ValidaTerminoTrabajo = function() {
        detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function(result) {
            if (result.data[0].RealizarOperacion) {
                detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(r_token) {
                    console.log( r_token );
                    // Success
                    alertFactory.success( 'Se ha terminado el trabajo' );
                    $("html, body").animate({ scrollTop: 0 }, 1000);
                    $scope.init();
                });
            } else {
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
                                // Success
                                console.log( c_token );
                                alertFactory.success( 'Se ha pasado a estatus Entrega' );
                                $("html, body").animate({ scrollTop: 0 }, 1000);
                                $scope.init();
                                $scope.token_termino = '';

                                $scope.getReporteConformidad( $scope.detalleOrden.idOrden );
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
                                // Success
                                console.log( c_token );
                                alertFactory.success('Se ha pasado a Orden por Cobrar');
                                $("html, body").animate({ scrollTop: 0 }, 1000);
                                $scope.init();
                                $scope.token_termino = '';
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

    $scope.RechazarTrabajo = function(){
        // swal( "hola mundo" );
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
        function(){
            detalleRepository.rechazaTrabajo($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(Rechazado) {
                // Success
                console.log( Rechazado );
                $("html, body").animate({ scrollTop: 0 }, 1000);
                $scope.init();
                swal("", "Se ha rechazado el trabajo", "success");
            });
        });
    }
    //********** [ Aqui Termina Ordenes en Proceso ] ******************************************************************************//

    $scope.subirEvidencias = function() {
        $scope.respuesta = []
        var form = document.forms.namedItem("myForm");
        form.addEventListener('submit', function(ev) {
            var oData = new FormData(form);
            var oReq = new XMLHttpRequest();
            oReq.open('post', "api/trabajo/subirArchivoImg", true);
            oReq.onload = function(oEvent) {
                console.log(oReq.status);
                //console.log(JSON.parse(oReq.response));
                $scope.respuesta = JSON.parse(oReq.response)
                var ruta = $scope.respuesta.res[0].Path
                var rutaCorrecta = ruta.substring(11)
                console.log(rutaCorrecta)
                var urlevidencia = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/evidencia/' + $scope.respuesta.res[0].nombre;
                consultaCitasRepository.agregarEvidencias($scope.respuesta.res[0].nombre, '', rutaCorrecta, $scope.numeroOrden).then(function(result) {
                    if (result.data[0].length > 0) {} else {
                        location.href = '/detalle?orden=' + $scope.numeroOrden + '&estatus=' + 1;
                        alertFactory.success('Se guardo con exito evidencia');
                        //$scope.getOrdenEvidencias($scope.idUsuario, $scope.numeroOrden)
                        var ruta = ''
                        var rutaCorrecta = ''
                        $scope.respuesta = []
                    }
                });
            }
            oReq.send(oData);
            ev.preventDefault();
            // console.log( 'hola mundo' );
        }, false);

    }

    $scope.checkComprobanteRecepcion = function() {
        detalleRepository.getExistsComprobanteRecepcion($scope.numeroOrden, 1).then(function(result) {
            var resultado = result.data[0];
            if (resultado[0].ID != 0) {
                $scope.validaCertificado = 1;
            }else{
                $scope.validaCertificado = 0;
            }
        }, function(error) {
            alertFactory.error('No se puede obtener el historico de la orden.');
        });
    }

    $scope.archivoEvidencia = function(dato){
       if(dato == 1)
        var url = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/comprobanteRecepcion/ComprobanteRecepcion.pdf';
        window.open(url);
    }

    $scope.OpenTrabajo = function(){
        var url = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/hojaTrabajo/Recibo_Comprobante.pdf';
        window.open(url);
    }

    $scope.acciones = function(){
        if (($scope.comentaAccion != undefined && $scope.comentaAccion != "") && ($scope.fechaAccion != undefined && $scope.fechaAccion != "")) {
            detalleRepository.postAcciones($scope.comentaAccion, $scope.fechaAccion, $scope.userData.idUsuario, $scope.idOrdenURL).then(function(result) {
                if (result.data.length > 0) {
                     alertFactory.success('Se inserto correctamente la Acción');
                     $scope.comentaAccion = "";
                     $scope.fechaAccion = "";
                }
            }, function(error) {
                alertFactory.error('No se puede guardar accion, intente mas tarde o comuniquese con el administrador');
            });
        }else{
            alertFactory.info('Porfavor llene todos los campos');
        }
    }
    $scope.recordatorio = function(){
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
        }else{
            alertFactory.info('Porfavor llene todos los campos');
        }
    }
});
