registrationModule.factory('userFactory', function() {
  userData= { idUsuario: 2, contratoOperacion: 2};

  return{
    getUserData: function(){
      return (userData);
    }
  }
});
