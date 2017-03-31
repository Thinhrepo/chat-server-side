var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var chalk = require('chalk');
var helperFunctions = require('./helpers/functions');

var socket = require('socket.io');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: '.env'});

/* Model require */
var User = require('./models/User');

/**
 * Controllers (route handlers).
 */
var apiController = require('./controllers/api');

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', function () {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8080);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/api', api);

/**
 * Start Express server.
 */
var server = app.listen(app.get('port'), function () {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

// Socket server
var socketServer = socket(server);

var allSockets = {};
socketServer.sockets.on('connection', function (socket) {
    // console.log(socketServer.sockets.clients());
    // var iden = 'Client'+i;
    // socket.join(iden);
    // socketServer.sockets.emit('message', {
    //     sender: 'Thinhnv',
    //     recipient: 'test',
    //     name: 'Thinhnv',
    //     message: 'Hello' + ' test'
    // });
    console.log('Connected');
    // console.log(socketServer.sockets.connected);
    // socket.emit('client-info', {
    //     socketId: socket.id
    // });

    // Event when new client join chat
    socket.on('identifier', function (data) {
        console.log(data);
        socket.join(data.uId);
    });

    socket.on('init', function (data){
        console.log(data);
        User.findOne({ _id: data.owner }, (err, owner) => {
            console.log(owner);
            if (err) { return next(err); }
            User.findOne({ _id: data.partner }, (err, partner) => {
                socket.emit('init', {
                    owner: owner,
                    partner: partner
                });
            });
        });
    });

    socket.on('send', function (data) {
        console.log(data);

        // Send message to recipient
        socketServer.sockets.to(data.recipient).emit('message', {
            partner: data.sender,
            sender: data.sender,
            message: data.message,
            room: data.sender
        });

        // Send message to sender
        socketServer.sockets.to(data.sender).emit('message', {
            sender: data.sender,
            message: data.message,
            room: data.room
        });
    });
});

module.exports = app;
