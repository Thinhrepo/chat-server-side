var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
var chalk = require('chalk');

var socket = require('socket.io');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

/**
 * Start Express server.
 */
var server = app.listen(app.get('port'), function() {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

// Socket server
var socketServer = socket(server);

var i = 1;
socketServer.sockets.on('connection', function (socket) {
    console.log('New client connected ...');

    // var iden = 'Client'+i;
    // socket.join(iden);
    // socketServer.sockets.emit('message', {
    //     sender: 'Thinhnv',
    //     recipient: 'test',
    //     name: 'Thinhnv',
    //     message: 'Hello' + ' test'
    // });

    // Event when new client join chat
    socket.on('join', function (data) {
        console.log(data);
        socket.join(data.name); // We are using room of socket io
        // socketServer.sockets.emit('message', { message: data.name + ' joined to room' });
        socketServer.sockets.emit('message', {
            sender: 'Thinhnv',
            recipient: data.name,
            name: 'Thinhnv',
            message: 'Hello ' + data.name
        });
        // if(data.name != 'Thinhnv'){
        //     socket.emit('message', {
        //         sender: 'Thinhnv',
        //         recipient: data.name,
        //         name: 'Thinhnv',
        //         message: 'Hello ' + data.name
        //     });
        // }
    });

    socket.on('send', function (data) {
        // socketServer.sockets.to('Thinhnv').emit('message', data);
        console.log(data);
        socketServer.sockets.to(data.recipient).emit('message', {
            sender: data.sender,
            recipient: data.recipient,
            name: data.sender,
            message: data.message
        });

        socket.emit('message', {
            sender: data.recipient,
            recipient: data.sender,
            name: data.sender,
            message: data.message
        });
    });
    i++;
});


module.exports = app;
