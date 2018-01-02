registrationModule.controller('nuevoUsuarioController', function($scope, $rootScope, $modal, localStorageService, userFactory, alertFactory, commonService, $location, nuevoUsuarioRepository, globalFactory){

    $rootScope.modulo = 'nuevoUsuario';

    $scope.init = function(){
        $scope.userData = userFactory.getUserData();
        userFactory.ValidaSesion();

        $scope.show_searchField = true;
        $scope.show_results = false;
        $scope.textoBusqueda = '';
        $scope.users = [];
        $('.tableUsuarios').DataTable().destroy();

        $scope.initModelSteps();
    }

    // ini búsqueda de usuarios| crear nuevo usuario

    $scope.BusquedaUsuarios = function(){
        $('#loadModal').modal('show');
        $scope.show_results = false;

        if ($scope.textoBusqueda !== ''){
            nuevoUsuarioRepository.getUsuarios($scope.textoBusqueda).then(function(result){
                if (angular.isArray(result.data)){
                  if (result.data.length > 0){
                    $scope.users = result.data;
                    globalFactory.filtrosTabla("tableUsuarios", "Usuarios", 10);
                    $scope.show_results = true;
                    $('#loadModal').modal('hide');
                  } else {
                    $scope.users = [];
                    globalFactory.filtrosTabla("tableUsuarios", "Usuarios", 10);
                    $scope.show_results = true;
                    $('#loadModal').modal('hide');
                    alertFactory.info('No se obtuvieron resultados.');
                  }
                }else {
                  $('#loadModal').modal('hide');
                  alertFactory.error('Ocurrio un error al intentar obtener los usuarios');
                }
            });
        } else {
            $('#loadModal').modal('hide');
            alertFactory.info('Debe ingresar Nombre de usuario, Contrasenia, Nombre completo, Correo electrónico ó Empresa para realizar una búsqueda.');
        }
    }

    $scope.nuevoUsuario = function (){
        $scope.getRolesUsuario();
        $scope.usuario = {'idUsuario': 0,
                          'nombre': '',
                          'email': '',
                          'telefono': '',
                          'extension': '',
                          'username': '',
                          'password': '',
                          'empresa': '',
                          'rol':{}};

        $scope.show_searchField = false;
        $scope.show_results = false;

    }

    $scope.editarUsuario = function(userToEdit){
        $scope.getRolesUsuario();

        $scope.usuario = {   'idUsuario': userToEdit.idUsuario,
                             'nombre': userToEdit.nombreCompleto,
                             'email': userToEdit.correoElectronico,
                             'telefono': userToEdit.telefonoUsuario,
                             'extension': userToEdit.extensionUsuario,
                             'username': userToEdit.nombreUsuario,
                             'password': userToEdit.contrasenia,
                             'empresa': userToEdit.empresa,
                             'rol': { 'idRol': userToEdit.idCatalogoTipoUsuarios, 'nombreRol': userToEdit.nombreTipoUsuario }
                        };

        $scope.show_searchField = false;
        $scope.show_results = false;
    }

    $scope.getRolesUsuario = function(){
      nuevoUsuarioRepository.getCatalogoRolesUsuario().then(function(result){
        if (angular.isArray(result.data) && result.data.length > 0){
              $scope.RolesUsuario =  result.data;
        } else {
              $scope.RolesUsuario = [];
        }
      });
    }

    // fin búsqueda de usuarios| crear nuevo usuario

    // ini funciones de wizard
    $scope.initModelSteps = function(){
      $scope.currentStep = 1;
      $scope.steps = [
          {
            step: 1,
            name: "Datos Generales",
            template: 'AngularJS/NuevoUsuario/Templates/generales.html',
            buttonsTemplate: 'AngularJS/NuevoUsuario/Templates/botonesGenerales.html',
            icon: 'fa fa-id-card'
          },
          {
            step: 2,
            name: "Selección de Operación",
            template: 'AngularJS/NuevoUsuario/Templates/operacion.html',
            buttonsTemplate: 'AngularJS/NuevoUsuario/Templates/botonesOperacion.html',
            icon: 'fa fa-id-card'
          },
          {
            step: 3,
            name: "Permisos de Operación",
            template: 'AngularJS/NuevoUsuario/Templates/permisos.html',
            buttonsTemplate: 'AngularJS/NuevoUsuario/Templates/botonesPermisos.html',
            icon: 'fa fa-id-card'
          },
        ];

      //variables para paso uno
      $scope.user = {};
      //variables para paso dos
      $scope.Operaciones = [];
      $scope.ContOpeSelected = null;
      // se llamará cuando despues de validar el paso 2 se envíe al paso 3
    }

    $scope.gotoStep = function(newStep) {
      $scope.currentStep = newStep;
    }

    $scope.getStepTemplate = function(){
      for (var i = 0; i < $scope.steps.length; i++) {
            if ($scope.currentStep == $scope.steps[i].step) {
                return $scope.steps[i].template;
            }
        }
    }

    $scope.getStepButtons = function(){
      for (var i = 0; i < $scope.steps.length; i++) {
            if ($scope.currentStep == $scope.steps[i].step) {
                return $scope.steps[i].buttonsTemplate;
            }
        }
    }

    // fin funciones de wizard

    // funciones Paso 1.- datos generales

        $scope.changePassword = function(){
            modal_password($scope, $modal, $scope.usuario.password, $scope.getPassword);
        }

        $scope.getPassword = function(newPass){
            $scope.usuario.password = newPass;
        }

        $scope.guardarDatosGenerales = function(){

            if ($scope.datosCompletos()){
                var idUser = $scope.usuario.idUsuario;
                var nombre = $scope.usuario.nombre === undefined || $scope.usuario.nombre === null ? '' : $scope.usuario.nombre;
                var email = $scope.usuario.email === undefined || $scope.usuario.email === null ? '' : $scope.usuario.email;
                var telefono = $scope.usuario.telefono === undefined || $scope.usuario.telefono === null ? '' : $scope.usuario.telefono;
                var extension = $scope.usuario.extension === undefined || $scope.usuario.extension === null ? '' : $scope.usuario.extension;
                var username = $scope.usuario.username === undefined || $scope.usuario.username === null ? '' : $scope.usuario.username;
                var password = $scope.usuario.password === undefined || $scope.usuario.password === null ? '' : $scope.usuario.password;
                var empresa = $scope.usuario.empresa === undefined || $scope.usuario.empresa === null ? '' : $scope.usuario.empresa;
                var idRol = $scope.usuario.rol.idRol === undefined || $scope.usuario.rol.idRol === null ? 0 : $scope.usuario.rol.idRol;

                nuevoUsuarioRepository.postUpdInsUsuario(idUser, username, password, idRol, nombre, email, telefono, extension, empresa).then(function (result){
                    if (angular.isArray(result.data) && result.data.length > 0){
                        if (result.data[0].respuesta == 1){
                          alertFactory.success(result.data[0].mensaje);
                          if ($scope.usuario.idUsuario == 0 && result.data[0].idUsuarioNuevo !== undefined){
                              $scope.usuario.idUsuario = result.data[0].idUsuarioNuevo;
                          }

                          if($scope.usuario.rol.idRol !== 5){
                            $scope.getOperacionesUsuarioConfiguradas($scope.usuario.idUsuario);
                            // $scope.goToStepOperaciones();
                          }else{
                            alertFactory.success('Se guardó su usuario configurador exitosamente.');
                            $scope.init();
                          }
                        } else if (result.data[0].respuesta == 0){
                          alertFactory.warning(result.data[0].mensaje);
                        }
                    } else {
                        alertFactory.error('Ocurrio un error al guardar sus datos.');
                    }
                });

            }
        }

        $scope.getOperacionesUsuarioConfiguradas = function(idUsuario, resta){
          debugger;
            if(idUsuario !== undefined && idUsuario !== null && idUsuario != 0 )
            {
                $scope.operacionesConfiguradas = [];
                nuevoUsuarioRepository.getOperacionesUsuarioConfiguradas(idUsuario).then(function(result){
                    if(angular.isArray(result.data)){
                        $scope.operacionesConfiguradas = result.data;
                        $scope.goToStepOperaciones(resta);
                    } else {
                        alertFactory.error('Ocurrio un error al intentar obtener las operaciones configuradas del usuario.');
                    }
                });
            } else {
                alertFactory.error('Ocurrio un error al intentar recuperar el id del usuario.');
            }
        }

        $scope.goToStepOperaciones = function(resta){
            nuevoUsuarioRepository.getOperacionesUsuario().then(function (result){
                if(angular.isArray(result.data)){
                  if(result.data.length > 0){
                    $scope.Operaciones = result.data;
                    if(resta){
                      $scope.gotoStep($scope.currentStep - 1);
                    }else{
                      $scope.gotoStep($scope.currentStep + 1);
                    }

                  } else {
                    alertFactory.info('No se obtuvieron operaciones.');
                  }
                } else {
                  alertFactory.error('Ocurrio un error al obtener las operaciones.');
                }
            });
        }

        $scope.datosCompletos = function(){
          var isValid = true;

          if ($scope.usuario.nombre === undefined || $scope.usuario.nombre === null || $scope.usuario.nombre === '' ){
              isValid = false;
              alertFactory.error('El campo Nombre Completo es obligatorio.');
          }
          if ($scope.usuario.email === undefined || $scope.usuario.email === null || $scope.usuario.email === ''){
              isValid = false;
              alertFactory.error('El campo Correo Electrónico es obligatorio.');
          } else if (!isValidEmail($scope.usuario.email)){
              isValid = false;
              alertFactory.error('El campo Correo Electrónico no tiene el formato correcto.');
          }
          if ($scope.usuario.username === undefined || $scope.usuario.username === null || $scope.usuario.username === ''){
              isValid = false;
              alertFactory.error('El campo Usuario es obligatorio.');
          }
          if($scope.usuario.password === undefined || $scope.usuario.password === null || $scope.usuario.password === ''){
              isValid = false;
              alertFactory.error('El campo Contraseña es obligatorio.');
          }
          if($scope.usuario.rol === undefined || $scope.usuario.rol === null || $.isEmptyObject($scope.usuario.rol)){
              isValid = false;
              alertFactory.error('El campo Rol de Usuario es obligatorio.');
          }

          return isValid;
        }

        function isValidEmail(strToEvaluate){
            var email = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
            return email.test(strToEvaluate);
        }

    // fin funciones Paso 1

    // funciones Paso 2

        $scope.guardaContratoOperacion = function(){
          if ($scope.usuario.idUsuario !== 0 && $scope.usuario.idUsuario !== undefined && $scope.usuario.idUsuario !== null){
            if ($scope.ContOpeSelected !== null){
                nuevoUsuarioRepository.postInsContratoOperacionUsuario($scope.ContOpeSelected.idContratoOperacion, $scope.usuario.idUsuario).then(function (result){
                  if (angular.isArray(result.data) && result.data.length > 0){
                      if (result.data[0].respuesta == 0){
                        alertFactory.warning(result.data[0].mensaje);
                      } else if (result.data[0].respuesta == 1){
                        $scope.idContratoOperacionUsuario = result.data[0].idContratoOperacionUsuario;
                        alertFactory.info(result.data[0].mensaje);
                        $scope.goToStepPermisos();
                      } else if (result.data[0].respuesta == 2){
                        $scope.idContratoOperacionUsuario = result.data[0].idContratoOperacionUsuario;
                        alertFactory.success(result.data[0].mensaje);
                        $scope.goToStepPermisos();
                      }
                  }else{
                      alertFactory.error('Ocurrio un problema al intentar asignar la operación.');
                  }
                });

            } else {
                alertFactory.info('Debe seleccionar una operación para poder avanzar.');
            }
          } else {
              alertFactory.error('Ocurrio un problema al intentar recuperar el id del Usuario.');
          }
        }

        $scope.goToStepPermisos = function(){
            $('#loadModal').modal('show');
            $scope.getPermisos();
        }

    // fin funciones Paso 2

    // funciones Paso 3

        $scope.getPermisos = function(){
          $scope.count = 0;
          $scope.totalPermisos = 4;

          // obtiene los permisos de zona
          nuevoUsuarioRepository.getPermisos($scope.idContratoOperacionUsuario,1).then(function(result){
            if(angular.isArray(result.data) && result.data.length > 0){
                $scope.dataZonas = [];

                angular.forEach(result.data,function(zona){
                  if(zona.idPadre !== 0){
                    $scope.insertSonInArrayParents($scope.dataZonas, zona, zona.idPadre);
                  } else {
                    var obj = {
                                'id': zona.idZona,
                                'title': zona.nombre,
                                'isCollapsed': false,
                                'isChecked': zona.checked == 1 ? true : false,
                                'parent': zona.idPadre,
                                'nodes': []
                              }
                    $scope.dataZonas.push(obj);
                  }
                });


                $scope.count ++;
                if ($scope.count == $scope.totalPermisos){
                    $scope.initPermisos();
                }
            }
          });

          // obtiene los permisos de proveedores
          nuevoUsuarioRepository.getPermisos($scope.idContratoOperacionUsuario,2).then(function(result){
            if(angular.isArray(result.data) && result.data.length > 0){
                $scope.dataProveedores = [];
                angular.forEach(result.data,function(proveedor){
                  var obj = {
                              'id': proveedor.idProveedor,
                              'title': proveedor.nombreComercial,
                              'isCollapsed': false,
                              'isChecked': proveedor.checked == 1 ? true : false,
                              'nodes': []
                            }

                  $scope.dataProveedores.push(obj);

                });
                $scope.count ++;
                if ($scope.count == $scope.totalPermisos){
                    $scope.initPermisos();
                }
            }
          });

          // obtiene los permisos de niveles
          nuevoUsuarioRepository.getPermisos($scope.idContratoOperacionUsuario,3).then(function(result){
            if(angular.isArray(result.data) && result.data.length > 0){
                $scope.dataNiveles = [];
                angular.forEach(result.data,function(nivel){
                  var obj = {
                              'id': nivel.nivel,
                              'title': nivel.descripcion,
                              'isCollapsed': false,
                              'isChecked': nivel.checked == 1 ? true : false,
                              'nodes': []
                            }

                  $scope.dataNiveles.push(obj);

                });
                $scope.count ++;
                if ($scope.count == $scope.totalPermisos){
                    $scope.initPermisos();
                }
            }
          });

          // obtiene los permisos de versión
          nuevoUsuarioRepository.getPermisos($scope.idContratoOperacionUsuario,4).then(function(result){
            if(angular.isArray(result.data) && result.data.length > 0){
                $scope.Versiones = result.data;
                angular.forEach(result.data,function(ver){
                  if (ver.checked == 1){
                    $scope.VersionSelected = ver;
                  }
                });
                $scope.count ++;
                if ($scope.count == $scope.totalPermisos){
                    $scope.initPermisos();
                }
            }
          });


        }

        $scope.initPermisos = function(){
          $scope.activeZona = false;
          $scope.activeProveedores = false;
          $scope.activeNiveles = false;
          $scope.activeVersion = false;
          $scope.buscaZona = '';
          $scope.buscaProveedor = '';

              switch ($scope.usuario.rol.idRol) {
                case 1:
                    $scope.activeZona = true;
                    break;
                case 2:
                    $scope.activeNiveles = true;
                    break;
                case 3:
                    $scope.activeZona = true;
                    break;
                case 4:
                    $scope.activeProveedores = true;
                    break;
            }

            $scope.gotoStep($scope.currentStep + 1);
            $('#loadModal').modal('hide');

        }

        $scope.activate = function(tabToActivate){
            $scope.activeZona = false;
            $scope.activeProveedores = false;
            $scope.activeNiveles = false;
            $scope.activeVersion = false;

            switch (tabToActivate) {
              case 1:
                  $scope.activeZona = true;
                  break;
              case 2:
                  $scope.activeProveedores = true;
                  break;
              case 3:
                  $scope.activeNiveles = true;
                  break;
              case 4:
                  $scope.activeVersion = true;
                  break;
            }

        }

        // zonas
          $scope.zonaVisible = function(title){
            return !($scope.buscaZona && $scope.buscaZona.length > 0
              && title.toUpperCase().indexOf($scope.buscaZona.toUpperCase()) == -1);
          }

          $scope.selectZonaChange = function(id, checked){
            if (checked == true){
              $scope.searchInArrayParents($scope.dataZonas, id, checked);
            } else {
              $scope.searchInArraySons($scope.dataZonas, id, checked);
            }
          }

          $scope.insertSonInArrayParents = function(paramArray, nodeToInsert, idToSearch){
                angular.forEach(paramArray,function(node){
                        if (node.id == idToSearch){
                              var obj = {
                                          'id': nodeToInsert.idZona,
                                          'title': nodeToInsert.nombre,
                                          'isCollapsed': false,
                                          'isChecked': nodeToInsert.checked == 1 ? true : false,
                                          'parent': nodeToInsert.idPadre,
                                          'nodes': []
                                        }
                              node.nodes.push(obj);
                        } else if (node.nodes.length > 0){
                            $scope.insertSonInArrayParents(node.nodes, nodeToInsert, idToSearch);
                        }
                });
          }

          $scope.searchInArraySons = function(paramArray, idToSearch, checked){
              angular.forEach(paramArray,function(node){
                  if (node.parent == idToSearch){
                    var id = 'check' + node.id;
                    node.isChecked = checked;
                    document.getElementById(id).checked = checked;
                    if (node.nodes.length > 0){
                      $scope.searchInArraySons($scope.dataZonas, node.id, checked);
                    }
                  } else if (node.nodes.length > 0){
                      $scope.searchInArraySons(node.nodes, idToSearch, checked);
                  }
              });
          }

          $scope.searchInArrayParents = function(paramArray, idToSearch, checked){
            angular.forEach(paramArray,function(node){
                if (node.id == idToSearch){
                  var id = 'check' + node.id;
                  node.isChecked = checked;
                  document.getElementById(id).checked = checked;
                  if (node.parent != 0){
                    $scope.searchInArrayParents($scope.dataZonas, node.parent, checked);
                  }
                } else if (node.nodes.length > 0){
                    $scope.searchInArrayParents(node.nodes, idToSearch, checked);
                }
            });
          }

          $scope.saveCheckedZones = function(paramArray){
                angular.forEach(paramArray,function(node){
                        if (node.isChecked){
                            nuevoUsuarioRepository.postInsContratoOperacionUsuarioZona($scope.idContratoOperacionUsuario, node.id).then(function (result){
                                if (angular.isArray(result.data) && result.data.length > 0){
                                    if (result.data[0].respuesta == 0){
                                        alertFactory.error(result.data[0].mensaje);
                                    } else {
                                        alertFactory.success(result.data[0].mensaje);
                                    }
                                } else {
                                    alertFactory.error('Ocurrio un error al intentar guardar las zonas.');
                                }
                            });
                            if (node.nodes.length > 0){
                                $scope.saveCheckedZones(node.nodes);
                            }
                        }
                });
          }

          $scope.guardarZonas = function(){
              var resultado = $scope.validSonsChecked($scope.dataZonas);
              if (resultado){
                  if ($scope.idContratoOperacionUsuario !== 0 && $scope.idContratoOperacionUsuario !== undefined && $scope.idContratoOperacionUsuario !== null){
                      alertFactory.success('se guardarán sus cambios.');
                      nuevoUsuarioRepository.delPermisos($scope.idContratoOperacionUsuario, 1).finally(function(){
                          $scope.saveCheckedZones($scope.dataZonas);
                      });
                  } else {
                      alertFactory.error('Ocurrio un problema al intentar recuperar la Operación del Usuario.');
                  }
              } else {
                  alertFactory.warning('Para guardar sus zonas debe seleccionar al menos una zona de un nivel inferior, si su zona padre se encuentra seleccionada.');
              }
          }

          $scope.validSonsChecked = function(paramArray){
            var validChilds = true;
              angular.forEach(paramArray,function(node){
                if (validChilds){
                    var checkedChilds = 0;
                        if(node.isChecked == true){
                            if (node.nodes.length > 0){
                                checkedChilds = $scope.countSonsChecked(node.nodes);
                                if (checkedChilds == 0){
                                    validChilds = false;
                                } else {
                                    validChilds = $scope.validSonsChecked(node.nodes);
                                }
                            }
                        }
                  }
              });

              return validChilds;
          }

          $scope.countSonsChecked = function(paramArray){
            var countChilds = 0;
            angular.forEach(paramArray,function(node){
              if (node.isChecked){
                  countChilds = countChilds + 1;
              }
            });

            return countChilds;

          }
      //

      // proveedores
        $scope.proveedorVisible = function(title){
          return !($scope.buscaProveedor && $scope.buscaProveedor.length > 0
            && title.toUpperCase().indexOf($scope.buscaProveedor.toUpperCase()) == -1);
        }

        $scope.guardarProveedor = function(){
          var countProv = 0;
          if ($scope.idContratoOperacionUsuario !== 0 && $scope.idContratoOperacionUsuario !== undefined && $scope.idContratoOperacionUsuario !== null){
              nuevoUsuarioRepository.delPermisos($scope.idContratoOperacionUsuario, 2).finally(function(){
                  angular.forEach($scope.dataProveedores, function(proveedor){
                      if (proveedor.isChecked){
                        nuevoUsuarioRepository.postInsContratoOperacionUsuarioProveedor($scope.idContratoOperacionUsuario, proveedor.id).then(function (result){
                            if (angular.isArray(result.data) && result.data.length > 0){
                                if (result.data[0].respuesta == 0){
                                    alertFactory.error(result.data[0].mensaje);
                                } else {
                                    countProv ++;
                                    alertFactory.success(result.data[0].mensaje);
                                }
                            } else {
                                alertFactory.error('Ocurrio un error al intentar guardar los proveedores.');
                            }
                        });
                      }
                  });

                  if(countProv == 0){
                    alertFactory.info('Se guardaron sus cambios.');
                  }
              });
          } else {
              alertFactory.error('Ocurrio un problema al intentar recuperar la Operación del Usuario.');
          }
        }
      //

      // niveles
        $scope.guardarNiveles = function(){
          if ($scope.idContratoOperacionUsuario !== 0 && $scope.idContratoOperacionUsuario !== undefined && $scope.idContratoOperacionUsuario !== null){
              nuevoUsuarioRepository.delPermisos($scope.idContratoOperacionUsuario, 3).finally(function(){
                  angular.forEach($scope.dataNiveles, function(nivel){
                      if (nivel.isChecked){
                        nuevoUsuarioRepository.postInsContratoOperacionUsuarioNivel($scope.idContratoOperacionUsuario, nivel.id).then(function (result){
                            if (angular.isArray(result.data) && result.data.length > 0){
                                if (result.data[0].respuesta == 0){
                                    alertFactory.error(result.data[0].mensaje);
                                } else {
                                    alertFactory.success(result.data[0].mensaje);
                                }
                            } else {
                                alertFactory.error('Ocurrio un error al intentar guardar los niveles.');
                            }
                        });
                      }
                  });
              });
          } else {
              alertFactory.error('Ocurrio un problema al intentar recuperar la Operación del Usuario.');
          }
        }
      //

      // versión
        $scope.guardarVersion = function(){
          if ($scope.idContratoOperacionUsuario !== 0 && $scope.idContratoOperacionUsuario !== undefined && $scope.idContratoOperacionUsuario !== null){
              if ($scope.VersionSelected !== null && $scope.VersionSelected !== undefined && !$.isEmptyObject($scope.VersionSelected)) {
                  nuevoUsuarioRepository.postInsContratoOperacionUsuarioVersion($scope.idContratoOperacionUsuario, $scope.VersionSelected.idCatalogoVersion).then(function(result){
                    if (angular.isArray(result.data) && result.data.length > 0){
                        if (result.data[0].respuesta == 0){
                          alertFactory.warning(result.data[0].mensaje);
                        } else if (result.data[0].respuesta == 1){
                          alertFactory.info(result.data[0].mensaje);
                        } else if (result.data[0].respuesta == 2){
                          alertFactory.success(result.data[0].mensaje);
                        }
                    } else {
                        alertFactory.error('Ocurrio un problema al intentar asignar la versión.');
                    }
                  });
              } else {
                  alertFactory.info('Debe seleccionar una versión para poder asignarla.');
              }
          } else {
              alertFactory.error('Ocurrio un problema al intentar recuperar la Operación del Usuario.');
          }
        }
      //

    // fin funciones Paso 3
});
