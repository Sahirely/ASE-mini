
var ordenUrl = global_settings.urlCORS + '/api/OrdenServicio/';

registrationModule.factory('utilidadesRepository', function ($http) {
    return {
		getValidacionAprobacion: function (idOrden) {
			
			   return $http({
                url: ordenUrl + 'validacionAprobacion/',
                method: "GET",
                params: {
                    idOrden: idOrden
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
        },

        putUtilidad: function (idOrden,idUsuario, margenAprobacion) {
                       
            return $http({        
                url: ordenUrl + 'utilidad',
                        method: "POST",
                         data: {
                           idOrden: idOrden,
                           idUsuario: idUsuario,
                           margenAprobacion: margenAprobacion
                        },

                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            });    
        }
    };
});

