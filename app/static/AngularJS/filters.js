registrationModule.filter('password', function(){
    return function (input){
          var filteredInput = '';

          for(var i = 0; i < input.length; i++){
              filteredInput += '*';
          }

          return filteredInput;
    }
});

registrationModule.filter('Estatus', function(){
    return function (items, idEstatus){
        var filtered = [];

        if (idEstatus === null || idEstatus === undefined || idEstatus === '0' || idEstatus === '' || idEstatus === 0){
            return items;
        } else {
            angular.forEach(items, function(item){
                if(item.idEstatusCotizacion == idEstatus){
                  filtered.push(item);
                }
            });

            return filtered;
        }
    }
});

registrationModule.filter('EstatusTrabajo', function(){
    return function (items, idEstatus){
        var filtered = [];

        if (idEstatus === null || idEstatus === undefined || idEstatus === '55' || idEstatus === '67' || idEstatus === '' || idEstatus === 55 || idEstatus === 67){
            return items;
        } else {
            if (idEstatus == '5' || idEstatus == '0'){
                if (idEstatus == '5'){
                    angular.forEach(items, function(item){
                        if(item.idEstatusOrden == 5 && item.idGarantia == 0){
                          filtered.push(item);
                        }
                    });
                } else if (idEstatus == '0'){
                    angular.forEach(items, function(item){
                        if(item.idEstatusOrden == 5 && item.idGarantia == 1){
                          filtered.push(item);
                        }
                    });
                }
            } else if (idEstatus == '6' || idEstatus == '7') {
                angular.forEach(items, function(item){
                    if(item.idEstatusOrden == idEstatus){
                      filtered.push(item);
                    }
                });
            }

            return filtered;
        }
    }
});

registrationModule.filter('Zona', function(){
    return function (items, idZona){
        var filtered = [];

        if (idZona === null || idZona === undefined || idZona === '0' || idZona === '' || idZona === 0){
            return items;
        } else {
            angular.forEach(items, function(item){
                if(item.idZona == idZona){
                  filtered.push(item);
                }
            });

            return filtered;
        }
    }
});

registrationModule.filter('Ejecutivo', function(){
    return function (items, idEjecutivo){
        var filtered = [];

        if (idEjecutivo === 0 || idEjecutivo === undefined || idEjecutivo === null || idEjecutivo === '0' || idEjecutivo === ''){
            return items;
        } else {
            angular.forEach(items, function(item){
                if(item.idUsuario == idEjecutivo){
                  filtered.push(item);
                }
            });

            return filtered;
        }
    }
});

registrationModule.filter('dateRange', function() {
        return function( items, fromDate, toDate ) {
            var filtered = [];

            if (fromDate === null || fromDate === undefined || fromDate === '' || toDate === null || toDate === undefined || toDate === ''){
                return items;
            }else {
                var from_date = Date.parse(fromDate);
                var to_date = Date.parse(toDate);
                angular.forEach(items, function(item) {
                    var date = Date.parse(item.fechaCreacionOden.toString());
                    if(date > from_date && date < to_date) {
                        filtered.push(item);
                    }
                });
                return filtered;
            }
        };
    });
