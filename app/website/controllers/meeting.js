var MeetingView = require('../views/ejemploVista'),
    MeetingModel = require('../models/dataAccess2'),
    moment = require('moment');

//configuración para el objeto meeting
var Meeting = function (conf) {
    this.conf = conf || {};

    this.view = new MeetingView();
    this.model = new MeetingModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

Meeting.prototype.post_alta = function (req, res, next) {
    var self = this;
    var params = [
        { name: 'joinurl', value: req.query.joinurl, type: self.model.types.STRING },
        { name: 'hostURL', value: req.query.hostURL, type: self.model.types.STRING },
        { name: 'meetingid', value: req.query.meetingid, type: self.model.types.STRING },
        { name: 'maxParticipants', value: req.query.maxParticipants, type: self.model.types.INT },
        { name: 'uniqueMeetingId', value: req.query.uniqueMeetingId, type: self.model.types.STRING },
        { name: 'conferenceCallInfo', value: req.query.conferenceCallInfo, type: self.model.types.STRING },
        { name: 'estatus', value: req.query.estatus, type: self.model.types.STRING }
    ];

    this.model.query('INS_MEETING_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Meeting;