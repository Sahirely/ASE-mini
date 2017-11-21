registrationModule.controller('mainController', function($scope, $rootScope, $location, $modal, consultaCitasRepository, localStorageService, userFactory, mainRepository, busquedaUnidadRepository, configuradorRepository, alertFactory) {
    $rootScope.showChat = 0
        // *****************************************************************************************************************************//
        // $rootScope.modulo <<-- Se inicializa variable para activar en que opción del menú se encuentra
        // *****************************************************************************************************************************//
    $rootScope.modulo = ''
        // *****************************************************************************************************************************//
        // $rootScope.busqueda <<-- si es 1 sera "Buscar Unidad" si es 2 sera "Buscar Orden"
        // *****************************************************************************************************************************//

    // MEETING
    $scope.selectedUsuariosMeeting = []
    $scope.selectionMode = 'all'
    $scope.selectAllMode = 'page'
    $scope.meetingObjetivo = ''
     // evita mostar las llaves en el inicio
    $scope.busquedaNumEco = '';
    $scope.busquedaNumOrden = '';
    $rootScope.busqueda = 0;

    $scope.ShowbusquedaNumEco = false;
    $scope.ShowbusquedaNumOrden = false;
    $scope.principal = false;

    var citaMsg = localStorageService.get('citaMsg')

    $scope.descripcion = localStorageService.get('desc')
    $scope.comentarios = ''
    $scope.comentario = ''

    // Gestiona la conexión con el socket
    $scope.socket = null
    $scope.connected = false
    $scope.btn_editarVersion = false
    $scope.btnSwitch = {}


    $scope.init = function() {
        $scope.userData = userFactory.getUserData()
        if ($scope.userData != null) {
        $scope.idRol = $scope.userData.idRol
        $scope.idUsuario = $scope.userData.idUsuario
        $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
        $scope.versionSystem = $scope.userData.versionSystem;

        if($scope.versionSystem == 1){
            $scope.btnSwitch.classPro = 'btn btn-success'
            $scope.btnSwitch.classLite = 'btn btn-default'
        }else if($scope.versionSystem == 2){
            $scope.btnSwitch.classLite = 'btn btn-success'
            $scope.btnSwitch.classPro = 'btn btn-default' 
        }
        $scope.showButtonSwitch($scope.userData.idUsuario, $scope.userData.idRol, $scope.userData.contratoOperacionSeleccionada);


            $scope.getUsuarios()
            if (localStorageService.get('economico') != null && localStorageService.get('economico') != '') {
                $scope.busquedaNumEco = localStorageService.get('economico')
                $rootScope.busqueda = 1
                $scope.numeroEconomico = ''
                $scope.ShowbusquedaNumEco = true;
            } else if (localStorageService.get('orden') != null && localStorageService.get('orden') != '') {
                $scope.busquedaNumOrden = localStorageService.get('orden')
                $rootScope.busqueda = 2
                $scope.numeroOrden = ''
                $scope.ShowbusquedaNumOrden = true;
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

            // SOCKETS
         /* setInterval(function() {
                if (!$scope.connected != '') {
                    console.log('Intentando reconexión...')
                    SocketConnect()
                }
            }, 10000)*/
        }
    }

    $scope.CambiarOperacion = function(idCont) {
        $scope.userData = userFactory.updateSelectedOperation(idCont)
        if ($scope.userData.idRol == 3) {
            location.href = '/dashboardCallCenter'
        } else if ($scope.userData.idRol == 5) {
            location.href = '/configurador'
        } else {
            location.href = '/dashboardgeneral'
        }
    }

    $scope.logOut = function() {
        $scope.ShowbusquedaNumEco = false;
        $scope.ShowbusquedaNumOrden = false;
        $scope.principal = false;
        userFactory.logOut()
    }

    $scope.cargaChatTaller = function() {
        if (citaMsg !== null) {
            mainRepository.getChat(citaMsg, 1).then(function(result) {
                if (result.data.length > 0) {
                    $scope.chattaller = result.data
                }
            }, function(error) {})
        }
    }

    $scope.cargaChatCliente = function() {
        if (citaMsg !== null) {
            mainRepository.getChat(citaMsg, 2).then(function(result) {
                if (result.data.length > 0) {
                    $scope.chatcliente = result.data
                }
            }, function(error) {})
        }
    }

    $scope.EnviarComentario1 = function(comentarios, idTipoChat) {
        mainRepository.putMessage($rootScope.userData.idUsuario, comentarios, citaMsg, idTipoChat).then(function(result) {
                $scope.algo = result.data
                $scope.clearComments()
                $scope.cargaChatTaller()
            },
            function(error) {})
    }

    $scope.EnviarComentario2 = function(comentario) {
        mainRepository.putMessage($rootScope.userData.idUsuario, comentario, citaMsg, 2).then(function(result) {
                $scope.algo = result.data
                $scope.BorraComentario()
                $scope.cargaChatCliente()
            },
            function(error) {})
    }

    $scope.clearComments = function() {
        $scope.comentarios = ''
    }
    $scope.BorraComentario = function() {
            $scope.comentario = ''
        }
        // *****************************************************************************************************************************//
        // Funcion para mostrar u ocultar input de busqueda en el header  busqueda = 1 <-- Muestra Busca Unidad
        //                                                                busqueda = 2 <-- Muestra Busca Orden
        // *****************************************************************************************************************************//
    $scope.botonBusqueda = function(busqueda) {
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
    $scope.getDetalleUnidad = function(economico) {
        localStorageService.set('economico', economico)
        localStorageService.set('orden', '')
        busquedaUnidadRepository.getExisteUnidad($scope.idUsuario, economico, $scope.userData.idOperacion).then(function(result) {
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

    $scope.getDetalle = function(data) {
        if (data == 1) {
            $scope.getDetalleUnidad($scope.busquedaNumEco)
        } else {
            $scope.getDetalleOrden($scope.busquedaNumOrden)
        }
    }

    $scope.getNumeroEconomico = function() {
        $scope.numEconomicos = []
        busquedaUnidadRepository.getNumerosEconomicos($scope.userData.contratoOperacionSeleccionada).then(function(result) {
            angular.forEach(result.data, function(value, key) {
                $scope.numEconomicos.push(value.numeroEconomico)
            })
            $scope.principal = true;
        })
    }

    // *****************************************************************************************************************************//
    // Busca el detalle de la Orden de Servicio
    // *****************************************************************************************************************************//
    $scope.getDetalleOrden = function(orden) {
        localStorageService.set('orden', orden)
        localStorageService.set('economico', '')

        consultaCitasRepository.getExisteOrden($scope.idUsuario, orden, $scope.userData.contratoOperacionSeleccionada).then(function(result) {
            $scope.tipoRespuesta = result.data[0]
            if ($scope.tipoRespuesta.respuesta == 0) {
                $('.modal-dialog').css('width', '1050px')
                modal_respuesta_busqueda($scope, $modal, $rootScope.busqueda, $scope.tipoRespuesta, '', '')
            } else if ($scope.tipoRespuesta.respuesta == 1) {
                location.href = '/detalle?orden=' + orden
            }
        })
    }

    $scope.getNumeroOrdenes = function(orden) {
        $scope.numOrdenes = []
        consultaCitasRepository.getNumerosOrdenes($scope.userData.contratoOperacionSeleccionada).then(function(result) {
            angular.forEach(result.data, function(value, key) {
                $scope.numOrdenes.push(value.numeroOrden)
            })
        })
    }

    $scope.catalogoUnidad = function() {
        window.open('http://189.204.141.193:5600/alta?idUsuario=' + $scope.userData.idUsuario + '&idOperacion=' + $scope.userData.idOperacion)
            // location.href = 'http://35.165.2.64:4200/unidades?idUsuario=' + $scope.userData.idUsuario + '&idOperacion=' + $scope.userData.contratoOperacionSeleccionada
    }

    $scope.getUsuarios = function() {
        configuradorRepository.getUsuarios()
            .then(function successCallback(response) {
                var dataSourceUsuarios = new DevExpress.data.DataSource({
                    store: response.data,
                    searchOperation: 'contains',
                    searchExpr: 'text'
                })
                $scope.listOptionsUsuarios = {
                    dataSource: dataSourceUsuarios,
                    itemTemplate: function(data) {
                        return $('<div>').text(data.text)
                    },
                    height: 'auto',
                    showSelectionControls: true,
                    bindingOptions: {
                        selectedItemKeys: 'selectedUsuariosMeeting',
                        selectionMode: 'selectionMode',
                        selectAllMode: 'selectAllMode'
                    }
                }

                $scope.searchOptionsUsuarios = {
                    valueChangeEvent: 'keyup',
                    placeholder: 'Buscar...',
                    mode: 'search',
                    onValueChanged: function(args) {
                        dataSourceUsuarios.searchValue(args.value)
                        dataSourceUsuarios.load()
                    }
                }
            }, function errorCallback(response) {})
    }

    $scope.createMeeting = function() {
        var joinurl, hostURL, meetingid, maxParticipants, uniqueMeetingId, conferenceCallInfo, estatus
        mainRepository.getCredencialesMeeting($scope.userData.idUsuario).then(function(resultado) {
            console.log(resultado.data)
            if (resultado.data.length > 0) {
                mainRepository.postCreateMeeting(resultado.data[0].accessToken, $scope.meetingObjetivo).then(function(result) {
                    console.log(result.data)
                    joinurl = result.data[0].joinURL
                    meetingid = result.data[0].meetingid
                    maxParticipants = result.data[0].maxParticipants
                    uniqueMeetingId = result.data[0].uniqueMeetingId
                    conferenceCallInfo = result.data[0].conferenceCallInfo
                    estatus = 'Activa'

                    //mainRepository.getStartMeeting('CTDHpgp4ArTRsQp35yUr1iKelcEN', result.data[0].meetingid).then(function(result)
                    // YA QUE TENEMOS EL MEETING LO INICIAMOS
                    mainRepository.getStartMeeting(resultado.data[0].accessToken, result.data[0].meetingid).then(function(result) {
                        console.log(result.data)
                        hostURL = result.data.hostURL
                        mainRepository.saveMeeting(joinurl, hostURL, meetingid, maxParticipants, uniqueMeetingId, conferenceCallInfo, estatus, $scope.meetingObjetivo, JSON.stringify($scope.selectedUsuariosMeeting), $scope.userData.idUsuario).then(function(result) {
                            console.log(result.data)

                            //$scope.selectedUsuariosMeeting = []
                            for (let user of $scope.selectedUsuariosMeeting) {
                                if (user.id == $scope.userData.idUsuario) {
                                    $scope.selectedUsuariosMeeting.splice($scope.selectedUsuariosMeeting.indexOf(user), 1)
                                    break;
                                }
                            }
                            llamarMeeting(joinurl, $scope.userData.idUsuario, $scope.userData.nombreCompleto, JSON.stringify($scope.selectedUsuariosMeeting), meetingid, $scope.meetingObjetivo)
                            swal({
                                title: 'Videoconferencia',
                                text: 'La Videoconferencia se creó de forma correcta con el siguiente ID: ' + uniqueMeetingId,
                                type: 'success',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Iniciar Videoconferencia',
                                cancelButtonText: 'Cerrar esta ventana'
                            }, function(isConfirm) {
                                if (isConfirm) {
                                    window.open(hostURL, '_blank', '', false)
                                }
                            })
                        })
                    })
                })
            } else {
                alertFactory.error("No cuentas con el permiso para generar videollamadas")
            }

        })

    }

    // //////////////////////////////////////////////////////////////////
    // Funciones de socket
    // //////////////////////////////////////////////////////////////////

    // Conecta el socket
    var SocketConnect = function() {
        // Inicio sesión en el socket para recibir actualizaciones
        $scope.socket = io.connect(global_settings.urlCORS)
        if ($scope.socket != null) {
            SocketJoin()
        }
    }

    // Declara los mensajes principales del socket
    var SocketJoin = function() {
        // Envío mis datos de usuario
        // HARDCODE CORREGIR ALAN!!!!
        $scope.socket.emit('login', { user: $scope.userData.idUsuario })

        $scope.socket.on('hello', function(data) {
            console.log(data.mensaje)
            $scope.connected = true
        })

        //Recibir notificacion meeting //swal
        $scope.socket.on('message', function(data) {
            // Obtiene Notificaciones
            console.log(data)


            console.log('------------Solicitado a videoconferencia------------')

            swal({
                title: 'Videoconferencia: ' + data.asunto,
                text: 'Has sido invitado a una videoconferencia con el siguiente ID: ' + data.meetingId + '.',
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Unirme',
                cancelButtonText: 'Cerrar esta ventana'
            }, function(isConfirm) {
                if (isConfirm) {
                    window.open(data.meeting, '_blank', '', false)
                }
            })

        })

        $scope.socket.on('disconnect', function() {
            console.log('Se ha desconectado.')
            $scope.connected = false
        })
    }

    function llamarMeeting(joinurl, idUsuario, nombre, UsersInMeeting, meetingId, asunto) {
        console.log('------------Usuario ha solicitado videoconferencia------------')
        console.log('nombre: ' + nombre + ' Usuarios: ' + UsersInMeeting)
        if ($scope.socket == null) {
            SocketConnect()
        }
        $scope.socket.emit('createMeeting', { meeting: joinurl, idUsuario: idUsuario, nombre: nombre, users: UsersInMeeting, meetingId: meetingId, asunto: asunto })
    }

  $scope.showButtonSwitch = function (idUsuario, usrRol, idContratoOperacion) {
    if(idContratoOperacion == 3){
        switch (Number(usrRol)) {
          case 1: // cliente
                if(idUsuario == 220 || idUsuario == 221){
                    $scope.hideSwitchBoton = false
                    $scope.btnSwitch.showVersionSystem = true
                    $scope.btn_editarVersion = true
                }else{
                    $scope.hideSwitchBoton = true
                    $scope.btnSwitch.showVersionSystem = false
                    $scope.btn_editarVersion = false
                }
            break
          case 2: // admin
            $scope.hideSwitchBoton = false
            $scope.btnSwitch.showVersionSystem = true
            $scope.btn_editarVersion = true
            break
          case 3: // callcenter
            $scope.hideSwitchBoton = true
            $scope.btnSwitch.showVersionSystem = false
            $scope.btn_editarVersion = false
            break
          case 4: // proveedor
            $scope.hideSwitchBoton = true
            $scope.btnSwitch.showVersionSystem = false
            $scope.btn_editarVersion = false
            break
          default:
            $scope.hideSwitchBoton = true
        }
    }else{
        switch (Number(usrRol)) {
          case 1: // cliente
            $scope.hideSwitchBoton = true
            $scope.btnSwitch.showVersionSystem = false
            $scope.btn_editarVersion = false
            break
          case 2: // admin
            $scope.hideSwitchBoton = false
            $scope.btnSwitch.showVersionSystem = true
            $scope.btn_editarVersion = true
            break
          case 3: // callcenter
            $scope.hideSwitchBoton = true
            $scope.btnSwitch.showVersionSystem = false
            $scope.btn_editarVersion = false
            break
          case 4: // proveedor
            $scope.hideSwitchBoton = true
            $scope.btnSwitch.showVersionSystem = false
            $scope.btn_editarVersion = false
            break
          default:
            $scope.hideSwitchBoton = true
        }
    }
  }

  $scope.showButtonSwitchClick = function (value) 
  {
        $rootScope.$emit('cambiaVersion');
        if(value == 1){
            $scope.btnSwitch.showVersionSystem=false;
            $scope.btnSwitch.classPro='btn btn-success';
            $scope.btnSwitch.classLite='btn btn-default'
            $scope.userData = userFactory.updateSelectedVersion($scope.idContratoOperacion, 1)
        }else if(value == 2){
            $scope.btnSwitch.showVersionSystem=true;
            $scope.btnSwitch.classPro='btn btn-default';
            $scope.btnSwitch.classLite='btn btn-success'
            $scope.userData = userFactory.updateSelectedVersion($scope.idContratoOperacion, 2)
        }
    }
})

