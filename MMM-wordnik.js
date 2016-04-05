/* global Module */

/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

Module.register('MMM-wordnik',{

	dictionary: {
		word: "",
		partOfSpeech: "",
		definition: "",
		origin: "",
		pronounce: ""
	},
	
	partOfSpeechList: {
		noun: 'n.',
		adjective: 'adj.',
		verb: 'v.',
		adverb: 'adv.',
		interjection: 'intj.',
		pronoun: 'pron.',
		preposition: 'p.',
		abbreviation: 'abbr.',
		affix: 'aff.',
		article: 'a.',
		//auxiliary-verb: 'aux.v.',
		conjunction: 'conj.',
		//definite-article: '',
		//family-name: '',
		//given-name: '',
		idiom: 'idiom.',
		imperative: 'imp.',
		//noun-plural: 'n.',
		//noun-posessive: 'n.',
		//past-participle: 'pp.',
		//phrasal-prefix: '',
		//proper-noun: 'pn.',
		//proper-noun-plural: 'pn.',
		//proper-noun-posessive: 'pn.',
		suffix: 'suff.',
		//verb-intransitive: 'vi.',
		//verb-transitive: 'vt',
	},
	
	default: {
		api_key: ""
	},
	
	start: function() {
		Log.log('Sarting module: ' + this.name)
		
		this.fadeSpeed = 2000;
		
		this.loaded = false;
		this.sendSocketNotification('GET WORD', this.config.api_key);
		
		var self = this;
		setInterval(function() {
			self.updateWord();
		}, 12*60*60*1000);
	},
	
	updateWord: function() {
		this.sendSocketNotification('GET WORD', this.config.api_key);
	},
	
	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		
		if (!this.loaded) {
			wrapper.innerHTML = "Loading word of the day...";
			wrapper.className = "dimmed light small";
			return wrapper;
		}
		
		var leftWrap = document.createElement("div");
		var dictWrap = document.createElement("div");
		var rightWrap = document.createElement("div");
		var wordWrap = document.createElement("span");
		var pronounceWrap = document.createElement("span");
		var partOfSpeechWrap = document.createElement("span");
		var definitionWrap = document.createElement("div");
		var originWrap = document.createElement("div");
		
		leftWrap.style.display = 'inline-block';
		dictWrap.style.display = 'inline-block';
		rightWrap.style.display = 'inline-block';
		/*
		leftWrap.style.border = '3px solid red';
		dictWrap.style.border = '3px solid orange';
		rightWrap.style.border = '3px solid green';
		wordWrap.style.border = '3px solid blue';
		pronounceWrap.style.border = '3px solid white';
		partOfSpeechWrap.style.border = '3px solid yellow';
		definitionWrap.style.border = '3px solid pink';
		originWrap.style.border = '3px solid purple';
		//*/
		dictWrap.style.textAlign = 'justify';
		dictWrap.style.maxWidth = '50%';
		
		//wordWrap.style.marginRight = '10px';
		//pronounceWrap.style.marginRight = '10px';
		
		dictWrap.className = "normal medium";
		wordWrap.className = "bright medium";
		//pronounceWrap.className = "normal small";
		originWrap.className = "dimmed small";
		
		wordWrap.style.fontWeight = 'bold';
		partOfSpeechWrap.style.fontStyle = 'italic';
		
		wordWrap.innerHTML = this.dictionary.word;
		pronounceWrap.innerHTML = ": " + this.dictionary.pronounce.replace(/^\(/,"/").replace(/\)$/,"/") + " ";
		partOfSpeechWrap.innerHTML = this.partOfSpeechList[this.dictionary.partOfSpeech];
		definitionWrap.innerHTML = this.dictionary.definition.replace(/\.+$/, '') + ".";
		originWrap.innerHTML = "origin: " + this.dictionary.origin.replace(/\.+$/, '') + ".";
		
		dictWrap.appendChild(wordWrap);
		dictWrap.appendChild(pronounceWrap);
		dictWrap.appendChild(partOfSpeechWrap);
		dictWrap.appendChild(definitionWrap);
		dictWrap.appendChild(originWrap);
		wrapper.appendChild(leftWrap);
		wrapper.appendChild(dictWrap);
		wrapper.appendChild(rightWrap);
		return wrapper;
	},
	
	socketNotificationReceived: function(notification, payload) {
		if (notification !== "UPDATE") {
			this.dictionary[notification] = payload.message;
		}
		if (notification === "UPDATE") {
			Log.log('Updating Dom');
			this.loaded = true;
			this.updateDom(this.fadeSpeed);
		}
	},
});
