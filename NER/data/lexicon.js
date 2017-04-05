'use strict';

let esEntities = require('./esEntities');
let masterEntities = require('./master');
let combineMap = require('./combineMap');

let allEntityLexicon = function*(terms){
	let map = {};

	if(terms && terms.length > 0){
		for(var i = 0;i < terms.length;i++){
			let term = terms[i];
			let text = term.text;
			let entityMap = yield esEntities(text);
			map  = combineMap(entityMap,map);
		}
	}
	return map;
}

let allMasterLexicon = function(){
	let map = {};
	for(var key in masterEntities){
		let masterMap = masterEntities[key];
		map  = combineMap(masterMap,map);
	}
	return map;
}

let getFinLexicon = function*(terms){
	var entityMap = yield allEntityLexicon(terms);
	var masterMap = allMasterLexicon();
	return combineMap(masterMap,entityMap);
}

module.exports = getFinLexicon;
