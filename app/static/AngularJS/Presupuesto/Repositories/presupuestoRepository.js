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
        hasCompletePayment: function(idpresupuestoEspecial) {
            return $http({
                url: presupuestoUrl + 'hasCompletePayment',
                method: "GET",
                params: {idpresupuestoEspecial:idpresupuestoEspecial},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTraspasos: function(idPresupuestoDestino) {
            return $http({
                url: presupuestoUrl + 'traspasos',
                method: "GET",
                params: {idPresupuestoDestino:idPresupuestoDestino},
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        insOrdenPresupuestoEspecial: function (idOrden, idPresupuesto, idUsuario){
            return $http({
                url: presupuestoUrl + 'insOrdenPresupuestoEspecial',
                method: "GET",
                params: {
                    idOrden: idOrden,
                    idPresupuesto: idPresupuesto,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenesByCT: function(idCentroTrabajo, idContratoOperacion){
            return $http({
                url: presupuestoUrl + 'ordenesByCT',
                method: "GET",
                params: {
                  idCentroTrabajo: idCentroTrabajo,
                  idContratoOperacion: idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getOrdenesByPE: function(idPresupuesto, idContratoOperacion){
            return $http({
                url: presupuestoUrl + 'ordenesByPresupuestoEspecial',
                method: "GET",
                params: {
                  idPresupuesto: idPresupuesto,
                  idContratoOperacion: idContratoOperacion
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        putNuevoPresupuesto: function(presupuesto, folioPresupuesto, fechaInicioPresupuesto, fechaFinalPresupuesto, idCentroTrabajo, idUsuario, solpe, isEspecial) {        
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
                    solpe: solpe,
                    isEspecial: isEspecial
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
