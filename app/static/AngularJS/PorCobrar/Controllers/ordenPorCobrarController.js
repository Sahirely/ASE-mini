registrationModule.controller('ordenPorCobrarController', function ($scope, $rootScope, localStorageService, alertFactory, globalFactory, ordenPorCobrarRepository, userFactory, cotizacionConsultaRepository) {
  $rootScope.modulo = 'ordenxCobrar'

  $scope.x = 0
  $scope.totalNiveles = 0
  $scope.zonaSelected = '0'
  $scope.ZonasSeleccionadas = []
  $scope.NivelesZona = []
  $scope.Zonas = []

  $scope.grouper = 'numeroOrden'
  $scope.idGrouper = 2
  $scope.option = null

  $scope.changeGrouper = function (type) {
    $scope.idGrouper = type
    switch (type) {
      case 1:
        $scope.grouper = 'numeroCotizacion'
        break
      case 2:
        $scope.grouper = 'numeroOrden'
        break
      case 3:
        $scope.grouper = 'ordenPago'
        break
    }
    $scope.idGrouper = type
    $('.dataTablePorCobrar').DataTable().destroy()
    $('.dataTablePrefactura').DataTable().destroy()
    $('.dataTableEnviada').DataTable().destroy()
    $('.dataTableAbonadas').DataTable().destroy()
    $('.dataTablePagadas').DataTable().destroy()
    setTimeout(function () {
      globalFactory.filtrosTabla('dataTablePorCobrar', 'Ordenes Por Cobrar', 100)
      globalFactory.filtrosTabla('dataTablePrefactura', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTableEnviada', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTableAbonadas', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTablePagadas', 'PreFactura Generada', 100)
    }, 200)
  }

  $scope.init = function () {

    // para obtener las zonas promero se inicializa la primer zona padre.
    userFactory.ValidaSesion()
    $scope.ZonasSeleccionadas[0] = '0'
    $scope.obtieneNivelZona()
    // termina el cargado de las Zonas del usuario.
    $scope.devuelveEjecutivos()

    // Obtengo la lista de tablas
    $('.dataTablePorCobrar').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerporcobrar', { 'idUsuario': 1 }).then(function (result) {
      $scope.porCobrar = result.data
      globalFactory.filtrosTabla('dataTablePorCobrar', 'Ordenes Por Cobrar', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las órdenes por cobrar')
    })

    // Obtengo la lista de tablas
    $('.dataTablePrefactura').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerprefactura', { 'idUsuario': 1 }).then(function (result) {
      $scope.prefactura = result.data
      globalFactory.filtrosTabla('dataTablePrefactura', 'PreFacturas Generadas', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las prefacturas generadas')
    })

    // Obtengo la lista de tablas
    $('.dataTableEnviada').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerenviadas', { 'idUsuario': 1 }).then(function (result) {
      $scope.enviada = result.data
      globalFactory.filtrosTabla('dataTableEnviada', 'Facturas Enviada al Cliente', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las Facturas Enviada al Cliente')
    })

    // Obtengo la lista de tablas
    $('.dataTableAbonadas').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerabonadas', { 'idUsuario': 1 }).then(function (result) {
      $scope.abonadas = result.data
      globalFactory.filtrosTabla('dataTableAbonadas', 'Facturas Abonadas', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las Facturas Abonadas')
    })

    $('.dataTablePagadas').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerpagadas', { 'idUsuario': 1 }).then(function (result) {
      $scope.pagadas = result.data
      globalFactory.filtrosTabla('dataTablePagadas', 'Facturas Pagadas', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las Facturas Pagadas')
    })

    $('.dataTableOrdenPago').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerordenpago', { 'idUsuario': 1 }).then(function (result) {
      $scope.ordenPago = result.data
      globalFactory.filtrosTabla('dataTableOrdenPago', 'Ordenes de Pago', 100)
    }, function (error) {
      alertFactory.error('No se puenen obtener las Facturas Pagadas')
    })
  }

  // obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
  $scope.obtieneNivelZona = function () {
    $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.userData.contratoOperacionSeleccionada).then(function (result) {
      $scope.totalNiveles = result.data.length
      if (result.data.length > 0) {
        $scope.NivelesZona = result.data
        $scope.devuelveZonas()
      }
    },
      function (error) {
        alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.')
      })
  }

  // obtiene las zonas por cada nivel con que cuenta el usuario
  $scope.devuelveZonas = function () {
    for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
      cotizacionConsultaRepository.getZonas($scope.userData.contratoOperacionSeleccionada, $scope.NivelesZona[$scope.x].idNivelZona).then(function (result) {
        if (result.data.length > 0) {
          var valueToPush = {}
          valueToPush.orden = result.data[0].orden
          valueToPush.etiqueta = result.data[0].etiqueta
          valueToPush.data = result.data
          $scope.Zonas.push(valueToPush)
          // se establece por default cada zona seleccionada en 0
          $scope.ZonasSeleccionadas[result.data[0].orden] = '0'
        }
      }, function (error) {
        alertFactory.error('No se pudo recuperar información de las zonas')
      })
    }
  }

  // obtiene los usuarios ejecutivos
  $scope.devuelveEjecutivos = function () {
    cotizacionConsultaRepository.obtieneEjecutivos($scope.userData.contratoOperacionSeleccionada).then(function (ejecutivos) {
      if (ejecutivos.data.length > 0) {
        $scope.listaEjecutivos = ejecutivos.data
      }
    }, function (error) {
      alertFactory.error('No se pudo recuperar información de los ejecutivos')
    })
  }

  $scope.MesChange = function () {
    $scope.fechaInicio = ''
    $scope.fechaFin = ''
    $scope.fecha = ''
  }

  $scope.RangoChange = function () {
    $scope.fechaMes = ''
    $scope.fecha = ''
    this.ValidaRangoFechas()
  }

  $scope.FechaChange = function () {
    $scope.fechaMes = ''
    $scope.fechaInicio = ''
    $scope.fechaFin = ''
  }

  $scope.ValidaRangoFechas = function () {
    var isValid = true

    // valida si están seleccionadas ambas fechas del rango
    if ($scope.fechaInicio != '' && $scope.fechaFin != '') {
      var fechaInicial = $scope.fechaInicio.split('/')
      var fechaFinal = $scope.fechaFin.split('/')

      // valida el anio
      if (parseInt(fechaInicial[2]) > parseInt(fechaFinal[2])) {
        isValid = false
      }else if (parseInt(fechaInicial[2]) == parseInt(fechaFinal[2])) {
        // valida el mes
        if (parseInt(fechaInicial[0]) > parseInt(fechaFinal[0])) {
          isValid = false
        }else if (parseInt(fechaInicial[0]) == parseInt(fechaFinal[0])) {
          // valida el día
          if (parseInt(fechaInicial[1]) > parseInt(fechaFinal[1])) {
            isValid = false
          }
        }
      }

      if (isValid == false) {
        $scope.fechaInicio = ''
        $scope.fechaFin = ''
        alertFactory.info('La Fecha de Fin Debe Ser Posterior a la Fecha de Inicio.')
      }
    }
  }

  // obtiene el mes en formato de fecha
  $scope.obtieneFechaMes = function () {
    var result = ''
    if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
      var fechaPartida = $scope.fechaMes.split('-')
      if (fechaPartida[0] == 'Enero') {
        result = fechaPartida[1] + '/01/01'
      } else if (fechaPartida[0] == 'Febrero') {
        result = fechaPartida[1] + '/02/01'
      } else if (fechaPartida[0] == 'Marzo') {
        result = fechaPartida[1] + '/03/01'
      } else if (fechaPartida[0] == 'Abril') {
        result = fechaPartida[1] + '/04/01'
      } else if (fechaPartida[0] == 'Mayo') {
        result = fechaPartida[1] + '/05/01'
      } else if (fechaPartida[0] == 'Junio') {
        result = fechaPartida[1] + '/06/01'
      } else if (fechaPartida[0] == 'Julio') {
        result = fechaPartida[1] + '/07/01'
      } else if (fechaPartida[0] == 'Agosto') {
        result = fechaPartida[1] + '/08/01'
      } else if (fechaPartida[0] == 'Septiembre') {
        result = fechaPartida[1] + '/09/01'
      } else if (fechaPartida[0] == 'Octubre') {
        result = fechaPartida[1] + '/10/01'
      } else if (fechaPartida[0] == 'Noviembre') {
        result = fechaPartida[1] + '/11/01'
      } else if (fechaPartida[0] == 'Diciembre') {
        result = fechaPartida[1] + '/12/01'
      }
    }
    return result
  }

  $scope.AbrirOrden = function (obj) {
    location.href = '/detalle?orden=' + obj.numeroOrden + '&estatus=' + 8
  }

  $scope.AbrirCoincidencias = function () {
    $('#mejorCoincidencia').modal.show()
  }

  $scope.GuardarOrdenPago = function () {
    $scope.promise = ordenPorCobrarRepository.post('agregarordenpago', {
      'idUsuario': 1,
      'folio': 9999,
      'fecha': '20170608',
      'monto': 12345
    }).then(function (result) {
      alertFactory.success('Orden de pago almacenada correctamente.')
      $('.dataTableOrdenPago').DataTable().destroy()
      $scope.promise = ordenPorCobrarRepository.get('obtenerordenpago', { 'idUsuario': 1 }).then(function (result) {
        $scope.ordenPago = result.data
        globalFactory.filtrosTabla('dataTableOrdenPago', 'Ordenes de Pago', 100)
      }, function (error) {
        alertFactory.error('No se puenen obtener las Facturas Pagadas')
      })
    }, function (error) {
      alertFactory.error('No se puenen obtener las órdenes por cobrar')
    })
  }
})
