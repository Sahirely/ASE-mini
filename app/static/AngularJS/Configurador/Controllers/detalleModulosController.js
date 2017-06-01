registrationModule.controller('detalleModulosController', function ($scope, $modal, idOperacion, detalle, callback, error, $modalInstance, configuradorRepository, localStorageService) {
$scope.timeAsignacion = localStorageService.get('timeAsigna');
$scope.horaAsignacion = null;

    $scope.init = function () {
        $scope.titulo= detalle.nombreModulos;
        $scope.detalleModulo ();
        $scope.contador =0;
        $scope.detallesPorModulo = [];

                //fecha
    $('#fechaAsignada .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: true,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        startDate: new Date()
    });

    $('.horaAsignada').clockpicker();
    }

    $scope.detalleModulo = function () {
        $scope.detalles = [];
        $scope.promise = configuradorRepository.getDetalleModulo(detalle.idModulo).then(function (result) {
            if (result.data.length > 0) {
               $scope.detalles = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puede guardar la configuración');
        });
    }

    $scope.changeDetalle = function (data, detalle) {
      
        var bandera = false;

        if ($scope.detallesPorModulo.length>0) {
            for (var i = 0 ; i < $scope.detalles.length; i++) {
                if ($scope.detallesPorModulo[i].idCatalogoDetalleModulo == data.idCatalogoDetalleModulo) {
                    bandera = true
                };
            };

            if(!bandera){
                var obj=new Object();
                    obj=new Object();
                    obj.ID= $scope.contador;
                    obj.idCatalogoDetalleModulo = data.idCatalogoDetalleModulo;
                    obj.valor=detalle;
                    $scope.detallesPorModulo.push(obj);
                    $scope.contador += 1;
            }else{
                $scope.detallesPorModulo[data].valor=detalle
            }
        }else{
            var obj=new Object();
                obj=new Object();
                obj.ID= $scope.contador;
                obj.idCatalogoDetalleModulo = data.idCatalogoDetalleModulo;
                obj.valor=detalle;
                $scope.detallesPorModulo.push(obj);
                $scope.contador += 1;
        }
    }

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
        $scope.horaAsignacion = null;
    };

    $scope.guardarDetalle = function () {
        var detalle = '';
        for (var i = 0 ; i < $scope.detallesPorModulo.length; i++) {
            if ($scope.detallesPorModulo[i].valor) {
                detalle += $scope.detallesPorModulo[i].idCatalogoDetalleModulo +',';
            };
        };

		$scope.promise = configuradorRepository.postModuloPorDertalle(detalle.idModulo, detalle, $scope.horaAsignacion).then(function (result) {
            if (result.data.length > 0) {
            	$scope.close();
            }
        }, function (error) {
            alertFactory.error('No se puede guardar la configuración');
        });
	}




});

