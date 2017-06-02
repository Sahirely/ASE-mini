registrationModule.controller('consultaCitasController', function($scope, $route, $modal, $rootScope, cotizacionConsultaRepository,localStorageService, alertFactory, globalFactory, consultaCitasRepository, ordenServicioRepository, cotizacionRepository, trabajoRepository, uploadRepository) {
    //*****************************************************************************************************************************//
    // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
    //*****************************************************************************************************************************//
   $scope.citas = [];
    
    var Zona = 0//$scope.zonaSelected == '' || $scope.zonaSelected == undefined ? null : $scope.zonaSelected;
      var idEjecutivo = 0//$scope.ejecutivoSelected == '' || $scope.ejecutivoSelected == undefined ? null : $scope.ejecutivoSelected;
      var fechaMes = ''//this.obtieneFechaMes() == '' ? null : this.obtieneFechaMes();
      var rInicio = ''//$scope.fechaInicio == '' || $scope.fechaInicio == undefined ? null : $scope.fechaInicio;
      var rFin = ''//$scope.fechaFin == '' || $scope.fechaFin == undefined ? null : $scope.fechaFin;
      var fecha = ''//$scope.fecha == '' || $scope.fecha == undefined ? null : $scope.fecha;
      var numeroOrden = ''//$scope.numeroTrabajo == '' || $scope.numeroTrabajo == undefined ? null : $scope.numeroTrabajo;
      var porOrden=0
      
    $scope.idContratoOperacion = 2
    var tipoConsulta = 1

    $scope.init = function() {};
    
    //init de la pantalla tallerCita
    $scope.initTallerCita = function() {
        $scope.getTotalOrdenes($scope.idContratoOperacion , tipoConsulta);
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
         cotizacionConsultaRepository.ObtenerOrdenesTipoConsulta( $scope.idContratoOperacion, Zona,0, idEjecutivo, fechaMes, rInicio, rFin, fecha, numeroOrden, tipoConsulta).then(function (result){
                console.log(result)
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

    $scope.seleccionarOrden = function(obj){
         location.href = '/detalle?orden=' + obj.numeroOrden +'&estatus='+1;
    }


});
