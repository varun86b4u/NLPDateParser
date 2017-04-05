'use strict';
let dateParser = require('../date');
var nlp = require('compromise');

var lump_terms = (dateObj,ts) => {
	var text = dateObj.text;
	var slice = ts.match(text);
	console.log(slice);
	slice.tag('Date_entity', 'date-lump')
	slice.lump();	
}

const date_pass = (ts) => {
	let sent = ts.getSent();
	let parseObj = new dateParser(sent);
 	let dateObjs = parseObj.getAllDateObjs();
 	console.log(dateObjs);
 	if(dateObjs && dateObjs.length > 0){
 		for(var i=0;i<dateObjs.length;i++){
 			lump_terms(dateObjs[i],ts);
 		}
 	}
 	return ts;
}

module.exports = date_pass;

