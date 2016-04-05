/* Magic Mirror
 * Node Helper: Calendar
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var PythonShell = require('python-shell');
PythonShell.defaultOptions = { mode: 'json', scriptPath: 'modules/MMM-wordnik' };

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'RUN') {
			console.log(payload);
			this.runPython();
		}
	},
	
	runPython: function() {
		const self = this;
		const fileName = 'wordOfTheDay.py';
		console.log('Running ' + fileName);
		const pyshell = new PythonShell(fileName, {mode: 'json'});
		
		pyshell.on('message', function (message) {
			self.sendSocketNotification(message.type, message);
		});
		
		pyshell.end(function (err) {
			if (err) throw err;
			self.sendSocketNotification('UPDATE', 'Finished getting data');
			console.log('Finished getting data');
		});
	}
});
