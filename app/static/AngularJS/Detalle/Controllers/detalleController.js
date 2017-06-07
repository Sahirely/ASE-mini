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
    $scope.HistoricoCotizaciones = [];
    $scope.userData = {};

    $scope.init = function() {
        console.log("##### Mi estatus ", $scope.estatus);
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
                console.log($scope.cotizaciones)
                console.log($scope.cotizaciones[0].detalle)

            } else {
                alertFactory.error('No se puede obtener los documentos de la orden');
            }
        }, function(error) {
            alertFactory.error(result.msg);
        });
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
                $scope.btnEditarIsEnable = false;
                $scope.btnGuardaCotizacionIsEnable = false;
                break;
            default:
                $scope.hideAllButtons();
        }

    };


    $scope.btnSaveCotizacion = function() {

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
                    alertFactory.error('Aprobacion getUpdateStatusPartida error.');
                });

            }

        });


        aprobacionRepository.getUpdateStatusCotizacion($scope.cotizaciones[0].idCotizacion, $scope.idUsuario).then(function(result) {
            if (result.data.length > 0) {
                //$scope.detalleCliente = result.data[0];
                alertFactory.success('Finalizo XD XD');
            }
        }, function(error) {
            alertFactory.error('Aprobacion getUpdateStatusCotizacion error.');
        });



    };


    $scope.showButtonSwitch = function(usrRol) {

        switch (Number(usrRol)) {
            case 1: //cliente
                $scope.hideSwitchBtn = true;
                $scope.btnSwitch.showCostoVenta = true;
                break;
            case 2: //admin
                $scope.hideSwitchBtn = false;
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
        debugger;
        var orden = $scope.numeroOrden;
        var idCotizacion = data.idCotizacion
        location.href = '/editarCotizacion?idCotizacion=' + $routeParams.idCotizacion;
        // + $routeParams.orden+', data='

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

    $scope.OpenModalFactura = function( no, cf, ct) {
        $scope.idOrden = no;
        $scope.cotizacionFactura = cf;
        $scope.cotizacionTotal = ct;

        $(".alert-warning").hide();
        $("#myModal").modal();
        $(".archivos").show();
        $(".uploading").hide();
        $(".btn-cerrar").removeAttr("disabled");
        $(".btn-subir").removeAttr("disabled");

        document.getElementById("frm_subir_factura").reset();

        var inputs = document.querySelectorAll( '.inputfile' );
        Array.prototype.forEach.call( inputs, function( input ){
            var label    = input.nextElementSibling;        
            label.querySelector( 'span' ).innerHTML = 'Seleccionar archivo';
        });
    }

    $scope.HideModalFactura = function() {
        $("#myModal").modal('hide');
    }

    $scope.errores_factura = false;
    $scope.Cargar_Factura = function(){
        var fxml = $(".inputfile-1").val();
        var fpdf = $(".inputfile-2").val();

        if( fxml == '' && fpdf == '' ){
            $(".alert-danger").fadeIn();
            $(".alert-danger span").text('Proporciona al menos uno de los archivos que se piden');
            setTimeout( function(){
                $(".alert-danger").fadeOut('fast');
            },3000 );
        }
        else{
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
                console.log( Respuesta.res.return.codigo );
                if( Respuesta.res.return.codigo == 1 ){
                    $scope.titulo_factura = 'Factura Cargada correctamente';
                }
                else{
                    $scope.titulo_factura = 'Factura no válida';
                }
                    // $("#myModal").modal('hide');
                $.each( Respuesta.res.return, function( key, item){
                    $(".errores_factura").append('<tr> <td width="20%"><strong>'+ key +'</strong></td> <td>'+ item +'</td> </tr>');
                });
                // }
                // else{
                    $(".btn-cerrar").removeAttr("disabled");
                // }

                // if (result.data.length > 0) {
                //     $scope.HistoricoOrden = result.data;
                // }
            }, function(error) {
                console.log( error );
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

    $scope.ValidaTerminoTrabajo = function(){
        console.log("Hola:: ", $scope.detalleOrden.idOrden);
        detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function(result) {
            if( result.data[0].RealizarOperacion ){
                if( $scope.token_termino == '' || $scope.token_termino === undefined ){
                    alertFactory.error('Introduce el Token de Verificación');
                }
                else{
                    detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_termino).then(function(r_token) {
                        if( r_token.data[0].Success ){
                            detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function(r_token) {
                                // Success
                                alertFactory.success( r_token.data[0].Msg );
                                setTimeout( function(){
                                    location.reload();
                                },2000 );
                            });
                        }
                        else{
                            alertFactory.error( r_token.data[0].Msg );   
                            $scope.token_termino = '';
                        }
                    });
                }
            }
            else{
                alertFactory.error('Aun quedan cotizaciones pendientes por revisar');
            }
        });

        // localhost:5300/api/trabajo/validaTerminoTrabajo/?idOrden=107
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

});
