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
            templateUrl: 'AngularJS/Login/Templates/login.html',
            controller: 'loginController'
        });

        $routeProvider.when('/cita', {
            templateUrl: 'AngularJS/Cita/Templates/cita.html',
            controller: 'citaController'
        });

        $routeProvider.when('/citatrabajo', {
            templateUrl: 'AngularJS/Cita/Templates/citatrabajo.html',
            controller: 'citaController'
        });

        $routeProvider.when('/nuevacita', {
            templateUrl: 'AngularJS/Cita/Templates/nuevaCita.html',
            controller: 'citaController'
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
            templateUrl: 'AngularJS/Reporte/Templates/reporte.html',
            controller: 'reporteController'
        });
        
        $routeProvider.when('/osur', {
            templateUrl: 'AngularJS/Osur/Templates/osur.html',
            controller: 'osurController'
        });
        
        $routeProvider.when('/administracionordenes', {
            templateUrl: 'AngularJS/Administracion/Templates/administracionOrdenes.html',
            controller: 'administracionOrdenController'
        });
        
        $routeProvider.when('/administraciontaller', {
            templateUrl: 'AngularJS/Talleres/Templates/administracionTaller.html',
            controller: 'tallerController'
        });

        $routeProvider.when('/acciontaller', {
            templateUrl: 'AngularJS/Talleres/Templates/accionTaller.html',
            controller: 'tallerController'
        });
        
        $routeProvider.when('/ordenanticipo', {
            templateUrl: 'AngularJS/OrdenAnticipo/Templates/ordenAnticipo.html',
            controller: 'ordenAnticipoController'
        });

         $routeProvider.when('/aprobacionutilidad', {
            templateUrl: 'AngularJS/Aprobacion/Templates/aprobacionutilidad.html',
            controller: 'aprobacionutilidadController'
        });
         
         $routeProvider.when('/Tutorial', {
            templateUrl: 'AngularJS/Tutorial/Templates/tutorial.html',
            controller: 'tutorialController'
        });
        
        $routeProvider.when('/aprobacionProvision', {
            templateUrl: 'AngularJS/Aprobacion/Templates/aprobacionProvision.html',
            controller: 'aprobacionProvisionController'
        });

        $routeProvider.when('/dashboardgeneral', {
            templateUrl: 'AngularJS/DashBoard/Templates/dashBoardGeneral.html',
            controller: 'dashBoardController'
        });

        $routeProvider.when('/reportecita', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteCita.html',
            controller: 'reporteCitaController'
        });

        $routeProvider.when('/reporteorden', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteOrden.html',
            controller: 'reporteOrdenController'
        });

        $routeProvider.when('/reportecotizacion', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteCotizacion.html',
            controller: 'reporteCotizacionController'
        });

        $routeProvider.when('/reporteporcobrar', {
            templateUrl: 'AngularJS/Reporte/Templates/reportePorCobrar.html',
            controller: 'reportePorCobrarController'
        });
        
        $routeProvider.when('/reporteunidad', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteUnidad.html',
            controller: 'reporteUnidadController'
        });

        $routeProvider.when('/reporteutilidad', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteUtilidad.html',
            controller: 'reporteUtilidadController'
        });
        
        $routeProvider.when('/reporteCertificadoConformidad', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteCertificadoConformidad.html',
            controller: 'reporteCertificadoConformidadController'
        });

        $routeProvider.when('/comprobanteRecepcion', {
            templateUrl: 'AngularJS/ConsultaCitas/Templates/comprobanteRecepcion.html',
            controller: 'comprobanteRecepcionController'
        });

        $routeProvider.when('/usuarioTar', {
            templateUrl: 'AngularJS/usuarioTar/Templates/usuarioTar.html',
            controller: 'usuariotarController'
        });

        $routeProvider.when('/reporteReclamacion', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteReclamacion.html',
            controller: 'reporteReclamacionController'
        });

        $routeProvider.when('/detalle', {
            templateUrl: 'AngularJS/Detalle/Templates/detalle.html',
            controller: 'detalleController'
        });

        $routeProvider.when('/unidad', {
            templateUrl: 'AngularJS/BusquedaUnidad/Templates/busquedaUnidad.html',
            controller: 'busquedaUnidadController'
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