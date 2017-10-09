
registrationModule.controller('cotizacionConsultaController', function ($scope, $rootScope, $routeParams, userFactory, alertFactory, globalFactory, cotizacionConsultaRepository, nuevoMemorandumRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'aprobaciones';

    $scope.filtroEstatus = '';
    $scope.fechaMes = '';
    $scope.DatesFlag = 0;
    $scope.message = "Buscando...";
    // $scope.userData = {};

    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = [];
    $scope.NivelesZona = [];
    $scope.Zonas = [];
    $scope.estatusDashboard = 0;
    $scope.btnSwitch = {};
    $scope.cotizaciones = [];

    $scope.show_sumatorias = false;

    $scope.sumatoria_conPresupuesto = 0;
    $scope.sumatoria_sinPresupuesto = 0;
    $scope.sumatoria_costo_conPresupuesto = 0;
    $scope.sumatoria_costo_sinPresupuesto = 0;

    $scope.init = function () {
        //para obtener las zonas promero se inicializa la primer zona padre.
        // $('.ocultalo').show();
        // if($scope.userData.tiempoAsignado == 1){
        //   $('.ocultalo').hide();
        // }
        $scope.userData = userFactory.getUserData();
        userFactory.ValidaSesion();
        $scope.estatusDashboard = $routeParams.e;
        if ($scope.estatusDashboard != null || $scope.estatusDashboard != undefined) {
            $scope.filtroEstatus = $scope.estatusDashboard;
        } else {
            $scope.filtroEstatus = '';
        }

        $scope.ZonaFilter = '';

        $scope.consultaCotizacionesFiltros();
        $scope.btnSwitch.classCosto = 'btn btn-success';
        $scope.btnSwitch.classVenta = 'btn btn-default';
        $scope.showButtonSwitch($scope.userData.idRol);

        $scope.ZonasSeleccionadas[0] = "0";
        $scope.obtieneNivelZona();
        //termina el cargado de las Zonas del usuario.
        $scope.devuelveEjecutivos();


        if ($scope.userData.idRol == 2) {
            $scope.show_sumatorias = true;
        };

        $scope.getMemorandums()

    }

    //obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
    $scope.obtieneNivelZona = function () {
        $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.userData.contratoOperacionSeleccionada).then(function (result) {
            $scope.totalNiveles = result.data.length;
            if (result.data.length > 0) {
                $scope.NivelesZona = result.data;
                $scope.devuelveZonas();
            }
        },
            function (error) {
                alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
            });
    }

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function () {
        for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
            cotizacionConsultaRepository.getZonas($scope.userData.contratoOperacionSeleccionada, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function (result) {
                if (result.data.length > 0) {
                    var valueToPush = {};
                    valueToPush.orden = result.data[0].orden;
                    valueToPush.etiqueta = result.data[0].etiqueta;
                    valueToPush.data = result.data;
                    $scope.Zonas.push(valueToPush);
                    //se establece por default cada zona seleccionada en 0
                    $scope.ZonasSeleccionadas[result.data[0].orden] = "0";
                }
            }, function (error) {
                alertFactory.error('No se pudo recuperar información de las zonas');
            });
        }
    };

    $scope.cambioZona = function (id, orden) {
        //al cambiar de zona se establece como zona seleccionada.
        $scope.zonaSelected = id;
        //se limpian los combos siguientes.
        for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
        }

        $scope.changeFilters();
    }

    $scope.changeFilters = function(){
      $scope.ZonaFilter = $scope.ZonasSeleccionadas[$scope.totalNiveles] == '' || $scope.ZonasSeleccionadas[$scope.totalNiveles] == undefined ? 0 : $scope.ZonasSeleccionadas[$scope.totalNiveles];
      // $scope.fechaMesFilter = this.obtieneFechaMes();

      if (($scope.fechaInicio != '' && $scope.fechaInicio !== undefined && $scope.fechaInicio !== null) && ($scope.fechaFin != '' && $scope.fechaFin !== undefined && $scope.fechaFin !== null)){
          $scope.rInicioFilter = $scope.fechaInicio + ' 00:00:00';
          $scope.rFinFilter = $scope.fechaFin + ' 23:59:59';
      } else if ($scope.fecha != '' && $scope.fecha !== undefined && $scope.fecha !==  null){
          $scope.rInicioFilter = $scope.fecha + ' 00:00:00';
          $scope.rFinFilter = $scope.fecha + ' 23:59:59';
      } else if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined){
          $scope.rInicioFilter = $scope.obtienePrimerFechaMes();
          $scope.rFinFilter = $scope.obtieneUltimaFechaMes();
      } else {
          $scope.rInicioFilter = '';
          $scope.rFinFilter = '';
      }

      $scope.idEjecutivo = $scope.ejecutivoSelected === '' || $scope.ejecutivoSelected === undefined || $scope.ejecutivoSelected === null ? 0 : $scope.ejecutivoSelected;

      $('.ordenesPresupuesto1').DataTable().destroy();
      $('.ordenesPresupuesto').DataTable().destroy();
      $('.ordenesSinPresupuesto').DataTable().destroy();
      globalFactory.filtrosTabla("ordenesPresupuesto1", "Ordenes", 100);
      globalFactory.filtrosTabla("ordenesPresupuesto", "Ordenes Con Presupuesto", 100);
      globalFactory.filtrosTabla("ordenesSinPresupuesto", "Ordenes Sin Presupuesto", 100);

      $scope.DatesFlag = 0;
    }

    $scope.getStatistics = function(numeroCoti){
        $scope.estadistica = '';

        cotizacionConsultaRepository.obtieneEstadistica(numeroCoti).then(function (result) {
            if (result.data.length > 0) {
                $scope.estadistica = result.data[0].estadistica;
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las estadisticas');
        });
    }

    $scope.getPercentage = function(numeroCoti){
      $scope.porcentaje = '';

      cotizacionConsultaRepository.obtienePorcentaje(numeroCoti).then(function (result) {
          if (result.data.length > 0) {
              $scope.porcentaje = result.data[0].porcentaje;
          }
      }, function (error) {
          alertFactory.error('No se pudo recuperar información de porcentaje');
      });
    }

    //realiza consulta según filtros
    $scope.consultaCotizacionesFiltros = function () {

        // var Zona = $scope.zonaSelected == '' || $scope.zonaSelected == undefined ? 0 : $scope.zonaSelected;
        // var fechaMes = this.obtieneFechaMes();
        // var rInicio = $scope.fechaInicio == '' || $scope.fechaInicio == undefined ? '' : $scope.fechaInicio;
        // var rFin = $scope.fechaFin == '' || $scope.fechaFin == undefined ? '' : $scope.fechaFin;
        // var fecha = $scope.fecha == '' || $scope.fecha == undefined ? '' : $scope.fecha;

        var idEjecutivo = $scope.ejecutivoSelected == '' || $scope.ejecutivoSelected == undefined ? 0 : $scope.ejecutivoSelected;
        var numeroOrden = $scope.numeroTrabajo == '' || $scope.numeroTrabajo == undefined ? '' : $scope.numeroTrabajo;
        // $scope.promise = cotizacionConsultaRepository.ObtenerOrdenesTipoConsulta(rInicio, rFin, fecha, fechaMes, numeroOrden, Zona, idEjecutivo, $scope.userData.idUsuario, $scope.userData.contratoOperacionSeleccionada, 2).then(function (result) {
        $scope.promise = cotizacionConsultaRepository.getOrdenesAprobacion($scope.userData.contratoOperacionSeleccionada, $scope.userData.idUsuario, numeroOrden, idEjecutivo).then(function (result) {

            if (result.data.length > 0) {
                $scope.cotizaciones = [];
                $scope.cotizacionesSinPresupuesto = [];
                $scope.sumatoria_conPresupuesto = 0;
                $scope.sumatoria_sinPresupuesto = 0;
                $scope.sumatoria_costo_conPresupuesto = 0;
                $scope.sumatoria_costo_sinPresupuesto = 0;
                $scope.cotizacionesRepetidas = [];

                result.data.forEach(function (item) {

                    var existe = false;
                    var x = 0;

                    $scope.cotizaciones.forEach(function (value, key) {
                        if (value.idOrden == item.idOrden) {
                            existe = true;
                            x = key;
                        }
                    });

                    if (!existe) {
                        $scope.cotizaciones.push(item);
                    } else {
                        $scope.cotizacionesRepetidas.push(item);
                        $scope.cotizaciones[x].venta += item.venta;
                        $scope.cotizaciones[x].costo += item.costo;
                    }

                    if (item.tienePresupuesto == 1) {
                        $scope.sumatoria_conPresupuesto += item.venta;
                        $scope.sumatoria_costo_conPresupuesto += item.costo;
                    } else if (item.tienePresupuesto == 2) {
                        $scope.sumatoria_sinPresupuesto += item.venta;
                        $scope.sumatoria_costo_sinPresupuesto += item.costo;
                    } else if (item.tienePresupuesto == 0) {
                        $scope.sumatoria_conPresupuesto += item.venta;
                        $scope.sumatoria_costo_conPresupuesto += item.costo;
                    }


                });

                console.log($scope.cotizacionesRepetidas);
                $('.ordenesPresupuesto1').DataTable().destroy();
                $('.ordenesPresupuesto').DataTable().destroy();
                $('.ordenesSinPresupuesto').DataTable().destroy();
                globalFactory.filtrosTabla("ordenesPresupuesto1", "Ordenes", 100);
                globalFactory.filtrosTabla("ordenesPresupuesto", "Ordenes Con Presupuesto", 100);
                globalFactory.filtrosTabla("ordenesSinPresupuesto", "Ordenes Sin Presupuesto", 100);
            } else {
                $scope.cotizaciones = [];
                $scope.cotizacionesSinPresupuesto = [];
                $scope.sumatoria_conPresupuesto = 0;
                $scope.sumatoria_sinPresupuesto = 0;
                $scope.sumatoria_costo_conPresupuesto = 0;
                $scope.sumatoria_costo_sinPresupuesto = 0;
                $('.ordenesPresupuesto1').DataTable().destroy();
                $('.ordenesPresupuesto').DataTable().destroy();
                $('.ordenesSinPresupuesto').DataTable().destroy();
                globalFactory.filtrosTabla("ordenesPresupuesto1", "Ordenes", 100);
                globalFactory.filtrosTabla("ordenesPresupuesto", "Ordenes Con Presupuesto", 100);
                globalFactory.filtrosTabla("ordenesSinPresupuesto", "Ordenes Sin Presupuesto", 100);
                alertFactory.info('No se Encontraron Ordenes en Aprobación.');
            }

        }, function (error) {
            alertFactory.error('No se encontraron cotizaciones, inténtelo más tarde.')
        });
        // $scope.promise = cotizacionConsultaRepository.get($scope.idUsuario, Zona, idEjecutivo, fechaMes, rInicio, rFin, fecha, numeroOrden, PorOrden, presupuesto)
        // .then(function (result) {
        //         if (result.data.length == 0) {
        //             alertFactory.info('No se encontraron cotizaciones.');
        //         }
        //         if (presupuesto == 1){
        //            $scope.cotizaciones = result.data;
        //            globalFactory.filtrosTabla("ordenesPresupuesto", "Ordenes Con Presupuesto", 10);
        //            //globalFactory.waitDrawDocument("dataTableCotizaciones_", "");
        //         }else if(presupuesto == 0){
        //             $scope.cotizacionesSinPresupuesto = result.data;
        //             globalFactory.filtrosTabla("ordenesSinPresupuesto", "Ordenes Sin Presupuesto", 10);
        //             //globalFactory.waitDrawDocument("dataTableCotizacionesSinPresupuesto","");
        //         }
        //      },
        //      function (error) {
        //          alertFactory.error('No se encontraron cotizaciones, inténtelo más tarde.');
        //      });
    };

    //obtiene los usuarios ejecutivos
    $scope.devuelveEjecutivos = function () {
        cotizacionConsultaRepository.obtieneEjecutivos($scope.userData.contratoOperacionSeleccionada).then(function (ejecutivos) {
            if (ejecutivos.data.length > 0) {
                $scope.listaEjecutivos = ejecutivos.data;
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de los ejecutivos');
        });
    };

    $scope.MesChange = function () {
        if ($scope.DatesFlag == 1 || $scope.DatesFlag == 0){
            $scope.fechaInicio = '';
            $scope.fechaFin = '';
            $scope.fecha = '';
            $scope.DatesFlag = 1;
            $('#txtFIni').datepicker('setDate', null);
            $('#txtFFin').datepicker('setDate', null);
            $('#txtfechaEspecifica').datepicker('setDate', null);

            $scope.changeFilters();
        }
    };

    $scope.RangoChange = function () {
        if ($scope.DatesFlag == 2 || $scope.DatesFlag == 0){
            $scope.fechaMes = '';
            $scope.fecha = '';
            $scope.DatesFlag = 2;
            $('#txtMes').datepicker('setDate', null);
            $('#txtfechaEspecifica').datepicker('setDate', null);
            this.ValidaRangoFechas();

            $scope.changeFilters();
        }
    };

    $scope.FechaChange = function () {
        if ($scope.DatesFlag == 3 || $scope.DatesFlag == 0){
            $scope.fechaMes = '';
            $scope.fechaInicio = '';
            $scope.fechaFin = '';
            $scope.DatesFlag = 3;
            $('#txtMes').datepicker('setDate', null);
            $('#txtFIni').datepicker('setDate', null);
            $('#txtFFin').datepicker('setDate', null);

            $scope.changeFilters();
        }
    };

    $scope.ValidaRangoFechas = function () {
        var isValid = true;

        //valida si están seleccionadas ambas fechas del rango
        if ($scope.fechaInicio != '' && $scope.fechaFin != '') {
            var fechaInicial = $scope.fechaInicio.split('/');
            var fechaFinal = $scope.fechaFin.split('/');

            //valida el anio
            if (parseInt(fechaInicial[0]) > parseInt(fechaFinal[0])) {
                isValid = false;
            } else if (parseInt(fechaInicial[0]) == parseInt(fechaFinal[0])) {
                //valida el mes
                if (parseInt(fechaInicial[1]) > parseInt(fechaFinal[1])) {
                    isValid = false;
                } else if (parseInt(fechaInicial[1]) == parseInt(fechaFinal[1])) {
                    //valida el día
                    if (parseInt(fechaInicial[2]) > parseInt(fechaFinal[2])) {
                        isValid = false;
                    }
                }
            }

            if (isValid == false) {
                $scope.fechaInicio = '';
                $scope.fechaFin = '';
                alertFactory.info('La Fecha de Fin Debe Ser Posterior a la Fecha de Inicio.');
            }
        }
    };

    $scope.obtieneUltimaFechaMes = function(){
        var result = '';
        if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
            var fechaPartida = $scope.fechaMes.split('-');

            if (fechaPartida[0] == 'Enero') {
                var date = new Date(fechaPartida[1], 1, 0);
                result = fechaPartida[1] + '/01/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Febrero') {
                var date = new Date(fechaPartida[1], 2, 0);
                result = fechaPartida[1] + '/02/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Marzo') {
                var date = new Date(fechaPartida[1], 3, 0);
                result = fechaPartida[1] + '/03/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Abril') {
                var date = new Date(fechaPartida[1], 4, 0);
                result = fechaPartida[1] + '/04/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Mayo') {
                var date = new Date(fechaPartida[1], 5, 0);
                result = fechaPartida[1] + '/05/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Junio') {
                var date = new Date(fechaPartida[1], 6, 0);
                result = fechaPartida[1] + '/06/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Julio') {
                var date = new Date(fechaPartida[1], 7, 0);
                result = fechaPartida[1] + '/07/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Agosto') {
                var date = new Date(fechaPartida[1], 8, 0);
                result = fechaPartida[1] + '/08/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Septiembre') {
                var date = new Date(fechaPartida[1], 9, 0);
                result = fechaPartida[1] + '/09/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Octubre') {
                var date = new Date(fechaPartida[1], 10, 0);
                result = fechaPartida[1] + '/10/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Noviembre') {
                var date = new Date(fechaPartida[1], 11, 0);
                result = fechaPartida[1] + '/11/' + date.getDate().toString() + ' 23:59:59' ;
            } else if (fechaPartida[0] == 'Diciembre') {
                var date = new Date(fechaPartida[1], 12, 0);
                result = fechaPartida[1] + '/12/' + date.getDate().toString() + ' 23:59:59' ;
            }
        }
        return result;
    }

    //obtiene el mes en formato de fecha
    $scope.obtienePrimerFechaMes = function () {
        var result = '';
        if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
            var fechaPartida = $scope.fechaMes.split('-');
            if (fechaPartida[0] == 'Enero') {
                result = fechaPartida[1] + '/01/01 00:00:00';
            } else if (fechaPartida[0] == 'Febrero') {
                result = fechaPartida[1] + '/02/01 00:00:00';
            } else if (fechaPartida[0] == 'Marzo') {
                result = fechaPartida[1] + '/03/01 00:00:00';
            } else if (fechaPartida[0] == 'Abril') {
                result = fechaPartida[1] + '/04/01 00:00:00';
            } else if (fechaPartida[0] == 'Mayo') {
                result = fechaPartida[1] + '/05/01 00:00:00';
            } else if (fechaPartida[0] == 'Junio') {
                result = fechaPartida[1] + '/06/01 00:00:00';
            } else if (fechaPartida[0] == 'Julio') {
                result = fechaPartida[1] + '/07/01 00:00:00';
            } else if (fechaPartida[0] == 'Agosto') {
                result = fechaPartida[1] + '/08/01 00:00:00';
            } else if (fechaPartida[0] == 'Septiembre') {
                result = fechaPartida[1] + '/09/01 00:00:00';
            } else if (fechaPartida[0] == 'Octubre') {
                result = fechaPartida[1] + '/10/01 00:00:00';
            } else if (fechaPartida[0] == 'Noviembre') {
                result = fechaPartida[1] + '/11/01 00:00:00';
            } else if (fechaPartida[0] == 'Diciembre') {
                result = fechaPartida[1] + '/12/01 00:00:00';
            }
        }
        return result;
    }

    $scope.AutorizacionDetalle = function (nOrden) {
        location.href = "/detalle?orden=" + nOrden + "&estatus=4";
    };

    $scope.showButtonSwitch = function (usrRol) {
        switch (Number(usrRol)) {
            case 1: //cliente
                $scope.hideSwitchBtn = true;
                $scope.btnSwitch.showCostoVenta = false;

                break;
            case 2: //admin
                $scope.hideSwitchBtn = false;
                $scope.btnSwitch.showCostoVenta = true;
                break;
            case 3: //callcenter
                $scope.hideSwitchBtn = false;
                $scope.btnSwitch.showCostoVenta = true;
                break;
            case 4: //proveedor
                $scope.hideSwitchBtn = true;
                $scope.btnSwitch.showCostoVenta = true;
                break;
            default:
                $scope.hideSwitchBtn = true;
        }
    };

    $scope.getMemorandums = function () {
        nuevoMemorandumRepository.getMemoUsuario($scope.userData.idUsuario)
            .then(function successCallback(response) {
                $scope.Memorandums = []
                response.data.forEach(function (element) {
                    if (element.leido != 1) {
                        if ($scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum) == undefined) {
                            $scope.Memorandums.push({
                                "idMemorandum": element.idMemorandum,
                                "fecha": new Date(element.fecha).toLocaleDateString() + ' ' + new Date(element.fecha).toLocaleTimeString(),
                                "titulo": element.titulo,
                                "descripcion": element.descripcion,
                                "leido": element.leido,
                                "aceptado": element.aceptado,
                                "comentarios": element.comentarios,
                                evidencias: [
                                    {
                                        "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                                        "idEvidencia": element.idEvidencia,
                                        "evidencia": element.evidencia,
                                        "fullPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/' + element.evidencia
                                    }
                                ]
                            })
                        }
                        else {
                            $scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum).evidencias.push({
                                "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                                "idEvidencia": element.idEvidencia,
                                "evidencia": element.evidencia,
                                "fullPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/' + element.evidencia
                            })
                        }
                    }
                }, this);
                if ($scope.Memorandums.find(X => X.leido != 1) != undefined) {
                    $rootScope.hasMemo = true
                    location.href = "/miCuenta"
                }
            })

    }

});
