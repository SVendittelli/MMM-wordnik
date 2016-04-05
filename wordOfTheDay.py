#!/usr/bin/env python
import sys
import json
from wordnik import *

def print_json(type, message):
	print(json.dumps({'type': type, 'message': message}))
	sys.stdout.flush()

apiUrl = 'http://api.wordnik.com/v4'
apiKey = 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
client = swagger.ApiClient(apiKey, apiUrl)

wordApi = WordApi.WordApi(client)
wordsApi = WordsApi.WordsApi(client)
wordOfTheDay = wordsApi.getWordOfTheDay()

try:
	pronounce = wordApi.getTextPronunciations(wordOfTheDay,typeFormat='ahd')[0].raw
	
	#for example in wordOfTheDay.examples:
		#print example.text
		#print '- ' + example.title + '\n'
except TypeError:
	pronounce = "";

print_json("word", wordOfTheDay.word)
print_json("partOfSpeech", wordOfTheDay.definitions[0].partOfSpeech)
print_json("definition", wordOfTheDay.definitions[0].text)
print_json("origin", wordOfTheDay.note)
print_json("pronounce", pronounce)