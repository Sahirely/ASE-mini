registrationModule.controller('detalleServiciosController', function ($scope, $modal, callback, error, $modalInstance) {

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});
