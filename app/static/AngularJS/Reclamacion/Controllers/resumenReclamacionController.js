registrationModule.controller('resumenReclamacionController', function ($scope, $route, $modal, $rootScope, localStorageService, alertFactory, globalFactory, uploadRepository, reclamacionRepository, dashBoardRepository, reporteReclamacionRepository) {
    $scope.userData = localStorageService.get('userData');
    $rootScope.modulo = 'emisionOficios';

    $scope.init = function () {
		//$scope.devuelveZonas();
        //$scope.callResumen();
    }

    $scope.devuelveTars = function (zona) {
        if (zona != null) {
            dashBoardRepository.getTars(zona).then(function (tars) {
                if (tars.data.length > 0) {
                    $scope.tars = tars.data;

                }
            }, function (error) {
                alertFactory.error('No se pudo recuperar información de las TARs');
            });
        } else {
            $scope.tar = null;
        }
    }

    $scope.devuelveZonas = function () {
        dashBoardRepository.getZonas($scope.userData.idUsuario).then(function (zonas) {
            if (zonas.data.length > 0) {
                $scope.zonas = zonas.data;

            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información de las zonas');
        });
    }

    $scope.callResumen = function () {
    	$scope.statusResumen();
    }

    $scope.statusResumen = function () {
        $scope.jsonDataAnexo1 = undefined;
        $scope.jsonDataAnexo2 = undefined;
        $scope.jsonDataAnexo3 = undefined;
        ///////////////////////////////////
        $scope.anexos1 = '';
        $scope.anexos2 = '';
        $scope.anexos3 = '';
        ///////////////////////////////////
        $scope.Anexo(null,null,1);
        $scope.Anexo(null,null,2);
        $scope.Anexo(null,null,3);
        ///////////////////////////////////
        $scope.cantidadTotal = 0;
        var data = {};
        $scope.estructura = {};
        var zona1 = {};
        var zona2 = {};
        var zona3 = {};
        var zona4 = {};

        var anexo1N = [];
        var anexo2N = [];
        var anexo3N = [];

        var anexo1C = [];
        var anexo2C = [];
        var anexo3C = [];

        var anexo1P = [];
        var anexo2P = [];
        var anexo3P = [];

        var anexo1G = [];
        var anexo2G = [];
        var anexo3G = [];

        var generalN = {};
        var generalC = {};
        var generalP = {};
        var generalG = {};
        //////////////////////
        $scope.cantidadNAnexo1 = 0;
        $scope.precioNAnexo1 = 0;
        $scope.cantidadNAnexo2 = 0;
        $scope.precioNAnexo2 = 0;
        $scope.cantidadNAnexo3 = 0;
        $scope.precioNAnexo3 = 0;
        $scope.atrasoNAnexo1 = 0;
        $scope.atrasoNAnexo2 = 0;
        $scope.atrasoNAnexo3 = 0;
        //////////////////////
        $scope.cantidadCAnexo1 = 0;
        $scope.precioCAnexo1 = 0;
        $scope.cantidadCAnexo2 = 0;
        $scope.precioCAnexo2 = 0;
        $scope.cantidadCAnexo3 = 0;
        $scope.precioCAnexo3 = 0;
        $scope.atrasoCAnexo1 = 0;
        $scope.atrasoCAnexo2 = 0;
        $scope.atrasoCAnexo3 = 0;
        //////////////////////
        $scope.cantidadPAnexo1 = 0;
        $scope.precioPAnexo1 = 0;
        $scope.cantidadPAnexo2 = 0;
        $scope.precioPAnexo2 = 0;
        $scope.cantidadPAnexo3 = 0;
        $scope.precioPAnexo3 = 0;
        $scope.atrasoPAnexo1 = 0;
        $scope.atrasoPAnexo2 = 0;
        $scope.atrasoPAnexo3 = 0;
        //////////////////////
        $scope.cantidadGAnexo1 = 0;
        $scope.precioGAnexo1 = 0;
        $scope.cantidadGAnexo2 = 0;
        $scope.precioGAnexo2 = 0;
        $scope.cantidadGAnexo3 = 0;
        $scope.precioGAnexo3 = 0;
        $scope.atrasoGAnexo1 = 0;
        $scope.atrasoGAnexo2 = 0;
        $scope.atrasoGAnexo3 = 0;
        //////////////////////
        $scope.cantidad1tar1  = 0;
        $scope.precio1tar1 = 0;
        $scope.cantidad2tar1 = 0;
        $scope.precio2tar1 = 0;
        $scope.cantidad3tar1 = 0;
        $scope.precio3tar1 = 0;
        $scope.atraso1tar1 = 0;
        $scope.atraso2tar1 = 0;
        $scope.atraso3tar1 = 0;
        $scope.cantidad1tar2  = 0;
        $scope.precio1tar2 = 0;
        $scope.cantidad2tar2 = 0;
        $scope.precio2tar2 = 0;
        $scope.cantidad3tar2 = 0;
        $scope.precio3tar2 = 0;
        $scope.atraso1tar2 = 0;
        $scope.atraso2tar2 = 0;
        $scope.atraso3tar2 = 0;
        $scope.cantidad1tar3  = 0;
        $scope.precio1tar3 = 0;
        $scope.cantidad2tar3 = 0;
        $scope.precio2tar3 = 0;
        $scope.cantidad3tar3 = 0;
        $scope.precio3tar3 = 0;
        $scope.atraso1tar3 = 0;
        $scope.atraso2tar3 = 0;
        $scope.atraso3tar3 = 0;
        $scope.cantidad1tar4  = 0;
        $scope.precio1tar4 = 0;
        $scope.cantidad2tar4 = 0;
        $scope.precio2tar4 = 0;
        $scope.cantidad3tar4 = 0;
        $scope.precio3tar4 = 0;
        $scope.atraso1tar4 = 0;
        $scope.atraso2tar4 = 0;
        $scope.atraso3tar4 = 0;
        $scope.cantidad1tar5=0;
        $scope.precio1tar5=0;
        $scope.cantidad2tar5=0;
        $scope.precio2tar5=0;
        $scope.cantidad3tar5=0;
        $scope.precio3tar5=0;
        $scope.atraso1tar5=0;
        $scope.atraso2tar5=0;
        $scope.atraso3tar5=0;
        $scope.cantidad1tar6=0;
        $scope.precio1tar6=0;
        $scope.cantidad2tar6=0;
        $scope.precio2tar6=0;
        $scope.cantidad3tar6=0;
        $scope.precio3tar6=0;
        $scope.atraso1tar6=0;
        $scope.atraso2tar6=0;
        $scope.atraso3tar6=0;
        $scope.cantidad1tar7=0;
        $scope.precio1tar7=0;
        $scope.cantidad2tar7=0;
        $scope.precio2tar7=0;
        $scope.cantidad3tar7=0;
        $scope.precio3tar7=0;
        $scope.atraso1tar7=0;
        $scope.atraso2tar7=0;
        $scope.atraso3tar7=0;
        $scope.cantidad1tar8=0;
        $scope.precio1tar8=0;
        $scope.cantidad2tar8=0;
        $scope.precio2tar8=0;
        $scope.cantidad3tar8=0;
        $scope.precio3tar8=0;
        $scope.atraso1tar8=0;
        $scope.atraso2tar8=0;
        $scope.atraso3tar8=0;
        $scope.cantidad1tar9=0;
        $scope.precio1tar9=0;
        $scope.cantidad2tar9=0;
        $scope.precio2tar9=0;
        $scope.cantidad3tar9=0;
        $scope.precio3tar9=0;
        $scope.atraso1tar9=0;
        $scope.atraso2tar9=0;
        $scope.atraso3tar9=0;
        $scope.cantidad1tar10=0;
        $scope.precio1tar10=0;
        $scope.cantidad2tar10=0;
        $scope.precio2tar10=0;
        $scope.cantidad3tar10=0;
        $scope.precio3tar10=0;
        $scope.atraso1tar10=0;
        $scope.atraso2tar10=0;
        $scope.atraso3tar10=0;
        $scope.cantidad1tar11=0;
        $scope.precio1tar11=0;
        $scope.cantidad2tar11=0;
        $scope.precio2tar11=0;
        $scope.cantidad3tar11=0;
        $scope.precio3tar11=0;
        $scope.atraso1tar11=0;
        $scope.atraso2tar11=0;
        $scope.atraso3tar11=0;
        $scope.cantidad1tar12=0;
        $scope.precio1tar12=0;
        $scope.cantidad2tar12=0;
        $scope.precio2tar12=0;
        $scope.cantidad3tar12=0;
        $scope.precio3tar12=0;
        $scope.atraso1tar12=0;
        $scope.atraso2tar12=0;
        $scope.atraso3tar12=0;
        $scope.cantidad1tar13=0;
        $scope.precio1tar13=0;
        $scope.cantidad2tar13=0;
        $scope.precio2tar13=0;
        $scope.cantidad3tar13=0;
        $scope.precio3tar13=0;
        $scope.atraso1tar13=0;
        $scope.atraso2tar13=0;
        $scope.atraso3tar13=0;
        $scope.cantidad1tar14=0;
        $scope.precio1tar14=0;
        $scope.cantidad2tar14=0;
        $scope.precio2tar14=0;
        $scope.cantidad3tar14=0;
        $scope.precio3tar14=0;
        $scope.atraso1tar14=0;
        $scope.atraso2tar14=0;
        $scope.atraso3tar14=0;
        $scope.cantidad1tar15=0;
        $scope.precio1tar15=0;
        $scope.cantidad2tar15=0;
        $scope.precio2tar15=0;
        $scope.cantidad3tar15=0;
        $scope.precio3tar15=0;
        $scope.atraso1tar15=0;
        $scope.atraso2tar15=0;
        $scope.atraso3tar15=0;
        $scope.cantidad1tar16=0;
        $scope.precio1tar16=0;
        $scope.cantidad2tar16=0;
        $scope.precio2tar16=0;
        $scope.cantidad3tar16=0;
        $scope.precio3tar16=0;
        $scope.atraso1tar16=0;
        $scope.atraso2tar16=0;
        $scope.atraso3tar16=0;
        $scope.cantidad1tar17=0;
        $scope.precio1tar17=0;
        $scope.cantidad2tar17=0;
        $scope.precio2tar17=0;
        $scope.cantidad3tar17=0;
        $scope.precio3tar17=0;
        $scope.atraso1tar17=0;
        $scope.atraso2tar17=0;
        $scope.atraso3tar17=0;
        $scope.cantidad1tar18=0;
        $scope.precio1tar18=0;
        $scope.cantidad2tar18=0;
        $scope.precio2tar18=0;
        $scope.cantidad3tar18=0;
        $scope.precio3tar18=0;
        $scope.atraso1tar18=0;
        $scope.atraso2tar18=0;
        $scope.atraso3tar18=0;
        $scope.cantidad1tar19=0;
        $scope.precio1tar19=0;
        $scope.cantidad2tar19=0;
        $scope.precio2tar19=0;
        $scope.cantidad3tar19=0;
        $scope.precio3tar19=0;
        $scope.atraso1tar19=0;
        $scope.atraso2tar19=0;
        $scope.atraso3tar19=0;
        $scope.cantidad1tar20=0;
        $scope.precio1tar20=0;
        $scope.cantidad2tar20=0;
        $scope.precio2tar20=0;
        $scope.cantidad3tar20=0;
        $scope.precio3tar20=0;
        $scope.atraso1tar20=0;
        $scope.atraso2tar20=0;
        $scope.atraso3tar20=0;
        $scope.cantidad1tar21=0;
        $scope.precio1tar21=0;
        $scope.cantidad2tar21=0;
        $scope.precio2tar21=0;
        $scope.cantidad3tar21=0;
        $scope.precio3tar21=0;
        $scope.atraso1tar21=0;
        $scope.atraso2tar21=0;
        $scope.atraso3tar21=0;
        $scope.cantidad1tar22=0;
        $scope.precio1tar22=0;
        $scope.cantidad2tar22=0;
        $scope.precio2tar22=0;
        $scope.cantidad3tar22=0;
        $scope.precio3tar22=0;
        $scope.atraso1tar22=0;
        $scope.atraso2tar22=0;
        $scope.atraso3tar22=0;
        $scope.cantidad1tar23=0;
        $scope.precio1tar23=0;
        $scope.cantidad2tar23=0;
        $scope.precio2tar23=0;
        $scope.cantidad3tar23=0;
        $scope.precio3tar23=0;
        $scope.atraso1tar23=0;
        $scope.atraso2tar23=0;
        $scope.atraso3tar23=0;
        $scope.cantidad1tar24=0;
        $scope.precio1tar24=0;
        $scope.cantidad2tar24=0;
        $scope.precio2tar24=0;
        $scope.cantidad3tar24=0;
        $scope.precio3tar24=0;
        $scope.atraso1tar24=0;
        $scope.atraso2tar24=0;
        $scope.atraso3tar24=0;
        $scope.cantidad1tar25=0;
        $scope.precio1tar25=0;
        $scope.cantidad2tar25=0;
        $scope.precio2tar25=0;
        $scope.cantidad3tar25=0;
        $scope.precio3tar25=0;
        $scope.atraso1tar25=0;
        $scope.atraso2tar25=0;
        $scope.atraso3tar25=0;
        $scope.cantidad1tar26=0;
        $scope.precio1tar26=0;
        $scope.cantidad2tar26=0;
        $scope.precio2tar26=0;
        $scope.cantidad3tar26=0;
        $scope.precio3tar26=0;
        $scope.atraso1tar26=0;
        $scope.atraso2tar26=0;
        $scope.atraso3tar26=0;
        $scope.cantidad1tar27=0;
        $scope.precio1tar27=0;
        $scope.cantidad2tar27=0;
        $scope.precio2tar27=0;
        $scope.cantidad3tar27=0;
        $scope.precio3tar27=0;
        $scope.atraso1tar27=0;
        $scope.atraso2tar27=0;
        $scope.atraso3tar27=0;
        $scope.cantidad1tar28=0;
        $scope.precio1tar28=0;
        $scope.cantidad2tar28=0;
        $scope.precio2tar28=0;
        $scope.cantidad3tar28=0;
        $scope.precio3tar28=0;
        $scope.atraso1tar28=0;
        $scope.atraso2tar28=0;
        $scope.atraso3tar28=0;
        $scope.cantidad1tar29=0;
        $scope.precio1tar29=0;
        $scope.cantidad2tar29=0;
        $scope.precio2tar29=0;
        $scope.cantidad3tar29=0;
        $scope.precio3tar29=0;
        $scope.atraso1tar29=0;
        $scope.atraso2tar29=0;
        $scope.atraso3tar29=0;
        $scope.cantidad1tar30=0;
        $scope.precio1tar30=0;
        $scope.cantidad2tar30=0;
        $scope.precio2tar30=0;
        $scope.cantidad3tar30=0;
        $scope.precio3tar30=0;
        $scope.atraso1tar30=0;
        $scope.atraso2tar30=0;
        $scope.atraso3tar30=0;
        $scope.cantidad1tar31=0;
        $scope.precio1tar31=0;
        $scope.cantidad2tar31=0;
        $scope.precio2tar31=0;
        $scope.cantidad3tar31=0;
        $scope.precio3tar31=0;
        $scope.atraso1tar31=0;
        $scope.atraso2tar31=0;
        $scope.atraso3tar31=0;
        $scope.cantidad1tar32=0;
        $scope.precio1tar32=0;
        $scope.cantidad2tar32=0;
        $scope.precio2tar32=0;
        $scope.cantidad3tar32=0;
        $scope.precio3tar32=0;
        $scope.atraso1tar32=0;
        $scope.atraso2tar32=0;
        $scope.atraso3tar32=0;
        $scope.cantidad1tar33=0;
        $scope.precio1tar33=0;
        $scope.cantidad2tar33=0;
        $scope.precio2tar33=0;
        $scope.cantidad3tar33=0;
        $scope.precio3tar33=0;
        $scope.atraso1tar33=0;
        $scope.atraso2tar33=0;
        $scope.atraso3tar33=0;
        $scope.cantidad1tar34=0;
        $scope.precio1tar34=0;
        $scope.cantidad2tar34=0;
        $scope.precio2tar34=0;
        $scope.cantidad3tar34=0;
        $scope.precio3tar34=0;
        $scope.atraso1tar34=0;
        $scope.atraso2tar34=0;
        $scope.atraso3tar34=0;
        $scope.cantidad1tar35=0;
        $scope.precio1tar35=0;
        $scope.cantidad2tar35=0;
        $scope.precio2tar35=0;
        $scope.cantidad3tar35=0;
        $scope.precio3tar35=0;
        $scope.atraso1tar35=0;
        $scope.atraso2tar35=0;
        $scope.atraso3tar35=0;
        $scope.cantidad1tar36=0;
        $scope.precio1tar36=0;
        $scope.cantidad2tar36=0;
        $scope.precio2tar36=0;
        $scope.cantidad3tar36=0;
        $scope.precio3tar36=0;
        $scope.atraso1tar36=0;
        $scope.atraso2tar36=0;
        $scope.atraso3tar36=0;
        $scope.cantidad1tar37=0;
        $scope.precio1tar37=0;
        $scope.cantidad2tar37=0;
        $scope.precio2tar37=0;
        $scope.cantidad3tar37=0;
        $scope.precio3tar37=0;
        $scope.atraso1tar37=0;
        $scope.atraso2tar37=0;
        $scope.atraso3tar37=0;
        $scope.cantidad1tar38=0;
        $scope.precio1tar38=0;
        $scope.cantidad2tar38=0;
        $scope.precio2tar38=0;
        $scope.cantidad3tar38=0;
        $scope.precio3tar38=0;
        $scope.atraso1tar38=0;
        $scope.atraso2tar38=0;
        $scope.atraso3tar38=0;
        $scope.cantidad1tar39=0;
        $scope.precio1tar39=0;
        $scope.cantidad2tar39=0;
        $scope.precio2tar39=0;
        $scope.cantidad3tar39=0;
        $scope.precio3tar39=0;
        $scope.atraso1tar39=0;
        $scope.atraso2tar39=0;
        $scope.atraso3tar39=0;
        $scope.cantidad1tar40=0;
        $scope.precio1tar40=0;
        $scope.cantidad2tar40=0;
        $scope.precio2tar40=0;
        $scope.cantidad3tar40=0;
        $scope.precio3tar40=0;
        $scope.atraso1tar40=0;
        $scope.atraso2tar40=0;
        $scope.atraso3tar40=0;
        $scope.cantidad1tar41=0;
        $scope.precio1tar41=0;
        $scope.cantidad2tar41=0;
        $scope.precio2tar41=0;
        $scope.cantidad3tar41=0;
        $scope.precio3tar41=0;
        $scope.atraso1tar41=0;
        $scope.atraso2tar41=0;
        $scope.atraso3tar41=0;
        $scope.cantidad1tar42=0;
        $scope.precio1tar42=0;
        $scope.cantidad2tar42=0;
        $scope.precio2tar42=0;
        $scope.cantidad3tar42=0;
        $scope.precio3tar42=0;
        $scope.atraso1tar42=0;
        $scope.atraso2tar42=0;
        $scope.atraso3tar42=0;
        $scope.cantidad1tar43=0;
        $scope.precio1tar43=0;
        $scope.cantidad2tar43=0;
        $scope.precio2tar43=0;
        $scope.cantidad3tar43=0;
        $scope.precio3tar43=0;
        $scope.atraso1tar43=0;
        $scope.atraso2tar43=0;
        $scope.atraso3tar43=0;
        $scope.cantidad1tar44=0;
        $scope.precio1tar44=0;
        $scope.cantidad2tar44=0;
        $scope.precio2tar44=0;
        $scope.cantidad3tar44=0;
        $scope.precio3tar44=0;
        $scope.atraso1tar44=0;
        $scope.atraso2tar44=0;
        $scope.atraso3tar44=0;
        $scope.cantidad1tar45=0;
        $scope.precio1tar45=0;
        $scope.cantidad2tar45=0;
        $scope.precio2tar45=0;
        $scope.cantidad3tar45=0;
        $scope.precio3tar45=0;
        $scope.atraso1tar45=0;
        $scope.atraso2tar45=0;
        $scope.atraso3tar45=0;
        $scope.cantidad1tar46=0;
        $scope.precio1tar46=0;
        $scope.cantidad2tar46=0;
        $scope.precio2tar46=0;
        $scope.cantidad3tar46=0;
        $scope.precio3tar46=0;
        $scope.atraso1tar46=0;
        $scope.atraso2tar46=0;
        $scope.atraso3tar46=0;
        $scope.cantidad1tar47=0;
        $scope.precio1tar47=0;
        $scope.cantidad2tar47=0;
        $scope.precio2tar47=0;
        $scope.cantidad3tar47=0;
        $scope.precio3tar47=0;
        $scope.atraso1tar47=0;
        $scope.atraso2tar47=0;
        $scope.atraso3tar47=0;
        $scope.cantidad1tar48=0;
        $scope.precio1tar48=0;
        $scope.cantidad2tar48=0;
        $scope.precio2tar48=0;
        $scope.cantidad3tar48=0;
        $scope.precio3tar48=0;
        $scope.atraso1tar48=0;
        $scope.atraso2tar48=0;
        $scope.atraso3tar48=0;
        $scope.cantidad1tar49=0;
        $scope.precio1tar49=0;
        $scope.cantidad2tar49=0;
        $scope.precio2tar49=0;
        $scope.cantidad3tar49=0;
        $scope.precio3tar49=0;
        $scope.atraso1tar49=0;
        $scope.atraso2tar49=0;
        $scope.atraso3tar49=0;
        $scope.cantidad1tar50=0;
        $scope.precio1tar50=0;
        $scope.cantidad2tar50=0;
        $scope.precio2tar50=0;
        $scope.cantidad3tar50=0;
        $scope.precio3tar50=0;
        $scope.atraso1tar50=0;
        $scope.atraso2tar50=0;
        $scope.atraso3tar50=0;
        $scope.cantidad1tar51=0;
        $scope.precio1tar51=0;
        $scope.cantidad2tar51=0;
        $scope.precio2tar51=0;
        $scope.cantidad3tar51=0;
        $scope.precio3tar51=0;
        $scope.atraso1tar51=0;
        $scope.atraso2tar51=0;
        $scope.atraso3tar51=0;
        $scope.cantidad1tar52=0;
        $scope.precio1tar52=0;
        $scope.cantidad2tar52=0;
        $scope.precio2tar52=0;
        $scope.cantidad3tar52=0;
        $scope.precio3tar52=0;
        $scope.atraso1tar52=0;
        $scope.atraso2tar52=0;
        $scope.atraso3tar52=0;
        $scope.cantidad1tar53=0;
        $scope.precio1tar53=0;
        $scope.cantidad2tar53=0;
        $scope.precio2tar53=0;
        $scope.cantidad3tar53=0;
        $scope.precio3tar53=0;
        $scope.atraso1tar53=0;
        $scope.atraso2tar53=0;
        $scope.atraso3tar53=0;
        $scope.cantidad1tar54=0;
        $scope.precio1tar54=0;
        $scope.cantidad2tar54=0;
        $scope.precio2tar54=0;
        $scope.cantidad3tar54=0;
        $scope.precio3tar54=0;
        $scope.atraso1tar54=0;
        $scope.atraso2tar54=0;
        $scope.atraso3tar54=0;
        $scope.cantidad1tar55=0;
        $scope.precio1tar55=0;
        $scope.cantidad2tar55=0;
        $scope.precio2tar55=0;
        $scope.cantidad3tar55=0;
        $scope.precio3tar55=0;
        $scope.atraso1tar55=0;
        $scope.atraso2tar55=0;
        $scope.atraso3tar55=0;
        $scope.cantidad1tar56=0;
        $scope.precio1tar56=0;
        $scope.cantidad2tar56=0;
        $scope.precio2tar56=0;
        $scope.cantidad3tar56=0;
        $scope.precio3tar56=0;
        $scope.atraso1tar56=0;
        $scope.atraso2tar56=0;
        $scope.atraso3tar56=0;
        $scope.cantidad1tar57=0;
        $scope.precio1tar57=0;
        $scope.cantidad2tar57=0;
        $scope.precio2tar57=0;
        $scope.cantidad3tar57=0;
        $scope.precio3tar57=0;
        $scope.atraso1tar57=0;
        $scope.atraso2tar57=0;
        $scope.atraso3tar57=0;
        $scope.cantidad1tar58=0;
        $scope.precio1tar58=0;
        $scope.cantidad2tar58=0;
        $scope.precio2tar58=0;
        $scope.cantidad3tar58=0;
        $scope.precio3tar58=0;
        $scope.atraso1tar58=0;
        $scope.atraso2tar58=0;
        $scope.atraso3tar58=0;
        $scope.cantidad1tar59=0;
        $scope.precio1tar59=0;
        $scope.cantidad2tar59=0;
        $scope.precio2tar59=0;
        $scope.cantidad3tar59=0;
        $scope.precio3tar59=0;
        $scope.atraso1tar59=0;
        $scope.atraso2tar59=0;
        $scope.atraso3tar59=0;
        $scope.cantidad1tar60=0;
        $scope.precio1tar60=0;
        $scope.cantidad2tar60=0;
        $scope.precio2tar60=0;
        $scope.cantidad3tar60=0;
        $scope.precio3tar60=0;
        $scope.atraso1tar60=0;
        $scope.atraso2tar60=0;
        $scope.atraso3tar60=0;
        $scope.cantidad1tar61=0;
        $scope.precio1tar61=0;
        $scope.cantidad2tar61=0;
        $scope.precio2tar61=0;
        $scope.cantidad3tar61=0;
        $scope.precio3tar61=0;
        $scope.atraso1tar61=0;
        $scope.atraso2tar61=0;
        $scope.atraso3tar61=0;
        $scope.cantidad1tar62=0;
        $scope.precio1tar62=0;
        $scope.cantidad2tar62=0;
        $scope.precio2tar62=0;
        $scope.cantidad3tar62=0;
        $scope.precio3tar62=0;
        $scope.atraso1tar62=0;
        $scope.atraso2tar62=0;
        $scope.atraso3tar62=0;
        $scope.cantidad1tar63=0;
        $scope.precio1tar63=0;
        $scope.cantidad2tar63=0;
        $scope.precio2tar63=0;
        $scope.cantidad3tar63=0;
        $scope.precio3tar63=0;
        $scope.atraso1tar63=0;
        $scope.atraso2tar63=0;
        $scope.atraso3tar63=0;
        $scope.cantidad1tar64=0;
        $scope.precio1tar64=0;
        $scope.cantidad2tar64=0;
        $scope.precio2tar64=0;
        $scope.cantidad3tar64=0;
        $scope.precio3tar64=0;
        $scope.atraso1tar64=0;
        $scope.atraso2tar64=0;
        $scope.atraso3tar64=0;
        $scope.cantidad1tar65=0;
        $scope.precio1tar65=0;
        $scope.cantidad2tar65=0;
        $scope.precio2tar65=0;
        $scope.cantidad3tar65=0;
        $scope.precio3tar65=0;
        $scope.atraso1tar65=0;
        $scope.atraso2tar65=0;
        $scope.atraso3tar65=0;
        $scope.cantidad1tar66=0;
        $scope.precio1tar66=0;
        $scope.cantidad2tar66=0;
        $scope.precio2tar66=0;
        $scope.cantidad3tar66=0;
        $scope.precio3tar66=0;
        $scope.atraso1tar66=0;
        $scope.atraso2tar66=0;
        $scope.atraso3tar66=0;
        $scope.cantidad1tar67=0;
        $scope.precio1tar67=0;
        $scope.cantidad2tar67=0;
        $scope.precio2tar67=0;
        $scope.cantidad3tar67=0;
        $scope.precio3tar67=0;
        $scope.atraso1tar67=0;
        $scope.atraso2tar67=0;
        $scope.atraso3tar67=0;
        $scope.cantidad1tar68=0;
        $scope.precio1tar68=0;
        $scope.cantidad2tar68=0;
        $scope.precio2tar68=0;
        $scope.cantidad3tar68=0;
        $scope.precio3tar68=0;
        $scope.atraso1tar68=0;
        $scope.atraso2tar68=0;
        $scope.atraso3tar68=0;
        $scope.cantidad1tar69=0;
        $scope.precio1tar69=0;
        $scope.cantidad2tar69=0;
        $scope.precio2tar69=0;
        $scope.cantidad3tar69=0;
        $scope.precio3tar69=0;
        $scope.atraso1tar69=0;
        $scope.atraso2tar69=0;
        $scope.atraso3tar69=0;
        $scope.cantidad1tar70=0;
        $scope.precio1tar70=0;
        $scope.cantidad2tar70=0;
        $scope.precio2tar70=0;
        $scope.cantidad3tar70=0;
        $scope.precio3tar70=0;
        $scope.atraso1tar70=0;
        $scope.atraso2tar70=0;
        $scope.atraso3tar70=0;
        $scope.cantidad1tar71=0;
        $scope.precio1tar71=0;
        $scope.cantidad2tar71=0;
        $scope.precio2tar71=0;
        $scope.cantidad3tar71=0;
        $scope.precio3tar71=0;
        $scope.atraso1tar71=0;
        $scope.atraso2tar71=0;
        $scope.atraso3tar71=0;
        $scope.cantidad1tar72=0;
        $scope.precio1tar72=0;
        $scope.cantidad2tar72=0;
        $scope.precio2tar72=0;
        $scope.cantidad3tar72=0;
        $scope.precio3tar72=0;
        $scope.atraso1tar72=0;
        $scope.atraso2tar72=0;
        $scope.atraso3tar72=0;
        $scope.cantidad1tar73=0;
        $scope.precio1tar73=0;
        $scope.cantidad2tar73=0;
        $scope.precio2tar73=0;
        $scope.cantidad3tar73=0;
        $scope.precio3tar73=0;
        $scope.atraso1tar73=0;
        $scope.atraso2tar73=0;
        $scope.atraso3tar73=0;
        $scope.cantidad1tar74=0;
        $scope.precio1tar74=0;
        $scope.cantidad2tar74=0;
        $scope.precio2tar74=0;
        $scope.cantidad3tar74=0;
        $scope.precio3tar74=0;
        $scope.atraso1tar74=0;
        $scope.atraso2tar74=0;
        $scope.atraso3tar74=0;
        $scope.cantidad1tar75=0;
        $scope.precio1tar75=0;
        $scope.cantidad2tar75=0;
        $scope.precio2tar75=0;
        $scope.cantidad3tar75=0;
        $scope.precio3tar75=0;
        $scope.atraso1tar75=0;
        $scope.atraso2tar75=0;
        $scope.atraso3tar75=0;
        $scope.cantidad1tar76=0;
        $scope.precio1tar76=0;
        $scope.cantidad2tar76=0;
        $scope.precio2tar76=0;
        $scope.cantidad3tar76=0;
        $scope.precio3tar76=0;
        $scope.atraso1tar76=0;
        $scope.atraso2tar76=0;
        $scope.atraso3tar76=0;
        $scope.cantidad1tar77=0;
        $scope.precio1tar77=0;
        $scope.cantidad2tar77=0;
        $scope.precio2tar77=0;
        $scope.cantidad3tar77=0;
        $scope.precio3tar77=0;
        $scope.atraso1tar77=0;
        $scope.atraso2tar77=0;
        $scope.atraso3tar77=0;
        $scope.cantidad1tar78=0;
        $scope.precio1tar78=0;
        $scope.cantidad2tar78=0;
        $scope.precio2tar78=0;
        $scope.cantidad3tar78=0;
        $scope.precio3tar78=0;
        $scope.atraso1tar78=0;
        $scope.atraso2tar78=0;
        $scope.atraso3tar78=0;
        //////////////////////
			$('.dataTableResumen').DataTable().destroy();
	        reclamacionRepository.getResumen().then(function (result) {
	            if (result.data.length > 0) {
	                $scope.resumenes = result.data;
					waitDrawDocument("dataTableResumen", "Resumen Certificados");
                    alertFactory.success('Resumen encontrado correctamente');
                    $scope.anexosInfo = result.data;
                    for (var i = 0; i < $scope.anexosInfo.length; i++) {
                        $scope.cantidadTotal += ($scope.anexosInfo[i].Total);
                            if($scope.anexosInfo[i].idZona == 1){
                                if(result.data[i].cantidad1 != null)
                                    $scope.cantidadNAnexo1 += result.data[i].cantidad1;
                                if(result.data[i].precio1 != null)
                                    $scope.precioNAnexo1 += result.data[i].precio1;
                                if(result.data[i].cantidad2 != null)
                                    $scope.cantidadNAnexo2 += result.data[i].cantidad2;
                                if(result.data[i].precio2 != null)
                                    $scope.precioNAnexo2 += result.data[i].precio2;
                                if(result.data[i].cantidad3 != null)
                                    $scope.cantidadNAnexo3 += result.data[i].cantidad3;
                                if(result.data[i].precio3 != null)
                                    $scope.precioNAnexo3 += result.data[i].precio3;
                                if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atrasoNAnexo1 <= result.data[i].atrasoAnexo1){
                                        $scope.atrasoNAnexo1 = result.data[i].atrasoAnexo1;
                                    }
                                if(result.data[i].atrasoAnexo2 != null)
                                    if($scope.atrasoNAnexo2 <= result.data[i].atrasoAnexo2){
                                        $scope.atrasoNAnexo2 = result.data[i].atrasoAnexo2;
                                    }
                                if(result.data[i].atrasoAnexo3 != null)
                                    if($scope.atrasoNAnexo3 <= result.data[i].atrasoAnexo3){
                                        $scope.atrasoNAnexo3 = result.data[i].atrasoAnexo3;
                                    }

                                if($scope.anexosInfo[i].anexo1 == 1){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad1":result.data[i].cantidad1,
                                                "precio1":result.data[i].precio1,
                                                "atrasoAnexo1": result.data[i].atrasoAnexo1 
                                        } 
                                    anexo1N.push(data);
                                }
                                if($scope.anexosInfo[i].anexo2 == 2){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad2":result.data[i].cantidad2,
                                                "precio2":result.data[i].precio2,
                                                "atrasoAnexo2": result.data[i].atrasoAnexo2 
                                        } 
                                    anexo2N.push(data);
                                }
                                if($scope.anexosInfo[i].anexo3 == 3){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad3":result.data[i].cantidad3,
                                                "precio3":result.data[i].precio3,
                                                "atrasoAnexo3": result.data[i].atrasoAnexo3 
                                        } 
                                    anexo3N.push(data);
                                }
                                if($scope.anexosInfo[i].idTAR == 1){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar1 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar1 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar1 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar1 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar1 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar1 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar1 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar1 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar1 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar1 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar1 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar1 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 9){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar9 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar9 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar9 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar9 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar9 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar9 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar9 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar9 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar9 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar9 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar9 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar9 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 10){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar10 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar10 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar10 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar10 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar10 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar10 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar10 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar10 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar10 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar10 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar10 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar10 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 11){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar11 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar11 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar11 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar11 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar11 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar11 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar11 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar11 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar11 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar11 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar11 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar11 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 12){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar12 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar12 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar12 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar12 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar12 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar12 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar12 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar12 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar12 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar12 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar12 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar12 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 13){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar13 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar13 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar13 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar13 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar13 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar13 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar13 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar13 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar13 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar13 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar13 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar13 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 14){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar14 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar14 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar14 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar14 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar14 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar14 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar14 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar14 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar14 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar14 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar14 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar14 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 17){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar17 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar17 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar17 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar17 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar17 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar17 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar17 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar17 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar17 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar17 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar17 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar17 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 18){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar18 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar18 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar18 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar18 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar18 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar18 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar18 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar18 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar18 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar18 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar18 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar18 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 41){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar41 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar41 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar41 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar41 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar41 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar41 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar41 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar41 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar41 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar41 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar41 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar41 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 42){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar42 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar42 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar42 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar42 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar42 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar42 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar42 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar42 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar42 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar42 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar42 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar42 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 48){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar48 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar48 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar48 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar48 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar48 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar48 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar48 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar48 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar48 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar48 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar48 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar48 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 49){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar49 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar49 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar49 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar49 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar49 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar49 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar49 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar49 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar49 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar49 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar49 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar49 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 50){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar50 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar50 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar50 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar50 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar50 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar50 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar50 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar50 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar50 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar50 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar50 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar50 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 62){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar62 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar62 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar62 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar62 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar62 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar62 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar62 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar62 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar62 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar62 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar62 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar62 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 63){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar63 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar63 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar63 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar63 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar63 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar63 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar63 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar63 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar63 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar63 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar63 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar63 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 64){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar64 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar64 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar64 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar64 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar64 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar64 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar64 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar64 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar64 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar64 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar64 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar64 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 65){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar65 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar65 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar65 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar65 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar65 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar65 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar65 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar65 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar65 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar65 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar65 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar65 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 66){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar66 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar66 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar66 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar66 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar66 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar66 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar66 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar66 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar66 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar66 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar66 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar66 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 77){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar77 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar77 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar77 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar77 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar77 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar77 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar77 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar77 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar77 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar77 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar77 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar77 = result.data[i].atrasoAnexo3;
                                        }

                                }
                            } 

                            if($scope.anexosInfo[i].idZona == 2){
                                if(result.data[i].cantidad1 != null)
                                    $scope.cantidadCAnexo1 += result.data[i].cantidad1;
                                if(result.data[i].precio1 != null)
                                    $scope.precioCAnexo1 += result.data[i].precio1;
                                if(result.data[i].cantidad2 != null)
                                    $scope.cantidadCAnexo2 += result.data[i].cantidad2;
                                if(result.data[i].precio2 != null)
                                    $scope.precioCAnexo2 += result.data[i].precio2;
                                if(result.data[i].cantidad3 != null)
                                    $scope.cantidadCAnexo3 += result.data[i].cantidad3;
                                if(result.data[i].precio3 != null)
                                    $scope.precioCAnexo3 += result.data[i].precio3;
                                if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atrasoCAnexo1 <= result.data[i].atrasoAnexo1){
                                        $scope.atrasoCAnexo1 = result.data[i].atrasoAnexo1;
                                    }
                                if(result.data[i].atrasoAnexo2 != null)
                                    if($scope.atrasoCAnexo2 <= result.data[i].atrasoAnexo2){
                                        $scope.atrasoCAnexo2 = result.data[i].atrasoAnexo2;
                                    }
                                if(result.data[i].atrasoAnexo3 != null)
                                    if($scope.atrasoCAnexo3 <= result.data[i].atrasoAnexo3){
                                        $scope.atrasoCAnexo3 = result.data[i].atrasoAnexo3;
                                    }
                                if($scope.anexosInfo[i].anexo1 == 1){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad1":result.data[i].cantidad1,
                                                "precio1":result.data[i].precio1,
                                                "atrasoAnexo1": result.data[i].atrasoAnexo1 
                                        } 
                                    anexo1C.push(data);
                                }
                                if($scope.anexosInfo[i].anexo2 == 2){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad2":result.data[i].cantidad2,
                                                "precio2":result.data[i].precio2,
                                                "atrasoAnexo2": result.data[i].atrasoAnexo2 
                                        } 
                                    anexo2C.push(data);
                                }
                                if($scope.anexosInfo[i].anexo3 == 3){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad3":result.data[i].cantidad3,
                                                "precio3":result.data[i].precio3,
                                                "atrasoAnexo3": result.data[i].atrasoAnexo3 
                                        } 
                                    anexo3C.push(data);
                                }
                                if($scope.anexosInfo[i].idTAR == 19){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar19 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar19 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar19 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar19 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar19 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar19 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar19 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar19 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar19 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar19 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar19 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar19 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 20){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar20 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar20 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar20 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar20 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar20 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar20 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar20 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar20 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar20 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar20 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar20 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar20 = result.data[i].atrasoAnexo3;
                                        }

                                }
                                if($scope.anexosInfo[i].idTAR == 21){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar21 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar21 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar21 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar21 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar21 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar21 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar21 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar21 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar21 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar21 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar21 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar21 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 22){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar22 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar22 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar22 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar22 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar22 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar22 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar22 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar22 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar22 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar22 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar22 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar22 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 23){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar23 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar23 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar23 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar23 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar23 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar23 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar23 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar23 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar23 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar23 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar23 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar23 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 24){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar24 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar24 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar24 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar24 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar24 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar24 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar24 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar24 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar24 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar24 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar24 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar24 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 26){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar26 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar26 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar26 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar26 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar26 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar26 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar26 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar26 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar26 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar26 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar26 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar26 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 27){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar27 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar27 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar27 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar27 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar27 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar27 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar27 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar27 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar27 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar27 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar27 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar27 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 28){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar28 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar28 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar28 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar28 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar28 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar28 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar28 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar28 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar28 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar28 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar28 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar28 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 31){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar31 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar31 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar31 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar31 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar31 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar31 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar31 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar31 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar31 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar31 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar31 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar31 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 32){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar32 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar32 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar32 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar32 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar32 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar32 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar32 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar32 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar32 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar32 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar32 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar32 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 33){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar33 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar33 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar33 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar33 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar33 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar33 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar33 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar33 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar33 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar33 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar33 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar33 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 35){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar35 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar35 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar35 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar35 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar35 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar35 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar35 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar35 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar35 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar35 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar35 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar35 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 36){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar36 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar36 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar36 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar36 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar36 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar36 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar36 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar36 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar36 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar36 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar36 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar36 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 37){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar37 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar37 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar37 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar37 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar37 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar37 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar37 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar37 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar37 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar37 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar37 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar37 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 38){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar38 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar38 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar38 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar38 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar38 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar38 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar38 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar38 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar38 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar38 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar38 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar38 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 39){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar39 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar39 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar39 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar39 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar39 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar39 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar39 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar39 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar39 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar39 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar39 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar39 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 47){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar47 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar47 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar47 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar47 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar47 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar47 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar47 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar47 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar47 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar47 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar47 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar47 = result.data[i].atrasoAnexo3;
                                        }
                                }
                                if($scope.anexosInfo[i].idTAR == 79){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar79 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar79 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar79 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar79 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar79 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar79 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar79 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar79 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar79 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar79 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar79 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar79 = result.data[i].atrasoAnexo3;
                                        }
                                }
                            }
                            if($scope.anexosInfo[i].idZona == 3){
                                if(result.data[i].cantidad1 != null)
                                    $scope.cantidadPAnexo1 += result.data[i].cantidad1;
                                if(result.data[i].precio1 != null)
                                    $scope.precioPAnexo1 += result.data[i].precio1;
                                if(result.data[i].cantidad2 != null)
                                    $scope.cantidadPAnexo2 += result.data[i].cantidad2;
                                if(result.data[i].precio2 != null)
                                    $scope.precioPAnexo2 += result.data[i].precio2;
                                if(result.data[i].cantidad3 != null)
                                    $scope.cantidadPAnexo3 += result.data[i].cantidad3;
                                if(result.data[i].precio3 != null)
                                    $scope.precioPAnexo3 += result.data[i].precio3;
                                if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atrasoPAnexo1 <= result.data[i].atrasoAnexo1){
                                        $scope.atrasoPAnexo1 = result.data[i].atrasoAnexo1;
                                    }
                                if(result.data[i].atrasoAnexo2 != null)
                                    if($scope.atrasoPAnexo2 <= result.data[i].atrasoAnexo2){
                                        $scope.atrasoPAnexo2 = result.data[i].atrasoAnexo2;
                                    }
                                if(result.data[i].atrasoAnexo3 != null)
                                    if($scope.atrasoPAnexo3 <= result.data[i].atrasoAnexo3){
                                        $scope.atrasoPAnexo3 = result.data[i].atrasoAnexo3;
                                    }
                                if($scope.anexosInfo[i].anexo1 == 1){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad1":result.data[i].cantidad1,
                                                "precio1":result.data[i].precio1,
                                                "atrasoAnexo1": result.data[i].atrasoAnexo1 
                                        } 
                                    anexo1P.push(data);
                                }
                                if($scope.anexosInfo[i].anexo2 == 2){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad2":result.data[i].cantidad2,
                                                "precio2":result.data[i].precio2,
                                                "atrasoAnexo2": result.data[i].atrasoAnexo2 
                                        } 
                                    anexo2P.push(data);
                                }
                                if($scope.anexosInfo[i].anexo3 == 3){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad3":result.data[i].cantidad3,
                                                "precio3":result.data[i].precio3,
                                                "atrasoAnexo3": result.data[i].atrasoAnexo3 
                                        } 
                                    anexo3P.push(data);
                                }
                                if($scope.anexosInfo[i].idTAR == 2){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar2 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar2 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar2 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar2 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar2 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar2 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar2 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar2 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar2 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar2 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar2 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar2 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 3){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar3 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar3 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar3 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar3 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar3 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar3 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar3 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar3 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar3 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar3 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar3 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar3 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 4){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar4 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar4 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar4 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar4 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar4 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar4 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar4 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar4 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar4 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar4 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar4 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar4 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 5){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar5 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar5 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar5 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar5 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar5 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar5 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar5 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar5 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar5 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar5 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar5 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar5 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 15){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar15 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar15 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar15 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar15 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar15 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar15 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar15 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar15 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar15 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar15 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar15 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar15 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 16){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar16 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar16 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar16 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar16 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar16 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar16 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar16 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar16 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar16 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar16 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar16 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar16 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 25){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar25 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar25 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar25 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar25 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar25 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar25 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar25 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar25 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar25 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar25 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar25 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar25 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 29){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar29 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar29 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar29 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar29 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar29 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar29 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar29 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar29 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar29 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar29 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar29 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar29 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 30){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar30 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar30 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar30 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar30 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar30 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar30 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar30 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar30 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar30 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar30 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar30 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar30 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 34){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar34 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar34 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar34 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar34 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar34 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar34 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar34 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar34 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar34 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar34 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar34 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar34 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 40){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar40 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar40 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar40 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar40 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar40 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar40 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar40 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar40 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar40 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar40 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar40 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar40 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 51){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar51 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar51 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar51 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar51 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar51 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar51 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar51 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar51 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar51 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar51 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar51 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar51 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 52){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar52 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar52 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar52 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar52 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar52 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar52 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar52 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar52 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar52 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar52 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar52 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar52 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 53){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar53 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar53 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar53 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar53 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar53 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar53 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar53 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar53 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar53 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar53 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar53 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar53 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 54){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar54 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar54 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar54 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar54 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar54 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar54 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar54 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar54 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar54 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar54 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar54 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar54 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 55){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar55 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar55 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar55 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar55 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar55 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar55 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar55 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar55 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar55 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar55 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar55 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar55 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 56){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar56 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar56 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar56 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar56 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar56 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar56 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar56 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar56 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar56 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar56 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar56 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar56 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 57){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar57 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar57 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar57 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar57 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar57 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar57 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar57 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar57 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar57 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar57 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar57 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar57 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 58){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar58 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar58 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar58 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar58 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar58 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar58 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar58 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar58 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar58 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar58 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar58 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar58 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 59){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar59 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar59 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar59 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar59 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar59 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar59 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar59 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar59 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar59 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar59 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar59 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar59 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 60){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar60 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar60 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar60 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar60 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar60 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar60 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar60 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar60 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar60 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar60 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar60 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar60 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }

                            }
                            if($scope.anexosInfo[i].idZona == 4){
                                if(result.data[i].cantidad1 != null)
                                    $scope.cantidadGAnexo1 += result.data[i].cantidad1;
                                if(result.data[i].precio1 != null)
                                    $scope.precioGAnexo1 += result.data[i].precio1;
                                if(result.data[i].cantidad2 != null)
                                    $scope.cantidadGAnexo2 += result.data[i].cantidad2;
                                if(result.data[i].precio2 != null)
                                    $scope.precioGAnexo2 += result.data[i].precio2;
                                if(result.data[i].cantidad3 != null)
                                    $scope.cantidadGAnexo3 += result.data[i].cantidad3;
                                if(result.data[i].precio3 != null)
                                    $scope.precioGAnexo3 += result.data[i].precio3;
                                if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atrasoGAnexo1 <= result.data[i].atrasoAnexo1){
                                        $scope.atrasoGAnexo1 = result.data[i].atrasoAnexo1;
                                    }
                                if(result.data[i].atrasoAnexo2 != null)
                                    if($scope.atrasoGAnexo2 <= result.data[i].atrasoAnexo2){
                                        $scope.atrasoGAnexo2 = result.data[i].atrasoAnexo2;
                                    }
                                if(result.data[i].atrasoAnexo3 != null)
                                    if($scope.atrasoGAnexo3 <= result.data[i].atrasoAnexo3){
                                        $scope.atrasoGAnexo3 = result.data[i].atrasoAnexo3;
                                    }
                                if($scope.anexosInfo[i].anexo1 == 1){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad1":result.data[i].cantidad1,
                                                "precio1":result.data[i].precio1,
                                                "atrasoAnexo1": result.data[i].atrasoAnexo1 
                                        } 
                                    anexo1G.push(data);
                                }
                                if($scope.anexosInfo[i].anexo2 == 2){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad2":result.data[i].cantidad2,
                                                "precio2":result.data[i].precio2,
                                                "atrasoAnexo2": result.data[i].atrasoAnexo2 
                                        } 
                                    anexo2G.push(data);
                                }
                                if($scope.anexosInfo[i].anexo3 == 3){
                                    var data = {
                                                "zona":result.data[i].zona,
                                                "TAR":result.data[i].TAR,
                                                "cantidad3":result.data[i].cantidad3,
                                                "precio3":result.data[i].precio3,
                                                "atrasoAnexo3": result.data[i].atrasoAnexo3 
                                        } 
                                    anexo3G.push(data);
                                }
                                if($scope.anexosInfo[i].idTAR == 6){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar6 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar6 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar6 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar6 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar6 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar6 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar6 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar6 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar6 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar6 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar6 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar6 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 7){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar7 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar7 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar7 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar7 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar7 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar7 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar7 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar7 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar7 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar7 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar7 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar7 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 8){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar8 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar8 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar8 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar8 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar8 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar8 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar8 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar8 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar8 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar8 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar8 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar8 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 43){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar43 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar43 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar43 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar43 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar43 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar43 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar43 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar43 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar43 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar43 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar43 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar43 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 44){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar44 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar44 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar44 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar44 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar44 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar44 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar44 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar44 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar44 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar44 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar44 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar44 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 45){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar45 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar45 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar45 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar45 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar45 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar45 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar45 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar45 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar45 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar45 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar45 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar45 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 46){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar46 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar46 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar46 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar46 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar46 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar46 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar46 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar46 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar46 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar46 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar46 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar46 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 61){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar61 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar61 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar61 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar61 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar61 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar61 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar61 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar61 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar61 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar61 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar61 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar61 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 67){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar67 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar67 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar67 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar67 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar67 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar67 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar67 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar67 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar67 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar67 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar67 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar67 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 68){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar68 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar68 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar68 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar68 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar68 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar68 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar68 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar68 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar68 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar68 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar68 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar68 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 69){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar69 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar69 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar69 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar69 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar69 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar69 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar69 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar69 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar69 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar69 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar69 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar69 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 70){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar70 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar70 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar70 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar70 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar70 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar70 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar70 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar70 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar70 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar70 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar70 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar70 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 72){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar72 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar72 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar72 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar72 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar72 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar72 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar72 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar72 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar72 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar72 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar72 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar72 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 73){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar73 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar73 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar73 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar73 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar73 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar73 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar73 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar73 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar73 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar73 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar73 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar73 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 74){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar74 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar74 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar74 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar74 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar74 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar74 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar74 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar74 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar74 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar74 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar74 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar74 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 75){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar75 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar75 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar75 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar75 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar75 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar75 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar75 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar75 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar75 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar75 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar75 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar75 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 76){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar76 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar76 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar76 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar76 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar76 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar76 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar76 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar76 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar76 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar76 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar76 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar76 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }
                                if($scope.anexosInfo[i].idTAR == 78){
                                    if(result.data[i].cantidad1 != null)
                                        $scope.cantidad1tar78 += result.data[i].cantidad1;
                                    if(result.data[i].precio1 != null)
                                        $scope.precio1tar78 += result.data[i].precio1;
                                    if(result.data[i].cantidad2 != null)
                                        $scope.cantidad2tar78 += result.data[i].cantidad2;
                                    if(result.data[i].precio2 != null)
                                        $scope.precio2tar78 += result.data[i].precio2;
                                    if(result.data[i].cantidad3 != null)
                                        $scope.cantidad3tar78 += result.data[i].cantidad3;
                                    if(result.data[i].precio3 != null)
                                        $scope.precio3tar78 += result.data[i].precio3;
                                    if(result.data[i].atrasoAnexo1 != null)
                                    if($scope.atraso1tar78 <= result.data[i].atrasoAnexo1){
                                        $scope.atraso1tar78 = result.data[i].atrasoAnexo1;
                                    }
                                    if(result.data[i].atrasoAnexo2 != null)
                                        if($scope.atraso2tar78 <= result.data[i].atrasoAnexo2){
                                            $scope.atraso2tar78 = result.data[i].atrasoAnexo2;
                                        }
                                    if(result.data[i].atrasoAnexo3 != null)
                                        if($scope.atraso3tar78 <= result.data[i].atrasoAnexo3){
                                            $scope.atraso3tar78 = result.data[i].atrasoAnexo3;
                                        }                                    
                                }

                            }      
                    }

                    $scope.total1tar1=0;
                    $scope.total1tar2=0;
                    $scope.total1tar3=0;
                    $scope.total1tar4=0;
                    $scope.total1tar5=0;
                    $scope.total1tar6=0;
                    $scope.total1tar7=0;
                    $scope.total1tar8=0;
                    $scope.total1tar9=0;
                    $scope.total1tar10=0;
                    $scope.total1tar11=0;
                    $scope.total1tar12=0;
                    $scope.total1tar13=0;
                    $scope.total1tar14=0;
                    $scope.total1tar15=0;
                    $scope.total1tar16=0;
                    $scope.total1tar17=0;
                    $scope.total1tar18=0;
                    $scope.total1tar19=0;
                    $scope.total1tar20=0;
                    $scope.total1tar21=0;
                    $scope.total1tar22=0;
                    $scope.total1tar23=0;
                    $scope.total1tar24=0;
                    $scope.total1tar25=0;
                    $scope.total1tar26=0;
                    $scope.total1tar27=0;
                    $scope.total1tar28=0;
                    $scope.total1tar29=0;
                    $scope.total1tar30=0;
                    $scope.total1tar31=0;
                    $scope.total1tar32=0;
                    $scope.total1tar33=0;
                    $scope.total1tar34=0;
                    $scope.total1tar35=0;
                    $scope.total1tar36=0;
                    $scope.total1tar37=0;
                    $scope.total1tar38=0;
                    $scope.total1tar39=0;
                    $scope.total1tar40=0;
                    $scope.total1tar41=0;
                    $scope.total1tar42=0;
                    $scope.total1tar43=0;
                    $scope.total1tar44=0;
                    $scope.total1tar45=0;
                    $scope.total1tar46=0;
                    $scope.total1tar47=0;
                    $scope.total1tar48=0;
                    $scope.total1tar49=0;
                    $scope.total1tar50=0;
                    $scope.total1tar51=0;
                    $scope.total1tar52=0;
                    $scope.total1tar53=0;
                    $scope.total1tar54=0;
                    $scope.total1tar55=0;
                    $scope.total1tar56=0;
                    $scope.total1tar57=0;
                    $scope.total1tar58=0;
                    $scope.total1tar59=0;
                    $scope.total1tar60=0;
                    $scope.total1tar61=0;
                    $scope.total1tar62=0;
                    $scope.total1tar63=0;
                    $scope.total1tar64=0;
                    $scope.total1tar65=0;
                    $scope.total1tar66=0;
                    $scope.total1tar67=0;
                    $scope.total1tar68=0;
                    $scope.total1tar69=0;
                    $scope.total1tar70=0;
                    $scope.total1tar71=0;
                    $scope.total1tar72=0;
                    $scope.total1tar73=0;
                    $scope.total1tar74=0;
                    $scope.total1tar75=0;
                    $scope.total1tar76=0;
                    $scope.total1tar77=0;
                    $scope.total1tar78=0;

            $scope.total1tar1=$scope.atraso1tar1+$scope.atraso2tar1+$scope.atraso3tar1;
            $scope.total1tar2=$scope.atraso1tar2+$scope.atraso2tar2+$scope.atraso3tar2;
            $scope.total1tar3=$scope.atraso1tar3+$scope.atraso2tar3+$scope.atraso3tar3;
            $scope.total1tar4=$scope.atraso1tar4+$scope.atraso2tar4+$scope.atraso3tar4;
            $scope.total1tar5=$scope.atraso1tar5+$scope.atraso2tar5+$scope.atraso3tar5;
            $scope.total1tar6=$scope.atraso1tar6+$scope.atraso2tar6+$scope.atraso3tar6;
            $scope.total1tar7=$scope.atraso1tar7+$scope.atraso2tar7+$scope.atraso3tar7;
            $scope.total1tar8=$scope.atraso1tar8+$scope.atraso2tar8+$scope.atraso3tar8;
            $scope.total1tar9=$scope.atraso1tar9+$scope.atraso2tar9+$scope.atraso3tar9;
            $scope.total1tar10=$scope.atraso1tar10+$scope.atraso2tar10+$scope.atraso3tar10;
            $scope.total1tar11=$scope.atraso1tar11+$scope.atraso2tar11+$scope.atraso3tar11;
            $scope.total1tar12=$scope.atraso1tar12+$scope.atraso2tar12+$scope.atraso3tar12;
            $scope.total1tar13=$scope.atraso1tar13+$scope.atraso2tar13+$scope.atraso3tar13;
            $scope.total1tar14=$scope.atraso1tar14+$scope.atraso2tar14+$scope.atraso3tar14;
            $scope.total1tar15=$scope.atraso1tar15+$scope.atraso2tar15+$scope.atraso3tar15;
            $scope.total1tar16=$scope.atraso1tar16+$scope.atraso2tar16+$scope.atraso3tar16;
            $scope.total1tar17=$scope.atraso1tar17+$scope.atraso2tar17+$scope.atraso3tar17;
            $scope.total1tar18=$scope.atraso1tar18+$scope.atraso2tar18+$scope.atraso3tar18;
            $scope.total1tar19=$scope.atraso1tar19+$scope.atraso2tar19+$scope.atraso3tar19;
            $scope.total1tar20=$scope.atraso1tar20+$scope.atraso2tar20+$scope.atraso3tar20;
            $scope.total1tar21=$scope.atraso1tar21+$scope.atraso2tar21+$scope.atraso3tar21;
            $scope.total1tar22=$scope.atraso1tar22+$scope.atraso2tar22+$scope.atraso3tar22;
            $scope.total1tar23=$scope.atraso1tar23+$scope.atraso2tar23+$scope.atraso3tar23;
            $scope.total1tar24=$scope.atraso1tar24+$scope.atraso2tar24+$scope.atraso3tar24;
            $scope.total1tar25=$scope.atraso1tar25+$scope.atraso2tar25+$scope.atraso3tar25;
            $scope.total1tar26=$scope.atraso1tar26+$scope.atraso2tar26+$scope.atraso3tar26;
            $scope.total1tar27=$scope.atraso1tar27+$scope.atraso2tar27+$scope.atraso3tar27;
            $scope.total1tar28=$scope.atraso1tar28+$scope.atraso2tar28+$scope.atraso3tar28;
            $scope.total1tar29=$scope.atraso1tar29+$scope.atraso2tar29+$scope.atraso3tar29;
            $scope.total1tar30=$scope.atraso1tar30+$scope.atraso2tar30+$scope.atraso3tar30;
            $scope.total1tar31=$scope.atraso1tar31+$scope.atraso2tar31+$scope.atraso3tar31;
            $scope.total1tar32=$scope.atraso1tar32+$scope.atraso2tar32+$scope.atraso3tar32;
            $scope.total1tar33=$scope.atraso1tar33+$scope.atraso2tar33+$scope.atraso3tar33;
            $scope.total1tar34=$scope.atraso1tar34+$scope.atraso2tar34+$scope.atraso3tar34;
            $scope.total1tar35=$scope.atraso1tar35+$scope.atraso2tar35+$scope.atraso3tar35;
            $scope.total1tar36=$scope.atraso1tar36+$scope.atraso2tar36+$scope.atraso3tar36;
            $scope.total1tar37=$scope.atraso1tar37+$scope.atraso2tar37+$scope.atraso3tar37;
            $scope.total1tar38=$scope.atraso1tar38+$scope.atraso2tar38+$scope.atraso3tar38;
            $scope.total1tar39=$scope.atraso1tar39+$scope.atraso2tar39+$scope.atraso3tar39;
            $scope.total1tar40=$scope.atraso1tar40+$scope.atraso2tar40+$scope.atraso3tar40;
            $scope.total1tar41=$scope.atraso1tar41+$scope.atraso2tar41+$scope.atraso3tar41;
            $scope.total1tar42=$scope.atraso1tar42+$scope.atraso2tar42+$scope.atraso3tar42;
            $scope.total1tar43=$scope.atraso1tar43+$scope.atraso2tar43+$scope.atraso3tar43;
            $scope.total1tar44=$scope.atraso1tar44+$scope.atraso2tar44+$scope.atraso3tar44;
            $scope.total1tar45=$scope.atraso1tar45+$scope.atraso2tar45+$scope.atraso3tar45;
            $scope.total1tar46=$scope.atraso1tar46+$scope.atraso2tar46+$scope.atraso3tar46;
            $scope.total1tar47=$scope.atraso1tar47+$scope.atraso2tar47+$scope.atraso3tar47;
            $scope.total1tar48=$scope.atraso1tar48+$scope.atraso2tar48+$scope.atraso3tar48;
            $scope.total1tar49=$scope.atraso1tar49+$scope.atraso2tar49+$scope.atraso3tar49;
            $scope.total1tar50=$scope.atraso1tar50+$scope.atraso2tar50+$scope.atraso3tar50;
            $scope.total1tar51=$scope.atraso1tar51+$scope.atraso2tar51+$scope.atraso3tar51;
            $scope.total1tar52=$scope.atraso1tar52+$scope.atraso2tar52+$scope.atraso3tar52;
            $scope.total1tar53=$scope.atraso1tar53+$scope.atraso2tar53+$scope.atraso3tar53;
            $scope.total1tar54=$scope.atraso1tar54+$scope.atraso2tar54+$scope.atraso3tar54;
            $scope.total1tar55=$scope.atraso1tar55+$scope.atraso2tar55+$scope.atraso3tar55;
            $scope.total1tar56=$scope.atraso1tar56+$scope.atraso2tar56+$scope.atraso3tar56;
            $scope.total1tar57=$scope.atraso1tar57+$scope.atraso2tar57+$scope.atraso3tar57;
            $scope.total1tar58=$scope.atraso1tar58+$scope.atraso2tar58+$scope.atraso3tar58;
            $scope.total1tar59=$scope.atraso1tar59+$scope.atraso2tar59+$scope.atraso3tar59;
            $scope.total1tar60=$scope.atraso1tar60+$scope.atraso2tar60+$scope.atraso3tar60;
            $scope.total1tar61=$scope.atraso1tar61+$scope.atraso2tar61+$scope.atraso3tar61;
            $scope.total1tar62=$scope.atraso1tar62+$scope.atraso2tar62+$scope.atraso3tar62;
            $scope.total1tar63=$scope.atraso1tar63+$scope.atraso2tar63+$scope.atraso3tar63;
            $scope.total1tar64=$scope.atraso1tar64+$scope.atraso2tar64+$scope.atraso3tar64;
            $scope.total1tar65=$scope.atraso1tar65+$scope.atraso2tar65+$scope.atraso3tar65;
            $scope.total1tar66=$scope.atraso1tar66+$scope.atraso2tar66+$scope.atraso3tar66;
            $scope.total1tar67=$scope.atraso1tar67+$scope.atraso2tar67+$scope.atraso3tar67;
            $scope.total1tar68=$scope.atraso1tar68+$scope.atraso2tar68+$scope.atraso3tar68;
            $scope.total1tar69=$scope.atraso1tar69+$scope.atraso2tar69+$scope.atraso3tar69;
            $scope.total1tar70=$scope.atraso1tar70+$scope.atraso2tar70+$scope.atraso3tar70;
            $scope.total1tar71=$scope.atraso1tar71+$scope.atraso2tar71+$scope.atraso3tar71;
            $scope.total1tar72=$scope.atraso1tar72+$scope.atraso2tar72+$scope.atraso3tar72;
            $scope.total1tar73=$scope.atraso1tar73+$scope.atraso2tar73+$scope.atraso3tar73;
            $scope.total1tar74=$scope.atraso1tar74+$scope.atraso2tar74+$scope.atraso3tar74;
            $scope.total1tar75=$scope.atraso1tar75+$scope.atraso2tar75+$scope.atraso3tar75;
            $scope.total1tar76=$scope.atraso1tar76+$scope.atraso2tar76+$scope.atraso3tar76;
            $scope.total1tar77=$scope.atraso1tar77+$scope.atraso2tar77+$scope.atraso3tar77;
            $scope.total1tar78=$scope.atraso1tar78+$scope.atraso2tar78+$scope.atraso3tar78;

                var tar1 = {       
                "cantidad1":$scope.cantidad1tar1,
                "precio1":$scope.precio1tar1,
                "cantidad2":$scope.cantidad2tar1,
                "precio2":$scope.precio2tar1,
                "cantidad3":$scope.cantidad3tar1,
                "precio3":$scope.precio3tar1,
                "atrasoAnexo1":$scope.atraso1tar1,
                "atrasoAnexo2":$scope.atraso2tar1,
                "atrasoAnexo3":$scope.atraso3tar1,
                "atrasoAnexo":$scope.total1tar1
                }
                var tar2 = { 
                "cantidad1":$scope.cantidad1tar2,
                "precio1":$scope.precio1tar2,
                "cantidad2":$scope.cantidad2tar2,
                "precio2":$scope.precio2tar2,
                "cantidad3":$scope.cantidad3tar2,
                "precio3":$scope.precio3tar2,
                "atrasoAnexo1":$scope.atraso1tar2,
                "atrasoAnexo2":$scope.atraso2tar2,
                "atrasoAnexo3":$scope.atraso3tar2,
                "atrasoAnexo":$scope.total1tar2
                }
                var tar3 = { 
                "cantidad1":$scope.cantidad1tar3,
                "precio1":$scope.precio1tar3,
                "cantidad2":$scope.cantidad2tar3,
                "precio2":$scope.precio2tar3,
                "cantidad3":$scope.cantidad3tar3,
                "precio3":$scope.precio3tar3,
                "atrasoAnexo1":$scope.atraso1tar3,
                "atrasoAnexo2":$scope.atraso2tar3,
                "atrasoAnexo3":$scope.atraso3tar3,
                "atrasoAnexo":$scope.total1tar3
                }
                var tar4 = { 
                "cantidad1":$scope.cantidad1tar4,
                "precio1":$scope.precio1tar4,
                "cantidad2":$scope.cantidad2tar4,
                "precio2":$scope.precio2tar4,
                "cantidad3":$scope.cantidad3tar4,
                "precio3":$scope.precio3tar4,
                "atrasoAnexo1":$scope.atraso1tar4,
                "atrasoAnexo2":$scope.atraso2tar4,
                "atrasoAnexo3":$scope.atraso3tar4,
                "atrasoAnexo":$scope.total1tar4
                }
                var tar5 = { 
                "cantidad1":$scope.cantidad1tar5,
                "precio1":$scope.precio1tar5,
                "cantidad2":$scope.cantidad2tar5,
                "precio2":$scope.precio2tar5,
                "cantidad3":$scope.cantidad3tar5,
                "precio3":$scope.precio3tar5,
                "atrasoAnexo1":$scope.atraso1tar5,
                "atrasoAnexo2":$scope.atraso2tar5,
                "atrasoAnexo3":$scope.atraso3tar5,
                "atrasoAnexo":$scope.total1tar5
                }
                var tar6 = { 
                "cantidad1":$scope.cantidad1tar6,
                "precio1":$scope.precio1tar6,
                "cantidad2":$scope.cantidad2tar6,
                "precio2":$scope.precio2tar6,
                "cantidad3":$scope.cantidad3tar6,
                "precio3":$scope.precio3tar6,
                "atrasoAnexo1":$scope.atraso1tar6,
                "atrasoAnexo2":$scope.atraso2tar6,
                "atrasoAnexo3":$scope.atraso3tar6,
                "atrasoAnexo":$scope.total1tar6
                }
                var tar7 = { 
                "cantidad1":$scope.cantidad1tar7,
                "precio1":$scope.precio1tar7,
                "cantidad2":$scope.cantidad2tar7,
                "precio2":$scope.precio2tar7,
                "cantidad3":$scope.cantidad3tar7,
                "precio3":$scope.precio3tar7,
                "atrasoAnexo1":$scope.atraso1tar7,
                "atrasoAnexo2":$scope.atraso2tar7,
                "atrasoAnexo3":$scope.atraso3tar7,
                "atrasoAnexo":$scope.total1tar7
                }
                var tar8 = { 
                "cantidad1":$scope.cantidad1tar8,
                "precio1":$scope.precio1tar8,
                "cantidad2":$scope.cantidad2tar8,
                "precio2":$scope.precio2tar8,
                "cantidad3":$scope.cantidad3tar8,
                "precio3":$scope.precio3tar8,
                "atrasoAnexo1":$scope.atraso1tar8,
                "atrasoAnexo2":$scope.atraso2tar8,
                "atrasoAnexo3":$scope.atraso3tar8,
                "atrasoAnexo":$scope.total1tar8
                }
                var tar9 = { 
                "cantidad1":$scope.cantidad1tar9,
                "precio1":$scope.precio1tar9,
                "cantidad2":$scope.cantidad2tar9,
                "precio2":$scope.precio2tar9,
                "cantidad3":$scope.cantidad3tar9,
                "precio3":$scope.precio3tar9,
                "atrasoAnexo1":$scope.atraso1tar9,
                "atrasoAnexo2":$scope.atraso2tar9,
                "atrasoAnexo3":$scope.atraso3tar9,
                "atrasoAnexo":$scope.total1tar9
                }
                var tar10 = { 
                "cantidad1":$scope.cantidad1tar10,
                "precio1":$scope.precio1tar10,
                "cantidad2":$scope.cantidad2tar10,
                "precio2":$scope.precio2tar10,
                "cantidad3":$scope.cantidad3tar10,
                "precio3":$scope.precio3tar10,
                "atrasoAnexo1":$scope.atraso1tar10,
                "atrasoAnexo2":$scope.atraso2tar10,
                "atrasoAnexo3":$scope.atraso3tar10,
                "atrasoAnexo":$scope.total1tar10
                }
                var tar11 = { 
                "cantidad1":$scope.cantidad1tar11,
                "precio1":$scope.precio1tar11,
                "cantidad2":$scope.cantidad2tar11,
                "precio2":$scope.precio2tar11,
                "cantidad3":$scope.cantidad3tar11,
                "precio3":$scope.precio3tar11,
                "atrasoAnexo1":$scope.atraso1tar11,
                "atrasoAnexo2":$scope.atraso2tar11,
                "atrasoAnexo3":$scope.atraso3tar11,
                "atrasoAnexo":$scope.total1tar11
                }
                var tar12 = { 
                "cantidad1":$scope.cantidad1tar12,
                "precio1":$scope.precio1tar12,
                "cantidad2":$scope.cantidad2tar12,
                "precio2":$scope.precio2tar12,
                "cantidad3":$scope.cantidad3tar12,
                "precio3":$scope.precio3tar12,
                "atrasoAnexo1":$scope.atraso1tar12,
                "atrasoAnexo2":$scope.atraso2tar12,
                "atrasoAnexo3":$scope.atraso3tar12,
                "atrasoAnexo":$scope.total1tar12
                }
                var tar13 = { 
                "cantidad1":$scope.cantidad1tar13,
                "precio1":$scope.precio1tar13,
                "cantidad2":$scope.cantidad2tar13,
                "precio2":$scope.precio2tar13,
                "cantidad3":$scope.cantidad3tar13,
                "precio3":$scope.precio3tar13,
                "atrasoAnexo1":$scope.atraso1tar13,
                "atrasoAnexo2":$scope.atraso2tar13,
                "atrasoAnexo3":$scope.atraso3tar13,
                "atrasoAnexo":$scope.total1tar13
                }
                var tar14 = { 
                "cantidad1":$scope.cantidad1tar14,
                "precio1":$scope.precio1tar14,
                "cantidad2":$scope.cantidad2tar14,
                "precio2":$scope.precio2tar14,
                "cantidad3":$scope.cantidad3tar14,
                "precio3":$scope.precio3tar14,
                "atrasoAnexo1":$scope.atraso1tar14,
                "atrasoAnexo2":$scope.atraso2tar14,
                "atrasoAnexo3":$scope.atraso3tar14,
                "atrasoAnexo":$scope.total1tar14
                }
                var tar15 = { 
                "cantidad1":$scope.cantidad1tar15,
                "precio1":$scope.precio1tar15,
                "cantidad2":$scope.cantidad2tar15,
                "precio2":$scope.precio2tar15,
                "cantidad3":$scope.cantidad3tar15,
                "precio3":$scope.precio3tar15,
                "atrasoAnexo1":$scope.atraso1tar15,
                "atrasoAnexo2":$scope.atraso2tar15,
                "atrasoAnexo3":$scope.atraso3tar15,
                "atrasoAnexo":$scope.total1tar15
                }
                var tar16 = { 
                "cantidad1":$scope.cantidad1tar16,
                "precio1":$scope.precio1tar16,
                "cantidad2":$scope.cantidad2tar16,
                "precio2":$scope.precio2tar16,
                "cantidad3":$scope.cantidad3tar16,
                "precio3":$scope.precio3tar16,
                "atrasoAnexo1":$scope.atraso1tar16,
                "atrasoAnexo2":$scope.atraso2tar16,
                "atrasoAnexo3":$scope.atraso3tar16,
                "atrasoAnexo":$scope.total1tar16
                }
                var tar17 = { 
                "cantidad1":$scope.cantidad1tar17,
                "precio1":$scope.precio1tar17,
                "cantidad2":$scope.cantidad2tar17,
                "precio2":$scope.precio2tar17,
                "cantidad3":$scope.cantidad3tar17,
                "precio3":$scope.precio3tar17,
                "atrasoAnexo1":$scope.atraso1tar17,
                "atrasoAnexo2":$scope.atraso2tar17,
                "atrasoAnexo3":$scope.atraso3tar17,
                "atrasoAnexo":$scope.total1tar17
                }
                var tar18 = { 
                "cantidad1":$scope.cantidad1tar18,
                "precio1":$scope.precio1tar18,
                "cantidad2":$scope.cantidad2tar18,
                "precio2":$scope.precio2tar18,
                "cantidad3":$scope.cantidad3tar18,
                "precio3":$scope.precio3tar18,
                "atrasoAnexo1":$scope.atraso1tar18,
                "atrasoAnexo2":$scope.atraso2tar18,
                "atrasoAnexo3":$scope.atraso3tar18,
                "atrasoAnexo":$scope.total1tar18
                }
                var tar19 = { 
                "cantidad1":$scope.cantidad1tar19,
                "precio1":$scope.precio1tar19,
                "cantidad2":$scope.cantidad2tar19,
                "precio2":$scope.precio2tar19,
                "cantidad3":$scope.cantidad3tar19,
                "precio3":$scope.precio3tar19,
                "atrasoAnexo1":$scope.atraso1tar19,
                "atrasoAnexo2":$scope.atraso2tar19,
                "atrasoAnexo3":$scope.atraso3tar19,
                "atrasoAnexo":$scope.total1tar19
                }
                var tar20 = { 
                "cantidad1":$scope.cantidad1tar20,
                "precio1":$scope.precio1tar20,
                "cantidad2":$scope.cantidad2tar20,
                "precio2":$scope.precio2tar20,
                "cantidad3":$scope.cantidad3tar20,
                "precio3":$scope.precio3tar20,
                "atrasoAnexo1":$scope.atraso1tar20,
                "atrasoAnexo2":$scope.atraso2tar20,
                "atrasoAnexo3":$scope.atraso3tar20,
                "atrasoAnexo":$scope.total1tar20
                }
                var tar21 = { 
                "cantidad1":$scope.cantidad1tar21,
                "precio1":$scope.precio1tar21,
                "cantidad2":$scope.cantidad2tar21,
                "precio2":$scope.precio2tar21,
                "cantidad3":$scope.cantidad3tar21,
                "precio3":$scope.precio3tar21,
                "atrasoAnexo1":$scope.atraso1tar21,
                "atrasoAnexo2":$scope.atraso2tar21,
                "atrasoAnexo3":$scope.atraso3tar21,
                "atrasoAnexo":$scope.total1tar21
                }
                var tar22 = { 
                "cantidad1":$scope.cantidad1tar22,
                "precio1":$scope.precio1tar22,
                "cantidad2":$scope.cantidad2tar22,
                "precio2":$scope.precio2tar22,
                "cantidad3":$scope.cantidad3tar22,
                "precio3":$scope.precio3tar22,
                "atrasoAnexo1":$scope.atraso1tar22,
                "atrasoAnexo2":$scope.atraso2tar22,
                "atrasoAnexo3":$scope.atraso3tar22,
                "atrasoAnexo":$scope.total1tar22
                }
                var tar23 = { 
                "cantidad1":$scope.cantidad1tar23,
                "precio1":$scope.precio1tar23,
                "cantidad2":$scope.cantidad2tar23,
                "precio2":$scope.precio2tar23,
                "cantidad3":$scope.cantidad3tar23,
                "precio3":$scope.precio3tar23,
                "atrasoAnexo1":$scope.atraso1tar23,
                "atrasoAnexo2":$scope.atraso2tar23,
                "atrasoAnexo3":$scope.atraso3tar23,
                "atrasoAnexo":$scope.total1tar23
                }
                var tar24 = { 
                "cantidad1":$scope.cantidad1tar24,
                "precio1":$scope.precio1tar24,
                "cantidad2":$scope.cantidad2tar24,
                "precio2":$scope.precio2tar24,
                "cantidad3":$scope.cantidad3tar24,
                "precio3":$scope.precio3tar24,
                "atrasoAnexo1":$scope.atraso1tar24,
                "atrasoAnexo2":$scope.atraso2tar24,
                "atrasoAnexo3":$scope.atraso3tar24,
                "atrasoAnexo":$scope.total1tar24
                }
                var tar25 = { 
                "cantidad1":$scope.cantidad1tar25,
                "precio1":$scope.precio1tar25,
                "cantidad2":$scope.cantidad2tar25,
                "precio2":$scope.precio2tar25,
                "cantidad3":$scope.cantidad3tar25,
                "precio3":$scope.precio3tar25,
                "atrasoAnexo1":$scope.atraso1tar25,
                "atrasoAnexo2":$scope.atraso2tar25,
                "atrasoAnexo3":$scope.atraso3tar25,
                "atrasoAnexo":$scope.total1tar25
                }
                var tar26 = { 
                "cantidad1":$scope.cantidad1tar26,
                "precio1":$scope.precio1tar26,
                "cantidad2":$scope.cantidad2tar26,
                "precio2":$scope.precio2tar26,
                "cantidad3":$scope.cantidad3tar26,
                "precio3":$scope.precio3tar26,
                "atrasoAnexo1":$scope.atraso1tar26,
                "atrasoAnexo2":$scope.atraso2tar26,
                "atrasoAnexo3":$scope.atraso3tar26,
                "atrasoAnexo":$scope.total1tar26
                }
                var tar27 = { 
                "cantidad1":$scope.cantidad1tar27,
                "precio1":$scope.precio1tar27,
                "cantidad2":$scope.cantidad2tar27,
                "precio2":$scope.precio2tar27,
                "cantidad3":$scope.cantidad3tar27,
                "precio3":$scope.precio3tar27,
                "atrasoAnexo1":$scope.atraso1tar27,
                "atrasoAnexo2":$scope.atraso2tar27,
                "atrasoAnexo3":$scope.atraso3tar27,
                "atrasoAnexo":$scope.total1tar27
                }
                var tar28 = { 
                "cantidad1":$scope.cantidad1tar28,
                "precio1":$scope.precio1tar28,
                "cantidad2":$scope.cantidad2tar28,
                "precio2":$scope.precio2tar28,
                "cantidad3":$scope.cantidad3tar28,
                "precio3":$scope.precio3tar28,
                "atrasoAnexo1":$scope.atraso1tar28,
                "atrasoAnexo2":$scope.atraso2tar28,
                "atrasoAnexo3":$scope.atraso3tar28,
                "atrasoAnexo":$scope.total1tar28
                }
                var tar29 = { 
                "cantidad1":$scope.cantidad1tar29,
                "precio1":$scope.precio1tar29,
                "cantidad2":$scope.cantidad2tar29,
                "precio2":$scope.precio2tar29,
                "cantidad3":$scope.cantidad3tar29,
                "precio3":$scope.precio3tar29,
                "atrasoAnexo1":$scope.atraso1tar29,
                "atrasoAnexo2":$scope.atraso2tar29,
                "atrasoAnexo3":$scope.atraso3tar29,
                "atrasoAnexo":$scope.total1tar29
                }
                var tar30 = { 
                "cantidad1":$scope.cantidad1tar30,
                "precio1":$scope.precio1tar30,
                "cantidad2":$scope.cantidad2tar30,
                "precio2":$scope.precio2tar30,
                "cantidad3":$scope.cantidad3tar30,
                "precio3":$scope.precio3tar30,
                "atrasoAnexo1":$scope.atraso1tar30,
                "atrasoAnexo2":$scope.atraso2tar30,
                "atrasoAnexo3":$scope.atraso3tar30,
                "atrasoAnexo":$scope.total1tar30
                }
                var tar31 = { 
                "cantidad1":$scope.cantidad1tar31,
                "precio1":$scope.precio1tar31,
                "cantidad2":$scope.cantidad2tar31,
                "precio2":$scope.precio2tar31,
                "cantidad3":$scope.cantidad3tar31,
                "precio3":$scope.precio3tar31,
                "atrasoAnexo1":$scope.atraso1tar31,
                "atrasoAnexo2":$scope.atraso2tar31,
                "atrasoAnexo3":$scope.atraso3tar31,
                "atrasoAnexo":$scope.total1tar31
                }
                var tar32 = { 
                "cantidad1":$scope.cantidad1tar32,
                "precio1":$scope.precio1tar32,
                "cantidad2":$scope.cantidad2tar32,
                "precio2":$scope.precio2tar32,
                "cantidad3":$scope.cantidad3tar32,
                "precio3":$scope.precio3tar32,
                "atrasoAnexo1":$scope.atraso1tar32,
                "atrasoAnexo2":$scope.atraso2tar32,
                "atrasoAnexo3":$scope.atraso3tar32,
                "atrasoAnexo":$scope.total1tar32
                }
                var tar33 = { 
                "cantidad1":$scope.cantidad1tar33,
                "precio1":$scope.precio1tar33,
                "cantidad2":$scope.cantidad2tar33,
                "precio2":$scope.precio2tar33,
                "cantidad3":$scope.cantidad3tar33,
                "precio3":$scope.precio3tar33,
                "atrasoAnexo1":$scope.atraso1tar33,
                "atrasoAnexo2":$scope.atraso2tar33,
                "atrasoAnexo3":$scope.atraso3tar33,
                "atrasoAnexo":$scope.total1tar33
                }
                var tar34 = { 
                "cantidad1":$scope.cantidad1tar34,
                "precio1":$scope.precio1tar34,
                "cantidad2":$scope.cantidad2tar34,
                "precio2":$scope.precio2tar34,
                "cantidad3":$scope.cantidad3tar34,
                "precio3":$scope.precio3tar34,
                "atrasoAnexo1":$scope.atraso1tar34,
                "atrasoAnexo2":$scope.atraso2tar34,
                "atrasoAnexo3":$scope.atraso3tar34,
                "atrasoAnexo":$scope.total1tar34
                }
                var tar35 = { 
                "cantidad1":$scope.cantidad1tar35,
                "precio1":$scope.precio1tar35,
                "cantidad2":$scope.cantidad2tar35,
                "precio2":$scope.precio2tar35,
                "cantidad3":$scope.cantidad3tar35,
                "precio3":$scope.precio3tar35,
                "atrasoAnexo1":$scope.atraso1tar35,
                "atrasoAnexo2":$scope.atraso2tar35,
                "atrasoAnexo3":$scope.atraso3tar35,
                "atrasoAnexo":$scope.total1tar35
                }
                var tar36 = { 
                "cantidad1":$scope.cantidad1tar36,
                "precio1":$scope.precio1tar36,
                "cantidad2":$scope.cantidad2tar36,
                "precio2":$scope.precio2tar36,
                "cantidad3":$scope.cantidad3tar36,
                "precio3":$scope.precio3tar36,
                "atrasoAnexo1":$scope.atraso1tar36,
                "atrasoAnexo2":$scope.atraso2tar36,
                "atrasoAnexo3":$scope.atraso3tar36,
                "atrasoAnexo":$scope.total1tar36
                }
                var tar37 = { 
                "cantidad1":$scope.cantidad1tar37,
                "precio1":$scope.precio1tar37,
                "cantidad2":$scope.cantidad2tar37,
                "precio2":$scope.precio2tar37,
                "cantidad3":$scope.cantidad3tar37,
                "precio3":$scope.precio3tar37,
                "atrasoAnexo1":$scope.atraso1tar37,
                "atrasoAnexo2":$scope.atraso2tar37,
                "atrasoAnexo3":$scope.atraso3tar37,
                "atrasoAnexo":$scope.total1tar37
                }
                var tar38 = { 
                "cantidad1":$scope.cantidad1tar38,
                "precio1":$scope.precio1tar38,
                "cantidad2":$scope.cantidad2tar38,
                "precio2":$scope.precio2tar38,
                "cantidad3":$scope.cantidad3tar38,
                "precio3":$scope.precio3tar38,
                "atrasoAnexo1":$scope.atraso1tar38,
                "atrasoAnexo2":$scope.atraso2tar38,
                "atrasoAnexo3":$scope.atraso3tar38,
                "atrasoAnexo":$scope.total1tar38
                }
                var tar39 = { 
                "cantidad1":$scope.cantidad1tar39,
                "precio1":$scope.precio1tar39,
                "cantidad2":$scope.cantidad2tar39,
                "precio2":$scope.precio2tar39,
                "cantidad3":$scope.cantidad3tar39,
                "precio3":$scope.precio3tar39,
                "atrasoAnexo1":$scope.atraso1tar39,
                "atrasoAnexo2":$scope.atraso2tar39,
                "atrasoAnexo3":$scope.atraso3tar39,
                "atrasoAnexo":$scope.total1tar39
                }
                var tar40 = { 
                "cantidad1":$scope.cantidad1tar40,
                "precio1":$scope.precio1tar40,
                "cantidad2":$scope.cantidad2tar40,
                "precio2":$scope.precio2tar40,
                "cantidad3":$scope.cantidad3tar40,
                "precio3":$scope.precio3tar40,
                "atrasoAnexo1":$scope.atraso1tar40,
                "atrasoAnexo2":$scope.atraso2tar40,
                "atrasoAnexo3":$scope.atraso3tar40,
                "atrasoAnexo":$scope.total1tar40
                }
                var tar41 = { 
                "cantidad1":$scope.cantidad1tar41,
                "precio1":$scope.precio1tar41,
                "cantidad2":$scope.cantidad2tar41,
                "precio2":$scope.precio2tar41,
                "cantidad3":$scope.cantidad3tar41,
                "precio3":$scope.precio3tar41,
                "atrasoAnexo1":$scope.atraso1tar41,
                "atrasoAnexo2":$scope.atraso2tar41,
                "atrasoAnexo3":$scope.atraso3tar41,
                "atrasoAnexo":$scope.total1tar41
                }
                var tar42 = { 
                "cantidad1":$scope.cantidad1tar42,
                "precio1":$scope.precio1tar42,
                "cantidad2":$scope.cantidad2tar42,
                "precio2":$scope.precio2tar42,
                "cantidad3":$scope.cantidad3tar42,
                "precio3":$scope.precio3tar42,
                "atrasoAnexo1":$scope.atraso1tar42,
                "atrasoAnexo2":$scope.atraso2tar42,
                "atrasoAnexo3":$scope.atraso3tar42,
                "atrasoAnexo":$scope.total1tar42
                }
                var tar43 = { 
                "cantidad1":$scope.cantidad1tar43,
                "precio1":$scope.precio1tar43,
                "cantidad2":$scope.cantidad2tar43,
                "precio2":$scope.precio2tar43,
                "cantidad3":$scope.cantidad3tar43,
                "precio3":$scope.precio3tar43,
                "atrasoAnexo1":$scope.atraso1tar43,
                "atrasoAnexo2":$scope.atraso2tar43,
                "atrasoAnexo3":$scope.atraso3tar43,
                "atrasoAnexo":$scope.total1tar43
                }
                var tar44 = { 
                "cantidad1":$scope.cantidad1tar44,
                "precio1":$scope.precio1tar44,
                "cantidad2":$scope.cantidad2tar44,
                "precio2":$scope.precio2tar44,
                "cantidad3":$scope.cantidad3tar44,
                "precio3":$scope.precio3tar44,
                "atrasoAnexo1":$scope.atraso1tar44,
                "atrasoAnexo2":$scope.atraso2tar44,
                "atrasoAnexo3":$scope.atraso3tar44,
                "atrasoAnexo":$scope.total1tar44
                }
                var tar45 = { 
                "cantidad1":$scope.cantidad1tar45,
                "precio1":$scope.precio1tar45,
                "cantidad2":$scope.cantidad2tar45,
                "precio2":$scope.precio2tar45,
                "cantidad3":$scope.cantidad3tar45,
                "precio3":$scope.precio3tar45,
                "atrasoAnexo1":$scope.atraso1tar45,
                "atrasoAnexo2":$scope.atraso2tar45,
                "atrasoAnexo3":$scope.atraso3tar45,
                "atrasoAnexo":$scope.total1tar45
                }
                var tar46 = { 
                "cantidad1":$scope.cantidad1tar46,
                "precio1":$scope.precio1tar46,
                "cantidad2":$scope.cantidad2tar46,
                "precio2":$scope.precio2tar46,
                "cantidad3":$scope.cantidad3tar46,
                "precio3":$scope.precio3tar46,
                "atrasoAnexo1":$scope.atraso1tar46,
                "atrasoAnexo2":$scope.atraso2tar46,
                "atrasoAnexo3":$scope.atraso3tar46,
                "atrasoAnexo":$scope.total1tar46
                }
                var tar47 = { 
                "cantidad1":$scope.cantidad1tar47,
                "precio1":$scope.precio1tar47,
                "cantidad2":$scope.cantidad2tar47,
                "precio2":$scope.precio2tar47,
                "cantidad3":$scope.cantidad3tar47,
                "precio3":$scope.precio3tar47,
                "atrasoAnexo1":$scope.atraso1tar47,
                "atrasoAnexo2":$scope.atraso2tar47,
                "atrasoAnexo3":$scope.atraso3tar47,
                "atrasoAnexo":$scope.total1tar47
                }
                var tar48 = { 
                "cantidad1":$scope.cantidad1tar48,
                "precio1":$scope.precio1tar48,
                "cantidad2":$scope.cantidad2tar48,
                "precio2":$scope.precio2tar48,
                "cantidad3":$scope.cantidad3tar48,
                "precio3":$scope.precio3tar48,
                "atrasoAnexo1":$scope.atraso1tar48,
                "atrasoAnexo2":$scope.atraso2tar48,
                "atrasoAnexo3":$scope.atraso3tar48,
                "atrasoAnexo":$scope.total1tar48
                }
                var tar49 = { 
                "cantidad1":$scope.cantidad1tar49,
                "precio1":$scope.precio1tar49,
                "cantidad2":$scope.cantidad2tar49,
                "precio2":$scope.precio2tar49,
                "cantidad3":$scope.cantidad3tar49,
                "precio3":$scope.precio3tar49,
                "atrasoAnexo1":$scope.atraso1tar49,
                "atrasoAnexo2":$scope.atraso2tar49,
                "atrasoAnexo3":$scope.atraso3tar49,
                "atrasoAnexo":$scope.total1tar49
                }
                var tar50 = { 
                "cantidad1":$scope.cantidad1tar50,
                "precio1":$scope.precio1tar50,
                "cantidad2":$scope.cantidad2tar50,
                "precio2":$scope.precio2tar50,
                "cantidad3":$scope.cantidad3tar50,
                "precio3":$scope.precio3tar50,
                "atrasoAnexo1":$scope.atraso1tar50,
                "atrasoAnexo2":$scope.atraso2tar50,
                "atrasoAnexo3":$scope.atraso3tar50,
                "atrasoAnexo":$scope.total1tar50
                }
                var tar51 = { 
                "cantidad1":$scope.cantidad1tar51,
                "precio1":$scope.precio1tar51,
                "cantidad2":$scope.cantidad2tar51,
                "precio2":$scope.precio2tar51,
                "cantidad3":$scope.cantidad3tar51,
                "precio3":$scope.precio3tar51,
                "atrasoAnexo1":$scope.atraso1tar51,
                "atrasoAnexo2":$scope.atraso2tar51,
                "atrasoAnexo3":$scope.atraso3tar51,
                "atrasoAnexo":$scope.total1tar51
                }
                var tar52 = { 
                "cantidad1":$scope.cantidad1tar52,
                "precio1":$scope.precio1tar52,
                "cantidad2":$scope.cantidad2tar52,
                "precio2":$scope.precio2tar52,
                "cantidad3":$scope.cantidad3tar52,
                "precio3":$scope.precio3tar52,
                "atrasoAnexo1":$scope.atraso1tar52,
                "atrasoAnexo2":$scope.atraso2tar52,
                "atrasoAnexo3":$scope.atraso3tar52,
                "atrasoAnexo":$scope.total1tar52
                }
                var tar53 = { 
                "cantidad1":$scope.cantidad1tar53,
                "precio1":$scope.precio1tar53,
                "cantidad2":$scope.cantidad2tar53,
                "precio2":$scope.precio2tar53,
                "cantidad3":$scope.cantidad3tar53,
                "precio3":$scope.precio3tar53,
                "atrasoAnexo1":$scope.atraso1tar53,
                "atrasoAnexo2":$scope.atraso2tar53,
                "atrasoAnexo3":$scope.atraso3tar53,
                "atrasoAnexo":$scope.total1tar53
                }
                var tar54 = { 
                "cantidad1":$scope.cantidad1tar54,
                "precio1":$scope.precio1tar54,
                "cantidad2":$scope.cantidad2tar54,
                "precio2":$scope.precio2tar54,
                "cantidad3":$scope.cantidad3tar54,
                "precio3":$scope.precio3tar54,
                "atrasoAnexo1":$scope.atraso1tar54,
                "atrasoAnexo2":$scope.atraso2tar54,
                "atrasoAnexo3":$scope.atraso3tar54,
                "atrasoAnexo":$scope.total1tar54
                }
                var tar55 = { 
                "cantidad1":$scope.cantidad1tar55,
                "precio1":$scope.precio1tar55,
                "cantidad2":$scope.cantidad2tar55,
                "precio2":$scope.precio2tar55,
                "cantidad3":$scope.cantidad3tar55,
                "precio3":$scope.precio3tar55,
                "atrasoAnexo1":$scope.atraso1tar55,
                "atrasoAnexo2":$scope.atraso2tar55,
                "atrasoAnexo3":$scope.atraso3tar55,
                "atrasoAnexo":$scope.total1tar55
                }
                var tar56 = { 
                "cantidad1":$scope.cantidad1tar56,
                "precio1":$scope.precio1tar56,
                "cantidad2":$scope.cantidad2tar56,
                "precio2":$scope.precio2tar56,
                "cantidad3":$scope.cantidad3tar56,
                "precio3":$scope.precio3tar56,
                "atrasoAnexo1":$scope.atraso1tar56,
                "atrasoAnexo2":$scope.atraso2tar56,
                "atrasoAnexo3":$scope.atraso3tar56,
                "atrasoAnexo":$scope.total1tar56
                }
                var tar57 = { 
                "cantidad1":$scope.cantidad1tar57,
                "precio1":$scope.precio1tar57,
                "cantidad2":$scope.cantidad2tar57,
                "precio2":$scope.precio2tar57,
                "cantidad3":$scope.cantidad3tar57,
                "precio3":$scope.precio3tar57,
                "atrasoAnexo1":$scope.atraso1tar57,
                "atrasoAnexo2":$scope.atraso2tar57,
                "atrasoAnexo3":$scope.atraso3tar57,
                "atrasoAnexo":$scope.total1tar57
                }
                var tar58 = { 
                "cantidad1":$scope.cantidad1tar58,
                "precio1":$scope.precio1tar58,
                "cantidad2":$scope.cantidad2tar58,
                "precio2":$scope.precio2tar58,
                "cantidad3":$scope.cantidad3tar58,
                "precio3":$scope.precio3tar58,
                "atrasoAnexo1":$scope.atraso1tar58,
                "atrasoAnexo2":$scope.atraso2tar58,
                "atrasoAnexo3":$scope.atraso3tar58,
                "atrasoAnexo":$scope.total1tar58
                }
                var tar59 = { 
                "cantidad1":$scope.cantidad1tar59,
                "precio1":$scope.precio1tar59,
                "cantidad2":$scope.cantidad2tar59,
                "precio2":$scope.precio2tar59,
                "cantidad3":$scope.cantidad3tar59,
                "precio3":$scope.precio3tar59,
                "atrasoAnexo1":$scope.atraso1tar59,
                "atrasoAnexo2":$scope.atraso2tar59,
                "atrasoAnexo3":$scope.atraso3tar59,
                "atrasoAnexo":$scope.total1tar59
                }
                var tar60 = { 
                "cantidad1":$scope.cantidad1tar60,
                "precio1":$scope.precio1tar60,
                "cantidad2":$scope.cantidad2tar60,
                "precio2":$scope.precio2tar60,
                "cantidad3":$scope.cantidad3tar60,
                "precio3":$scope.precio3tar60,
                "atrasoAnexo1":$scope.atraso1tar60,
                "atrasoAnexo2":$scope.atraso2tar60,
                "atrasoAnexo3":$scope.atraso3tar60,
                "atrasoAnexo":$scope.total1tar60
                }
                var tar61 = { 
                "cantidad1":$scope.cantidad1tar61,
                "precio1":$scope.precio1tar61,
                "cantidad2":$scope.cantidad2tar61,
                "precio2":$scope.precio2tar61,
                "cantidad3":$scope.cantidad3tar61,
                "precio3":$scope.precio3tar61,
                "atrasoAnexo1":$scope.atraso1tar61,
                "atrasoAnexo2":$scope.atraso2tar61,
                "atrasoAnexo3":$scope.atraso3tar61,
                "atrasoAnexo":$scope.total1tar61
                }
                var tar62 = { 
                "cantidad1":$scope.cantidad1tar62,
                "precio1":$scope.precio1tar62,
                "cantidad2":$scope.cantidad2tar62,
                "precio2":$scope.precio2tar62,
                "cantidad3":$scope.cantidad3tar62,
                "precio3":$scope.precio3tar62,
                "atrasoAnexo1":$scope.atraso1tar62,
                "atrasoAnexo2":$scope.atraso2tar62,
                "atrasoAnexo3":$scope.atraso3tar62,
                "atrasoAnexo":$scope.total1tar62
                }
                var tar63 = { 
                "cantidad1":$scope.cantidad1tar63,
                "precio1":$scope.precio1tar63,
                "cantidad2":$scope.cantidad2tar63,
                "precio2":$scope.precio2tar63,
                "cantidad3":$scope.cantidad3tar63,
                "precio3":$scope.precio3tar63,
                "atrasoAnexo1":$scope.atraso1tar63,
                "atrasoAnexo2":$scope.atraso2tar63,
                "atrasoAnexo3":$scope.atraso3tar63,
                "atrasoAnexo":$scope.total1tar63
                }
                var tar64 = { 
                "cantidad1":$scope.cantidad1tar64,
                "precio1":$scope.precio1tar64,
                "cantidad2":$scope.cantidad2tar64,
                "precio2":$scope.precio2tar64,
                "cantidad3":$scope.cantidad3tar64,
                "precio3":$scope.precio3tar64,
                "atrasoAnexo1":$scope.atraso1tar64,
                "atrasoAnexo2":$scope.atraso2tar64,
                "atrasoAnexo3":$scope.atraso3tar64,
                "atrasoAnexo":$scope.total1tar64
                }
                var tar65 = { 
                "cantidad1":$scope.cantidad1tar65,
                "precio1":$scope.precio1tar65,
                "cantidad2":$scope.cantidad2tar65,
                "precio2":$scope.precio2tar65,
                "cantidad3":$scope.cantidad3tar65,
                "precio3":$scope.precio3tar65,
                "atrasoAnexo1":$scope.atraso1tar65,
                "atrasoAnexo2":$scope.atraso2tar65,
                "atrasoAnexo3":$scope.atraso3tar65,
                "atrasoAnexo":$scope.total1tar65
                }
                var tar66 = { 
                "cantidad1":$scope.cantidad1tar66,
                "precio1":$scope.precio1tar66,
                "cantidad2":$scope.cantidad2tar66,
                "precio2":$scope.precio2tar66,
                "cantidad3":$scope.cantidad3tar66,
                "precio3":$scope.precio3tar66,
                "atrasoAnexo1":$scope.atraso1tar66,
                "atrasoAnexo2":$scope.atraso2tar66,
                "atrasoAnexo3":$scope.atraso3tar66,
                "atrasoAnexo":$scope.total1tar66
                }
                var tar67 = { 
                "cantidad1":$scope.cantidad1tar67,
                "precio1":$scope.precio1tar67,
                "cantidad2":$scope.cantidad2tar67,
                "precio2":$scope.precio2tar67,
                "cantidad3":$scope.cantidad3tar67,
                "precio3":$scope.precio3tar67,
                "atrasoAnexo1":$scope.atraso1tar67,
                "atrasoAnexo2":$scope.atraso2tar67,
                "atrasoAnexo3":$scope.atraso3tar67,
                "atrasoAnexo":$scope.total1tar67
                }
                var tar68 = { 
                "cantidad1":$scope.cantidad1tar68,
                "precio1":$scope.precio1tar68,
                "cantidad2":$scope.cantidad2tar68,
                "precio2":$scope.precio2tar68,
                "cantidad3":$scope.cantidad3tar68,
                "precio3":$scope.precio3tar68,
                "atrasoAnexo1":$scope.atraso1tar68,
                "atrasoAnexo2":$scope.atraso2tar68,
                "atrasoAnexo3":$scope.atraso3tar68,
                "atrasoAnexo":$scope.total1tar68
                }
                var tar69 = { 
                "cantidad1":$scope.cantidad1tar69,
                "precio1":$scope.precio1tar69,
                "cantidad2":$scope.cantidad2tar69,
                "precio2":$scope.precio2tar69,
                "cantidad3":$scope.cantidad3tar69,
                "precio3":$scope.precio3tar69,
                "atrasoAnexo1":$scope.atraso1tar69,
                "atrasoAnexo2":$scope.atraso2tar69,
                "atrasoAnexo3":$scope.atraso3tar69,
                "atrasoAnexo":$scope.total1tar69
                }
                var tar70 = { 
                "cantidad1":$scope.cantidad1tar70,
                "precio1":$scope.precio1tar70,
                "cantidad2":$scope.cantidad2tar70,
                "precio2":$scope.precio2tar70,
                "cantidad3":$scope.cantidad3tar70,
                "precio3":$scope.precio3tar70,
                "atrasoAnexo1":$scope.atraso1tar70,
                "atrasoAnexo2":$scope.atraso2tar70,
                "atrasoAnexo3":$scope.atraso3tar70,
                "atrasoAnexo":$scope.total1tar70
                }
                var tar71 = { 
                "cantidad1":$scope.cantidad1tar71,
                "precio1":$scope.precio1tar71,
                "cantidad2":$scope.cantidad2tar71,
                "precio2":$scope.precio2tar71,
                "cantidad3":$scope.cantidad3tar71,
                "precio3":$scope.precio3tar71,
                "atrasoAnexo1":$scope.atraso1tar71,
                "atrasoAnexo2":$scope.atraso2tar71,
                "atrasoAnexo3":$scope.atraso3tar71,
                "atrasoAnexo":$scope.total1tar71
                }
                var tar72 = { 
                "cantidad1":$scope.cantidad1tar72,
                "precio1":$scope.precio1tar72,
                "cantidad2":$scope.cantidad2tar72,
                "precio2":$scope.precio2tar72,
                "cantidad3":$scope.cantidad3tar72,
                "precio3":$scope.precio3tar72,
                "atrasoAnexo1":$scope.atraso1tar72,
                "atrasoAnexo2":$scope.atraso2tar72,
                "atrasoAnexo3":$scope.atraso3tar72,
                "atrasoAnexo":$scope.total1tar72
                }
                var tar73 = { 
                "cantidad1":$scope.cantidad1tar73,
                "precio1":$scope.precio1tar73,
                "cantidad2":$scope.cantidad2tar73,
                "precio2":$scope.precio2tar73,
                "cantidad3":$scope.cantidad3tar73,
                "precio3":$scope.precio3tar73,
                "atrasoAnexo1":$scope.atraso1tar73,
                "atrasoAnexo2":$scope.atraso2tar73,
                "atrasoAnexo3":$scope.atraso3tar73,
                "atrasoAnexo":$scope.total1tar73
                }
                var tar74 = { 
                "cantidad1":$scope.cantidad1tar74,
                "precio1":$scope.precio1tar74,
                "cantidad2":$scope.cantidad2tar74,
                "precio2":$scope.precio2tar74,
                "cantidad3":$scope.cantidad3tar74,
                "precio3":$scope.precio3tar74,
                "atrasoAnexo1":$scope.atraso1tar74,
                "atrasoAnexo2":$scope.atraso2tar74,
                "atrasoAnexo3":$scope.atraso3tar74,
                "atrasoAnexo":$scope.total1tar74
                }
                var tar75 = { 
                "cantidad1":$scope.cantidad1tar75,
                "precio1":$scope.precio1tar75,
                "cantidad2":$scope.cantidad2tar75,
                "precio2":$scope.precio2tar75,
                "cantidad3":$scope.cantidad3tar75,
                "precio3":$scope.precio3tar75,
                "atrasoAnexo1":$scope.atraso1tar75,
                "atrasoAnexo2":$scope.atraso2tar75,
                "atrasoAnexo3":$scope.atraso3tar75,
                "atrasoAnexo":$scope.total1tar75
                }
                var tar76 = { 
                "cantidad1":$scope.cantidad1tar76,
                "precio1":$scope.precio1tar76,
                "cantidad2":$scope.cantidad2tar76,
                "precio2":$scope.precio2tar76,
                "cantidad3":$scope.cantidad3tar76,
                "precio3":$scope.precio3tar76,
                "atrasoAnexo1":$scope.atraso1tar76,
                "atrasoAnexo2":$scope.atraso2tar76,
                "atrasoAnexo3":$scope.atraso3tar76,
                "atrasoAnexo":$scope.total1tar76
                }
                var tar77 = { 
                "cantidad1":$scope.cantidad1tar77,
                "precio1":$scope.precio1tar77,
                "cantidad2":$scope.cantidad2tar77,
                "precio2":$scope.precio2tar77,
                "cantidad3":$scope.cantidad3tar77,
                "precio3":$scope.precio3tar77,
                "atrasoAnexo1":$scope.atraso1tar77,
                "atrasoAnexo2":$scope.atraso2tar77,
                "atrasoAnexo3":$scope.atraso3tar77,
                "atrasoAnexo":$scope.total1tar77
                }
                var tar78 = { 
                "cantidad1":$scope.cantidad1tar78,
                "precio1":$scope.precio1tar78,
                "cantidad2":$scope.cantidad2tar78,
                "precio2":$scope.precio2tar78,
                "cantidad3":$scope.cantidad3tar78,
                "precio3":$scope.precio3tar78,
                "atrasoAnexo1":$scope.atraso1tar78,
                "atrasoAnexo2":$scope.atraso2tar78,
                "atrasoAnexo3":$scope.atraso3tar78,
                "atrasoAnexo":$scope.total1tar78
                }

                var generalN = {
                    "cantidad1": $scope.cantidadNAnexo1,
                    "precio1": $scope.precioNAnexo1,
                    "cantidad2": $scope.cantidadNAnexo2,
                    "precio2": $scope.precioNAnexo2,
                    "cantidad3": $scope.cantidadNAnexo3,
                    "precio3": $scope.precioNAnexo3,
                    "atrasoAnexo1": $scope.atrasoNAnexo1,
                    "atrasoAnexo2": $scope.atrasoNAnexo2,
                    "atrasoAnexo3": $scope.atrasoNAnexo3
                        }
                var generalC = {
                    "cantidad1": $scope.cantidadCAnexo1,
                    "precio1": $scope.precioCAnexo1,
                    "cantidad2": $scope.cantidadCAnexo2,
                    "precio2": $scope.precioCAnexo2,
                    "cantidad3":  $scope.cantidadCAnexo3,
                    "precio3":  $scope.precioCAnexo3,
                    "atrasoAnexo1": $scope.atrasoCAnexo1,
                    "atrasoAnexo2": $scope.atrasoCAnexo2,
                    "atrasoAnexo3": $scope.atrasoCAnexo3
                        }
                var generalP = {
                    "cantidad1": $scope.cantidadPAnexo1,
                    "precio1": $scope.precioPAnexo1,
                    "cantidad2": $scope.cantidadPAnexo2,
                    "precio2": $scope.precioPAnexo2,
                    "cantidad3": $scope.cantidadPAnexo3,
                    "precio3": $scope.precioPAnexo3,
                    "atrasoAnexo1": $scope.atrasoPAnexo1,
                    "atrasoAnexo2": $scope.atrasoPAnexo2,
                    "atrasoAnexo3": $scope.atrasoPAnexo3
                        }
                var generalG = {
                    "cantidad1": $scope.cantidadGAnexo1,
                    "precio1": $scope.precioGAnexo1,
                    "cantidad2": $scope.cantidadGAnexo2,
                    "precio2": $scope.precioGAnexo2,
                    "cantidad3": $scope.cantidadGAnexo3,
                    "precio3": $scope.precioGAnexo3,
                    "atrasoAnexo1": $scope.atrasoGAnexo1,
                    "atrasoAnexo2": $scope.atrasoGAnexo2,
                    "atrasoAnexo3": $scope.atrasoGAnexo3
                        }

                anexo1N = $scope.sortByKey(anexo1N, 'TAR');
                anexo2N = $scope.sortByKey(anexo2N, 'TAR');
                anexo3N = $scope.sortByKey(anexo3N, 'TAR');
                anexo1C = $scope.sortByKey(anexo1C, 'TAR');
                anexo2C = $scope.sortByKey(anexo2C, 'TAR');
                anexo3C = $scope.sortByKey(anexo3C, 'TAR');
                anexo1P = $scope.sortByKey(anexo1P, 'TAR');
                anexo2P = $scope.sortByKey(anexo2P, 'TAR');
                anexo3P = $scope.sortByKey(anexo3P, 'TAR');
                anexo1G = $scope.sortByKey(anexo1G, 'TAR');
                anexo2G = $scope.sortByKey(anexo2G, 'TAR');
                anexo3G = $scope.sortByKey(anexo3G, 'TAR');

                                    var zona1 = {
                                        "generalN": generalN,
                                        "anexo1": anexo1N,
                                        "anexo2": anexo2N,
                                        "anexo3": anexo3N
                                    }  
                                    var zona2 = {
                                        "generalC": generalC,
                                        "anexo1": anexo1C,
                                        "anexo2": anexo2C,
                                        "anexo3": anexo3C
                                    }  
                                    var zona3 = {
                                        "generalP": generalP,
                                        "anexo1": anexo1P,
                                        "anexo2": anexo2P,
                                        "anexo3": anexo3P
                                    }  
                                    var zona4 = {
                                        "generalG": generalG,
                                        "anexo1": anexo1G,
                                        "anexo2": anexo2G,
                                        "anexo3": anexo3G
                                    } 
                                    var tars = {
                                        "tar1":tar1,
                                        "tar2":tar2,
                                        "tar3":tar3,
                                        "tar4":tar4,
                                        "tar5":tar5,
                                        "tar6":tar6,
                                        "tar7":tar7,
                                        "tar8":tar8,
                                        "tar9":tar9,
                                        "tar10":tar10,
                                        "tar11":tar11,
                                        "tar12":tar12,
                                        "tar13":tar13,
                                        "tar14":tar14,
                                        "tar15":tar15,
                                        "tar16":tar16,
                                        "tar17":tar17,
                                        "tar18":tar18,
                                        "tar19":tar19,
                                        "tar20":tar20,
                                        "tar21":tar21,
                                        "tar22":tar22,
                                        "tar23":tar23,
                                        "tar24":tar24,
                                        "tar25":tar25,
                                        "tar26":tar26,
                                        "tar27":tar27,
                                        "tar28":tar28,
                                        "tar29":tar29,
                                        "tar30":tar30,
                                        "tar31":tar31,
                                        "tar32":tar32,
                                        "tar33":tar33,
                                        "tar34":tar34,
                                        "tar35":tar35,
                                        "tar36":tar36,
                                        "tar37":tar37,
                                        "tar38":tar38,
                                        "tar39":tar39,
                                        "tar40":tar40,
                                        "tar41":tar41,
                                        "tar42":tar42,
                                        "tar43":tar43,
                                        "tar44":tar44,
                                        "tar45":tar45,
                                        "tar46":tar46,
                                        "tar47":tar47,
                                        "tar48":tar48,
                                        "tar49":tar49,
                                        "tar50":tar50,
                                        "tar51":tar51,
                                        "tar52":tar52,
                                        "tar53":tar53,
                                        "tar54":tar54,
                                        "tar55":tar55,
                                        "tar56":tar56,
                                        "tar57":tar57,
                                        "tar58":tar58,
                                        "tar59":tar59,
                                        "tar60":tar60,
                                        "tar61":tar61,
                                        "tar62":tar62,
                                        "tar63":tar63,
                                        "tar64":tar64,
                                        "tar65":tar65,
                                        "tar66":tar66,
                                        "tar67":tar67,
                                        "tar68":tar68,
                                        "tar69":tar69,
                                        "tar70":tar70,
                                        "tar71":tar71,
                                        "tar72":tar72,
                                        "tar73":tar73,
                                        "tar74":tar74,
                                        "tar75":tar75,
                                        "tar76":tar76,
                                        "tar77":tar77,
                                        "tar78":tar78
                                    }  

                        $scope.estructura = {
                            "zona1": zona1,
                            "zona2": zona2,
                            "zona3": zona3,
                            "zona4": zona4,
                            "tars" : tars
                        }  
	            }
	        }, function (error) {
	            alertFactory.error('No se pudo recuperar información de las zonas');
	        });
    }

    $scope.verResumen = function (resumen) {
    	localStorageService.set('objResumen', resumen); 
		location.href = '/reporteReclamacion';
    }

    $scope.sortByKey = function(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    $scope.callAnexos = function () {
    if($scope.estructura != undefined){
        if($scope.estructura1 != undefined && $scope.estructura2 != undefined && $scope.estructura3 != undefined){
        $scope.class_buttonReclamacion = 'fa fa-spinner fa-spin';
            $scope.reclamacionMaestro();
            setTimeout(function () {
                $scope.estructuraMaestro = {
                    "General": $scope.estructura,
                    "Anexo1": $scope.estructura1,
                    "Anexo2": $scope.estructura2,
                    "Anexo3": $scope.estructura3,
                    "Detalle": $scope.estructura4
                }
                var jsonData = {
                    "template": {
                        "name": "reclamacionMaestro_rpt" 
                    },
                    "data": $scope.estructuraMaestro
                }

                reclamacionRepository.callExternalPdf(jsonData).then(function (result) {               
                            setTimeout(function () {
                                  $scope.idReclamacionAnexos = result.data.idReclamacion;
                                  var url = $rootScope.vIpServer + result.data.fileresponse;
                                  var a = document.createElement('a');
                                  a.href = url;
                                  a.download = 'reporteReclamacion';
                                  a.click();
                                                               $scope.$apply( function () { 
                                                                    $scope.class_buttonReclamacion = 'glyphicon glyphicon-ok';
                                                                });
                                                $scope.estructuraZip = {
                                                    "Anexo2": $scope.estructura2,
                                                    "idReclamacion": $scope.idReclamacionAnexos
                                                }
                                                reclamacionRepository.callZip($scope.estructuraZip).then(function (resp) {
                                                setTimeout(function () {
                                                if (resp.data.length > 0) {
                                                    var urlReclamacion = '/uploads/reclamacion/'+$scope.idReclamacionAnexos+'/Soporte.zip'
                                                            var url = $rootScope.vIpServer + urlReclamacion;
                                                            var a = document.createElement('a');
                                                                a.href = url;
                                                                a.download = 'Soporte';
                                                                a.click();
                                                                $scope.$apply( function () { 
                                                                    $scope.class_buttonReclamacion = 'glyphicon glyphicon-ok';
                                                                });
                                                                  $scope.estructura = undefined;
                                                                  $scope.estructura1 = undefined;
                                                                  $scope.estructura2 = undefined;
                                                                  $scope.estructura3 = undefined;
                                                    }
                                                }, 2000); 
                                                }, function (error) {
                                                    alertFactory.error('No se pudo generar el Zip del Anexo');
                                                });

                             }, 17000);                          
                        }, function (error) {
                            alertFactory.error('No se pudo generar el PDF');
                        });

            }, 5000);
            }else{
                alertFactory.info('Por favor espere un momento se esta recuperando la información necesaria, vuelva a intentarlo nuevamente!!');
            }
        }else{
            alertFactory.info('Por favor de actualiza la informacion y intentalo nuevamente!!');
        }
    }
    $scope.reclamacionMaestro = function () {
        ///////////////////
        var tar1    = {};
        var tar9    = {};
        var tar10   = {};
        var tar11   = {};
        var tar12   = {};
        var tar13   = {};
        var tar14   = {};
        var tar17   = {};
        var tar18   = {};
        var tar41   = {};
        var tar42   = {};
        var tar48   = {};
        var tar49   = {};
        var tar50   = {};
        var tar62   = {};
        var tar63   = {};
        var tar64   = {};
        var tar65   = {};
        var tar66   = {};
        var tar77   = {};
        ///////////////////
        var tar19   = {};
        var tar20   = {};
        var tar21   = {};
        var tar22   = {};
        var tar23   = {};
        var tar24   = {};
        var tar26   = {};
        var tar27   = {};
        var tar28   = {};
        var tar31   = {};
        var tar32   = {};
        var tar33   = {};
        var tar35   = {};
        var tar36   = {};
        var tar37   = {};
        var tar38   = {};
        var tar39   = {};
        var tar47   = {};
        var tar79   = {};
        ///////////////////
        var tar2    = {};
        var tar3    = {};
        var tar4    = {};
        var tar5    = {};
        var tar15   = {};
        var tar16   = {};
        var tar25   = {};
        var tar29   = {};
        var tar30   = {};
        var tar34   = {};
        var tar40   = {};
        var tar51   = {};
        var tar52   = {};
        var tar53   = {};
        var tar54   = {};
        var tar55   = {};
        var tar56   = {};
        var tar57   = {};
        var tar58   = {};
        var tar59   = {};
        var tar60   = {};
        ///////////////////
        var tar6    = {};
        var tar7    = {};
        var tar8    = {};
        var tar43   = {};
        var tar44   = {};
        var tar45   = {};
        var tar46   = {};
        var tar61   = {};
        var tar67   = {};
        var tar68   = {};
        var tar69   = {};
        var tar70   = {};
        var tar72   = {};
        var tar73   = {};
        var tar74   = {};
        var tar75   = {};
        var tar76   = {};
        var tar78   = {};
        ///////////////////
        $scope.estructura4 = {};
        var zona1 = {};
        var zona2 = {};
        var zona3 = {};
        var zona4 = {};
        var data1 = {};

        //reclamacionRepository.getReclamacion($scope.idOsur3).then(function (result) {
        reclamacionRepository.getReclamacion().then(function (result) {
            if (result.data.length > 0) {
                $scope.dataReclamacion = result.data;
                for (var i = 0; i < $scope.dataReclamacion.length; i++) { 
                    if($scope.dataReclamacion[i].idZona == 1){
                        if($scope.dataReclamacion[i].idTAR == 1){
                            var tar1 = {
                                        "identificador":result.data[i].identificador,
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar1.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 9){
                            var tar9 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar9.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 10){
                            var tar10 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar10.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 11){
                            var tar11 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar11.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 12){
                            var tar12 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar12.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 13){
                            var tar13 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar13.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 14){
                            var tar14 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar14.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 17){
                            var tar17 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar17.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 18){
                            var tar18 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar18.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 41){
                            var tar41 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar41.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 42){
                            var tar42 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar42.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 48){
                            var tar48 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar48.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 49){
                            var tar49 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                          //  tar49.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 50){
                            var tar50 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar50.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 62){
                            var tar62 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar62.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 63){
                            var tar63 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar63.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 64){
                            var tar64 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar64.push(data1);
                        }
                                                                        if($scope.dataReclamacion[i].idTAR == 65){
                            var tar65 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar65.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 66){
                            var tar66 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar66.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 77){
                            var tar77 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar77.push(data1);
                        }
                    }
                    if($scope.dataReclamacion[i].idZona == 2){
                        if($scope.dataReclamacion[i].idTAR == 19){
                            var tar19 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar19.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 20){
                            var tar20 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar20.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 21){
                            var tar21 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar21.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 22){
                            var tar22 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar22.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 23){
                            var tar23 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                          //  tar23.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 24){
                            var tar24 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar24.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 26){
                            var tar26 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar26.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 27){
                            var tar27 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar27.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 28){
                            var tar28 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar28.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 31){
                            var tar31 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar31.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 32){
                            var tar32 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                          //  tar32.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 33){
                            var tar33 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar33.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 35){
                            var tar35 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar35.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 36){
                            var tar36 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar36.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 37){
                            var tar37 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                          //  tar37.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 38){
                            var tar38 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar38.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 39){
                            var tar39 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                          //  tar39.push(data1);
                        }
                                               if($scope.dataReclamacion[i].idTAR == 47){
                            var tar47 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar47.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 79){
                            var tar79 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar79.push(data1);
                        }
                    }
                    if($scope.dataReclamacion[i].idZona == 3){
                        if($scope.dataReclamacion[i].idTAR == 2){
                            var tar2 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar2.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 3){
                            var tar3 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar3.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 4){
                            var tar4 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                          //  tar4.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 5){
                            var tar5 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar5.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 15){
                            var tar15 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar15.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 16){
                            var tar16 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar16.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 25){
                            var tar25 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                          //  tar25.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 29){
                            var tar29 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar29.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 30){
                            var tar30 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar30.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 34){
                            var tar34 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar34.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 40){
                            var tar40 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar40.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 51){
                            var tar51 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                         //   tar51.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 52){
                            var tar52 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar52.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 53){
                            var tar53 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar53.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 54){
                            var tar54 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar54.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 55){
                            var tar55 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar55.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 56){
                            var tar56 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar56.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 57){
                            var tar57 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar57.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 58){
                            var tar58 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar58.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 59){
                            var tar59 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar59.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 60){
                            var tar60 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar60.push(data1);
                        }
                    }
                    if($scope.dataReclamacion[i].idZona == 4){
                        if($scope.dataReclamacion[i].idTAR == 6){
                            var tar6 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar6.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 7){
                            var tar7 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar7.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 8){
                            var tar8 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar8.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 43){
                            var tar43 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar43.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 44){
                            var tar44 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar44.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 45){
                            var tar45 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar45.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 46){
                            var tar46 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar46.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 61){
                            var tar61 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar61.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 67){
                            var tar67 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar67.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 68){
                            var tar68 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar68.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 69){
                            var tar69 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                          //  tar69.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 70){
                            var tar70 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar70.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 72){
                            var tar72 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar72.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 73){
                            var tar73 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar73.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 74){
                            var tar74 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar74.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 75){
                            var tar75 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                            //tar75.push(data1);
                        }
                                                if($scope.dataReclamacion[i].idTAR == 76){
                            var tar76 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar76.push(data1);
                        }
                                                 if($scope.dataReclamacion[i].idTAR == 78){
                            var tar78 = {
                                        "idReclamacion":result.data[i].idReclamacion,
                                        "noReporte":result.data[i].noReporte,
                                        "letraGAD":result.data[i].letraGAD,
                                        "GAD":result.data[i].GAD,
                                        "idZona": result.data[i].idZona, 
                                        "nombreGAD":result.data[i].nombreGAD,
                                        "TAD":result.data[i].TAD,
                                        "idTAR":result.data[i].idTAR,
                                        "nombreTAD":result.data[i].nombreTAD,
                                        "fecha": result.data[i].fecha,
                                        "zona":result.data[i].zona,
                                        "TAR":result.data[i].TAR,
                                        "fechaLarga": result.data[i].fechaLarga, 
                                        "nombreSAD":result.data[i].nombreSAD,
                                        "representanteLegal":result.data[i].representanteLegal,
                                        "personaPemex": result.data[i].personaPemex,
                                        "personaPemexA":result.data[i].personaPemexA
                                } 
                           // tar78.push(data1);
                        }
                                               
                    }
                } 
                        var zona1 = {
                            "tar1":tar1,
                            "tar9":tar9,
                            "tar10":tar10,
                            "tar11":tar11,
                            "tar12":tar12,
                            "tar13":tar13,
                            "tar14":tar14,
                            "tar17":tar17,
                            "tar18":tar18,
                            "tar41":tar41,
                            "tar42":tar42,
                            "tar48":tar48,
                            "tar49":tar49,
                            "tar50":tar50,
                            "tar62":tar62,
                            "tar63":tar63,
                            "tar64":tar64,
                            "tar65":tar65,
                            "tar66":tar66,
                            "tar77":tar77
                        }  
                        var zona2 = {
                            "tar19":tar19,
                            "tar20":tar20,
                            "tar21":tar21,
                            "tar22":tar22,
                            "tar23":tar23,
                            "tar24":tar24,
                            "tar26":tar26,
                            "tar27":tar27,
                            "tar28":tar28,
                            "tar31":tar31,
                            "tar32":tar32,
                            "tar33":tar33,
                            "tar35":tar35,
                            "tar36":tar36,
                            "tar37":tar37,
                            "tar38":tar38,
                            "tar39":tar39,
                            "tar47":tar47,
                            "tar79":tar79
                        }  
                        var zona3 = {
                            "tar2":tar2,
                            "tar3":tar3,
                            "tar4":tar4,
                            "tar5":tar5,
                            "tar15":tar15,
                            "tar16":tar16,
                            "tar25":tar25,
                            "tar29":tar29,
                            "tar30":tar30,
                            "tar34":tar34,
                            "tar40":tar40,
                            "tar51":tar51,
                            "tar52":tar52,
                            "tar53":tar53,
                            "tar54":tar54,
                            "tar55":tar55,
                            "tar56":tar56,
                            "tar57":tar57,
                            "tar58":tar58,
                            "tar59":tar59,
                            "tar60":tar60
                        }  
                        var zona4 = {
                            "tar6":tar6,
                            "tar7":tar7,
                            "tar8":tar8,
                            "tar43":tar43,
                            "tar44":tar44,
                            "tar45":tar45,
                            "tar46":tar46,
                            "tar61":tar61,
                            "tar67":tar67,
                            "tar68":tar68,
                            "tar69":tar69,
                            "tar70":tar70,
                            "tar72":tar72,
                            "tar73":tar73,
                            "tar74":tar74,
                            "tar75":tar75,
                            "tar76":tar76,
                            "tar78":tar78
                        }  
                                $scope.estructura4 = {
                                    "zona1": zona1,
                                    "zona2": zona2,
                                    "zona3": zona3,
                                    "zona4": zona4
                                }  
            }
        }, function (error) {
            alertFactory.error('No se pudo recuperar información la información');
        }); 
    }
    $scope.Anexo = function (idZona, idTar, anexo) {
        ///////////////////
        var tar1    = [];
        var tar9    = [];
        var tar10   = [];
        var tar11   = [];
        var tar12   = [];
        var tar13   = [];
        var tar14   = [];
        var tar17   = [];
        var tar18   = [];
        var tar41   = [];
        var tar42   = [];
        var tar48   = [];
        var tar49   = [];
        var tar50   = [];
        var tar62   = [];
        var tar63   = [];
        var tar64   = [];
        var tar65   = [];
        var tar66   = [];
        var tar77   = [];
        ///////////////////
        var tar19   = [];
        var tar20   = [];
        var tar21   = [];
        var tar22   = [];
        var tar23   = [];
        var tar24   = [];
        var tar26   = [];
        var tar27   = [];
        var tar28   = [];
        var tar31   = [];
        var tar32   = [];
        var tar33   = [];
        var tar35   = [];
        var tar36   = [];
        var tar37   = [];
        var tar38   = [];
        var tar39   = [];
        var tar47   = [];
        var tar79   = [];
        ///////////////////
        var tar2    = [];
        var tar3    = [];
        var tar4    = [];
        var tar5    = [];
        var tar15   = [];
        var tar16   = [];
        var tar25   = [];
        var tar29   = [];
        var tar30   = [];
        var tar34   = [];
        var tar40   = [];
        var tar51   = [];
        var tar52   = [];
        var tar53   = [];
        var tar54   = [];
        var tar55   = [];
        var tar56   = [];
        var tar57   = [];
        var tar58   = [];
        var tar59   = [];
        var tar60   = [];
        ///////////////////
        var tar6    = [];
        var tar7    = [];
        var tar8    = [];
        var tar43   = [];
        var tar44   = [];
        var tar45   = [];
        var tar46   = [];
        var tar61   = [];
        var tar67   = [];
        var tar68   = [];
        var tar69   = [];
        var tar70   = [];
        var tar72   = [];
        var tar73   = [];
        var tar74   = [];
        var tar75   = [];
        var tar76   = [];
        var tar78   = [];
        ///////////////////
        var data1 = {};
        $scope.estructura1 = {};
        $scope.estructura2 = {};
        $scope.estructura3 = {};
        var zona1 = {};
        var zona2 = {};
        var zona3 = {};
        var zona4 = {};
        ////////////////////////
        $scope.valor1= 0;
        $scope.valor2= 0;
        $scope.valor3= 0;
        $scope.valor4= 0;
        $scope.valor5= 0;
        $scope.valor6= 0;
        $scope.valor7= 0;
        $scope.valor8= 0;
        $scope.valor9= 0;
        $scope.valor10= 0;
        $scope.valor11= 0;
        $scope.valor12= 0;
        $scope.valor13= 0;
        $scope.valor14= 0;
        $scope.valor15= 0;
        $scope.valor16= 0;
        $scope.valor17= 0;
        $scope.valor18= 0;
        $scope.valor19= 0;
        $scope.valor20= 0;
        $scope.valor21= 0;
        $scope.valor22= 0;
        $scope.valor23= 0;
        $scope.valor24= 0;
        $scope.valor25= 0;
        $scope.valor26= 0;
        $scope.valor27= 0;
        $scope.valor28= 0;
        $scope.valor29= 0;
        $scope.valor30= 0;
        $scope.valor31= 0;
        $scope.valor32= 0;
        $scope.valor33= 0;
        $scope.valor34= 0;
        $scope.valor35= 0;
        $scope.valor36= 0;
        $scope.valor37= 0;
        $scope.valor38= 0;
        $scope.valor39= 0;
        $scope.valor40= 0;
        $scope.valor41= 0;
        $scope.valor42= 0;
        $scope.valor43= 0;
        $scope.valor44= 0;
        $scope.valor45= 0;
        $scope.valor46= 0;
        $scope.valor47= 0;
        $scope.valor48= 0;
        $scope.valor49= 0;
        $scope.valor50= 0;
        $scope.valor51= 0;
        $scope.valor52= 0;
        $scope.valor53= 0;
        $scope.valor54= 0;
        $scope.valor55= 0;
        $scope.valor56= 0;
        $scope.valor57= 0;
        $scope.valor58= 0;
        $scope.valor59= 0;
        $scope.valor60= 0;
        $scope.valor61= 0;
        $scope.valor62= 0;
        $scope.valor63= 0;
        $scope.valor64= 0;
        $scope.valor65= 0;
        $scope.valor66= 0;
        $scope.valor67= 0;
        $scope.valor68= 0;
        $scope.valor69= 0;
        $scope.valor70= 0;
        $scope.valor71= 0;
        $scope.valor72= 0;
        $scope.valor73= 0;
        $scope.valor74= 0;
        $scope.valor75= 0;
        $scope.valor76= 0;
        $scope.valor77= 0;
        $scope.valor78= 0;
        $scope.valorGnrl= 0;
        var gneral   = [];
        ///////////////////////////
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {   
                $scope.anexos1 = result.data;
                for (var i = 0; i < $scope.anexos1.length; i++) {
                $scope.valorGnrl = $scope.valorGnrl + 1;
                    var dataGeneral = {
                        "Consecutivo":result.data[i].Consecutivo,
                        "Cliente":result.data[i].Cliente,
                        "NoOrden":result.data[i].NoOrden,
                        "index": $scope.valorGnrl,
                        "idTAR":result.data[i].idTAR,
                        "idZona":result.data[i].idZona,
                        "idTrabajo":result.data[i].idTrabajo,
                        "NoEconomico":result.data[i].NoEconomico,
                        "Zona": result.data[i].Zona, 
                        "TAR":result.data[i].TAR,
                        "folioCertificado":result.data[i].folioCertificado,
                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                        "precioOrden": result.data[i].precioOrden,
                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                        "DiasAtraso": result.data[i].DiasAtraso 
                    } 
                    gneral.push(dataGeneral);

                    if($scope.anexos1[i].idZona == 1){
                        if($scope.anexos1[i].idTAR == 1){
                            $scope.valor1 = $scope.valor1 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor1,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar1.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 9){
                            $scope.valor9 = $scope.valor9 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor9,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar9.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 10){
                            $scope.valor10 = $scope.valor10 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor10,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar10.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 11){
                            $scope.valor11 = $scope.valor11 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor11,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar11.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 12){
                            $scope.valor12 = $scope.valor12 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor12,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar12.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 13){
                            $scope.valor13 = $scope.valor13 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor13,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar13.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 14){
                            $scope.valor14 = $scope.valor14 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor14,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar14.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 17){
                            $scope.valor17 = $scope.valor17 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor17,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar17.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 18){
                            $scope.valor18 = $scope.valor18 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor18,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar18.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 41){
                            $scope.valor41 = $scope.valor41 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor41,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar41.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 42){
                            $scope.valor42 = $scope.valor42 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor42,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar42.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 48){
                            $scope.valor48 = $scope.valor48 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor48,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar48.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 49){
                            $scope.valor49 = $scope.valor49 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor49,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar49.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 50){
                            $scope.valor50 = $scope.valor50 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor50,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar50.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 62){
                            $scope.valor62 = $scope.valor62 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor62,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar62.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 63){
                            $scope.valor63 = $scope.valor63 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor63,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar63.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 64){
                            $scope.valor64 = $scope.valor64 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor64,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar64.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 65){
                            $scope.valor65 = $scope.valor65 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor65,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar65.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 66){
                            $scope.valor66 = $scope.valor66 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor66,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar66.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 77){
                            $scope.valor77 = $scope.valor77 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor77,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar77.push(data1);
                        }
                    }
                    if($scope.anexos1[i].idZona == 2){
                        if($scope.anexos1[i].idTAR == 19){
                            $scope.valor19 = $scope.valor19 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor19,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar19.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 20){
                            $scope.valor20 = $scope.valor20 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor20,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar20.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 21){
                            $scope.valor21 = $scope.valor21 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor21,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar21.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 22){
                            $scope.valor22 = $scope.valor22 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor22,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar22.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 23){
                            $scope.valor23 = $scope.valor23 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor23,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar23.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 24){
                            $scope.valor24 = $scope.valor24 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor24,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar24.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 26){
                            $scope.valor26 = $scope.valor26 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor26,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar26.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 27){
                            $scope.valor27 = $scope.valor27 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor27,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar27.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 28){
                            $scope.valor28 = $scope.valor28 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor28,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar28.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 31){
                            $scope.valor31 = $scope.valor31 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor31,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar31.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 32){
                            $scope.valor32 = $scope.valor32 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor32,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar32.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 33){
                            $scope.valor33 = $scope.valor33 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor33,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar33.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 35){
                            $scope.valor35 = $scope.valor35 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor35,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar35.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 36){
                            $scope.valor36 = $scope.valor36 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor36,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar36.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 37){
                            $scope.valor37 = $scope.valor37 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor37,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar37.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 38){
                            $scope.valor38 = $scope.valor38 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor38,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar38.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 39){
                            $scope.valor39 = $scope.valor39 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor39,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar39.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 47){
                            $scope.valor47 = $scope.valor47 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor47,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar47.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 79){
                            $scope.valor79 = $scope.valor79 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor79,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar79.push(data1);
                        }
                    }
                    if($scope.anexos1[i].idZona == 3){
                        if($scope.anexos1[i].idTAR == 2){
                            $scope.valor2 = $scope.valor2 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor2,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar2.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 3){
                            $scope.valor3 = $scope.valor3 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor3,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar3.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 4){
                            $scope.valor4 = $scope.valor4 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor4,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar4.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 5){
                            $scope.valor5 = $scope.valor5 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor5,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar5.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 15){
                            $scope.valor15 = $scope.valor15 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor15,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar15.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 16){
                            $scope.valor16 = $scope.valor16 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor16,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar16.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 25){
                            $scope.valor25 = $scope.valor25 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor25,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar25.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 29){
                            $scope.valor29 = $scope.valor29 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor29,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar29.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 30){
                            $scope.valor30 = $scope.valor30 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor30,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar30.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 34){
                            $scope.valor34 = $scope.valor34 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor34,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar34.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 40){
                            $scope.valor40 = $scope.valor40 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor40,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar40.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 51){
                            $scope.valor51 = $scope.valor51 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor51,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar51.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 52){
                            $scope.valor52 = $scope.valor52 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor52,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar52.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 53){
                            $scope.valor53 = $scope.valor53 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor53,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar53.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 54){
                            $scope.valor54 = $scope.valor54 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor54,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar54.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 55){
                            $scope.valor55 = $scope.valor55 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor55,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar55.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 56){
                            $scope.valor56 = $scope.valor56 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor56,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar56.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 57){
                            $scope.valor57 = $scope.valor57 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor57,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar57.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 58){
                            $scope.valor58 = $scope.valor58 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor58,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar58.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 59){
                            $scope.valor59 = $scope.valor59 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor59,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar59.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 60){
                            $scope.valor60 = $scope.valor60 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor60,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar60.push(data1);
                        }
                    }
                    if($scope.anexos1[i].idZona == 4){
                        if($scope.anexos1[i].idTAR == 6){
                            $scope.valor6 = $scope.valor6 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor6,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar6.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 7){
                            $scope.valor7 = $scope.valor7 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor7,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar7.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 8){
                            $scope.valor8 = $scope.valor8 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor8,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar8.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 43){
                            $scope.valor43 = $scope.valor43 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor43,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar43.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 44){
                            $scope.valor44 = $scope.valor44 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor44,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar44.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 45){
                            $scope.valor45 = $scope.valor45 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor45,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar45.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 46){
                            $scope.valor46 = $scope.valor46 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor46,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar46.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 61){
                            $scope.valor61 = $scope.valor61 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor61,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar61.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 67){
                            $scope.valor67 = $scope.valor67 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor67,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar67.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 68){
                            $scope.valor68 = $scope.valor68 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor68,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar68.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 69){
                            $scope.valor69 = $scope.valor69 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor69,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar69.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 70){
                            $scope.valor70 = $scope.valor70 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor70,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar70.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 72){
                            $scope.valor72 = $scope.valor72 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor72,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar72.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 73){
                            $scope.valor73 = $scope.valor73 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor73,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar73.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 74){
                            $scope.valor74 = $scope.valor74 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor74,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar74.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 75){
                            $scope.valor75 = $scope.valor75 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor75,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar75.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 76){
                            $scope.valor76 = $scope.valor76 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor76,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar76.push(data1);
                        }
                        if($scope.anexos1[i].idTAR == 78){
                            $scope.valor78 = $scope.valor78 + 1;
                            var data1 = {
                                        "Consecutivo":result.data[i].Consecutivo,
                                        "Cliente":result.data[i].Cliente,
                                        "NoOrden":result.data[i].NoOrden,
                                        "index": $scope.valor78,
                                        "idTAR":result.data[i].idTAR,
                                        "idZona":result.data[i].idZona,
                                        "idTrabajo":result.data[i].idTrabajo,
                                        "NoEconomico":result.data[i].NoEconomico,
                                        "Zona": result.data[i].Zona, 
                                        "TAR":result.data[i].TAR,
                                        "folioCertificado":result.data[i].folioCertificado,
                                        "FechaGeneracionCertificado":result.data[i].FechaGeneracionCertificado,
                                        "fechaCargaCertificadoCliente":result.data[i].fechaCargaCertificadoCliente,
                                        "precioOrden": result.data[i].precioOrden,
                                        "fechaMaxFirma":result.data[i].fechaMaxFirma,
                                        "DiasAtraso": result.data[i].DiasAtraso 
                                } 
                            tar78.push(data1);
                        }            
                    }
                }  
                        var zona1 = {
                            "tar1":tar1,
                            "tar9":tar9,
                            "tar10":tar10,
                            "tar11":tar11,
                            "tar12":tar12,
                            "tar13":tar13,
                            "tar14":tar14,
                            "tar17":tar17,
                            "tar18":tar18,
                            "tar41":tar41,
                            "tar42":tar42,
                            "tar48":tar48,
                            "tar49":tar49,
                            "tar50":tar50,
                            "tar62":tar62,
                            "tar63":tar63,
                            "tar64":tar64,
                            "tar65":tar65,
                            "tar66":tar66,
                            "tar77":tar77
                        }  
                        var zona2 = {
                            "tar19":tar19,
                            "tar20":tar20,
                            "tar21":tar21,
                            "tar22":tar22,
                            "tar23":tar23,
                            "tar24":tar24,
                            "tar26":tar26,
                            "tar27":tar27,
                            "tar28":tar28,
                            "tar31":tar31,
                            "tar32":tar32,
                            "tar33":tar33,
                            "tar35":tar35,
                            "tar36":tar36,
                            "tar37":tar37,
                            "tar38":tar38,
                            "tar39":tar39,
                            "tar47":tar47,
                            "tar79":tar79
                        }  
                        var zona3 = {
                            "tar2":tar2,
                            "tar3":tar3,
                            "tar4":tar4,
                            "tar5":tar5,
                            "tar15":tar15,
                            "tar16":tar16,
                            "tar25":tar25,
                            "tar29":tar29,
                            "tar30":tar30,
                            "tar34":tar34,
                            "tar40":tar40,
                            "tar51":tar51,
                            "tar52":tar52,
                            "tar53":tar53,
                            "tar54":tar54,
                            "tar55":tar55,
                            "tar56":tar56,
                            "tar57":tar57,
                            "tar58":tar58,
                            "tar59":tar59,
                            "tar60":tar60
                        }  
                        var zona4 = {
                            "tar6":tar6,
                            "tar7":tar7,
                            "tar8":tar8,
                            "tar43":tar43,
                            "tar44":tar44,
                            "tar45":tar45,
                            "tar46":tar46,
                            "tar61":tar61,
                            "tar67":tar67,
                            "tar68":tar68,
                            "tar69":tar69,
                            "tar70":tar70,
                            "tar72":tar72,
                            "tar73":tar73,
                            "tar74":tar74,
                            "tar75":tar75,
                            "tar76":tar76,
                            "tar78":tar78
                        }  

                    for (var i = 0; i < $scope.anexos1.length; i++) { 
                        if($scope.anexos1[i].idAnexo == 1){
                                $scope.estructura1 = {
                                    "zona1": zona1,
                                    "zona2": zona2,
                                    "zona3": zona3,
                                    "zona4": zona4
                                }  
                        } 
                        if($scope.anexos1[i].idAnexo == 2){
                                $scope.estructura2 = {
                                    "zona1": zona1,
                                    "zona2": zona2,
                                    "zona3": zona3,
                                    "zona4": zona4,
                                    "Info":gneral
                                }  
                        } 
                        if($scope.anexos1[i].idAnexo == 3){
                        //$scope.idOsur3 = $scope.anexos1[0].idOsur; 
                                $scope.estructura3 = {
                                    "zona1": zona1,
                                    "zona2": zona2,
                                    "zona3": zona3,
                                    "zona4": zona4
                                }  
                        }
                    } 
            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }

/*    $scope.Anexo2 = function (idZona, idTar, anexo) {
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {

            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  

    $scope.Anexo3 = function (idZona, idTar, anexo) {
            $('.dataTableAnexo3').DataTable().destroy();
        reporteReclamacionRepository.getAnexos(idZona, idTar, anexo).then(function (result) {
            if (result.data.length > 0) {

            }
        }, function (error) {
            alertFactory.error('Error al recuperar la informacion solicitada');
        });
    }  */
        //espera que el documento se pinte para llenar el dataTable
    var waitDrawDocument = function (dataTable, title) {
        setTimeout(function () {
            var indicePorOrdenar = 0;
            if (dataTable == 'dataTableResumen') {
                indicePorOrdenar = 8;
            } else {
                indicePorOrdenar = 8;
            }

            $('.' + dataTable).DataTable({
                order: [[indicePorOrdenar, 'desc']],
                dom: '<"html5buttons"B>lTfgitp',
                "iDisplayLength": 100,
                buttons: [
                    {
                        extend: 'excel',
                        title: title
                    },
                    {
                        extend: 'print',
                        customize: function (win) {
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]
            });
        }, 2500);
    }

});
