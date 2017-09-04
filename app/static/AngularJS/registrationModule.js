// -- =============================================
// -- Author:      Vladimir Juárez
// -- Create date: 18/03/2016
// -- Description: Is the container of the application
// -- Modificó:
// -- Fecha:
// -- =============================================
var registrationModule = angular.module("registrationModule", ["ngRoute", "LocalStorageModule", "angular.filter",
        "ui.bootstrap", "angularUtils.directives.dirPagination", "cgBusy", "frapontillo.bootstrap-switch", "thatisuday.dropzone", "nsPopover"
    ])
    .config(function($routeProvider, $locationProvider) {

        /*change the routes*/
        $routeProvider.when('/', {
            templateUrl: 'AngularJS/Login/Templates/login.html',
            controller: 'loginController'
        });

        $routeProvider.when('/configurador', {
            templateUrl: 'AngularJS/Configurador/Templates/Configurador.html',
            controller: 'configuradorController'
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
            templateUrl: 'AngularJS/PorCobrar/Templates/ordenesporcobrar.html',
            controller: 'ordenPorCobrarController'
        });

        $routeProvider.when('/reporte', {
            templateUrl: 'AngularJS/Reporte/Templates/reporte.html',
            controller: 'reporteController'
        });

        $routeProvider.when('/presupuesto', {
            templateUrl: 'AngularJS/Presupuesto/Templates/presupuesto.html',
            controller: 'presupuestoController'
        });

        $routeProvider.when('/administracionordenes', {
            templateUrl: 'AngularJS/Administracion/Templates/administracionOrdenes.html',
            controller: 'administracionOrdenController'
        });

        $routeProvider.when('/administracionmemorandum', {
            templateUrl: 'AngularJS/Administracion/Templates/administracionMemorandum.html',
            controller: 'administracionMemorandumController'
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

        $routeProvider.when('/dashboardCallCenter', {
            templateUrl: 'AngularJS/HomeCallCenter/Templates/dashboardCallCenter.html',
            controller: 'dashboardCallCenterController'
        });

        $routeProvider.when('/reporteparquevehicular', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteParqueVehicular.html',
            controller: 'reporteParqueVehicularController'
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

        // $routeProvider.when('/reporteporcobrar', {
        //     templateUrl: 'AngularJS/Reporte/Templates/reportePorCobrar.html',
        //     controller: 'reportePorCobrarController'
        // });

        $routeProvider.when('/reporteunidad', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteUnidad.html',
            controller: 'reporteUnidadController'
        });

        $routeProvider.when('/reporteutilidad', {
            templateUrl: 'AngularJS/Reporte/Templates/reporteUtilidad.html',
            controller: 'reporteUtilidadController'
        });

        $routeProvider.when('/reporteHojaTrabajo', {
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

        $routeProvider.when('/detalle', {
            templateUrl: 'AngularJS/Detalle/Templates/detalle.html',
            controller: 'detalleController'
        });

        $routeProvider.when('/unidad', {
            templateUrl: 'AngularJS/BusquedaUnidad/Templates/busquedaUnidad.html',
            controller: 'busquedaUnidadController'
        });
        $routeProvider.when('/editarCotizacion', {
            templateUrl: 'AngularJS/ConsultaCitas/Templates/editalcotizacion.html',
            controller: 'editarCotizacionController'
        });

        $routeProvider.when('/preordenCotizacion', {
            templateUrl: 'AngularJS/PreordenCotizacion/Templates/PreordenCotizacion.html',
            controller: 'preordenCotizacionController'
        });

        $routeProvider.when('/reporteReclamacion', {
            templateUrl: 'AngularJS/Reclamacion/Templates/reporteReclamacion.html',
            controller: 'reporteReclamacionController'
        })

        $routeProvider.when('/resumenReclamacion', {
            templateUrl: 'AngularJS/Reclamacion/Templates/resumenReclamacion.html',
            controller: 'resumenReclamacionController'
        })

        $routeProvider.when('/historialReclamacion', {
            templateUrl: 'AngularJS/Reclamacion/Templates/historialReclamacion.html',
            controller: 'historialReclamacionController'
        })

        $routeProvider.when('/evidenciaReclamacion', {
            templateUrl: 'AngularJS/Reclamacion/Templates/evidenciaReclamacion.html',
            controller: 'historialReclamacionController'
        })

        $routeProvider.when('/preCancelaciones', {
            templateUrl: 'AngularJS/Precancelaciones/Templates/Precancelaciones.html',
            controller: 'preCancelacionesController'
        })

        $routeProvider.when('/miCuenta', {
            templateUrl: 'AngularJS/MiCuenta/Templates/miCuenta.html',
            controller: 'miCuentaController'
        })



        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

registrationModule.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() {
            element.css('height', (w.height() - 20) + 'px');
        };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed
        });
        changeHeight(); // when page loads
    }
});

angular.module('frapontillo.bootstrap-switch', []);

registrationModule.run(function($rootScope, userFactory, loginRepository) {
    $rootScope.vIpServer = global_settings.urlCORS;
    $rootScope.docServer = global_settings.urlDOCS;
    var lastDigestRun = new Date();
    loginRepository.getTiempoInactividad().then(function(result) {
        var minutos = result.data;
        $rootScope.$watch(function detectIdle() {
            var now = new Date();
            if (now - lastDigestRun > (minutos * 1000 * 60)) {
                userFactory.logOut();
            }
            lastDigestRun = now;
        });
    });
});

registrationModule.directive('viewportWidth', function() {
    return {
        link: function(scope, elm, attrs) {
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