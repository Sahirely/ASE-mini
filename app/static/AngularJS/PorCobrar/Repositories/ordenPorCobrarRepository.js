var cobrarUrl = global_settings.urlCORS + '/api/cobrar/'

registrationModule.factory('ordenPorCobrarRepository', function ($http) {
  return {
    get: function (method, params) {
      return $http({
        url: cobrarUrl + method,
        method: 'GET',
        params: params
      })
    },
    post: function (method, params) {
      return $http({
        url: cobrarUrl + method,
        method: 'POST',
        data: params
      })
    },
    put: function (method, params) {
      return $http({
        url: cobrarUrl + method,
        method: 'PUT',
        data: params
      })
    },
    delete: function (method, params) {
      return $http({
        url: cobrarUrl + method,
        method: 'DELETE',
        data: params
      })
    }
  }
})
