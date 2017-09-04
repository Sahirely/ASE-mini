var analisisFlotillaUrl = global_settings.urlCORS + '/api/analisisflotilla/'

registrationModule.factory('analisisFlotillaRepository', function ($http) {
  return {
    getGastoUnidad: function () {
      return $http({
        url: analisisFlotillaUrl + 'gastounidad/',
        method: 'GET',
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getDocumentosUnidad: function () {
      return $http({
        url: analisisFlotillaUrl + 'documentosunidad/',
        method: 'GET',
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getIngresoAntiguedad: function () {
      return $http({
        url: analisisFlotillaUrl + 'ingresoantiguedad/',
        method: 'GET',
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getIngresoAntiguedadGrafica: function () {
      return $http({
        url: analisisFlotillaUrl + 'ingresoantiguedadgrafica/',
        method: 'GET',
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getInversion: function () {
      return $http({
        url: analisisFlotillaUrl + 'inversion/',
        method: 'GET',
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
})
