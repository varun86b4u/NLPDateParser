import json
from nltk.corpus import wordnet as wn


def getPyObj(jsonStr):
	return json.loads(jsonStr);

def getDataSetObj(jsonStr):
	dataSet = getPyObj(jsonStr);
	headers = dataSet["headers"];
	dataSet['headers'] = getWordsForEachHeader(headers);
	return dataSet;

def handleDataSetName(dataSetName):
	knownWords = word_Builder(dataSetName);
	return knownWords;

def getWordsForEachHeader(headers):
	for headerObj in headers:
		header = headerObj["header"];
		headerId = headerObj["id"];
		knownWords = word_Builder(header);
		headerWords = getAllWordsForEachHeader(knownWords);
		headerObj['knownwords'] = knownWords;
		headerObj['headerwords'] = headerWords;
	return headers;


def getAllWordsForEachHeader(knownWords):
	if len(knownWords) > 0:
		allWords = [];
		for word in knownWords:
			names = getAllLemmaNamesForWord(word);
			allWords.append(names);
		return allWords;
	return []

def getAllLemmaNamesForWord(word):
	s = getAllSynsetsForWord(word);
	if len(s) > 0:
		return s[0].lemma_names();
	return [];

def getAllSynsetsForWord(word):
	s = wn.synsets(word);
	if len(s) > 0:
		return s;
	word1 = wn.morphy(word);
	if word1 is not None:
		s = wn.synsets(word1);
		return s;
	return [];

def getWordBaseForm(word):
	word1 = wn.morphy(word.lower());
	if word1 is not None:
		return word1;
	return None;


def word_Builder(word):
	letters = list(word.lower());
	knownWords = [];
	start = 0;
	while start < len(letters):
		for end in range(0, len(letters)-start - 2):
			l = letters[start:len(letters) - end];
			w = ''.join(l);
			s = getAllSynsetsForWord(w);
			if len(s) > 0:
				baseForm = getWordBaseForm(w);
				if baseForm is not None:
					knownWords.append(baseForm);
					start = start + len(baseForm) - 1;
				else:
					knownWords.append(w);
					start = len(letters) - end - 1;
				break;
		start+=1;
	return knownWords;
