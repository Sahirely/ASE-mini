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
    getX: function (yyy) {
      return $http({
        url: ordenUrl + 'gastounidad/',
        method: 'GET',
        params: {
          yyy: yyy
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

  }
})
