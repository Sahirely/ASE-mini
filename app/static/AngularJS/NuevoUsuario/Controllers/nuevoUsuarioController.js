registrationModule.controller('nuevoUsuarioController', function($scope, $rootScope, localStorageService, userFactory, alertFactory, commonService, $location, nuevoUsuarioRepository, globalFactory) {

    $rootScope.modulo = 'nuevoUsuario';

    $scope.init = function(){
        $scope.userData = userFactory.getUserData();
        userFactory.ValidaSesion();

        $scope.show_searchField = true;
        $scope.show_results = false;
        $scope.textoBusqueda = '';
        $scope.users = [];

        //este se llamará al hacer dar click al crear o editar usuario
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
      $scope.user = {};
      // se llamará cuando despues de validar el paso 2 se envíe al paso 3
      $scope.initPermisos();

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

        $scope.guardarDatosGenerales = function(){
          $scope.gotoStep($scope.currentStep + 1);
        }

    // fin funciones Paso 1

    // funciones Paso 2

    // fin funciones Paso 2

    // funciones Paso 3

        $scope.initPermisos = function(){
          $scope.activeZona = true;
          $scope.activeProveedores = false;
          $scope.activeNiveles = false;
          $scope.activeVersion = false;
          $scope.buscaZona = '';
          $scope.buscaProveedor = '';
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
            && title.indexOf($scope.buscaZona) == -1);
        }

        $scope.selectZonaChange = function(id, checked){
          if (checked == true){
            $scope.searchInArrayParents($scope.data, id, checked);
          } else {
            $scope.searchInArraySons($scope.data, id, checked);
          }
        }

        $scope.searchInArraySons = function(paramArray, idToSearch, checked){
            angular.forEach(paramArray,function(node){
                if (node.parent == idToSearch){
                  var id = 'check' + node.id;
                  node.isChecked = checked;
                  document.getElementById(id).checked = checked;
                  if (node.nodes.length > 0){
                    $scope.searchInArraySons($scope.data, node.id, checked);
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
                  $scope.searchInArrayParents($scope.data, node.parent, checked);
                }
              } else if (node.nodes.length > 0){
                  $scope.searchInArrayParents(node.nodes, idToSearch, checked);
              }
          });
        }

        $scope.guardarZonas = function(){
          var resultado = $scope.validSonsChecked($scope.data);
          if (resultado){
            alertFactory.success('Se guardaran sus zonas.');
          }else{
            alertFactory.warning('Para guardar sus zonas debe seleccionar al menos una zona de un nivel inferior, si su zona padre se encuentra seleccionada.');
          }
        }

        $scope.validSonsChecked = function(paramArray){
          var validChilds = true;
            angular.forEach(paramArray,function(node){
              var checkedChilds = 0;
                if(node.isChecked == true){
                  if (node.nodes.length > 0){
                    checkedChilds = $scope.countSonsChecked(node.nodes);

                    if (checkedChilds == 0){
                      validChilds = false;
                    } else{
                        validChilds = $scope.validSonsChecked(node.nodes);
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
            && title.indexOf($scope.buscaProveedor) == -1);
        }

        //

        // niveles
        //

        // versión
        //

    // fin funciones Paso 3


    // inicia tree zonasTemp



    $scope.data = [{
      'id': 1,
      'title': 'node1',
      'isCollapsed': false,
      'isChecked':false,
      'parent': 0,
      'nodes': [{
        'id': 11,
        'title': 'node1.1',
        'isCollapsed': false,
        'isChecked':false,
        'parent': 1,
        'nodes': [{
          'id': 111,
          'title': 'node1.1.1',
          'isCollapsed': false,
          'isChecked': false,
          'parent': 11,
          'nodes': []
        }]
      }, {
        'id': 12,
        'title': 'node1.2',
        'isCollapsed': false,
        'isChecked':false,
        'parent': 1,
        'nodes': []
      }]
    }, {
      'id': 2,
      'title': 'node2',
      'isCollapsed': false,
      'isChecked':false,
      'parent': 0,
      'nodes': [{
        'id': 21,
        'title': 'node2.1',
        'isCollapsed': false,
        'isChecked':false,
        'parent': 2,
        'nodes': []
      }, {
        'id': 22,
        'title': 'node2.2',
        'isCollapsed': false,
        'isChecked':false,
        'parent': 2,
        'nodes': []
      }]
    }, {
      'id': 3,
      'title': 'node3',
      'isCollapsed': false,
      'isChecked':false,
      'parent': 0,
      'nodes': [{
        'id': 31,
        'title': 'node3.1',
        'isCollapsed': false,
        'isChecked':false,
        'parent': 3,
        'nodes': []
      }]
    }];
    // termina tree zonasTemp

    // inicia tree proveedoresTemp

    $scope.dataDos = [{
      'id': 1,
      'title': 'node1',
      'isCollapsed': false,
      'isChecked':false,
      'nodes': []
    }, {
      'id': 2,
      'title': 'node2',
      'isCollapsed': false,
      'isChecked':false,
      'nodes': []
    }, {
      'id': 3,
      'title': 'node3',
      'isCollapsed': false,
      'isChecked':false,
      'nodes': []
    }];

    // termina tree proveedoresTemp

    // inicia tree nivelesTemp

    $scope.dataTres = [{
      'id': 1,
      'title': 'node1',
      'isCollapsed': false,
      'isChecked':false,
      'nodes': []
    }, {
      'id': 2,
      'title': 'node2',
      'isCollapsed': false,
      'isChecked':false,
      'nodes': []
    }, {
      'id': 3,
      'title': 'node3',
      'isCollapsed': false,
      'isChecked':false,
      'nodes': []
    }, {
      'id': 4,
      'title': 'node4',
      'isCollapsed': false,
      'isChecked':false,
      'nodes': []
    }];

    // termina tree nivelesTemp



});
