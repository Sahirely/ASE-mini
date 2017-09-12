var searchUrl = global_settings.urlCORS + '/api/cotizacion/';

registrationModule.factory('mainRepository', function ($http) {
    return {
        getChat: function (idCita, idTipoChat) {
            var Readmsg = {
                 idCita: idCita,
                 idTipoChat: idTipoChat
            };
            return $http({
                url: searchUrl + 'chat',
                method: "GET",
                params: Readmsg,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        putMessage: function (usuario, msg, cita, idTipoChat) {
            var msgObj = {
                idUsuario: usuario,
                mensaje: msg,
                idCita: cita,
                idTipoChat: idTipoChat
            };

            return $http({
                url: searchUrl + 'message',
                method: "POST",
                data: msgObj,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        postCreateMeeting: function(accesToken, objetivo, jsonParticipantes)
        {
            var params = {
                subject: objetivo,
                starttime: new Date().toISOString(),
                endtime: new Date().toISOString(),
                passwordrequired: false,
                conferencecallinfo: "VoIP",
                timezonekey: "string",
                meetingtype: "immediate"


            };

            return $http({
                url: 'https://api.getgo.com/G2M/rest/meetings',
                method: "POST",
                data: params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accesToken
                }
            });

        },
        getStartMeeting: function(accesToken, objetivo, jsonParticipantes)
        {
            var params = {
                subject: objetivo,
                starttime: new Date().toISOString(),
                endtime: new Date().toISOString(),
                passwordrequired: false,
                conferencecallinfo: "VoIP",
                timezonekey: "string",
                meetingtype: "immediate"


            };

            return $http({
                url: 'https://api.getgo.com/G2M/rest/meetings',
                method: "POST",
                data: params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accesToken
                }
            });

        }
        
    };
});

 