registrationModule.controller('nuevaUnidadController', function ($scope, $modal, idOperacion, presupuesto, gps, callback, idContratoOperacion, $modalInstance, configuradorRepository, cotizacionConsultaRepository,  alertFactory) {

    //VARIABLES PARA ZONAS DINAMICAS
    $scope.x = 0;
    $scope.totalNiveles = 0;
    $scope.zonaSelected = "0";
    $scope.ZonasSeleccionadas = {};
    $scope.NivelesZona = [];
    $scope.Zonas = [];

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.init = function () {
    	$scope.show_centros=false;
    	$scope.show_gps=false

        $scope.getTipoUnidad();
        $scope.ZonasSeleccionadas[0] = "0";
        $scope.obtieneNivelZona();

    	if (presupuesto==1) {
    		$scope.show_centros=true;
    		$scope.getCentrosDeTrabajo();
    	};

    	if (gps==1) {
    		$scope.show_gps=true;
    	};

    }
  
     $scope.getCentrosDeTrabajo = function(){
        $scope.promise = configuradorRepository.getCentrosDeTrabajo(idOperacion).then(function (result) {
            if (result.data.length > 0) {
                $scope.centrosDeTrabajo = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Centros de Trabajo');
        });
    }

    $scope.getTipoUnidad = function(){
        $scope.promise = configuradorRepository.getTipoUnidades(idOperacion).then(function (result) {
            if (result.data.length > 0) {
                $scope.tipoUnidades = result.data;
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener los Centros de Trabajo');
        });
    }

	$scope.guardarUnidad = function () {
		$scope.promise = configuradorRepository.postUnidad($scope.numEconomico, $scope.vin, $scope.numGPS, $scope.tipoUnidad, $scope.sustituto, idOperacion, $scope.centroTrabajo, $scope.placa, $scope.zonaSelected ).then(function (result) {
           if (result.data.length > 0) {
           		alertFactory.success('Se guardó correctamente la unidad.');
                callback();
            	$scope.close();
            }
        }, function (error) {
            alertFactory.error('No se puenen guardar la Operación');
        });
		
	}


    ////ZONAS////
     //obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
    $scope.obtieneNivelZona = function() {
        $scope.promise = cotizacionConsultaRepository.getNivelZona(idContratoOperacion).then(function(result) {
                console.log(result, 'Soy las zonas ')
                $scope.totalNiveles = result.data.length;
                if (result.data.length > 0) {
                    $scope.NivelesZona = result.data;
                    $scope.devuelveZonas();
                }
            },
            function(error) {
                alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.');
            });
    };

    //obtiene las zonas por cada nivel con que cuenta el usuario
    $scope.devuelveZonas = function() {
        for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
            cotizacionConsultaRepository.getZonas(idContratoOperacion, $scope.NivelesZona[$scope.x].idNivelZona).then(function(result) {
                if (result.data.length > 0) {
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

    $scope.cambioZona = function(id, orden, zona, zonaseleccionada) {
        //al cambiar de zona se establece como zona seleccionada.
        $scope.zonaSelected = id;
        //Obtengo la zona seleccionada 
        angular.forEach(zona.data, function(value, key) {
            if (value.idZona == $scope.zonaSelected) {
                $scope.nombreZona = value.nombre;
                $scope.etiquetaZona = value.etiqueta;
            }
        });

        //se limpian los combos siguientes.
        for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
            $scope.ZonasSeleccionadas[$scope.x] = "0";
        }
    };

});

