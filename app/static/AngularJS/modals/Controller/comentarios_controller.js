registrationModule.controller('comentarios_controller', function($scope, $modalInstance, $modal, $http, $sce, $window, callback, error, ordenServicioRepository, alertFactory, consultaCitasRepository, globalFactory, userFactory) {

    $scope.close = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.agregar = function() {
    	if($scope.comentario == '' || $scope.comentario == null || $scope.comentario == undefined){
    		alertFactory.info('Favor de ingresar comentario')
    	}else{
    		callback($scope.comentario);
        $scope.close();
    	}
        

    };

});
