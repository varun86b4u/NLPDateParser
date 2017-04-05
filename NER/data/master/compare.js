let nlp = require('compromise');

const compare = {
	'compare':'compare',
	'vs':'total',
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
//TO DO
module.exports = {};