var searchUrl = global_settings.urlCORS + '/api/cotizacion/';
var meetingUrl = global_settings.urlCORS + '/api/meeting/';

registrationModule.factory('mainRepository', function($http) {
    return {
        getChat: function(idCita, idTipoChat) {
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
        putMessage: function(usuario, msg, cita, idTipoChat) {
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

        postCreateMeeting: function(accesToken, objetivo, jsonParticipantes) {
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
        getStartMeeting: function(accesToken, meetingId) {
            var params = {
                meetingId: meetingId
            };

            return $http({
                url: 'https://api.getgo.com/G2M/rest/meetings/' + meetingId + '/start',
                method: "GET",
                data: params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accesToken
                }
            });

        },
        saveMeeting: function(joinurl, hostURL, meetingid, maxParticipants, uniqueMeetingId, conferenceCallInfo, estatus, asunto, jsonUsuariosSelected) {
            return $http({
                url: meetingUrl + 'alta/',
                method: "POST",
                params: {
                    joinurl: joinurl,
                    hostURL: hostURL,
                    meetingid: meetingid,
                    maxParticipants: maxParticipants,
                    uniqueMeetingId: uniqueMeetingId,
                    conferenceCallInfo: conferenceCallInfo,
                    estatus: estatus,
                    asunto: asunto,
                    jsonUsuariosSelected: jsonUsuariosSelected
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },

        getCredencialesMeeting: function(idUsuario) {
            return $http({
                url: meetingUrl + 'consultaCredencialUsuario/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    };
});