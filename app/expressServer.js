var env = process.env.NODE_ENV || 'production',
    express = require('express'),
    swig = require('swig'),
    bodyParser = require('body-parser'),
    middlewares = require('./middlewares/admin'),
    router = require('./website/router'),
    multer = require('multer'),
    http = require('http'),
    path = require('path'),
    app_clients = []

// Alta de opciones
var done = false

var ExpressServer = function(config) {
    this.config = config || {}

    // Start Server
    this.expressServer = express()
    this.server = http.createServer(this.expressServer)

    Io = require('socket.io')
    var io = Io.listen(this.server)

    io.sockets.on('connection', function(socket) {
        socket.join('some::room')

        socket.on('login', function(data) {
            if (data.user != '') {
                data.socketid = socket.id
                var found = app_clients.find(X => X.id == data.user)
                if (!found) {
                    app_clients.push({ "id": data.user, "socket": socket.id })
                } else {
                    app_clients.splice(app_clients.indexOf(found), 1)
                    app_clients.push({ "id": data.user, "socket": socket.id })
                }
                //app_clients[data.user] = data
                io.to(socket.id).emit('hello', { mensaje: 'Conectado correctamente: ' + (new Date().toString()) + ' ID: ' + socket.id })
                    // socket.emit('hello', { mensaje: 'Conectado correctamente: ' + (new Date().toString()) + ' ID: ' + socket.id })
                console.log('------Usuarios conectados--------')
                console.log(app_clients)
            }
        })

        socket.on('createMeeting', function(data) {
            console.log('------------Se ha solicitado una videoconferencia------------')
            console.log(data)
            console.log(app_clients)

            JSON.parse(data.users).forEach(function(element) {
                var found = app_clients.find(X => X.id == element.id)
                if (found) {
                    io.to(found.socket).emit('message', data)
                    console.log(found)
                }
            }, this);
            /*for(var i = 0; i < app_clients.length; i++){

            }*/
            //io.to(socket.id).emit('message', data)
        })

        socket.on('message', function(data) {
            console.log(data)
        })

        socket.on('disconnect', function() {
            // delete app_user[socket.store.id]
            console.log('------------Desconectado------------')
            console.log(socket.id)
        })
    })


    // middlewares
    this.expressServer.use(function(req, res, next) {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5302')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
        res.setHeader('Access-Control-Allow-Headers', 'application/javascript,X-Requested-With,application/json,')
        res.setHeader('Access-Control-Allow-Credentials', true)
        next()
    })

    this.expressServer.use(bodyParser.urlencoded({ extended: true }))
    this.expressServer.use(bodyParser.json())
    for (var middleware in middlewares) {
        this.expressServer.use(middlewares[middleware])
    }

    this.expressServer.engine('html', swig.renderFile)
    this.expressServer.set('view engine', 'html')
    this.expressServer.set('views', __dirname + '/website/views/templates')
    swig.setDefaults({ varControls: ['[[', ']]'] })

    // ////////////////////////////////////////////////////////////

    if (env == 'development') {
        console.log('OK NO HAY CACHE')
        this.expressServer.set('view cache', false)
        swig.setDefaults({ cache: false, varControls: ['[[', ']]'] })
    }

    for (var controller in router) {
        var middles = new router[controller](this.config).middlewares || []
        for (var funcionalidad in router[controller].prototype) {
            var method = funcionalidad.split('_')[0]
            var entorno = funcionalidad.split('_')[1]
            var data = funcionalidad.split('_')[2]
            data = (method == 'get' && data !== undefined) ? ':data' : ''
            var url = '/api/' + controller + '/' + entorno + '/' + data
            this.router(controller, funcionalidad, method, url, middles)
        }
    }

    // //Configuracion de MULTER

    this.expressServer.get('/uploader', function(req, res) {
        res.sendfile('app/static/uploader.htm')
    })

    this.expressServer.get('/success', function(req, res) {
        res.sendfile('app/static/success.htm')
    })

    this.expressServer.get('/message', function(req, res) {
        io.to(app_clients[181].socketid).emit('message', 'Hola')
    })

    // Servimos el archivo angular
    this.expressServer.get('*', function(req, res) {
        res.sendfile('app/static/index.html')
    })
}

ExpressServer.prototype.run = function(port) {
    this.server.listen(port)
}

ExpressServer.prototype.router = function(controller, funcionalidad, method, url, middles) {
    console.log(url)
    var parameters = this.config.parameters

    this.expressServer[method](url, middles, function(req, res, next) {
        var conf = {
            'funcionalidad': funcionalidad,
            'req': req,
            'res': res,
            'next': next,
            'parameters': parameters
        }

        var Controller = new router[controller](conf)
        Controller.response()
    })
}
module.exports = ExpressServer