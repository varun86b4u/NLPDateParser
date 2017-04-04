var chrono = require('chrono-node')
var currentParser = require('./Parsers/currentParser').currentParser;
var relativeDateParser = require('./Parsers/relativeDateParser').parser;
var casualDateParser = require('./Parsers/casualDateParser').parser;
var sinceRefiner = require('./Refiner/sinceRefiner').refiner;
var fixedDateRangeRefiner = require('./Refiner/fixedDateRangeRefiner').refiner;
var sentences = [
	'In last 1 month',
	'in last 2 months',
	'in last 1 year',
	'in previous 1 year', // not detected
	'in last 2 weeks',
	'in last 2 day',
	'in next 3 days',
	'in this month',
	'in current quartar',
	'in last quartar',
	'in next month',
	'in next 2 week',
	'in next 4 years'
]

var custom = new chrono.Chrono();
custom.parsers.unshift(currentParser);
custom.parsers.unshift(relativeDateParser);
custom.parsers.unshift(casualDateParser);

custom.refiners.push(sinceRefiner);
custom.refiners.push(fixedDateRangeRefiner);


/*for(var s in sentences){
	var sent = sentences[s];
	console.log(sent);
	var t = custom.parse(sent);
	console.log(JSON.stringify(t));
}*/

var t = custom.parse('Sales in 31st may');
console.log(JSON.stringify(t));