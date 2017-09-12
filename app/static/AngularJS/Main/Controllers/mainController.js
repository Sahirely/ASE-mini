registrationModule.controller('mainController', function ($scope, $rootScope, $location, $modal, consultaCitasRepository, localStorageService, userFactory, mainRepository, busquedaUnidadRepository, configuradorRepository) {
  $rootScope.showChat = 0
  // *****************************************************************************************************************************//
  // $rootScope.modulo <<-- Se inicializa variable para activar en que opción del menú se encuentra
  // *****************************************************************************************************************************//
  $rootScope.modulo = ''
  // *****************************************************************************************************************************//
  // $rootScope.busqueda <<-- si es 1 sera "Buscar Unidad" si es 2 sera "Buscar Orden"
  // *****************************************************************************************************************************//

  $scope.selectedUsuarios = []
  $scope.selectionMode = 'all'
  $scope.selectAllMode = 'page'

  var citaMsg = localStorageService.get('citaMsg')

  $scope.descripcion = localStorageService.get('desc')
  $scope.comentarios = ''
  $scope.comentario = ''

  // Gestiona la conexión con el socket
  $scope.socket = null
  $scope.connected = false


  $scope.init = function () {
    $scope.userData = userFactory.getUserData()
    if ($scope.userData != null) {
      $scope.idUsuario = $scope.userData.idUsuario
      $scope.getUsuarios()
      if (localStorageService.get('economico') != null && localStorageService.get('economico') != '') {
        $scope.busquedaNumEco = localStorageService.get('economico')
        $rootScope.busqueda = 1
        $scope.numeroEconomico = ''
      } else if (localStorageService.get('orden') != null && localStorageService.get('orden') != '') {
        $scope.busquedaNumOrden = localStorageService.get('orden')
        $rootScope.busqueda = 2
        $scope.numeroOrden = ''
      } else {
        $rootScope.busqueda = 1
        $scope.numeroEconomico = ''
        $rootScope.busqueda = 1
        $scope.busquedaNumEco = ''
        $scope.busquedaNumOrden = ''
      }

      $scope.cargaChatTaller()
      $scope.cargaChatCliente()
      // localStorageService.get('userData')
      $scope.getNumeroEconomico()
      $scope.getNumeroOrdenes()

      setInterval(function () {
        if (!$scope.connected != '') {
          console.log('Intentando reconexión...')
          SocketConnect()
        }
      }, 10000)
    }
  }

  $scope.CambiarOperacion = function (idCont) {
    $scope.userData = userFactory.updateSelectedOperation(idCont)
    if ($scope.userData.idRol == 3) {
      location.href = '/dashboardCallCenter'
    } else if ($scope.userData.idRol == 5) {
      location.href = '/configurador'
    } else {
      location.href = '/dashboardgeneral'
    }
  }

  $scope.logOut = function () {
    userFactory.logOut()
  }

  $scope.cargaChatTaller = function () {
    if (citaMsg !== null) {
      mainRepository.getChat(citaMsg, 1).then(function (result) {
        if (result.data.length > 0) {
          $scope.chattaller = result.data
        }
      }, function (error) {})
    }
  }

  $scope.cargaChatCliente = function () {
    if (citaMsg !== null) {
      mainRepository.getChat(citaMsg, 2).then(function (result) {
        if (result.data.length > 0) {
          $scope.chatcliente = result.data
        }
      }, function (error) {})
    }
  }

  $scope.EnviarComentario1 = function (comentarios, idTipoChat) {
    mainRepository.putMessage($rootScope.userData.idUsuario, comentarios, citaMsg, idTipoChat).then(function (result) {
      $scope.algo = result.data
      $scope.clearComments()
      $scope.cargaChatTaller()
    },
      function (error) {})
  }

  $scope.EnviarComentario2 = function (comentario) {
    mainRepository.putMessage($rootScope.userData.idUsuario, comentario, citaMsg, 2).then(function (result) {
      $scope.algo = result.data
      $scope.BorraComentario()
      $scope.cargaChatCliente()
    },
      function (error) {})
  }

  $scope.clearComments = function () {
    $scope.comentarios = ''
  }
  $scope.BorraComentario = function () {
    $scope.comentario = ''
  }
  // *****************************************************************************************************************************//
  // Funcion para mostrar u ocultar input de busqueda en el header  busqueda = 1 <-- Muestra Busca Unidad
  //                                                                busqueda = 2 <-- Muestra Busca Orden
  // *****************************************************************************************************************************//
  $scope.botonBusqueda = function (busqueda) {
    if (busqueda == 1) {
      $scope.numeroOrden = ''
      $rootScope.busqueda = 2
    } else if (busqueda == 2) {
      $scope.numeroEconomico = ''
      $rootScope.busqueda = 1
    }
  }

  // *****************************************************************************************************************************//
  // ***  busquedaUnidadRepository.getExisteUnidad($scope.idUsuario, economico)  ***/
  // Busca si existe la unidad, si el usuario tiene permisos para el tipo de operación y el rol al que pertenece
  // puede visualizar la información de dicha unidad
  // $scope.tipoRespuesta = 0 <-- No existe la unidad
  // $scope.tipoRespuesta = 1 <-- Existe la unidad y tiene todos los permisos necesarios
  // $scope.tipoRespuesta = 2 <-- Existe la unidad pero el tipo de operación no le corresponde
  // $scope.tipoRespuesta = 3 <-- Existe la unidad pero el rol no tiene permisos para visualizar la información
  // *****************************************************************************************************************************//
  $scope.getDetalleUnidad = function (economico) {
    localStorageService.set('economico', economico)
    localStorageService.set('orden', '')
    busquedaUnidadRepository.getExisteUnidad($scope.idUsuario, economico, $scope.userData.idOperacion).then(function (result) {
      $scope.tipoRespuesta = result.data[0]
      if ($scope.tipoRespuesta.respuesta == 0) {
        //
        $('.modal-dialog').css('width', '1050px')
        modal_respuesta_busqueda($scope, $modal, $rootScope.busqueda, $scope.tipoRespuesta, '', '')
      } else if ($scope.tipoRespuesta.respuesta == 1) {
        location.href = '/unidad?economico=' + economico
      } else if ($scope.tipoRespuesta.respuesta == 2) {
        $('.modal-dialog').css('width', '1050px')
        modal_respuesta_busqueda($scope, $modal, $rootScope.busqueda, $scope.tipoRespuesta, '', '')
      }
    })
  }

  $scope.getDetalle = function (data) {
    if (data == 1) {
      $scope.getDetalleUnidad($scope.busquedaNumEco)
    } else {
      $scope.getDetalleOrden($scope.busquedaNumOrden)
    }
  }

  $scope.getNumeroEconomico = function () {
    $scope.numEconomicos = []
    busquedaUnidadRepository.getNumerosEconomicos($scope.userData.contratoOperacionSeleccionada).then(function (result) {
      angular.forEach(result.data, function (value, key) {
        $scope.numEconomicos.push(value.numeroEconomico)
      })
    })
  }

  // *****************************************************************************************************************************//
  // Busca el detalle de la Orden de Servicio
  // *****************************************************************************************************************************//
  $scope.getDetalleOrden = function (orden) {
    localStorageService.set('orden', orden)
    localStorageService.set('economico', '')
    consultaCitasRepository.getExisteOrden($scope.idUsuario, orden, $scope.userData.contratoOperacionSeleccionada).then(function (result) {
      $scope.tipoRespuesta = result.data[0]
      if ($scope.tipoRespuesta.respuesta == 0) {
        $('.modal-dialog').css('width', '1050px')
        modal_respuesta_busqueda($scope, $modal, $rootScope.busqueda, $scope.tipoRespuesta, '', '')
      } else if ($scope.tipoRespuesta.respuesta == 1) {
        location.href = '/detalle?orden=' + orden
      }
    })
  }

  $scope.getNumeroOrdenes = function (orden) {
    $scope.numOrdenes = []
    consultaCitasRepository.getNumerosOrdenes($scope.userData.contratoOperacionSeleccionada).then(function (result) {
      angular.forEach(result.data, function (value, key) {
        $scope.numOrdenes.push(value.numeroOrden)
      })
    })
  }

  $scope.catalogoUnidad = function () {
    window.open('http://35.165.2.64:4200/alta?idUsuario=' + $scope.userData.idUsuario + '&idOperacion=' + $scope.userData.contratoOperacionSeleccionada + '&numeroEconomico=0')
  // location.href = 'http://35.165.2.64:4200/unidades?idUsuario=' + $scope.userData.idUsuario + '&idOperacion=' + $scope.userData.contratoOperacionSeleccionada
  }

  $scope.getUsuarios = function () {
    configuradorRepository.getUsuarios()
      .then(function successCallback (response) {
        var dataSourceUsuarios = new DevExpress.data.DataSource({
          store: response.data,
          searchOperation: 'contains',
          searchExpr: 'text'
        })
        $scope.listOptionsUsuarios = {
          dataSource: dataSourceUsuarios,
          itemTemplate: function (data) {
            return $('<div>').text(data.text)
          },
          height: 'auto',
          showSelectionControls: true,
          bindingOptions: {
            selectedItemKeys: 'selectedUsuarios',
            selectionMode: 'selectionMode',
            selectAllMode: 'selectAllMode'
          }
        }

        $scope.searchOptionsUsuarios = {
          valueChangeEvent: 'keyup',
          placeholder: 'Buscar...',
          mode: 'search',
          onValueChanged: function (args) {
            dataSourceUsuarios.searchValue(args.value)
            dataSourceUsuarios.load()
          }
        }
      }, function errorCallback (response) {})
  }

  $scope.createMeeting = function () {
    mainRepository.postCreateMeeting('CTDHpgp4ArTRsQp35yUr1iKelcEN', 'PRUEBA', JSON.stringify($scope.selectedItemKeysUsuarios)).then(function (result) {
      console.log(result.data)
    })
  }

  // //////////////////////////////////////////////////////////////////
  // Funciones de socket
  // //////////////////////////////////////////////////////////////////

  // Conecta el socket
  var SocketConnect = function () {
    // Inicio sesión en el socket para recibir actualizaciones
    $scope.socket = io.connect('http://localhost:5100/')
    if ($scope.socket != null) {
      SocketJoin()
    }
  }

  // Declara los mensajes principales del socket
  var SocketJoin = function () {
    // Envío mis datos de usuario  
    //HARDCODE CORREGIR ALAN!!!!
    $scope.socket.emit('login', { user: $scope.userData.idUsuario })

    $scope.socket.on('hello', function (data) {
      console.log(data.mensaje)
      $scope.connected = true
    })

    $scope.socket.on('pkgNotificacion', function (data) {
      // Obtiene Notificaciones
      console.log(data.length + ' dato(s) recibido(s) at: ' + new Date().toString())
      getNSuccessCallback(data, null, null, null)
    })

    $scope.socket.on('pkgAprobacion', function (data) {
      // Obtiene Notificaciones
      console.log(data.length + ' Aprobacion(es) recibida(s) at: ' + new Date().toString())
      getASuccessCallback(data, null, null, null)
    })

    $scope.socket.on('disconnect', function () {
      console.log('Se ha desconectado.')
      $scope.connected = false
    })
  }
})
