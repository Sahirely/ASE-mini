registrationModule.factory('userFactory', function($window, loginRepository, alertFactory) {
  return{
    getUserData: function(){
      var json = [];
      $.each($window.sessionStorage, function(i, v){
        json.push(angular.fromJson(v));
      });
      return json[0];
    },
    saveUserData: function(userData){
      $window.sessionStorage.setItem(userData,JSON.stringify(userData));
      return (this.getUserData());
    },
    updateSelectedOperation: function(data){
      var userData = this.getUserData();

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

      $window.sessionStorage.setItem(userData,JSON.stringify(userData));
      return (this.getUserData());
    },
    logOut: function(){
      var userData = this.getUserData();
      loginRepository.cierraSesionHistorial(userData.idUsuario).then(function(){
      });
      $window.sessionStorage.clear();
      location.href = '/';
    },
    ValidaSesion: function(){
      var userData = this.getUserData();

      if (userData == null || userData == undefined){
        location.href = '/';
      }else{
        var id = userData.idUsuario;
        loginRepository.ValidaSesionActiva(id).then(function(result){
            if (result.data[0].HasSession == 'False'){
                location.href = '/';
            }
        });
      }
    }
  }
});
