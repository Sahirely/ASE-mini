registrationModule.controller('cotizacionConsultaController', function ($scope, $rootScope, localStorageService, alertFactory, globalFactory, cotizacionConsultaRepository, dashBoardRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
    $rootScope.modulo = 'aprobaciones';

    $scope.filtroEstatus = '';
    $scope.fechaMes = '';
    $scope.message = "Buscando...";
    $scope.userData = localStorageService.get('userData');
    $scope.userData.idTipoUsuario != 4 ? $scope.vistaPrecio = 1 : $scope.vistaPrecio = 2;
    $scope.datosCita = {
            idCita: ''
        }

    $scope.init = function () {
        $scope.devuelveZonas();
        $scope.devuelveEjecutivos();
        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true
        });
        $('#divfechaMes .input-group.date').datepicker({
            minViewMode: 1,
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            todayHighlight: true,
            format: 'MM-yyyy'
        });
        //$scope.Maestro();
    }

    //realiza consulta según filtros
    $scope.consultaCotizacionesFiltros = function() {
            var filtroMes = this.obtieneFechaMes();
    };

    //obtiene las zonas
    $scope.devuelveZonas = function() {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function(zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;
            }
        }, function(error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    };

    //obtiene los usuarios ejecutivos
    $scope.devuelveEjecutivos = function(){
        cotizacionConsultaRepository.obtieneEjecutivos().then(function(ejecutivos){
            if(ejecutivos.data.length > 0){
                $scope.listaEjecutivos = ejecutivos.data;
            }
        }, function(error){
            alertFactory.error('No se pudo recuperar información de los ejecutivos');
        });
    };

    $scope.MesChange = function (){
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
        $scope.fecha = '';
    }

    $scope.RangoChange = function(){
        $scope.fechaMes = '';
        $scope.fecha = '';
    }

    $scope.FechaChange = function(){
        $scope.fechaMes = '';
        $scope.fechaInicio = '';
        $scope.fechaFin = '';
    }

    //obtiene el mes en formato de fecha
    $scope.obtieneFechaMes = function() {
      var result = '';
      if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
          var fechaPartida = $scope.fechaMes.split('-');
          if (fechaPartida[0] == 'Enero') {
              result = '01/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Febrero') {
              result = '02/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Marzo') {
              result = '03/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Abril') {
              result = '04/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Mayo') {
              result = '05/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Junio') {
              result = '06/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Julio') {
              result = '07/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Agosto') {
              result = '08/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Septiembre') {
              result = '09/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Octubre') {
              result = '10/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Noviembre') {
              result = '11/01/' + fechaPartida[1];
          } else if (fechaPartida[0] == 'Diciembre') {
              result = '12/01/' + fechaPartida[1];
          }
        }
      return result;
  };

    //Abre la modal para la cancelación de la orden
    $scope.cancelarAprobacion = function (idTrabajo,idCotizacion) {
        $('.btnTerminarTrabajo').ready(function () {
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
                function (isConfirm) {
                    if (isConfirm) {
                        //$scope.cancelarOrden(idTrabajo,idCotizacion);
                        swal("Trabajo terminado!", "La órden se ha cancelado");
                        location.href = '/cotizacionconsulta';
                    } else {
                        swal("No cancelada");
                    }
                });
        });
    }

    //Obtiene el detalle de una cotización
    //$scope.Detalle = function (idCotizacion, idTaller, idUsuario) {
        //$scope.sumaIvaTotal = 0;
        //$scope.sumaPrecioTotal = 0;
        //$scope.sumaGranTotal = 0;
        //$scope.sumaIvaTotalCliente = 0;
        //$scope.sumaPrecioTotalCliente = 0;
        //$scope.sumaGranTotalCliente = 0;
       // $rootScope.idUsuario;
       //localStorageService.set('usuario', idUsuario);

        //cotizacionConsultaRepository.getDetail(idCotizacion, idTaller, idUsuario).then(function (result) {
            //if (result.data.length > 0) {
                //$scope.total = 0;
                //$scope.articulos = [];
                //var preArticulos = [];

                //$scope.articulos = Enumerable.From(result.data).Distinct(function (x) {
                    //return x.idItem
                //}).ToArray();

                //for (var i = 0; i < $scope.articulos.length; i++) {

                    //Precios (Admin, Callcenter, Taller)
                    //$scope.sumaIvaTotal += ($scope.articulos[i].cantidad * $scope.articulos[i].precio) * ($scope.articulos[i].valorIva / 100);

                    //$scope.sumaPrecioTotal += ($scope.articulos[i].cantidad * $scope.articulos[i].precio);


                    //Precios Cliente
                    //$scope.sumaIvaTotalCliente += ($scope.articulos[i].cantidad * $scope.articulos[i].precioCliente) * ($scope.articulos[i].valorIva / 100);

                    //$scope.sumaPrecioTotalCliente += ($scope.articulos[i].cantidad * $scope.articulos[i].precioCliente);
                //}
                //Total (Admin, Callcenter, Taller)
                //$scope.sumaGranTotal = ($scope.sumaPrecioTotal + $scope.sumaIvaTotal);

                //Total Cliente
                //$scope.sumaGranTotalCliente = ($scope.sumaPrecioTotalCliente + $scope.sumaIvaTotalCliente);

                //$('#cotizacionDetalle').appendTo('body').modal('show');
                //alertFactory.success('Datos cargados.');
            //} else {
                //alertFactory.info('No se pudo obtener el detalle de esta cotización.');
            //}
        //}, function (error) {
            //alertFactory.info('No se pudo obtener el detalle de esta cotización.');
        //});

    //}

    //Obtiene las cotizaciones pendientes por autorizar
    //$scope.Maestro = function () {
         //$('.dataTableCotizaciones').DataTable().destroy();
         //$scope.promise =
            //cotizacionConsultaRepository.get($scope.userData.idUsuario).then(function (result) {
                    //if (result.data.length > 0) {
                        //$scope.cotizaciones = result.data;
                        //globalFactory.waitDrawDocument("dataTableCotizaciones", "OrdenporCobrar");
                    //} else {
                        //alertFactory.info('No se encontraron cotizaciones.');
                    //}
                //},
                //function (error) {
                    //alertFactory.error('No se encontraron cotizaciones, inténtelo más tarde.');
                //});
    //}


    //Redirige los parametros de la cotización para su aprobación
    //$scope.Autorizacion = function (idCita1, idCotizacion1, idUnidad1, numeroCotizacion, idTrabajo1, taller1, idCliente1) {
        //localStorageService.set('cita', idCita1);
        //localStorageService.set('cotizacion', idCotizacion1);
        //localStorageService.set('unidad', idUnidad1);
        //localStorageService.set('estado', 1);
        //localStorageService.set('desc', numeroCotizacion)
        //localStorageService.set('work', idTrabajo1);
        //localStorageService.set('taller', t//aller1);
        //localStorageService.set('citaMsg', //idCita1);
        //localStorageService.set('idCliente1//', idCliente1);
        //$scope.datosCita.idCita = idCita//1;
        //localStorageService.set('citaRef//acciones', $scope.datosCita);
        //location.href = '/cotizacionautor//izacion';
    //}

    //$scope.Nueva = function () {
        //location.href = "/cotizacionnueva";
    //}

   //Cancelamnos la orden cambiamos el estatus de trabajo a orden cancelada
  //$scope.cancelarOrden = function (idTrabajo,idCotizacion) {
       //cotizacionConsultaRepository.cancelaOrden(idTrabajo,idCotizacion).then(function (result) {
            //if (result.data.length > 0) {
                //$scope.ordenCancelada = result.data;
                //alertFactory.success('Orden Cancelada Correctamente');
            //}
        //}, function (error) {
            //alertFactory.error('No se pudo resolver la cancelación');
        //});
    //}




});
