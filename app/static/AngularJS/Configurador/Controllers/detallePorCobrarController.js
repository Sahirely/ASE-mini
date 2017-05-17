registrationModule.controller('detallePorCobrarController', function ($scope, $modal, callback, error, $modalInstance) {

	$scope.close = function () {
        $modalInstance.dismiss('cancel');
    };
});
