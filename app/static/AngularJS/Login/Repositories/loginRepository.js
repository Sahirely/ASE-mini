var loginUrl = global_settings.urlCORS + '/api/login/';

registrationModule.factory('loginRepository', function ($http) {
    return {
        login: function(usuario, password){
            return $http({
                url: loginUrl + 'validaCredenciales/',
                method: "GET",
                params: {
                    usuario:usuario,
                    password:password
                  },
                headers: {
                'Content-Type': 'application/json'
                }
            });
        },
        obtieneModulos: function(idOperacion){
          return $http({
              url: loginUrl + 'ObtieneModulosOperacion/',
              method: "GET",
              params: {
                  idOperacion: idOperacion
                },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        },
        obtieneDetalleModulo: function(idModulo, idOperacion){
          return $http({
              url: loginUrl + 'ObtieneDetalleModuloOperacion/',
              method: "GET",
              params: {
                  idModulo: idModulo,                  
                  idOperacion: idOperacion
                },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        }
    };
});
