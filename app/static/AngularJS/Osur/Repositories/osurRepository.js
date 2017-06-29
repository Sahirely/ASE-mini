var osurUrl = global_settings.urlCORS + '/api/osur/';

registrationModule.factory('osurRepository', function ($http) {
    return {
            getCentroTrabajo: function (idOperacion) {
                return $http({
                    url: osurUrl + 'centroTrabajo',
                    method: "GET",
                    params: {
                        idOperacion: idOperacion
                    },
                });
            },
            getPresupuesto: function (idCentroTrabajo, idOperacion) {
                return $http({
                    url: osurUrl + 'presupuesto',
                    method: "GET",
                    params: {
                        idCentroTrabajo: idCentroTrabajo,
                        idOperacion: idOperacion
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            },
            putNuevoPresupuesto: function (presupuesto,folioPresupuesto,fechaInicioPresupuesto,fechaFinalPresupuesto,idCentroTrabajo,idUsuario) {             
                return $http({        
                    url: osurUrl + 'nuevoPresupuesto',
                            method: "POST",
                             data: {
                               presupuesto: presupuesto,
                               folioPresupuesto: folioPresupuesto,
                               fechaInicioPresupuesto: fechaInicioPresupuesto,
                               fechaFinalPresupuesto: fechaFinalPresupuesto,
                               idCentroTrabajo: idCentroTrabajo,
                               idUsuario: idUsuario
                            },

                            headers: {          
                        'Content-Type': 'application/json'        
                    }      
                });    
            },
            putEstatusPresupuestoCDT: function (idPresupuesto, idCentroTrabajo) {            
                return $http({        
                    url: osurUrl + 'estatusPresupuestoCDT',
                            method: "POST",
                             data: {
                               idPresupuesto: idPresupuesto,
                               idCentroTrabajo: idCentroTrabajo
                            },

                            headers: {          
                        'Content-Type': 'application/json'        
                    }      
                });    
            }
        };
});
