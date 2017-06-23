registrationModule.controller('comprobanteRecepcionController', function($scope, $route, $modal, $rootScope, $routeParams, localStorageService, alertFactory, globalFactory, consultaCitasRepository, ordenServicioRepository, cotizacionRepository, trabajoRepository, uploadRepository, userFactory, commonFunctionRepository) {
    $scope.numeroOrden = $routeParams.orden;
    $scope.validateAprobacion = true;

    $scope.init = function() {
        userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        $scope.getdatosComprobante(1)
        $scope.getOrdenDetalle(1, $scope.numeroOrden)
    };

    $scope.getdatosComprobante = function(idTipoUnidad) {
        consultaCitasRepository.getdatosComprobante(idTipoUnidad).then(function(result) {
            if (result.data.success == true) {
                    $scope.modulosComprobante = result.data.data;
            } else {
                alertFactory.error('No pueden mostrar los registros para el comprobante de recipción');
            }
        }, function(error) {
            alertFactory.error(result.msg);
        });
    }

    $scope.getOrdenDetalle = function(idUsuario, orden) {
        consultaCitasRepository.getOrdenDetalle(idUsuario, orden).then(function(result) {
            if (result.data.length > 0) {
                $scope.detalleOrden = result.data[0];
                $scope.idOrdenMaestro = result.data[0].idOrden;
            }
        }, function(error) {
            alertFactory.error('No se puede obtener los detalles de la orden');
        });
    }

    $scope.menu = function(data) {
        $scope.show_exteriores = false;
        $scope.show_interiores = false;
        $scope.show_accesorios = false;
        $scope.show_componentes = false;
        $scope.show_documentos = false;
        $scope.show_tablero = false;
        $scope.show_unidad = false;
        switch (data) {
            case 0:
                $scope.show_exteriores = true;
                break;

            case 1:
                $scope.show_interiores = true;
                break;

            case 2:
                $scope.show_accesorios = true;
                break;

            case 3:
                $scope.show_componentes = true;
                break;

            case 4:
                $scope.show_documentos = true;
                break;

            case 5:
                $scope.show_tablero = true;
                break;

            case 6:
                $scope.show_unidad = true;
                break;
        }
    }

    $scope.addComprobanteRecepcion = function(obj) {

        var contador = 0;
        var contadorTotal = 0;

        angular.forEach(obj,function(valor,key){
            if(valor.indexComprobante <= 5){
                angular.forEach(valor.detalle, function(valor2, key) {
                    contadorTotal += 1;
                });
            }
        });
        angular.forEach(obj, function(value, key) {
            if(value.indexComprobante <= 5){
                angular.forEach(value.detalle, function(value2, key) {
                    if (value2.select == 0 || value2.select == 1)
                        contador++;

                    if (value2.selectTxt != undefined && value2.selectTxt != "")
                        contador++;
                });
            }
        });
        if (contadorTotal == contador) {
            $scope.validateAprobacion = false;

        } else {
            $scope.validateAprobacion = true;
        }
    }

    $scope.nuevoComprobanteRecepcion = function(obj) {
        $scope.numeroComprobanteRecepcion = 0;
        $scope.class_buttonRecepcion = 'fa fa-spinner fa-spin';
        angular.forEach(obj, function(value, key) {
            consultaCitasRepository.agregarModuloComprobante(value.idCatalogoModuloComprobante, $scope.numeroOrden, $scope.userData.idUsuario).then(function(result) {
                $scope.moduloComprobante = result.data[0].idModuloComprobante;
                if (result.data[0].idModuloComprobante > 0) {
                    $scope.idModuloComprobante = result.data[0].idModuloComprobante;
                    angular.forEach(value.detalle, function(value2, key) {

                        consultaCitasRepository.agregarDetalleModuloComprobante(value2.select, value2.idCatalogoDetalleModuloComprobante, $scope.idModuloComprobante, value2.selectTxt).then(function(result) {
                            $scope.numeroComprobanteRecepcion = $scope.numeroComprobanteRecepcion + 1;
                                if($scope.numeroComprobanteRecepcion == 1){
                                  $scope.comprobanteRecepcion();
                                  $scope.estatusRecepcion($scope.userData.idUsuario, $scope.idOrdenMaestro);
                                }
                            if (result.data[0].idDetalleModuloComprobante > 0) {

                            }
                        });
                    });
                }
            });
            setTimeout(function () {
              location.href = '/detalle?orden=' + $scope.numeroOrden +'&estatus='+3;
             }, 10000);
        });
    }

    $scope.estatusRecepcion = function(idUsuario, idOrden) {
        consultaCitasRepository.estatusOrdenRecepcion(idUsuario, idOrden).then(function(result) {
            if (result.data.length > 0) {

            }
        }, function(error) {
            alertFactory.error('No se puede obtener los detalles de la orden');
        });

        commonFunctionRepository.dataMail(idOrden, idUsuario).then(function (resp) {
        if (resp.data.length > 0) {
            var correoDe = resp.data[0].correoDe;
            var correoPara = resp.data[0].correoPara;
            var asunto = resp.data[0].asunto;
            var texto = resp.data[0].texto;
            var bodyhtml = resp.data[0].bodyhtml;
             commonFunctionRepository.sendMail(correoDe,correoPara,asunto,texto,bodyhtml,'','').then(function(result) {
                if (result.data.length > 0) {
                }
            }, function(error) {
                alertFactory.error('No se puede enviar el correo');
            });
        }
    }, function (error) {
        alertFactory.error("Error al obtener información para el mail");
    });

}

    $scope.comprobanteRecepcion = function() {
            consultaCitasRepository.getDatosRecepcion($scope.idOrdenMaestro).then(function(result) {
                if (result.data.length > 0) {
                    for(var i = 0; i < result.data.length; i++){
                        if(result.data[i].id == 1) var ext_Claxon = result.data[i].accion;
                        if(result.data[i].id == 2) var ext_TaponGasolina = result.data[i].accion;
                        if(result.data[i].id == 3) var ext_TaponLlantas = result.data[i].accion;
                        if(result.data[i].id == 4) var ext_FarosDelanteros = result.data[i].accion;
                        if(result.data[i].id == 5) var ext_Antena = result.data[i].accion;
                        if(result.data[i].id == 6) var ext_Emblemas = result.data[i].accion;
                        if(result.data[i].id == 7) var ext_Cristales = result.data[i].accion;
                        if(result.data[i].id == 8) var int_EspejoRetrovisor = result.data[i].accion;
                        if(result.data[i].id == 9) var int_Radio = result.data[i].accion;
                        if(result.data[i].id == 10) var int_CinturonSeguridad = result.data[i].accion;
                        if(result.data[i].id == 11) var int_ManijasSeguros = result.data[i].accion;
                        if(result.data[i].id == 12) var int_Tapetes = result.data[i].accion;
                        if(result.data[i].id == 13) var int_Ac = result.data[i].accion;
                        if(result.data[i].id == 14) var int_BolsaAireDelantera = result.data[i].accion;
                        if(result.data[i].id == 15) var int_BolsaAireLateral = result.data[i].accion;
                        if(result.data[i].id == 16) var int_LlavesUnidad = result.data[i].accion;
                        if(result.data[i].id == 17) var acs_Reflejantes = result.data[i].accion;
                        if(result.data[i].id == 18) var acs_Extintor = result.data[i].accion;
                        if(result.data[i].id == 19) var acs_LlantaRefaccion = result.data[i].accion;
                        if(result.data[i].id == 20) var acs_CableCorriente = result.data[i].accion;
                        if(result.data[i].id == 21) var acs_PeliculaAntiasalto = result.data[i].accion;
                        if(result.data[i].id == 22) var com_TaponAceite = result.data[i].accion;
                        if(result.data[i].id == 23) var com_TaponRadiador = result.data[i].accion;
                        if(result.data[i].id == 24) var com_VarillaAceite = result.data[i].accion;
                        if(result.data[i].id == 25) var com_Bateria = result.data[i].accion;
                        if(result.data[i].id == 26) var com_TaponMotor = result.data[i].accion;
                        if(result.data[i].id == 27) var doc_PolizaSeguro = result.data[i].accion;
                        if(result.data[i].id == 28) var doc_TarjetaCirculacion = result.data[i].accion;
                        if(result.data[i].id == 29) var tab_Descripcion = result.data[i].descripcion;
                        if(result.data[i].id == 30) var tab_Odometro = result.data[i].descripcion;
                        if(result.data[i].id == 31) var ubi_ParteDerechaDesc = result.data[i].descripcion;
                        if(result.data[i].id == 32) var ubi_DelanteraDesc = result.data[i].descripcion;
                        if(result.data[i].id == 33) var ubi_TechoDesc = result.data[i].descripcion;
                        if(result.data[i].id == 34) var ubi_TraseraDesc = result.data[i].descripcion;
                        if(result.data[i].id == 35) var ubi_ParteIzquierdaDesc = result.data[i].descripcion;
                    }
                var data = {
                    "DatosUnidad":
                        {
                        "ext_Claxon": ext_Claxon,
                        "ext_TaponGasolina": ext_TaponGasolina,
                        "ext_TaponLlantas": ext_TaponLlantas,
                        "ext_FarosDelanteros": ext_FarosDelanteros,
                        "ext_Antena": ext_Antena,
                        "ext_Emblemas": ext_Emblemas,
                        "ext_Cristales": ext_Cristales,
                        "int_EspejoRetrovisor": int_EspejoRetrovisor,
                        "int_Radio": int_Radio,
                        "int_CinturonSeguridad": int_CinturonSeguridad,
                        "int_ManijasSeguros": int_ManijasSeguros,
                        "int_Tapetes": int_Tapetes,
                        "int_Ac": int_Ac,
                        "int_BolsaAireDelantera": int_BolsaAireDelantera,
                        "int_BolsaAireLateral": int_BolsaAireLateral,
                        "int_LlavesUnidad": int_LlavesUnidad,
                        "acs_Reflejantes": acs_Reflejantes,
                        "acs_Extintor": acs_Extintor,
                        "acs_LlantaRefaccion": acs_LlantaRefaccion,
                        "acs_CableCorriente": acs_CableCorriente,
                        "acs_PeliculaAntiasalto": acs_PeliculaAntiasalto,
                        "com_TaponAceite": com_TaponAceite,
                        "com_TaponRadiador": com_TaponRadiador,
                        "com_VarillaAceite": com_VarillaAceite,
                        "com_Bateria": com_Bateria,
                        "com_TaponMotor": com_TaponMotor,
                        "doc_PolizaSeguro": doc_PolizaSeguro,
                        "doc_TarjetaCirculacion": doc_TarjetaCirculacion,
                        "tab_Descripcion": tab_Descripcion,
                        "tab_Odometro": tab_Odometro,
                        "ubi_ParteDerechaDesc": ubi_ParteDerechaDesc,
                        "ubi_DelanteraDesc": ubi_DelanteraDesc,
                        "ubi_TechoDesc": ubi_TechoDesc,
                        "ubi_TraseraDesc": ubi_TraseraDesc,
                        "ubi_ParteIzquierdaDesc": ubi_ParteIzquierdaDesc
                        }
                    }
                }
                    var jsonData = {
                        "template": {
                            "name": "ASEUnidad_rpt"
                        },
                        "data": data
                    }
                consultaCitasRepository.callExternalPdf(jsonData, $scope.idOrdenMaestro).then(function (result) {
                    setTimeout(function () {
                          var url = $rootScope.docServer + result.data;
                          var a = document.createElement('a');
                          a.href = url;
                          a.download = 'ComprobanteRecepcion';
                          a.click();
                          $scope.$apply( function () {
                                $scope.class_buttonRecepcion = 'glyphicon glyphicon-ok';
                          });
                     }, 5000);
                });
            });
        }
});
