function modal_presupuestos($scope, $modal, idOperacion, modalUnidad, callback, error) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/presupuestos.html',
        controller: 'presupuestosController',
        backdrop: 'static',
        size: 300,
        resolve: {
            idOperacion: function() {
                return idOperacion;
            },
            modalUnidad: function() {
                return modalUnidad;
            },
            callback: function() {
                return callback;
            },
            error: function() {
                return error;
            }
        }
    });
}
function modal_nuevaUnidad($scope, $modal, idOperacion, presupuesto, gps, callback, idContratoOperacion) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/nuevaUnidad.html',
        controller: 'nuevaUnidadController',
        backdrop: 'static',
        size: 300,
        resolve: {
            idOperacion: function() {
                return idOperacion;
            },
            presupuesto: function() {
                return presupuesto;
            },
            gps: function() {
                return gps;
            },
            callback: function() {
                return callback;
            },
            idContratoOperacion: function() {
                return idContratoOperacion;
            }
        }
    });
}

function modal_detalleModulos($scope, $modal, idOperacion, detalle, idContratoOperacion, unidades) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/detalleModulos.html',
        controller: 'detalleModulosController',
        backdrop: 'static',
        size: 500,
        resolve: {
            idOperacion: function() {
                return idOperacion;
            },
            detalle: function() {
                return detalle;
            },
            idContratoOperacion: function() {
                return idContratoOperacion;
            },
            unidades: function() {
                return unidades;
            }
        }
    });
}

function modal_tipoUnidad($scope, $modal, data, idOperacion) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/tipoUnidades.html',
        controller: 'tipoUnidadesController',
        backdrop: 'static',
        size: 300,
        resolve: {
            data: function() {
                return data;
            },
            idOperacion: function() {
                return idOperacion;
            }
        }
    });
}

function modal_zonas($scope, $modal, idContratoOperacion) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/zonas.html',
        controller: 'zonasController',
        backdrop: 'static',
        size: 300,
        resolve: {
            idContratoOperacion: function() {
                return idContratoOperacion;
            }
        }
    });
}

function modal_datosFacturacion($scope, $modal, idOperacion) {
    var modalInstance = $modal.open({
        templateUrl: '../AngularJS/Configurador/Templates/Facturacion.html',
        controller: 'facturacionController',
        backdrop: 'static',
        keyboard: false,
        size: 500,
        resolve:{
            idOperacion: function() {
                return idOperacion;
            }
        }
    });
}

//Valida correo
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    var incorrect = 0;
    var emailList = [];

    if($.trim(emailAddress).length > 0 ){

        if(emailAddress.substring($.trim(emailAddress).length  - 1,$.trim(emailAddress).length) == ","){
            emailAddress = emailAddress.substring(0,$.trim(emailAddress).length  - 1);
        }

        if(emailAddress.indexOf(",") != -1){
            emailList = emailAddress.split(",");
        }else{
            emailList.push(emailAddress);
        }

        $.each(emailList, function(i,v){
            if(!pattern.test($.trim(v)))
                incorrect += 1;
        });

    }else{
        incorrect += 1;
    }
    /* return pattern.test(emailAddress); */
    return (incorrect > 0) ? false : true;
}

function validate_fecha(fechaInicial,fechaFinal)
{
    valuesStart=fechaInicial.split("/");
    valuesEnd=fechaFinal.split("/");

    // Verificamos que la fecha no sea posterior a la actual
    var dateStart=new Date(valuesStart[2],(valuesStart[1]-1),valuesStart[0]);
    var dateEnd=new Date(valuesEnd[2],(valuesEnd[1]-1),valuesEnd[0]);
    if(dateStart>=dateEnd)
    {
        return false;
    }
    return true;
}
