'use strict';
//try to find entities from known words

var getFirstWords = require('./firstWord');

var tryHere = function(ts, i, obj) {
  var n = i + 1;
  var terms = ts.getTerms();
  for(var t = n;t < terms.length;t++){     
  	 if (obj[ts.slice(n, t + 1).out('root')]) {
	    return t + 1;
	 }
  }
  return null;
};

//try all terms with this lexicon
var tryAll = function(lexFirst, ts) {
  var terms = ts.getTerms();
  var totalTerms = terms.length;
  for(let i = 0; i < totalTerms - 1; i++) {
    var obj = lexFirst[terms[i].normal];
    if (obj) {
      var n = tryHere(ts, i, obj);
      if (n) {
        var tag = obj[ts.slice(i + 1, n).out('root')];
        var slice = ts.slice(i, n);
        slice.tag(tag, 'lexicon-lump');
        slice.lump();
      }
    }
  }
  return ts;
};

var entity_lump = function (ts) {
  //use default lexicon
  //try user's lexicon
  var lexicon = ts.getLexicons();
  if (lexicon) {
    var uFirst = getFirstWords([lexicon]);
    ts = tryAll(uFirst, ts);
  }
  return ts;
};

module.exports = entity_lump;