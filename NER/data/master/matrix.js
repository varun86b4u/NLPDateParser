'use strict';
let nlp = require('compromise');

const matrix = {
	'sum':'total',
	'total':'total',
	'min':'minimum',
	'minimum':'minimum',
	'max':'maximum',
	'maximum':'maximum',
	'count':'number',
	'number':'number',
	'avg':'average',
	'average':'average'
};

let retMap =()=> {
	var map = {};
	for(var key in matrix){
		let rName = nlp(key).out('root');
		if(!map[key]){
			map[rName] = [];
		}
		let cCase = nlp(matrix[key]).toCamelCase().out();
		map[rName].push(cCase);
	}
	return map;
};

module.exports = retMap();