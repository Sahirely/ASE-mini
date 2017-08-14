registrationModule.controller('facturacionController', function ($scope, $modal, idOperacion, $modalInstance, configuradorRepository, alertFactory, globalFactory) {

	$scope.init = function () {
      $scope.RFC = '';
      $scope.razonSocial = '';
      $scope.getDatos();
	}

  $scope.getDatos = function() {
      configuradorRepository.getDatosFacturacion(idOperacion).then(function (result){
          if (result.data.length > 0){
            $scope.RFC = result.data[0].RFC;
            $scope.razonSocial = result.data[0].razonSocial;
          }
      }, function (error){
          $scope.RFC = '';
          $scope.razonSocial = '';
      });

  }

  $scope.guardaDatos = function(){
      configuradorRepository.insDatosFacturacion(idOperacion, $scope.RFC, $scope.razonSocial).then(function (result){
          if (result.data.length > 0){
              alertFactory.success('Se guardaron los datos de facturación correctamente.');
              $scope.close();
          }
      }, function (error){
          alertFactory.info('No se pudieron guardar sus datos de facturación.');
      });
  }

	$scope.close = function () {
      $modalInstance.dismiss('cancel');
  };

});
