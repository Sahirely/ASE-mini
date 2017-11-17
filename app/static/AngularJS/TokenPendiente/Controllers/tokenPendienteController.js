registrationModule.controller('tokenPendienteController', function($scope, $modal, userFactory, $rootScope, $routeParams, $location, localStorageService, alertFactory, globalFactory, trabajoRepository, ordenServicioRepository, cotizacionConsultaRepository, tokenPendienteRepository, loginRepository) {
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
            if($scope.userData != undefined){
                $scope.idOperacion = $scope.userData.idOperacion;
                $scope.idUsuario = $scope.userData.idUsuario;
                $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada; 
                        $scope.showButtonSwitch($scope.userData.idRol);
                        if ($scope.userData.idRol == 2) {
                            $scope.show_sumatorias = true;
                        }; 
                if (localStorageService.get('ord') != undefined && localStorageService.get('ord') != null) {
                    var orden = localStorageService.get('ord')
                    $scope.getOrdenesURL(orden, $scope.idUsuario);
                    localStorageService.remove('ord');
                }
            }else{
                $scope.showButtonSwitch(1);
                $scope.show_sumatorias = true;
            }     
        $scope.show_proceso = true;
        $scope.show_entrega = false;
        $scope.muestraTabla = false;
        $scope.show_sumatorias = false;
        $scope.ZonasSeleccionadas[0] = "0";
        $scope.obtieneDatoUrl();
        $scope.obtieneNivelZona();
        $scope.devuelveEjecutivos();

        $scope.btnSwitch.classCosto = 'btn btn-success';
        $scope.btnSwitch.classVenta = 'btn btn-default';
    };

    $scope.obtieneDatoUrl = function () {
        var url = location.search.replace("?", "");
        var arrUrl = url.split("&");
        var urlObj = {};
        for (var i = 0; i < arrUrl.length; i++) {
            var x = arrUrl[i].split("=");
            urlObj[x[0]] = x[1]
        }
        $scope.user = urlObj.user;
        $scope.orden = urlObj.orden;
        //urlObj.user == 'null' ? $scope.user = 0 : $scope.user = urlObj.user; 
            if(url == ''){
                userFactory.ValidaSesion();
                //alertFactory.info('Variable not defined.');
            }else{
                //alertFactory.info('Variable por URL.');
                var idUsuario = parseInt($scope.user);
                $scope.obtieneUsuario(idUsuario);
            }
    }
    $scope.buscaInfo = function () {
        $scope.getOrdenes();
    }


    $scope.obtieneUsuario = function(idUsuario) {
        tokenPendienteRepository.getinfoUser(idUsuario).then(function(result) {
                if (result.data.length > 0) {
                    $scope.usernombre = result.data[0].nombreUsuario;
                    $scope.userpasword = result.data[0].contrasenia;
                    $scope.userestado = result.data[0].estado;
                    $scope.usernombreCompleto = result.data[0].nombreCompleto;
                    $('#validaContrasena').modal();
                }
            },
            function(error) {
                alertFactory.error('No se pudo ontener el usuario, inténtelo más tarde.');
            });
    };

    $scope.checkContrasea = function () {
      if($scope.supuestaContrasena == $scope.userpasword){
        $scope.login($scope.usernombre, $scope.userpasword);
      }else{
        alertFactory.info('La contraseña que ha introducido es incorrecta!')
        //location.href = '/';
      }
    }

    $scope.checkContraseaEscape = function () {
        location.href = '/';
    }

 $scope.login = function (username, password) {
    loginRepository.login(username, password).then(function (result) {
      if (result.data.data.length > 0) {
        if (result.data.data[0].HasSession == 'False') {
          $scope.userData = userFactory.saveUserData(result.data.data[0]);
          //if ($scope.userData.Operaciones.length > 1) {
          //  $scope.UserIsValid = true;
          //  alertFactory.info('Seleccione una operación para ingresar.');
          // } else {
            var contOpe = 3;//$scope.userData.Operaciones[0].idContratoOperacion;
            var rolUser = 1;//$scope.userData.Operaciones[0].idRol;
           // if (contOpe == 0 && rolUser == 5) {
           //  $scope.userData = userFactory.updateSelectedOperation(contOpe);
           //   $scope.Home();
           // } else
             if (contOpe != 0) {
              $scope.userData = userFactory.updateSelectedOperation(contOpe);
              //location.href = '/tokenPendiente';
              $scope.Home();
            } else {
              alertFactory.info('El usuario no tiene una operación asignada.')
            }
         // }
        } else {
      /*   swal({
            title: '¿Deseas cerrar la sesión anterior?',
            text: "El usuario ya cuenta con una sesión activa.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'Cancelar'
          }, function (isConfirm) {
            if (isConfirm) {*/
              loginRepository.cierraSesionHistorial(result.data.data[0].idUsuario).then(function () {
              });
              $scope.login($scope.usernombre, $scope.userpasword);
          //  }
         // });
          }
      } else {
        alertFactory.info('Usuario y/o contraseña no válidos');
      }
    }, function (error) {
      alertFactory.error('Ocurrio un error al validar sus datos.');
    });
  }

  $scope.Home = function () {
    loginRepository.iniciaSesionHistorial($scope.userData.idUsuario).then(function (result) {
      var sesion = result.data[0].idSesion;
      $scope.userData = userFactory.setActiveSesion(sesion);
      if ($scope.userData.idRol == 1) {
        //alertFactory.info('Bienvenido: ' + $scope.usernombre);
        localStorageService.set('ord', $scope.orden);
        location.href = '/tokenPendiente';
        //$scope.getOrdenesURL($scope.orden, $scope.user);
      }
    });
  }

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

    $scope.getOrdenesURL = function(numeroTrabajo, idUsuario) {
        $('.clockpicker').clockpicker();
        var ejecutivo = ($scope.ejecutivoSelected === null || $scope.ejecutivoSelected === undefined ? 0 : $scope.ejecutivoSelected);

        tokenPendienteRepository.getObtenerOrdenesToken($scope.idContratoOperacion, numeroTrabajo, ejecutivo, idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.ordenesEnProceso = result.data;
                //$scope.cambioFiltro();
                globalFactory.filtrosTabla("ordenservicio", "Ordenes de Servicio", 100);

            }
        });
    }

});
