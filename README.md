MMM-wordnik
===
MagicMirror Module to display the word of the day. Uses wordnik API.

Dependancies:
---
[wordnik-python](https://github.com/wordnik/wordnik-python) --- `sudo pip install wordnik`

Setup:
---
* Get an api key from [wordnik]().
* Add the following to your config:
````javascript
{
	module: 'MMM-wordnik',
	position: 'lower_third',
	config: {
		api_key: <YOUR API KEY>
	}
}
````

TODO:
---
* Give example uses? (Python is already capable)