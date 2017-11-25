registrationModule.controller('dashBoardController', function ($scope, alertFactory, userFactory, $rootScope, localStorageService,tokenPendienteRepository, loginRepository,$route, dashBoardRepository, cotizacionConsultaRepository, configuradorRepository, nuevoMemorandumRepository) {


    $rootScope.modulo = 'home'; // <<-- Para activar en que opción del menú se encuentra

    $scope.tarSelected = null;
    $scope.totalCitas = 0;
    $scope.totalCotizaciones = 0;
    $scope.totalOrdenes = 0;
    $scope.totalProceso = 0;
    $scope.totalOrdenesPorCobrar = 0;




    // $scope.idOperacion           = 2;
    // $scope.idUsuario             = 2;
    // $scope.idContratoOperacion   = 3;

    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = {};
    $scope.NivelesZona = [];
    $scope.Zonas = [];



    //VARIABLES PARA MEMORANDUMS
    $scope.Memorandums = []


    $scope.init = function () {
        $scope.obtieneDatoUrl();
        $scope.userData = userFactory.getUserData();
        if ($scope.userData != undefined) {
                $scope.idOperacion = $scope.userData.idOperacion;
                $scope.idUsuario = $scope.userData.idUsuario;
                $scope.idRol = $scope.userData.idRol;
                // $scope.idRol                 = 4;
                $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;

            //userFactory.ValidaSesion();
            //para obtener las zonas promero se inicializa la primer zona padre.
            $scope.ZonasSeleccionadas[0] = "0";
            $scope.obtieneNivelZona();
            $scope.getMemorandums();
            $scope.LoadData();
        }
    };

    $scope.LoadData = function () {
        $scope.sumatoriaCitas();
        $scope.sumatoriaCotizaciones();
        $scope.sumatoriaOrdenes();
        $scope.sumatoriaOrdenesPorCobrar();
        $scope.sumatoriaProceso();
    }

    $scope.obtieneDatoUrl = function () {
        var url = location.search.replace("?", "");
        var arrUrl = url.split("&");
        var urlObj = {};
        for (var i = 0; i < arrUrl.length; i++) {
            var x = arrUrl[i].split("=");
            urlObj[x[0]] = x[1]
        }
        $scope.user = urlObj.user;
        $scope.numordenURl = urlObj.orden;
        //urlObj.user == 'null' ? $scope.user = 0 : $scope.user = urlObj.user;
        if($scope.user != undefined){
            if(url == ''){
                userFactory.ValidaSesion();
                //alertFactory.info('Variable not defined.');
            }else{
                //alertFactory.info('Variable por URL.');
                var idUsuario = parseInt($scope.user);
                $scope.obtieneUsuario(idUsuario);
            }
        }
    }

    $scope.obtieneUsuario = function(idUsuario) {
        tokenPendienteRepository.getinfoUser(idUsuario, $scope.numordenURl).then(function(result) {
                if (result.data.length > 0) {
                    $scope.usernombre = result.data[0].nombreUsuario;
                    $scope.userpasword = result.data[0].contrasenia;
                    $scope.userestado = result.data[0].estado;
                    $scope.usernombreCompleto = result.data[0].nombreCompleto;
                    //$('#validaContrasena').modal();
                    $scope.login($scope.usernombre, $scope.userpasword);
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
          //var contOpe = 3;
          var contOpe = $scope.userData.Operaciones[0].idContratoOperacion;
          //var rolUser = 1;
          var rolUser = $scope.userData.Operaciones[0].idRol;
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
      if ($scope.userData.idRol == 1 || $scope.userData.idRol == 2 || $scope.userData.idRol == 3 || $scope.userData.idRol == 4 ||$scope.userData.idRol == 5) {
        //alertFactory.info('Bienvenido: ' + $scope.usernombre);
        //localStorageService.set('ord', $scope.orden);
        //location.href = '/detalle?';
          location.href = '/dashboardgeneral';
        //$scope.getOrdenesURL($scope.orden, $scope.user);
      }
    });
  }

    $scope.sumatoriaCitas = function () {
        $scope.totalCitas = 0;
        $scope.totalHorasCitas = 0;
        $scope.totalMontoCitas = 0.00;
        $scope.totalCostoCitas = 0.00;

        dashBoardRepository.getTotalCitas($scope.idOperacion, $scope.zonaSelected, $scope.idUsuario).then(function (datos) {
            var Resultados = datos.data;

            Resultados.forEach(function (item, key) {
                $scope.totalCitas = $scope.totalCitas + parseInt(item.total);
                $scope.totalHorasCitas = $scope.totalHorasCitas + parseInt(item.promedio);
                $scope.totalMontoCitas = $scope.totalMontoCitas + parseFloat(item.Monto);
                $scope.totalCostoCitas = $scope.totalCostoCitas + parseFloat(item.MontoCosto);
            });

            $scope.citas = Resultados;

            // Grafica
            $('#morris-donut-citas').empty();
            if ($scope.totalCitas == 0) {
                // console.log( 'Los datos de la grafica estan en 0' );
            }
            else {
                if ($scope.idRol == 4) {
                    var v1 = $scope.addCommas(Resultados[0].MontoCosto);
                    var v2 = $scope.addCommas(Resultados[1].MontoCosto);
                    var v3 = $scope.addCommas(Resultados[2].MontoCosto);
                }
                else {
                    var v1 = $scope.addCommas(Resultados[0].Monto);
                    var v2 = $scope.addCommas(Resultados[1].Monto);
                    var v3 = $scope.addCommas(Resultados[2].Monto);
                }

                Morris.Donut({
                    element: 'morris-donut-citas',
                    data: [
                        { label: Resultados[0].estatus + " \n $" + v1, value: Resultados[0].total, idEstatus: Resultados[0].idEstatus },
                        { label: Resultados[1].estatus + " \n $" + v2, value: Resultados[1].total, idEstatus: Resultados[1].idEstatus },
                        { label: Resultados[2].estatus + " \n $" + v3, value: Resultados[2].total, idEstatus: Resultados[2].idEstatus }
                    ],
                    resize: true,
                    colors: [Resultados[0].color, Resultados[1].color, Resultados[2].color],
                }).on('click', function (i, row) {
                    if (row.idEstatus == 1 || row.idEstatus == 2 || row.idEstatus == 3)
                        location.href = '/consultaCitas?e=' + row.idEstatus;
                });
            }

        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las citas');
        });
    };

    $scope.sumatoriaCotizaciones = function () {
        dashBoardRepository.getTotalCotizaciones($scope.idOperacion, $scope.zonaSelected, $scope.idUsuario).then(function (cotizaciones) {
            var Resultados = cotizaciones.data;
            var valuesDonut = [];
            var colores = [];

            $scope.cotizaciones = Resultados;
            $scope.totalCotizaciones = 0;
            $scope.totalHorasCotizaciones = 0;
            $scope.totalMontoCotizaciones = 0.00;
            $scope.totalCostoCotizaciones = 0.00;

            $scope.cotizaciones.forEach(function (item, key) {
                item.Monto = (item.Monto === null) ? 0 : item.Monto;

                var v = ($scope.idRol == 4) ? $scope.addCommas(item.MontoCosto) : $scope.addCommas(item.Monto);

                valuesDonut.push({ label: item.estatus + "\n$" + v, value: item.total, idEstatus: item.idEstatus });
                colores.push(item.color);

                $scope.totalCotizaciones = $scope.totalCotizaciones + parseInt(item.total);
                $scope.totalHorasCotizaciones = $scope.totalHorasCotizaciones + parseInt(item.promedio);
                $scope.totalMontoCotizaciones = $scope.totalMontoCotizaciones + parseFloat(item.Monto);
                $scope.totalCostoCotizaciones = $scope.totalCostoCotizaciones + parseFloat(item.MontoCosto);
            });

            $('#morris-donut-cotizaciones').empty();
            if ($scope.totalCotizaciones == 0) {
                // console.log( 'Los datos de la grafica estan en 0' );
            }
            else {
                Morris.Donut({
                    element: 'morris-donut-cotizaciones',
                    data: valuesDonut,
                    resize: true,
                    colors: colores,
                }).on('click', function (i, row) {
                    if (row.idEstatus == 1 || row.idEstatus == 2)
                        location.href = '/cotizacionconsulta?e=' + row.idEstatus;
                });

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las cotizaciones');
        });
    };

    $scope.sumatoriaProceso = function () {
        dashBoardRepository.getTotalProceso($scope.idOperacion, $scope.zonaSelected, $scope.idUsuario).then(function (proceso) {
            var Resultados = proceso.data;
            $scope.totalProceso = 0;
            $scope.totalHorasOrdenesProceso = 0;
            $scope.totalMontoOrdenesProceso = 0.00;
            $scope.totalCostoOrdenesProceso = 0.00;

            Resultados.forEach(function (item, key) {
                $scope.totalProceso = $scope.totalProceso + parseInt(item.total);
                $scope.totalHorasOrdenesProceso = $scope.totalHorasOrdenesProceso + parseInt(item.promedio);
                $scope.totalMontoOrdenesProceso = $scope.totalMontoOrdenesProceso + parseFloat(item.Monto);
                $scope.totalCostoOrdenesProceso = $scope.totalCostoOrdenesProceso + parseFloat(item.MontoCosto);
            });

            $scope.ordenesProceso = Resultados;

            // Grafica
            $('#morris-donut-proceso').empty();
            if ($scope.totalProceso == 0) {
                // console.log( 'Los datos de la grafica estan en 0' );
            }
            else {
                if ($scope.idRol == 4) {
                    var v1 = $scope.addCommas(Resultados[0].MontoCosto);
                    var v2 = $scope.addCommas(Resultados[1].MontoCosto);
                    //var v3 = $scope.addCommas(Resultados[2].MontoCosto);
                }
                else {
                    var v1 = $scope.addCommas(Resultados[0].Monto);
                    var v2 = $scope.addCommas(Resultados[1].Monto);
                    //var v3 = $scope.addCommas(Resultados[2].Monto);
                }

                Morris.Donut({
                    element: 'morris-donut-proceso',
                    data: [
                        { label: Resultados[0].estatus + "\n$" + v1, value: Resultados[0].total, id: Resultados[0].id },
                        { label: Resultados[1].estatus + "\n$" + v2, value: Resultados[1].total, id: Resultados[1].id },
                        //{label: Resultados[2].estatus + "\n$" + v3, value: Resultados[2].total, id: Resultados[2].id }
                    ],
                    resize: true,
                    colors: [Resultados[0].color, Resultados[1].color/*, Resultados[2].color*/],
                }).on('click', function (i, row) {
                    // console.log( row );
                    location.href = '/trabajo?e=' + row.id;
                });
            }

        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las ordenes');
        });
    };

    $scope.sumatoriaOrdenes = function () {
        dashBoardRepository.getTotalOrdenes($scope.idOperacion, $scope.zonaSelected, $scope.idUsuario).then(function (ordenes) {
            var Resultados = ordenes.data;
            $scope.totalOrdenes = 0;
            $scope.totalHorasOrdenesServicio = 0;
            $scope.totalMontoOrdenesServicio = 0.00;
            $scope.totalCostoOrdenesServicio = 0.00;

            Resultados.forEach(function (item, key) {
                $scope.totalOrdenes = $scope.totalOrdenes + parseInt(item.total);
                $scope.totalHorasOrdenesServicio = $scope.totalHorasOrdenesServicio + parseInt(item.promedio);
                $scope.totalMontoOrdenesServicio = $scope.totalMontoOrdenesServicio + parseFloat(item.Monto);
                $scope.totalCostoOrdenesServicio = $scope.totalCostoOrdenesServicio + parseFloat(item.MontoCosto);
            });

            $scope.ordenesServicio = Resultados;

            // Grafica
            $('#morris-donut-ordenes').empty();
            if ($scope.totalOrdenes == 0) {
                // console.log( 'Los datos de la grafica estan en 0' );
            }
            else {
                if ($scope.idRol == 4) {
                    var v1 = $scope.addCommas(Resultados[0].MontoCosto);
                    var v2 = $scope.addCommas(Resultados[1].MontoCosto);
                    //var v3 = $scope.addCommas(Resultados[2].MontoCosto);
                }
                else {
                    var v1 = $scope.addCommas(Resultados[0].Monto);
                    var v2 = $scope.addCommas(Resultados[1].Monto);
                    //var v3 = $scope.addCommas(Resultados[2].Monto);
                }

                Morris.Donut({
                    element: 'morris-donut-ordenes',
                    data: [
                        { label: Resultados[0].estatus + "\n$" + v1, value: Resultados[0].total, id: Resultados[0].id },
                        { label: Resultados[1].estatus + "\n$" + v2, value: Resultados[1].total, id: Resultados[1].id },
                        //{label: Resultados[2].estatus + "\n$" + v3, value: Resultados[2].total, id: Resultados[2].id }
                    ],
                    resize: true,
                    colors: [Resultados[0].color, Resultados[1].color/*, Resultados[2].color*/],
                }).on('click', function (i, row) {
                    // console.log( row );
                    location.href = '/trabajo?e=' + row.id;
                });
            }

        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las ordenes');
        });
    };

    $scope.sumatoriaOrdenesPorCobrar = function () {
        dashBoardRepository.getTotalOrdenesPorCobrar($scope.idOperacion, $scope.zonaSelected, $scope.idUsuario).then(function (ordenesCobrar) {
            var Resultados = ordenesCobrar.data;
            var valuesDonut = [];
            var colores = [];

            $scope.totalOrdenesPorCobrar = 0;
            $scope.totalHorasOrdenesCobrar = 0;
            $scope.totalMontoOrdenesCobrar = 0.00;
            $scope.totalCostoOrdenesCobrar = 0.00;

            Resultados.forEach(function (item, key) {
                var v = ($scope.idRol == 4) ? $scope.addCommas(item.MontoCosto) : $scope.addCommas(item.Monto);
                valuesDonut.push({ label: item.estatus + "\n$" + v, value: item.total });
                colores.push(item.color);

                $scope.totalOrdenesPorCobrar = $scope.totalOrdenesPorCobrar + parseInt(item.total);
                $scope.totalHorasOrdenesCobrar = $scope.totalHorasOrdenesCobrar + parseInt(item.promedio);
                $scope.totalMontoOrdenesCobrar = $scope.totalMontoOrdenesCobrar + parseFloat(item.Monto);
                $scope.totalCostoOrdenesCobrar = $scope.totalCostoOrdenesCobrar + parseFloat(item.MontoCosto);
            });

            $scope.ordenesCobrar = Resultados;

            $('#morris-donut-cobrar').empty();
            if ($scope.totalOrdenesPorCobrar == 0) {
                // console.log( 'Los datos de la grafica estan en 0' );
            }
            else {
                Morris.Donut({
                    element: 'morris-donut-cobrar',
                    data: valuesDonut,
                    resize: true,
                    colors: colores,
                }).on('click', function (i, row) {
                    location.href = '/ordenesporcobrar';
                });
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las ordenes por cobrar');
        });
    };

    $scope.addCommas = function (nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    // =================================================================================
    //obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
    $scope.obtieneNivelZona = function () {
        // console.log( "idContratoOperacion", $scope.idContratoOperacion );
        $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.idContratoOperacion).then(function (result) {
            $scope.totalNiveles = result.data.length;
            if (result.data.length > 0) {
                $scope.NivelesZona = result.data;
                $scope.devuelveZonas();
            }
        },
            function (error) {
                alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
            });
    };

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function () {
        for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
            cotizacionConsultaRepository.getZonas($scope.idContratoOperacion, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function (result) {
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

    $scope.cambioZona = function (id, orden, zona, zonaseleccionada) {
        //al cambiar de zona se establece como zona seleccionada.
        $scope.zonaSelected = id;

        $scope.LoadData();
        //se limpian los combos siguientes.
        for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
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
