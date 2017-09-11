registrationModule.controller('comentarios_controller', function($scope, $modalInstance, $modal, $http, $sce, $window, callback, error, tipoComentario, ordenServicioRepository, alertFactory, consultaCitasRepository, globalFactory, userFactory) {

    $scope.init = function(){
      $scope.tipoComentario = tipoComentario;
    }

    $scope.close = function() {
        callback('');
        $modalInstance.dismiss('cancel');
    };
    $scope.agregar = function() {
    	if($scope.comentario == '' || $scope.comentario == null || $scope.comentario == undefined){
    		//alertFactory.info('Favor de ingresar comentario')
            $scope.comentario = '';
            callback($scope.comentario);
            $modalInstance.dismiss('cancel'); 
    	}else{
            callback($scope.comentario);
            $modalInstance.dismiss('cancel');
    	}
    };

});
