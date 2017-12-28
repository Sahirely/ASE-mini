var nuevoUserUrl = global_settings.urlCORS + '/api/nuevoUsuario/';

registrationModule.factory('nuevoUsuarioRepository', function ($http) {
    return {
        getUsuarios: function(username) {
             return $http({
                 url: nuevoUserUrl + 'Usuarios/',
                 method: "GET",
                 params: {
                     username: username
                 },
                 headers: {
                     'Content-Type': 'application/json'
                 }
             });
         },
         getCatalogoRolesUsuario: function(){
           return $http({
               url: nuevoUserUrl + 'CatalogoRolesUsuario/',
               method: "GET",
               params: { },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         }
    };
});
