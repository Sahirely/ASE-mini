registrationModule.controller('recordatorios_controller', function($scope, $modalInstance, $modal, $http, $sce, $window, idContratoOperacion,  callback, error, detalleRepository, alertFactory, consultaCitasRepository, globalFactory, userFactory) {

	$scope.comentaRecordatorio = "";
	$scope.fechaRecordatorio = "";
	$scope.horaRecordatorio = "";

	$scope.init = function () {
		$scope.userData = userFactory.getUserData();
		$('.horaAsignada').clockpicker();
	}

	$scope.close = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.recordatorio = function() {
	    if ($scope.comentaRecordatorio != "" && $scope.fechaRecordatorio != "" && $scope.horaRecordatorio != "") {

	        $scope.fechaCompleta = $scope.fechaRecordatorio + ' ' + $scope.horaRecordatorio;
	        detalleRepository.postRecordatorio($scope.comentaRecordatorio, $scope.fechaCompleta, $scope.userData.idUsuario, idContratoOperacion).then(function(result) {
	            if (result.data.length > 0) {
	                alertFactory.success('Se inserto correctamente el Recordatorio');
	                callback();
	                $scope.close();
	            }
	        }, function(error) {
	            alertFactory.error('No se puede guardar recordatorio, intente mas tarde o comuniquese con el administrador');
	        });
	    } else {
	        alertFactory.info('Porfavor llene todos los campos');
	    }
    };
});