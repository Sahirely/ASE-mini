registrationModule.controller('passwordController', function($scope, $modalInstance, $modal, $http, $sce, $window, callback, password, alertFactory, globalFactory) {

    $scope.init = function(){
      // $scope.pass = password;
    };

    $scope.close = function() {
        callback(password);
        $modalInstance.dismiss('cancel');
    };

    $scope.enviar = function() {
    	if($scope.pass == '' || $scope.pass == null || $scope.pass == undefined){
    		    alertFactory.info('Favor de ingresar nueva contraseña.');
    	}else{
            callback($scope.pass);
            $modalInstance.dismiss('cancel');
    	}
    };

});
