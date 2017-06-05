registrationModule.controller('reporteParqueVehicularController', function ($scope, $route, alertFactory, userFactory, configuradorRepository, reporteRepository, globalFactory) {

    $scope.userData = {};
    $scope.tipoUnidadSelected = '';
    $scope.tiposUnidad = [];
    $scope.Unidades = [];
    $scope.showGPS = false;
    $scope.showCentro = false;

    $scope.init = function () {
        userFactory.ValidaSesion();
        $scope.userData = userFactory.getUserData();
        debugger;
        $scope.showGPS = $scope.userData.geolocalizacion == 1 ? true : false;
        $scope.showCentro = $scope.userData.presupuesto == 1 ? true : false;
        if($scope.userData != null){
          $scope.ObtenerTiposUnidad();
        }
    }

    $scope.ObtenerTiposUnidad = function () {
        var idOp = $scope.userData.idOperacion;
        configuradorRepository.getTipoUnidades(3).then(function(result){
            if(result.data.length > 0){
              $scope.tiposUnidad = result.data;
            }else{
              alertFactory.info('La Operación no Cuenta con Tipos de Unidad Configurados.');
            }
        }, function (error) {
            alertFactory.error('Ocurrio un Error al Cargar los Tipos de Unidad.');
        });
    }

    $scope.GetReporteParqueVehicular = function(){
      var idOp = $scope.userData.idOperacion;
      var filtro = $scope.tipoUnidadSelected == '' || $scope.tipoUnidadSelected == undefined ? null :  $scope.tipoUnidadSelected;
      reporteRepository.reporteParqueVehicular(3, filtro).then(function(result){
        debugger;
          if(result.data.length > 0){
              $scope.Unidades = result.data;
              globalFactory.filtrosTabla("parqueVehicular","Parque Vehicular",5);
          }else {
              $scope.Unidades = [];
              globalFactory.filtrosTabla("parqueVehicular","Parque Vehicular",5);
              alertFactory.info('No se Encontraron Unidades');
          }
      },function (error){
          alertFactory.error('Ocurrio un Error al Cargar el Reporte.');
      });
    }

    $scope.irDetalle = function(numEco){
      debugger;
      location.href = '/unidad?economico='+numEco;
    }
});
