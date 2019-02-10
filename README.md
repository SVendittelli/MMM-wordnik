MMM-wordnik
===
[MagicMirror](https://github.com/MichMich/MagicMirror) Module to display the word of the day, its definition, and origin. Uses the wordnik API.

Dependancies:
---
* [python-shell](https://www.npmjs.com/package/python-shell) --- `npm install python-shell`
* [wordnik-python3](https://github.com/wordnik/wordnik-python3) --- `sudo pip install wordnik-py3`

Setup:
---
* Get an api key from [wordnik](http://developer.wordnik.com/).
* Add the following to your config:
````javascript
{
	module: "MMM-wordnik",
	position: "lower_third",
	config: {
		api_key: "<YOUR API KEY>"
	}
}
````

TODO:
---
* Give examples? (Python is already capable)
* * _Clean up code_
