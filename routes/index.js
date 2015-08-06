var os = require('os'),
	router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var json = {
		'title': require('../package').name,
		'process': {
			//tmpdir: os.tmpdir(),
			versions: process.versions,
			//env: process.env,
			//config: process.config,
			pid: process.pid,
			uptime: process.uptime()
		},
		'system': {
			//endianness: os.endianness(),
			hostname: os.hostname(),
			type: os.type(),
			platform: os.platform(),
			arch: os.arch(),
			release: os.release(),
			uptime: os.uptime(),
			loadAverage: os.loadavg(),
			memory: {
				free: os.freemem(),
				total: os.totalmem()
			},
			cpus: os.cpus()//, network: os.networkInterfaces()
		}
	};
	res.json(json);
});

module.exports = router;
