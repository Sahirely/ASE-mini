var proveedorURL = global_settings.urlCORS + '/api/proveedor/';

registrationModule.factory('estadoCuentaRepository', function($http) {
    return {
        getEstadoCuenta: function(idOperacion) {
            return $http({
                url: proveedorURL + 'consultaEstadoCuenta/',
                method: "GET",
                params: {
                    idOperacion: idOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getEstadoCuentaDetalle: function(idOperacion, idProveedor, tipo){
            return $http({
                url: proveedorURL + 'consultaEstadoCuentaPorProveedor',
                method: 'GET',
                params:{
                    idOperacion: idOperacion,
                    idProveedor: idProveedor,
                    tipo: tipo
                },
                headers:{
                    'Content-Type': 'application/json'
                }
            });
        }
    };
})