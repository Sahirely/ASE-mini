registrationModule.controller('loginController', function ($scope, alertFactory, userFactory, $rootScope, localStorageService, loginRepository, $route, citaRepository) {
    $rootScope.sesion = 0;
    $rootScope.showChat = 0;
    $scope.userData = {};
    $scope.UserIsValid = false;
    $scope.operaciones = [];
    $scope.cont = 0;
    $scope.operacionSeleccionada = '';
    $scope.ObjetoOperacionSelected = {};

    $scope.init = function () {
        $scope.userData = userFactory.getUserData();
        if($scope.userData != null && $scope.userData != undefined){
            var id = $scope.userData.idUsuario;

            loginRepository.ValidaSesionActiva(id).then(function(result){
                if (result.data[0].HasSession == 'True'){
                    $scope.Home();
                }
            });
        }
    }

    $scope.login = function (username, password) {
      loginRepository.login(username,password).then(function (result){
          if (result.data.data.length > 0) {
              if (result.data.data[0].HasSession == 'False'){
                $scope.userData = userFactory.saveUserData(result.data.data[0]);
                if ($scope.userData.Operaciones.length > 1){
                  $scope.UserIsValid = true;
                  alertFactory.info('Seleccione una operación para ingresar.');
                } else {
                  var contOpe = $scope.userData.Operaciones[0].idContratoOperacion;
                  $scope.userData = userFactory.updateSelectedOperation(contOpe);
                  $scope.Home();
                }
              }else{
                  alertFactory.error('No puede iniciar sesión por que ya tiene una sesión activa.');
              }
          } else {
              alertFactory.info('Usuario y/o contraseña no válidos');
          }
      }, function (error) {
          alertFactory.error('Ocurrio un error al validar sus datos.');
      });

    }

      $scope.ingresar = function(data) {
        if (data == 0 || data == undefined || data == ''){//contOpe == null || contOpe == 0 || Rol == null || Rol == 0 || nombreRol == null || nombreRol == ''){
          alertFactory.info('Seleccione una operación para ingresar.');
        } else{
          $scope.userData = userFactory.updateSelectedOperation(data);
          $scope.Home();
        }
      }

      $scope.Home = function(){
        if ($scope.userData.idRol == 3){
          location.href = '/dashboardCallCenter';
        } else if ($scope.userData.idRol == 5){
          location.href = '/configurador';
        } else {
          location.href = '/dashboardgeneral';
        }
      }

});
