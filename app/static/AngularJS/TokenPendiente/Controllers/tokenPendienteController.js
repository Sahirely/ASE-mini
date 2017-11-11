registrationModule.controller('tokenPendienteController', function($scope, $modal, userFactory, $rootScope, $routeParams, $location, localStorageService, alertFactory, globalFactory, trabajoRepository, ordenServicioRepository, cotizacionConsultaRepository, tokenPendienteRepository) {
    $rootScope.modulo = 'tokenPendiente'; // <<-- Para activar en que opción del menú se encuentra

    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = {};
    $scope.NivelesZona = [];
    $scope.Zonas = [];
    $scope.idZona = 0;
    $scope.btnSwitch = {};
    $scope.fechaMes = '';
    $scope.fechaInicio = '';
    $scope.fechaFin = '';
    $scope.fecha = '';
    $scope.numeroTrabajo = '';
    $scope.idOrden_Temp = 0;
    $scope.filtroEstatus = '';
    $scope.sumatoria_entrega = 0;
    $scope.sumatoria_proceso = 0;
    $scope.sumatoria_costo_entrega = 0;
    $scope.sumatoria_costo_proceso = 0;

    $scope.Init = function() {
        $scope.userData = userFactory.getUserData();
        $scope.idOperacion = $scope.userData.idOperacion;
        $scope.idUsuario = $scope.userData.idUsuario;
        $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;

        userFactory.ValidaSesion();
        $scope.show_proceso = true;
        $scope.show_entrega = false;
        $scope.muestraTabla = false;
        $scope.show_sumatorias = false;

        $scope.ZonasSeleccionadas[0] = "0";
        $scope.obtieneNivelZona();
        $scope.devuelveEjecutivos();

        $scope.btnSwitch.classCosto = 'btn btn-success';
        $scope.btnSwitch.classVenta = 'btn btn-default';
        $scope.showButtonSwitch($scope.userData.idRol);
        $scope.getOrdenes();
        if ($scope.userData.idRol == 2) {
            $scope.show_sumatorias = true;
        };
    };

    $scope.OpenModal = function(index, Id) {
        $scope.fecha_inicio = '';
        $scope.hora_inicio = '';
        $scope.indiceOrdenes = index;
        $scope.idOrden_Temp = Id;
        $("#myModal").modal();
    }


    $scope.cambioZona = function(id, orden, zona, zonaseleccionada) {
        $scope.zonaSelected = id;
        for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
        }
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

    $scope.MesChange = function() {
        var array = $scope.fechaMes.split('-');
        var mes = '';
        switch (array[0]) {
            case 'Enero':
                mes = '01';
                break;
            case 'Febrero':
                mes = '02';
                break;
            case 'Marzo':
                mes = '03';
                break;
            case 'Abril':
                mes = '04';
                break;
            case 'Mayo':
                mes = '05';
                break;
            case 'Junio':
                mes = '06';
                break;
            case 'Julio':
                mes = '07';
                break;
            case 'Agosto':
                mes = '08';
                break;
            case 'Septiembre':
                mes = '09';
                break;
            case 'Octubre':
                mes = '10';
                break;
            case 'Noviembre':
                mes = '11';
                break;
            case 'Diciembre':
                mes = '12';
                break;
        }

        $scope.fechaMes = array[1] + '/' + mes + '/01';
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

    $scope.detalleOrden = function(orden) {
        location.href = '/detalle?orden=' + orden.numeroOrden + '&estatus=' + orden.idEstatusOrden;
    };

    $scope.obtieneNivelZona = function() {
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

    $scope.getOrdenes = function() {
        $('.clockpicker').clockpicker();
        var ejecutivo = ($scope.ejecutivoSelected === null || $scope.ejecutivoSelected === undefined ? 0 : $scope.ejecutivoSelected);

        tokenPendienteRepository.getObtenerOrdenesToken($scope.idContratoOperacion, $scope.numeroTrabajo, ejecutivo, $scope.userData.idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.ordenesEnProceso = result.data;
                //$scope.cambioFiltro();
                globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 100);

            }
        });
    }

});
