var analisisFlotillaUrl = global_settings.urlCORS + '/api/analisisflotilla/'

registrationModule.factory('analisisFlotillaRepository', function ($http) {
  return {
    getGastoUnidad: function (idContratoOperacion) {
      return $http({
        url: analisisFlotillaUrl + 'gastounidad/',
        method: 'GET',
        params: {
          idContratoOperacion: idContratoOperacion
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getDocumentosUnidad: function (idContratoOperacion) {
      return $http({
        url: analisisFlotillaUrl + 'documentosunidad/',
        method: 'GET',
        params: {
          idContratoOperacion: idContratoOperacion
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getIngresoAntiguedad: function (idContratoOperacion) {
      return $http({
        url: analisisFlotillaUrl + 'ingresoantiguedad/',
        method: 'GET',
        params: {
          idContratoOperacion: idContratoOperacion
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getIngresoAntiguedadGrafica: function (idContratoOperacion) {
      return $http({
        url: analisisFlotillaUrl + 'ingresoantiguedadgrafica/',
        method: 'GET',
        params: {
          idContratoOperacion: idContratoOperacion
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    getInversion: function (idContratoOperacion) {
      return $http({
        url: analisisFlotillaUrl + 'inversion/',
        method: 'GET',
        params: { 
          idContratoOperacion: idContratoOperacion
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }
})
