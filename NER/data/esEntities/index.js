'use strict';
let esEntities = require('./entity');
let nlp = require('compromise');
let _ = require('underscore');


var getTermEntities = function*(term){
	let termData = yield esEntities.getTermEntities(term);
	let map = {};

	if(termData && termData.length > 0){
		_.each(termData,function(d){
			let name = d.name;
			let rName = nlp(name).out('root');
			if(!map[rName]){
				map[rName] = [];
			}
			let cCase = nlp(d.type).toCamelCase().out();
			map[rName].push(cCase);
		});
	}
	return map;
}

module.exports = getTermEntities;





