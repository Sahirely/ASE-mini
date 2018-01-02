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
         },
         getOperacionesUsuario: function(){
           return $http({
               url: nuevoUserUrl + 'OperacionesUsuario/',
               method: "GET",
               params: { },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         },
         getOperacionesUsuarioConfiguradas: function(idUsuario){
           return $http({
               url: nuevoUserUrl + 'OperacionesUsuarioConfiguradas/',
               method: "GET",
               params: { idUsuario: idUsuario },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         },
         postUpdInsUsuario: function(idUsuario, nombreUsuario, contrasenia, idCatalogoTipoUsuario, nombreCompleto, correoElectronico, telefonoUsuario, extensionUsuario, empresa){
           return $http({
               url: nuevoUserUrl + 'UpdInsUsuario/',
               method: "POST",
               params: {
                   idUsuario: idUsuario,
                   nombreUsuario: nombreUsuario,
                   contrasenia: contrasenia,
                   idCatalogoTipoUsuario: idCatalogoTipoUsuario,
                   nombreCompleto: nombreCompleto,
                   correoElectronico: correoElectronico,
                   telefonoUsuario: telefonoUsuario,
                   extensionUsuario: extensionUsuario,
                   empresa: empresa
               },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         },
         postInsContratoOperacionUsuario: function(idContratoOperacion, idUsuario){
           return $http({
               url: nuevoUserUrl + 'InsContratoOperacionUsuario/',
               method: "POST",
               params: {
                  idContratoOperacion: idContratoOperacion,
                  idUsuario: idUsuario
               },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         },
         getPermisos: function(idContratoOperacionUsuario, idTipoConsulta){
           return $http({
               url: nuevoUserUrl + 'permisos/',
               method: "GET",
               params: {
                  idContratoOperacionUsuario: idContratoOperacionUsuario,
                  idTipoConsulta: idTipoConsulta
               },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         },
         delPermisos: function(idContratoOperacionUsuario, tipoDelete){
           return $http({
               url: nuevoUserUrl + 'delPermisos/',
               method: "GET",
               params: {
                  idContratoOperacionUsuario: idContratoOperacionUsuario,
                  tipoDelete: tipoDelete
               },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         },
         postInsContratoOperacionUsuarioZona: function(idContratoOperacionUsuario, idZona){
           return $http({
               url: nuevoUserUrl + 'InsContratoOperacionUsuarioZona/',
               method: "POST",
               params: {
                  idContratoOperacionUsuario: idContratoOperacionUsuario,
                  idZona: idZona
               },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         },
         postInsContratoOperacionUsuarioProveedor: function(idContratoOperacionUsuario, idProveedor){
           return $http({
               url: nuevoUserUrl + 'InsContratoOperacionUsuarioProveedor/',
               method: "POST",
               params: {
                  idContratoOperacionUsuario: idContratoOperacionUsuario,
                  idProveedor: idProveedor
               },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         },
         postInsContratoOperacionUsuarioNivel: function(idContratoOperacionUsuario, nivel){
           return $http({
               url: nuevoUserUrl + 'InsContratoOperacionUsuarioNivel/',
               method: "POST",
               params: {
                  idContratoOperacionUsuario: idContratoOperacionUsuario,
                  nivel: nivel
               },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         },
         postInsContratoOperacionUsuarioVersion: function(idContratoOperacionUsuario, idVersion){
           return $http({
               url: nuevoUserUrl + 'InsContratoOperacionUsuarioVersion/',
               method: "POST",
               params: {
                  idContratoOperacionUsuario: idContratoOperacionUsuario,
                  idVersion: idVersion
               },
               headers: {
                   'Content-Type': 'application/json'
               }
           });
         }
    };
});
