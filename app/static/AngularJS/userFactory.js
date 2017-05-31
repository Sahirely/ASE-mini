registrationModule.factory('userFactory', function() {
  userData= {
    idUsuario: 0,
    nombreCompleto: '',
    Correo: '',
    Operaciones: [],
    contratoOperacionSeleccionada: 0,
    idRol: 0,
    Rol: ''
  };

  return{
    getUserData: function(){
      return (userData);
    },
    saveUserData:function(id, nombreCompleto, Correo, operaciones){
      userData= {
        idUsuario: id,
        nombreCompleto: nombreCompleto,
        Correo: Correo,
        Operaciones: operaciones,
        contratoOperacionSeleccionada: 0,
        idRol: 0,
        Rol: ''
      }
      return (userData);
    },
    updateSelectedOperation:function(idContratoOperacion, idRol, Rol){
      userData.contratoOperacionSeleccionada = idContratoOperacion;
      userData.idRol = idRol;
      userData.Rol = Rol;
      return (userData);
    }
  }
});
