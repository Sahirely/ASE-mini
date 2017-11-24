registrationModule.factory('userFactory', function($window, localStorageService, loginRepository, alertFactory) {
  return{
    getUserData: function(){
      var json = [];
      $.each($window.sessionStorage, function(i, v){
        json.push(angular.fromJson(v));
      });
      return json[0];
    },
    saveUserData: function(userData){
      localStorageService.clearAll();
      $window.sessionStorage.setItem(userData,JSON.stringify(userData));
      return (this.getUserData());
    },
    setActiveSesion: function(sesion){
      var userData = this.getUserData();
      userData.sesion = sesion;
      $window.sessionStorage.setItem(userData,JSON.stringify(userData));
      return (this.getUserData());
    },
    updateSelectedOperation: function(data){
      var userData = this.getUserData();

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
      userData.verificacionVehicular = ObjetoOperacionSelected.verificacionVehicular;
      userData.comentarioCotizacion = ObjetoOperacionSelected.comentarioCotizacion;
      userData.Modulos = ObjetoOperacionSelected.modulos;
      userData.idRol = ObjetoOperacionSelected.idRol;
      userData.Rol = ObjetoOperacionSelected.nombreRol;
      userData.nombreCompleto = ObjetoOperacionSelected.nombreCompleto;
      userData.versionSystem = ObjetoOperacionSelected.versionSystem;
      userData.formaPago = ObjetoOperacionSelected.formaPago;
      userData.idLicitacion = ObjetoOperacionSelected.idLicitacion;
      userData.nombreLicitacion = ObjetoOperacionSelected.nombreLicitacion;
      userData.idContrato = ObjetoOperacionSelected.idContrato;
      userData.razonSocial = ObjetoOperacionSelected.razonSocial;
      userData.fechaInicio = ObjetoOperacionSelected.fechaInicio;
      userData.fechafin = ObjetoOperacionSelected.fechafin;
      userData.validacionPorToken = ObjetoOperacionSelected.validacionPorToken;

      localStorageService.clearAll();
      $window.sessionStorage.setItem(userData,JSON.stringify(userData));
      return (this.getUserData());
    },
    logOut: function(){
      var userData = this.getUserData();
      loginRepository.cierraSesionHistorial(userData.idUsuario).then(function(){
      });
      $window.sessionStorage.clear();
      localStorageService.clearAll();
      location.href = '/';
    },
    ValidaSesion: function(){
      var userData = this.getUserData();

      if (userData == null || userData == undefined){
        location.href = '/';
      }else{
        var id = userData.idUsuario;
        var sesion = userData.sesion;
        loginRepository.ValidaSesionActiva(id, sesion).then(function(result){
            if (result.data[0].HasSession == 'False'){
                location.href = '/';
            }
        });
      }
    },
    updateSelectedVersion: function(data, version){
      var userData = this.getUserData();

      /*for (var i = 0; i < userData.Operaciones.length; i++) {
        if(userData.Operaciones[i].idContratoOperacion == data){
          ObjetoOperacionSelected = userData.Operaciones[i];
        }
      }*/

      /*userData.contratoOperacionSeleccionada = ObjetoOperacionSelected.idContratoOperacion;
      userData.idOperacion = ObjetoOperacionSelected.idOperacion;
      userData.nombreOperacion = ObjetoOperacionSelected.nombreOperacion;
      userData.manejoUtilidad = ObjetoOperacionSelected.manejoUtilidad;
      userData.porcentajeUtilidad = ObjetoOperacionSelected.porcentajeUtilidad;
      userData.presupuesto = ObjetoOperacionSelected.presupuesto;
      userData.geolocalizacion = ObjetoOperacionSelected.geolocalizacion;
      userData.tiempoAsignado = ObjetoOperacionSelected.tiempoAsignado;
      userData.verificacionVehicular = ObjetoOperacionSelected.verificacionVehicular;
      userData.Modulos = ObjetoOperacionSelected.modulos;
      userData.idRol = ObjetoOperacionSelected.idRol;
      userData.Rol = ObjetoOperacionSelected.nombreRol;
      userData.nombreCompleto = ObjetoOperacionSelected.nombreCompleto;*/
      userData.versionSystem = version;
      /*userData.formaPago = ObjetoOperacionSelected.formaPago;
      userData.idLicitacion = ObjetoOperacionSelected.idLicitacion;
      userData.nombreLicitacion = ObjetoOperacionSelected.nombreLicitacion;
      userData.idContrato = ObjetoOperacionSelected.idContrato;
      userData.razonSocial = ObjetoOperacionSelected.razonSocial;
      userData.fechaInicio = ObjetoOperacionSelected.fechaInicio;
      userData.fechafin = ObjetoOperacionSelected.fechafin;*/

      //localStorageService.clearAll();
      $window.sessionStorage.setItem(userData,JSON.stringify(userData));
      return (this.getUserData());
    }
  }
});
