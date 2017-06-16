
var ordenUrl = global_settings.urlCORS + '/api/OrdenServicio/';

registrationModule.factory('provisionesRepository', function ($http) {
    return {
		getAprobacionProvision: function (idContratoOperacion) {
			
			   return $http({
                url: ordenUrl + 'getaprobacionprovision/',
                method: "GET",
                params: {
                    idContratoOperacion: idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
        },

        putAprobacionProvision: function (idOrden,idUsuario) {
                       
            return $http({        
                url: ordenUrl + 'aprobacionprovision',
                        method: "POST",
                         data: {
                           idOrden: idOrden,
                           idUsuario: idUsuario
                        },

                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            });    
        }
    };
});

