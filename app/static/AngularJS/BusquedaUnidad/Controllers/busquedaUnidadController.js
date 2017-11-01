registrationModule.controller('busquedaUnidadController', function ($scope, $location, $rootScope, $routeParams, MarkerCreatorService, alertFactory, globalFactory, commonService, localStorageService, userFactory, busquedaUnidadRepository, consultaCitasRepository) {
  // *****************************************************************************************************************//
  // SE INICIALIZAN VARIABLES
  // *****************************************************************************************************************//
  $scope.muestraCosto = false
  $scope.muestraPrecio = true
  $scope.btnSwitch = {}
  $scope.btnSwitch.classCosto = 'btn btn-success'
  $scope.btnSwitch.showCostoVenta = true
  $scope.btnSwitch.classVenta = 'btn btn-default'
  // Inicializa la pagina
  $scope.init = function () {
    userFactory.ValidaSesion()
    $scope.userData = userFactory.getUserData();
    $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
    $scope.idUsuario = $scope.userData.idUsuario
    $scope.map = {}
    $scope.permisos()
    $scope.permisosUsuario()
    $scope.getDetalleUnidad()
    $scope.getOrdenActual()
    $scope.getHistoricoOrdenes()
  }

  $scope.permisos = function () {
    // MAPA
    $scope.mapOptions = {
      center: { lat: 19.426506611419985, lng: -99.16950187368013 },
      zoom: 14,
      height: 300,
      width: '600',
      provider: 'google',
      type: 'roadmap'
    }

    $scope.mostrarComentarios = false
    angular.forEach($scope.userData.Modulos, function (value, key) {
      if (value.idCatalogoModulo == 3) {
        $scope.consultaCita = value
        angular.forEach($scope.consultaCita.detalle, function (value, key) {
          if (value.idCatalogoDetalleModulo == 7) {
            $scope.mostrarComentarios = true
          }
        })
      }
    })
  }
  var error = function () {
    alertFactory.error('Ocurrio un Error')
  }
  $scope.permisosUsuario = function () {
    switch ($scope.userData.idRol) {
      case 1:
        $scope.btnSwitch.showCostoVenta = false
        $scope.muestraSwitch = false
        break
      case 2:
        $scope.btnSwitch.showCostoVenta = true
        $scope.muestraSwitch = true
        break
      case 3:
        $scope.btnSwitch.showCostoVenta = true
        $scope.muestraSwitch = true
        break
      case 4:
        $scope.btnSwitch.showCostoVenta = true
        $scope.muestraSwitch = true
        break

    }
  }
  $scope.getDetalleUnidad = function () {
    busquedaUnidadRepository.getDetalleUnidad($scope.idUsuario, $routeParams.economico, $scope.userData.idOperacion).then(function (result) {
      $scope.detalleUnidad = result.data[0]
      // Obtengo el detalle de la unidad
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
    })
  }
  $scope.btnAgendarCita = function () {
    location.href = '/nuevacita?economico=' + $routeParams.economico + '&tipo=nueva'
  }
  $scope.getOrdenActual = function () {
    busquedaUnidadRepository.getOrdenActual($scope.idUsuario, $routeParams.economico, $scope.userData.contratoOperacionSeleccionada).then(function (result) {
      if (result.data.length > 0) {
        $scope.ordendesActual = result.data

        if ($scope.ordendesActual[0].respuesta == 1) {
          $scope.muestraOrdenActual = true
          $scope.agendarCita = true
          var contador1 = 0
          var contador2 = 0
          var contador3 = 0
          var contadorTipoOrden = 0
          angular.forEach($scope.ordendesActual, function (value, key) {
            if (value.idTipoOrden == 1) {
              if (value.idEstatusOrden < 8) {
                contadorTipoOrden++
                contador1++
              }
            }
            if (value.idTipoOrden == 2) {
              if (value.idEstatusOrden < 8) {
                contadorTipoOrden++
                contador3++
              }
            }
            if (value.idTipoOrden == 3) {
              if (value.idEstatusOrden < 8) {
                contadorTipoOrden++
                contador2++
              }
            }
          })

          if (contadorTipoOrden = 3) {
            if (contador1 > 0 && contador2 > 0 && contador3 > 0) {
              $scope.agendarCita = false
            }
          }
        } else if ($scope.ordendesActual[0].respuesta == 0) {
          $scope.muestraOrdenActual = false
          $scope.agendarCita = true
        } else {
          error()
        }
      }else {
        $scope.muestraOrdenActual = false
        $scope.agendarCita = true
      }
    })
  }
  $scope.getHistoricoOrdenes = function () {
    busquedaUnidadRepository.getHistoricoOrdenes($scope.idUsuario, $routeParams.economico, $scope.userData.contratoOperacionSeleccionada).then(function (result) {
      if (result.data.length > 0) {
        $scope.historialOrdenes = result.data
        globalFactory.filtrosTabla('historialUnidad', 'Historial Unidades', 100)

        if ($scope.historialOrdenes[0].respuesta == 1) {
          $scope.muestraHistorial = true
        } else if ($scope.historialOrdenes[0].respuesta == 0) {
          $scope.muestraHistorial = false
        } else {
          error()
        }
      }
    })
  }
  $scope.detalleOrden = function (orden) {
    location.href = '/detalle?orden=' + orden.numeroOrden + '&estatus=' + orden.idEstatusOrden
  }
})
