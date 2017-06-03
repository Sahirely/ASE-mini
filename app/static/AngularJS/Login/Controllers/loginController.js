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
          debugger;
          if (result.data.data.length > 0) {
              var id = result.data.data[0].idUsuario == null ? 0 : result.data.data[0].idUsuario;
              var nombre = result.data.data[0].nombreCompleto == null ? '' : result.data.data[0].nombreCompleto;
              var correo = result.data.data[0].Correo == null ? '' : result.data.data[0].Correo;
              var operaciones = [];

              for(var x = 0; x < result.data.data.length; x++){
                //var modulos = $scope.obteniendoModulos(result.data[x].idOperacion);
                var operacion = {
                    idContratoOperacion: result.data.data[x].idContratoOperacion,
                    idOperacion: result.data.data[x].idOperacion,
                    nombreOperacion: result.data.data[x].nombreOperacion,
                    modulos: result.data.data[x].modulos,
                    manejoUtilidad: result.data.data[x].manejoUtilidad,
                    porcentajeUtilidad: result.data.data[x].porcentajeUtilidad,
                    presupuesto: result.data.data[x].presupuesto,
                    geolocalizacion: result.data.data[x].geolocalizacion,
                    tiempoAsignado: result.data.data[x].tiempoAsignado,
                    idRol: result.data.data[x].idCatalogoRol,
                    nombreRol: result.data.data[x].nombreRol
                  };
                operaciones.push(operacion);
              }

              userData = {
                idUsuario: id,
                nombreCompleto: nombre,
                Correo: correo,
                Operaciones: operaciones,
                Modulos: [],
                contratoOperacionSeleccionada: 0,
                idOperacion: 0,
                nombreOperacion: '',
                manejoUtilidad: 0,
                porcentajeUtilidad: 0.0000,
                presupuesto: 0,
                geolocalizacion: 0,
                tiempoAsignado: 0,
                idRol: 0,
                Rol: ''
              };

              $scope.userData = userFactory.saveUserData(userData);
              if ($scope.userData.Operaciones.length > 1){
                $scope.UserIsValid = true;
                alertFactory.info('Seleccione una operación para ingresar.');
              } else {
                var contOpe = $scope.userData.Operaciones[0].idContratoOperacion;
                debugger;
                $scope.userData = userFactory.updateSelectedOperation(contOpe);
                $scope.Home();
              }
          } else {
              alertFactory.info('Usuario y/o contraseña no validos');
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
