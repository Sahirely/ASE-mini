registrationModule.controller('loginController', function ($scope, alertFactory, userFactory, $rootScope, localStorageService, loginRepository, $route, citaRepository) {
    $rootScope.sesion = 0;
    $rootScope.showChat = 0;
    $scope.userData = {};
    $scope.UserIsValid = false;
    $scope.operaciones = [];
    $scope.cont = 0;
    $scope.operacionSeleccionada = '';
    $scope.ObjetoOperacionSelected = {};

    $scope.init = function () {}

    $scope.login = function (username, password) {
        loginRepository.login(username,password).then(function (result){
            if (result.data.length > 0) {
                $scope.UserIsValid = true;

                var id = result.data[0].idUsuario == null ? 0 : result.data[0].idUsuario;
                var nombre = result.data[0].nombreCompleto == null ? '' : result.data[0].nombreCompleto;
                var correo = result.data[0].Correo == null ? '' : result.data[0].Correo;

                for($scope.cont = 0; $scope.cont < result.data.length; $scope.cont++){
                  var operacion = {
                      idContratoOperacion: result.data[$scope.cont].idContratoOperacion,
                      nombreOperacion: result.data[$scope.cont].nombreOperacion,
                      idRol: result.data[$scope.cont].idCatalogoRol,
                      nombreRol: result.data[$scope.cont].nombreRol
                    };
                  $scope.operaciones.push(operacion);
                }

                $scope.userData = userFactory.saveUserData(id, nombre, correo, $scope.operaciones);

                if ($scope.userData.Operaciones.length > 1){
                  alertFactory.info('Seleccione una operación para ingresar.');
                } else {
                  var contOpe = $scope.userData.Operaciones[0].idContratoOperacion;
                  var Rol = $scope.userData.Operaciones[0].idRol;
                  var nombreRol = $scope.userData.Operaciones[0].nombreRol;

                  if (contOpe == null || contOpe == 0 || Rol == null || Rol == 0 || nombreRol == null || nombreRol == ''){
                    alertFactory.info('No cuenta con operaciones o roles para ingresar.');
                  } else{
                    $scope.userData = userFactory.updateSelectedOperation(contOpe, Rol, nombreRol);
                    $scope.Home();
                  }
                }

            } else {
                alertFactory.info('Usuario y/o contraseña no validos');
            }
        }, function (error) {
            alertFactory.error('Ocurrio un error al validar sus datos.');
        });
      }

      $scope.seleccinoOperacion = function (data) {
        for (var i = 0; i < $scope.userData.Operaciones.length; i++) {
          if($scope.userData.Operaciones[i].idContratoOperacion == data){
            $scope.ObjetoOperacionSelected = $scope.userData.Operaciones[i];
          }
        }
      }

      $scope.ingresar = function() {
        var contOpe = $scope.ObjetoOperacionSelected.idContratoOperacion;
        var Rol = $scope.ObjetoOperacionSelected.idRol;
        var nombreRol = $scope.ObjetoOperacionSelected.nombreRol;

        if (contOpe == null || contOpe == 0 || Rol == null || Rol == 0 || nombreRol == null || nombreRol == ''){
          alertFactory.info('Seleccione una operación para ingresar.');
        } else{
          $scope.userData = userFactory.updateSelectedOperation(contOpe, Rol, nombreRol);
          $scope.Home();
        }
      }

      $scope.Home = function(){
        debugger;
        if ($scope.userData.idRol == 3){
          alertFactory.info('ingresó un usuario call center');
        } else if ($scope.userData.idRol == 5){
          alertFactory.info('ingresó un usuario configurador');
        } else {
          location.href = '/dashboardgeneral';
        }
      }


});
