var nlp = require('compromise');

function tokeniser(sent){
	this.sent = sent;
	this.ts = null;
	this.lex = {};
	this.createNLPObject();
}

tokeniser.prototype = {
	createNLPObject :function(){
		this.ts = nlp(this.sent);
	},

	getTerms:function(){
		return this.ts.out('terms');
	},

	setLexicons : function(lex){
		this.lex = lex;
	},

	getLexicons:function(){
		return this.lex;
	},

	slice:function(start,end){
		var fts = null;
		this.ts.list.forEach((ts) => {
			fts = ts;
		});
		var s = fts.slice(start,end);
		return s;
	},

	tags:function(){
		return this.ts.out('tags');
	},

	match:function(tag){
		return this.ts.match(tag);
	},

	forEachTerm:function(callback){
		this.ts.list.forEach((ts) => {
	      ts.terms.forEach((t) => {
	        callback(t);
	      });
	    });
	},

	getSent:function(){
		return this.sent;
	}

}

module.exports = tokeniser;