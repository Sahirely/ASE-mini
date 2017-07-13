registrationModule.controller('recordatorios_controller', function($scope, $modalInstance, $modal, $http, $sce, $window, idContratoOperacion, data, callback, error, detalleRepository, alertFactory, $filter, consultaCitasRepository, globalFactory, userFactory) {

	$scope.comentaRecordatorio = "";
	$scope.fechaRecordatorio = "";
	$scope.horaRecordatorio = "";
	$scope.btn_recordatorios= 'Agregar';

	$scope.init = function () {
    userFactory.ValidaSesion();
		if (data != '') {
			$scope.btn_recordatorios= 'Actualizar';
			$scope.comentaRecordatorio = data.texto;
			$scope.fechaRecordatorio = data.fechaRecordatorio;
			$scope.horaRecordatorio = data.horaRecordatorio;

		};
		
		$scope.userData = userFactory.getUserData();
		$('.horaAsignada').clockpicker();
	}

	$scope.close = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.recordatorio = function() {
	    if ($scope.comentaRecordatorio != "" && $scope.fechaRecordatorio != "" && $scope.horaRecordatorio != "") {

	        $scope.fechaCompleta = $scope.fechaRecordatorio + ' ' + $scope.horaRecordatorio;
	        detalleRepository.postRecordatorio($scope.comentaRecordatorio, $scope.fechaCompleta, $scope.userData.idUsuario, idContratoOperacion, data.idRecordatorio).then(function(result) {
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

     //*****************************************************************************************************************************//
    // Valida que la fecha ingresada no sea antigua.
    //*****************************************************************************************************************************//
    $scope.NoFechaAntigua = function(fecha){
    	
        var CurrentDate = new Date();
        var anio = CurrentDate.getFullYear();
        var mes = CurrentDate.getMonth() + 1;
        var dia = CurrentDate.getDate();
        var diaActual  = new Date(anio+'/'+mes+'/'+dia);
        var fechaSeleccionada = new Date(fecha);

        if (fechaSeleccionada < diaActual){
            $scope.fechaRecordatorio = '';
            $scope.horaRecordatorio = '';
            $scope.SeleccionoDiaActual = false;
            alertFactory.info('No puede seleccionar una fecha anterior.');
        }

        if(!(fechaSeleccionada < diaActual) && !(fechaSeleccionada > diaActual)){
            $scope.SeleccionoDiaActual = true;
            if($scope.horaRecordatorio != undefined && $scope.horaRecordatorio != '' && $scope.horaRecordatorio != null){
                $scope.NoHoraAntigua($scope.horaRecordatorio);
            }
        }

        if(fechaSeleccionada > diaActual){
          $scope.SeleccionoDiaActual = false;
        }
    };

    $scope.NoHoraAntigua = function(hora){
    	
      if($scope.fechaRecordatorio != undefined && $scope.fechaRecordatorio != '' && $scope.fechaRecordatorio != null){
          if($scope.SeleccionoDiaActual == true){
              var HoraActual = new Date();
              var anio = HoraActual.getFullYear();
              var mes = HoraActual.getMonth() + 1;
              var dia = HoraActual.getDate();
              var HoraSeleccionada  = new Date(anio+'/'+mes+'/'+dia+' '+hora+ ':00.000');

              if (!(HoraSeleccionada > HoraActual)){
                $scope.horaRecordatorio = '';
                alertFactory.info('No puede seleccionar una hora anterior.');
              }
          }
      }else{
            $scope.horaRecordatorio = '';
            alertFactory.info('Seleccione antes la fecha del recordatorio.');
      }
    }
});