var getLexicons = require('./data').getLexicons;
var tagger = require('./tagger');
var tokeniser = require('./tokeniser');
var co = require('co');

var NER = function(sent){
	var tokenObj = new tokeniser(sent);
	var terms = tokenObj.getTerms();
	executeFn(getLexicons,terms,function(map){
		tokenObj.setLexicons(map);
		var test = tagger(tokenObj);
		console.log(test.tags())
	});
}

var executeFn = function(executeGeneratorFn,terms,onSuccess){

	function onError(err) { 
		console.log(err.stack);
	}

	co(function* () {
		var result = yield executeGeneratorFn(terms);
		return result;
	}).then(onSuccess, onError);
}

module.exports = NER;