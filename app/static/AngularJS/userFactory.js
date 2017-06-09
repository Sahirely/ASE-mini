registrationModule.factory('userFactory', function(localStorageService, loginRepository, alertFactory) {
  return{
    getUserData: function(){
      return (localStorageService.get('userData'));
    },
    saveUserData: function(userData){
      localStorageService.set('userData',userData);
      return (localStorageService.get('userData'));
    },
    updateSelectedOperation: function(data){
      var userData = localStorageService.get('userData');

      loginRepository.iniciaSesionHistorial(userData.idUsuario).then(function (result){
      });

      for (var i = 0; i < userData.Operaciones.length; i++) {
        if(userData.Operaciones[i].idContratoOperacion == data){
          ObjetoOperacionSelected = userData.Operaciones[i];
        }
      }

      userData.contratoOperacionSeleccionada = ObjetoOperacionSelected.idContratoOperacion;
      userData.idOperacion = ObjetoOperacionSelected.idOperacion;
      userData.nombreOperacion = ObjetoOperacionSelected.nombreOperacion;
      userData.manejoUtilidad = ObjetoOperacionSelected.manejoUtilidad;
      userData.porcentajeUtilidad = ObjetoOperacionSelected.porcentajeUtilidad;
      userData.presupuesto = ObjetoOperacionSelected.presupuesto;
      userData.geolocalizacion = ObjetoOperacionSelected.geolocalizacion;
      userData.tiempoAsignado = ObjetoOperacionSelected.tiempoAsignado;
      userData.Modulos = ObjetoOperacionSelected.modulos;
      userData.idRol = ObjetoOperacionSelected.idRol;
      userData.Rol = ObjetoOperacionSelected.nombreRol;
      userData.formaPago = ObjetoOperacionSelected.formaPago;
      userData.idLicitacion = ObjetoOperacionSelected.idLicitacion;
      userData.nombreLicitacion = ObjetoOperacionSelected.nombreLicitacion;
      userData.idContrato = ObjetoOperacionSelected.idContrato;
      userData.razonSocial = ObjetoOperacionSelected.razonSocial;
      userData.fechaInicio = ObjetoOperacionSelected.fechaInicio;
      userData.fechafin = ObjetoOperacionSelected.fechafin;

      localStorageService.set('userData', userData);
      return (localStorageService.get('userData'));
    },
    logOut: function(){
      var userData = localStorageService.get('userData');
      loginRepository.cierraSesionHistorial(userData.idUsuario).then(function(){
      });
      localStorageService.clearAll();
    },
    ValidaSesion: function(){
      var userData = localStorageService.get('userData');

      if (userData == null || userData == undefined){
        location.href = '/';
      }
    }
  }
});
