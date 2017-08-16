registrationModule.controller('consultaCitasController', function($scope, $route, $routeParams, userFactory, $modal, $rootScope, cotizacionConsultaRepository, localStorageService, alertFactory, globalFactory, consultaCitasRepository, ordenServicioRepository, cotizacionRepository, trabajoRepository, uploadRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'consultaCitas'; // <<-- Para activar en que opción del menú se encuentra
    $scope.citas = [];
    $scope.filtroEstatus = '';
    $scope.ConTallerActive = true;
    $scope.SinTallerActive = false;
    $scope.userData = userFactory.getUserData();
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = {};
    $scope.NivelesZona = [];
    $scope.Zonas = [];
    $scope.sumatoria_conTaller= 0;
    $scope.sumatoria_sinTaller= 0;
    $scope.btnSwitch = {};
    // var Zona = 0 //$scope.zonaSelected == '' || $scope.zonaSelected == undefined ? null : $scope.zonaSelected;
    // var idEjecutivo = 0 //$scope.ejecutivoSelected == '' || $scope.ejecutivoSelected == undefined ? null : $scope.ejecutivoSelected;
    // var fechaMes = '' //this.obtieneFechaMes() == '' ? null : this.obtieneFechaMes();
    // var rInicio = '' //$scope.fechaInicio == '' || $scope.fechaInicio == undefined ? null : $scope.fechaInicio;
    // var rFin = '' //$scope.fechaFin == '' || $scope.fechaFin == undefined ? null : $scope.fechaFin;
    // var fecha = '' //$scope.fecha == '' || $scope.fecha == undefined ? null : $scope.fecha;
    // var numeroOrden = '' //$scope.numeroTrabajo == '' || $scope.numeroTrabajo == undefined ? null : $scope.numeroTrabajo;
    // var porOrden = 0

    $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada
    var tipoConsulta = 1

    $scope.init = function() {
        userFactory.ValidaSesion();        
    };

    //init de la pantalla tallerCita
    $scope.initTallerCita = function() {
        $scope.show_sumatorias = false;
        $scope.obtieneNivelZona();
        $scope.devuelveEjecutivos();
        $scope.ZonasSeleccionadas[0] = "0";
        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true
        });

        $scope.btnSwitch.classCosto = 'btn btn-success';
        $scope.btnSwitch.classVenta = 'btn btn-default';        
        $scope.showButtonSwitch($scope.userData.idRol);

        $scope.estatusDashboard = $routeParams.e;
        if ($scope.estatusDashboard != null || $scope.estatusDashboard != undefined) {
          $scope.filtroEstatus = $scope.estatusDashboard;
        }else{
          $scope.filtroEstatus = '';
        }

        $scope.cambioFiltro();
        $scope.consultaCotizacionesFiltros();

        if ($scope.userData.idRol == 2) {
            $scope.show_sumatorias = true;
        };
    };

    $scope.cambioFiltro = function(data){

        if (data != undefined) {
           $scope.filtroEstatus = data; 
        };

        if ($scope.filtroEstatus == ''){
          $scope.ConTallerActive = true;
          $scope.SinTallerActive = false;
        } else if ($scope.filtroEstatus == 2){
          $scope.ConTallerActive = true;
          $scope.SinTallerActive = false;
        } else if ($scope.filtroEstatus == 1){
          $scope.ConTallerActive = false;
          $scope.SinTallerActive = true;
        }

    }

    $scope.seleccionarTodo = function(obj) {
            console.log(obj)
        }
        //combina la fecha y hora en una cadena
    var combineDateAndTime = function(date, time) {
        timeString = time.getHours() + ':' + time.getMinutes() + ':00';
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // Jan is 0, dec is 11
        var day = date.getDate();
        var dateString = '' + year + '-' + month + '-' + day;
        var combined = dateString + ' ' + timeString;
        return combined;
    };


    $scope.getTotalOrdenes = function(idContratoOperacion, Zona, usua, idEjecutivo, fechaMes, rInicio, rFin, fecha, numeroOrden, tipoConsulta) {
        $('.dataTableOrdenes').DataTable().destroy();
        $('.dataTableOrdenesSinDatos').DataTable().destroy();
        $scope.sumatoria_conTaller= 0;
        $scope.sumatoria_sinTaller= 0;
        cotizacionConsultaRepository.ObtenerOrdenesTipoConsulta(rInicio, rFin, fecha, fechaMes, numeroOrden, Zona, idEjecutivo, $scope.userData.idUsuario, $scope.idContratoOperacion, tipoConsulta).then(function(result) {
                                                                //rInicio, rFin, fecha, fechaMes, numeroOrden, Zona, idEjecutivo, $scope.userData.idUsuario, $scope.userData.contratoOperacionSeleccionada, 2
            if (result.data.length > 0) {
                $scope.totalOrdenes = result.data;

                $scope.totalOrdenes.forEach(function(item) {

                    if (item.idEstatusOrden==2) {
                        $scope.sumatoria_conTaller += item.venta;
                    }else if (item.idEstatusOrden==1) {
                        $scope.sumatoria_sinTaller += item.venta;
                    }
                   
                });

                globalFactory.filtrosTabla("dataTableOrdenes", "Ordenes", 100);
                globalFactory.filtrosTabla("dataTableOrdenesSinDatos", "Ordenes", 100);
                //globalFactory.filtrosTabla("dataTableOrdenes", "Ordenes");
            }else {
                $scope.totalOrdenes = [];
                globalFactory.filtrosTabla("dataTableOrdenes", "Ordenes", 100);
                globalFactory.filtrosTabla("dataTableOrdenesSinDatos", "Ordenes", 100);
                alertFactory.info('No se Encontraron Citas.');
            }
            // globalFactory.filtrosTabla("dataTableOrdenes", "Ordenes", 10);
            // globalFactory.filtrosTabla("dataTableOrdenesSinDatos", "Ordenes", 10);
        }, function(error) {
            alertFactory.error('No se puenen obtener las órdenes');
        });
    }

    //despliega el div de las tablas
    $scope.slideDown = function() {
        $("#borderTop").slideDown(2000);
    };
    //contrae el div de las tablas
    $scope.slideUp = function() {
        $("#borderTop").slideUp(3000);
    };

    $scope.seleccionarOrden1 = function(obj) {
        location.href = '/detalle?orden=' + obj.numeroOrden + '&estatus=' + 1;
    }

    $scope.seleccionarOrden2 = function(obj) {
        location.href = '/detalle?orden=' + obj.numeroOrden + '&estatus=' + 2;
    }

    //obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
    $scope.obtieneNivelZona = function() {
        $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.userData.contratoOperacionSeleccionada).then(function(result) {
                $scope.totalNiveles = result.data.length;
                if (result.data.length > 0) {
                    $scope.NivelesZona = result.data;
                    $scope.devuelveZonas();
                }
            },
            function(error) {
                alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
            });
    }

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function() {
        for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
            cotizacionConsultaRepository.getZonas($scope.userData.contratoOperacionSeleccionada, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function(result) {
                if (result.data.length > 0) {
                    var valueToPush = {};
                    valueToPush.orden = result.data[0].orden;
                    valueToPush.etiqueta = result.data[0].etiqueta;
                    valueToPush.data = result.data;
                    $scope.Zonas.push(valueToPush);
                    //se establece por default cada zona seleccionada en 0
                    $scope.ZonasSeleccionadas[result.data[0].orden] = "0";
                }
            }, function(error) {
                alertFactory.error('No se pudo recuperar información de las zonas');
            });
        }
    };

    $scope.cambioZona = function(id, orden) {
        //al cambiar de zona se establece como zona seleccionada.
        $scope.zonaSelected = id;
        //se limpian los combos siguientes.
        for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
        }
    }

    //realiza consulta según filtros
    $scope.consultaCotizacionesFiltros = function() {
        $('.dataTableOrdenes').DataTable().destroy();
        $('.dataTableOrdenesSinDatos').DataTable().destroy();
        $scope.cotizaciones = [];
        $scope.cotizacionesSinPresupuesto = [];
        var Zona = $scope.zonaSelected == '' || $scope.zonaSelected == undefined ? 0 : $scope.zonaSelected;
        var idEjecutivo = $scope.ejecutivoSelected == '' || $scope.ejecutivoSelected == undefined ? 0 : $scope.ejecutivoSelected;
        var fechaMes = this.obtieneFechaMes();
        var rInicio = $scope.fechaInicio == '' || $scope.fechaInicio == undefined ? '' : $scope.fechaInicio;
        var rFin = $scope.fechaFin == '' || $scope.fechaFin == undefined ? '' : $scope.fechaFin;
        var fecha = $scope.fecha == '' || $scope.fecha == undefined ? '' : $scope.fecha;
        var numeroOrden = $scope.numeroTrabajo == '' || $scope.numeroTrabajo == undefined ? '' : $scope.numeroTrabajo;
       
        $scope.getTotalOrdenes($scope.idContratoOperacion, Zona, $scope.userData.idUsuario, idEjecutivo, fechaMes, rInicio, rFin, fecha, numeroOrden, tipoConsulta);
    };

    //obtiene los usuarios ejecutivos
    $scope.devuelveEjecutivos = function() {
        cotizacionConsultaRepository.obtieneEjecutivos($scope.userData.contratoOperacionSeleccionada).then(function(ejecutivos) {
            if (ejecutivos.data.length > 0) {
                $scope.listaEjecutivos = ejecutivos.data;
            }
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de los ejecutivos');
        });
    };

    $scope.MesChange = function() {
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
        $scope.fecha = '';
    };

    $scope.RangoChange = function() {
        $scope.fechaMes = '';
        $scope.fecha = '';
        this.ValidaRangoFechas();
    };

    $scope.FechaChange = function() {
        $scope.fechaMes = '';
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
    };

    $scope.ValidaRangoFechas = function() {
        var isValid = true;

        //valida si están seleccionadas ambas fechas del rango
        if ($scope.fechaInicio != '' && $scope.fechaFin != '') {
            var fechaInicial = $scope.fechaInicio.split('/');
            var fechaFinal = $scope.fechaFin.split('/');

            //valida el anio
            if (parseInt(fechaInicial[2]) > parseInt(fechaFinal[2])) {
                isValid = false;
            } else if (parseInt(fechaInicial[2]) == parseInt(fechaFinal[2])) {
                //valida el mes
                if (parseInt(fechaInicial[0]) > parseInt(fechaFinal[0])) {
                    isValid = false;
                } else if (parseInt(fechaInicial[0]) == parseInt(fechaFinal[0])) {
                    //valida el día
                    if (parseInt(fechaInicial[1]) > parseInt(fechaFinal[1])) {
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

    $scope.obtieneFechaMes = function(){
      var result = '';
      if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
          var fechaPartida = $scope.fechaMes.split('-');
          if (fechaPartida[0] == 'Enero') {
              result = fechaPartida[1] + '/01/01' ;
          } else if (fechaPartida[0] == 'Febrero') {
              result = fechaPartida[1] + '/02/01' ;
          } else if (fechaPartida[0] == 'Marzo') {
              result = fechaPartida[1] + '/03/01' ;
          } else if (fechaPartida[0] == 'Abril') {
              result = fechaPartida[1] + '/04/01' ;
          } else if (fechaPartida[0] == 'Mayo') {
              result = fechaPartida[1] + '/05/01' ;
          } else if (fechaPartida[0] == 'Junio') {
              result = fechaPartida[1] + '/06/01';
          } else if (fechaPartida[0] == 'Julio') {
              result = fechaPartida[1] + '/07/01' ;
          } else if (fechaPartida[0] == 'Agosto') {
              result = fechaPartida[1] + '/08/01' ;
          } else if (fechaPartida[0] == 'Septiembre') {
              result = fechaPartida[1] + '/09/01' ;
          } else if (fechaPartida[0] == 'Octubre') {
              result = fechaPartida[1] + '/10/01' ;
          } else if (fechaPartida[0] == 'Noviembre') {
              result = fechaPartida[1] + '/11/01' ;
          } else if (fechaPartida[0] == 'Diciembre') {
              result = fechaPartida[1] + '/12/01' ;
          }
        }
      return result;
    }
    //obtiene el mes en formato de fecha
/*    $scope.obtieneFechaMes = function() {
        var result = '';
        if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
            var fechaPartida = $scope.fechaMes.split('-');
            if (fechaPartida[0] == 'Enero') {
                result = '01/01/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Febrero') {
                result = '01/02/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Marzo') {
                result = '01/03/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Abril') {
                result = '01/04/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Mayo') {
                result = '01/05/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Junio') {
                result = '01/06/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Julio') {
                result = '01/07/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Agosto') {
                result = '01/08/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Septiembre') {
                result = '01/09/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Octubre') {
                result = '01/10/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Noviembre') {
                result = '01/11/' + fechaPartida[1];
            } else if (fechaPartida[0] == 'Diciembre') {
                result = '01/12/' + fechaPartida[1];
            }
        }
        return result;
    }*/

    $scope.actualizarOrden = function(obj) {
        location.href = '/nuevacita?economico=' + obj.numeroEconomico + '&estatus=' + 1;

    }

    $scope.showButtonSwitch = function(usrRol) {
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


});
