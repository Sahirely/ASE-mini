function modal_password($scope, $modal, password, callback) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/NuevoUsuario/Templates/password.html',
        controller: 'passwordController',
        backdrop: 'static',
        keyboard: false,
        size: 500,
        resolve:{
            password: function() {
                return password;
            },
            callback: function() {
                return callback;
            }
        }
    });
}
