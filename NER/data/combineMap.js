'use strict';

let combineMap = (currMap,finMap) => {
	for(var key in currMap){
		if(!finMap[key]){
			finMap[key] = [];
		}
		let currKeys = currMap[key];
		let finKeys = finMap[key];
		finMap[key] = currKeys.concat(finKeys);
	}
	return finMap;
}

module.exports = combineMap;