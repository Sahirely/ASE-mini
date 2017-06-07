registrationModule.controller('ordenPorCobrarController', function ($scope, $rootScope, localStorageService, alertFactory, globalFactory, ordenPorCobrarRepository) {
  $rootScope.modulo = 'ordenxCobrar'

  $scope.init = function () {

    // Obtengo la lista de tablas
   // $('.dataTableOrdenes').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerporcobrar', { 'idUsuario': 1 }).then(function (result) {
        $scope.porCobrar = result.data
        globalFactory.drawDocument('dataTablePorCobrar', 'OrdenesPorCobrar')
    }, function (error) {
      alertFactory.error('No se puenen obtener las órdenes por cobrar')
    })
  }
})
