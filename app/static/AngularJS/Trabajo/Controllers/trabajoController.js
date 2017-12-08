registrationModule.controller('trabajoController', function($scope, $modal, userFactory, $rootScope, $routeParams, $location, localStorageService, alertFactory, globalFactory, trabajoRepository, ordenServicioRepository, cotizacionConsultaRepository, nuevoMemorandumRepository) {
    $rootScope.modulo = 'ordenServicio'; // <<-- Para activar en que opción del menú se encuentra


    $scope.idOperacion = $scope.userData.idOperacion;
    $scope.idUsuario = $scope.userData.idUsuario;
    $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;

    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = {};
    $scope.NivelesZona = [];
    $scope.ordenesEnProceso = [];
    $scope.ordenesEnEntrega = [];
    $scope.Zonas = [];
    $scope.idZona = 0;
    $scope.btnSwitch = {};
    $scope.DatesFlag = 0;
    $scope.filtroEstatusProc = '55';
    $scope.filtroEstatusEntrega = '67';
    $scope.fechaMes = '';
    $scope.fechaInicio = '';
    $scope.fechaFin = '';
    $scope.fecha = '';
    $scope.numeroTrabajo = '';
    $scope.filtroEstatus = '';
    $scope.DatesFlag = 0;

    $scope.idOrden_Temp = 0;

    //para ocultar la tabla hasta que se realize la primera búsqueda
    $scope.show_grids = false;

    $scope.sumatoria_entrega = 0;
    $scope.sumatoria_proceso = 0;
    $scope.sumatoria_costo_entrega = 0;
    $scope.sumatoria_costo_proceso = 0;

    $scope.Init = function() {
        $scope.userData = userFactory.getUserData();
        userFactory.ValidaSesion();
        $scope.muestraTabla = false;
        $scope.show_sumatorias = false;

        //para obtener las zonas promero se inicializa la primer zona padre.
        $scope.ZonasSeleccionadas[0] = "0";
        // $scope.obtieneNivelZona();
        $scope.obtieneNivelZona();
        //termina el cargado de las Zonas del usuario.
        $scope.devuelveEjecutivos();

        $scope.btnSwitch.classCosto = 'btn btn-success';
        $scope.btnSwitch.classVenta = 'btn btn-default';
        $scope.showButtonSwitch($scope.userData.idRol);

        $scope.estatusDashboard = $routeParams.e;
        if ($scope.estatusDashboard != null || $scope.estatusDashboard != undefined) {
            $scope.filtroEstatus = $scope.estatusDashboard;
            if ($scope.filtroEstatus == 0 || $scope.filtroEstatus == 5) {
                $scope.procesoActive = true;
                $scope.entregaActive = false;
                $scope.filtroEstatusProc = $scope.filtroEstatus;
                $scope.filtroEstatusEntrega = '67';
            } else if ($scope.filtroEstatus == 6 || $scope.filtroEstatus == 7){
                $scope.procesoActive = false;
                $scope.entregaActive = true;
                $scope.filtroEstatusProc = '55';
                $scope.filtroEstatusEntrega = $scope.filtroEstatus;
            }
            $scope.changeFilters();
            $scope.getOrdenes();
        } else {
            $scope.procesoActive = true;
            $scope.entregaActive = false;
            $scope.filtroEstatusProc = '55';
            $scope.filtroEstatusEntrega = '67';
        }

        if ($scope.userData.idRol == 2) {
            $scope.show_sumatorias = true;
        };

        $scope.getMemorandums()


    };

    //obtiene los usuarios ejecutivos
    $scope.devuelveEjecutivos = function() {
        cotizacionConsultaRepository.obtieneEjecutivos($scope.idContratoOperacion).then(function(ejecutivos) {
            if (ejecutivos.data.length > 0) {
                $scope.listaEjecutivos = ejecutivos.data;
            }
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de los ejecutivos');
        });
    };

    $scope.indiceOrdenes = -1;
    $scope.OpenModal = function(index, Id) {
        $scope.fecha_inicio = '';
        $scope.hora_inicio = '';
        $scope.indiceOrdenes = index;
        $scope.idOrden_Temp = Id;
        $("#myModal").modal();
    }

    $scope.fecha_error = false;
    $scope.Guardar_Fecha = function() {
        if ($scope.indiceOrdenes == -1) {
            //console.log('Esta ocurriendo un error, por algun motivo no se esta seleccionando el indice de ragistro');
        } else {
            if ($scope.fecha_inicio == '' || $scope.fecha_inicio === undefined) {
                $scope.fecha_error = true;
                $scope.msg_error = 'Debes ingresar la fecha de Inicio del Trabajo';

                setTimeout(function(argument) {
                    $scope.fecha_error = false;
                    $scope.msg_error = '';
                }, 2000);
            } else if ($scope.hora_inicio == '' || $scope.hora_inicio === undefined) {
                $scope.fecha_error = true;
                $scope.msg_error = 'Debes ingresar la hora de Inicio del Trabajo';

                setTimeout(function(argument) {
                    $scope.fecha_error = false;
                    $scope.msg_error = '';
                }, 2000);
            } else {
                var fechaTrabajo = $scope.fecha_inicio + ' ' + $scope.hora_inicio;

                trabajoRepository.saveFechaTrabajo($scope.idOrden_Temp, fechaTrabajo).then(function(registros) {
                    $scope.ordenes[$scope.indiceOrdenes].fechaInicioTrabajo = fechaTrabajo;
                }, function(error) {
                    alertFactory.error('No se pudo recuperar la respuesta');
                });

                $("#myModal").modal('hide');

            }

        }

    }

    $scope.consultaCotizacionesFiltros = function () {
        $scope.changeFilters();

        if ($scope.ZonaFilter === null && $scope.idEjecutivo === null && $scope.rInicioFilter === null && $scope.rFinFilter === null && $scope.estatusEntregaFilter === null && $scope.estatusProcesoFilter  === null ){
            $scope.consultaCotizacionesSinFiltrosBusqueda();
        }else{
            $scope.getOrdenes();
        }

    }

    $scope.consultaCotizacionesSinFiltrosBusqueda = function () {
      swal({
            title: '¿Desea realizar la búsqueda sin criterios de selección?',
            text: "Al realizar la búsqueda sin criterios, se traerán todos los resultados.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
          }, function (isConfirm) {
            if (isConfirm) {
              $scope.cleanSearch();
              $scope.getOrdenes();
           }
         });
    }

    $scope.cleanSearch = function(){
        //se limpia el filtro de zonas
        for ($scope.x = 0; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
        }

        //se limpia el filtro de ejecutivo
        $scope.ejecutivoSelected = 0;

        //limpiar filtro de estatus
        $scope.filtroEstatusProc = '55';
        $scope.filtroEstatusEntrega = '67';

        //bandera temporal para evitar filtro en fechas y poder limpiar
        $scope.DatesFlag = 4;

        //limpiar filtros de fechas
        $scope.fechaMes = '';
        $scope.fecha = '';
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
        $('#txtMes').datepicker('setDate', null);
        $('#txtfechaEspecifica').datepicker('setDate', null);
        $('#txtFIni').datepicker('setDate', null);
        $('#txtFFin').datepicker('setDate', null);

        //aplicar el cambio con filtros limpios
        $scope.changeFilters();

    }

    $scope.cambioZona = function (id, orden) {
        //al cambiar de zona se establece como zona seleccionada.
        $scope.zonaSelected = id;
        //se limpian los combos siguientes.
        for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
        }

        $scope.changeFilters();
    };

    $scope.selectEstatusEntrega = function (dato){
      $scope.filtroEstatusEntrega = dato;
    }

    $scope.selectEstatusProceso = function (dato){
      $scope.filtroEstatusProc= dato;
    }

    $scope.changeFilters = function(){
      $scope.ZonaFilter = $scope.ZonasSeleccionadas[$scope.totalNiveles] == '' || $scope.ZonasSeleccionadas[$scope.totalNiveles] == undefined || $scope.ZonasSeleccionadas[$scope.totalNiveles] == '0' ? null : $scope.ZonasSeleccionadas[$scope.totalNiveles];

      $scope.idEjecutivo = $scope.ejecutivoSelected === '' || $scope.ejecutivoSelected === undefined || $scope.ejecutivoSelected === null || $scope.ejecutivoSelected === '0' || $scope.ejecutivoSelected === 0 ? null : $scope.ejecutivoSelected;

      $scope.estatusEntregaFilter = $scope.filtroEstatusEntrega === '' || $scope.filtroEstatusEntrega === undefined || $scope.filtroEstatusEntrega === '67' || $scope.filtroEstatusEntrega === 67 || $scope.filtroEstatusEntrega === 0 || $scope.filtroEstatusEntrega === '0' ? null : $scope.filtroEstatusEntrega;

      if ($scope.filtroEstatusProc === undefined || $scope.filtroEstatusProc === null || $scope.filtroEstatusProc === '55'){
        $scope.estatusProcesoFilter = null;
      } else if ($scope.filtroEstatusProc === '5'){
        $scope.estatusProcesoFilter = 0;
      } else if ($scope.filtroEstatusProc === '0'){
        $scope.estatusProcesoFilter = 1;
      }

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
          $scope.rInicioFilter = null;
          $scope.rFinFilter = null;
      }

      $scope.DatesFlag = 0;
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

    $scope.getOrdenesServicio = function(tipoConsulta) {
        $scope.estatusValidador = '!7';
        $('.clockpicker').clockpicker();
        var ejecutivo = ($scope.ejecutivoSelected === null || $scope.ejecutivoSelected === undefined ? 0 : $scope.ejecutivoSelected);

        $scope.numeroTrabajo = '';
        // $('.ordenservicio').DataTable().destroy();
        cotizacionConsultaRepository.ObtenerOrdenesTipoConsulta(
                $scope.fechaInicio,
                $scope.fechaFin,
                $scope.fecha,
                $scope.fechaMes,
                $scope.numeroTrabajo,
                $scope.zonaSelected,
                ejecutivo,
                $scope.userData.idUsuario,
                $scope.idContratoOperacion,
                tipoConsulta) // $scope.idUsuario
            .then(function(result) {
                $scope.ordenes = result.data;
                $scope.muestraTabla = true;
                //if ($scope.estatusDashboard == null || $scope.estatusDashboard == undefined) {
                // $scope.menu(0);
                $scope.procesoActive = true;
                //}
                //globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 5);
            });
    };

    $scope.getOrdenes = function() {
        $('#loadModal').modal('show');
        $scope.show_grids = true;

        $scope.estatusValidador = '!7';
        $('.clockpicker').clockpicker();

        $scope.sumatoria_proceso = 0;
        $scope.sumatoria_costo_proceso = 0;

        $scope.sumatoria_entrega = 0;
        $scope.sumatoria_costo_entrega = 0;

        cotizacionConsultaRepository.ObtenerOrdenesDeServicioEnProceso($scope.userData.contratoOperacionSeleccionada, $scope.userData.idUsuario, '', $scope.ZonaFilter, $scope.idEjecutivo, $scope.rInicioFilter, $scope.rFinFilter, $scope.estatusProcesoFilter).then(function(result) {
            if (angular.isArray(result.data)) {
                $scope.ordenesEnProceso = result.data;
                globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 100);

                $scope.ordenesEnProceso.forEach(function(item){
                     $scope.sumatoria_proceso += item.venta;
                     $scope.sumatoria_costo_proceso += item.costo;
                 });
            }else {
              $scope.ordenesEnProceso = [];
              globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 100);
            }
        });
        cotizacionConsultaRepository.ObtenerOrdenesDeServicioEnEntrega($scope.userData.contratoOperacionSeleccionada, $scope.userData.idUsuario, '', $scope.ZonaFilter, $scope.idEjecutivo, $scope.rInicioFilter, $scope.rFinFilter, $scope.estatusEntregaFilter).then(function(result) {
            if (angular.isArray(result.data)) {
                $scope.ordenesEnEntrega = result.data;
                globalFactory.filtrosTabla("ordenservicio2", "Ordenes de Servicio", 100);

                $scope.ordenesEnEntrega.forEach(function(item){
                    $scope.sumatoria_entrega += item.venta;
                    $scope.sumatoria_costo_entrega += item.costo;
                });
            }else{
                $scope.ordenesEnEntrega = [];
                globalFactory.filtrosTabla("ordenservicio2", "Ordenes de Servicio", 100);
            }
        }).finally(function(){
            $('#loadModal').modal('hide');
        });
        // $scope.changeFilters();
    };

    $scope.getOrdenesServicioInit = function(tipoConsulta) {

        $scope.estatusValidador = '!7';
        $('.clockpicker').clockpicker();

        $scope.numeroTrabajo = '';
        //$('.ordenservicio').DataTable().destroy();
        var ejecutivo = ($scope.ejecutivoSelected === null || $scope.ejecutivoSelected === undefined ? 0 : $scope.ejecutivoSelected);

        cotizacionConsultaRepository.ObtenerOrdenesTipoConsulta(
                $scope.fechaInicio,
                $scope.fechaFin,
                $scope.fecha,
                $scope.fechaMes,
                $scope.numeroTrabajo,
                $scope.zonaSelected,
                ejecutivo,
                $scope.userData.idUsuario,
                $scope.idContratoOperacion,
                tipoConsulta) // $scope.idUsuario
            .then(function(result) {

                if (result.data.length > 0) {
                    //rInicio, rFin, fecha, fechaMes, numeroOrden, Zona, idEjecutivo, $scope.userData.idUsuario, $scope.userData.contratoOperacionSeleccionada, 2

                    $scope.ordenes = result.data;
                    // $scope.cambioFiltro();
                    $scope.muestraTabla = true;
                }
                //globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 100);
            });
    };


    $scope.detalleOrden = function(orden) {
        location.href = '/detalle?orden=' + orden.numeroOrden + '&estatus=' + orden.idEstatusOrden;
    };

    // =================================================================================
    //obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
    $scope.obtieneNivelZona = function() {
        // console.log( "idContratoOperacion", $scope.idContratoOperacion );
        $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.idContratoOperacion).then(function(result) {
                $scope.totalNiveles = result.data.length;
                if (result.data.length > 0) {
                    $scope.NivelesZona = result.data;
                    $scope.devuelveZonas();
                }
            },
            function(error) {
                alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
            });
    };

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function() {
        for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
            cotizacionConsultaRepository.getZonas($scope.idContratoOperacion, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function(result) {
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
                $scope.hideSwitchBtn = false;
                $scope.btnSwitch.showCostoVenta = true;
                break;
            default:
                $scope.hideSwitchBtn = true;
        }
    };

    $scope.getMemorandums = function() {
        nuevoMemorandumRepository.getMemoUsuario($scope.userData.idUsuario)
            .then(function successCallback(response) {
                $scope.Memorandums = []
                response.data.forEach(function(element) {
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
                                evidencias: [{
                                    "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                                    "idEvidencia": element.idEvidencia,
                                    "evidencia": element.evidencia,
                                    "fullPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/' + element.evidencia
                                }]
                            })
                        } else {
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
