var GPSView = require('../views/ejemploVista'),
    GPSModel = require('../models/dataAccess2'),
    GPSRequest = require('request')

var GPS = function (conf) {
    this.conf = conf || {};

    this.view = new GPSView();
    this.model = new GPSModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

GPS.prototype.get_ubicacionbyvin = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'vin', value: req.query.vin, type: self.model.types.STRING }
    ];

    this.model.query('SEL_GPS_CONSULTA_MSISDN_SP', params, function (error, result) {
        if (result.length > 0) {
            let msisdn = result[0].msisdn
            let access_token, lat, long;
            //API REST MOVISTAR: POST 
            GPSRequest(
                {
                    url: 'http://plataforma.umancomunicaciones.com/UMAN-GES-0717/api/login?user=cliente1@umancomunicaciones.com&password=c0n3x10n',
                    method: 'POST'
                }, function (error, response, body) {
                    if (response.statusCode == 200) {
                        access_token = JSON.parse(body).access_token;
                        //CON EL ACCES TOKEN Y EL MSISDN HACEMOS LA PETICION DE LATITUD Y LONGITUD DE LA SIM
                        GPSRequest(
                            {
                                url: 'http://plataforma.umancomunicaciones.com/UMAN-GES-0717/restClient/locationBySim',
                                method: 'POST',
                                headers: {
                                    Authorization: 'Bearer ' + access_token,
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                form: { object: '{"phone" : "' + msisdn + '"}' }
                            }, function (error, response, body) {
                                self.view.expositor(res, {
                                    error: error,
                                    result: JSON.parse(body)
                                });
                            }
                        )
                    }
                    else {
                        console.log(body)

                    }
                }
            )
        }
        else {
            self.view.expositor(res, {
                error: "El vin solicitdado no contiene datos",
                result: result
            });
        }
    });
}

module.exports = GPS;