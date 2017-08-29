var presupuestoUrl = global_settings.urlCORS + '/api/presupuesto/';

registrationModule.factory('presupuestoRepository', function($http) {
    return {
        getCentroTrabajo: function(idOperacion) {
            return $http({
                url: presupuestoUrl + 'centroTrabajo',
                method: "GET",
                params: {
                    idOperacion: idOperacion
                },
            });
        },
        getPresupuesto: function(idCentroTrabajo, idOperacion) {
            return $http({
                url: presupuestoUrl + 'presupuesto',
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
        putNuevoPresupuesto: function(presupuesto, folioPresupuesto, fechaInicioPresupuesto, fechaFinalPresupuesto, idCentroTrabajo, idUsuario, solpe) {        
            return $http({        
                url: presupuestoUrl + 'nuevoPresupuesto',
                        method: "POST",
                        data: {
                    presupuesto: presupuesto,
                    folioPresupuesto: folioPresupuesto,
                    fechaInicioPresupuesto: fechaInicioPresupuesto,
                    fechaFinalPresupuesto: fechaFinalPresupuesto,
                    idCentroTrabajo: idCentroTrabajo,
                    idUsuario: idUsuario,
                    solpe: solpe
                },

                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            });    
        },
        insTraspasoPresupuesto: function(data) {        
            return $http({        
                url: presupuestoUrl + 'insTraspasoPresupuesto',
                        method: "POST",
                        data: data,
                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            });    
        },

        putEstatusPresupuestoCDT: function(idPresupuesto, idCentroTrabajo) {        
            return $http({        
                url: presupuestoUrl + 'estatusPresupuestoCDT',
                        method: "POST",
                        data: {
                    idPresupuesto: idPresupuesto,
                    idCentroTrabajo: idCentroTrabajo
                },

                        headers: {          
                    'Content-Type': 'application/json'        
                }      
            });    
        },
        getHistorial: function(idPresupuesto) {
            return $http({
                url: presupuestoUrl + 'presupuestoHistoria',
                method: "GET",
                params: {
                    idPresupuesto: idPresupuesto
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getDetalle: function(idCentroTrabajo) {
            return $http({
                url: presupuestoUrl + 'presupuestoDetalle',
                method: "GET",
                params: {
                    idCentroTrabajo: idCentroTrabajo
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };
});