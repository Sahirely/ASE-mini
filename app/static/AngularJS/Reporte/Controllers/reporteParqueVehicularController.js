registrationModule.controller('reporteParqueVehicularController', function ($scope, $rootScope, $route, alertFactory, userFactory, configuradorRepository, reporteRepository, cotizacionConsultaRepository, globalFactory) {

  $rootScope.modulo = 'reporteParqueVehicular';
  $scope.userData = {};
  $scope.userData = userFactory.getUserData();
  $scope.tiposUnidad = [];
  $scope.Unidades = [];
  $scope.showGPS = false;
  $scope.showCentro = false;
  $scope.x = 0;
  $scope.totalNiveles = 0;
  $scope.tipoUnidadSelected = '';
  $scope.zonaSelected = '';
  $scope.ZonasSeleccionadas = [];
  $scope.NivelesZona = [];
  $scope.Zonas = [];
  $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
  $scope.idUsuario = $scope.userData.idUsuario;

  $scope.init = function () {
    userFactory.ValidaSesion();
    $scope.GetReporteParqueVehicular();
    $scope.ZonasSeleccionadas[0] = "0";
    $scope.obtieneNivelZona();
    $scope.showGPS = $scope.userData.geolocalizacion == 1 ? true : false;
    $scope.showCentro = $scope.userData.presupuesto == 1 ? true : false;
    if($scope.userData != null){
      $scope.ObtenerTiposUnidad();
    }
  }

  $scope.obtieneNivelZona = function(){
    $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.idContratoOperacion).then(function (result) {
      $scope.totalNiveles = result.data.length;
      if(result.data.length > 0){
        $scope.NivelesZona = result.data;
        $scope.devuelveZonas();
      }
    },
    function (error) {
     alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
   });
  }

  //obtiene las zonas por cada nivel con que cuenta el usuario
  $scope.devuelveZonas = function() {
    for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x ++){
      cotizacionConsultaRepository.getZonas($scope.idContratoOperacion, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function(result) {
        if (result.data.length > 0){
          var valueToPush = {};
          valueToPush.orden = result.data[0].orden;
          valueToPush.etiqueta = result.data[0].etiqueta;
          valueToPush.data = result.data;
          $scope.Zonas.push(valueToPush);
          //se establece por default cada zona seleccionada en 0
          $scope.ZonasSeleccionadas[result.data[0].orden] = "0";
        }
      }, function(error) {
        alertFactory.error('No se pudo recuperar información de las zonas');
      });
    }
  };

  $scope.cambioZona = function(id, orden){
    $scope.zonaSelected = id;
    for($scope.x = orden+1; $scope.x <= $scope.totalNiveles; $scope.x ++){
      $scope.ZonasSeleccionadas[$scope.x] = "0";
    }
  }

  $scope.ObtenerTiposUnidad = function () {
    reporteRepository.getTipoUnidades($scope.idContratoOperacion).then(function(result){
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
    $scope.Unidades = [];
    $('.parqueVehicular').DataTable().destroy();
    var idTipoUnidad = $scope.tipoUnidadSelected == '' || $scope.tipoUnidadSelected == undefined ? null :  $scope.tipoUnidadSelected;
    var idZona = $scope.zonaSelected == '' || $scope.zonaSelected == '0' || $scope.zonaSelected == undefined ? null : $scope.zonaSelected;
    reporteRepository.reporteParqueVehicular($scope.idContratoOperacion, idTipoUnidad, idZona).then(function(result){
      if(result.data.length > 0){
        $scope.Unidades = result.data;
        globalFactory.filtrosTabla("parqueVehicular", "Parque Vehicular", 100);
        alertFactory.success('Unidades encontradas.');
      }else {
        alertFactory.info('No se encontraron unidades');
      }
    },function (error){
      alertFactory.error('Ocurrio un Error al Cargar el Reporte.');
    });
  }

  $scope.irDetalle = function(numEco){
    location.href = '/unidad?economico='+numEco;
  }
});
