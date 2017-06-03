registrationModule.controller('detalleController', function($scope, $location, cotizacionRepository, consultaCitasRepository, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, detalleRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    //$rootScope.modulo = 'reporteHistorial';
    //Inicializa la pagina

    $scope.idUsuario                = 2;
    $scope.numeroOrden              = $routeParams.orden;
    $scope.idEstatusOrden           = 0;
    $scope.estatus                  = $routeParams.estatus;
    $scope.textoNota                = null;
    $scope.notaTrabajo              = [];
    $scope.HistoricoOrden           = [];
    $scope.IdsCotizacionesPorOrden  = [];
    $scope.x                        = 0;
    $scope.numCotz                  = 0;
    $scope.HistoricoCotizaciones    = [];

    $scope.init = function() {
        console.log( "##### Mi estatus ", $scope.estatus );

        $scope.getHistoricos();

        $scope.getOrdenDetalle($scope.idUsuario, $scope.numeroOrden);
        $scope.getOrdenCliente($scope.idUsuario, $scope.numeroOrden);
        $scope.getOrdenDocumentos($scope.idUsuario, $scope.numeroOrden);
        // Las cotizaciones se muestran desde GetOrdenDetalle
        $scope.setActiveButtons($scope.estatus);
        $scope.enviaNota();

        console.log( '==============================' );
        // console.log( $scope.detalleOrden );
        console.log( $scope.idEstatusOrden );
        console.log( '==============================' );
    };

    $scope.getHistoricos = function() {

        detalleRepository.getHistoricoOrden($scope.numeroOrden).then(function(result) {
            if (result.data.length > 0) {
                $scope.HistoricoOrden = result.data;
                console.log( result.data );
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
                switch( $scope.idEstatusOrden ){
                    case 1: statusCotizacion = 1; break;
                    case 5: statusCotizacion = 3; break;
                }

                $scope.getMostrarCotizaciones($scope.numeroOrden, statusCotizacion)
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

    $scope.getMostrarCotizaciones = function(numeroOrden, estatus) {
        cotizacionRepository.getMostrarCotizaciones(numeroOrden, estatus).then(function(result) {
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
        detalleRepository.insNota(Nota, $scope.numeroOrden, $scope.idUsuario).then(function(result) {
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

        /*
                if (item.canApprove === false) {
                    item.btnClass = "btn btn-default";
                    item.btnStatus = "0";
                    item.btnText = "?";
                    item.btnIcon = "glyphicon glyphicon-ban-circle";
                    return;
                }
        */

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


});
