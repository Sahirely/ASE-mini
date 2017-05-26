var detalleUrl = global_settings.urlCORS + '/api/detalle/';

registrationModule.factory('detalleRepository', function ($http) {
    return {
        getNumCita: function (idTar,idZona,idUsuario) {
            return $http({
                url: detalleUrl + 'sumatoriaCitas/',
                method: "GET",
                params: {
                    idTar:idTar,
                    idZona: idZona,
                    idUsuario:idUsuario

                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        insNota: function (nota,idOrden,idUsuario) {
            return $http({
                url: detalleUrl + 'insertaNota/',
                method: "GET",
                params: {
                    nota: nota,
                    idOrden: idOrden,
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getHistoricoOrden: function(idOrden){
          return $http({
              url: detalleUrl + 'obtenerHistoricoOrden/',
              method: "GET",
              params: {
                  idOrden: idOrden
              },
              headers: {
                  'Content-Type': 'application/json'
              }
          });
        },
        getIdCotizacionesPorOrden: function(idOrden){
          return $http({
              url: detalleUrl + 'obtenerIdCotzPorOrden/',
              method: "GET",
              params: {
                  idOrden: idOrden
              },
              headers: {
                  'Content-Type': 'application/json'
              }
          });
        },
        getHistoricoCotizacion: function(idCotizacion){
          return $http({
              url: detalleUrl + 'obtenerHistoricoCotizacion/',
              method: "GET",
              params: {
                  idCotizacion: idCotizacion
              },
              headers: {
                  'Content-Type': 'application/json'
              }
          });
        }
    };
});
