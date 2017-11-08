var cobrarUrl = global_settings.urlCORS + '/api/cobrar/'

registrationModule.factory('ordenPorCobrarRepository', function ($http) {
  return {
    get: function (method, params) {
      return $http({
        url: cobrarUrl + method,
        method: 'GET',
        params: params,
        timeout: 1000000
      })
    },
    post: function (method, params) {
      return $http({
        url: cobrarUrl + method,
        method: 'POST',
        data: params
      })
    },
    put: function (method, params) {
      return $http({
        url: cobrarUrl + method,
        method: 'PUT',
        data: params
      })
    },
    putTrabajoCobrado: function (idTrabajo, idDatosCopade, idContratoOperacion, isProduction) {
      var objTrabajo = {
          idTrabajo: idTrabajo,
          idDatosCopade: idDatosCopade,
          idContratoOperacion: idContratoOperacion,
          isProduction: isProduction
      };

      return $http({
          url: cobrarUrl + 'trabajocobrado',
          method: "POST",
          data: objTrabajo,
          headers: {
              'Content-Type': 'application/json'
          }
      });
    },
    putMueveCopade: function (idTrabajo, idDatosCopade) {     
      var objArchivo = {
          idTrabajo: idTrabajo,
          idDatosCopade: idDatosCopade
      };      
      return $http({        
          url: cobrarUrl + 'mueveCopade',
                  method: "POST",
                  data: objArchivo,
                  headers: {          
              'Content-Type': 'application/json'        
          }      
      });    
  },
  putFacturaAbonada: function (ordenGlobal) {
    var objTrabajo = {
        ordenGlobal: ordenGlobal
    };

    return $http({
        url: cobrarUrl + 'facturaAbonada',
        method: "POST",
        data: objTrabajo,
        headers: {
            'Content-Type': 'application/json'
        }
    });
},
  getTrbajoCobrado: function (parametros) {
    return $http({
        url: cobrarUrl + 'trbajoCobrado',
        method: "GET",
        params: parametros,
        headers: {
            'Content-Type': 'application/json'
        }
    });
},
postSubirCopade: function() {
  var form = document.forms.namedItem("frm_copade");
  var oData = new FormData(form);
  return $http({
      url: cobrarUrl + 'subirCopade/',
      method: "POST",
      data: oData,
      headers: {
          'Content-Type': undefined
      }
  });
},
    delete: function (method, params) {
      return $http({
        url: cobrarUrl + method,
        method: 'DELETE',
        data: params
      })
    },
    putGeneraDatosCopade: function (archivos, fechaRecepcionCopade, idContratoOperacion) {
            var objArchivos = {
                archivos: archivos,
                fechaRecepcionCopade: fechaRecepcionCopade,
                idContratoOperacion: idContratoOperacion
            };

            return $http({
                url: cobrarUrl + 'generaDatosCopade',
                method: "POST",
                data: objArchivos,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        putInsertaDatosCopade: function (copades) {     
            var objCopades = copades;

                  
            return $http({        
                url: cobrarUrl + 'insertaDatosCopade',
                        method: "POST",
                        data: objCopades,
                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            });    
        },
        putRenombraCopade: function (nombre, idCopade) {
            var objRenombre = {
                nombreCopade: nombre,
                idCopade: idCopade
            };

            return $http({        
                url: cobrarUrl + 'cambiaNombreCopade',
                        method: "POST",
                        data: objRenombre,
                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            }); 
        }
  }
})
