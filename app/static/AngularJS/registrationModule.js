// -- =============================================
// -- Author:      Vladimir Juárez
// -- Create date: 18/03/2016
// -- Description: Is the container of the application
// -- Modificó: 
// -- Fecha: 
// -- =============================================
var registrationModule = angular.module("registrationModule", ["ngRoute", "LocalStorageModule",
        "ui.bootstrap", "angularUtils.directives.dirPagination", "cgBusy", "frapontillo.bootstrap-switch","thatisuday.dropzone","nsPopover"])
    .config(function ($routeProvider, $locationProvider) {

        /*change the routes*/
        $routeProvider.when('/', {
            templateUrl: 'AngularJS/Templates/login.html',
            controller: 'loginController'
        });

        $routeProvider.when('/cita', {
            templateUrl: 'AngularJS/Cita/Templates/cita.html',
            controller: 'citaController'
        });

        $routeProvider.when('/citatrabajo', {
            templateUrl: 'AngularJS/Templates/citatrabajo.html',
            controller: 'citaController'
        });

        $routeProvider.when('/nuevacita', {
            templateUrl: 'AngularJS/Templates/nuevaCita.html',
            controller: 'citaController'
        });

        $routeProvider.when('/citaservicio', {
            templateUrl: 'AngularJS/Templates/citaServicio.html',
            controller: 'servicioController'
        });

        $routeProvider.when('/consultaCitas', {
            templateUrl: 'AngularJS/ConsultaCitas/Templates/consultaCitas.html',
            controller: 'consultaCitasController'
        });

        $routeProvider.when('/cotizacionnueva', {
            templateUrl: 'AngularJS/Cotizacion/Templates/cotizacionNueva.html',
            controller: 'cotizacionController'
        });

        $routeProvider.when('/cotizacionconsulta', {
            templateUrl: 'AngularJS/Cotizacion/Templates/cotizacionConsulta.html',
            controller: 'cotizacionConsultaController'
        });

        $routeProvider.when('/cotizacionautorizacion', {
            templateUrl: 'AngularJS/Cotizacion/Templates/cotizacionAutorizacion.html',
            controller: 'cotizacionAutorizacionController'
        });

        $routeProvider.when('/trabajo', {
            templateUrl: 'AngularJS/Trabajo/Templates/trabajo.html',
            controller: 'trabajoController'
        });

        $routeProvider.when('/lineatiempo', {
            templateUrl: 'AngularJS/Templates/lineaTiempo.html',
            controller: 'citaController'
        });

        $routeProvider.when('/ordenservicio', {
            templateUrl: 'AngularJS/Orden/Templates/ordenservicio.html',
            controller: 'ordenServicioController'
        });

        $routeProvider.when('/cotizacionevidencias', {
            templateUrl: 'AngularJS/Cotizacion/Templates/cotizacionEvidencias.html',
            controller: 'cotizacionEvidenciasController'
        });

        $routeProvider.when('/ordenservicioevidencias', {
            templateUrl: 'AngularJS/Orden/Templates/ordenservicioevidencias.html',
            controller: 'ordenServicioEvidenciaController'
        });

        $routeProvider.when('/ordenesporcobrar', {
            templateUrl: 'AngularJS/Orden/Templates/ordenesporcobrar.html',
            controller: 'ordenPorCobrarController'
        });
        
        $routeProvider.when('/reporte', {
            templateUrl: 'AngularJS/Templates/reporte.html',
            controller: 'reporteController'
        });
        
        $routeProvider.when('/osur', {
            templateUrl: 'AngularJS/Templates/osur.html',
            controller: 'osurController'
        });
        
        $routeProvider.when('/administracionordenes', {
            templateUrl: 'AngularJS/Templates/administracionOrdenes.html',
            controller: 'administracionOrdenController'
        });
        
        $routeProvider.when('/administraciontaller', {
            templateUrl: 'AngularJS/Templates/administracionTaller.html',
            controller: 'tallerController'
        });

        $routeProvider.when('/acciontaller', {
            templateUrl: 'AngularJS/Templates/accionTaller.html',
            controller: 'tallerController'
        });
        
        $routeProvider.when('/ordenanticipo', {
            templateUrl: 'AngularJS/Templates/ordenAnticipo.html',
            controller: 'ordenAnticipoController'
        });

         $routeProvider.when('/aprobacionutilidad', {
            templateUrl: 'AngularJS/Templates/aprobacionutilidad.html',
            controller: 'aprobacionutilidadController'
        });
         
         $routeProvider.when('/Tutorial', {
            templateUrl: 'AngularJS/Templates/tutorial.html',
            controller: 'tutorialController'
        });
        
        $routeProvider.when('/aprobacionProvision', {
            templateUrl: 'AngularJS/Templates/aprobacionProvision.html',
            controller: 'aprobacionProvisionController'
        });

        $routeProvider.when('/dashboardgeneral', {
            templateUrl: 'AngularJS/DashBoard/Templates/dashBoardGeneral.html',
            controller: 'dashBoardController'
        });

        $routeProvider.when('/reportecita', {
            templateUrl: 'AngularJS/Templates/reporteCita.html',
            controller: 'reporteCitaController'
        });

        $routeProvider.when('/reporteorden', {
            templateUrl: 'AngularJS/Templates/reporteOrden.html',
            controller: 'reporteOrdenController'
        });

        $routeProvider.when('/reportecotizacion', {
            templateUrl: 'AngularJS/Templates/reporteCotizacion.html',
            controller: 'reporteCotizacionController'
        });

        $routeProvider.when('/reporteporcobrar', {
            templateUrl: 'AngularJS/Templates/reportePorCobrar.html',
            controller: 'reportePorCobrarController'
        });
        
        $routeProvider.when('/reporteunidad', {
            templateUrl: 'AngularJS/Templates/reporteUnidad.html',
            controller: 'reporteUnidadController'
        });

        $routeProvider.when('/reporteutilidad', {
            templateUrl: 'AngularJS/Templates/reporteUtilidad.html',
            controller: 'reporteUtilidadController'
        });
        
        $routeProvider.when('/reporteCertificadoConformidad', {
            templateUrl: 'AngularJS/Templates/reporteCertificadoConformidad.html',
            controller: 'reporteCertificadoConformidadController'
        });

        $routeProvider.when('/comprobanteRecepcion', {
            templateUrl: 'AngularJS/Templates/comprobanteRecepcion.html',
            controller: 'comprobanteRecepcionController'
        });

        $routeProvider.when('/usuarioTar', {
            templateUrl: 'AngularJS/Templates/usuarioTar.html',
            controller: 'usuariotarController'
        });

        $routeProvider.when('/reporteReclamacion', {
            templateUrl: 'AngularJS/Templates/reporteReclamacion.html',
            controller: 'reporteReclamacionController'
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

registrationModule.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        var changeHeight = function () {
            element.css('height', (w.height() - 20) + 'px');
        };
        w.bind('resize', function () {
            changeHeight(); // when window size gets changed          	 
        });
        changeHeight(); // when page loads          
    }
});

angular.module('frapontillo.bootstrap-switch', []);

registrationModule.run(function($rootScope) {
    $rootScope.vIpServer = global_settings.urlCORS;
});

registrationModule.directive('viewportWidth', function () {
    return {
        link: function (scope, elm, attrs) {
            function getViewport() {
                var e = window,
                    a = 'inner';
                if (!('innerWidth' in window)) {
                    a = 'client';
                    e = document.documentElement || document.body;
                }
                return {
                    width: e[a + 'Width'],
                    height: e[a + 'Height']
                };
            }

            elm.css('maxWidth', getViewport().width + 'px');
        }
    };
});