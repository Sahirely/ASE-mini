registrationModule.factory('userFactory', function(localStorageService) {
  return{
    getUserData: function(){
      return (localStorageService.get('userData'));
    },
    saveUserData: function(id, nombreCompleto, Correo, operaciones){
      var userData= {
        idUsuario: id,
        nombreCompleto: nombreCompleto,
        Correo: Correo,
        Operaciones: operaciones,
        contratoOperacionSeleccionada: 0,
        idOperacion: 0,
        nombreOperacion: '',
        idRol: 0,
        Rol: ''
      };

      localStorageService.set('userData', userData);
      return (localStorageService.get('userData'));
    },
    updateSelectedOperation: function(idContratoOperacion, idOp, nomOp, idRol, Rol){
      var userData = localStorageService.get('userData');
      userData.contratoOperacionSeleccionada = idContratoOperacion;
      userData.idOperacion = idOp;
      userData.nombreOperacion = nomOp;
      userData.idRol = idRol;
      userData.Rol = Rol;

      localStorageService.set('userData', userData);
      return (localStorageService.get('userData'));
    },
    logOut: function(){
      localStorageService.clearAll();
    }
  }
});
