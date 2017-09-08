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

module.exports = Meeting;