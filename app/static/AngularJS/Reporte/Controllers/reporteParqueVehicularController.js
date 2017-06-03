registrationModule.controller('reporteParqueVehicularController', function ($scope, $route, alertFactory, userFactory, configuradorRepository) {

    $scope.userData = {};
    $scope.tipoUnidadSelected = '';
    $scope.tiposUnidad = [];

    $scope.init = function () {
      debugger;
        userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        if($scope.userData != null){
          $scope.ObtenerTiposUnidad();
        }
    }

    $scope.ObtenerTiposUnidad = function () {
      debugger;
        var idOp = $scope.userData.idOperacion;
        configuradorRepository.getTipoUnidades(3).then(function(result){
            if(result.data.length > 0){
              $scope.tiposUnidad = result.data;
            }else{
              alertFactory.info('La Operación no Cuenta con Tipos de Unidad Configurados');
            }
        }, function (error) {
            alertFactory.error('Ocurrio un Error al Cargar los Tipos de Unidad.');
        });
    }

});
