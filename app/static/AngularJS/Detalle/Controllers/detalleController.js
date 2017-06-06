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
        { idstatus: 0, btnText: "No Seleccion", cssClass: "btn btn-success", iconClass: "glyphicon glyphicon-question-sign" },
        { idstatus: 1, btnText: "Aprovado", cssClass: "btn btn-warning", iconClass: "glyphicon glyphicon-ok" },
        { idstatus: 2, btnText: "Rechazado", cssClass: "btn btn-danger", iconClass: "glyphicon glyphicon-remove" }
    ];


    $scope.setApprove = function(item) {

        if (item.Aprueba == 0) {
            item.btnClass = "btn btn-default";
            item.btnStatus = "0";
            item.btnText = "?";
            item.btnIcon = "glyphicon glyphicon-ban-circle";
            return;
        }

        var index = item.btnStatus + 1;

        if (index >= $scope.btnConfig.length) {
            item.btnClass = $scope.btnConfig[0].cssClass;
            item.btnStatus = $scope.btnConfig[0].idstatus;
            item.btnText = $scope.btnConfig[0].btnText;
            item.btnIcon = $scope.btnConfig[0].iconClass;
        } else {
            item.btnClass = $scope.btnConfig[index].cssClass;
            item.btnStatus = $scope.btnConfig[index].idstatus;
            item.btnText = $scope.btnConfig[index].btnText;
            item.btnIcon = $scope.btnConfig[index].iconClass;
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
                break;
            case 3:
                $scope.hideAllButtons();
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

        $scope.btnEditarIsEnable = false;
        $scope.btnGuardaCotizacionIsEnable = true;
        $scope.btnNuevaCotizacionIsEnable = false;
        $scope.btnComprobanteRecepcionIsEnable = false;
        $scope.btnEditarCitaIsEnable = false;
    };



    $scope.getSaldos = function(numeroOrden) {

        aprobacionRepository.getPresupuesto(numeroOrden).then(function(result) {
            if (result.data.length > 0) {
                console.log("entro AQUI");
                $scope.detalleCliente = result.data[0];
                console.log(result.data[0]);
            }
        }, function(error) {
            alertFactory.error('sinsaldos');
        });
    };

     $scope.editarCotizacion = function (data) {
        debugger;
        var orden = $scope.numeroOrden;
        var idCotizacion = data.idCotizacion
        location.href = '/editarCotizacion?idCotizacion='+$routeParams.idCotizacion;
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

    $scope.OpenModalFactura = function(index, Id) {
        $("#myModal").modal();
    }

    $scope.HideModalFactura = function(index, Id) {
            $("#myModal").modal('hide');
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
