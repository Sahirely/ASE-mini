registrationModule.controller('consultaCitasController', function($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, consultaCitasRepository, ordenServicioRepository, cotizacionRepository, trabajoRepository, uploadRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
   $scope.citas = [];
    
    $scope.init = function() {};

    //init de la pantalla tallerCita
    $scope.initTallerCita = function() {
        $scope.getTotalOrdenes();
        $('#calendar .input-group.date').datepicker({
            todayBtn: "linked",
            keyboardNavigation: true,
            forceParse: false,
            calendarWeeks: true,
            autoclose: true,
            todayHighlight: true
        });
    };
 
    $scope.seleccionarTodo = function(obj){
        console.log(obj)
    }
    //combina la fecha y hora en una cadena
    var combineDateAndTime = function(date, time) {
        timeString = time.getHours() + ':' + time.getMinutes() + ':00';
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // Jan is 0, dec is 11
        var day = date.getDate();
        var dateString = '' + year + '-' + month + '-' + day;
        var combined = dateString + ' ' + timeString;
        return combined;
    };


    $scope.getTotalOrdenes = function(){
         $('.dataTableOrdenes').DataTable().destroy();
        $scope.promise = consultaCitasRepository.getTotalOrdenes().then(function (result) {
            if (result.data.length > 0) {
                $scope.totalOrdenes = result.data;
                 globalFactory.waitDrawDocument("dataTableOrdenes", "Ordenes");
            }
        }, function (error) {
            alertFactory.error('No se puenen obtener las órdenes');
        });
    }

    //despliega el div de las tablas
    $scope.slideDown = function() {
        $("#borderTop").slideDown(2000);
    };
    //contrae el div de las tablas
    $scope.slideUp = function() {
        $("#borderTop").slideUp(3000);
    };


});
