registrationModule.controller('detalleController', function ($scope, $location, $modal, $timeout, userFactory, cotizacionRepository, cotizacionConsultaRepository, consultaCitasRepository, $rootScope, $routeParams, alertFactory, globalFactory, commonService, localStorageService, detalleRepository, aprobacionRepository, commonFunctionRepository, utilidadesRepository, filterFilter, preCancelacionesRepository, nuevoMemorandumRepository, loginRepository, tokenPendienteRepository, preordenCotizacionRepository) {
  // *****************************************************************************************************************************//
  // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
  // *****************************************************************************************************************************//
  // $rootScope.modulo = 'reporteHistorial'
  // Inicializa la pagina
  $('[data-toggle="tooltip"]').tooltip();
  $scope.IdsCotizacionesPorOrden = []
  $scope.btn_editarCotizacion = false
  $scope.idUsuario = 0
  $scope.numeroOrden = $routeParams.orden
  $scope.aprovisonamiento = $routeParams.provision; // localStorageService.get('provision')
  $scope.idEstatusOrden = 0
  $scope.estatus = 0
  $scope.textoNota = null
  $scope.textoComentario = null
  $scope.notaTrabajo = []
  $scope.notaComentario = []
  $scope.HistoricoOrden = []
  $scope.x = 0
  $scope.numCotz = 0
  $scope.TieneSaldo = true
  $scope.totalSumaCosto = 0
  $scope.totalSumaVenta = 0
  $scope.btnSwitch = {}
  $scope.userData = {}
  $scope.centroTrabajo = ''
  $scope.editaComentario = 0
  $scope.comentarioNuevo = {};
  $scope.comentarioNuevo.texto = '';
  $scope.facturas_empty = true
  $scope.facturas_empty = true
  $scope.Facturas = []
  $scope.totalfacturas = 0
  $scope.errores_factura = false
  $scope.idOrden = 0
  $scope.show_tokenMargen = false
  $scope.procesarCompra = ''
  $scope.estadoCompra = false
  $scope.estadoProveedor = false
  $scope.sinTiempoDisponible = 1
  $scope.tiempoTranscurridoDisplay = '00:00 / 00:00'
  $scope.cotizacionDetalle = {};
  $scope.validacionPorToken = 0;
  // Preconfiguración MAPA y Marcadores
  var markerUrl = 'https://js.devexpress.com/Demos/RealtorApp/images/map-marker.png'

  // alcance local
  $scope.urldocs = global_settings.urlDOCS;

  $scope.markerUrlValue = markerUrl
  $scope.markers = []

  $scope.hasGPS = true;

  var mapCanvas = document.getElementById("map");
  var mapOptions = {
    center: new google.maps.LatLng(51.508742, -0.120850),
    zoom: 7,
    panControl: true,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    overviewMapControl: true,
    rotateControl: true
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

  // Agrega para comentarios
  $scope.comentarios = []

//Variables para versionSystem light
  //$scope.versionSystem = 1;
 // $scope.userData = userFactory.getUserData();

  $scope.init = function ()
  {
      $scope.obtieneDatoUrl();
      $scope.userData = userFactory.getUserData();

      $scope.validacionPorToken = $scope.userData.validacionPorToken[0];

      if ($scope.userData != undefined) {
        $scope.Precancelacion = false
        //userFactory.ValidaSesion()
        $('#loadModal').modal('show')

        $scope.rolLogged = $scope.userData.idRol
        $scope.idUsuario = $scope.userData.idUsuario
        $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
        $scope.versionSystem = $scope.userData.versionSystem;
        $scope.comentarioCotizacion = $scope.userData.comentarioCotizacion;
        $scope.btnSwitch.classCosto = 'btn btn-success'
        $scope.btnSwitch.classVenta = 'btn btn-default'

        $scope.showButtonSwitch($scope.userData.idRol)
        $scope.checkComprobanteRecepcion()
        $scope.checkHojaTrabajo()
        $scope.HistoricoCotizaciones = []
        $scope.getHistoricos()

        $scope.enviaNota()
        $scope.getOrdenCliente($scope.userData.idUsuario, $scope.numeroOrden)
        $scope.getOrdenDocumentos($scope.userData.idUsuario, $scope.numeroOrden)
        $scope.getOrdenEvidencias($scope.userData.idUsuario, $scope.numeroOrden)
        $scope.getOrdenDetalle($scope.userData.idUsuario, $scope.numeroOrden)
        //$scope.getGps($scope.userData.idUsuario, $scope.numeroOrden);

        checkPrecancelation()
        if ($scope.userData.presupuesto == 1) {
          $scope.getSaldos($routeParams.orden)
        }
        $('.horaAsignada').clockpicker()
        $scope.ShowFacturas()
        if ($scope.userData.tiempoAsignado == 1) {
          // inicia reloj
          $scope.iniTime()
        } else {
          $scope.sinTiempoDisponible = 0
          $scope.tiempoTranscurridoDisplay = '00:00 / 00:00'
        }
        $scope.getMemorandums()
    }
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
                    $('#validaContrasena').modal();
                    //$scope.login($scope.usernombre, $scope.userpasword);
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
        //localStorageService.set('ord', $scope.orden);
        //location.href = '/detalle?';
        if($scope.userestado == 5){
          location.href = '/detalle?orden=' + $scope.numordenURl + '&estatus=4';
        }else{
          location.href = '/detalle?orden=' + $scope.numordenURl;
        }

        //$scope.getOrdenesURL($scope.orden, $scope.user);
      }
    });
  }

  $scope.mouseoverPass = function(obj){
    var obj = document.getElementById('myPassword');
    obj.type = "text";
  }

  $scope.mouseoutPass = function(obj){
    var obj = document.getElementById('myPassword');
    obj.type = "password";
  }

  // funcion reloj recursiva cada minuto
  $scope.iniTime = function () {
    detalleRepository.getTiempoTranscurrido($scope.numeroOrden).then(function (result) {
      if (result.data.length > 0) {
        $scope.sinTiempoDisponible = result.data[0].sinTiempoDisponible
        $scope.tiempoTranscurridoDisplay = result.data[0].tiempoTranscurridoDisplay

        $timeout(function () {
          $scope.iniTime()
        }, 60000)
      }
    }, function (error) {
      $('#loadModal').modal('hide')
      alertFactory.error('No se pudo obtener el tiempo transcurrido.')
      $scope.sinTiempoDisponible = 0
      $scope.tiempoTranscurridoDisplay = '00:00 / 00:00'
    })
  }

  $scope.getHistoricos = function () {
    detalleRepository.getHistoricoOrden($scope.numeroOrden).then(function (result) {
      if (result.data.length > 0) {
        $scope.HistoricoOrden = result.data
      }
    }, function (error) {
      alertFactory.error('No se puede obtener el historico de la orden.')
    })

    detalleRepository.getIdCotizacionesPorOrden($scope.numeroOrden, $scope.userData.idUsuario, $scope.userData.contratoOperacionSeleccionada).then(function (result) {
      $scope.numCotz = result.data.length
      if (result.data.length > 0) {
        $scope.IdsCotizacionesPorOrden = result.data
      }
      $scope.getHistoricosCotz()
    }, function (error) {
      $('#loadModal').modal('hide')
      alertFactory.error('No se puede obtener las cotizaciones de la orden.')
    })
  }

  $scope.getHistoricosCotz = function () {
    for ($scope.x = 0; $scope.x < $scope.numCotz; $scope.x++) {
      detalleRepository.getHistoricoCotizacion($scope.IdsCotizacionesPorOrden[$scope.x].idCotizacion).then(function (result) {
        if (result.data.length > 0) {
          var valueToPush = {}
          valueToPush.consecutivo = result.data[0].consecutivo
          valueToPush.data = result.data

          $scope.HistoricoCotizaciones.push(valueToPush)

          if (result.data[0].isPreorden == 1 && result.data[0].hasPart == 1) {
            $scope.preorden = result.data[0]
          }
        }
      }, function (error) {
        alertFactory.error('No se pudo recuperar el historico de la cotización.')
      })
    }
  }
  function checkPrecancelation() {
    $scope.userData = userFactory.getUserData()
    preCancelacionesRepository.GetAllOrdersCanceled($scope.userData.idOperacion).then(function (result) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].numeroOrden === $scope.numeroOrden) {
          $scope.Precancelacion = true
          break
        }
      }
    })
  }

  $scope.getOrdenDetalle = function (idUsuario, orden) {
    consultaCitasRepository.getOrdenDetalle(idUsuario, orden).then(function (result) {
      if (result.data.length > 0) {

        //-------------------------------------Validacion del token doble para PEMEX
        $scope.estatusToken = result.data[0].estatusToken.split(',')[0];
        $scope.estatusTokenMensaje = result.data[0].estatusToken.split(',')[1];

        $scope.idOrden = result.data[0].idOrden
        $scope.nombreCentroTrabajo = result.data[0].nombreCentroTrabajo
        $scope.detalleOrden = result.data[0]
        $scope.estatus = $routeParams.estatus
        $scope.estatusUtilidad()
        // LQMA add 11072017
        $scope.idZona_Orden = result.data[0].idZona

        if ($scope.estatus == undefined)
          $scope.estatus = $scope.detalleOrden.idEstatusOrden

        $scope.idEstatusOrden = $scope.detalleOrden.idEstatusOrden
        $scope.idOrdenURL = $scope.detalleOrden.idOrden
        $scope.migracion = $scope.detalleOrden.migracion
        $scope.creaURLS()
        var statusCotizacion = 0
        if ($scope.estatus == 1 || $scope.estatus == 2 || $scope.estatus == 3) {
          statusCotizacion = '1'
        } else if ($scope.estatus == 4) {
          statusCotizacion = '1,2'
        } else if ($scope.estatus == 5 || $scope.estatus == 6 || $scope.estatus == 7 || $scope.estatus == 8 || $scope.estatus == 14 || $scope.estatus == 9 || $scope.estatus == 10 || $scope.estatus == 11 || $scope.estatus == 12) {
          statusCotizacion = '3'
        }

        $scope.setActiveButtons($scope.estatus)
        $scope.validaFacturaCotizacionBoton()

        $scope.getMostrarCotizaciones($scope.numeroOrden, statusCotizacion, $scope.idUsuario)

        // Epediente y MAPA
        // ECG
        //if ($scope.userData.contratoOperacionSeleccionada == 1 && $scope.detalleOrden.longitud != null) {
        if ($scope.detalleOrden.Latitud != 0) {
          // $scope.markers = [{
          //   location: [+$scope.detalleOrden.latitud, +$scope.detalleOrden.longitud],
          //   tooltip: {
          //     text: 'Ubicación de la unidad'
          //   }
          // }]
          // $scope.mapOptions = {
          //   center: { lat: $scope.detalleOrden.latitud, lng: $scope.detalleOrden.longitud },
          //   zoom: 1,
          //   height: 300,
          //   width: '100%',
          //   provider: 'google',
          //   type: 'roadmap',
          //   controls: true,
          //   bindingOptions: {
          //     markerIconSrc: 'markerUrlValue',
          //     markers: 'markers'
          //   }
          // };

          var mapCanvas = document.getElementById("map");
          var myCenter = new google.maps.LatLng($scope.detalleOrden.Latitud,$scope.detalleOrden.Longitud);
          var mapOptions = {
            center: myCenter,
            zoom: 12,
            panControl: true,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            overviewMapControl: true,
            rotateControl: true
          };
          var map = new google.maps.Map(mapCanvas, mapOptions);
          var marker = new google.maps.Marker({position:myCenter});
          marker.setMap(map);

          $scope.hasGPS = true;
        } else {
          $scope.hasGPS = false
        }

        consultaCitasRepository.getOrdenExpediente(result.data[0].idUnidad).then(function (result) {
          $scope.tileViewOptions = {
            items: result.data,
            height: 390,
            baseItemHeight: 100,
            baseItemWidth: 155,
            itemMargin: 10
          }
        }, function (error) {
          $('#loadModal').modal('hide')
          alertFactory.error('No se puede obtener los detalles de la orden')
        })
      }
    }, function (error) {
      $('#loadModal').modal('hide')
      alertFactory.error('No se puede obtener los detalles de la orden')
    })
  }

  $scope.getOrdenCliente = function (idUsuario, orden) {
    consultaCitasRepository.getOrdenCliente(idUsuario, orden).then(function (result) {
      if (result.data.length > 0) {
        $scope.detalleCliente = result.data[0]
      }
    }, function (error) {
      $('#loadModal').modal('hide')
      alertFactory.error('No se puede obtener los detalles del cliente')
    })
  }

  $scope.getOrdenDocumentos = function (idUsuario, orden) {
    consultaCitasRepository.getOrdenDocumentos(idUsuario, orden).then(function (result) {
      if (result.data.length > 0) {
        $scope.detalleDocumentos = result.data[0]
      }
    }, function (error) {
      $('#loadModal').modal('hide')
      alertFactory.error('No se puede obtener los documentos de la orden')
    })
  }

  $scope.getOrdenEvidencias = function (idUsuario, orden) {
    consultaCitasRepository.getOrdenEvidencias(idUsuario, orden).then(function (result) {
      if (result.data.length > 0) {
        var resEvidnecias = result.data
        resEvidnecias.forEach(function (item, key) {
          resEvidnecias[key].tipo = item.rutaEvidencia.split('.').pop().toString()
          resEvidnecias[key].ruta = $rootScope.docServer + '/orden/' + item.rutaEvidencia
        })

        $scope.detalleEvidencias = resEvidnecias
      }
    }, function (error) {
      $('#loadModal').modal('hide')
      alertFactory.error('No se puede obtener los documentos de la orden')
    })
  }

  $scope.getShowFacturas = function (){
    angular.forEach($scope.cotizaciones, function(item){

          if (($scope.estatus == 5 || $scope.estatus == 6 || $scope.estatus == 7 || $scope.estatus == 8 || $scope.estatus == 9 || $scope.estatus == 10 || $scope.estatus == 11 || $scope.estatus == 12 || $scope.estatus == 14) && item.factura != 0) {
              item.showFacturaCargada = true;
          }else{
              item.showFacturaCargada = false;
          }

          if (($scope.estatus == 5 || $scope.estatus == 6 || $scope.estatus == 7 || $scope.estatus == 8) && item.factura == 0 && $scope.userData.idRol != 1){
              item.showCargarFactura = true;
          }else{
              item.showCargarFactura = false;
          }

    });
  }

  $scope.getMostrarCotizaciones = function (numeroOrden, estatus, idUsuario) {
    cotizacionRepository.getMostrarCotizaciones(numeroOrden, estatus, idUsuario, $scope.userData.contratoOperacionSeleccionada).then(function (result) {

      if (result.data.success == true) {
        $scope.cotizaciones = result.data.data;
        $scope.getTotales();
        $scope.centroTrabajo = $scope.cotizaciones[0].centroTrabajo;
        $scope.getShowFacturas();
        $scope.getHasApprovedParts();
        if($scope.comentarioCotizacion == 1){
          //$scope.cotizaciones.forEach(function(coti){
              //if (coti.detalle != null || coti.detalle != undefined) {
                $scope.enviaComentario(1);
              //}
          //});
          }

          $scope.lists = [];
          $scope.listTalleres = [];
          $scope.cotizaciones.forEach(function(taller){
              $scope.existsT = false;
              $scope.listTalleres.forEach(function(t2){
                  if (t2.nombre == taller.nombreTaller){
                      $scope.existsT = true;
                  }
              });
              if ($scope.existsT == false){
                var t = {
                    num: $scope.listTalleres.length + 1,
                    nombre: taller.nombreTaller
                }
                $scope.listTalleres.push(t);
              }
          });

          $scope.cotizaciones.forEach(function(coti){
              if (coti.detalle != null || coti.detalle != undefined) {

                var label = coti.numeroCotizacion;
                var idCoti = coti.idCotizacion;
                $scope.allowedTypes = coti.nombreTaller;
                $scope.listTalleres.forEach(function(t){
                    if(t.nombre == $scope.allowedTypes){
                        $scope.style = t.num;
                    }
                });

                var detalle = [];

                coti.detalle.forEach(function(part){

                  var partObj = {
                      partida: part.partida,
                      noParte: part.noParte,
                      idCotizacionDetalle: part.idCotizacionDetalle,
                      type: $scope.allowedTypes,
                      style: $scope.style
                  }

                    detalle.push(partObj);
                });

                var cotiObj = {
                    label:  label,
                    allowedTypes: [$scope.allowedTypes],
                    idCotizacion: idCoti,
                    people: detalle
                }

                $scope.lists.push(cotiObj);
              }
          });

        $('#loadModal').modal('hide');
      } else {
        $('#loadModal').modal('hide');
        // alertFactory.error('No se puede obtener los documentos de la orden')
      }
    }, function (error) {
      $('#loadModal').modal('hide');
      alertFactory.error('Ocurrio un error');
    })
  }

  $scope.integraCotizaciones = function (){
        $('#integraCotizacion').modal('hide');
        $('#loadModal').modal('show');
          $scope.lists.forEach(function (coti){
              var idCoti = coti.idCotizacion;
              var idCotiDet = '';
              if (coti.people.length == 0){
                    idCotiDet = '0';
              } else {
                    coti.people.forEach(function (det, index, array){
                        idCotiDet = idCotiDet + det.idCotizacionDetalle;
                        if (index !== array.length - 1){
                            idCotiDet = idCotiDet + ', '
                        }
                    });
              }

              detalleRepository.updSoporteIntegrarCotizaciones(idCoti, idCotiDet, $scope.userData.idUsuario, $scope.userData.contratoOperacionSeleccionada).then(function (result){
                  if (result.data[0].Success == 1){
                      alertFactory.info(result.data[0].Msg);
                  } else {
                      alertFactory.error(result.data[0].Msg);
                  }
              });

              location.href = '/detalle?orden=' + $routeParams.orden;
              // $('#loadModal').modal('hide');
              // $scope.init();

          });
  }

  $scope.getHasApprovedParts = function (){

      $scope.cotizaciones.forEach(function(coti){
          coti.hasApprovedParts = false;
          if (coti.detalle != null || coti.detalle != undefined) {
          coti.detalle.forEach(function(part){
              if (part.idEstatusPartida != 1){
                  coti.hasApprovedParts = true;
              }
          });
        }
      });
  }

  $scope.getTotales = function () {
    $scope.totalSumaCosto = 0
    $scope.totalSumaVenta = 0
    if ($scope.cotizaciones != null || $scope.cotizaciones != undefined) {
      $scope.cotizaciones.forEach(function (item) {
        if (item.idEstatusCotizacion == 4) { } else {
          if (item.detalle != null || item.detalle != undefined) {
            item.detalle.forEach(function (itemDetail) {
              if (itemDetail.idEstatusPartida == 3 || itemDetail.idEstatusPartida == 4) { } else {
                $scope.totalSumaCosto = $scope.totalSumaCosto + itemDetail.costoTotal
                $scope.totalSumaVenta = $scope.totalSumaVenta + itemDetail.ventaTotal
              }
            })
          }
        }
      })
    }
  }

  $scope.nuevaCotizacion = function () {
    $scope.class_buttonNuevaCotizacion = 'fa fa-spinner fa-spin'
    // LQMA 11072017
    location.href = '/cotizacionnueva?orden=' + $routeParams.orden + '&idZona=' + $scope.idZona_Orden
  }

  $scope.enviaNota = function () {
    $scope.notaTrabajo = []
    var Nota = $scope.textoNota == '' ? null : $scope.textoNota
    detalleRepository.insNota(Nota, $scope.numeroOrden, $scope.userData.idUsuario, $scope.idEstatusOrden).then(function (result) {
      if (result.data.length > 0) {
        $scope.notaTrabajo = result.data
      }
    }, function (error) {
      alertFactory.error('No se pudieron obtener las notas')
      $('#loadModal').modal('hide')
    })
    $scope.textoNota = null
  }

  $scope.enviaVerificacion = function () {
    //window.open('http://35.165.2.64:4200/alta?idUsuario=' + $scope.userData.idUsuario + '&idOperacion=' + $scope.userData.contratoOperacionSeleccionada + '&numeroEconomico=0' + $scope.detalleOrden.numeroEconomico)
    window.open('http://189.204.141.193:5600/alta?idUsuario=' + $scope.userData.idUsuario + '&idOperacion=' + $scope.userData.contratoOperacionSeleccionada + '&numeroEconomico=0' + $scope.detalleOrden.numeroEconomico)
  }

  $scope.comprobante = function () {
    if ($scope.detalleOrden.verificada) {
      $scope.class_buttonComprobanteRecepcion = 'fa fa-spinner fa-spin'
      location.href = '/comprobanteRecepcion?orden=' + $routeParams.orden
    } else {
      swal({
        title: '¡Unidad de la cita no verificada!',
        text: 'No puede recepcionar la unidad.',
        timer: 3000
      }).then(
        function () { },
        // handling the promise rejection
        function (dismiss) {
          if (dismiss === 'timer') {

          }
        }
        )
    }
  }

  $scope.partidasportokentotal = 0
  $scope.initApproveButtons = function (item, idCotizacion) {
    if (item.Aprueba == 1 && item.idEstatusPartida == 1) {
      item.btnDisabled = false
      if ($scope.portoken) {
        $scope.partidasportokentotal++
        item.selOption = 1 // 2
        if ($scope.idCotizacionActive == idCotizacion) {
          item.selOption = 2 // 2
        } else {
          item.selOption = 1 // 2
          item.btnDisabled = true
        }
      } else {
        item.selOption = item.idEstatusPartida
      }
    } else {
      item.btnDisabled = true
      item.selOption = item.idEstatusPartida
    }
  }

  $scope.err_aprobacion_show = false
  $scope.idUsuarioToken = 0
  $scope.VerificaTokenAprobacion = function () {
    $('.aprobar_partidas').attr('disabled', 'disabled')
    $('.aprobar_partidas i').show()
    $scope.pidiendoToken = true
    if ($scope.token_aprobacion == '' || $scope.token_aprobacion === undefined) {
      $('.err_aprobacion').fadeIn()
      $scope.err_apronacion = 'Es necesario el token para hacer esta operación'
      $('.aprobar_partidas i').hide()
      setTimeout(function () {
        $('.aprobar_partidas').removeAttr('disabled')
        $('.err_aprobacion').fadeOut()
      }, 3000)
    } else {
      detalleRepository.validaTokenAprobacion($scope.detalleOrden.idOrden, $scope.token_aprobacion, $scope.idCotizacionActive).then(function (result) {
        if (result.data[0].Success == 1) {
          $('#ModalShowToken').modal('hide')
          $scope.aprobacionPorToken($scope.numeroOrden, $scope.idEstatusCotizacionActive, result.data[0].idUsuario)
          setTimeout(function () {
            if ($scope.partidasportokentotal == 0) {
              alertFactory.warning('El token proporcionado no cuenta con el nivel de autorización necesario para esta operación.')
            } else {
              var coti = filterFilter($scope.cotizaciones, { idCotizacion: $scope.idCotizacionActive })
              $scope.idUsuarioToken = result.data[0].idUsuario
              // $scope.btnSaveCotizacion(result.data[0].idUsuario, coti[0])
            }
          }, 500)
        } else {
          $('.err_aprobacion').fadeIn()
          $scope.err_apronacion = result.data[0].Msg
          $scope.token_aprobacion = ''
          setTimeout(function () {
            $('.err_aprobacion').fadeOut()
          }, 3000)
        }

        $('.aprobar_partidas i').hide()
        $('.aprobar_partidas').removeAttr('disabled')
      }, function (error) {
        // alertFactory.error('')
      })
    }

    $scope.token_aprobacion = ''
  }

  $scope.portoken = false
  $scope.aprobacionPorToken = function (numeroOrden, estatus, usuario) {
    $scope.portoken = true
    $scope.getMostrarCotizaciones(numeroOrden, estatus, usuario)
  }

  $scope.idCotizacionActive = 0
  $scope.modal_aprobacion = function (id, estatus) {
    $('#ModalShowToken').modal()
    $scope.idCotizacionActive = id
    $scope.idEstatusCotizacionActive = estatus
  }

  $scope.setActiveButtons = function (idstatus) {
    switch (Number(idstatus)) {
      case 1:
        $scope.hideAllButtons()
        $scope.showButtonsInProcess()
        break
      case 2:
        $scope.hideAllButtons()
        $scope.showButtonsInProcess()
        break
      case 3:
        $scope.hideAllButtons()
        $scope.showButtonsInProcess()
        $scope.btnMoradoIsEnable = false
        break
      case 4: // Botones habilitados para modulo aprobación
        $scope.hideAllButtons()
        // $scope.btnEditarIsEnable = false
        $scope.btnGuardaCotizacionIsEnable = false
        break
      default:
        $scope.hideAllButtons()
    }
  }

  $scope.btnSaveCotizacion = function (idUsuario, cotizacion) {
    $('#loadModal').modal('show')
    if ($scope.idUsuarioToken != 0) {
      idUsuario = $scope.idUsuarioToken
      $scope.idUsuarioToken = 0
    }

    $scope.class_buttonGuardaCotizacion = 'fa fa-spinner fa-spin'
    if ($scope.userData.presupuesto == 1) {
      var haveBalance = $scope.checkBalance(cotizacion)
      if (haveBalance == true) {
        $scope.UpdatePartidaStatus(idUsuario, cotizacion)
        $scope.updateComentariosPartidas()
      } else {
        $('#loadModal').modal('hide')
        $('.modal-dialog').css('width', '1050px')
        detalleRepository.postCorreoSaldoPresupuesto(cotizacion.idOrden, idUsuario, cotizacion.idCotizacion, $scope.saldos.saldo, $scope.saldos.idPresupuesto)
        .then(function(resp)
        {
          if (resp.data.length > 0) {
            var correoDe = resp.data[0].correoDe
            var correoPara = resp.data[0].correoPara
            var asunto = resp.data[0].asunto
            var texto = resp.data[0].texto
            var bodyhtml = resp.data[0].bodyhtml
            commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
              if (result.data.length > 0) { }
            }, function (error) {
              // alertFactory.error('No se puede enviar el correo')
            })
          }
        }, function(error) {
             alertFactory.error("Error correo saldo presupuesto.")
        })
        modal_saldos($scope, $modal, $scope.saldos, $scope.nombreCentroTrabajo, '', '')
        $scope.class_buttonGuardaCotizacion = ''
      }
    } else {
      $scope.UpdatePartidaStatus(idUsuario, cotizacion)
      $scope.updateComentariosPartidas()
    }
  }

  $scope.checkBalance = function (cotizacion) {
    var sumOperacion = 0
    cotizacion.detalle.forEach(function (item) {
      if (item.btnStep != 0 && item.btnDisabled == false) {
        sumOperacion += item.ventaTotal
      }
    })
    if ($scope.saldos != undefined) {
      if (sumOperacion <= ($scope.saldos.saldo)) {
        $scope.TieneSaldo = true
        return true
      } else {
        $scope.TieneSaldo = false
        return false
      }
    } else {
      $scope.TieneSaldo = false
      return false
    }
  }

  $scope.UpdatePartidaStatus = function (idUsuario, cotizacion) {
    cotizacion.detalle.forEach(function (item) {
      if (item.btnDisabled == false && item.selOption > 1) {
        var params = {
          idUsuario: '',
          idCotizacion: '',
          idPartida: '',
          idEstatusPartida: 0
        }
        params.idUsuario = idUsuario
        params.idCotizacion = cotizacion.idCotizacion
        params.idPartida = item.idPartida
        params.idEstatusPartida = item.selOption

        aprobacionRepository.getUpdateStatusPartida(params).then(function (result) {
          if (result.data.length > 0) { }
        }, function (error) {
          alertFactory.error('Aprobación getUpdateStatusPartida error.')
        })
      }
    })

    setTimeout(function () {
      $scope.UpdateCotizacionStatus(cotizacion.idCotizacion, idUsuario)
    }, 1000)
  }

  $scope.UpdateCotizacionStatus = function (idCotizacion, idUsuario) {
    aprobacionRepository.getUpdateStatusCotizacion(idCotizacion, idUsuario).then(function (result) {
      if (result.data.length > 0) {
        var valor = result.data[0].idEstatusCotizacion

        switch (Number(valor)) {
          case 2: // cliente
            // $scope.init()
            alertFactory.success('Faltan partidas por aprobar.')
            setTimeout(function () {
              $('#loadModal').modal('hide')
              $scope.class_buttonGuardaCotizacion = ''
              location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4'
            }, 500)
            break
          case 3:
            if ($scope.hasDetalleModulo(5, 14) === true) {
              commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                if (resp.data.length > 0) {
                  var correoDe = resp.data[0].correoDe
                  var correoPara = resp.data[0].correoPara
                  var asunto = resp.data[0].asunto
                  var texto = resp.data[0].texto
                  var bodyhtml = resp.data[0].bodyhtml
                  commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                    if (result.data.length > 0) { }
                  }, function (error) {
                    // alertFactory.error('No se puede enviar el correo')
                  })
                }
              }, function (error) {
                // alertFactory.error("Error al obtener información para el mail")
              })
            }
            if($scope.userData.presupuesto == 1){
              detalleRepository.restaPresupuestoOrden($scope.saldos.idPresupuesto, $scope.idOrden, $scope.userData.idUsuario, $scope.userData.idOperacion).then(function (result){
                  if (result.data.length > 0){}
              });
            }
            setTimeout(function () {
              $('#loadModal').modal('hide')
              $scope.class_buttonGuardaCotizacion = ''
              location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=5'
            }, 1500)
            break
          case 4:
            $('#loadModal').modal('hide')
            location.href = '/cotizacionconsulta'
            break
          default:
            $scope.class_buttonGuardaCotizacion = ''
            $('#loadModal').modal('hide')
            alertFactory.info('Debe seleccionar partidas para aprobar.')
        }
      } else {
        $scope.buttonGuardaCotizacion = ''
        $('#loadModal').modal('hide')
        alertFactory.success('Finalizó sin respuesta.')
      }
    }, function (error) {
      $scope.buttonGuardaCotizacion = ''
      $('#loadModal').modal('hide')
      alertFactory.error('Aprobación getUpdateStatusCotizacion error.')
    })
  }

  $scope.setRowColor = function (obj) {
    if ($scope.userData.contratoOperacionSeleccionada == 3 || $scope.userData.contratoOperacionSeleccionada == 8){
        switch (Number(obj.nivel)) {
          case 1:
            obj.rowColor = 'rowVerde1'
            break
          case 2:
            obj.rowColor = 'rowAzul2'
            break
          case 3:
            obj.rowColor = 'rowAmarillo3'
            break
          case 4:
            obj.rowColor = 'rowRojo4'
            break
          case 5:
            obj.rowColor = 'rowEtGlobal5'
            break
          default:
            obj.rowColor = 'rowVerde1'
        }
    } else {
        switch (Number(obj.nivel)) {
          case 1:
            obj.rowColor = 'info'
            break
          case 2:
            obj.rowColor = 'success'
            break
          case 3:
            obj.rowColor = 'warning'
            break
          case 4:
            obj.rowColor = 'danger'
            break
          case 5:
            obj.rowColor = 'active'
            break
          default:
            obj.rowColor = 'info'
        }
    }
  }

  $scope.showButtonSwitch = function (usrRol) {
    switch (Number(usrRol)) {
      case 1: // cliente
        $scope.hideSwitchBtn = true
        $scope.btnSwitch.showCostoVenta = false
        $scope.btn_editarCotizacion = false
        break
      case 2: // admin
        $scope.hideSwitchBtn = false
        $scope.btnSwitch.showCostoVenta = true
        $scope.btn_editarCotizacion = true
        break
      case 3: // callcenter
        $scope.hideSwitchBtn = false
        $scope.btnSwitch.showCostoVenta = true
        $scope.btn_editarCotizacion = true
        break
      case 4: // proveedor
        $scope.hideSwitchBtn = false
        $scope.btnSwitch.showCostoVenta = true
        break
      default:
        $scope.hideSwitchBtn = true
    }
  }

  $scope.hideAllButtons = function () {
    $scope.btnEditarIsEnable = true
    $scope.btnGuardaCotizacionIsEnable = true
    $scope.btnNuevaCotizacionIsEnable = true
    $scope.btnEditarCotizacionIsEnable = true
    $scope.btnComprobanteRecepcionIsEnable = true
    $scope.btnEditarCitaIsEnable = true
    $scope.btnCancelarCitaIsEnable = true
    $scope.btnNegroIsEnable = true
    $scope.btnMoradoIsEnable = true
  }

  $scope.showButtonsInProcess = function () {
    $scope.btnEditarCotizacionIsEnable = false
    $scope.btnNuevaCotizacionIsEnable = false
    $scope.btnComprobanteRecepcionIsEnable = false
    $scope.btnEditarCitaIsEnable = false
  }

  $scope.getSaldos = function (numeroOrden) {
    aprobacionRepository.getPresupuesto(numeroOrden).then(function (result) {
      if (result.data.length > 0) {
        $scope.saldos = result.data[0]
      }
    }, function (error) {
      $('#loadModal').modal('hide')
      alertFactory.error('sinsaldos')
    })
  }

  $scope.editarCotizacion = function (data) {
    $scope.class_buttonEditarCotizacion = 'fa fa-spinner fa-spin'
    var orden = $scope.numeroOrden
    var idCotizacion = String(data.idCotizacion)
    location.href = '/cotizacionnueva?orden=' + orden + '&idCotizacion=' + idCotizacion + '&estatus=' + $scope.estatus
  }

  // LQMA 07062017
  $scope.getReporteConformidad = function (idOrden) {
    detalleRepository.getReporteConformidad(idOrden, $scope.userData.contratoOperacionSeleccionada, $scope.userData.idUsuario).then(function (result) {
      if (result.data.length > 0) {
        var rptReporteConformidadData = []
        rptReporteConformidadData.encabezado = result.data[0][0]
        rptReporteConformidadData.encabezado.logo = $rootScope.docServer + rptReporteConformidadData.encabezado.img
        rptReporteConformidadData.encabezado.firma = $rootScope.docServer + rptReporteConformidadData.encabezado.firmaDoc
        rptReporteConformidadData.partidas = result.data[1]
        rptReporteConformidadData.total = result.data[2][0]
        rptReporteConformidadData.firma = result.data[3]
        rptReporteConformidadData.zona = result.data[4]
        new Promise(function (resolve, reject) {
          var rptReporteConformidad = {
            'encabezado': [
              rptReporteConformidadData.encabezado
            ],
            'partidas': rptReporteConformidadData.partidas,
            'total': rptReporteConformidadData.total.total,
            'firma': rptReporteConformidadData.firma,
            'zona': rptReporteConformidadData.zona
          }
          if($scope.userData.contratoOperacionSeleccionada == 3 || $scope.userData.contratoOperacionSeleccionada == 8){
            var jsonData = {
              'template': {
                'name': 'hojaConformidad_rpt'
              },
              'data': rptReporteConformidad //
            }
          }else{
              var jsonData = {
                'template': {
                  'name': 'hojaTrabajo_rpt'
                },
                'data': rptReporteConformidad //
              }
          }
          resolve(jsonData)
        }).then(function (jsonData) {
          detalleRepository.getGuardaReporteConformidad(jsonData, idOrden).then(function (result) {
            setTimeout(function () {
              location.href = '/detalle?orden=' + $routeParams.orden
            }, 10000)
          })
        })
      }
    }, function (error) {
      alertFactory.error('Error al obtener Reporte Conformidad')
    })
  }

  // ********** [ Aqui Comienza Ordenes en Proceso ] *****************************************************************************//
  $scope.pnl_token_admin = false

  $scope.ShowAutorizacionAdmin = function () {
    $scope.pnl_token_admin = true
    $('html, body').animate({
      scrollTop: $(document).height()
    }, 1000)
    setTimeout(function () {
      $('.token_admin').focus()
    }, 1001)
  }

  $scope.HideAutorizacionAdmin = function () {
    $scope.pnl_token_admin = false
  }

  $scope.OpenModalFactura = function (no, cf, ct, nc) {
    $scope.idOrden = no
    $scope.cotizacionFactura = cf
    $scope.numeroCotizacion = nc
    $scope.cotizacionTotal = ct
    $scope.alert_respuesta = false
    $scope.validateUUID = 1

    $('.alert-warning').hide()
    $('#myModal').modal()
    $('.archivos').show()
    $('.uploading').hide()
    $('.btn-cerrar').removeAttr('disabled')
    $('.btn-subir').removeAttr('disabled')

    document.getElementById('frm_subir_factura').reset()

    var inputs = document.querySelectorAll('.inputfile')
    Array.prototype.forEach.call(inputs, function (input) {
      var label = input.nextElementSibling
      label.querySelector('span').innerHTML = 'Seleccionar archivo'
    })
  }

  $scope.HideModalFactura = function () {
    $('#myModal').modal('hide')
  }

  $scope.Cargar_Factura = function () {
    var fxml = $('.inputfile-1').val()
    var fpdf = $('.inputfile-2').val()

    if (fxml == '' && fpdf == '') {
      $('.alert-danger').fadeIn()
      $('.alert-danger span').text('Proporciona al menos uno de los archivos que se piden')
      setTimeout(function () {
        $('.alert-danger').fadeOut('fast')
      }, 3000)
    } else {
      $('.archivos').hide()
      $('.uploading').show()
      $('.btn-cerrar').attr('disabled', 'disabled')
      $('.btn-subir').attr('disabled', 'disabled')

      detalleRepository.postSubirFacturas($scope.numeroOrden).then(function (result) {
        var Respuesta = result.data

        $('.alert-warning').show('fast')
        $('.errores_factura').html('')

        document.getElementById('frm_subir_factura').reset()
        $('.uploading').hide()
        if (Respuesta.res.return.codigo == 1) {
          $scope.titulo_factura = 'Factura Cargada correctamente'
        } else {
          $scope.titulo_factura = 'Factura no válida'
        }

        $.each(Respuesta.res.return, function (key, item) {
          $('.errores_factura').append('<tr> <td width="20%"><strong>' + key + '</strong></td> <td>' + item + '</td> </tr>')
        })

        $('.btn-cerrar').removeAttr('disabled')
      }, function (error) { })
    }
  }

  $scope.subirEvidencias = function () {
    var evidencia_file = $('.inputfile-3').val()
    if (evidencia_file == '') {
      alertFactory.warning('Selecciona un archivo.')
    } else {
      $('.btn-evidencia').attr('disabled', 'disabled')

      detalleRepository.postSubirEvidencia().then(function (result) {
        var Respuesta = result
        document.getElementById('frm_evidencia').reset()
        $('.lbl_evidencia').text('Seleccionar archivo')

        var _nombre = Respuesta.data.data[0].nombre
        var _descri = ''
        var _ruta = Respuesta.data.data[0].PathDB
        var _orden = Respuesta.data.data[0].Param.idOrden

        consultaCitasRepository.agregarEvidencias(_nombre, _descri, _ruta, _orden).then(function (result) {
          $scope.getOrdenEvidencias($scope.userData.idUsuario, $scope.numeroOrden)
          $('.btn-evidencia').removeAttr('disabled')
        })
      }, function (error) { })
    }
  }

  $scope.Cargar_Factura_Tmp = function () {
    $scope.class_buttonCargaFactura = 'fa fa-spinner fa-spin'
    var fxml = $('.inputfile-1').val()
    var fpdf = $('.inputfile-2').val()

    if (fxml == '' || fpdf == '') {
      $('.alert-info').fadeIn()
      $('.alert-info span').text('Debes proporcionar el XML y el PDF de la factura que vas a cargar.')
      $scope.class_buttonCargaFactura = ''
      setTimeout(function () {
        $('.alert-info').fadeOut('fast')
      }, 4000)
    } else {
      $('.archivos').hide()
      $('.uploading').show()
      $('.btn-cerrar').attr('disabled', 'disabled')
      $('.btn-subir').attr('disabled', 'disabled')

      detalleRepository.postSubirFacturas($scope.numeroOrden).then(function (result) {
        var Respuesta = result.data

        Respuesta.data.forEach(function (item, key) {
          var ServerPath = item.Param.docServer + '/orden/' + item.PathDB
          var Extension = item.PathDB.split('.').pop().toLowerCase()

          if (Extension == 'xml') {
            detalleRepository.validaFactura(item.PathDB).then(function (result) {
              if (parseInt(result.data.return.codigo) == 0) {
                $scope.FacturaLista()
                $('#mensaje').text('¡Factura no válida!')
                $.each(result.data.return, function (key, registro) {
                  if (key != 'codigo')
                    $('.errores_factura').append('<tr> <td width="20%"><strong>' + key + '</strong></td> <td>' + registro + '</td> </tr>')
                })
              } else if (parseInt(result.data.return.codigo) == 2) {
                $scope.FacturaLista()
                $('#mensaje').text('¡No se ha podivo verificar!')
                $.each(result.data.return, function (key, registro) {
                  if (key != 'codigo')
                    $('.errores_factura').append('<tr> <td width="20%"><strong>' + key + '</strong></td> <td>' + registro + '</td> </tr>')
                })
              } else {
                $('#mensaje').text('¡Factura cargada correctamente!')
                debugger
                var xmltemp = JSON.stringify(result.data.xml_objet)
                xmltemp = xmltemp.replace(/\\"/g, ' ')
                xmltemp = xmltemp.replace(/\\/g, '/')
                xmltemp = xmltemp.toUpperCase()
                var xml = JSON.parse(xmltemp)
                var sxml = result.data.xml

                var UUID = xml['CFDI:COMPROBANTE']['CFDI:COMPLEMENTO'][0]['TFD:TIMBREFISCALDIGITAL'][0].$['UUID']
                var RFC_Emisor = xml['CFDI:COMPROBANTE']['CFDI:EMISOR'][0].$['RFC']
                var RFC_Receptor = xml['CFDI:COMPROBANTE']['CFDI:RECEPTOR'][0].$['RFC']
                var subTotal = xml['CFDI:COMPROBANTE'].$['SUBTOTAL']
                var Total = xml['CFDI:COMPROBANTE'].$['TOTAL']
                var Fecha = xml['CFDI:COMPROBANTE'].$['FECHA']
                var Folio = xml['CFDI:COMPROBANTE'].$['FOLIO']

                if (Folio === undefined || Folio === null || Folio == '') {
                  var aux = UUID.split('-')
                  Folio = aux[0]
                }

                detalleRepository.getRFCFactura($scope.numeroCotizacion).then(function (result) {
                  if (result.data.length != 0) {
                    var rfc = result.data[0]

                    // Esta sección se debera quitar para producción
                    // Esta sección se debera quitar para producción
                    // Esta sección se debera quitar para producción
                    //  var RFC_Receptor = rfc.RFCCliente
                    //  var RFC_Emisor = rfc.RFCTaller
                    //  var subTotal = $scope.cotizacionTotal
                    //  var UUID = $scope.UUIDB
                    // Esta sección se debera quitar para producción
                    // Esta sección se debera quitar para producción
                    // Esta sección se debera quitar para producción

                    if($scope.validateUUID == 0){
                        var UUID = 'A1234567-D123-O123-L123-F1V3I5V7E900';
                    }
                    debugger
                    if (RFC_Receptor != rfc.RFCCliente) {
                      $scope.FacturaLista()
                      $('#mensaje').text('¡Factura no válida!')
                      $('.errores_factura').append('<tr> <td width="20%"><strong>RFC Receptor</strong></td> <td>El RFC Receptor no coincide con el de la cotización.</td> </tr>')
                      detalleRepository.eliminaFactura(item.PathDB)
                    } else if (RFC_Emisor != rfc.RFCTaller) {
                      $scope.FacturaLista()
                      $('#mensaje').text('¡Factura no válida!')
                      $('.errores_factura').append('<tr> <td width="20%"><strong>RFC Emisor</strong></td> <td>El RFC Emisor no coincide con el de la cotización.</td> </tr>')
                      detalleRepository.eliminaFactura(item.PathDB)
                    } else if (UUID == rfc.UUIDB) {
                      $scope.FacturaLista()
                      $('#mensaje').text('¡Factura Repetida!')
                      $('.errores_factura').append('<tr> <td width="20%"><strong>UUID Repetido</strong></td> <td>El UUID ya ha sido registrado con anterioridad</td> </tr>')
                      detalleRepository.eliminaFactura(item.PathDB)
                    } else {
                      if ($scope.cotizacionTotal >= (parseInt(subTotal) - 1) && $scope.cotizacionTotal <= (parseInt(subTotal) + 1)) {

                        var parametros = {
                          idCotizacion: rfc.idCotizacion,
                          numFactura: Folio,
                          uuid: UUID,
                          fechaFactura: Fecha,
                          subTotal: subTotal,
                          iva: subTotal * 0.16,
                          total: Total,
                          idUsuario: $scope.idUsuario,
                          xml: sxml,
                          rfcEmisor: RFC_Emisor,
                          rfcReceptor: RFC_Receptor
                        }

                        detalleRepository.insertarFactura(parametros).then(function (result) {

                          if (result.data.length != 0) {
                            Respuesta.data.forEach(function (archivo, key) {
                              var ServerPath = archivo.Param.docServer + '/orden/' + archivo.PathDB
                              detalleRepository.getGuardarFactura(ServerPath, archivo.Param.idOrden, archivo.Param.cotizacionFactura).then(function (result) {

                              })
                            })

                            setTimeout(function () {
                              $('#myModal').modal('hide')
                              $scope.init()
                            }, 2500)
                            $scope.FacturaLista()
                            $('#mensaje').text('¡Factura guardada!')
                            $('.errores_factura').append('<tr> <td width="20%"><strong>Info</strong></td> <td>Factura guardada correctamente.</td> </tr>')
                            // detalleRepository.eliminaFactura(item.PathDB)
                          } else {
                            $scope.FacturaLista()
                            $('#mensaje').text('¡Factura no guardada!')
                            $('.errores_factura').append('<tr> <td width="20%"><strong>Info</strong></td> <td>La factura no pudo ser guardada, intente nuevamente.</td> </tr>')
                            detalleRepository.eliminaFactura(item.PathDB)
                          }
                        }, function (error) {
                          $scope.FacturaLista()
                          $('#mensaje').text('¡Factura no guardada!')
                          $('.errores_factura').append('<tr> <td width="20%"><strong>Info</strong></td> <td>La factura no pudo ser guardada, intente nuevamente.</td> </tr>')
                          detalleRepository.eliminaFactura(item.PathDB)
                        })
                      } else {
                        $scope.FacturaLista()
                        $('#mensaje').text('¡Factura no válida!')
                        $('.errores_factura').append('<tr> <td width="20%"><strong>Totales</strong></td> <td>El Total no coincide con el de la cotización.</td> </tr>')
                        detalleRepository.eliminaFactura(item.PathDB)
                      }
                    }
                  } else {
                    $scope.FacturaLista()
                  }
                }, function (error) {
                })
              }
            }, function (error) {
            })
          }
          // detalleRepository.getGuardarFactura(ServerPath, item.Param.idOrden, item.Param.cotizacionFactura).then(function(result) {

          // })
        })
      }, function (error) {
      })
    }
  }

  $scope.FacturaLista = function () {
    $scope.alert_respuesta = true
    $('.uploading').hide()
    $('.alert_respuesta').fadeIn()
    $('.errores_factura').html('')
    $scope.class_buttonCargaFactura = ''
    $('.btn-cerrar').removeAttr('disabled')
  }

  $scope.ValidaTerminoTrabajo = function () {
    $scope.class_buttonTerminaTrabajo = 'fa fa-spinner fa-spin'
    if ($scope.userData.presupuesto == 1) {
      detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function (result) {
        if (result.data[0].RealizarOperacion) {

            detalleRepository.getOrdenesDescontadas($scope.detalleOrden.idOrden).then(function (result){
                if(result.data.length > 0){
                    $scope.descontado = result.data[0].descontado;

                    if ($scope.descontado == 1){
                        $scope.addComentarioTermino()
                    }else{
                        aprobacionRepository.getPresupuesto($scope.numeroOrden).then(function (result) {
                          if (result.data.length > 0) {
                            $scope.saldosTermino = result.data[0]
                            if (result.data[0].presupuestoVenta >= 0) {
                              $scope.idPresupuesto = result.data[0].idPresupuesto

                              $scope.addComentarioTermino()
                            } else {
                              $('.modal-dialog').css('width', '1050px')
                              modal_saldos($scope, $modal, $scope.saldosTermino, $scope.nombreCentroTrabajo, '', '')
                              $scope.class_buttonTerminaTrabajo = ''
                            }
                          } else {
                            $('.modal-dialog').css('width', '1050px')
                            modal_saldos($scope, $modal, $scope.saldosTermino, $scope.nombreCentroTrabajo, '', '')
                            $scope.class_buttonTerminaTrabajo = ''
                          }
                        })
                    }


                }else{
                    $('.modal-dialog').css('width', '1050px')
                    modal_saldos($scope, $modal, $scope.saldosTermino, $scope.nombreCentroTrabajo, '', '')
                    $scope.class_buttonTerminaTrabajo = ''
                }

            });

        } else {
          $scope.class_buttonTerminaTrabajo = ''
          alertFactory.info('Aún quedan cotizaciones pendientes por revisar')
        }
      })
    } else {
      detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function (result) {
        if (result.data[0].RealizarOperacion) {
          $scope.addComentarioTermino()
        } else {
          $scope.class_buttonTerminaTrabajo = ''
          alertFactory.info('Aún quedan cotizaciones pendientes por revisar')
        }
      })
    }
  }

  $scope.cambiaEstatusOrdenTermino = function () {
    if ($scope.userData.presupuesto == 1) {
      if ($scope.descontado == 0){
          detalleRepository.restaPresupuestoOrden($scope.idPresupuesto, $scope.detalleOrden.idOrden, $scope.userData.idUsuario, $scope.userData.idOperacion).then(function (result) {
            if (result.data.length > 0) {
                detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.userData.idUsuario).then(function (r_token) {
                  if ($scope.hasDetalleModulo(6, 19) === true) {
                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                      if (resp.data.length > 0) {
                        var correoDe = resp.data[0].correoDe
                        var correoPara = resp.data[0].correoPara
                        var asunto = resp.data[0].asunto
                        var texto = resp.data[0].texto
                        var bodyhtml = resp.data[0].bodyhtml
                        commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                          if (result.data.length > 0) { }
                        }, function (error) {
                          // alertFactory.error('No se puede enviar el correo')
                        })
                      }
                    }, function (error) {
                      // alertFactory.error("Error al obtener información para el mail")
                    })
                  }

                  $scope.class_buttonTerminaTrabajo = ''
                  alertFactory.success('Se ha terminado el trabajo')
                  $('html, body').animate({
                    scrollTop: 0
                  }, 1000)
                  $('#loadModal').modal('show')
                  $scope.getReporteConformidad($scope.detalleOrden.idOrden)

                  //  $scope.init()
                })
              }
            })
      }else{
        detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.userData.idUsuario).then(function (r_token) {
          if ($scope.hasDetalleModulo(6, 19) === true) {
            commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
              if (resp.data.length > 0) {
                var correoDe = resp.data[0].correoDe
                var correoPara = resp.data[0].correoPara
                var asunto = resp.data[0].asunto
                var texto = resp.data[0].texto
                var bodyhtml = resp.data[0].bodyhtml
                commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                  if (result.data.length > 0) { }
                }, function (error) {
                  // alertFactory.error('No se puede enviar el correo')
                })
              }
            }, function (error) {
              // alertFactory.error("Error al obtener información para el mail")
            })
          }

          $scope.class_buttonTerminaTrabajo = ''
          alertFactory.success('Se ha terminado el trabajo')
          $('html, body').animate({
            scrollTop: 0
          }, 1000)
          $('#loadModal').modal('show')
          $scope.getReporteConformidad($scope.detalleOrden.idOrden)

          //  $scope.init()
        })
      }
    } else {
      detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.userData.idUsuario).then(function (r_token) {
        $scope.class_buttonTerminaTrabajo = ''
        alertFactory.success('Se ha terminado el trabajo')
        $('html, body').animate({
          scrollTop: 0
        }, 1000)
        $('#loadModal').modal('show')
        $scope.getReporteConformidad($scope.detalleOrden.idOrden)
        // $scope.init()
      })
    }
  }

  $scope.ValidaEntrega = function (objeto) {
    $('#loadModal').modal('show')
    if (objeto == 0) {
      detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function (result) {
        if (result.data[0].RealizarOperacion) {
          if ($scope.token_termino == '' || $scope.token_termino === undefined) {
            $('#loadModal').modal('hide')
            alertFactory.error('Introduce el Token de Verificación')
          } else {
            detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_termino).then(function (r_token) {
              if (r_token.data[0].Success) {
                detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function (c_token) {
                  alertFactory.success('Se ha pasado a estatus Entrega')

                  if ($scope.hasDetalleModulo(6, 19) === true) {
                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                      if (resp.data.length > 0) {
                        var correoDe = resp.data[0].correoDe
                        var correoPara = resp.data[0].correoPara
                        var asunto = resp.data[0].asunto
                        var texto = resp.data[0].texto
                        var bodyhtml = resp.data[0].bodyhtml
                        commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                          if (result.data.length > 0) { }
                        }, function (error) {
                          // alertFactory.error('No se puede enviar el correo')
                        })
                      }
                    }, function (error) {
                      // alertFactory.error("Error al obtener información para el mail")
                    })
                  }

                  $('html, body').animate({
                    scrollTop: 0
                  }, 1000)
                  // $scope.init()
                  $scope.token_termino = ''
                  $('#loadModal').modal('show')
                  $scope.getReporteConformidad($scope.detalleOrden.idOrden)
                  // $('#loadModal').modal('hide')
                })
              } else {
                $('#loadModal').modal('hide')
                alertFactory.error(r_token.data[0].Msg)
                $scope.token_termino = ''
              }
            })
          }
        } else {
          $('#loadModal').modal('hide')
          alertFactory.error('Aun quedan cotizaciones pendientes por revisar')
        }
      })
    } else if (objeto == 8) {
      //procesa token para estatus 8 para PEMEX(operacion 3)


      detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function (result) {
        if (result.data[0].RealizarOperacion) {
          if ($scope.token_termino == '' || $scope.token_termino === undefined) {
            $('#loadModal').modal('hide')
            alertFactory.error('Introduce el Token de Verificación')
          } else {
            //Cambia a estatus activo el token
            detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_termino).then(function (r_token) {
              if (r_token.data[0].Success) {
                $('html, body').animate({
                  scrollTop: 0
                }, 1000)
                $('#loadModal').modal('hide');
                $scope.estatusToken = '2';
                $scope.token_termino = ''
                $scope.getReporteConformidad($scope.detalleOrden.idOrden)
                alertFactory.success('Esta listo el ultimo token.');
              } else {
                $('#loadModal').modal('hide')
                alertFactory.error(r_token.data[0].Msg)
                $scope.token_termino = ''
              }
            })
          }
        } else {
          $('#loadModal').modal('hide')
          alertFactory.error('Aun quedan cotizaciones pendientes por revisar')
        }
      })
    } else {

      // if ($scope.validaProcesoProvisionamiento == 2) {
        detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function (result) {
          if (result.data[0].RealizarOperacion) {
            if ($scope.token_termino == '' || $scope.token_termino === undefined) {
              $('#loadModal').modal('hide')
              alertFactory.error('Introduce el Token de Verificación')
            } else {
              detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_termino).then(function (r_token) {
                if (r_token.data[0].Success) {
                  if($scope.idContratoOperacion == 3 || $scope.idContratoOperacion == 8){
                    if($scope.estatusToken == '1'){
                  detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function (c_token) {
                    alertFactory.success('Se ha pasado a estatus Cobranza')

                    if ($scope.hasDetalleModulo(7, 20) === true) {
                      commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                        if (resp.data.length > 0) {
                          var correoDe = resp.data[0].correoDe
                          var correoPara = resp.data[0].correoPara
                          var asunto = resp.data[0].asunto
                          var texto = resp.data[0].texto
                          var bodyhtml = resp.data[0].bodyhtml
                          commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                            if (result.data.length > 0) { }
                          }, function (error) {
                            // alertFactory.error('No se puede enviar el correo')
                          })
                        }
                      }, function (error) {
                        // alertFactory.error("Error al obtener información para el mail")
                      })
                    }

                    $('html, body').animate({
                      scrollTop: 0
                    }, 1000)
                    // $scope.init()
                    $scope.token_termino = ''
                    $('#loadModal').modal('show')
                    $scope.getReporteConformidad($scope.detalleOrden.idOrden)
                    // $('#loadModal').modal('hide')
                  })
                }else{
                  $('html, body').animate({
                    scrollTop: 0
                  }, 1000)
                  $('#loadModal').modal('hide');
                  $scope.estatusToken = '1';
                  $scope.token_termino = ''
                  $scope.getReporteConformidad($scope.detalleOrden.idOrden)
                  alertFactory.success('Es necesario agregar el segundo token.');
                }

                }else{
                  detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function (c_token) {
                    alertFactory.success('Se ha pasado a estatus Cobranza')

                    if ($scope.hasDetalleModulo(7, 20) === true) {
                      commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                        if (resp.data.length > 0) {
                          var correoDe = resp.data[0].correoDe
                          var correoPara = resp.data[0].correoPara
                          var asunto = resp.data[0].asunto
                          var texto = resp.data[0].texto
                          var bodyhtml = resp.data[0].bodyhtml
                          commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                            if (result.data.length > 0) { }
                          }, function (error) {
                            // alertFactory.error('No se puede enviar el correo')
                          })
                        }
                      }, function (error) {
                        // alertFactory.error("Error al obtener información para el mail")
                      })
                    }

                    $('html, body').animate({
                      scrollTop: 0
                    }, 1000)
                    // $scope.init()
                    $scope.token_termino = ''
                    $('#loadModal').modal('show')
                    $scope.getReporteConformidad($scope.detalleOrden.idOrden)
                    // $('#loadModal').modal('hide')
                  })
                }
                } else {
                  $('#loadModal').modal('hide')
                  alertFactory.error(r_token.data[0].Msg)
                  $scope.token_termino = ''
                }
              })
            }
          } else {
            $('#loadModal').modal('hide')
            alertFactory.error('Aun quedan cotizaciones pendientes por revisar')
          }
        })
      // } else {
      //   $('#loadModal').modal('hide')
      //   swal('Advertencia!', 'La orden se debe provisionar')
      // }
    }
  }

  $scope.ValidaPorCobrar = function () {
    detalleRepository.validaCotizacionesRevisadas($scope.detalleOrden.idOrden).then(function (result) {
      if (result.data[0].RealizarOperacion) {
        if ($scope.token_termino == '' || $scope.token_termino === undefined) {
          alertFactory.error('Introduce el Token de Verificación')
        } else {
          detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_termino).then(function (r_token) {
            if (r_token.data[0].Success) {
                  detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function (c_token) {
                    alertFactory.success('Se ha pasado a Orden por Cobrar')
                    commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                      if (resp.data.length > 0) {
                        var correoDe = resp.data[0].correoDe
                        var correoPara = resp.data[0].correoPara
                        var asunto = resp.data[0].asunto
                        var texto = resp.data[0].texto
                        var bodyhtml = resp.data[0].bodyhtml
                        commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                          $('html, body').animate({
                            scrollTop: 0
                          }, 1000)
                          // $scope.init()
                          $scope.token_termino = ''
                          $('#loadModal').modal('show')
                          $scope.getReporteConformidad($scope.detalleOrden.idOrden)
                        }, function (error) {
                          // alertFactory.error('No se puede enviar el correo')
                        })
                      }
                    }, function (error) {
                      // alertFactory.error("Error al obtener información para el mail")
                    })
                  })
            } else {
              alertFactory.error(r_token.data[0].Msg)
              $scope.token_termino = ''
            }
          })
        }
      } else {
        alertFactory.error('Aun quedan cotizaciones pendientes por revisar')
      }
    })
  }

  $('.token-group button i').hide()
  $scope.ValidaUtilidad = function () {
    $('.token-group input').attr('disabled', 'disabled')
    $('.token-group button').attr('disabled', 'disabled')
    $('.token-group button i').show()

    if ($scope.token_utilidad == '' || $scope.token_utilidad === undefined) {
      alertFactory.error('Introduce el Token de Verificación')
      $('.token-group input').removeAttr('disabled')
      $('.token-group button').removeAttr('disabled')
      $('.token-group button i').hide()
    } else {
      detalleRepository.validaToken($scope.detalleOrden.idOrden, $scope.token_utilidad).then(function (r_token) {
        if (r_token.data[0].Success) {
          $scope.token_utilidad = ''
          detalleRepository.tokenEstatus($scope.detalleOrden.idOrden).then(function (resp) { })
          detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function (result) {
            if ($scope.hasDetalleModulo(5, 14) === true) {
              commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                if (resp.data.length > 0) {
                  var correoDe = resp.data[0].correoDe
                  var correoPara = resp.data[0].correoPara
                  var asunto = resp.data[0].asunto
                  var texto = resp.data[0].texto
                  var bodyhtml = resp.data[0].bodyhtml
                  commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                    if (result.data.length > 0) { }
                  }, function (error) {
                    // alertFactory.error('No se puede enviar el correo')
                  })
                }
              }, function (error) {
                // alertFactory.error("Error al obtener información para el mail")
              })
            }

            location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4'
          })
        } else {
          alertFactory.error(r_token.data[0].Msg)
          $scope.token_termino = ''

          $scope.token_utilidad = ''
          $('.token-group input').removeAttr('disabled')
          $('.token-group button').removeAttr('disabled')
          $('.token-group button i').hide()
        }
      })
    }
  }

  $scope.RechazarTrabajo = function () {
    /* swal({
             title: "¿Estas seguro?",
             text: "Al rechazar el trabajo éste se cambiara a estatus 'Proceso'",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: "#DD083F",
             confirmButtonText: "Rechazar trabajo",
             cancelButtonText: "Cerrar",
             cancelButtonColor: "#DD083F",
             closeOnConfirm: false
         },
         function() {

         });*/
    $('#ModalRechazoTrabajo').modal()
    $scope.motivo_rechazoTrabajo = ''
  }

  $scope.aceptarRechazoTrabajo = function () {
    if ($scope.motivo_rechazoTrabajo != '') {
      $('#ModalRechazoTrabajo').modal('hide')
      $('#loadModal').modal('show')

      detalleRepository.rechazaTrabajo($scope.detalleOrden.idOrden, $scope.idUsuario, $scope.motivo_rechazoTrabajo).then(function (Rechazado) {
        if ($scope.hasDetalleModulo(5, 14) === true) {
          commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
            if (resp.data.length > 0) {
              var correoDe = resp.data[0].correoDe
              var correoPara = resp.data[0].correoPara
              var asunto = resp.data[0].asunto
              var texto = resp.data[0].texto
              var bodyhtml = resp.data[0].bodyhtml
              commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                if (result.data.length > 0) { }
              }, function (error) {
                // alertFactory.error('No se puede enviar el correo')
              })
            }
          }, function (error) {
            // alertFactory.error("Error al obtener información para el mail")
          })
        }

        $('html, body').animate({
          scrollTop: 0
        }, 1000)

        $scope.init()
        swal('', 'Se ha rechazado el trabajo', 'success')
        $('#loadModal').modal('hide')
      })
    } else {
      alertFactory.info('Debes poner el motivo del rechazo del trabajo.')
    }
  }

  $scope.OpenModalShowFactura = function (numCotizacion) {
    $scope.numCotizacionFactura = numCotizacion
    $('#ModalShowFactura').modal()
  }

  $scope.OpenModalPlanAccion = function () {
    $('.calendarControl').datepicker('setDate', null)
    $scope.fechaAccion = ''
    $scope.horaAccion = ''
    $('#ModalPlanAccion').modal()
  }

  $scope.ShowFacturas = function () {
    detalleRepository.getFacturas($scope.numeroOrden, 3, $scope.userData.idUsuario, $scope.userData.contratoOperacionSeleccionada, global_settings.urlDOCS).then(function (respuesta) {
      $scope.Facturas = respuesta.data
      if ($scope.Facturas.success) {
        $scope.facturas_empty = false
        $scope.Facturas.data.forEach(function (item, key) {
          item.facturas.forEach(function (element, k) {
            $scope.totalfacturas++
          })
        })
      } else {
        $scope.facturas_empty = true
      }
    }, function (error) {
      $('#loadModal').modal('hide')
    })
  }
  // ********** [ Aqui Termina Ordenes en Proceso ] ******************************************************************************//

  $scope.checkComprobanteRecepcion = function () {
    detalleRepository.getExistsComprobanteRecepcion($scope.numeroOrden, 1).then(function (result) {
      var resultado = result.data[0]
      if (resultado[0].ID != 0) {
        $scope.validaCertificado = 1
      } else {
        $scope.validaCertificado = 0
      }
    }, function (error) {
      $('#loadModal').modal('hide')
      alertFactory.error('No se puede obtener el historico de la orden.')
    })
  }

  $scope.validaHojaTrabajo = false
  $scope.checkHojaTrabajo = function () {
    detalleRepository.getExistsComprobanteRecepcion($scope.numeroOrden, 2).then(function (result) {
      var resultado = result.data[0]
      if (resultado[0].ID != 0) {
        $scope.validaHojaTrabajo = true
      } else {
        $scope.validaHojaTrabajo = false
      }
    }, function (error) {
      $('#loadModal').modal('hide')
      alertFactory.error('No se puede obtener el historico de la orden.')
    })
  }

  $scope.creaURLS = function () {
    // //////////////////////// Sección de ComprobanteRecepcion //////////////////////////
    $scope.urlRecepcion = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/comprobanteRecepcion/ComprobanteRecepcion.pdf'
    $scope.HistoricoOrden.forEach(function (item) {
      if (item.idEstatusOrden == 3) {
        $scope.userRecepcion = item.nombreCompleto
        $scope.fechaRecepcion = item.fecha
      }
    })

    // //////////////////////// Sección de Hoja de Trabajo //////////////////////////
    if(($scope.idEstatusOrden <= 7) && ($scope.migracion == 1) && ($scope.idContratoOperacion == 3)){
       $scope.urlTrabajo = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/hojaTrabajo/CConformidadOriginal.pdf'
    }else{
        $scope.urlTrabajo = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/hojaTrabajo/Recibo_Comprobante.pdf'
    }
    // $scope.urlTrabajo = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/hojaTrabajo/Recibo_Comprobante.pdf'
    $scope.HistoricoOrden.forEach(function (item) {
      if (item.idEstatusOrden == 6) {
        $scope.userTermino = item.nombreCompleto
        $scope.fechaTermino = item.fecha
      }
    })

    detalleRepository.getUsuarioHojaTrabajo($scope.numeroOrden, $scope.userData.contratoOperacionSeleccionada).then(function (result) {
      if (result.data.length > 0) {
        $scope.showApruebaTermino = true
        $scope.userApruebaTermino = result.data[0].nombreCompleto
        $scope.userFechaApruebaTermino = result.data[0].fechaHora
      } else {
        $scope.showApruebaTermino = false
        $scope.userApruebaTermino = ''
        $scope.userFechaApruebaTermino = ''
      }
    }, function (error) {
      $scope.showApruebaTermino = false
      $scope.userApruebaTermino = ''
      $scope.userFechaApruebaTermino = ''
    })
  }

  $scope.archivoEvidencia = function (dato) {
    if (dato == 1)
      url = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/comprobanteRecepcion/ComprobanteRecepcion.pdf'
    window.open(url)
  }

  $scope.OpenTrabajo = function () {
    if(($scope.idEstatusOrden <= 7) && ($scope.migracion == 1) && ($scope.idContratoOperacion == 3)){
      var url = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/hojaTrabajo/CConformidadOriginal.pdf'
    }else{
      var url = $rootScope.docServer + '/orden/' + $scope.idOrdenURL + '/hojaTrabajo/Recibo_Comprobante.pdf'
    }
      window.open(url)
  }

  $scope.acciones = function () {
    if (($scope.comentaAccion != undefined && $scope.comentaAccion != '') && ($scope.fechaAccion != undefined && $scope.fechaAccion != '')) {
      // FAL 12072017 calcula la nueva fecha
      $scope.fechaCompleta = $scope.fechaAccion + ' ' + $scope.horaAccion
      detalleRepository.postAcciones($scope.comentaAccion, $scope.fechaCompleta, $scope.userData.idUsuario, $scope.idOrdenURL, $scope.idEstatusOrden).then(function (result) {
        if (result.data.length > 0) {
          alertFactory.success('Se inserto correctamente la Acción')
          $scope.getOrdenDetalle($scope.userData.idUsuario, $scope.numeroOrden)
          $scope.comentaAccion = ''
          $scope.fechaAccion = ''
          $('#ModalPlanAccion').modal('hide')
        }
      }, function (error) {
        alertFactory.error('No se puede guardar accion, intente mas tarde o comuniquese con el administrador')
      })
    } else {
      alertFactory.info('Porfavor llene todos los campos')
    }
  }

  $scope.recordatorio = function () {
    if (($scope.comentaRecordatorio != undefined && $scope.comentaRecordatorio != '') &&
      ($scope.fechaRecordatorio != undefined && $scope.fechaRecordatorio != '') &&
      ($scope.horaRecordatorio != undefined && $scope.horaRecordatorio != '')) {
      $scope.fechaCompleta = $scope.fechaRecordatorio + ' ' + $scope.horaRecordatorio
      detalleRepository.postRecordatorio($scope.comentaRecordatorio, $scope.fechaCompleta, $scope.userData.idUsuario, $scope.idOrdenURL).then(function (result) {
        if (result.data.length > 0) {
          alertFactory.success('Se inserto correctamente el Recordatorio')
          $scope.comentaRecordatorio = ''
          $scope.fechaRecordatorio = ''
          $scope.horaRecordatorio = ''
          $scope.fechaCompleta = ''
        }
      }, function (error) {
        alertFactory.error('No se puede guardar recordatorio, intente mas tarde o comuniquese con el administrador')
      })
    } else {
      alertFactory.info('Porfavor llene todos los campos')
    }
  }

  $scope.editarCita = function () {
    $scope.class_buttonEditarCita = 'fa fa-spinner fa-spin'
    location.href = '/nuevacita?economico=' + $scope.detalleOrden.numeroEconomico + '&orden=' + $scope.detalleOrden.idOrden
  }

  $scope.validateEstatusAprobacion = function () {
    var bandera = true
    $('#loadModal').modal('show')
    if ($scope.cotizaciones != undefined) {
      $scope.cotizaciones.forEach(function (item) {
        /*   if (item.idTaller != 0){
               if (item.detalle != null || item.detalle != undefined){
                   item.detalle.forEach(function(itemDetail) {
                       if (itemDetail.costo == 0) {
                           bandera = false
                       }
                   })
               }
           }*/
      })

      if (bandera) {
        if ($scope.userData.manejoUtilidad == 1) {
          $scope.enviaAprobacion()
        } else {
          $scope.estatusAprobacion()
        }
      } else {
        $('#loadModal').modal('hide')
        swal('No se puede enviar a aprobación ya que cuenta con partidas sin precio asignado.')
      }
    } else {
      $('#loadModal').modal('hide')
      swal('Debe de contar con una cotización.')
    }
  }

  // utilidad
  $scope.enviaAprobacion = function () {
    var uitilidad = ($scope.totalSumaVenta - $scope.totalSumaCosto) / $scope.totalSumaVenta
    var margen = (($scope.totalSumaVenta - $scope.totalSumaCosto) * 100) / $scope.totalSumaVenta

    var UtilidadNeta = ($scope.userData.porcentajeUtilidad * .01)

    if (UtilidadNeta > uitilidad) {
      swal({
        title: 'La utilidad es menor a lo esperado',
        text: '¿Desea continuar con el margen de ' + margen.toFixed(2) + '%?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#65BD10',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        cancelButtonColor: '#DD083F',
        closeOnConfirm: false,
        closeOnCancel: true
      },
        function (isConfirm) {
          if (isConfirm) {
            utilidadesRepository.putUtilidad($scope.idOrden, $scope.userData.idUsuario, margen.toFixed(2)).then(function (result) {
              if (result.data.length > 0) {
                if (result.data[0].idAprobacionUtilidad > 0) {
                  swal('La orden se encuentra en espera de Aprobación de Utilidad')
                  $scope.margen = margen
                  $scope.show_tokenMargen = true

                  commonFunctionRepository.dataMailUtilidad($scope.idOrden, $scope.userData.idUsuario, $scope.cotizaciones[0].idCotizacion).then(function (resp) {
                    if (resp.data.length > 0) {
                      var correoDe = resp.data[0].correoDe
                      var correoPara = resp.data[0].correoPara
                      var asunto = resp.data[0].asunto
                      var texto = resp.data[0].texto
                      var bodyhtml = resp.data[0].bodyhtml
                      commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                        // $scope.estatusAprobacion()
                        alertFactory.info('Se notifico por correo la utilidad')
                        $('#loadModal').modal('hide')
                      }, function (error) {
                        $('#loadModal').modal('hide')
                        alertFactory.error('No se puede enviar el correo')
                      })
                    }
                  }, function (error) {
                    $('#loadModal').modal('hide')
                    alertFactory.error('Error al obtener información para el mail')
                  })
                } else {
                  $('#loadModal').modal('hide')
                  swal('La orden se encuentra en espera de Aprobación de Utilidad')
                }
              }
            }, function (error) {
              $('#loadModal').modal('hide')
              alertFactory.error('No se puede guardar accion, intente mas tarde o comuniquese con el administrador')
            })
          }
        })
    } else {
      $scope.estatusAprobacion()
    }
  }

  $scope.estatusUtilidad = function () {
    utilidadesRepository.getValidacionAprobacion($scope.idOrden).then(function (result) {
      if (result.data.length > 0) {
        if (result.data[0].idAprobacionUtilidad > 0) {
          if (result.data[0].estatusAprobacion == 1) {
            $scope.show_tokenMargen = true
          } else {
            $scope.show_tokenMargen = false
          }
        } else {
          $scope.show_tokenMargen = false
        }
      }
    }, function (error) {
      alertFactory.error('No se puede guardar accion, intente mas tarde o comuniquese con el administrador')
    })
  }

  $scope.estatusAprobacion = function () {
    swal({
      title: '¿Está seguro que desea enviar la Orden a aprobación?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#65BD10',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      cancelButtonColor: '#DD083F',
      closeOnConfirm: false,
      closeOnCancel: false
    },
      function (isConfirm) {
        if (isConfirm) {
          detalleRepository.CambiaStatusOrden($scope.detalleOrden.idOrden, $scope.idUsuario).then(function (result) {
            if ($scope.hasDetalleModulo(5, 14) === true) {
              commonFunctionRepository.dataMail($scope.idOrden, $scope.userData.idUsuario).then(function (resp) {
                if (resp.data.length > 0) {
                  var correoDe = resp.data[0].correoDe
                  var correoPara = resp.data[0].correoPara
                  var asunto = resp.data[0].asunto
                  var texto = resp.data[0].texto
                  var bodyhtml = resp.data[0].bodyhtml
                  commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                    if (result.data.length > 0) { }
                  }, function (error) {
                    // alertFactory.error('No se puede enviar el correo')
                  })
                }
              }, function (error) {
                // alertFactory.error("Error al obtener información para el mail")
              })
            }

            $('#loadModal').modal('hide')
            setTimeout(function () {
              location.href = '/detalle?orden=' + $routeParams.orden + '&estatus=4'
            }, 1500)
          })
          swal('Orden en aprobación!')
        } else {
          $('#loadModal').modal('hide')
          swal('La Orden no se envió a aprobación!')
        }
      })
  }

  $scope.validaFacturaCotizacion = function (provision) {
    if ($scope.estadoProveedor == true) {
      swal({
        title: 'Advertencia',
        text: '¿Está seguro de aprobar la provisión de la orden?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#67BF11',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        closeOnConfirm: true,
        closeOnCancel: true
      },
        function (isConfirm) {
          if (isConfirm) {
            detalleRepository.getfacturaCotizacion($scope.idOrden, $scope.userData.idUsuario, $scope.userData.idOperacion, $scope.userData.isProduction).then(function (result) {
              if (result.data[0].success == 1) {
                detalleRepository.insertaBPRO($scope.idOrden, $scope.userData.idUsuario, $scope.userData.idOperacion, $scope.userData.isProduction).then(function (result) {
                  if (result.data.length > 0) {
                    alertFactory.info('Se ha provisionado correctamente')
                    swal('Proceso Realizado')
                    $('html, body').animate({
                      scrollTop: 0
                    }, 1000)
                    $scope.init()
                  }
                }, function (error) {
                  alertFactory.error('No se pudo insertar en BPRO')
                })
              } else {
                alertFactory.info('Faltan cargar facturas')
              }
            }, function (error) {
              alertFactory.error('No se pudo revisar estatus de facturas')
            })
          }
        })
    } else {
      swal('Aun se tienen facturas por subir y/o datos incompletos del proveedor!', 'Favor de contactar a desarrolloproveedores@centraldeoperaciones.com')
    }
  }

  // Abre la modal para confirmar la cancelación de la orden
  $scope.CancelarCita = function () {
    swal({
      title: '¿Esta seguro que desea cancelar la Cita?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#65BD10',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      closeOnConfirm: true,
      closeOnCancel: true
    },
      function (isConfirm) {
        if (isConfirm) {
          $scope.cancelarOrden()
        } else {
          swal('Cita no cancelada')
        }
      })
  }

  $scope.cancelarOrden = function () {
    $scope.tipoComentario = 2
    $('.modal-dialog').css('width', '1050px')
    modal_agregarComentario($scope, $modal, $scope.preCancelaComents, '')
  }

  $scope.preCancelaComents = function (comentario) {
    PreCancelationProcess($scope.userData.idRol, comentario)
  }

  function PreCancelationProcess(rol, comentario) {
    var messageSuccess = (rol !== 2) ? 'Se ha realizado una pre-cancelación, espera hasta que el administrador apruebe el cambio.' : 'Se ha realizado una pre-cancelación, al ser administrador puedes aprobar el cambio en pre-cancelaciones.'
    if (comentario !== '') {
      detalleRepository.postPreCancelaOrden($scope.userData.idUsuario, $scope.detalleOrden.idOrden, comentario).then(function (result) {
        preCancelacionesRepository.postGetMailNotification($scope.userData.idUsuario, $scope.detalleOrden.idOrden, 1).then(function (result2) {
          var correoDe = result2.data[0].correoDe
          var correoPara = result2.data[0].correoPara
          var bodyHtml = result2.data[0].bodyhtml
          commonFunctionRepository.sendMail(correoDe, correoPara, 'Pre-Cancelación', 'Ordenes', bodyHtml, '', '').then(function (response) {
            swal({
              title: 'Pre-cancelación',
              text: messageSuccess,
              type: 'success',
              showCancelButton: false
            },
              function () {
                location.href = '/consultaCitas'
              })
          })
        })
      }, function (error) {
        alertFactory.error('No se pudo realizar la pre-cancelacion, intentelo más tarde')
      })
    }
  }

  $scope.validaFacturaCotizacionBoton = function () {
    detalleRepository.getfacturaCotizacion($scope.idOrden, $scope.userData.idUsuario, $scope.userData.idOperacion, 1).then(function (result) {
    // detalleRepository.getfacturaCotizacion($scope.idOrden, $scope.userData.idUsuario, $scope.userData.idOperacion, $scope.userData.isProduction).then(function (result) {

      if (result.data[0].success == 1) {
        $scope.botonProcesarCompra = true
        $scope.estadoProveedor = true
      } else if (result.data[0].success == 0) {
        $scope.botonProcesarCompra = true
        $scope.estadoProveedor = false
      } else if (result.data[0].success == 2) {
        $scope.botonProcesarCompra = false
        $scope.estadoCompra = true
        $scope.procesarCompra = 'PROVISIONADO'
      } else {
        $scope.botonProcesarCompra = false
      }
      $scope.validaProcesoProvisionamiento = result.data[0].success
    }, function (error) {
      alertFactory.error('No se pudo revisar estatus de facturas')
    })
  }

  // Abre la modal para confirmar la cancelación de la orden
  $scope.cancelarAprobacion = function (Cotizacion) {
    $('.btnTerminarTrabajo').ready(function () {
      swal({
        title: '¿Esta seguro que desea cancelar la cotización?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#65BD10',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        closeOnConfirm: false,
        closeOnCancel: false
      },
        function (isConfirm) {
          if (isConfirm) {
            $scope.cancelarCotizacion(Cotizacion.idCotizacion)
            location.href = '/unidad?economico=' + $scope.detalleOrden.numeroEconomico
            // location.href = "/detalle?orden=" + $scope.numeroOrden + "&estatus=4"
          } else {
            swal('Cotizacion no cancelada')
          }
        })
    })
  }

  $scope.cancelarCotizacion = function (idCotizacion) {
    $scope.promise = cotizacionConsultaRepository.cancelaCotizacion($scope.userData.idUsuario, idCotizacion).then(function () {
      swal('Trabajo terminado!', 'La cotización se ha cancelado')
    },
      function (error) {
        alertFactory.error('No se pudo cancelar la cotización, inténtelo más tarde.')
      })
  }

  $scope.realizaProvision = function () {
    $scope.promise = detalleRepository.postaproviosionamiento($scope.idOrden, $scope.userData.idUsuario, $scope.userData.idOperacion, $scope.userData.isProduction).then(function () {
      swal('Trabajo terminado!', 'La orden se ha provisionado corractamente')
      $scope.aprovisonamiento = null
      // localStorageService.remove('provision')
      $('html, body').animate({
        scrollTop: 0
      }, 1000)
      $scope.init()
    },
      function (error) {
        alertFactory.error('No se pudo cancelar la cotización, inténtelo más tarde.')
      })
  }
  // Funcion para genear comentarios
  $scope.agregarComentario = function (tipoComentario, partida) {
    $scope.tipoComentario = 1
    // tipoComentario=1 <-- Cuando se rechaza una partida
    var repetido = 0
    angular.forEach($scope.comentarios, function (value, key) {
      if (value.id == partida.idPartida) { repetido++; } else { }
    })
    if (repetido != 0) { } else {
      $scope.partidaComentario = []
      $scope.partidaComentario = partida
      $('.modal-dialog').css('width', '1050px')
      modal_agregarComentario($scope, $modal, $scope.resultadoComentario, '')
    }
  }
  $scope.resultadoComentario = function (comentarios) {
    if ($scope.tipoComentario == 1) {
      var comments
      comentarios == '' ? comments = '' : comments = 'Número de Parte: ' + $scope.partidaComentario.noParte + ' Comentario: ' + comentarios
      $scope.comentarios.push({
        id: $scope.partidaComentario.idPartida,
        comentario: comments
      })
    } else if ($scope.tipoComentario == 2) {
      // if (comentarios != '' && comentarios != null && comentarios != undefined) {
      $scope.comentarios.push({
        comentario: comentarios
      })
      $scope.updateComentariosPartidas()
      $scope.cambiaEstatusOrdenTermino()
      // } else {
      //    $scope.class_buttonTerminaTrabajo = ''
      // }
    }
  }
  $scope.verificaComentario = function (tipoComentario, partida) {
    // tipoComentario=1 <-- Cuando se rechaza una partida
    angular.forEach($scope.comentarios, function (value, key) {
      if (value.id == partida.idPartida) {
        $scope.comentarios.splice((key), 1)
      } else { }
    })
  }
  $scope.updateComentariosPartidas = function () {
    if ($scope.tipoComentario == 1) {
      angular.forEach($scope.comentarios, function (value, key) {
        detalleRepository.insNota(value.comentario, $scope.numeroOrden, $scope.userData.idUsuario, $scope.idEstatusOrden).then(function (result) {
          if (result.data.length > 0) {
            $scope.notaTrabajo = result.data
          }
        }, function (error) {
          alertFactory.error('No se pudieron obtener las notas')
        })
      })
    } else if ($scope.tipoComentario == 2) {
      detalleRepository.insNota($scope.comentarios[0].comentario, $scope.numeroOrden, $scope.userData.idUsuario, 6).then(function (result) {
        if (result.data.length > 0) {
          $scope.notaTrabajo = result.data
        }
      }, function (error) {
        alertFactory.error('No se pudieron obtener las notas')
      })
    }

    $scope.comentarios = []
  }
  $scope.addComentarioTermino = function () {
    $scope.tipoComentario = 2
    $('.modal-dialog').css('width', '1050px')
    modal_agregarComentario($scope, $modal, $scope.resultadoComentario, '')
  }
  // Termina lo de comentarios
  // FAL 12072017 funciones para no permitir planes difernetes de la fecha actual
  $scope.NoFechaAntigua = function (fecha) {
    var CurrentDate = new Date()
    var anio = CurrentDate.getFullYear()
    var mes = CurrentDate.getMonth() + 1
    var dia = CurrentDate.getDate()
    var diaActual = new Date(anio + '/' + mes + '/' + dia)
    var fechaSeleccionada = new Date(fecha)

    if (fechaSeleccionada < diaActual) {
      $scope.fechaAccion = ''
      $scope.horaAccion = ''
      $scope.SeleccionoDiaActual = false
      alertFactory.info('No puede seleccionar una fecha anterior.')
    }

    if (!(fechaSeleccionada < diaActual) && !(fechaSeleccionada > diaActual)) {
      $scope.SeleccionoDiaActual = true
      if ($scope.horaAccion != undefined && $scope.horaAccion != '' && $scope.horaAccion != null) {
        $scope.NoHoraAntigua($scope.horaAccion)
      }
    }

    if (fechaSeleccionada > diaActual) {
      $scope.SeleccionoDiaActual = false
    }
  }

  $scope.NoHoraAntigua = function (hora) {
    if ($scope.fechaAccion != undefined && $scope.fechaAccion != '' && $scope.fechaAccion != null) {
      if ($scope.SeleccionoDiaActual == true) {
        var HoraActual = new Date()
        var anio = HoraActual.getFullYear()
        var mes = HoraActual.getMonth() + 1
        var dia = HoraActual.getDate()
        var HoraSeleccionada = new Date(anio + '/' + mes + '/' + dia + ' ' + hora + ':00.000')

        if (!(HoraSeleccionada > HoraActual)) {
          $scope.horaAccion = ''
          alertFactory.info('No puede seleccionar una hora anterior.')
        }
      }
    } else {
      $scope.horaAccion = ''
      alertFactory.info('Seleccione antes la fecha del recordatorio.')
    }
  }

  // FAL 14072017   direccionamiento a preorden-cotizacion
  $scope.irpreordenCotizacion = function (idCotizacion) {
    $scope.class_buttonNuevaCotizacion = 'fa fa-spinner fa-spin'
    location.href = '/preordenCotizacion?idCotizacion=' + idCotizacion + '&orden=' + $scope.numeroOrden
  }

  $scope.hasDetalleModulo = function (idCatalogoModulo, idCatalogoDetalleModulo) {
    var hasDM = false
    angular.forEach($scope.userData.Modulos, function (modulo) {
      if (modulo.idCatalogoModulo == idCatalogoModulo) {
        angular.forEach(modulo.detalle, function (detalleModulo, key) {
          if (detalleModulo.idCatalogoDetalleModulo == idCatalogoDetalleModulo) {
            hasDM = true
          }
        })
      }
    })

    return hasDM
  }

  $scope.certificado = function () {
    $('#loadModal').modal('show');
    $scope.getReporteConformidad($scope.idOrdenURL);
  }

  // Abre Instructivo
  $scope.openPDF = function (str) {
    window.open(str, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
  }

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

    $scope.CancelOrder = function() {
        swal({
            title: "Cancelar Orden",
            text: "Cancela la orden",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                CancelOrderProcess();
            } else {
                swal("Ninguna acción realizada.");
            }

        });
    }

    function CancelOrderProcess() {
        detalleRepository.postCancelaOrden($scope.userData.idUsuario, $scope.idOrdenURL).then(function(result) {
                        swal({
                            title: "Trabajo terminado",
                            message: "La cita se ha cancelado",
                            type: 'success',
                            showCancelButton: false
                        }, function() {
                            location.reload();
                        });
            });
    }

    $scope.prb1 = function(CotizacionDetalle) {
        angular.copy(CotizacionDetalle, $scope.cotizacionDetalle);
        $('#editorDetalleCotizacion').modal();

    }

    $scope.updateTallerSoporte = function (){
      if ($scope.estadoCompra === true){
          swal('Advertencia!', 'La orden se encuentra provisionada.');
      }else{
          $scope.updateTallerSoporteModal();
      }
    }

    $scope.updateTallerSoporteModal = function(){

      detalleRepository.getcotizacionbyOrden($scope.idOrdenURL).then(function (resp) {
          if (angular.isArray(resp.data)) {
            $scope.cotizaTallerSoporte = null;
            $scope.cotizacionSeleccionada = [];
            $scope.cotizacionTalleresSoporte = resp.data;

            preordenCotizacionRepository.getTalleres($scope.userData.idUsuario, $scope.idContratoOperacion, $scope.detalleOrden.idTipoUnidad).then(function(result) {
                if (angular.isArray(result.data)) {
                    $scope.tallerSeleccionado = {};
                    $scope.talleres = result.data;
                    globalFactory.filtrosTabla("proveedoresTable", "Talleres", 5);
                    $('#modalActualizaTaller').modal('show');
                } else {
                    $scope.tallerSeleccionado = {};
                    $scope.talleres = [];
                    globalFactory.filtrosTabla("proveedoresTable", "Talleres", 5);
                    alertFactory.info('El usuario no tiene talleres asignados');
                }
            }, function(error) {
                alertFactory.error('Ocurrio un error al buscar los talleres.');
            });

          }else{
            swal('No se encontro ninguna Cotización.');
          }
      }, function (error) {
        alertFactory.error('Ocurrio un error al buscar las cotizaciones.')
      });

    }

    $scope.selectTaller = function(tallerSel) {
        $scope.tallerSeleccionado = tallerSel;
    }

    $scope.selectCotizacionTaller = function(){

      $scope.cotizacionSeleccionada = [];
      $scope.tallerSeleccionado = {};

      $scope.cotizaciones.forEach(function (item){
          if (item.idCotizacion == $scope.cotizaTallerSoporte ){
            if (item.showFacturaCargada === true){
                swal('Advertencia!', 'La cotización se encuentra facturada.');
            }else{
                $scope.cotizacionSeleccionada.push(item);
            }
          }
      });

    }

    $scope.updateTallerCotizacion = function(){
        swal({
            title: "¿Está seguro de cambiar el taller de la cotización?",
            text: "Se cambiará el taller de la cotización "+$scope.cotizacionSeleccionada[0].numeroCotizacion+" por "+$scope.tallerSeleccionado.nombreComercial+".",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.actionUpdTaller();
            } else {
                $('#modalActualizaTaller').modal('hide');
                alertFactory.info('No se actualizó el taller de la cotización.');
            }
        });

    }

    $scope.actionUpdTaller = function (){
      detalleRepository.updSoporteActualizaTaller($scope.cotizacionSeleccionada[0].idCotizacion, $scope.tallerSeleccionado.idTaller, $scope.userData.idUsuario, $scope.userData.contratoOperacionSeleccionada).then(function(result){
        alertFactory.info(result.data[0].Msg);
        $('#modalActualizaTaller').modal('hide');
        $scope.init();
        // location.href = '/detalle?orden=' + $routeParams.orden;

      }, function(error){
          $('#modalActualizaTaller').modal('hide');
          $scope.init();
      });
    }

    $scope.updateDetalleCotizacion = function(){
        $('#editorDetalleCotizacion').modal('hide');
        detalleRepository.updateDetalleCotizacion($scope.cotizacionDetalle.idCotizacionDetalle, $scope.cotizacionDetalle.costo, $scope.cotizacionDetalle.venta, $scope.userData.idUsuario, $scope.cotizacionDetalle.cantidad)
        .then(function(response)
        {
            setTimeout(function() {
                $scope.getOrdenDetalle($scope.userData.idUsuario, $scope.numeroOrden)
                //location.href = '/detalle?orden=' + $routeParams.orden;
            }, 500)
            swal('Detalle actualizado!', 'Operación realizada corractamente');
        }, function(error) {
             alertFactory.error("Error al actualizar la información para el detalle")
        })
    }

    $scope.reenviarHojaUtilidad = function() {
        swal({
            title: "¿Esta seguro de enviar la hoja de utilidad?",
            text: "Correo de Utilidad",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.reenviarHojaUtilidadSoporte();
            } else {
                swal("Operacion cancelada.");
            }

        });
    }

    $scope.reenviarHojaUtilidadSoporte = function(){
      $('#loadModal').modal('show');
      detalleRepository.getRealizaSoporte($scope.idOrdenURL, 0, $scope.idUsuario, $scope.userData.contratoOperacionSeleccionada, $scope.userData.isProduction, 1, 0).then(function (resp) {
          if (resp.data.length > 0) {
              var correoDe = resp.data[0].correoDe
              var correoPara = resp.data[0].correoPara
              var asunto = resp.data[0].asunto
              var texto = resp.data[0].texto
              var bodyhtml = resp.data[0].bodyhtml
              commonFunctionRepository.sendMail(correoDe, correoPara, asunto, texto, bodyhtml, '', '').then(function (result) {
                if (result.data.length > 0) {
                    $('#loadModal').modal('hide')
                    $('.modal-dialog').css('width', '1050px')
                    swal('El correo de utlidad se envío exitosamente.')
                }
              }, function (error) {
                  $('#loadModal').modal('hide')
                  $('.modal-dialog').css('width', '1050px')
                 alertFactory.error('No se puede enviar el correo.')
              })
          }
      }, function (error) {
        alertFactory.error('Ocurrio un error al enviar el correo.')
      });
    };

    $scope.regeneraCertificadoConf = function() {
        swal({
            title: "¿Esta seguro de regenerar la Hoja de Trabajo?",
            text: "Hoja de Trabajo",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.regeneraCertificadoConfSoporte();
            } else {
                swal("Operacion cancelada.");
            }

        });
    }

  $scope.regeneraCertificadoConfSoporte = function () {
    $('#loadModal').modal('show');
    $scope.getReporteConformidad($scope.idOrdenURL);
  }

  $scope.detalleCotizacionFactura = function () {
    if ($scope.validaProcesoProvisionamiento != 2) {
      $('#ModalCotizaciones').modal();
    } else {
      swal('Advertencia!', 'La orden se encuentra provisionada')
    }
  }

    $scope.OpenModalFacturaRecarga = function (no, cf, ct, nc) {
      $('#ModalCotizaciones').modal('hide');
      $scope.idOrden = no
      $scope.cotizacionFactura = cf
      $scope.numeroCotizacion = nc
      $scope.cotizacionTotal = ct
      $scope.alert_respuesta = false
      $scope.validateUUID = 0

      $('.alert-warning').hide()
      $('#myModal').modal()
      $('.archivos').show()
      $('.uploading').hide()
      $('.btn-cerrar').removeAttr('disabled')
      $('.btn-subir').removeAttr('disabled')

      document.getElementById('frm_subir_factura').reset()

      var inputs = document.querySelectorAll('.inputfile')
      Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling
        label.querySelector('span').innerHTML = 'Seleccionar archivo'
      })
    }

    $scope.deleteProvision = function() {
        swal({
            title: "¿Esta seguro de cancelar la Provisión?",
            text: "Cancelar la Provisión",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.deleteProvisionSoporte();
            } else {
                swal("Operacion cancelada.");
            }

        });
    }

    $scope.deleteProvisionSoporte = function(){
      $('#loadModal').modal('show');
      detalleRepository.getRealizaSoporte($scope.idOrdenURL, 0, $scope.idUsuario, $scope.userData.contratoOperacionSeleccionada, $scope.userData.isProduction, 2, 0).then(function (resp) {
          if (resp.data[0].Success == 1) {
              $('#loadModal').modal('hide')
              $('.modal-dialog').css('width', '1050px')
              alertFactory.success(resp.data[0].Msg)
              $scope.validaFacturaCotizacionBoton();
          }else{
            $('#loadModal').modal('hide')
            $('.modal-dialog').css('width', '1050px')
            alertFactory.info(resp.data[0].Msg)
          }
      }, function (error) {
        alertFactory.error('Ocurrio un error al enviar el correo.')
      });
    };

    $scope.cancelacionOrden = function() {
      if ($scope.validaProcesoProvisionamiento != 2) {
        swal({
            title: "¿Esta seguro de cancelar la Orden?",
            text: "Cancelar la Orden",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.cancelacionOrdenSoporte();
            } else {
                swal("Operacion cancelada.");
            }

        });
        } else {
          swal('Advertencia!', 'La orden se encuentra provisionada')
        }
    }

    $scope.cancelacionOrdenSoporte = function(){
      $('#loadModal').modal('show');
      detalleRepository.getRealizaSoporte($scope.idOrdenURL, 0, $scope.idUsuario, $scope.userData.contratoOperacionSeleccionada, $scope.userData.isProduction, 3, 0).then(function (resp) {
          if (resp.data.length > 0) {
              $('#loadModal').modal('hide')
              $('.modal-dialog').css('width', '1050px')
              alertFactory.success('La Orden se cancelo exitosamente.')
              location.href = '/detalle?orden=' + $routeParams.orden;
          }
      }, function (error) {
        alertFactory.error('Ocurrio un error al enviar el correo.')
      });
    };

    $scope.cancelaCotizacion = function () {
      detalleRepository.getcotizacionbyOrden($scope.idOrdenURL).then(function (resp) {
          if (resp.data.length > 0) {
            if(resp.data.length == 1){
               swal('Para cancelar una cotización al menos debes tener mas de 2 cotizaciones de lo contrario debes cancelar la orden.')
            }else{
              $scope.cotizacionSoporte = resp.data;
               $('#cencelCotizaciones').modal();
            }
          }else{
            swal('No se encontro ninguna Cotización.')
          }
      }, function (error) {
        alertFactory.error('Ocurrio un error al buscar las cotizaciones.')
      });
    }

    $scope.cancelacionCotizacion = function(cotizaSoporte) {
        swal({
            title: "¿Esta seguro de cancelar la Cotización?",
            text: "Cancelar la Cotización",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.cancelacionCotizacionSoporte(cotizaSoporte);
            } else {
                swal("Operacion cancelada.");
            }
        });
    }

    $scope.cancelacionCotizacionSoporte = function(cotizaSoporte){
      $('#cencelCotizaciones').modal('hide')
      $('#loadModal').modal('show');
      detalleRepository.getRealizaSoporte($scope.idOrdenURL, cotizaSoporte, $scope.idUsuario, $scope.userData.contratoOperacionSeleccionada, $scope.userData.isProduction, 4, 0).then(function (resp) {
          if (resp.data.length > 0) {
              $('#loadModal').modal('hide')
              $('.modal-dialog').css('width', '1050px')
              alertFactory.success('La Cotización se cancelo exitosamente.')
              location.href = '/detalle?orden=' + $routeParams.orden;
          }
      }, function (error) {
        alertFactory.error('Ocurrio un error al cancelar la Cotización.')
      });
    };

  $scope.presupuestoOrden = function () {
    $scope.presupuestoOrdAct='';
    $scope.presupuestoCNTB='';
    $('.presupuestoCT').DataTable().destroy();
    $('.presupuestoOrdActiv').DataTable().destroy();
    $scope.getPresupuestoOrdenActivo();
    //$scope.getPresupuestoCentroTrabajo();
    $('#modalPresupuestoOrden').modal();
  }

  $scope.getPresupuestoOrdenActivo = function () {
      detalleRepository.getpresupuestobyOrden($scope.idOrdenURL, 1).then(function (resp) {
          if (resp.data.length > 0) {
              globalFactory.filtrosTabla("presupuestoOrdActiv", "Presupuesto Orden", 5);
              $scope.presupuestoOrdAct = resp.data;
                    //$scope.getPresupuestoCentroTrabajo = function () {
                      detalleRepository.getpresupuestobyOrden($scope.idOrdenURL, 2).then(function (resp) {
                          if (resp.data.length > 0) {
                              globalFactory.filtrosTabla("presupuestoCT", "Presupuesto CT", 100);
                              $scope.presupuestoCNTB = resp.data;
                          }else{
                            swal('No se encontro presupuesto para este Centro de Trabajo.')
                          }
                      }, function (error) {
                        alertFactory.error('Ocurrio un error al buscar los presupuesto por centro de trabajo.')
                      });
                    //}
          }else{
            swal('No se encontro Orden relacionada con presupuesto.')
          }
      }, function (error) {
        alertFactory.error('Ocurrio un error al buscar los registros en Presupuesto Orden.')
      });
    }

  $scope.sendIdPresupuesto = function(idPresupuesto) {
        swal({
            title: "¿Esta seguro de cambiar el Presupuesto Orden?",
            text: "Presupuesto Orden",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.sendIdPresupuestoSoporte(idPresupuesto);
            } else {
                swal("Operacion cancelada.");
            }
        });
    }

  $scope.sendIdPresupuestoSoporte = function (idPresupuesto) {
    $('#loadModal').modal('show');
      detalleRepository.getRealizaSoporte($scope.idOrdenURL, 0, $scope.idUsuario, $scope.userData.contratoOperacionSeleccionada, $scope.userData.isProduction, 6, idPresupuesto).then(function (resp) {
          if (resp.data.length > 0) {
              $('#loadModal').modal('hide')
              $('.modal-dialog').css('width', '1050px')
              alertFactory.success('La Orden se actualizo exitosamente.')
              location.href = '/detalle?orden=' + $routeParams.orden;
          }
      }, function (error) {
        alertFactory.error('Ocurrio un error al avanzar la Orden.')
      });
  }

  $scope.avanzaOrden = function() {
        swal({
            title: "¿Esta seguro de avanzar la Orden?",
            text: "Avanza la Orden",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                $scope.avanzaOrdenSoporte();
            } else {
                swal("Operacion cancelada.");
            }
        });
    }

    $scope.avanzaOrdenSoporte = function(){
      $('#loadModal').modal('show');
      detalleRepository.getRealizaSoporte($scope.idOrdenURL, 0, $scope.idUsuario, $scope.userData.contratoOperacionSeleccionada, $scope.userData.isProduction, 5, 0).then(function (resp) {
          if (resp.data.length > 0) {
              $('#loadModal').modal('hide')
              $('.modal-dialog').css('width', '1050px')
              alertFactory.success('La Orden se avanzo exitosamente.')
              location.href = '/detalle?orden=' + $routeParams.orden;
          }
      }, function (error) {
        alertFactory.error('Ocurrio un error al avanzar la Orden.')
      });
    };

    $scope.apptoken = function () {
      window.open('http://189.204.141.193:5300')
    }

    $scope.mostrarTipoUnidadVS2 = function()
    {
      var imageCar = "";

      $scope.detalleOrden;
       if($scope.detalleOrden != undefined)
         if($scope.detalleOrden.foto != '')
           imageCar = $scope.urldocs + '/partidas/' + $scope.detalleOrden.foto;

      var cuerpoModal =
        "<div class='form-group'>" +
          "<div class='ibox float-e-margins'>"+
            "<div class='ibox-title'>"+
              "<h5>"+ $scope.detalleOrden.tipoUnidad + " " + $scope.detalleOrden.numeroEconomico+"</h5>"+
                "<div>"+
                  "<div id='imageCARContent' class='ibox-content no-padding border-left-right'>"+
                    "<img id='imageCAR' alt='image' class='img-responsive' src='"+ imageCar +"'>"+
                  "</div>"+
                    "<div class='ibox-content profile-content'>"+
                      "<h4><strong>"+$scope.detalleOrden.marca+"</strong></h4>"+
                      "<p><i class='fa fa-map-marker'></i>"+ $scope.detalleOrden.subMarca+"</p>"+
                        "<div class='row'>"+
                          "<div class='col-md-4'>"+
                            "<div class='client-avatar'><img src='../image/resources/gsi.png' alt='foto'></div>"+
                            "<h5>"+$scope.detalleOrden.tipoCombustible+"</h5>"+
                          "</div>"+
                          "<div class='col-md-4'>"+
                            "<div class='client-avatar'> <img src='../image/resources/ci.png' alt='foto'> </div>"+
                            "<h5>"+$scope.detalleOrden.cilindros+"</h5>"+
                          "</div>"+
                          "<div class='col-md-4'>"+
                            "<div class='client-avatar'> <img src='../image/resources/mdl.png' alt='foto'> </div>"+
                            "<h5><strong>MODELO</strong>"+$scope.detalleOrden.modelo+"</h5>"+
                          "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"
          "</div>"+
        "</div>"
      $('#idPadreMuestraTipoUnidadVS2').append(
        cuerpoModal
      );
      $('#muestraTipoUnidadVS2').modal('show');
    }

    $scope.destruirMuestraTipoUnidadVS2 = function()
    {
      $('#idPadreMuestraTipoUnidadVS2').empty();
      $('#muestraTipoUnidadVS2').modal('hide');
    }

    $scope.prueba = function(url)
    {
      window.open(url);
    }

    $rootScope.$on('cambiaVersion', function() {
        //console.log(mass);
        //location.href = '/detalle?orden=' + $routeParams.orden;
        $scope.HomeBasic();
    });

    $scope.HomeBasic = function () {
    loginRepository.iniciaSesionHistorial($scope.userData.idUsuario).then(function (result) {
      var sesion = result.data[0].idSesion;
      $scope.userData = userFactory.setActiveSesion(sesion);
      if ($scope.userData.idRol == 3) {
        location.href = '/dashboardCallCenter';
      } else if ($scope.userData.idRol == 5) {
        location.href = '/configurador';
      } else {
        location.href = '/dashboardgeneral';
      }
    });
  }

   $scope.openCatEvidencia = function(urlEvidencia){
      window.open(urlEvidencia)
    }

    $scope.enviaComentario = function (idCotizacion) {
      $scope.notaComentario = []
      var notaComenta = $scope.textoComentario == '' ? null : $scope.textoComentario
      detalleRepository.insComentario(notaComenta, $scope.idOrdenURL, $scope.userData.idUsuario, $scope.idEstatusOrden, idCotizacion).then(function (result) {
        if (result.data.length > 0) {
          $scope.notaComentario = result.data
        }
      }, function (error) {
        alertFactory.error('No se pudieron obtener los comentarios')
        $('#loadModal').modal('hide')
      })
      $scope.textoComentario = null
    }

    $scope.accionComentario = function (idComentarioCotizacion, tipo, numeroCotizacion) {
      if(tipo == 1){
        swal({
            title: "¿Esta seguro de cancelar el comentario?",
            text: "Cancela Comentario",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
          if (isConfirm)
            {
              var tempComentario = Enumerable.From($scope.notaComentario).Where("$.idComentarioCotizacion == " + idComentarioCotizacion).FirstOrDefault();
              if(tempComentario != undefined)
              {
                tempComentario.estatus = 2;
                detalleRepository.updComentario(tempComentario).then(function (resp) {
                  if (resp.data[0].idComentarioCotizacion > 0) {
                    var tempComentarios = [];
                    for(var i = 0; i < $scope.notaComentario.length; i++)
                      if($scope.notaComentario[i].idComentarioCotizacion != idComentarioCotizacion)
                        tempComentarios.push($scope.notaComentario[i]);
                    $scope.notaComentario = [];
                    angular.copy(tempComentarios, $scope.notaComentario);
                    tempComentarios = [];
                    alertFactory.success('El comentario se modificó exitosamente.')
                  }
                }, function (error) {
                  alertFactory.error('Ocurrio un error al modificar comentario.')
                });
              }else
              {
                swal("No se encontró el comentario.");
              }
            } else {
            swal("Comentario cancelado.");
          }
        });
      }else if(tipo == 2){
        $scope.editaComentario = 1;
        angular.copy(Enumerable.From($scope.notaComentario).Where("$.idComentarioCotizacion == " + idComentarioCotizacion).FirstOrDefault(),$scope.comentarioNuevo);
        $('#pc'+numeroCotizacion).hide();
        $('#comment'+numeroCotizacion).show();
        $('#comment'+numeroCotizacion).focus();
        $('#comment'+numeroCotizacion).select();
      }
    }

    $scope.cancelaProceso = function (numeroCotizacion) {
        $scope.editaComentario = 0;
        $scope.comentarioNuevo = {};
        $('#comment'+numeroCotizacion).hide();
        $('#pc'+numeroCotizacion).show();
    }

    $scope.integrarCotizaciones = function () {
      if ($scope.estadoCompra === false) {
        detalleRepository.getcotizacionbyOrden($scope.idOrdenURL).then(function (resp) {
            if (resp.data.length > 0) {
              if(resp.data.length == 1){
                 swal('Para integrar una cotización al menos debes tener 2 cotizaciones del mismo taller.');
              }else{
                 //$scope.cotizacionSoporte = resp.data;

                   $scope.lists = [];
                   $scope.listTalleres = [];
                   $scope.cotizaciones.forEach(function(taller){
                       $scope.existsT = false;
                       $scope.listTalleres.forEach(function(t2){
                           if (t2.nombre == taller.nombreTaller){
                               $scope.existsT = true;
                           }
                       });
                       if ($scope.existsT == false){
                         var t = {
                             num: $scope.listTalleres.length + 1,
                             nombre: taller.nombreTaller
                         }
                         $scope.listTalleres.push(t);
                       }
                   });

                   $scope.cotizaciones.forEach(function(coti){
                     if(coti.showFacturaCargada === false){
                       if (coti.detalle != null || coti.detalle != undefined) {

                         var label = coti.numeroCotizacion;
                         var idCoti = coti.idCotizacion;
                         $scope.allowedTypes = coti.nombreTaller;
                         $scope.listTalleres.forEach(function(t){
                             if(t.nombre == $scope.allowedTypes){
                                 $scope.style = t.num;
                             }
                         });

                         var detalle = [];

                         coti.detalle.forEach(function(part){

                           var partObj = {
                               partida: part.partida,
                               noParte: part.noParte,
                               idCotizacionDetalle: part.idCotizacionDetalle,
                               type: $scope.allowedTypes,
                               style: $scope.style
                           }

                             detalle.push(partObj);
                         });

                         var cotiObj = {
                             label:  label,
                             allowedTypes: [$scope.allowedTypes],
                             idCotizacion: idCoti,
                             people: detalle
                         }

                         $scope.lists.push(cotiObj);
                       }
                     }
                   });

                if ($scope.lists.length > 0){
                 $('#integraCotizacion').modal();
               }else{
                 swal('Para integrar una cotización al menos debes tener 2 cotizaciones del mismo taller sin facturas cargadas.');
               }
              }
            }else{
              swal('No se encontro ninguna Cotización.')
            }
        }, function (error) {
          alertFactory.error('Ocurrio un error al buscar las cotizaciones.')
        });
      }else{
          swal('Advertencia!', 'La orden se encuentra provisionada.');
      }

    }
    // Model to JSON for demo purpose
    $scope.$watch('lists', function(lists) {
        $scope.modelAsJson = angular.toJson(lists, true);
    }, true);

    $scope.actualizaComentario = function(numeroCotizacion)
    {
      swal({
            title: "¿Esta seguro de modificar el comentario?",
            text: "Modifica Comentario",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function(isConfirm) {
            if (isConfirm) {
                if($scope.comentarioNuevo.idComentarioCotizacion != undefined && $scope.comentarioNuevo.idComentarioCotizacion > 0)
                {
                  detalleRepository.updComentario($scope.comentarioNuevo).then(function (resp) {
                    if (resp.data[0].idComentarioCotizacion > 0) {
                      Enumerable.From($scope.notaComentario).Where("$.idComentarioCotizacion == " + resp.data[0].idComentarioCotizacion).FirstOrDefault().texto = $scope.comentarioNuevo.texto;
                      $scope.comentarioNuevo = {};
                      alertFactory.success('El comentario se modificó exitosamente.');
                      $scope.editaComentario = 0;
                      $('#comment'+numeroCotizacion).hide();
                      $('#pc'+numeroCotizacion).show();
                    }
                  }, function (error) {
                    alertFactory.error('Ocurrio un error al modificar comentario.');
                  });
                }
            } else {
                swal("Texto modificado.");
            }
        });
    }

    $scope.eliminarPartida = function(partida) {
      swal({
          title: "¿Esta seguro de cancelar la partida?",
          text: "Cancelar partida",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#65BD10",
          confirmButtonText: "Si",
          cancelButtonText: "No",
          closeOnConfirm: true,
          closeOnCancel: true
      }, function(isConfirm) {
        if (isConfirm) {
          $('#loadModal').modal('show');
          detalleRepository.updateCancelaPartida(partida.idCotizacionDetalle, $scope.idUsuario, $scope.userData.contratoOperacionSeleccionada)
          .then(function (resp) {
              if (resp.data[0].idCotizacionDetalle > 0)
              {
                setTimeout(function() {
                  $('#loadModal').modal('show');
                  $scope.getOrdenDetalle($scope.userData.idUsuario, $scope.numeroOrden)
                  swal('Partida cancelada!', 'Operación realizada corractamente');
                }, 500)
              }
          }, function (error) {
            alertFactory.error('Ocurrio un error al cancelar la partida.')
          });
        } else
          {
              swal("Operacion cancelada.");
          }
      });
    }
})
