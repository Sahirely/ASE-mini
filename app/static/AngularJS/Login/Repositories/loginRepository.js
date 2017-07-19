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
        iniciaSesionHistorial: function(idUsuario){
          return $http({
              url: loginUrl + 'ingresaHistorial/',
              method: "POST",
              params: {
                  idUsuario: idUsuario
                },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        },
        cierraSesionHistorial: function(idUsuario){
          return $http({
              url: loginUrl + 'cierraHistorial/',
              method: "POST",
              params: {
                  idUsuario: idUsuario
                },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        },
        ValidaSesionActiva: function(idUsuario, idSesion){
          return $http({
              url: loginUrl + 'validaSesionActiva/',
              method: "GET",
              params: {
                  idUsuario: idUsuario,
                  idSesion: idSesion
                },
              headers: {
              'Content-Type': 'application/json'
              }
          });
        },
        getTiempoInactividad: function(){
          return $http({
              url: loginUrl + 'tiempoInactividad/',
              method: "GET",
              params: {},
              headers: {
              'Content-Type': 'application/json'
              }
          });
        }
    };
});
