/* Magic Mirror
 * Node Helper: MMM-wordnik
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var PythonShell = require('python-shell');

module.exports = NodeHelper.create({

	// Override socketNotificationReceived method.
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET WORD') {
			console.log('Running');
			this.runPython(payload);
		}
	},
	
	runPython: function(api_key) {
		const self = this;
		const fileName = 'wordOfTheDay.py';
		console.log('Running ' + fileName);
		const wordPyShell = new PythonShell(fileName, {mode: 'json', scriptPath: 'modules/MMM-wordnik', args: [api_key]});
		
		wordPyShell.on('message', function (message) {
			self.sendSocketNotification(message.type, message);
		});
		
		wordPyShell.end(function (err) {
			if (err) throw err;
			self.sendSocketNotification('UPDATE', 'Finished getting data');
			console.log('Finished getting data');
		});
	}
});
