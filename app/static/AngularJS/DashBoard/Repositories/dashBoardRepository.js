var tableroUrl = global_settings.urlCORS + '/api/dashboard/';

registrationModule.factory('dashBoardRepository', function ($http) {
    return {
        // getNivelZona: function( idContratoOperacion ){
        // console.log( "URL", searchUrl + 'nivelZona' );
        //   return $http({
        //       url: searchUrl + 'nivelZona',
        //       method: "GET",
        //       params: {
        //           idContratoOperacion: idContratoOperacion
        //       },
        //       headers:{ 'Content-Type': 'application/json' }
        //   });
        // },
        // getZonas: function (idContratoOperacion, idNivel) {
        //     return $http({
        //         url: searchUrl + 'zonas/',
        //         method: "GET",
        //         params: {
        //             idContratoOperacion: idContratoOperacion,
        //             idNivel: idNivel
        //         },
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        // },
        getTotalCitas: function ( idOperacion, idZona, idUsuario ) {
            return $http({
                url: tableroUrl + 'sumatoriaCitas/',
                method: "GET",
                params: {
                    idOperacion: idOperacion,
                    idZona: idZona,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTotalCotizaciones: function ( idOperacion, idZona, idUsuario ) {
            return $http({
                url: tableroUrl + 'sumatoriaCotizaciones/',
                method: "GET",
                params: {
                    idOperacion: idOperacion,
                    idZona: idZona,
                    idUsuario: idUsuario
                   },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTotalOrdenes: function ( idOperacion, idZona, idUsuario ) {
            return $http({
                url: tableroUrl + 'sumatoriaOrdenes',
                method: "GET",
                params: {
                    idOperacion: idOperacion,
                    idZona: idZona,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTotalProceso: function ( idOperacion, idZona, idUsuario ) {
            return $http({
                url: tableroUrl + 'sumatoriaProceso',
                method: "GET",
                params: {
                    idOperacion: idOperacion,
                    idZona: idZona,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getTotalOrdenesPorCobrar: function ( idOperacion, idZona, idUsuario ) {
            return $http({
                url: tableroUrl + 'sumatoriaOrdenesPorCobrar',
                method: "GET",
                params: {
                    idOperacion: idOperacion,
                    idZona: idZona,
                    idUsuario: idUsuario
                    
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        // getZonas: function (idUsuario) {
        //     return $http({
        //         url: tableroUrl + 'zonas/',
        //         method: "GET",
        //         params: {
        //             idUsuario: idUsuario
        //         },
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        // },
        // getTars: function (idZona, idUsuario) {
        //     return $http({
        //         url: tableroUrl + 'tars',
        //         method: "GET",
        //         params: {
        //             idZona: idZona,
        //             idUsuario: idUsuario
        //         },
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        // },
        
        
    };
});