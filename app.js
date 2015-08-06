const port = 80;
const logFile = '/var/log/nodejs.log';
const errFile = '/var/log/nodejs_error.log';
const allowMethods =  'GET'; //,POST,PUT,DELETE';
const allowOrigins =  '*';
const allowHeaders =  'Content-Type,Accept,X-Requested-With,Session';

var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	debug = require('debug')('app'),
	winston = require('winston'),
	expressWinston = require('express-winston'),
	logger = expressWinston.logger({
		transports: [
			new winston.transports.Console({
				level: 'warn',
				json: true,
				colorize: true
			}),
			new(winston.transports.File)({
				level: 'warn',
				statusLevels: true,
				filename: logFile
			}),
		],
	}),
	errorLogger = expressWinston.errorLogger({
		transports: [
			new winston.transports.Console({
				json: true,
				colorize: true
			}),
			new(winston.transports.File)({
				level: 'debug',
				filename: errFile
			}),
		],
	});

app.locals.title = require('./package').name;

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.use('/', require('./routes/index'));
//app.use('/aaaa', require('./routes/aaaa'));
//app.use('/bbbb', require('./routes/bbbb'));

// ERROR HANDLERS

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({ error: err.message });
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({ error: err.message });
	});
});

app.use(errorLogger);

var server = require("http").createServer(app).listen(port, function() {
	debug('Server listening on port ' + server.address().port);
});

module.exports = app;
