var lexicon_step = require('./steps/01lexicon_step')
var date_step = require('./steps/02date_step')
var entity_lump = require('./lumper/entity_lump');

var tagger = function (ts) {
	ts = lexicon_step(ts);
	console.log(12);
	ts = date_step(ts);
	console.log(13);
	ts = entity_lump(ts);	
	return ts;
}

module.exports = tagger;

